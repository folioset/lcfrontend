import * as React from 'react';

import * as Yup from 'yup';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';

import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { User } from '../../types';
import { useHistory } from 'react-router';
import FormInput from '../../components/shared/FormInput';
import FileUpload from '../../components/shared/FileUpload';
import useImageUpload from '../../hooks/useImageUpload';
import useAuthRoute from '../../hooks/useAuthRoute';

const useStyles = makeStyles((theme: Theme) => {
	return {
		avatarContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			marginBottom: theme.spacing(4),
		},
		avatar: {
			height: '8rem',
			width: '8rem',
		},
	};
});

const userProfileInitState = (user: any) => {
	return {
		linkedinUrl: user.linkedinUrl || '',
		about: user.about || '',
		phoneNumber: user.phone?.phoneNumber || '',
		code: '91',
		file: null,
		location: user.location || '',
	};
};

const LinkedInRegExp =
	/((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!]))?/;

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];

const userProfileValidationSchema = Yup.object().shape({
	about: Yup.string().min(
		20,
		'Too Short! You should atleast have 20 characters'
	),
	linkedinUrl: Yup.string().matches(
		LinkedInRegExp,
		'Please enter a valid linkedin url'
	),
	phoneNumber: Yup.string()
		.length(10, 'Please enter a valid phone number')
		.matches(phoneRegExp, 'Please enter a valid phone number'),
	file: Yup.mixed()
		.test(
			'fileFormat',
			'Unsupported Format. Please upload .png , .jpg or .jpeg files only',
			(value: File) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
		)
		.notRequired(),
	location: Yup.string().notRequired(),
});

const UpdateProfile: React.FC = () => {
	useAuthRoute('protected', '/');
	const queryClient = useQueryClient();
	const history = useHistory();
	const user = queryClient.getQueryData<User>('user');
	const classes = useStyles();
	const { imageUrl, handleUploadImageUrl } = useImageUpload();

	const { mutate, isLoading } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'put',
				url: '/api/user',
				data,
			});
			return res.data.user;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('user', data);
			},
			onSettled: (data) => {
				if (data) {
					history.replace('/dashboard');
				}
			},
		}
	);
	return (
		<>
			<Box my={6} textAlign='center'>
				<Typography variant='h4'>Edit Profile</Typography>
			</Box>
			<Formik
				initialValues={userProfileInitState(user)}
				validationSchema={userProfileValidationSchema}
				onSubmit={(values) => {
					const data = new FormData();

					data.append('linkedinUrl', values.linkedinUrl);
					data.append('about', values.about);
					data.append('phoneNumber', values.phoneNumber);
					data.append('code', values.code);
					data.append('location', values.location);

					if (values.file && values.file !== user!.profilePicture) {
						data.append('file', values.file as any);
					}

					mutate(data as any);
				}}>
				{() => {
					return (
						<Container maxWidth='md' style={{ paddingBottom: '3rem' }}>
							<Form autoComplete='off' noValidate>
								<Grid container spacing={1}>
									<Box className={classes.avatarContainer}>
										<Avatar
											src={
												Boolean(imageUrl)
													? imageUrl
													: user?.profilePicture
													? user?.profilePicture
													: ''
											}
											style={{ height: '8rem', width: '8rem' }}
										/>
									</Box>

									<Grid item xs={12}>
										<FormInput
											fullWidth
											variant='filled'
											label='LinkedIn URL'
											name='linkedinUrl'
											required={false}
											helperText='If you are on mobile, you can find this url by going to the Linkedin app -> View Profile -> Scrolling down on your profile -> In the Contact section, you will find your profile’s url which you can copy-paste here'
										/>
									</Grid>

									<Grid item md={1} xs={2}>
										<FormInput disabled variant='outlined' name='code' />
									</Grid>

									<Grid item md={11} xs={10}>
										<FormInput
											fullWidth
											variant='filled'
											label='Phone Number'
											name='phoneNumber'
											required={false}
											helperText='Please provide us with your phone number as this will help us add you to relevant groups and send you reminders about your calls'
										/>
									</Grid>

									<Grid item md={11} xs={10}>
										<FormInput
											fullWidth
											variant='filled'
											label='Location'
											name='location'
											required={false}
										/>
									</Grid>

									<FormInput
										fullWidth
										variant='filled'
										multiline
										rows={6}
										required={false}
										name='about'
										label='Bio'
										placeholder={`Product Manager at Zerodha. IIM Calcutta grad. Former Engineer who loves finance and fin-tech products`}
									/>

									<FileUpload
										required={false}
										name='file'
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleUploadImageUrl(e)
										}
									/>
								</Grid>
								<Button
									startIcon={
										isLoading ? <CircularProgress size='1rem' /> : null
									}
									disabled={isLoading}
									type='submit'
									variant='contained'
									color='primary'>
									Save details
								</Button>
							</Form>
						</Container>
					);
				}}
			</Formik>
		</>
	);
};

export default UpdateProfile;

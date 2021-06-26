import * as React from 'react';

import * as Yup from 'yup';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@material-ui/core';

import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { User } from '../../types';
import { useHistory } from 'react-router';
import FormInput from '../../components/shared/FormInput';
import FileUpload from '../../components/shared/FileUpload';
import useFileUpload from '../../hooks/useFileUpload';
import useAuthRoute from '../../hooks/useAuthRoute';
import { useLocation } from 'react-router-dom';

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
	about: Yup.string().min(5, 'Too Short! You should atleast have 5 characters'),
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
	const location = useLocation();
	useAuthRoute(location.pathname);
	const queryClient = useQueryClient();
	const history = useHistory();
	const user = queryClient.getQueryData<User>('user');
	const { fileUrl, handleUploadFileUrl } = useFileUpload();

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
		<Container
			maxWidth='sm'
			style={{ backgroundColor: 'white', padding: 30, borderRadius: 10 }}>
			<Box mb={4} textAlign='center'>
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
						<Form autoComplete='off' noValidate>
							<Grid container spacing={1}>
								<Grid item xs={12} container direction='row'>
									<Grid
										item
										xs={6}
										style={{ display: 'flex', justifyContent: 'flex-end' }}>
										<Avatar
											src={
												Boolean(fileUrl)
													? fileUrl
													: user?.profilePicture
													? user?.profilePicture
													: ''
											}
											style={{ height: '6rem', width: '6rem' }}
										/>
									</Grid>
									<Grid item xs={6} style={{ display: 'flex' }}>
										<FileUpload
											btnText='upload profile picture'
											required={false}
											name='file'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleUploadFileUrl(e)
											}
										/>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<FormInput
										fullWidth
										variant='outlined'
										rows={6}
										required={false}
										name='about'
										label='About'
										placeholder={`Product Manager at Zerodha. IIM Calcutta grad`}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormInput
										fullWidth
										variant='outlined'
										label='LinkedIn URL'
										name='linkedinUrl'
										required={false}
									/>
								</Grid>

								<Grid item md={2} xs={2}>
									<FormInput disabled variant='outlined' name='code' />
								</Grid>

								<Grid item md={10} xs={10}>
									<FormInput
										fullWidth
										variant='outlined'
										label='Phone Number'
										name='phoneNumber'
										required={false}
									/>
								</Grid>

								<Grid item md={12} xs={12}>
									<FormInput
										fullWidth
										variant='outlined'
										label='Location'
										name='location'
										required={false}
									/>
								</Grid>
							</Grid>
							<Button
								startIcon={isLoading ? <CircularProgress size='1rem' /> : null}
								disabled={isLoading}
								type='submit'
								variant='contained'
								color='primary'>
								Submit
							</Button>
						</Form>
					);
				}}
			</Formik>
		</Container>
	);
};

export default UpdateProfile;

import {
	// Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	makeStyles,
	Typography,
} from '@material-ui/core';
import * as React from 'react';
import * as Yup from 'yup';
// import axios from 'axios';
import { Formik, Form } from 'formik';
// import { useHistory } from 'react-router';
import { useQueryClient } from 'react-query';
import FormInput from '../../shared/FormInput/FormInput';
import { User } from '../../../types';
import { LinkedIn } from '@material-ui/icons';

interface Props {
	view: 'edit' | 'private' | 'public';
}

// FORMIK
// Page 1 - Linkedin and about details
const LinkedInRegExp = /((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!]))?/;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userProfileInitState = (user: any) => {
	return {
		linkedinUrl: user.linkedinUrl || '',
		about: user.about || '',
		phoneNumber: user.phone.phoneNumber || '',
		code: '91',
	};
};

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
});

const useStyles = makeStyles((theme) => {
	return {
		profile: {
			justifyContent: 'center',
			marginBottom: theme.spacing(4),
		},
		profileDetails: {
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center',
				order: 2,
			},
		},
		profilePhoto: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			flexDirection: 'column',

			[theme.breakpoints.down('sm')]: {
				justifyContent: 'center',
				textAlign: 'center',
				order: 1,
			},
		},
		linkedinUrl: {
			display: 'flex',
			alignItems: 'center',

			'& a': {
				marginLeft: theme.spacing(4),
			},
		},
	};
});

const Profile = ({ view }: Props) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	const classes = useStyles();

	if (view === 'edit') {
		return (
			<Container>
				<Formik
					initialValues={userProfileInitState(user)}
					validationSchema={userProfileValidationSchema}
					onSubmit={(values) => {
						// mutate(values as any);
					}}>
					{({ isValid }) => {
						return (
							<Form autoComplete='off'>
								<Container>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<FormInput
												fullWidth
												variant='filled'
												label='LinkedIn'
												name='linkedinUrl'
												required
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
												required
											/>
										</Grid>

										<FormInput
											fullWidth
											variant='filled'
											multiline
											rows={6}
											required
											name='about'
											label='What can others talk to you about?'
											placeholder={`My experience designing large-scale software systems at Microsoft.\n\nNote: If you are a student, you can share something specific that you have knowledge in,\nthat others might be interested in knowing.`}
										/>
									</Grid>
									<Button type='submit' color='primary' variant='contained'>
										Save
									</Button>
								</Container>
							</Form>
						);
					}}
				</Formik>
			</Container>
		);
	}

	return (
		<Grid className={classes.profile} container spacing={2} justify='center'>
			<Grid className={classes.profileDetails} item xs={12}>
				<Typography variant='h4'>{user?.name}</Typography>
				<Box mt={2}>
					<Typography variant='h6'>{user?.about}</Typography>
				</Box>
				<Box mt={3}>
					<Link
						className={classes.linkedinUrl}
						href={`https://${user?.linkedinUrl && user?.linkedinUrl}`}
						color='secondary'>
						<LinkedIn />

						{user?.linkedinUrl}
					</Link>
				</Box>
			</Grid>
			{/* <Grid className={classes.profilePhoto} item xs={12} md={4}>
				<Avatar variant='square' style={{ height: '8rem', width: '8rem' }} />
			</Grid> */}
		</Grid>
	);
};

export default Profile;

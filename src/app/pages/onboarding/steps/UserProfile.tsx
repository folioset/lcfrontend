import * as React from 'react';
import { useQueryClient } from 'react-query';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components
import FormInput from '../../../components/shared/FormInput/FormInput';

// styles
const useStyles = makeStyles((theme) => {
	return {
		container: {
			minHeight: '70vh',
			flexDirection: 'column',
			display: 'flex',
			justifyContent: 'center',

			'& h4': {
				textAlign: 'center',
				marginBottom: theme.spacing(4),
			},
		},
	};
});

// Formik
const LinkedInRegExp = /(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!]))?/;

const initialValues = {
	name: 'Guest User',
	email: 'guest@example.com',
	linkedinUrl: '',
	about: '',
};

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('name is required'),
	email: Yup.string().email().required('Email is required'),
	linkedinUrl: Yup.string()
		.required('Users must provide their linkedin profile url')
		.matches(LinkedInRegExp, 'Please enter a valid linkedin url'),
	about: Yup.string().required('Cannot be empty'),
});

const UserProfile: React.FC = () => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user') as any;

	return (
		<Box className={classes.container}>
			<Typography variant='h4'>User Profile</Typography>
			<Formik
				onSubmit={() => {}}
				initialValues={{
					...initialValues,
					name: user && user.name,
					email: user && user.email,
				}}
				{...{ validationSchema }}>
				{() => {
					return (
						<Container component={Form} autoComplete='off'>
							<Grid container spacing={4}>
								<Grid item xs={12}>
									<FormInput
										disabled
										fullWidth
										variant='outlined'
										label='Name'
										name='name'
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<FormInput
										disabled
										fullWidth
										variant='outlined'
										label='Email'
										name='email'
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<FormInput
										fullWidth
										variant='filled'
										label='LinkedIn'
										name='linkedinUrl'
										required
									/>
								</Grid>
								<Grid item xs={12}>
									<FormInput
										fullWidth
										variant='filled'
										multiline
										rows={5}
										required
										name='about'
										label='Tell us about yourself'
									/>
								</Grid>
							</Grid>
						</Container>
					);
				}}
			</Formik>
		</Box>
	);
};

export default UserProfile;

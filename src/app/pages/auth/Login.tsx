import * as React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// MUI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components
import FormInput from '../../components/shared/FormInput/FormInput';

// Hooks
import useAuthRoute from './../../hooks/useAuthRoute';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		container: {
			height: '85vh',
		},
		formContainer: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-end',

			[theme.breakpoints.down('sm')]: {
				justifyContent: 'center',
			},
		},
		form: {
			marginBottom: theme.spacing(8),

			[theme.breakpoints.down('sm')]: {
				width: '75%',
			},

			[theme.breakpoints.down('xs')]: {
				width: '95%',
			},

			width: '55%',

			'& h3': {
				marginBottom: theme.spacing(6),
				textAlign: 'center',
			},
		},
		googleLoginBtn: {
			[theme.breakpoints.down('sm')]: {
				width: '75%',
			},

			[theme.breakpoints.down('xs')]: {
				width: '95%',
			},

			width: '55%',
		},
	};
});

// Formik
const initialValues = {
	email: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required('please provide your email')
		.email('please provide a valid email address'),
});

const Login: React.FC = () => {
	useAuthRoute('not-protected');
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Box className={classes.formContainer}>
				<Formik
					{...{ initialValues, validationSchema }}
					onSubmit={() => {
						console.log('submitted');
					}}>
					{({ isSubmitting }) => {
						return (
							<Box component={Form} className={classes.form}>
								<Typography variant='h3'>Login</Typography>
								<FormInput
									autoComplete='off'
									fullWidth
									name='email'
									label='Email'
									variant='outlined'
								/>
								<Button
									disableElevation
									fullWidth
									size='large'
									color='primary'
									variant='contained'
									type='submit'>
									Send Link
								</Button>
							</Box>
						);
					}}
				</Formik>

				<Box className={classes.googleLoginBtn}>
					<Button
						disableElevation
						fullWidth
						href='/api/auth/google'
						size='large'
						color='secondary'
						variant='contained'>
						Login with google
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;

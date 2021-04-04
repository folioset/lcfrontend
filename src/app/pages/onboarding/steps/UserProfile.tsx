import * as React from 'react';
import { useQueryClient } from 'react-query';
import { Formik, Form } from 'formik';

// MUI
import {
	Box,
	Container,
	Grid,
	Typography,
	makeStyles,
} from '@material-ui/core';

// Components
import FormInput from '../../../components/shared/FormInput/FormInput';

// styles
const useStyles = makeStyles((theme) => {
	return {
		container: {
			height: '75vh',
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
const initialValues = {
	name: 'Guest User',
	email: 'guest@example.com',
	linkedinUrl: '',
};

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
				}}>
				{() => {
					return (
						<Container>
							<Grid container component={Form} spacing={4} autoComplete='off'>
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

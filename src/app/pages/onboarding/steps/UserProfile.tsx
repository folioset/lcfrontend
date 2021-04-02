import * as React from 'react';

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
	linkedinUrl: '',
	githubUrl: '',
};

const UserProfile: React.FC = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography variant='h4'>User Profile</Typography>
			<Formik onSubmit={() => {}} {...{ initialValues }}>
				{() => {
					return (
						<Container>
							<Grid container component={Form} spacing={4} autoComplete='off'>
								<Grid item xl={12}>
									<FormInput
										disabled
										fullWidth
										variant='outlined'
										label='Name'
										name='name'
										required
									/>
								</Grid>
								<Grid item xl={6}>
									<FormInput
										fullWidth
										variant='outlined'
										label='LinkedIn'
										name='linkedinUrl'
										required
									/>
									<FormInput
										fullWidth
										variant='outlined'
										label='Github'
										name='githubUrl'
									/>
								</Grid>
								<Grid item xl={6}>
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

import * as React from 'react';
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
			alignItems: 'center',

			'& h4': {
				textAlign: 'center',
				marginBottom: theme.spacing(10),
				marginTop: theme.spacing(4),
			},
		},
	};
});

// Formik
const initialValues = {
	phoneNumber: '',
	code: '91',
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
	phoneNumber: Yup.string()
		.required('Phone number is required')
		.length(10, 'Please enter a valid phone number')
		.matches(phoneRegExp, 'Please enter a valid phone number'),
});

const AdditionalDetails: React.FC = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography variant='h4'>Contact Information</Typography>
			<Formik onSubmit={() => {}} {...{ validationSchema, initialValues }}>
				{() => {
					return (
						<Container>
							<Grid container component={Form} spacing={4} autoComplete='off'>
								<Grid item xs={1}>
									<FormInput disabled variant='outlined' name='code' />
								</Grid>
								<Grid item xs={11}>
									<FormInput
										fullWidth
										variant='filled'
										label='Phone Number'
										name='phoneNumber'
										required
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

export default AdditionalDetails;

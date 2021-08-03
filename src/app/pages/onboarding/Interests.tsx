import {
	Box,
	Button,
	CircularProgress,
	Container,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import FormInput from '../../components/shared/FormInput';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
import { OnboardingContext } from '../../contexts/OnboardingContext';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			textAlign: 'center',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(3),
			fontSize: 24
		},
		subHeading: {
			textAlign: 'center',
			marginBottom: theme.spacing(3),
	
		}
	};
});

const validationSchema = Yup.object().shape({
	field: Yup.string().required('This field is required'),
	pmK: Yup.number()
		.required('This field is required')
		.max(10, 'max value can only be 10')
		.min(1, 'min value can only be 1'),
	years: Yup.string().required('This field is required'),
});

const initialValues = {
	field: '',
	pmK: 1,
	years: 1,
};

const Interests: React.FC = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const { updateField, isLoading } = React.useContext(OnboardingContext);

	return (
		<>
			<Container
				maxWidth='sm'
				style={{ backgroundColor: 'white', padding: 40, borderRadius: 10 }}>
				<Formik
					{...{ validationSchema, initialValues }}
					onSubmit={async ({ field, pmK, years }) => {
						if (updateField) {
							updateField(field, pmK, years);
						}
					}}>
					{() => {
						return (
							<Form autoComplete='off' noValidate>
								<Box marginBottom={5}>
									<Typography variant='h3' className={classes.heading}>
										Which field are you interested in ?
									</Typography>
									<Typography className={classes.subHeading}>
										Helps us show you relevant content
									</Typography>
								</Box>
								<FormInput
									name='field'
									variant='outlined'
									label='Field'
									required
									fullWidth
								/>
								<FormInput
									name='pmK'
									variant='outlined'
									label='Rate your skill level in product management (1-10)'
									min={1}
									max={10}
									required
									fullWidth
								/>
								<FormInput
									name='years'
									variant='outlined'
									label='How many years of experience do you have in PM ?'
									required
									fullWidth
								/>

								<Button
									type='submit'
									size='small'
									startIcon={
										isLoading ? <CircularProgress size='1rem' /> : null
									}
									variant='contained'
									color='primary'>
									Submit
								</Button>
							</Form>
						);
					}}
				</Formik>
			</Container>
		</>
	);
};

export default Interests;

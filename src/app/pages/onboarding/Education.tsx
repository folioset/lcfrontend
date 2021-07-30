import {
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
import { useHistory, useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
import { OnboardingContext } from '../../contexts/OnboardingContext';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			marginBottom: theme.spacing(5),
			textAlign: 'center',
		},
	};
});

const validationSchema = Yup.object().shape({
	degree: Yup.string().required('This field is required'),
	college: Yup.string().required('This field is required'),
});

const initialValues = {
	degree: '',
	college: '',
};

const Education: React.FC = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const history = useHistory();

	const { updateEducation } = React.useContext(OnboardingContext);

	return (
		<>
			<Container
				maxWidth='sm'
				style={{ backgroundColor: 'white', padding: 40, borderRadius: 10 }}>
				<Formik
					{...{ validationSchema, initialValues }}
					onSubmit={async (values) => {
						if (updateEducation) updateEducation(values.degree, values.college);
						history.push('/onboarding/interests');
					}}>
					{({ isSubmitting }) => {
						return (
							<Form autoComplete='off' noValidate>
								<Typography variant='h3' className={classes.heading}>
									What do you study ?
								</Typography>
								<FormInput
									name='degree'
									variant='outlined'
									label='Your Degree'
									required
									fullWidth
								/>
								<FormInput
									name='college'
									variant='outlined'
									label='College'
									required
									fullWidth
								/>

								<Button
									type='submit'
									size='small'
									startIcon={
										isSubmitting ? <CircularProgress size='1rem' /> : null
									}
									variant='contained'
									color='primary'>
									Next
								</Button>
							</Form>
						);
					}}
				</Formik>
			</Container>
		</>
	);
};

export default Education;

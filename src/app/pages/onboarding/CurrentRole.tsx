import {
	Button,
	Checkbox,
	CircularProgress,
	Container,
	FormControlLabel,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import FormInput from '../../components/shared/FormInput';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
import { OnboardingContext } from '../../contexts/OnboardingContext';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			textAlign: 'center',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(10),
			fontSize: 24
		},
	};
});

const initialValues = {
	jobTitle: '',
	company: '',
	isStudent: false,
};

const CurrentRole: React.FC = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const { updateCurrentRole } = React.useContext(OnboardingContext);
	const classes = useStyles();
	const history = useHistory();

	return (
		<>
			<Container
				maxWidth='sm'
				style={{ backgroundColor: 'white', padding: 40, borderRadius: 10 }}>
				<Formik
					{...{ initialValues }}
					onSubmit={async ({ jobTitle, company, isStudent }, { setErrors }) => {
						if (updateCurrentRole)
							updateCurrentRole(jobTitle, company, isStudent);

						if (isStudent) {
							history.push('/onboarding/education');
						} else {
							if (!jobTitle) {
								setErrors({ jobTitle: 'This Field is Required' });
								return;
							}

							if (!company) {
								setErrors({ company: 'This Field is Required' });
								return;
							}
							history.push('/onboarding/interests');
						}
					}}>
					{({ isSubmitting, handleChange, values }) => {
						console.log(values);
						return (
							<Form autoComplete='off' noValidate>
								<Typography variant='h3' className={classes.heading}>
									Describe your current role
								</Typography>
								<FormInput
									name='jobTitle'
									variant='outlined'
									label='Current Job Title'
									required
									fullWidth
								/>
								<FormInput
									name='company'
									variant='outlined'
									label='Company'
									required
									fullWidth
								/>

								<FormControlLabel
									style={{ display: 'block', marginBottom: 20 }}
									control={
										<Checkbox
											checked={values.isStudent}
											onChange={handleChange}
											name='isStudent'
											color='primary'
										/>
									}
									label='I am a Student'
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

export default CurrentRole;

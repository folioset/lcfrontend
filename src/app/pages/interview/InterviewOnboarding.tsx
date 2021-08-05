import {
	Button,
	makeStyles,
	MenuItem,
	Theme,
	Typography,
} from '@material-ui/core';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import FormInput from '../../components/shared/FormInput';
import FormSelect from '../../components/shared/FormSelect';

interface InterviewOnboardingProps {}

const validationSchema = Yup.object().shape({
	fieldInterest: Yup.string().required('This is a required field'),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		box: {
			padding: theme.spacing(5),
		},
		heading: {
			textAlign: 'center',
			marginBottom: theme.spacing(3),
		},
		subheading: {
			textAlign: 'center',
			marginBottom: theme.spacing(5),
		},
	};
});

const InterviewOnboarding: React.FC<InterviewOnboardingProps> = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<>
			<Box className={classes.box}>
				<Container maxWidth='md'>
					<Typography variant='h3' className={classes.heading}>
						Showcase your skills by taking an interview
					</Typography>
					<Typography variant='subtitle1' className={classes.subheading}>
						Help companies discover your skills, and improve by getting feedback
						from your peers
					</Typography>
					<Container maxWidth='sm'>
						<Formik
							validationSchema={validationSchema}
							initialValues={{
								fieldInterest: '',
								interviewType: 'Product Management',
							}}
							onSubmit={({ fieldInterest, interviewType }) => {
								localStorage.setItem('interviewType', interviewType);
								localStorage.setItem('fieldInterest', fieldInterest);
								history.replace('/interview/room');
							}}>
							{() => {
								return (
									<Form autoComplete='off'>
										<FormInput
											label='Which field are you interested in ?'
											name='fieldInterest'
											fullWidth
											variant='filled'
										/>
										<FormSelect
											name='interviewType'
											label='What type of interview would you like to take ?'>
											{[
												'Product Improvement',
												'Product Design',
												'Product Strategy',
												'Product Metrics',
												'Product Execution',
												'Guesstimation',
											].map((field) => {
												return (
													<MenuItem key={field} value={field}>
														{field}
													</MenuItem>
												);
											})}
										</FormSelect>
										<Button
											type='submit'
											disableElevation
											fullWidth
											size='large'
											color='primary'
											variant='contained'>
											Next
										</Button>
									</Form>
								);
							}}
						</Formik>
					</Container>
				</Container>
			</Box>
		</>
	);
};

export default InterviewOnboarding;

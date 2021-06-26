import {
	Button,
	CircularProgress,
	Container,
	makeStyles,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import FormInput from '../../components/shared/FormInput';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
import FormSelect from '../../components/shared/FormSelect';
import { User } from '../../types';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			marginBottom: theme.spacing(5),
			textAlign: 'center',
		},
	};
});

const validationSchema = Yup.object().shape({
	username: Yup.string().required('This field is required'),
	about: Yup.string().required('This field is required'),
	hours: Yup.number().required('This field is required').positive(),
	interests: Yup.string().required('This field is required'),
});

const OnBoarding: React.FC = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const history = useHistory();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	const { mutate } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'put',
				url: '/api/user//update-essential-details',
				data,
			});
			return res.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries('user');
				history.replace('/dashboard');
			},
		}
	);

	// interests, hours
	const initialValues = {
		username: user?.name || '',
		about: '',
		interests: '',
	};

	return (
		<>
			<Container
				maxWidth='sm'
				style={{ backgroundColor: 'white', padding: 40, borderRadius: 10 }}>
				<Formik
					{...{ validationSchema, initialValues }}
					onSubmit={async (values, { resetForm }) => {
						await mutate(values as any);
						resetForm();
					}}>
					{({ isSubmitting }) => {
						return (
							<Form autoComplete='off'>
								<Typography variant='h4' className={classes.heading}>
									Tell us about yourself
								</Typography>
								<FormInput
									name='about'
									variant='outlined'
									label='What do you do currently? (e.g. CS Student at IIT Bombay'
									required
									fullWidth
								/>
								<FormInput
									type='number'
									name='hours'
									variant='outlined'
									label='How many hours per week can you dedicate to solve the case studies?'
									required
									fullWidth
								/>
								<FormSelect name='interests' label='Interests'>
									{[
										'Consumer tech',
										'Ed-tech',
										'Fin-tech',
										'Health-tech',
										'Enterprise tech (B2B)',
										'E-commerce',
									].map((field) => {
										return <MenuItem value={field}>{field}</MenuItem>;
									})}
								</FormSelect>
								<FormInput
									name='username'
									variant='outlined'
									label='Set your Username'
									required
									fullWidth
								/>
								<Button
									type='submit'
									size='small'
									startIcon={
										isSubmitting ? (
											<CircularProgress
												size='small'
												style={{ color: 'white' }}
											/>
										) : null
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

export default OnBoarding;

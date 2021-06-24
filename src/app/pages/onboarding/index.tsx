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
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			marginBottom: theme.spacing(4),
			textAlign: 'center',
		},
	};
});

const validationSchema = Yup.object().shape({
	username: Yup.string().min(
		3,
		'Too Short! You should atleast have 20 characters'
	),
});

const initialValues = {
	username: '',
};

const OnBoarding: React.FC = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const history = useHistory();
	const queryClient = useQueryClient();
	const { mutate } = useMutation(
		async (data) => {
			try {
				const res = await axios({
					method: 'put',
					url: '/api/user/update-username',
					data,
				});
				return res.data;
			} catch (err) {
				return err;
			}
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries('user');
				history.replace('/dashboard');
			},
			onSettled: (data) => {
				if (data) {
					console.log(data);
				}
			},
		}
	);

	return (
		<>
			<Container maxWidth='sm'>
				<Formik
					{...{ validationSchema, initialValues }}
					onSubmit={async ({ username }, { resetForm }) => {
						await mutate({ username } as any);
						resetForm();
					}}>
					{({ isSubmitting }) => {
						return (
							<Form autoComplete='off'>
								<Typography variant='h4' className={classes.heading}>
									Create a Username to continue
								</Typography>
								<FormInput
									name='username'
									variant='outlined'
									label='User Name'
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
									update Username
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

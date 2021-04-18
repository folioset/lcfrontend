import * as React from 'react';

import * as Yup from 'yup';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Typography,
} from '@material-ui/core';
import Profile from '../../components/dashboard/home/Profile';

import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { User } from '../../types';
import { useHistory } from 'react-router';

const userProfileInitState = (user: any) => {
	return {
		linkedinUrl: user.linkedinUrl || '',
		about: user.about || '',
		phoneNumber: user.phone.phoneNumber || '',
		code: '91',
	};
};

const LinkedInRegExp = /((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!]))?/;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userProfileValidationSchema = Yup.object().shape({
	about: Yup.string().min(
		20,
		'Too Short! You should atleast have 20 characters'
	),
	linkedinUrl: Yup.string().matches(
		LinkedInRegExp,
		'Please enter a valid linkedin url'
	),
	phoneNumber: Yup.string()

		.length(10, 'Please enter a valid phone number')
		.matches(phoneRegExp, 'Please enter a valid phone number'),
});

interface Props {}

const UpdateProfile = (props: Props) => {
	const queryClient = useQueryClient();
	const history = useHistory();
	const user = queryClient.getQueryData<User>('user');

	const { mutate, isLoading } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'POST',
				url: '/api/user/updateDetails',
				data,
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('user', data);
			},
			onSettled: (data) => {
				if (data) {
					if (data.isUpdated) {
						history.replace('/dashboard');
					}
				}
			},
		}
	);

	return (
		<>
			<Box my={6} textAlign='center'>
				<Typography variant='h4'>Edit Profile</Typography>
			</Box>
			<Formik
				initialValues={userProfileInitState(user)}
				validationSchema={userProfileValidationSchema}
				onSubmit={(values) => {
					mutate(values as any);
				}}>
				{({ isValid }) => {
					return (
						<Container>
							<Form autoComplete='off' noValidate>
								<Profile view='edit' />
								<Button
									startIcon={
										isLoading ? <CircularProgress size='1rem' /> : null
									}
									disabled={!isValid || isLoading}
									type='submit'
									variant='contained'
									color='primary'>
									Save details
								</Button>
							</Form>
						</Container>
					);
				}}
			</Formik>
		</>
	);
};

export default UpdateProfile;

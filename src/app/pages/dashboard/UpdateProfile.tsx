import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import Profile from '../../components/dashboard/home/Profile';
import useAuthRoute from '../../hooks/useAuthRoute';

interface Props {}

const UpdateProfile = (props: Props) => {
	useAuthRoute();

	return (
		<>
			<Box mb={2} textAlign='center'>
				<Typography variant='h4'>Update Profile</Typography>
			</Box>

			<Profile view='edit' />
		</>
	);
};

export default UpdateProfile;

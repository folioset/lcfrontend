import { Box, Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
	return (
		<Box p={2} display='flex' justifyContent='center' alignItems='center'>
			<Box mb={5}>
				<Typography>Oops Something Went Wrong</Typography>
			</Box>
			<Button variant='outlined' component={Link} to='/'>
				Back to Home
			</Button>
		</Box>
	);
};

export default ErrorPage;

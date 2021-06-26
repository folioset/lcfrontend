import { Box, Button, makeStyles, Typography, Theme } from '@material-ui/core';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { User } from '../types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: theme.spacing(2),
			flexDirection: 'column',
		},
		heading: {
			color: theme.palette.common.white,
			marginBottom: theme.spacing(5),
			marginTop: theme.spacing(3),
			textAlign: 'center',
		},
	};
});

const ErrorPage: React.FC = () => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');

	return (
		<Box className={classes.root}>
			<Typography className={classes.heading} variant='h2'>
				Page Not Found
			</Typography>
			<Button
				startIcon={<ArrowBackIosIcon />}
				color='primary'
				variant='outlined'
				component={Link}
				to={user ? '/dashboard' : '/'}>
				Back to {user ? 'Dashboard' : 'Home'}
			</Button>
		</Box>
	);
};

export default ErrorPage;

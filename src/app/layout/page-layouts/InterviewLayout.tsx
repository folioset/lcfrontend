import { makeStyles, Theme, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import Avatar from '../../components/shared/Avatar';
import Logo from '../../components/shared/Logo';
import useAuthRoute from '../../hooks/useAuthRoute';
import { User } from '../../types';
import Body from '../Body';

interface InterviewLayoutProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		nav: {
			padding: theme.spacing(3),
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		avatar: {
			display: 'flex',
			alignItems: 'center',
		},
	};
});

const InterviewLayout: React.FC<InterviewLayoutProps> = () => {
	useAuthRoute('/');
	const classes = useStyles();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');

	return (
		<>
			<Box className={classes.nav}>
				<Logo />
				<Box className={classes.avatar} style={{ gap: '1rem' }}>
					<Avatar alt={user?.name} src={user?.profilePicture} />
					<Typography variant='subtitle1'>
						{user?.name?.split(' ')[0]}
					</Typography>
				</Box>
			</Box>
			<Body />
		</>
	);
};

export default InterviewLayout;

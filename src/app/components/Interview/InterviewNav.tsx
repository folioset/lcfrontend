import { makeStyles, Theme, Box, Avatar, Typography } from '@material-ui/core';
import * as React from 'react';
import { User } from '../../types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useQueryClient } from 'react-query';

import Logo from '../shared/Logo';
import { InterviewContext } from '../../contexts/InterviewContext';
import NavItem from '../../layout/Navigation/desktop/NavItem';
import { useLocation } from 'react-router-dom';

interface InterviewNavProps {}

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

const InterviewNav: React.FC<InterviewNavProps> = () => {
	const classes = useStyles();
	const location = useLocation();
	const queryClient = useQueryClient();
	const { isRecording } = React.useContext(InterviewContext);
	const user = queryClient.getQueryData<User>('user');

	return (
		<>
			<Box className={classes.nav}>
				<Box>
					<Logo />
				</Box>

				<Box className={classes.avatar} style={{ gap: '1rem' }}>
					{!isRecording && location.pathname !== '/interview/finish' && (
						<NavItem exact to='/' icon={<ExitToAppIcon />}>
							Exit Interview
						</NavItem>
					)}
				</Box>
			</Box>
		</>
	);
};

export default InterviewNav;

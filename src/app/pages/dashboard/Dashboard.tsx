import * as React from 'react';
// import { useQueryClient } from 'react-query';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import Profile from '../../components/dashboard/home/Profile';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			height: '100vh',
			backgroundColor: theme.palette.common.white,
			padding: theme.spacing(4),

			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2),
				height: 'auto',
				minHeight: '100vh',
			},

			[theme.breakpoints.down('sm')]: {
				padding: 0,
			},
		},
		heading: {
			marginBottom: theme.spacing(4),

			[theme.breakpoints.down('sm')]: {
				fontSize: 30,
			},
		},
	};
});

const Schedule: React.FC = () => {
	const classes = useStyles();
	// const queryClient = useQueryClient();

	return (
		<>
			<Box className={classes.root}>
				<Container maxWidth={'md'}>
					<Box my={5}>
						<Profile view='private' />
					</Box>
					<Typography>Yo</Typography>
				</Container>
			</Box>
		</>
	);
};

export default Schedule;

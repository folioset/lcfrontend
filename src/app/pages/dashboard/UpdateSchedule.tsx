import * as React from 'react';

// Material UI

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Card, CircularProgress, makeStyles } from '@material-ui/core';

// Context
import { ScheduleContext } from '../../contexts/ScheduleContext';

// Components
import ScheduleCard from '../../components/dashboard/schedule/ScheduleCard';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			height: '100vh',
			backgroundColor: theme.palette.grey['200'],
			padding: theme.spacing(4),
		},
		scheduleContainer: {
			padding: theme.spacing(5),
			borderRadius: theme.spacing(0.5),
			backgroundColor: '#fff',

			'& h4': {
				marginBottom: theme.spacing(3),
			},
		},
		btn: {
			marginTop: theme.spacing(3),
		},
	};
});

const UpdateSchedule: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();
	const { updateExistingSchedule, isBooked } = React.useContext(
		ScheduleContext
	);
	const queryClient = useQueryClient();

	React.useEffect(() => {
		if (!isBooked) {
			history.replace('/dashboard/schedule');
		}
	}, [history, isBooked]);

	const { mutate, isLoading } = useMutation(
		async () => {
			const res = await axios({
				method: 'POST',
				url: '/api/user/updateSchedule',
				data: {
					schedule: updateExistingSchedule,
				},
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('schedule', data.schedule);
				queryClient.setQueryData('user', data);
			},
			onSettled: (data) => {
				if (data) {
					history.push('/dashboard');
				}
			},
		}
	);

	return (
		<Box className={classes.root}>
			<Container maxWidth={'md'}>
				<Card variant='outlined' className={classes.scheduleContainer}>
					<Container maxWidth='sm'>
						<Typography variant='h4'>Update Schedule</Typography>
						<ScheduleCard update />
					</Container>
				</Card>
				{updateExistingSchedule?.new && (
					<Button
						onClick={() => mutate()}
						startIcon={isLoading ? <CircularProgress size='1rem' /> : null}
						color='primary'
						variant='outlined'
						className={classes.btn}>
						Update Time Slot
					</Button>
				)}
			</Container>
		</Box>
	);
};

export default UpdateSchedule;

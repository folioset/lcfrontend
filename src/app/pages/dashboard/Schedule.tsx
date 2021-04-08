import * as React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

// Context
import { ScheduleContext } from '../../contexts/ScheduleContext';

// Components
import ScheduleCard from '../../components/dashboard/schedule/ScheduleCard';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			height: '100vh',
			backgroundColor: theme.palette.grey['200'],
			padding: theme.spacing(4),

			[theme.breakpoints.down('lg')]: {
				padding: 0,
				paddingTop: theme.spacing(3),
			},
		},
		scheduleContainer: {
			padding: theme.spacing(5),
			borderRadius: theme.spacing(0.5),
			backgroundColor: '#fff',

			'& h5': {
				marginBottom: theme.spacing(3),
			},

			[theme.breakpoints.down('lg')]: {
				padding: theme.spacing(1),
			},
		},

		btn: {
			marginTop: theme.spacing(3),
		},
	};
});

const Schedule: React.FC = () => {
	const classes = useStyles();
	const {
		newSchedule,
		saveNewSchedule,
		isBooked,
		saveNewScheduleLoading,
	} = React.useContext(ScheduleContext);

	return (
		<Box className={classes.root}>
			<Container maxWidth={'md'}>
				<Card variant='outlined' className={classes.scheduleContainer}>
					<Container maxWidth='sm'>
						<Typography variant='h5'>
							Schedule Your First Learning Call
						</Typography>
						<ScheduleCard />
					</Container>
				</Card>
				{!isBooked ? (
					newSchedule!.length > 0 && (
						<Button
							onClick={saveNewSchedule}
							startIcon={
								saveNewScheduleLoading ? <CircularProgress size='1rem' /> : null
							}
							color='primary'
							variant='outlined'
							className={classes.btn}>
							Sign Up for this week
						</Button>
					)
				) : (
					// : (
					// 	<Button color='primary' variant='outlined' className={classes.btn}>
					// 		Pass for this week
					// 	</Button>
					// )
					<Box textAlign='center' mt={3}>
						<Typography color='error'>
							You have booked your slot for this week
						</Typography>
						<Box mt={2}>
							<Button color='primary' component={Link} to='/dashboard'>
								Check your slot
							</Button>
						</Box>
					</Box>
				)}
			</Container>
		</Box>
	);
};

export default Schedule;

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

const Schedule: React.FC = () => {
	const classes = useStyles();
	const {
		newSchedule,
		saveNewSchedule,
		saveNewScheduleLoading,
	} = React.useContext(ScheduleContext);

	return (
		<Box className={classes.root}>
			<Container maxWidth={'md'}>
				<Card variant='outlined' className={classes.scheduleContainer}>
					<Container maxWidth='sm'>
						<Typography variant='h4'>Schedule Now</Typography>
						<ScheduleCard />
					</Container>
				</Card>
				{newSchedule!.length > 0 && (
					<Button
						onClick={saveNewSchedule}
						startIcon={
							saveNewScheduleLoading ? <CircularProgress size='1rem' /> : null
						}
						color='primary'
						variant='contained'
						className={classes.btn}>
						Sign Up for {newSchedule?.length} match
					</Button>
				)}
			</Container>
		</Box>
	);
};

export default Schedule;

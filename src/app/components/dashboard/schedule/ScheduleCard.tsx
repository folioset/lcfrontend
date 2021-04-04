import * as React from 'react';

// Material UI
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

// Components

import ScheduleDayItem from './ScheduleDayList';

// Styles

const useStyles = makeStyles((theme) => {
	return {
		scheduleCard: {
			backgroundColor: 'transparent',
			padding: theme.spacing(4),

			'& > *': {
				textAlign: 'center',
			},
		},
	};
});

// Constants

const REQUIRED_DATES = {
	'3': ['6 pm'],
	'4': ['7 pm'],
	'6': ['12 pm', '5 pm'],
	'7': ['12 pm', '6 pm'],
};

const ScheduleCard: React.FC = () => {
	const classes = useStyles();

	return (
		<Card variant='outlined' elevation={0} className={classes.scheduleCard}>
			<Grid container justify='center'>
				{[1, 2, 3, 4, 5, 6, 7].map((day: number, i: number) => {
					const requiredDates = { ...REQUIRED_DATES } as any;
					if (Object.keys(requiredDates).includes(`${day}`)) {
						return <ScheduleDayItem key={i} {...{ day, requiredDates }} />;
					} else {
						return null;
					}
				})}
			</Grid>
		</Card>
	);
};

export default ScheduleCard;

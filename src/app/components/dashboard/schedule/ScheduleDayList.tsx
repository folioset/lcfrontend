import * as React from 'react';
import { format } from 'date-fns';
import add from 'date-fns/add';

// Material UI

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components

import ScheduleDayItem from './ScheduleDayItem';

// Styles
const useStyles = makeStyles(() => {
	return {
		textUppercase: {
			textTransform: 'uppercase',
		},
	};
});

// Types
interface Props {
	day: number;
	requiredDates: any;
}

// Constants
const DAYS = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
];

const MONTHS = [
	'jan',
	'feb',
	'mar',
	'apr',
	'may',
	'june',
	'july',
	'aug',
	'sept',
	'oct',
	'nov',
	'dec',
];

const ScheduleDayList: React.FC<Props> = ({ day, requiredDates }) => {
	const classes = useStyles();
	const date = add(new Date(Date.now()), { days: day });
	const month = new Date(Date.now()).getMonth();
	const year = new Date(Date.now()).getFullYear();

	return (
		<Grid item md={3} key={day}>
			<Typography className={classes.textUppercase} variant='h6'>
				{DAYS[date.getDay()]}
			</Typography>
			<Typography className={classes.textUppercase} variant='caption'>
				{format(date, 'dd')} {MONTHS[date.getMonth()]}
			</Typography>
			<Box
				mt={3}
				display='flex'
				alignItems='center'
				flexDirection='column'
				textAlign='center'>
				{requiredDates[`${day}`].map((time: string, i: number) => {
					return <ScheduleDayItem key={i} {...{ time, day, month, year }} />;
				})}
			</Box>
		</Grid>
	);
};

export default ScheduleDayList;

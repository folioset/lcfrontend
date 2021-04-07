import * as React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components
import ScheduleDayItem from './ScheduleDayItem';
// Styles
const useStyles = makeStyles((theme) => {
	return {
		day: {
			textTransform: 'uppercase',
			fontWeight: 500,
			color: theme.palette.primary.main,
		},
		textUppercase: {
			textTransform: 'uppercase',
		},
	};
});

// Types
interface Props {
	data: any;
	update?: boolean;
}

// Constants
const DAYS = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
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

const ScheduleDayList: React.FC<Props> = ({ data, update }) => {
	const classes = useStyles();
	const { date: fullDate, time } = data;
	const month = fullDate.getMonth();
	const year = fullDate.getFullYear();
	const day = fullDate.getDay();
	const date = fullDate.getDate();

	return (
		<>
			<Grid item md={3}>
				<Typography className={classes.day} variant='body1'>
					{DAYS[day]}
				</Typography>
				<Typography className={classes.textUppercase} variant='caption'>
					{date} {MONTHS[month]}
				</Typography>
				<Box
					mt={3}
					display='flex'
					alignItems='center'
					flexDirection='column'
					textAlign='center'>
					{time.map((time: string, i: number) => {
						return (
							<ScheduleDayItem
								update={update}
								key={i}
								{...{ time, day, month, year, date }}
							/>
						);
					})}
				</Box>
			</Grid>
		</>
	);
};

export default ScheduleDayList;

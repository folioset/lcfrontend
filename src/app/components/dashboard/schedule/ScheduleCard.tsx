import * as React from 'react';

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components

import ScheduleDayList from './ScheduleDayList';
import add from 'date-fns/add';
import { ScheduleContext } from '../../../contexts/ScheduleContext';
import { NextWeekDate, Schedule, User } from '../../../types';
import { useQueryClient } from 'react-query';

// Styles

const useStyles = makeStyles((theme) => {
	return {
		scheduleCard: {
			backgroundColor: 'transparent',

			'& > *': {
				textAlign: 'center',
			},
		},
		grid: {
			padding: theme.spacing(4),
		},
		scheduleCardFooter: {
			backgroundColor: 'rgba(204, 204, 204, .34)',

			'& span': {
				display: 'block',
				marginLeft: 'auto',
			},
		},
	};
});

// Constants

const REQUIRED_DATES = {
	'4': ['6-pm'], // Thursday
	'3': ['7-pm'], // Wednesday
	'6': ['12-pm', '5-pm'], // Saturday
	'0': ['12-pm', '6-pm'], // Sunday
};

const getNextWeekDates = (date: Date) => {
	let day: number | Date | null;
	let dayNow = date.getDay();
	for (let i = 0; i < 7; i++) {
		if (i + dayNow === 6) {
			day = add(date, { days: i + 1 });
		}
	}

	let days = [];
	const requiredDates = { ...REQUIRED_DATES } as any;
	for (let i = 0; i < 7; i++) {
		const newFullDate = add(day!, { days: i });
		const newDay = newFullDate.getDay();

		if ([4, 3, 6, 0].includes(newDay)) {
			days.push({
				date: newFullDate,
				time: requiredDates[newDay],
			});
		}
	}
	return days;
};

const getAvailableDates = (nextWeekDates: NextWeekDate[], user: any) => {
	const dates: Schedule[] = [];
	nextWeekDates.forEach((el1) => {
		el1.time.forEach((el2) => {
			const date = el1.date.getDate();
			const day = el1.date.getDay();
			const month = el1.date.getMonth();
			const year = el1.date.getFullYear();
			const time = el2;

			dates.push({
				_id: `${user._id}__${day}-${date}-${month}-${year}-${time}`,
				day,
				month,
				year,
				time,
				date,
			});
		});
	});
	return dates;
};

interface Props {
	update?: boolean;
}

const ScheduleCard: React.FC<Props> = ({ update }) => {
	const classes = useStyles();
	const [nextWeekDates, setNextWeekDates] = React.useState<
		NextWeekDate[] | null
	>();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const { setAvailableDates } = React.useContext(ScheduleContext);

	React.useEffect(() => {
		setNextWeekDates(getNextWeekDates(new Date(Date.now())));
	}, []);

	React.useEffect(() => {
		if (nextWeekDates && nextWeekDates!.length > 0) {
			setAvailableDates!(getAvailableDates(nextWeekDates, user));
		}
	}, [nextWeekDates, setAvailableDates, user]);

	if (update) {
		return (
			<>
				{nextWeekDates && (
					<Card
						variant='outlined'
						elevation={0}
						className={classes.scheduleCard}>
						<Grid className={classes.grid} container justify='center'>
							{nextWeekDates.map((data: NextWeekDate, i: number) => {
								return <ScheduleDayList key={i} {...{ data, update }} />;
							})}
						</Grid>
						<CardActions className={classes.scheduleCardFooter}>
							<Typography variant='caption'>These times are in IST</Typography>
						</CardActions>
					</Card>
				)}
			</>
		);
	}

	return (
		<>
			{nextWeekDates && (
				<Card variant='outlined' elevation={0} className={classes.scheduleCard}>
					<Grid className={classes.grid} container justify='center'>
						{nextWeekDates.map((data: NextWeekDate, i: number) => {
							return <ScheduleDayList key={i} {...{ data }} />;
						})}
					</Grid>
					<CardActions className={classes.scheduleCardFooter}>
						<Typography variant='caption'>These times are in IST</Typography>
					</CardActions>
				</Card>
			)}
		</>
	);
};

export default ScheduleCard;

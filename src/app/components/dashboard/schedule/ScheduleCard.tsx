import * as React from 'react';
import add from 'date-fns/add';
import { useQueryClient } from 'react-query';

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// context
import { ScheduleContext } from '../../../contexts/ScheduleContext';

// Components
import ScheduleDayList from './ScheduleDayList';

// Types
import { NextWeekDate, Schedule, User } from '../../../types';

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

			[theme.breakpoints.down('xl')]: {
				padding: theme.spacing(2),
			},

			[theme.breakpoints.down('md')]: {
				padding: 0,
			},
		},
		scheduleCardFooter: {
			backgroundColor: 'rgba(204, 204, 204, .34)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',

			'& span': {
				display: 'block',
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
	let newDate = date;
	let day: number | Date | null;
	for (let i = 0; i < 7; i++) {
		day = newDate;
	}
	let days = [];
	const requiredDates = { ...REQUIRED_DATES } as any;
	let endOfWeek = false;

	for (let i = 0; i < 7; i++) {
		const newFullDate = add(day!, { days: i });
		const newDay = newFullDate.getDay();

		if (
			([3, 4, 6].includes(newDay) && [3, 4, 6].map((el) => el <= newDay)[0]) ||
			newDay === 0
		) {
			console.log({ newDay });

			days.push({
				date: newFullDate,
				time: requiredDates[newDay],
			});

			if (newDay === 0) {
				endOfWeek = true;
			}
		}

		if (endOfWeek) {
			break;
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
								return (
									<Grid item xl={3}>
										<ScheduleDayList key={i} {...{ data, update }} />
									</Grid>
								);
							})}
						</Grid>
						<CardActions className={classes.scheduleCardFooter}>
							<Typography variant='caption'>Choose times to meet!</Typography>
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
						<Typography variant='caption'>Choose times to meet!</Typography>
						<Typography variant='caption'>These times are in IST</Typography>
					</CardActions>
				</Card>
			)}
		</>
	);
};

export default ScheduleCard;

import * as React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// Context

import { ScheduleContext } from '../../../contexts/ScheduleContext';

// Types
interface Props {
	time: string;
	day: number;
	month: number;
	year: number;
}

// Styles
const useStyles = makeStyles((theme) => {
	return {
		btn: {
			marginBottom: theme.spacing(0.5),
		},
	};
});

const ScheduleDayItem: React.FC<Props> = ({ time, day, month, year }) => {
	const [selected, setSelected] = React.useState<boolean>(false);
	const { addToSchedule, removeFromSchedule } = React.useContext(
		ScheduleContext
	);
	const classes = useStyles();

	const updateSchedule = () => {
		if (!selected) {
			addToSchedule!({
				time,
				day,
				month,
				year,
			});
		} else {
			removeFromSchedule!(`${day}-${month}-${year}-${time}`);
		}
		setSelected(!selected);
	};

	return (
		<Button
			disableElevation
			onClick={updateSchedule}
			color={selected ? 'secondary' : 'default'}
			variant={selected ? 'contained' : 'text'}
			className={classes.btn}
			disabled={time === '-'}>
			{time === '-' ? <span>&nbsp;</span> : time}
		</Button>
	);
};

export default ScheduleDayItem;

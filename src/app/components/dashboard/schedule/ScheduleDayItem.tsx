import * as React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core';

// Context

import { ScheduleContext } from '../../../contexts/ScheduleContext';
import { useQueryClient } from 'react-query';

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
		btnDisabled: {
			color: theme.palette.grey[400],
			cursor: 'context-menu',
			'&:hover': {
				backgroundColor: 'transparent',
			},
		},
	};
});

const ScheduleDayItem: React.FC<Props> = ({ time, day, month, year }) => {
	const [selected, setSelected] = React.useState<boolean>(false);
	const { addToSchedule, removeFromSchedule } = React.useContext(
		ScheduleContext
	);
	const classes = useStyles();
	const queryClient = useQueryClient();
	const schedule = queryClient.getQueryData('schedule') as any;
	const user = queryClient.getQueryData('user') as any;

	const disabled = schedule?.findIndex(
		(el: any) => el._id === `${user._id}__${day}-${month}-${year}-${time}`
	);

	const updateSchedule = () => {
		if (disabled === -1) {
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
		}
	};

	if (disabled !== -1) {
		return (
			<Tooltip
				arrow
				title='You have already booked for this time slot'
				aria-label='booked'>
				<Button
					disableTouchRipple
					disableElevation
					className={classes.btnDisabled}>
					{time === '-' ? <span>&nbsp;</span> : time.split('-').join(' ')}
				</Button>
			</Tooltip>
		);
	}

	return (
		<Button
			disableElevation
			onClick={updateSchedule}
			color={selected ? 'secondary' : 'default'}
			variant={selected ? 'contained' : 'text'}
			className={classes.btn}>
			{time === '-' ? <span>&nbsp;</span> : time.split('-').join(' ')}
		</Button>
	);
};

export default ScheduleDayItem;

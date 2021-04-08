import * as React from 'react';
import { useQueryClient } from 'react-query';

// Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// Context

import { ScheduleContext } from '../../../contexts/ScheduleContext';

// types
import { User } from '../../../types';

// Types
interface Props {
	time: string;
	day: number;
	month: number;
	year: number;
	date: number;
	update?: boolean;
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

const ScheduleDayItem: React.FC<Props> = ({
	time,
	day,
	month,
	year,
	date,
	update,
}) => {
	const [selected, setSelected] = React.useState<boolean>(false);
	const {
		newSchedule,
		isBooked,
		addToSchedule,
		removeFromSchedule,
		setUpdateExistingSchedule,
		updateExistingSchedule,
	} = React.useContext(ScheduleContext);
	const classes = useStyles();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const _id = `${user._id}__${day}-${date}-${month}-${year}-${time}`;

	// Create
	React.useEffect(() => {
		if (newSchedule!.findIndex((el) => el._id === _id) === -1) {
			setSelected(false);
		} else {
			setSelected(true);
		}
	}, [newSchedule, _id]);

	// Update
	React.useEffect(() => {
		if (
			updateExistingSchedule &&
			updateExistingSchedule.new &&
			updateExistingSchedule.new._id === _id &&
			updateExistingSchedule.old._id !== _id
		) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [updateExistingSchedule, _id]);

	const updateSchedule = () => {
		if (!isBooked) {
			if (!selected) {
				addToSchedule!({
					time,
					day,
					month,
					year,
					date,
				});
			} else {
				removeFromSchedule!(
					`${user._id}__${day}-${date}-${month}-${year}-${time}`
				);
			}
		}

		if (update) {
			if (updateExistingSchedule.old._id !== _id) {
				setUpdateExistingSchedule!({
					...updateExistingSchedule,
					new: {
						time,
						day,
						month,
						year,
						date,
						_id,
					},
				});
			} else {
				setUpdateExistingSchedule!({
					...updateExistingSchedule,
					new: null,
				});
			}
		}
	};

	if (isBooked && !update) {
		return (
			<Button
				disableTouchRipple
				disableElevation
				className={classes.btnDisabled}>
				{time === '-' ? <span>&nbsp;</span> : time.split('-').join(' ')}
			</Button>
		);
	}

	return (
		<Button
			disableElevation
			onClick={updateSchedule}
			color={selected ? 'secondary' : 'default'}
			variant={
				selected
					? 'contained'
					: update &&
					  updateExistingSchedule &&
					  updateExistingSchedule.old._id === _id
					? 'outlined'
					: 'text'
			}
			className={classes.btn}>
			{time === '-' ? <span>&nbsp;</span> : time.split('-').join(' ')}
		</Button>
	);
};

export default ScheduleDayItem;

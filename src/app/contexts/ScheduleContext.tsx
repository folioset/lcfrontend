import * as React from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

// types
import { Schedule, User } from '../types';

interface ScheduleContextProps {
	newSchedule?: Schedule[];
	addToSchedule?: (s: Schedule) => void;
	removeFromSchedule?: (_id: string) => void;
	saveNewScheduleLoading: boolean;
	saveNewSchedule: () => void;
	userScheduleLoading: boolean;
	availableDates: Schedule[];
	setAvailableDates: React.Dispatch<React.SetStateAction<Schedule[]>>;
	isBooked: boolean;
	updateExistingSchedule: any;
	setUpdateExistingSchedule: any;
}

export const ScheduleContext = React.createContext<
	Partial<ScheduleContextProps>
>({});

const ScheduleContextProvider: React.FC<any> = ({ children }) => {
	const history = useHistory();

	// New Dates
	const [newSchedule, setNewSchedule] = React.useState<Schedule[]>([]);

	// Avaiable Dates
	const [availableDates, setAvailableDates] = React.useState<Schedule[]>([]);
	const [isBooked, setIsBooked] = React.useState<boolean>(false);
	const queryClient = useQueryClient();
	const userSchedule = queryClient.getQueryData<Schedule[]>('schedule');
	const user = queryClient.getQueryData<User>('user')!;
	const [
		updateExistingSchedule,
		setUpdateExistingSchedule,
	] = React.useState<any>();

	const { isLoading: userScheduleLoading } = useQuery(
		'schedule',
		async () => {
			const res = await axios({
				method: 'GET',
				url: '/api/user/getSchedule',
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				setUpdateExistingSchedule({
					...updateExistingSchedule,
					old: {
						...data[0],
					},
				});
			},
		}
	);

	// Add new schedule
	const { mutate, isLoading: saveNewScheduleLoading } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'POST',
				url: '/api/user/createSchedule',
				data,
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('schedule', data.schedule);
				queryClient.setQueryData('user', data);
			},
			onSettled: (data) => {
				if (data) {
					history.push('/dashboard');
				}
			},
		}
	);

	const addToSchedule = (scheduleItem: Schedule) => {
		const { day, month, year, time, date } = scheduleItem;
		const updatedScheduleItem: Schedule = {
			...scheduleItem,
			_id: `${user._id}__${day}-${date}-${month}-${year}-${time}`,
		};
		const updatedYourSchedule: Schedule[] = [updatedScheduleItem];
		setNewSchedule(updatedYourSchedule);
	};

	const removeFromSchedule = (scheduleItemId: string) => {
		const updatedyourSchedule: Schedule[] = [...newSchedule].filter(
			(si) => si._id !== scheduleItemId
		);
		setNewSchedule(updatedyourSchedule);
	};

	const saveNewSchedule = () => {
		if (newSchedule.length > 0) {
			mutate({ schedule: newSchedule } as any);
		}
	};

	React.useEffect(() => {
		if (userSchedule && userSchedule.length > 0) {
			let exists = true;
			userSchedule.forEach((el) => {
				availableDates.forEach((el2) => {
					if (exists && el2._id === el._id) {
						setIsBooked(true);
					}
				});
			});
			setIsBooked(exists);
		} else {
			setIsBooked(false);
			setNewSchedule([]);
		}
	}, [userSchedule, availableDates]);

	return (
		<ScheduleContext.Provider
			value={{
				newSchedule,
				addToSchedule,
				removeFromSchedule,
				saveNewSchedule,
				saveNewScheduleLoading,
				userScheduleLoading,
				setAvailableDates,
				isBooked,
				availableDates,
				updateExistingSchedule,
				setUpdateExistingSchedule,
			}}>
			{children}
		</ScheduleContext.Provider>
	);
};

export default ScheduleContextProvider;

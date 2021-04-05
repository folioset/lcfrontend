import * as React from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface Schedule {
	_id?: string;
	day: number;
	month: number;
	year: number;
	time: string;
}

interface ScheduleContextProps {
	newSchedule?: Schedule[];
	addToSchedule?: (s: Schedule) => void;
	removeFromSchedule?: (_id: string) => void;
	saveNewScheduleLoading: boolean;
	saveNewSchedule: () => void;
	userScheduleLoading: boolean;
}

export const ScheduleContext = React.createContext<
	Partial<ScheduleContextProps>
>({});

const ScheduleContextProvider: React.FC<any> = ({ children }) => {
	const [newSchedule, setNewSchedule] = React.useState<Schedule[]>([]);
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user') as any;
	const { isLoading: userScheduleLoading } = useQuery('schedule', async () => {
		const res = await axios({
			method: 'GET',
			url: '/api/user/getSchedule',
		});
		return res.data;
	});

	// Add new schedule
	const { mutate, isLoading: saveNewScheduleLoading } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'POST',
				url: '/api/user/updateSchedule',
				data,
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('schedule', data.schedule);
				queryClient.setQueryData('user', data);
			},
		}
	);

	const addToSchedule = (scheduleItem: Schedule) => {
		const { day, month, year, time } = scheduleItem;
		const updatedScheduleItem: Schedule = {
			...scheduleItem,
			_id: `${user._id}__${day}-${month}-${year}-${time}`,
		};
		const updatedYourSchedule: Schedule[] = [
			...newSchedule,
			updatedScheduleItem,
		];
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

	return (
		<ScheduleContext.Provider
			value={{
				newSchedule,
				addToSchedule,
				removeFromSchedule,
				saveNewSchedule,
				saveNewScheduleLoading,
				userScheduleLoading,
			}}>
			{children}
		</ScheduleContext.Provider>
	);
};

export default ScheduleContextProvider;

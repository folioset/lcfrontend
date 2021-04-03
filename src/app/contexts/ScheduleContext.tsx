import * as React from 'react';

interface YourSchedule {
	_id?: string;
	day: number;
	month: number;
	year: number;
	time: string;
}

interface ScheduleContextProps {
	yourSchedule?: YourSchedule[];
	addToSchedule?: (s: YourSchedule) => void;
	removeFromSchedule?: (_id: string) => void;
	children: any;
}

export const ScheduleContext = React.createContext<
	Partial<ScheduleContextProps>
>({});

const ScheduleContextProvider: React.FC<ScheduleContextProps> = ({
	children,
}: any) => {
	const [yourSchedule, setYourSchedule] = React.useState<YourSchedule[]>([]);

	const addToSchedule = (scheduleItem: YourSchedule) => {
		const { day, month, year, time } = scheduleItem;
		const updatedScheduleItem: YourSchedule = {
			...scheduleItem,
			_id: `${day}-${month}-${year}-${time}`,
		};
		const updatedYourSchedule: YourSchedule[] = [
			...yourSchedule,
			updatedScheduleItem,
		];
		setYourSchedule(updatedYourSchedule);
	};

	const removeFromSchedule = (scheduleItemId: string) => {
		const updatedyourSchedule: YourSchedule[] = [...yourSchedule].filter(
			(si) => si._id !== scheduleItemId
		);
		setYourSchedule(updatedyourSchedule);
	};

	return (
		<ScheduleContext.Provider
			value={{ yourSchedule, addToSchedule, removeFromSchedule }}>
			{children}
		</ScheduleContext.Provider>
	);
};

export default ScheduleContextProvider;

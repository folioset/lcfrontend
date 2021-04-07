export type Schedule = {
	_id?: string;
	day: number;
	date: number;
	month: number;
	year: number;
	time: string;
};

export type NextWeekDate = {
	date: Date;
	time: string[];
};

type Phone = {
	phoneNumber: string | number;
	code: string | number;
};

export type CareerOptions = {
	_id: string;
	name: string;
};

export type User = {
	_id: string;
	objectives?: string[];
	name: string;
	email: string;
	linkedinUrl?: string;
	about?: string;
	phoneNumber?: Phone;
	isUpdated?: boolean;
	schedule: Schedule[];
	careerOptions: CareerOptions[];
};

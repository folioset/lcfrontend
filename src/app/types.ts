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
	phone?: Phone;
	isUpdated?: boolean;
	schedule: Schedule[];
	careerOptions: CareerOptions[];
};

export type Project = {
	contributors: string[];
	createdAt: Date | string | number;
	createdBy: string;
	description: string;
	projectFile: string;
	reviewsAndRatings?: any;
	title: string;
	updatedAt?: Date | string | number;
	__v?: number;
	_id: string;
};

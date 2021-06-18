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
	isVerified: boolean;
	username?: string;
	profilePicture?: string;
};

export type Project = {
	contributors: string[];
	createdAt: Date | string | number;
	createdBy: string;
	description: string;
	projectFile: string;
	ratings?: any;
	title: string;
	updatedAt?: Date | string | number;
	__v?: number;
	_id: string;
};

export type Review = {
	category: 'suggestion' | 'comment';
	created: Date | string | number;
	createdBy: string;
	review: string;
	_id: string;
};

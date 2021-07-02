type Phone = {
	phoneNumber: string | number;
	code: string | number;
};

export type User = {
	id?: string;
	_id: string;
	name: string;
	email: string;
	linkedinUrl?: string;
	about?: string;
	phone?: Phone;
	isVerified: boolean;
	username?: string;
	profilePicture?: string;
	location?: string;
	numberOfProjects?: number;
};

export type Project = {
	contributors: any;
	createdAt: Date | string | number;
	updateAt?: Date | string | number;
	createdBy: string;
	description: string;
	projectFile: string;
	ratings?: any;
	title: string;
	updatedAt?: Date | string | number;
	avgRating?: number;
	_id: string;
	numberOfRatings: number;
	tools: string[];
	skills: string[];
};

export type ProjectFeed = Project & {
	username: string;
	name: string;
	profilePicture: string;
};

export type Like = {
	_id: string;
	createdBy: string;
};

export type ReviewDetail = {
	category: 'suggestion' | 'comment';
	createdAt: Date | string | number;
	updatedAt: Date | string | number;

	createdBy: string;
	review: string;
	_id: string;
	replies?: string[];
	likes?: Like[];
};

export type Review = {
	username?: string;
	name: string;
	profilePicture?: string;
	about?: string;
	reviewDetails: ReviewDetail;
};

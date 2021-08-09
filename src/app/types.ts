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
	currentCompany?: string;
	jobTitle?: string;
	degree?: string;
	college?: string;
	isStudent?: boolean;
	field?: string;
	knowledgeLevel?: number;
	experience?: number;
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
	contributorDetailsArr?: User[];
	lastUpdatedDate?: Date;
	fineRatings: number;
	goodRatings: number;
	reviews: string[];
	excellentRatings: number;
	extraOrdinaryRatings: number;
	videoFile: string;
	videoInterviewQuestion: string;
};

export type Answer = Challenge & {
	_id: string;
	text: string;
	createdAt: Date | string | number;
	updateAt?: Date | string | number;
	projectFile: string;
	description: string;
	ratings?: any;
	fineRatings: number;
	goodRatings: number;
	excellentRatings: number;
	extraOrdinaryRatings: number;
};

export type Challenge = {
	createdAt: Date | string | number;
	updateAt?: Date | string | number;
	createdBy: {
		username: string;
		name: string;
		about: string;
		profilePicture: string;
		_id: string;
	};
	isCaseStudy: boolean;
	title: string;
	description: string;
	answers: Answer[];
	updatedAt?: Date | string | number;
	_id: string;
	lastUpdatedDate?: Date;
	closeAnswers: boolean;
};

export type ProjectFeed = Project & {
	username: string;
	name: string;
	about: string;
	profilePicture: string;
};

export type ChallengeFeed = Challenge & {
	username: string;
	name: string;
	about: string;
	profilePicture: string;
};

export type Like = {
	_id: string;
	createdBy: string;
};

export type ReviewDetail = {
	category: string;
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

export type NotifiType = {
	userid: string,
	notifyfrom: string,
	notifyfromname: string,
	notifyfromprofile: string,
	timenotified: Date,
	message: string,
	projectid: string,
}
import axios from 'axios';
import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

interface OnboardingProps {
	photo?: File;
	currentJob?: string;
	company?: string;
	degree?: string;
	college?: string;
	field?: string;
	pmKnowledge?: number;
	years?: number;
	isStudent?: boolean;
	setPhoto?: React.Dispatch<React.SetStateAction<File | undefined>>;
	updateField?: (field: string, pmKnw: number, years: number) => void;
	updateCurrentRole?: (job: string, c: string, s: boolean) => void;
	updateEducation?: (deg: string, college: string) => void;
	isLoading?: boolean;
}

export const OnboardingContext = React.createContext<Partial<OnboardingProps>>(
	{}
);

const OnboardingContextProvider: React.FC<OnboardingProps> = ({
	children,
}: any) => {
	const [photo, setPhoto] = React.useState<File>();
	const [currentJob, setCurrentJob] = React.useState<string>('');
	const [company, setCompany] = React.useState<string>('');
	const [degree, setDegree] = React.useState<string>('');
	const [college, setCollege] = React.useState<string>('');
	const [field, setField] = React.useState<string>('');
	const [pmKnowledge, setPmKnowledge] = React.useState<number>(1);
	const [isStudent, setIsStudent] = React.useState<boolean>(false);
	const [years, setYears] = React.useState<number>(1);
	const history = useHistory();
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'put',
				url: '/api/user',
				data,
			});
			return res.data.user;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('user', data);
			},
			onSettled: (data) => {
				if (data) {
					history.replace('/');
				}
			},
		}
	);

	const updateCurrentRole = (job: string, c: string, isStudent: boolean) => {
		setCurrentJob(job);
		setCompany(c);
		setIsStudent(isStudent);
	};

	const updateField = (f: string, p: number, y: number) => {
		setField(f);
		setPmKnowledge(p);
		setYears(y);

		const data = new FormData();
		if (photo) data.append('file', photo);
		if (isStudent) data.append('isStudent', String(isStudent));
		if (currentJob.length) data.append('jobTitle', currentJob);
		if (company.length) data.append('currentCompany', company);
		data.append('degree', degree);
		data.append('college', college);
		data.append('field', f);
		if (pmKnowledge) data.append('knowledgeLevel', p.toString());
		if (years) data.append('experience', y.toString());

		mutate(data as any);
	};

	const updateEducation = (deg: string, college: string) => {
		setDegree(deg);
		setCollege(college);
	};

	return (
		<OnboardingContext.Provider
			value={{
				college,
				company,
				currentJob,
				degree,
				field,
				photo,
				pmKnowledge,
				setPhoto,
				updateField,
				years,
				updateCurrentRole,
				updateEducation,
				isLoading,
			}}>
			{children}
		</OnboardingContext.Provider>
	);
};

export default OnboardingContextProvider;

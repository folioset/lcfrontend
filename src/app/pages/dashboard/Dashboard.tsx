import * as React from 'react';

import { useQuery, useQueryClient } from 'react-query';
import { Project as ProjectType, User } from '../../types';
import axios from 'axios';
import ProfileView from '../../components/User/ProfileView';
import useAuthRoute from '../../hooks/useAuthRoute';
import { useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;

	const { isLoading: isLoadingProjects, data: projects } = useQuery<ProjectType[]>(
		'my-projects',
		async () => {
			try {
				const res = await axios.get(`/api/user/${user._id}/get-all-projects`);
				return res.data;
			} catch (err) {
				return err;
			}
		}
	);

	const { isLoading: isLoadingInterviews, data: interviews } = useQuery<ProjectType[]>(
		'interviews',
		async () => {
			try {
				const res = await axios.get(`/api/interview/${user._id}/interviews`);
				console.log(res.data, 'i am interviews');
				return res.data;
			} catch (err) {
				return err;
			}
		}
	);


	return (
		<>
			<ProfileView user={user} isLoadingProjects={isLoadingProjects} isLoadingInterviews={isLoadingInterviews} interviews={interviews} projects={projects} />
		</>
	);
};

export default Dashboard;

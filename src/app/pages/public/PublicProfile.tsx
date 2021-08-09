import * as React from 'react';

import { useQuery } from 'react-query';
import { Project as ProjectType } from '../../types';
import axios from 'axios';
import ProfileView from '../../components/User/ProfileView';
import { useLocation, useParams } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
import Loader from '../../components/shared/Loader';

interface PublicProfileProps { }

const PublicProfile: React.FC<PublicProfileProps> = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const params = useParams<{ userId: string }>();

	const { isLoading: isUserLoading, data: user } = useQuery(
		['public-user', params.userId],
		async () => {
			const res = await axios.get(`/api/user/${params.userId}`);
			return res.data;
		}
	);

	const { isLoading: isLoadingProjects, data: projects } = useQuery<ProjectType[]>(
		['projects', params.userId],
		async () => {
			const res = await axios.get(
				`/api/user/${params.userId}/get-all-projects`
			);
			console.log("projects", res.data);
			return res.data;
		}
	);

	const { isLoading: isLoadingInterviews, data: interviews } = useQuery<ProjectType[]>(
		['interviews', params.userId],
		async () => {
			const res = await axios.get(
				`/api/interview/${params.userId}/interviews`
			);
			console.log("interviews", res.data);
			return res.data;
		}
	);


	return (
		<>
			{(isLoadingProjects || isUserLoading || isLoadingInterviews) && <Loader fullScreen />}
				<ProfileView isLoadingProjects={isLoadingProjects} isLoadingInterviews={isLoadingInterviews} projects={projects} interviews={interviews} user={user} isPublic />
		</>
	);
};

export default PublicProfile;

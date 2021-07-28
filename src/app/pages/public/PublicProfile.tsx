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

	const { isLoading, data } = useQuery<ProjectType[]>(
		['projects', params.userId],
		async () => {
			const res = await axios.get(
				`/api/user/${params.userId}/get-all-projects`
			);
			return res.data;
		}
	);

	return (
		<>
			{(isLoading || isUserLoading) && <Loader fullScreen />}
			{data && (
				<ProfileView isLoading={isLoading} data={data} user={user} isPublic />
			)}
		</>
	);
};

export default PublicProfile;

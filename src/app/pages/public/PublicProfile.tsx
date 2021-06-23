import * as React from 'react';

import { useQuery } from 'react-query';
import { Project as ProjectType } from '../../types';
import axios from 'axios';
import ProfileView from '../../components/dashboard/ProfileView';
import { useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';
import useAuthRoute from '../../hooks/useAuthRoute';

interface PublicProfileProps {}

const PublicProfile: React.FC<PublicProfileProps> = () => {
	useAuthRoute('protected', '/');
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
			{(isLoading || isUserLoading) && <Box>Loading....</Box>}
			{data && (
				<ProfileView isLoading={isLoading} data={data} user={user} isPublic />
			)}
		</>
	);
};

export default PublicProfile;

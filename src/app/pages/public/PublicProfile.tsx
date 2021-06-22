import * as React from 'react';

import { useQuery, useQueryClient } from 'react-query';
import { Project as ProjectType, User } from '../../types';
import axios from 'axios';
import ProfileView from '../../components/dashboard/ProfileView';
import { useParams } from 'react-router-dom';
import { Box } from '@material-ui/core';

interface PublicProfileProps {}

const PublicProfile: React.FC<PublicProfileProps> = () => {
	const params = useParams<{ userId: string }>();
	const queryClient = useQueryClient();
	const [user, setUser] = React.useState<User>();
	const users = queryClient.getQueryData<User[]>('all-users')!;

	const { isLoading, data } = useQuery<ProjectType[]>(
		['projects', params.userId],
		async () => {
			const res = await axios.get(
				`/api/user/${params.userId}/get-all-projects`
			);
			return res.data;
		},
		{
			onSuccess: () => {
				setUser(users.find((u) => u._id === params.userId));
			},
		}
	);

	return (
		<>
			{isLoading && <Box>Loading....</Box>}
			{data && (
				<ProfileView isLoading={isLoading} data={data} user={user} isPublic />
			)}
		</>
	);
};

export default PublicProfile;

import * as React from 'react';

import { useQuery, useQueryClient } from 'react-query';
import { Project as ProjectType, User } from '../../types';
import axios from 'axios';
import ProfileView from '../../components/dashboard/ProfileView';
import useAuthRoute from '../../hooks/useAuthRoute';

const Dashboard: React.FC = () => {
	useAuthRoute('protected', '/');
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;

	const { isLoading, data } = useQuery<ProjectType[]>(
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

	return (
		<>
			<ProfileView user={user} isLoading={isLoading} data={data} />
		</>
	);
};

export default Dashboard;

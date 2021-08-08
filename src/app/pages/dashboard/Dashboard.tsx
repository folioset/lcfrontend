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

<<<<<<< HEAD

	// console.log("projects data", data);


=======
>>>>>>> 4298690f1ad8ac4625eca6b8ada81ba46906697f
	return (
		<>
			<ProfileView user={user} isLoading={isLoading} data={data} />
		</>
	);
};

export default Dashboard;

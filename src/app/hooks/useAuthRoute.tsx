import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../contexts/UserContext';

// types
import { User } from '../types';

const useAuthRoute: (path: string) => void = (path) => {
	const { isLoading } = React.useContext(UserContext);
	const history = useHistory();
	const queryClient = useQueryClient();
	const location = useLocation();
	const user = queryClient.getQueryData<User>('user');

	React.useEffect(() => {
		if (!isLoading) {
			if (!user) {
				return history.replace('/');
			}
		}
	}, [history, user, location, path, isLoading]);
};

export default useAuthRoute;

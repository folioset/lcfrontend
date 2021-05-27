import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router';

// types
import { User } from '../types';

const useAuthRoute: (
	t?: 'protected' | 'not-protected',
	path?: string
) => void = (type = 'protected', path) => {
	const history = useHistory();
	const queryClient = useQueryClient();
	const location = useLocation();
	const user = queryClient.getQueryData<User>('user');

	React.useEffect(() => {
		if (type === 'protected' && !user) {
			return history.replace('/');
		} else if (type === 'not-protected' && user) {
			// return path ? history.replace(path) : history.goBack();
		}
	}, [type, history, user, location, path]);
};

export default useAuthRoute;

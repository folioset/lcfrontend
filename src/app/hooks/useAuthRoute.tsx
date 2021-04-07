import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { User } from '../types';

const useAuthRoute: (t?: 'protected' | 'not-protected') => void = (
	type = 'protected'
) => {
	const history = useHistory();
	const queryClient = useQueryClient();
	const location = useLocation();
	const user = queryClient.getQueryData<User>('user');

	React.useEffect(() => {
		if (type === 'protected' && !user) {
			return history.replace('/');
		} else if (type === 'not-protected' && user) {
			return history.goBack();
		}
	}, [type, history, user, location]);
};

export default useAuthRoute;

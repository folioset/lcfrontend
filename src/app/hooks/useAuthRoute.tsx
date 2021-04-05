import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

const useAuthRoute: (t?: 'protected' | 'not-protected') => void = (
	type = 'protected'
) => {
	const history = useHistory();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');

	React.useEffect(() => {
		if (type === 'protected' && !user) {
			return history.replace('/');
		} else if (type === 'not-protected' && user) {
			return history.goBack();
		}
	}, [type, history, user]);
};

export default useAuthRoute;

import * as React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

interface UserContextProps {
	isLoading?: boolean;
}

export const UserContext = React.createContext<Partial<UserContextProps>>({});

const UserContextProvider: React.FC<UserContextProps> = ({ children }: any) => {
	const history = useHistory();
	const { isLoading } = useQuery(
		'user',
		async () => {
			const res = await axios('/api/checkAuth');
			return res.data;
		},
		{
			onSuccess: (data) => {
				if (data) {
					if (!data.isUpdated) {
						history.replace('/onboarding');
					} else {
						history.replace('/dashboard/schedule');
					}
				} else {
					history.replace('/');
				}
			},
			onError: () => {
				history.replace('/');
			},
		}
	);

	return (
		<UserContext.Provider value={{ isLoading }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;

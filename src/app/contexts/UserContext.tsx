import * as React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

// types
import { User } from '../types';

interface UserContextProps {
	isLoading?: boolean;
}

export const UserContext = React.createContext<Partial<UserContextProps>>({});

const UserContextProvider: React.FC<UserContextProps> = ({ children }: any) => {
	const location = useLocation();
	const history = useHistory();

	const { isLoading } = useQuery<User, Error>(
		'user',
		async () => {
			const res = await axios('/api/checkAuth');
			return res.data;
		},
		{
			onSuccess: (data) => {
				if (data) {
					if (!data._id) {
						return history.replace('/');
					} else if (!data.isVerified) {
						if (location.pathname.startsWith('/onboarding')) {
							return history.replace(location.pathname);
						} else {
							return history.replace('/onboarding');
						}
					}
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

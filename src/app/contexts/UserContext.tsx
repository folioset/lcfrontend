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
	const history = useHistory();
	const location = useLocation();
	const { isLoading } = useQuery<User, Error>(
		'user',
		async () => {
			const res = await axios('/api/checkAuth');
			return res.data;
		},
		{
			onSuccess: (data) => {
				if (data) {
					history.replace(
						location.pathname.startsWith('/dashboard')
							? location.pathname
							: '/dashboard'
					);
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

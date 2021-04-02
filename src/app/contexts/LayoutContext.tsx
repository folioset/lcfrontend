import * as React from 'react';
import { useLocation } from 'react-router';

interface LayoutContextProps {
	layout?: 'Home' | 'OnBoarding';
}

export const LayoutContext = React.createContext<Partial<LayoutContextProps>>(
	{}
);

const LayoutContextProvider = ({ children }: any) => {
	const [layout, setLayout] = React.useState<'Home' | 'OnBoarding'>('Home');

	const location = useLocation();

	React.useEffect(() => {
		if (location.pathname === '/' || location.pathname === '/auth/login') {
			setLayout('Home');
		} else if (location.pathname === '/onboarding') {
			setLayout('OnBoarding');
		}
	}, [location]);

	return (
		<LayoutContext.Provider value={{ layout }}>
			{children}
		</LayoutContext.Provider>
	);
};

export default LayoutContextProvider;

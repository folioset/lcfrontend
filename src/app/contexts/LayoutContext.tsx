import * as React from 'react';
import { useLocation } from 'react-router';

interface LayoutContextProps {
	layout?: 'App' | 'OnBoarding';
}

export const LayoutContext = React.createContext<Partial<LayoutContextProps>>(
	{}
);

const LayoutContextProvider = ({ children }: any) => {
	const [layout, setLayout] = React.useState<'App' | 'OnBoarding'>('App');

	const location = useLocation();

	React.useEffect(() => {
		if (location.pathname === '/onboarding') {
			setLayout('OnBoarding');
		} else {
			setLayout('App');
		}
	}, [location]);

	return (
		<LayoutContext.Provider value={{ layout }}>
			{children}
		</LayoutContext.Provider>
	);
};

export default LayoutContextProvider;

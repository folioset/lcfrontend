import * as React from 'react';
import { useLocation } from 'react-router';

interface LayoutContextProps {
	layout?: 'App' | 'OnBoarding' | 'Interview';
}

export const LayoutContext = React.createContext<Partial<LayoutContextProps>>(
	{}
);

const LayoutContextProvider = ({ children }: any) => {
	const [layout, setLayout] = React.useState<
		'App' | 'OnBoarding' | 'Interview'
	>('App');

	const location = useLocation();

	React.useEffect(() => {
		if (location.pathname.startsWith('/interview')) {
			setLayout('Interview');
		} else if (location.pathname.startsWith('/onboarding')) {
			setLayout('OnBoarding');
		} else {
			setLayout('App');
		}
	}, [location.pathname]);

	return (
		<LayoutContext.Provider value={{ layout }}>
			{children}
		</LayoutContext.Provider>
	);
};

export default LayoutContextProvider;

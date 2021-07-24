import * as React from 'react';

// contexts
import { LayoutContext } from '../contexts/LayoutContext';
import { UserContext } from '../contexts/UserContext';

// layouts
import AppLayout from './page-layouts/AppLayout';
import OnBoardingLayout from './page-layouts/OnBoardingLayout';

// components
import Loader from '../components/shared/Loader';
import InterviewLayout from './page-layouts/InterviewLayout';

const Layout: React.FC = () => {
	const { layout } = React.useContext(LayoutContext);
	const { isLoading } = React.useContext(UserContext);

	if (isLoading) {
		return <Loader fullScreen={true} />;
	}

	if (layout === 'OnBoarding') {
		return <OnBoardingLayout />;
	}

	if (layout === 'Interview') {
		return <InterviewLayout />;
	}

	return (
		<>
			<AppLayout />
		</>
	);
};

export default Layout;

import * as React from 'react';

// contexts
import { LayoutContext } from '../contexts/LayoutContext';
import { ScheduleContext } from '../contexts/ScheduleContext';
import { UserContext } from '../contexts/UserContext';

// layouts
import AppLayout from './page-layouts/AppLayout';
import OnBoardingLayout from './page-layouts/OnBoardingLayout';

// components
import Loader from '../components/shared/Loader/Loader';

const Layout: React.FC = () => {
	const { layout } = React.useContext(LayoutContext);
	const { isLoading } = React.useContext(UserContext);
	const { userScheduleLoading } = React.useContext(ScheduleContext);

	if (isLoading || userScheduleLoading) {
		return <Loader fullScreen={true} />;
	}

	return <>{layout === 'OnBoarding' ? <OnBoardingLayout /> : <AppLayout />}</>;
};

export default Layout;

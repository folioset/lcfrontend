import React from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import HomeLayout from './page-layouts/HomeLayout';
import OnBoardingLayout from './page-layouts/OnBoardingLayout';

const Layout: React.FC = () => {
	const { layout } = React.useContext(LayoutContext);

	return <>{layout === 'OnBoarding' ? <OnBoardingLayout /> : <HomeLayout />}</>;
};

export default Layout;

import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import { UserContext } from '../contexts/UserContext';
import AppLayout from './page-layouts/AppLayout';
import OnBoardingLayout from './page-layouts/OnBoardingLayout';

const Layout: React.FC = () => {
	const { layout } = React.useContext(LayoutContext);
	const { isLoading } = React.useContext(UserContext);

	if (isLoading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='100vh'>
				<CircularProgress />
			</Box>
		);
	}

	return <>{layout === 'OnBoarding' ? <OnBoardingLayout /> : <AppLayout />}</>;
};

export default Layout;

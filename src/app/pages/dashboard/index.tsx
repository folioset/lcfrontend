import * as React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

// Context
import ScheduleContextProvider from '../../contexts/ScheduleContext';

// hooks
import useAuthRoute from '../../hooks/useAuthRoute';

// Pages
const Schedule = React.lazy(() => import('./Schedule'));
const UpdateSchedule = React.lazy(() => import('./UpdateSchedule'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const UpdateProfile = React.lazy(() => import('./UpdateProfile'));

const DashboardRoutes: React.FC = () => {
	useAuthRoute();
	const { path } = useRouteMatch();

	return (
		<ScheduleContextProvider>
			<Switch>
				<Route path={`${path}`} exact>
					<Dashboard />
				</Route>

				<Route path={`${path}/schedule`} exact>
					<Schedule />
				</Route>

				<Route path={`${path}/schedule/update`} exact>
					<UpdateSchedule />
				</Route>

				<Route path={`${path}/me/update`} exact>
					<UpdateProfile />
				</Route>

				<Redirect to='/error' />
			</Switch>
		</ScheduleContextProvider>
	);
};

export default DashboardRoutes;

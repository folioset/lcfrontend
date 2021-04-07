import * as React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

// Context
import ScheduleContextProvider from '../../contexts/ScheduleContext';

// Pages
import Schedule from './Schedule';
import UpdateSchedule from './UpdateSchedule';
import Dashboard from './Dashboard';

import useAuthRoute from '../../hooks/useAuthRoute';

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

				<Redirect to='/error' />
			</Switch>
		</ScheduleContextProvider>
	);
};

export default DashboardRoutes;

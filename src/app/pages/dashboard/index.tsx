import * as React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

// Pages
const Dashboard = React.lazy(() => import('./Dashboard'));
const UpdateProfile = React.lazy(() => import('./UpdateProfile'));
const Interviews = React.lazy(() => import('./Interviews'));

const DashboardRoutes: React.FC = () => {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<Route path={`${path}`} exact>
				<Dashboard />
			</Route>

			<Route path={`${path}/me/interviews`} exact>
				<Interviews />
			</Route>

			<Route path={`${path}/me/update`} exact>
				<UpdateProfile />
			</Route>

			<Redirect to='/error' />
		</Switch>
	);
};

export default DashboardRoutes;

import * as React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

// Context
import ScheduleContextProvider from '../../contexts/ScheduleContext';

// Pages
import Schedule from './Schedule';

const Dashboard: React.FC = () => {
	const { path } = useRouteMatch();

	return (
		<ScheduleContextProvider>
			<Switch>
				<Route path={`${path}/schedule`} exact>
					<Schedule />
				</Route>

				<Redirect to='/error' />
			</Switch>
		</ScheduleContextProvider>
	);
};

export default Dashboard;

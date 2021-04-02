import * as React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

// Pages
import Login from './Login';

const Auth: React.FC = () => {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<Route path={`${path}/login`} exact>
				<Login />
			</Route>

			<Redirect to='/error' />
		</Switch>
	);
};

export default Auth;

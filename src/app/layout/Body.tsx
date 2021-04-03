import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

// Pages
import ErrorPage from '../pages/404';
import Auth from '../pages/auth';
import Dashboard from '../pages/dashboard';
import Home from '../pages/Home';
import OnBoarding from '../pages/onboarding/OnBoarding';

const Body: React.FC = () => {
	return (
		<Switch>
			<Route path='/' exact>
				<Home />
			</Route>

			<Route path='/auth'>
				<Auth />
			</Route>

			<Route path='/onboarding' exact>
				<OnBoarding />
			</Route>

			<Route path='/dashboard'>
				<Dashboard />
			</Route>

			<Route path='/error' exact>
				<ErrorPage />
			</Route>

			<Redirect to='/error' />
		</Switch>
	);
};

export default Body;

import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../components/shared/Loader';

// Pages
const ErrorPage = React.lazy(() => import('../pages/404'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const Home = React.lazy(() => import('../pages/Home'));
const OnBoarding = React.lazy(() => import('../pages/onboarding'));
const Public = React.lazy(() => import('../pages/public/PublicProfile'));
const Search = React.lazy(() => import('../pages/search'));

const Body: React.FC = () => {
	return (
		<React.Suspense fallback={<Loader fullScreen />}>
			<Switch>
				<Route path='/' exact>
					<Home />
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

				<Route path='/public'>
					<Public />
				</Route>

				<Route path='/search'>
					<Search />
				</Route>

				<Redirect to='/error' />
			</Switch>
		</React.Suspense>
	);
};

export default Body;

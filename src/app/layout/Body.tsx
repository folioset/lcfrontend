import * as React from 'react';
import { useQueryClient } from 'react-query';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../components/shared/Loader';
import { User } from '../types';

// Pages
const ErrorPage = React.lazy(() => import('../pages/404'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const Home = React.lazy(() => import('../pages/Home'));
const OnBoarding = React.lazy(() => import('../pages/onboarding'));
const Public = React.lazy(() => import('../pages/public'));
const Feed = React.lazy(() => import('../pages/Feed'));
const Test = React.lazy(() => import('../pages/test'));
const InterviewRoutes = React.lazy(() => import('../pages/interview'));

const Body: React.FC = () => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	return (
		<React.Suspense fallback={<Loader fullScreen />}>
			<Switch>
				<Route path='/' exact>
					{user ? <Feed /> : <Home />}
				</Route>

				<Route path='/onboarding'>
					<OnBoarding />
				</Route>

				<Route path='/dashboard'>
					<Dashboard />
				</Route>

				<Route path='/test'>
					<Test />
				</Route>

				<Route path='/interview'>
					<InterviewRoutes />
				</Route>

				<Route path='/public'>
					<Public />
				</Route>

				<Route path='/error' exact>
					<ErrorPage />
				</Route>

				<Redirect to='/error' />
			</Switch>
		</React.Suspense>
	);
};

export default Body;

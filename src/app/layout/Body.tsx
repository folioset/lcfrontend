import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Loader from '../components/shared/Loader/Loader';
import ProjectsContextProvider from '../contexts/ProjectsContext';

// Pages
const ErrorPage = React.lazy(() => import('../pages/404'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const Home = React.lazy(() => import('../pages/Home'));
const Projects = React.lazy(() => import('../pages/projects'));

// import OnBoarding from '../pages/onboarding/OnBoarding';
// import Auth from '../pages/auth';

const Body: React.FC = () => {
	return (
		<React.Suspense fallback={<Loader fullScreen />}>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>

				{/* <Route path='/auth'>
				<Auth />
			</Route> */}

				{/* <Route path='/onboarding' exact>
				<OnBoarding />
			</Route> */}

				<Route path='/projects'>
					<ProjectsContextProvider>
						<Projects />
					</ProjectsContextProvider>
				</Route>

				<Route path='/dashboard'>
					<Dashboard />
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

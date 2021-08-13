import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const PublicProfile = React.lazy(() => import('./PublicProfile'));
const Users = React.lazy(() => import('./Users'));
const Challenges = React.lazy(() => import('../Challenges'));
const Notifications = React.lazy(() => import('../Notifications'));
const FeedRedirect = React.lazy(() => import('../../components/Feed/FeedRedirect'));

interface PublicProps { }

const Public: React.FC<PublicProps> = () => {
	return (
		<>
			<Switch>
				<Route exact path='/public/users'>
					<Users />
				</Route>

				<Route exact path='/public/users/:userId'>
					<PublicProfile />
				</Route>

				<Route exact path='/public/challenges'>
					<Challenges />
				</Route>

				<Route exact path='/public/notifications'>
					<Notifications />
				</Route>

				<Route exact path='/public/api/feed/getproject/:id'>
					<FeedRedirect />
				</Route>

				<Redirect to='/public/users' />
			</Switch>
		</>
	);
};

export default Public;

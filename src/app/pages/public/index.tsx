import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const PublicProfile = React.lazy(() => import('./PublicProfile'));
const Users = React.lazy(() => import('./Users'));

interface PublicProps {}

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

				<Redirect to='/public/users' />
			</Switch>
		</>
	);
};

export default Public;

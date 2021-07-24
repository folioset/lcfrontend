import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import InterviewFinish from './InterviewFinish';
import InterviewOnboarding from './InterviewOnboarding';
import InterviewRoom from './InterviewRoom';

interface InterviewRoutesProps {}

const InterviewRoutes: React.FC<InterviewRoutesProps> = () => {
	return (
		<>
			<Switch>
				<Route path='/interview' exact>
					<InterviewOnboarding />
				</Route>

				<Route path='/interview/room' exact>
					<InterviewRoom />
				</Route>

				<Route path='/interview/finish' exact>
					<InterviewFinish />
				</Route>
			</Switch>
		</>
	);
};

export default InterviewRoutes;

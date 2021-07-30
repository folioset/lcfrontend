import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import OnboardingContextProvider from '../../contexts/OnboardingContext';
import CurrentRole from './CurrentRole';
import Education from './Education';
import Interests from './Interests';
import ProfilePicture from './ProfilePicture';

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = () => {
	return (
		<>
			<OnboardingContextProvider>
				<Switch>
					<Route path='/onboarding' component={ProfilePicture} exact />
					<Route
						path='/onboarding/current-role'
						component={CurrentRole}
						exact
					/>
					<Route path='/onboarding/education' component={Education} exact />
					<Route path='/onboarding/interests' component={Interests} exact />
				</Switch>
			</OnboardingContextProvider>
		</>
	);
};

export default Onboarding;

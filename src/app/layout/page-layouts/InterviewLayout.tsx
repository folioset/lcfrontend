import * as React from 'react';
import InterviewNav from '../../components/Interview/InterviewNav';
import InterviewContextProvider from '../../contexts/InterviewContext';
import useAuthRoute from '../../hooks/useAuthRoute';
import Body from '../Body';

interface InterviewLayoutProps {}

const InterviewLayout: React.FC<InterviewLayoutProps> = () => {
	useAuthRoute('/');

	return (
		<InterviewContextProvider>
			<InterviewNav />
			<Body />
		</InterviewContextProvider>
	);
};

export default InterviewLayout;

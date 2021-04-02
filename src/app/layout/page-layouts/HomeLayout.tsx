import React from 'react';
import Body from '../Body';
import Navigation from '../Navigation/Navigation';

interface Props {}

const HomeLayout: React.FC = (props: Props) => {
	return (
		<>
			<Navigation />
			<Body />
		</>
	);
};

export default HomeLayout;

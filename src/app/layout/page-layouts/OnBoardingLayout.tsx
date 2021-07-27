import { Box } from '@material-ui/core';
import React from 'react';
import Logo from '../../components/shared/Logo';
import Body from '../Body';

interface Props {}

const OnBoardingLayout: React.FC = (props: Props) => {
	return (
		<>
			<Box padding={5}>
				<Logo />
			</Box>
			<Body />
		</>
	);
};

export default OnBoardingLayout;

import { Box, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Logo from '../../components/shared/Logo';
import Body from '../Body';

interface Props {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			backgroundColor: theme.palette.common.white,
			minHeight: '100vh',
		},
	};
});

const OnBoardingLayout: React.FC = (props: Props) => {
	const classes = useStyles();

	return (
		<>
			<Box className={classes.root}>
				<Box padding={5}>
					<Logo />
				</Box>
				<Body />
			</Box>
		</>
	);
};

export default OnBoardingLayout;

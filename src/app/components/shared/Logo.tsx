import * as React from 'react';
import { ReactComponent as LogoIcon } from './../../../assets/logo.svg';
import { Box, makeStyles } from '@material-ui/core';

interface LogoProps {
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const useStyles = makeStyles((theme) => {
	return {
		logo: {
			width: 100,
			cursor: 'pointer',

			[theme.breakpoints.down('md')]: {
				marginLeft: theme.spacing(2),
			},

			[theme.breakpoints.down('sm')]: {
				marginLeft: theme.spacing(3),
			},

			[theme.breakpoints.down('xs')]: {
				marginLeft: theme.spacing(2),
			},
		},
	};
});

const Logo: React.FC<LogoProps> = ({ onClick }) => {
	const classes = useStyles();
	return (
		<>
			<Box {...{ onClick }}>
				<LogoIcon className={classes.logo} />
			</Box>
		</>
	);
};

export default Logo;

import * as React from 'react';
import { ReactComponent as LogoIcon } from './../../../assets/logo.svg';
import { Box, makeStyles, Typography } from '@material-ui/core';

interface LogoProps {
	onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const useStyles = makeStyles(() => {
	return {
		logo: {
			maxHeight: '45px',
			cursor: 'pointer',
		},
		logoBox: {
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer',
		},
		text: {
			marginTop: 10,
			marginLeft: 10,
			fontSize: 25,
		},
	};
});

const Logo: React.FC<LogoProps> = ({ onClick }) => {
	const classes = useStyles();
	return (
		<>
			<Box className={classes.logoBox} {...{ onClick }}>
				<LogoIcon className={classes.logo} />
				<Typography color='textPrimary' variant='h4' className={classes.text}>
					Folioset
				</Typography>
			</Box>
		</>
	);
};

export default Logo;

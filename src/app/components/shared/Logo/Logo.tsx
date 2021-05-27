import * as React from 'react';
import { ReactComponent as LogoIcon } from './../../../../assets/logo.svg';
import { Box, makeStyles, Typography } from '@material-ui/core';

interface LogoProps {
	onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const useStyles = makeStyles((theme) => {
	return {
		logo: {
			height: 70,
			width: 70,
			marginRight: theme.spacing(1),

			[theme.breakpoints.down('sm')]: {
				height: 50,
				width: 50,
			},
		},
		brandName: {
			cursor: 'pointer',

			[theme.breakpoints.down('sm')]: {
				fontSize: '1.45rem',
			},

			[theme.breakpoints.down('xs')]: {
				fontSize: '1.35rem',
			},
		},
	};
});

const Logo: React.FC<LogoProps> = ({ onClick }) => {
	const classes = useStyles();
	return (
		<>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				{...{ onClick }}>
				<LogoIcon className={classes.logo} />
				<Typography className={classes.brandName} variant='h5'>
					Learning Circle
				</Typography>
			</Box>
		</>
	);
};

export default Logo;

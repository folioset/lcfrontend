import * as React from 'react';
import clsx from 'clsx';

// MUI
import { makeStyles, StepIconProps } from '@material-ui/core';

// MUI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			backgroundColor: '#ccc',
			zIndex: 1,
			color: '#fff',
			width: 50,
			height: 50,
			display: 'flex',
			borderRadius: '50%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		active: {
			backgroundImage: `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
			boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
		},
		completed: {
			backgroundImage: `linear-gradient(to right bottom, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
		},
	};
});

const StepperIcon: React.FC<StepIconProps> = (props) => {
	const classes = useStyles();
	const { active, completed } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <AccountCircleIcon />,
		2: <InfoIcon />,
		3: <PermIdentityIcon />,
		4: <TouchAppIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}>
			{icons[String(props.icon)]}
		</div>
	);
};

export default StepperIcon;

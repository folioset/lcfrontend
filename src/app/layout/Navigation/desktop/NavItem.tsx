import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
	return {
		navLink: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
		},
		active: {
			color: theme.palette.primary.main,
		},
		btnContent: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		btnIcon: {
			height: 30,
		},
		btnText: {
			textTransform: 'capitalize',
		},
	};
});

interface Props {
	children: any;
	to: string;
	exact: boolean;
	variant?: 'contained' | 'outlined' | 'text';
	color?: 'default' | 'inherit' | 'primary' | 'secondary';
	dropdown?: boolean;
	icon?: any;
}

const NavItem: React.FC<Props> = ({
	children,
	to,
	exact,
	variant = 'text',
	color = 'default',
	dropdown,
	icon,
}) => {
	const classes = useStyles();

	if (dropdown) {
		return (
			<MenuItem component={NavLink} to={to} exact={exact}>
				{icon && <ListItemIcon>{icon}</ListItemIcon>}
				<ListItemText primary={children} />
			</MenuItem>
		);
	}

	return (
		<Button
			size='small'
			className={classes.navLink}
			activeClassName={classes.active}
			{...{ to, exact, variant, color }}
			component={NavLink}>
			<Box className={classes.btnContent}>
				<Box className={classes.btnIcon}>{icon}</Box>
				<Box className={classes.btnText}>{children}</Box>
			</Box>
		</Button>
	);
};

export default NavItem;

import * as React from 'react';
import { NavLink } from 'react-router-dom';

// MUI
import {
	Button,
	ListItemIcon,
	ListItemText,
	makeStyles,
	MenuItem,
} from '@material-ui/core';

// styles

const useStyles = makeStyles((theme) => {
	return {
		navLink: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1),
		},
		active: {
			color: theme.palette.primary.main,
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
			startIcon={icon}
			className={classes.navLink}
			activeClassName={classes.active}
			{...{ to, exact, variant, color }}
			component={NavLink}>
			{children}
		</Button>
	);
};

export default NavItem;

import {
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
	icon?: any;
	to: string;
	primary: string;
	exact: boolean;
}

const useStyles = makeStyles((theme) => {
	return {
		active: {
			backgroundColor: 'rgba(0, 0, 0, .15)',
		},
	};
});

const SidebarNavLink: React.FC<Props> = ({ icon, to, primary, exact }) => {
	const classes = useStyles();

	return (
		<ListItem
			activeClassName={classes.active}
			component={NavLink}
			{...{ to, exact }}
			button>
			{icon && <ListItemIcon>{icon}</ListItemIcon>}
			<ListItemText {...{ primary }} />
		</ListItem>
	);
};

export default SidebarNavLink;

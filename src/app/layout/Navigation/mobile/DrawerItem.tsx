import * as React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles, Theme } from '@material-ui/core';

interface Props {
	text: string;
	to: string;
	onClose: () => void;
	icon: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		active: {
			color: theme.palette.primary.main,
		},
		icon: {
			color: 'inherit',
		},
	};
});

const DrawerItem: React.FC<Props> = ({ text, to, onClose, icon }) => {
	const classes = useStyles();

	return (
		<ListItem
			activeClassName={classes.active}
			to={to}
			onClick={onClose}
			component={NavLink}
			button
			key={text}>
			<ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	);
};

export default DrawerItem;

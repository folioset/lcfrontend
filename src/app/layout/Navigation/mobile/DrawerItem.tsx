import * as React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
	text: string;
	to: string;
	onClose: () => void;
}

const DrawerItem: React.FC<Props> = ({ text, to, onClose }) => {
	return (
		<ListItem to={to} onClick={onClose} component={NavLink} button key={text}>
			<ListItemText primary={text} />
		</ListItem>
	);
};

export default DrawerItem;

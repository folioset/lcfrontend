import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';

interface MenuLinkProps {
	href: string;
	icon: any;
	style: React.CSSProperties;
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, icon, children, style }) => {
	return (
		<>
			<MenuItem component='a' {...{ style, href }}>
				{icon && <ListItemIcon>{icon}</ListItemIcon>}
				<ListItemText color='inherit' primary={children} />
			</MenuItem>
		</>
	);
};

export default MenuLink;

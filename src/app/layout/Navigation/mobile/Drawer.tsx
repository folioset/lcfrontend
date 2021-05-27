import * as React from 'react';
import { useQueryClient } from 'react-query';

// MUI
import MUIDrawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

// Components
import DrawerItem from './DrawerItem';
import { Box, ListItemText } from '@material-ui/core';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const DRAWER_WIDTH = 280;

const Drawer: React.FC<Props> = ({ isOpen, onClose }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');
	return (
		<MUIDrawer
			style={{ width: DRAWER_WIDTH }}
			anchor={'right'}
			open={isOpen}
			onClose={onClose}>
			<Box width={DRAWER_WIDTH}>
				<Box></Box>
				{!user ? (
					<>
						<DrawerItem text='Home' to='/' onClose={onClose} />
						<ListItem component={'a'} button href='/api/auth/google'>
							<ListItemText primary={'Login'} />
						</ListItem>
					</>
				) : (
					<>
						<DrawerItem text='Dashboard' to='/dashboard' onClose={onClose} />
						<DrawerItem
							text='Edit Profile'
							to='/dashboard/me/update'
							onClose={onClose}
						/>
						<DrawerItem
							text='Schedule'
							to='/dashboard/schedule'
							onClose={onClose}
						/>
						<ListItem
							component='a'
							style={{ width: '100%', color: 'red' }}
							color='primary'
							href='/api/logout'>
							Logout
						</ListItem>
					</>
				)}
			</Box>
		</MUIDrawer>
	);
};

export default Drawer;

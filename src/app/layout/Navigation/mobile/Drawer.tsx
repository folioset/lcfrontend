import * as React from 'react';
import { useQueryClient } from 'react-query';

// MUI
import MUIDrawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

// Components
import DrawerItem from './DrawerItem';
import { Box, ListItemText, Typography, useTheme } from '@material-ui/core';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const DRAWER_WIDTH = 280;

const Drawer: React.FC<Props> = ({ isOpen, onClose }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');
	const theme = useTheme();
	const color = theme.palette.error.main;

	return (
		<MUIDrawer
			style={{ width: DRAWER_WIDTH }}
			anchor={'right'}
			open={isOpen}
			onClose={onClose}>
			<Box width={DRAWER_WIDTH}>
				{!user ? (
					<>
						<ListItem component={'a'} button href='/api/auth/google'>
							<ListItemText primary='Login' />
						</ListItem>
					</>
				) : (
					<>
						<DrawerItem text='Profile' to='/dashboard' onClose={onClose} />
						<DrawerItem
							text='Edit Profile'
							to='/dashboard/me/update'
							onClose={onClose}
						/>
						<ListItem component='a' href='/api/logout' button>
							<ListItemText
								disableTypography
								primary={<Typography style={{ color }}>Logout</Typography>}
							/>
						</ListItem>
					</>
				)}
			</Box>
		</MUIDrawer>
	);
};

export default Drawer;

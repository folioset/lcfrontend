import * as React from 'react';
import MUIDrawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import DrawerItem from './DrawerItem';
import { useQueryClient } from 'react-query';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const Drawer: React.FC<Props> = ({ isOpen, onClose }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');
	return (
		<MUIDrawer
			style={{ width: 250 }}
			anchor={'right'}
			open={isOpen}
			onClose={onClose}>
			<div style={{ width: 250 }}>
				{!user ? (
					<>
						<DrawerItem text='Home' to='/' onClose={onClose} />

						<ListItem
							component='a'
							style={{ width: '100%' }}
							color='primary'
							href='/api/auth/google'>
							Login
						</ListItem>
					</>
				) : (
					<>
						<DrawerItem text='Dashboard' to='/dashboard' onClose={onClose} />
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
			</div>
		</MUIDrawer>
	);
};

export default Drawer;

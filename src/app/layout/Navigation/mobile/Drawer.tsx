import * as React from 'react';
import { useQuery, useQueryClient } from 'react-query';

// MUI
import MUIDrawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Components
import DrawerItem from './DrawerItem';
import {
	Badge,
	Box,
	Divider,
	ListItemText,
	makeStyles,
	Theme,
	Typography,
	useTheme,
} from '@material-ui/core';

// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp';
import Logo from '../../../components/shared/Logo';
import Avatar from '../../../components/shared/Avatar';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsIcon from '@material-ui/icons/Notifications';

import HomeIcon from '@material-ui/icons/Home';
import { User } from '../../../types';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme: Theme) => {
	return {
		toolbar: theme.mixins.toolbar,
		logo: {
			paddingTop: theme.spacing(2),
		},
		user: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3),
			paddingLeft: theme.spacing(2),
			display: 'flex',
			alignItems: 'center',
		},
		userName: {
			marginLeft: theme.spacing(1),
		},
	};
});

const Drawer: React.FC<Props> = ({ isOpen, onClose }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	const theme = useTheme();
	const color = theme.palette.error.main;
	const classes = useStyles();
	const history = useHistory();

	//getting notifications count
	const { data } = useQuery('notifiCount', async () => {
		const res = await axios({
			method: 'GET',
			url: `/api/notifications/num`,
		});
		return res.data;
	});

	return (
		<MUIDrawer
			style={{ width: DRAWER_WIDTH }}
			anchor={'right'}
			open={isOpen}
			onClose={onClose}>
			<Box width={DRAWER_WIDTH}>
				<Box className={classes.toolbar}>
					<Box className={classes.logo} onClick={() => history.push('/')}>
						<Logo />
					</Box>

					<Box className={classes.user}>
						<Avatar alt={user?.name} src={user?.profilePicture} />
						<Typography variant='h6' className={classes.userName}>
							{user?.name}
						</Typography>
					</Box>
				</Box>
				<Divider />

				<>
					<DrawerItem
						icon={<HomeIcon color={'inherit'} />}
						text='Feed'
						to='/'
						onClose={onClose}
					/>
					<DrawerItem
						icon={<PeopleIcon color={'inherit'} />}
						text='All Users'
						to='/public/users'
						onClose={onClose}
					/>
					<DrawerItem
						icon={<TrendingUpSharpIcon color={'inherit'} />}
						text='Challenges'
						to='/public/challenges'
						onClose={onClose}
					/>
					<DrawerItem
						icon={<ForumIcon color={'inherit'} />}
						text='Interviews'
						to='/dashboard/me/interviews'
						onClose={onClose}
					/>
					<DrawerItem
						icon={
							<Badge badgeContent={data?.count} color='primary'>
								<NotificationsIcon color='secondary' />
							</Badge>
						}
						text='Notifications'
						to='/public/notifications'
						onClose={onClose}
					/>
					<Divider />
					<DrawerItem
						icon={<AccountCircleIcon color={'inherit'} />}
						text='Profile'
						to='/dashboard'
						onClose={onClose}
					/>

					<DrawerItem
						icon={<EditIcon color={'inherit'} />}
						text='Edit Profile'
						to='/dashboard/me/update'
						onClose={onClose}
					/>
					<Divider />
					<ListItem component='a' href='/api/logout' button>
						<ListItemIcon>
							<ExitToAppIcon style={{ color }} />
						</ListItemIcon>
						<ListItemText
							disableTypography
							primary={<Typography style={{ color }}>Logout</Typography>}
						/>
					</ListItem>
				</>
			</Box>
		</MUIDrawer>
	);
};

export default Drawer;

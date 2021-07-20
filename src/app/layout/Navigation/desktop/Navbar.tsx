import * as React from 'react';
import { useHistory } from 'react-router';
import { useQueryClient } from 'react-query';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { Divider, makeStyles } from '@material-ui/core';

import Menu from '@material-ui/core/Menu';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp';

// Components
import NavItem from './NavItem';

// types
import { User } from '../../../types';
import Logo from '../../../components/shared/Logo';
import MenuLink from '../../../components/shared/HrefLink/MenuLink';
import Avatar from '../../../components/shared/Avatar';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		appBar: {
			position: 'sticky',
			top: 0,
			backgroundColor: theme.palette.common.white,
			padding: theme.spacing(1),
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.3)',
		},
		toolbar: {
			[theme.breakpoints.down('sm')]: {
				padding: 0,
			},
		},
		nav: {
			marginLeft: 'auto',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		formControl: {
			display: 'flex',
		},
	};
});

interface Props {
	onOpen: () => void;
}

const Navbar: React.FC<Props> = ({ onOpen }) => {
	const classes = useStyles();
	const history = useHistory();
	const queryClient = useQueryClient();

	const user = queryClient.getQueryData<User>('user');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar className={classes.appBar} elevation={0} position='static'>
			<Toolbar className={classes.toolbar}>
				<Logo onClick={() => history.push('/')} />

				<Hidden only={['sm', 'xs']}>
					{user && (
						<Box className={classes.nav}>
							<NavItem exact to='/' icon={<HomeIcon color='secondary' />}>
								<Typography color='secondary'>Feed</Typography>
							</NavItem>
							<NavItem
								exact
								to='/public/users'
								icon={<AccountCircleIcon color='secondary' />}>
								<Typography color='secondary'>Users</Typography>
							</NavItem>
							<NavItem
								exact
								to='/public/challenges'
								icon={<TrendingUpSharpIcon color='secondary' />}>
								<Typography color='secondary'>Challenges</Typography>
							</NavItem>
							<Button
								startIcon={<Avatar alt={user.name} src={user.profilePicture} />}
								aria-controls='dropdown'
								aria-haspopup='true'
								color='secondary'
								endIcon={<KeyboardArrowDownIcon />}
								onClick={handleClick}>
								{user.name.split(' ')[0]}
							</Button>
							<Menu
								elevation={3}
								getContentAnchorEl={null}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}>
								<Box paddingTop={3}>
									<NavItem
										icon={<AccountCircleIcon color='secondary' />}
										dropdown
										exact
										to='/dashboard'>
										Profile
									</NavItem>
									<NavItem
										icon={<EditIcon color='secondary' />}
										dropdown
										exact
										to='/dashboard/me/update'>
										Edit Profile
									</NavItem>
									<Divider />
									<MenuLink
										style={{ color: 'red' }}
										href='/api/logout'
										icon={<ExitToAppIcon style={{ color: 'red' }} />}>
										Logout
									</MenuLink>
								</Box>
							</Menu>
						</Box>
					)}
				</Hidden>
				{user && (
					<Hidden only={['xl', 'lg', 'md']}>
						<Box ml='auto' color='white'>
							<IconButton color='inherit' onClick={onOpen}>
								<MenuIcon color='secondary' />
							</IconButton>
						</Box>
					</Hidden>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

import * as React from 'react';
import { useHistory } from 'react-router';
import { useQueryClient } from 'react-query';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Toolbar from '@material-ui/core/Toolbar';
import {
	Avatar,
	Divider,
	FormControl,
	InputAdornment,
	makeStyles,
} from '@material-ui/core';

import Menu from '@material-ui/core/Menu';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// Components
import NavItem from './NavItem';

// types
import { User } from '../../../types';
import Logo from '../../../components/shared/Logo';
import MenuLink from '../../../components/shared/HrefLink/MenuLink';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		appBar: {
			backgroundColor: theme.palette.common.white,
			padding: theme.spacing(1),
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
			alignItems: 'center',
			gap: theme.spacing(2),
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
				<Logo
					onClick={() =>
						user ? history.push('/dashboard') : history.push('/')
					}
				/>

				<Hidden only={['sm', 'xs']}>
					{!user && (
						<Box ml='auto'>
							<Button
								style={{ color: '#fff' }}
								color='primary'
								variant='contained'
								href='/api/auth/google'>
								Login
							</Button>
						</Box>
					)}

					{user && (
						<Box className={classes.nav}>
							<FormControl size='small' variant='outlined'>
								<OutlinedInput
									placeholder='Search Profile'
									id='search'
									startAdornment={
										<InputAdornment position='start'>
											<SearchIcon color='disabled' />
										</InputAdornment>
									}
								/>
							</FormControl>
							<Button
								startIcon={<Avatar />}
								aria-controls='dropdown'
								aria-haspopup='true'
								color='primary'
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
										icon={<AccountCircleIcon color='primary' />}
										dropdown
										exact
										to='/dashboard'>
										Profile
									</NavItem>
									<NavItem
										icon={<EditIcon color='primary' />}
										dropdown
										exact
										to='/dashboard/me/update'>
										Edit Profile
									</NavItem>
									<NavItem
										icon={<EditIcon color='primary' />}
										dropdown
										exact
										to='/public'>
										Public
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
				<Hidden only={['xl', 'lg', 'md']}>
					<Box ml='auto'>
						<IconButton onClick={onOpen}>
							<MenuIcon />
						</IconButton>
					</Box>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

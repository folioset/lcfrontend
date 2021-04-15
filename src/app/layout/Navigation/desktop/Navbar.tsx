import * as React from 'react';
import { useHistory } from 'react-router';

import { useQueryClient } from 'react-query';

// assets
import { ReactComponent as Logo } from './../../../../assets/logo.svg';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Icons
import Menu from '@material-ui/icons/Menu';

// Components
import NavItem from './NavItem';

// types
import { User } from '../../../types';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		appBar: {
			backgroundColor: theme.palette.common.white,
		},
		navbarBrand: {
			cursor: 'pointer',
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

	return (
		<AppBar
			className={classes.appBar}
			style={{ padding: 3 }}
			elevation={0}
			position='static'>
			<Toolbar>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					onClick={() =>
						user ? history.push('/dashboard') : history.push('/')
					}>
					<Logo
						style={{
							height: 70,
							width: 70,
							paddingTop: 2,
							marginRight: 6,
						}}
					/>
					{/* <img
						style={{
							maxWidth: '100%',
							height: 70,
							paddingTop: 2,
							marginRight: 6,
						}}
						src={Logo}
						alt='logo'
					/> */}
					<Typography className={classes.navbarBrand} variant='h5'>
						Learning Circle
					</Typography>
				</Box>

				<Hidden only={['sm', 'xs']}>
					{!user && (
						<Box ml='auto'>
							<NavItem to='/' exact>
								Home
							</NavItem>
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
						<Box ml='auto'>
							<NavItem exact to='/dashboard'>
								Profile
							</NavItem>
							<NavItem exact to='/dashboard/me/update'>
								Edit Profile
							</NavItem>
							<NavItem exact to='/dashboard/schedule'>
								Schedule
							</NavItem>
							<Button href='/api/logout' style={{ color: 'red' }}>
								Logout
							</Button>
						</Box>
					)}
				</Hidden>
				<Hidden only={['xl', 'lg', 'md']}>
					<Box ml='auto'>
						<IconButton onClick={onOpen}>
							<Menu />
						</IconButton>
					</Box>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

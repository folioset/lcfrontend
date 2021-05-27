import * as React from 'react';
import { useHistory } from 'react-router';
import { useQueryClient } from 'react-query';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';

// Icons
import Menu from '@material-ui/icons/Menu';

// Components
import NavItem from './NavItem';

// types
import { User } from '../../../types';
import Logo from '../../../components/shared/Logo/Logo';

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
						<Box ml='auto'>
							<NavItem exact to='/dashboard'>
								Profile
							</NavItem>
							<NavItem exact to='/dashboard/me/update'>
								Edit Profile
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

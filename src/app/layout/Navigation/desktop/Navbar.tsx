import * as React from 'react';
import { useHistory } from 'react-router';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import Menu from '@material-ui/icons/Menu';
import NavItem from './NavItem';

// Styles
const useStyles = makeStyles(() => {
	return {
		navbarBrand: {
			cursor: 'pointer',
		},
	};
});

const Navbar: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<AppBar color='transparent' elevation={0} position='static'>
			<Toolbar>
				<Typography
					onClick={() => history.push('/')}
					className={classes.navbarBrand}
					variant='h5'>
					Home
				</Typography>
				<Hidden only={['sm', 'xs']}>
					<Box ml='auto'>
						<NavItem to='/' exact>
							Home
						</NavItem>
						<NavItem color='primary' variant='outlined' to='/auth/login' exact>
							Login
						</NavItem>
					</Box>
				</Hidden>
				<Hidden only={['xl', 'lg', 'md']}>
					<Box ml='auto'>
						<IconButton>
							<Menu />
						</IconButton>
					</Box>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

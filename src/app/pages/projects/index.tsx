import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
	makeStyles,
	useTheme,
	Theme,
	createStyles,
} from '@material-ui/core/styles';

import {
	Route,
	Switch,
	useHistory,
	useLocation,
	useRouteMatch,
} from 'react-router';
import { useQueryClient } from 'react-query';
import { User } from '../../types';

import { ReactComponent as Logo } from './../../../assets/logo.svg';
import { Box, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import CreateProject from './CreateProject';
import { NavLink } from 'react-router-dom';
import SidebarNavLink from '../../components/projects/SidebarNavLink';
import { ProjectContext } from '../../contexts/ProjectsContext';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
			'& div': {
				[theme.breakpoints.down('sm')]: {
					minHeight: 65,
				},
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		editorContainer: {
			'& .ql-container': {
				height: '100vh',
			},
		},
		navbarBrand: {
			cursor: 'pointer',
		},
	})
);

interface Props {
	window?: () => Window;
}

const Projects: React.FC<Props> = (props) => {
	const { displayView, editView, showView } = React.useContext(ProjectContext);
	const { path } = useRouteMatch();
	const { pathname } = useLocation();
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const history = useHistory();
	const queryClient = useQueryClient();

	const user = queryClient.getQueryData<User>('user');

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='flex-start'
					onClick={() =>
						user ? history.push('/dashboard') : history.push('/')
					}>
					<Logo
						style={{
							height: 70,
							width: 70,
							paddingTop: 2,
							marginRight: 3,
						}}
					/>
					<Typography className={classes.navbarBrand} variant='h6'>
						Learning Circle
					</Typography>
				</Box>
			</div>
			<Divider />
			<List>
				<SidebarNavLink
					icon={<Add />}
					primary='Create Project'
					exact
					to='/projects/create'
				/>
			</List>
			<Divider />
			<List>
				<ListItem component={NavLink} to='/projects/1' button>
					<ListItemText primary='Project 1' />
				</ListItem>

				<ListItem button>
					<ListItemText primary='Project 2' />
				</ListItem>

				<ListItem button>
					<ListItemText primary='Project 3' />
				</ListItem>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	React.useEffect(() => {
		if (pathname === '/projects') {
			history.push('/projects/create');
		}
	}, [pathname, history]);

	return (
		<div className={classes.root}>
			<AppBar elevation={0} position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Create New Project
					</Typography>
					<Box marginLeft='auto'>
						<Button
							variant='contained'
							onClick={showView === 'edit' ? displayView : editView}>
							{showView === 'edit' ? 'Preview Mode' : 'Edit Mode'}
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation='css'>
					<Drawer
						container={container}
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.editorContainer}>
					{/* <Editor /> */}
					<Switch>
						<Route path={`${path}/create`} exact>
							<CreateProject />
						</Route>
					</Switch>
				</div>
			</main>
		</div>
	);
};

export default Projects;

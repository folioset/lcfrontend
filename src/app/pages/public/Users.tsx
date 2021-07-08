import {
	Container,
	Grid,
	IconButton,
	makeStyles,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import UserItem from '../../components/User/UserItem';
import useAuthRoute from '../../hooks/useAuthRoute';
import { User } from '../../types';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Fuse from 'fuse.js';

interface UsersProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3),
			backgroundColor: theme.palette.common.white,
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
		},
		heading: {
			marginBottom: theme.spacing(3),
		},
		searchInput: {
			marginBottom: theme.spacing(3),
		},
		usersCard: {
			textAlign: 'center',
		},
	};
});

const Users: React.FC<UsersProps> = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const [users, setUsers] = React.useState<User[]>([]);

	const classes = useStyles();
	const { isLoading, data } = useQuery(
		'all-users',
		async (data) => {
			const res = await axios({
				method: 'GET',
				url: `/api/users`,
				data,
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				setUsers(data);
			},
		}
	);

	const fuse = new Fuse(users, {
		keys: ['name', 'username'],
	});

	return (
		<>
			<Container maxWidth='md' className={classes.root}>
				<TextField
					onChange={(e: any) => {
						const usersArr: User[] = [];
						const results = fuse.search(e.target.value);
						if (results.length > 0) {
							results.forEach((res) => {
								usersArr.push(res.item);
							});
							setUsers(usersArr);
						} else {
							setUsers(data);
						}
					}}
					className={classes.searchInput}
					fullWidth
					size='small'
					variant='outlined'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<IconButton>
									<SearchOutlinedIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					placeholder='Search'
				/>

				<Box className={classes.usersCard}>
					{isLoading && <Typography>Loading Users....</Typography>}
					<Grid container>
						{users?.map((user: User) => {
							return (
								<Grid item xs={12} key={user._id}>
									<UserItem key={user._id} user={user} />
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</Container>
		</>
	);
};

export default Users;

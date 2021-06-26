import {
	Container,
	Grid,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import UserItem from '../../components/dashboard/UserItem';
import useAuthRoute from '../../hooks/useAuthRoute';
import { User } from '../../types';

interface UsersProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3),
			backgroundColor: theme.palette.common.white 
		},
		heading: {
			marginBottom: theme.spacing(3),
		},
	};
});

const Users: React.FC<UsersProps> = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const { isLoading, data } = useQuery('all-users', async (data) => {
		const res = await axios({
			method: 'GET',
			url: `/api/users`,
			data,
		});
		return res.data;
	});

	return (
		<>
			<Container maxWidth='md' className={classes.root}>
				<Box textAlign='center'>
					{isLoading && <Typography>Loading Users....</Typography>}
					<Grid container>
						{data?.map((user: User) => {
							return (
								<Grid item xs={12}>
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

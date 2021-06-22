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
import UserItem from '../../components/dashboard/UserItem';
import { User } from '../../types';

interface UsersProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		heading: {
			marginBottom: theme.spacing(3),
		},
	};
});

const Users: React.FC<UsersProps> = () => {
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
			<Container maxWidth='md'>
				<Box textAlign='center'>
					<Typography className={classes.heading} variant='h4'>
						Users
					</Typography>
					{isLoading && <Typography>Loading Users....</Typography>}
					<Grid container spacing={3}>
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

import {
	Avatar,
	Box,
	Card,
	CardContent,
	createStyles,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import * as React from 'react';
import { User } from '../../types';

import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';

interface UserItemProps {
	user: User;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatarContainer: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: theme.spacing(3),
		},
	})
);

const UserItem: React.FC<UserItemProps> = ({ user }) => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<>
			<Card elevation={3} onClick={() => history.push('/public')}>
				<CardActionArea>
					<CardContent>
						<Box className={classes.avatarContainer}>
							<Avatar />
						</Box>
						<Box>
							<Typography>{user.name}</Typography>
							<Typography color='primary'>@{user.username}</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default UserItem;

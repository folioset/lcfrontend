import {
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';
import * as React from 'react';
import { User } from '../../types';

import CardActionArea from '@material-ui/core/CardActionArea';
import { useHistory } from 'react-router-dom';

interface UserItemProps {
	user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
	const history = useHistory();

	return (
		<>
			<Card
				onClick={() => history.push(`/public/users/${user._id ?? user.id}`)}>
				<CardActionArea>
					<CardContent>
						<Grid container>
							<Grid item xs={1}>
								<Avatar
									style={{ height: '4rem', width: '4rem' }}
									alt={user.name}
									src={user.profilePicture}
								/>
							</Grid>
							<Grid item container direction='column' xs={9} style={{paddingLeft: 5, alignItems: 'flex-start'}}>
									<Grid item>
										<Typography gutterBottom variant='h6'>
											{user.name || user.username}
										</Typography>
									</Grid>
									<Grid item>
											{user.about && (
												<Typography variant='body2' gutterBottom>
													{user.about}
												</Typography>
											)}
									</Grid>
									<Grid item>
											<Typography variant='body2' color='textSecondary'>
												{user.location}
											</Typography>
									</Grid>
							</Grid>
							<Grid item xs={2}>
										<Typography variant='h5'>
											{user.numberOfProjects} projects
										</Typography>
							</Grid>
							</Grid>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default UserItem;

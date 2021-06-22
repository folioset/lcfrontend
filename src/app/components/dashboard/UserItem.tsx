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
			<Card elevation={3} onClick={() => history.push('/public')}>
				<CardActionArea>
					<CardContent>
						<Grid container>
							<Grid item xs={2}>
								<Avatar
									style={{ height: '5rem', width: '5rem' }}
									alt={user.name}
									src={user.profilePicture}
								/>
							</Grid>
							<Grid item xs={3}>
								<Grid
									container
									direction='column'
									style={{
										alignItems: 'flex-start',
										justifyContent: 'center',
									}}>
									<Grid item>
										<Typography gutterBottom variant='h6'>
											{user.name || user.username} (Name)
										</Typography>
										<Typography gutterBottom color='primary'>
											{'@' + user.username} (username)
										</Typography>
									</Grid>
									<Grid item>
										<Box mt={4}>
											{user.about && (
												<Typography variant='body2' gutterBottom>
													{user.about} (Headline)
												</Typography>
											)}

											<Typography variant='body2' color='textSecondary'>
												Hyderabad, India (Location)
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={3}>
								<Grid container direction='column'>
									<Grid
										item
										style={{
											justifyContent: 'center',
											alignItems: 'center',
											display: 'flex',
										}}>
										<Box>
											<Typography variant='h6'># projects</Typography>
										</Box>
									</Grid>

									<Box mt={6.5}>
										<Typography color='primary' variant='h4'>
											18
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default UserItem;

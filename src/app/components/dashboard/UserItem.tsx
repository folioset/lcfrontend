import * as React from 'react';
import { useHistory } from 'react-router-dom';

// Material ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles, Theme } from '@material-ui/core';

// types
import { User } from '../../types';
import Avatar from '../shared/Avatar';

interface UserItemProps {
	user: User;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		avatar: {
			height: '4rem',
			width: '4rem',
		},
		detailsGrid: {
			paddingLeft: theme.spacing(3),
			alignItems: 'flex-start',

			[theme.breakpoints.down('xs')]: {
				alignItems: 'center',
			},
		},
		projectsNum: {
			[theme.breakpoints.down('xs')]: {
				marginTop: theme.spacing(2),
			},
		},
	};
});

const UserItem: React.FC<UserItemProps> = ({ user }) => {
	const history = useHistory();
	const classes = useStyles();

	return (
		<>
			<Card
				onClick={() => history.push(`/public/users/${user._id ?? user.id}`)}>
				<CardActionArea>
					<CardContent>
						<Grid container>
							<Grid item sm={1} xs={2}>
								<Avatar
									className={classes.avatar}
									alt={user.name}
									src={user.profilePicture}
								/>
							</Grid>
							<Grid
								item
								container
								direction='column'
								sm={9}
								xs={10}
								className={classes.detailsGrid}>
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
							<Hidden only={['sm', 'md', 'xl', 'lg']}>
								<Grid item xs={2}></Grid>
							</Hidden>
							<Grid
								item
								container
								sm={2}
								xs={10}
								justify='center'
								className={classes.projectsNum}>
								<Typography variant='h5' color='primary'>
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

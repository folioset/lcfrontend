import { makeStyles, Box, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Project, User } from '../../types';
import ProfileCard from './ProfileCard';
import ProjectPublicCard from './ProjectPublicCard';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			minHeight: '100vh',
			backgroundColor: '#111111',
			padding: theme.spacing(4),

			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2),
				height: 'auto',
			},

			[theme.breakpoints.down('sm')]: {
				padding: theme.spacing(1),
			},
		},
		heading: {
			marginBottom: theme.spacing(4),

			[theme.breakpoints.down('sm')]: {
				fontSize: 30,
			},
		},
	};
});

interface ProfileViewProps {
	user?: User;
	isLoading: boolean;
	data: any;
	isPublic?: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({
	user,
	isLoading,
	data,
	isPublic,
}) => {
	const classes = useStyles();

	return (
		<>
			<Box className={classes.root}>
				<Container maxWidth='md'>
					{user && (
						<Box my={5}>
							<ProfileCard user={user} isPublic={isPublic} />
						</Box>
					)}
					<Box>
						{isLoading && (
							<Box textAlign='center'>
								<Typography color='primary'>Loading Projects ....</Typography>
							</Box>
						)}
						{data?.map((project: Project) => {
							return (
								<ProjectPublicCard
									isPublic={isPublic}
									key={project._id}
									{...{ project }}
								/>
							);
						})}
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default ProfileView;

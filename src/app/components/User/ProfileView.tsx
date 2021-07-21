import { makeStyles, Box, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Project, User } from '../../types';
import ProfileCard from './ProfileCard';
import ProjectCard from '../Project/ProjectCard';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			minHeight: '100vh',
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(4),

			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2),
				height: 'auto',
			},

			[theme.breakpoints.down('sm')]: {
				padding: theme.spacing(1),
			},
		},
		card: {
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
			width: '95%',
			margin: 'auto',
		},
		heading: {
			marginBottom: theme.spacing(4),

			[theme.breakpoints.down('sm')]: {
				fontSize: 30,
			},
		},
		projects: {
			'& > *': {
				marginBottom: 30,
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
						<Box>
							<ProfileCard user={user} isPublic={isPublic} />
						</Box>
					)}
					<Box className={classes.projects}>
						{isLoading && (
							<Box textAlign='center'>
								<Typography color='primary'>Loading Projects ....</Typography>
							</Box>
						)}
						{data?.map((project: Project) => {
							return (
								<Box className={classes.card}>
									<ProjectCard
										isPublic={isPublic}
										key={project._id}
										{...{ project }}
									/>
								</Box>
							);
						})}
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default ProfileView;

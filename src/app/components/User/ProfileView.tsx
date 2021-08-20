import { makeStyles, Box, Grid, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Project, User } from '../../types';
import ProfileCard from './ProfileCard';
import ProjectCard from '../Project/ProjectCard';
import InterviewCard from '../Interview/InterviewCard';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			minHeight: '100vh',
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(1),

			[theme.breakpoints.down('sm')]: {
				padding: theme.spacing(1),
			},
		},
		card: {
			borderRadius: 20,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
			width: '95%',
			margin: 'auto',
			marginBottom: 30,
		},
		heading: {
			marginBottom: theme.spacing(4),

			[theme.breakpoints.down('sm')]: {
				fontSize: 30,
			},
		},
		GridContr: {
			maxWidth: 900,
			margin: 'auto',
			justifyContent: 'center',
			marginTop: theme.spacing(2)
		},
		check: {
			padding: theme.spacing(1),
		}
	};
});

interface ProfileViewProps {
	user?: User;
	isLoadingProjects: boolean;
	projects: any;
	interviews: any;
	isLoadingInterviews: boolean;
	isPublic?: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({
	user,
	isLoadingProjects,
	projects,
	interviews,
	isLoadingInterviews,
	isPublic,
}) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.GridContr}>
			<Grid item xs={12} md={4} className={classes.check} >
				{user && <ProfileCard user={user} isPublic={isPublic} />}
			</Grid>
			<Grid item xs={12} md={8}>
				{isLoadingProjects && (
								<Box textAlign='center'>
									<Typography color="secondary">Loading Projects ....</Typography>
								</Box>
				)}
				{!isLoadingProjects && (projects.map((project: Project) => {
								return (
									<Box className={classes.card}>
										<ProjectCard
											isPublic={isPublic}
											key={project._id}
											{...{ project }}
										/>
									</Box>
								);
							}))
				}
				{!isLoadingInterviews && (interviews.map((project: Project) => {
								return (
									<Box className={classes.card}>
										<InterviewCard
											isPublic={isPublic}
											key={project._id}
											{...{ project }}
										/>
									</Box>
								);
							})) 
				}
				{!projects?.length && !interviews?.length ?
				(<Box textAlign='center' style={{marginTop: 200}}>
					<Typography color="secondary" variant='h4'>No projects to display</Typography>
				</Box>) : null}
			</Grid>
	</Grid>
	);
};

export default ProfileView;

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
		GridContr: {
			margin: 'auto',
			backgroundColor: '#f5f5f5',
			justifyContent: 'center'
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
		<>
			<Box className={classes.root}>
				<Container>
					{user && (
						<Box>
							<ProfileCard user={user} isPublic={isPublic} />
						</Box>
					)}
				<Grid container className={classes.GridContr}>
					<Grid item xs={12} md={6} className={classes.projects}>
							{isLoadingProjects && (
								<Box textAlign='center'>
									<Typography color='primary'>Loading Projects ....</Typography>
								</Box>
							)}
							{projects?.length ? (projects.map((project: Project) => {
								return (
									<Box className={classes.card}>
										<ProjectCard
											isPublic={isPublic}
											key={project._id}
											{...{ project }}
										/>
									</Box>
								);
							})) : (<Box textAlign='center'>
								<Typography color='primary' variant='h4'>No Projects Yet!!</Typography>
							</Box>)
							}
					</Grid>
					<Grid item xs={12} md={6}>
						{interviews?.length ? (interviews.map((project: Project) => {
								return (
									<Box className={classes.card}>
										<InterviewCard
											key={project._id}
											{...{ project }}
										/>
									</Box>
								);
							})) : (<Box textAlign='center'>
								<Typography color='primary' variant='h4'>No Projects Yet!!</Typography>
							</Box>)
							}
					</Grid>
				</Grid>
				</Container>
			</Box>
		</>
	);
};

export default ProfileView;

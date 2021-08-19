import { Link, makeStyles, Theme, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import * as React from 'react';
import { ProjectFeed } from '../../types';
import Avatar from '../shared/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import InterviewCard from '../Interview/InterviewCard';

interface FeedProjectProps {
	project: ProjectFeed;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		name: {
			cursor: 'pointer',
			fontSize: 15,
			fontWeight: 450,
			marginLeft: -7,
		},
		about: {
			fontSize: 13,
			fontColor: 'textSecondary',
			marginLeft: -7,
		},
		root: {
			marginBottom: theme.spacing(3),
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
			marginLeft: 'auto',
		},
	};
});

const FeedProject: React.FC<FeedProjectProps> = ({ project }) => {
	const classes = useStyles();

	return (
		<>
			<Card className={classes.root}>
				<CardHeader
					avatar={<Avatar aria-label='user' src={project.profilePicture} />}
					title={
						<Link
							component={RouterLink}
							to={`/public/users/${project.createdBy}`}
							className={classes.name}
							color='textPrimary'
							variant='h4'>
							{project.name}
						</Link>
					}
					subheader={
						<Typography variant='body2' className={classes.about}>
							{project.about}
						</Typography>
					}
				/>
				{project.isVideoInterview ? (
					<InterviewCard isPublic project={project} />
				) : (
					<ProjectCard isPublic project={project} />
				)}
			</Card>
		</>
	);
};

export default FeedProject;

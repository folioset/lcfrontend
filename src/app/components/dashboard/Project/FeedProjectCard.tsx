import {
	CardActions,
	Link,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import * as React from 'react';
import { ProjectFeed } from '../../../types';
import Avatar from '../../shared/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import ProjectCard from './ProjectCard';

interface FeedProjectProps {
	project: ProjectFeed;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		name: {
			cursor: 'pointer',
			fontSize: 17,
			fontWeight: 520
		},
		root: {
			marginBottom: theme.spacing(4),
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)'
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
							color='secondary'
							variant='h4'>
							{project.name}
						</Link>
					}
					subheader={
						<Typography variant='body2'>
							{project.about}
						</Typography>
					}
				/>
				<ProjectCard isPublic project={project} />
			</Card>
		</>
	);
};

export default FeedProject;

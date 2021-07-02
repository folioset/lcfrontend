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
		username: {
			cursor: 'pointer',
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
					title={<Typography>{project.name}</Typography>}
					subheader={
						<Link
							component={RouterLink}
							to={`/public/users/${project.createdBy}`}
							className={classes.username}
							color='primary'>
							{'@' + project.username}
						</Link>
					}
				/>
				<ProjectCard isPublic project={project} />
			</Card>
		</>
	);
};

export default FeedProject;

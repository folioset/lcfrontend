import * as React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {
	Box,
	Container,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import { Project, Review as ReviewType } from '../../types';
import Review from './ReviewCard';
import { useQuery } from 'react-query';
import axios from 'axios';

interface ProjectReviewDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	project: Project;
}

const DRAWER_WIDTH = 700;

const useStyles = makeStyles((theme: Theme) => {
	return {
		drawer: {
			minWidth: DRAWER_WIDTH,
			padding: theme.spacing(3),
		},
		projectTitle: {
			textAlign: 'center',
			marginBottom: theme.spacing(4),
		},
		reviews: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	};
});

const ProjectReviewDrawer: React.FC<ProjectReviewDrawerProps> = ({
	isOpen,
	onClose,
	onOpen,
	project,
}) => {
	const classes = useStyles();
	const { isLoading, data } = useQuery(
		['project-reviews', project._id],
		async () => {
			try {
				const res = await axios({
					method: 'get',
					url: `/api/project/${project._id}/reviews`,
				});

				return res.data;
			} catch (err) {
				return err;
			}
		}
	);

	return (
		<>
			<SwipeableDrawer
				anchor='right'
				open={isOpen}
				onClose={onClose}
				onOpen={onOpen}>
				<Box className={classes.drawer}>
					<Container>
						<Typography
							className={classes.projectTitle}
							variant='h4'
							color='primary'>
							Reviews on {project.title}
						</Typography>
						<Box className={classes.reviews}>
							{isLoading && <Typography>Loading Reviews....</Typography>}
							{data?.map((review: ReviewType) => {
								return <Review key={review._id} review={review} />;
							})}
						</Box>
					</Container>
				</Box>
			</SwipeableDrawer>
		</>
	);
};

export default ProjectReviewDrawer;

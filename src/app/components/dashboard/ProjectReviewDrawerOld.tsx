import * as React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {
	AppBar,
	Box,
	Container,
	makeStyles,
	Tab,
	Tabs,
	Theme,
	Typography,
} from '@material-ui/core';
import { Project, Review } from '../../types';
import ReviewCard from './ReviewDrawerCardOld';
import { useQuery } from 'react-query';
import axios from 'axios';
import TabPanel from '../shared/TabPanel';
import useTabPanel from '../../hooks/useTabPanel';

interface ProjectReviewDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	project: Project;
}

const DRAWER_WIDTH = 744;

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
	const { value, handleChange, tabPanelProps } = useTabPanel();

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
							{!data?.length ? (
								<Typography>{!isLoading && 'No reviews yet'}</Typography>
							) : (
								<>
									<AppBar position='static' elevation={0} color='transparent'>
										<Tabs
											indicatorColor='primary'
											value={value}
											onChange={handleChange}
											aria-label='simple tabs example'>
											{['suggestion', 'comment'].map((type, i) => (
												<Tab
													label={type + 's'}
													key={type}
													{...tabPanelProps(i)}
												/>
											))}
										</Tabs>
									</AppBar>
									{['suggestion', 'comment'].map((type, i) => {
										return (
											<TabPanel value={value} index={i}>
												{data?.map((review: Review) => {
													if (type === review.category) {
														return (
															<ReviewCard key={review._id} review={review} />
														);
													}

													return null;
												})}
											</TabPanel>
										);
									})}
								</>
							)}
						</Box>
					</Container>
				</Box>
			</SwipeableDrawer>
		</>
	);
};

export default ProjectReviewDrawer;

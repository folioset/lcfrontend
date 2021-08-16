import {
	Button,
    Box,
	CircularProgress,
	Container,
	makeStyles,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import {useState, useEffect} from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
import ReactPlayer from 'react-player'

import RatingCard from '../shared/RatingCard';
import ReviewsSection from '../Reviews/ReviewsSection';

// types
import { Project, Review, User } from '../../types';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2)
		},
		video: {
			// alignContent: 'center',
			// alignItems: 'center',
			// justifyContent: 'center',
			// textAlign: 'center'
		},
		ratings: {
			padding: theme.spacing(1)
		},
		cardContent: {
			marginTop: -20,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderBottomColor: theme.palette.divider,
			paddingBottom: theme.spacing(4),
		},
	};
});


interface InterviewCardProps {
	project: Project;
	isPublic?: boolean;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ project, isPublic }) => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const history = useHistory();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	const [num, setNum] = useState(1);
	const [mute, setMute] = useState(true);
	
	// Get all Project Reviews
	const {
		isLoading,
		data: reviews,
		refetch: refetchReviews,
	} = useQuery(['project-reviews', project._id, num], async () => {
		const res = await axios({
			method: 'get',
			url: `/api/project/${project._id}/reviews/${num}`,
		});
		return res.data;
	});

	useEffect(() => {
		console.log(num, 'this is num in 2nd use');
		refetchReviews();
	}, [num]);

	const handleMoreReviews = () => {
		setNum(num + 5);
	};
	

	return ( 
		<Box>
            <Typography variant='h4' className={classes.heading}>{project.videoInterviewQuestion}</Typography>
			<ReactPlayer 
			url={project.videoFile}
			playing={true}
			controls={true}
			className={classes.video}
			height='600px'
			width='800px'
			/>
			<div className={classes.ratings} >
				{isPublic && <RatingCard {...{ project }} />}
			</div>
			<div className={classes.cardContent}>
					{isLoading && (
						<Typography color='primary' variant='caption'>
							Loading reviews
						</Typography>
					)}
					{reviews?.length > 0 && (
						<>
							<Box>
								{reviews?.map((review: Review) => {
									return (
										<ReviewsSection
											key={review.reviewDetails!._id}
											{...{ review, project }}
										/>
									);
								})}
							</Box>
							{reviews?.length !== project?.reviews.length ? (<Button
								onClick={handleMoreReviews}
								style={{ textTransform: 'none', marginBottom: -20 }}>
								Load more reviews
							</Button>) : null}
						</>
					)}
				</div>
		</Box>
	);
};

export default InterviewCard;

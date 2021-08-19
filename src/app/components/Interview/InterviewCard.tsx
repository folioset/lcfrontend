import { Button, Box, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';

import RatingCard from '../shared/RatingCard';
import ReviewsSection from '../Reviews/ReviewsSection';
// import ReactPlayer from 'react-player';

// types
import { Project, Review } from '../../types';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
		video: {
			// alignContent: 'center',
			// alignItems: 'center',
			// justifyContent: 'center',
			// textAlign: 'center'
		},
		ratings: {
			padding: theme.spacing(1),
		},
		cardContent: {
			marginTop: -20,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderBottomColor: theme.palette.divider,
			paddingBottom: theme.spacing(4),
			padding: theme.spacing(2),
		},
	};
});

interface InterviewCardProps {
	project: Project;
	isPublic?: boolean;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ project, isPublic }) => {
	const location = useLocation();
	const videoRef = React.useRef<any>(null);
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const [num, setNum] = React.useState(1);

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

	React.useEffect(() => {
		let options = {
			rootMargin: '100px',
			threshold: 0.25,
		};

		if (videoRef.current) {
			let handlePlay = (entries: any, _: any) => {
				entries.forEach(async (entry: any) => {
					if (entry.isIntersecting) {
						try {
							await videoRef?.current?.play();
						} catch (err) {}
					} else {
						try {
							await videoRef?.current?.pause();
						} catch (err) {}
					}
				});
			};

			let observer = new IntersectionObserver(handlePlay, options);

			observer.observe(videoRef.current);
		}
	});

	React.useEffect(() => {
		console.log(num, 'this is num in 2nd use');
		refetchReviews();
	}, [num]);

	const handleMoreReviews = () => {
		setNum(num + 5);
	};

	return (
		<Box>
			<Typography variant='h4' className={classes.heading}>
				{project.videoInterviewQuestion}
			</Typography>
			<video
				src={project.videoFile}
				height={600}
				width={800}
				controls
				ref={videoRef}
			/>
			<div className={classes.ratings}>
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
						{reviews?.length !== project?.reviews.length ? (
							<Button
								onClick={handleMoreReviews}
								style={{ textTransform: 'none', marginBottom: -20 }}>
								Load more reviews
							</Button>
						) : null}
					</>
				)}
			</div>
		</Box>
	);
};

export default InterviewCard;

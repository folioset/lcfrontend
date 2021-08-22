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
		root: {
			backgroundColor: 'white',
			borderRadius: 10,
			maxWidth: 700
		},
		heading: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(1)
		},
		video: {
			// alignContent: 'center',
			// alignItems: 'center',
			// justifyContent: 'center',
			// textAlign: 'center'
			// marginTop: -theme.spacing(2)
		},
		ratings: {
			padding: theme.spacing(0.5)
		},
		cardContent: {
			marginTop: -theme.spacing(6),
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderBottomColor: theme.palette.divider,
			padding: theme.spacing(2),
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3)
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
		<Box className={classes.root}>
			<Typography variant='h4' className={classes.heading}>
				{project.videoInterviewQuestion}
			</Typography>
			<video
				src={project.videoFile}
				height={500}
				width={'100%'}
				className={classes.video}
				controls
				ref={videoRef}
			/>
			{
				isPublic && <div className={classes.ratings}>
				<RatingCard {...{ project }} />
				</div>
			}
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

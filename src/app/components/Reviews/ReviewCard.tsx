import { Link, Typography, Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { Project, Review } from '../../types';
import Avatar from '../shared/Avatar';
import { format } from 'date-fns';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface ReviewCardProps {
	review: Review;
	project: Project;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: theme.spacing(1),
			backgroundColor: theme.palette.grey['100'],
			borderRadius: 10,
		},
		avatar: {
			backgroundColor: theme.palette.primary.main,
		},
		name: {
			cursor: 'pointer',
			fontSize: 15,
			fontWeight: 450,
			marginLeft: -7
		},
		about: {
			fontSize: 13,
			fontColor: 'textSecondary',
			marginLeft: -7
		},
		content: {
			marginTop: -20,
			marginBottom: -10,
			fontSize: 15,
		},
		comment: {
			'& fieldset': {
				borderRadius: 500,
			},
		},
		replyForm: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		},
	})
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review, project }) => {
	const classes = useStyles();
	const [more, setMore] = useState(false);

	const { isLoading: completeReviewLoading, data: completeReview } = useQuery(
		['complete-review', project._id, review.reviewDetails._id],
		async () => {
			const res = await axios({
				method: 'GET',
				url: `/api/project/${project._id}/reviews/${review.reviewDetails._id}/get-more`,
			});
			return res.data;
		}
	);

	const handleSeeMore = () => {
		setMore(true);
	}

	return (
		<Card elevation={0} className={classes.root}>
			<CardHeader
				action={
					<Typography
						style={{ paddingRight: 3 }}
						color='textSecondary'
						variant='caption'>
						{format(new Date(review.reviewDetails?.updatedAt), 'dd MMMM yyyy')}
					</Typography>
				}
				avatar={
					<Avatar className={classes.avatar} src={review.profilePicture}>
						{review.name.split('')[0]}
					</Avatar>
				}
				title={
					<Link
						component={RouterLink}
						to={`/public/users/${review.reviewDetails?.createdBy}`}
						className={classes.name}
						color='secondary'
						variant='h4'>
						{review.name}
					</Link>
				}
				subheader={<Typography variant='body2' className={classes.about}>{review.about}</Typography>}
				
			/>
			<CardContent className={classes.content}>
				{more ?
				completeReview.split('\n').map((el: any) => {
					if (!el.length) {
						return <br />;
					}
					return <Typography variant='body2'>{el}</Typography>;
				})
				:
				<>
				{
					`${review.reviewDetails?.review}`.split('\n').map((el) => {
						if (!el.length) {
							return <br />;
						}
						return <Typography variant='body2'>{el}</Typography>;
					})
				}
					<Link onClick={handleSeeMore}>
						<Typography variant='body2' color='secondary'>see more</Typography>
					</Link>	
				</>
				
				}
			</CardContent>
		</Card>
	);
};

export default ReviewCard;

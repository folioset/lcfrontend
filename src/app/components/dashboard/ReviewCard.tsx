import * as React from 'react';
import { format } from 'date-fns';
import { Review } from '../../types';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	createStyles,
	makeStyles,
	Theme,
	Typography,
	Box,
} from '@material-ui/core';

interface ReviewCardProps {
	review: Review;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: theme.spacing(3),
			backgroundColor: theme.palette.grey['100'],
		},
		avatar: {
			backgroundColor: theme.palette.primary.main,
		},
		content: {
			marginTop: theme.spacing(3),
		},
	})
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
	const classes = useStyles();
	return (
		<>
			<Card elevation={0} className={classes.root}>
				<CardHeader
					action={
						<Typography
							style={{ paddingRight: 3 }}
							color='textSecondary'
							variant='caption'>
							{'Updated on ' +
								format(
									new Date(review.reviewDetails.updatedAt),
									'MMMM dd yyyy'
								)}
						</Typography>
					}
					style={{ marginBottom: -20 }}
					avatar={
						<Avatar className={classes.avatar} src={review.profilePicture}>
							{review.name}
						</Avatar>
					}
					title={
						<Box display='flex' alignItems='center' style={{ gap: 10 }}>
							<Typography variant='body1'>{review.name}</Typography>
							<Typography color='primary' variant='caption'>
								@{review.username}
							</Typography>
						</Box>
					}
					subheader={
						<>
							<Typography color='textSecondary' variant='caption'>
								{review.about}
							</Typography>
						</>
					}
				/>
				<CardContent className={classes.content}>
					{review.reviewDetails.review}
				</CardContent>
			</Card>
		</>
	);
};

export default ReviewCard;

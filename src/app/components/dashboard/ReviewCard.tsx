import * as React from 'react';
import { Review } from '../../types';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	createStyles,
	makeStyles,
	Theme,
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
						'Posted on ' +
						new Date(review.reviewDetails.createdAt).toLocaleDateString() +
						' at ' +
						new Date(review.reviewDetails.createdAt).toLocaleTimeString()
					}
					style={{ marginBottom: -20 }}
					avatar={
						<Avatar className={classes.avatar} src={review.profilePicture}>
							{review.name}
						</Avatar>
					}
					title={review.name}
					subheader={'@' + review.username}
					subheaderTypographyProps={{
						color: 'primary',
					}}
				/>
				<CardContent className={classes.content}>
					{review.reviewDetails.review}
				</CardContent>
			</Card>
		</>
	);
};

export default ReviewCard;

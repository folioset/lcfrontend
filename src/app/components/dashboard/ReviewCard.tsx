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
	})
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
	const classes = useStyles();
	return (
		<>
			<Card elevation={0} className={classes.root}>
				<CardHeader
				    action='Posted date'
					style={{marginBottom: -20}}
					avatar={
						<Avatar className={classes.avatar} aria-label='recipe'>
							SR
						</Avatar>
					}
					title='Name of User'
					subheader='Headline of user'
				/>
				<CardContent>{review.review}</CardContent>
			</Card>
		</>
	);
};

export default ReviewCard;

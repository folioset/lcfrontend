import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	createStyles,
	makeStyles,
	Theme,
} from '@material-ui/core';
import * as React from 'react';
import { Review as ReviewType } from '../../types';

interface ReviewProps {
	review: ReviewType;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 600,
			marginBottom: theme.spacing(3),
		},
		avatar: {
			backgroundColor: theme.palette.primary.main,
		},
	})
);

const ReviewDrawerCard: React.FC<ReviewProps> = ({ review }) => {
	const classes = useStyles();
	return (
		<>
			<Card elevation={3} className={classes.root}>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar} aria-label='recipe'>
							UN
						</Avatar>
					}
					title='Name of User'
					subheader='September 14, 2016'
				/>
				<CardContent>{review.review}</CardContent>
			</Card>
		</>
	);
};

export default ReviewDrawerCard;

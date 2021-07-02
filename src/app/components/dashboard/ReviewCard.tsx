import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { Project, Review } from '../../types';
import Avatar from '../shared/Avatar';
import { format } from 'date-fns';

interface ReviewCardProps {
	review: Review;
	project?: Project;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: theme.spacing(1),
			backgroundColor: theme.palette.grey['100'],
			borderRadius: 10
		},
		avatar: {
			backgroundColor: theme.palette.primary.main,
		},
		content: {
			marginTop: theme.spacing(3),
			marginBottom: -10,
			fontSize: 15
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

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
	const classes = useStyles();

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
				style={{ marginBottom: -40 }}
				avatar={
					<Avatar className={classes.avatar} src={review.profilePicture}>
						{review.name.split('')[0]}
					</Avatar>
				}
				title={<Typography variant='body2' style={{fontWeight: 500}}>{review.name}</Typography>}
				subheader={
						<Typography color='textSecondary' variant='caption'>
							{review.about}
						</Typography>
				}
			/>
			<CardContent className={classes.content}>
				{review.reviewDetails?.review}
			</CardContent>
		</Card>
	);
};

export default ReviewCard;

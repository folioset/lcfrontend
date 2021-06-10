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

interface ReviewProps {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 600,
			marginBottom: theme.spacing(3),
		},
		avatar: {
			backgroundColor: theme.palette.primary.main,
		},
	})
);

const Review: React.FC<ReviewProps> = () => {
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
				<CardContent>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Exercitationem incidunt tenetur necessitatibus. Cupiditate corrupti
					cum voluptas praesentium molestiae nihil autem.
				</CardContent>
			</Card>
		</>
	);
};

export default Review;

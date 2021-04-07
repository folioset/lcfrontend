import * as React from 'react';
import clsx from 'clsx';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Box } from '@material-ui/core';

// Styles
const useStyles = makeStyles(() => {
	return {
		root: {
			minWidth: 275,
			marginBottom: 40,
			height: 300,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},

		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},

		iconContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
		},
		cardContent: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		icon: {
			height: 70,
			width: 70,
		},
		title: {
			fontSize: 14,
		},
		pos: {
			marginBottom: 12,
		},
		actionCard: {
			height: '100%',
		},
		active: {
			backgroundColor: 'rgba(0, 0, 0, .2)',
		},
		media: {
			height: 140,
		},
	};
});

interface Props {
	objective: any;
	handleObjectives: (n: string) => void;
	objectives: any[];
}

const ObjectiveCard: React.FC<Props> = ({
	objective,
	handleObjectives,
	objectives,
}) => {
	const classes = useStyles();

	return (
		<>
			<Card className={classes.root}>
				<CardActionArea
					onClick={() => handleObjectives(objective.name)}
					className={clsx(
						classes.actionCard,
						objectives.some((el) => el === objective.name) && classes.active
					)}>
					<CardContent className={classes.cardContent}>
						<Box textAlign='center'>
							<Typography
								color='primary'
								gutterBottom
								variant='h5'
								component='h2'>
								{objective.name}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								{objective.description}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default ObjectiveCard;

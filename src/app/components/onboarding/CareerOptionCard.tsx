import * as React from 'react';
import clsx from 'clsx';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CareerOptions } from '../../types';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		root: {
			minWidth: 280,
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

		pos: {
			marginBottom: 12,
		},
		actionCard: {
			height: '100%',
		},
		active: {
			backgroundColor: 'rgba(0, 0, 0, .1)',
		},
		cardContent: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	};
});

interface Props {
	careerOptions: CareerOptions[];
	option: CareerOptions;
	handleOptions: (opt: CareerOptions) => void;
}

const CareerOptionCard: React.FC<Props> = ({
	option,
	handleOptions,
	careerOptions,
}) => {
	const classes = useStyles();

	const handleClick = () => {
		handleOptions(option);
	};

	return (
		<>
			<Card className={classes.root} color='primary' variant='outlined'>
				<CardActionArea
					onClick={handleClick}
					className={clsx(
						classes.actionCard,
						careerOptions.some((el) => el._id === option._id) && classes.active
					)}>
					<CardContent className={classes.cardContent}>
						<Box textAlign='center'>
							<Typography color='primary' variant='h6' component='p'>
								{option.name}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default CareerOptionCard;

import React from 'react';

// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components
import ObjectiveCard from '../../../components/onboarding/ObjectiveCard';

const OBJECTIVES = [
	'Lorem ipsum dolor sit',
	'amet consectetur',
	'adipisicing elit',
];

const useStyles = makeStyles({
	root: {
		minHeight: '70vh',
	},
	heading: {
		textAlign: 'center',
		marginBottom: 40,
	},
});

const Objectives: React.FC = () => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Container>
				<Typography className={classes.heading} variant='h4' component='h1'>
					Your Objectives
				</Typography>
				<Grid container spacing={4}>
					{OBJECTIVES.map((objective) => {
						return (
							<Grid item md={4} sm={6} xs={12}>
								<ObjectiveCard {...{ objective }} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</Box>
	);
};

export default Objectives;

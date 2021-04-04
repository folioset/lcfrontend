import React from 'react';
import Masonry from 'react-masonry-css';

// MUI
import { Box, Container, makeStyles, Typography } from '@material-ui/core';

// Components
import ObjectiveCard from '../../../components/onboarding/ObjectiveCard';

const OBJECTIVES = [
	'Lorem ipsum dolor sit',
	'amet consectetur',
	'adipisicing elit',
];

const useStyles = makeStyles({
	masonry: {
		display: 'flex',
		marginLeft: -30,
		width: 'auto',
	},
	masonry_cols: {
		paddingLeft: 30,
		backgroundClip: 'padding-box',
	},
	heading: {
		textAlign: 'center',
		marginBottom: 40,
	},
});

const Objectives: React.FC = () => {
	const classes = useStyles();

	return (
		<Box>
			<Container>
				<Typography className={classes.heading} variant='h4' component='h1'>
					Your Objectives
				</Typography>
				<Masonry
					breakpointCols={3}
					className={classes.masonry}
					columnClassName={classes.masonry_cols}>
					{OBJECTIVES.map((objective) => {
						return <ObjectiveCard key={objective} {...{ objective }} />;
					})}
				</Masonry>
			</Container>
		</Box>
	);
};

export default Objectives;

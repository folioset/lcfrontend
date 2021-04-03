import * as React from 'react';
import { useHistory } from 'react-router';

// MUI
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// styles
const useStyles = makeStyles({
	container: {
		textAlign: 'center',
		marginTop: 150,

		'& h1': {
			marginBottom: 70,
		},
	},
});

const FinalSlider: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Box className={classes.container}>
			<Typography color='primary' variant='h1'>
				Welcome.
			</Typography>

			<Button
				onClick={() => history.replace('/dashboard/schedule')}
				color='secondary'
				variant='outlined'>
				Get Started
			</Button>
		</Box>
	);
};

export default FinalSlider;

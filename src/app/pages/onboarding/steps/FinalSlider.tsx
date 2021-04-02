import * as React from 'react';

// MUI
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// styles
const useStyles = makeStyles({
	container: {
		textAlign: 'center',

		'& h1': {
			marginBottom: 10,
		},

		'& h4': {
			marginBottom: 70,
		},
	},
});

const FinalSlider: React.FC = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography color='primary' variant='h1'>
				Welcome.
			</Typography>
			<Typography color='textSecondary' variant='h4'>
				Verify your email to use our services
			</Typography>
			<Button color='secondary' variant='outlined'>
				Resend Email Confirmation
			</Button>
		</Box>
	);
};

export default FinalSlider;

import {
	Box,
	Button,
	Container,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

interface InterviewFinishProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		heading: {
			textAlign: 'center',
			marginBottom: theme.spacing(3),
		},
		videoContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: theme.spacing(3),
		},
		video: {
			backgroundColor: 'black',
			height: '600px',
			width: '800px',
			borderRadius: 30,
		},
	};
});

const InterviewFinish: React.FC<InterviewFinishProps> = () => {
	const location = useLocation<any>();
	const classes = useStyles();
	console.log(location);

	return (
		<>
			<Container>
				<Typography variant='h3' className={classes.heading}>
					Your Interview
				</Typography>
				<Box className={classes.videoContainer}>
					<video
						className={classes.video}
						controls
						src={location?.state?.url as any}
						style={{}}
					/>
				</Box>
				<Box textAlign='center'>
					<Button variant='contained' color='primary'>
						Finish Interview
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default InterviewFinish;

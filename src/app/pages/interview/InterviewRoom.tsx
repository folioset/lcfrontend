import { Button, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import useScreenShare from '../../hooks/useScreenShare';

interface InterviewRoomProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		box: {
			padding: theme.spacing(5),
		},
		heading: {
			textAlign: 'center',
			marginBottom: theme.spacing(3),
		},
		subheading: {
			textAlign: 'center',
			marginBottom: theme.spacing(3),
		},
		videoContainer: {
			position: 'relative',
		},
		video: {
			height: '500px',
			width: '100%',
			borderRadius: 30,
			backgroundColor: 'black',
		},
	};
});

const InterviewRoom: React.FC<InterviewRoomProps> = () => {
	const {
		userScreenVideoRef,
		userVideoRef,
		startRecord,
		stopRecord,
		isRecording,
	} = useScreenShare();
	const classes = useStyles({ isRecording });

	return (
		<>
			<Box className={classes.box}>
				<Container>
					<Typography variant='h3' className={classes.heading}>
						Answer a question in a timed interview-like format
					</Typography>
					<Typography variant='h4' className={classes.subheading}>
						Your screen and Video will be recorded while interview is in
						progress
					</Typography>
					<Box textAlign='center' mb={5}>
						{!isRecording && (
							<Button
								onClick={async () => {
									startRecord();
								}}
								variant='contained'
								color='primary'>
								Start Interview
							</Button>
						)}
						{isRecording && (
							<Button
								onClick={async () => {
									stopRecord();
								}}
								variant='contained'
								color='primary'>
								End Interview
							</Button>
						)}
					</Box>
					<Grid container spacing={5}>
						<Grid item md={6} className={classes.videoContainer}>
							<video
								ref={userVideoRef}
								autoPlay
								className={classes.video}
								src={userVideoRef?.current?.srcObject}
							/>
						</Grid>
						<Grid item md={6}>
							<video
								ref={userScreenVideoRef}
								src={userScreenVideoRef?.current?.srcObject}
								autoPlay
								className={classes.video}
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default InterviewRoom;

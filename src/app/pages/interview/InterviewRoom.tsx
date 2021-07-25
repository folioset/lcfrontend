import { Button, makeStyles, Theme, CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as React from 'react';
import { useMutation } from 'react-query';
import { InterviewContext } from '../../contexts/InterviewContext';

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
		updateQuestion,
		question,
		startRecord,
		stopRecord,
		isRecording,
	} = React.useContext(InterviewContext);
	const classes = useStyles();
	const { mutate, isLoading } = useMutation(
		async () => {
			const res = await axios({
				method: 'post',
				url: '/api/interview/getquestion',
				data: {
					category: localStorage.getItem('interviewType'),
				},
			});
			return res.data;
		},
		{
			onSuccess: async (data: { question: string; questionid: string }) => {
				if (updateQuestion) updateQuestion(data.question, data.questionid);
				if (startRecord) {
					await startRecord();
				}
			},
		}
	);

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
					{question && (
						<Typography
							style={{ fontWeight: 'bold' }}
							variant='h4'
							className={classes.subheading}>
							{question}
						</Typography>
					)}
					<Typography
						style={{
							fontWeight: 'bold',
							color: 'red',
							textAlign: 'center',
							marginBottom: 20,
						}}>
						Please do not refresh your page
					</Typography>

					<Box textAlign='center' mb={5}>
						{!isRecording && (
							<>
								<Box display='flex' alignItems='center' justifyContent='center'>
									<Button
										startIcon={
											isLoading ? <CircularProgress size='1rem' /> : null
										}
										onClick={async () => {
											await mutate();
										}}
										variant='contained'
										color='primary'>
										Start Interview
									</Button>
								</Box>
							</>
						)}
						{isRecording && (
							<Box display='flex' alignItems='center' justifyContent='center'>
								<Typography
									style={{
										fontWeight: 'bold',
										color: 'red',
										textAlign: 'center',
									}}>
									Recording...
								</Typography>
								<Button
									onClick={async () => {
										if (stopRecord) stopRecord();
									}}
									variant='contained'
									color='primary'>
									End Interview
								</Button>
							</Box>
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

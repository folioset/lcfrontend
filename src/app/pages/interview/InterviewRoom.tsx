import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CheckIcon from '@material-ui/icons/Check';
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
		userVideoRef,
		updateQuestion,
		question,
		startRecord,
		stopRecord,
		microphoneDevices,
		isRecording,
		microphoneDevice,
		setMicrophoneDevice,
		switchedTab,
		permission,
	} = React.useContext(InterviewContext);

	const classes = useStyles();
	const { mutate, isLoading } = useMutation(
		async () => {
			const res = await axios({
				method: 'post',
				url: '/api/interview/getquestion',
				data: {
					category: localStorage.getItem('fieldInterest'),
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
			<Modal
				open={switchedTab!}
				onClose={() => {}}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<Paper
					style={{
						padding: 20,
						position: 'absolute',
						top: 100,
						left: '50%',
						transform: 'translateX(-50%)',
					}}>
					<Typography>
						You have switched tabs, you will be Redirected
					</Typography>
				</Paper>
			</Modal>

			<Box className={classes.box}>
				<Container>
					<Typography variant='h3' className={classes.heading}>
						Answer a question in a timed interview-like format
					</Typography>
					<Typography variant='h4' className={classes.subheading}>
						Your screen and Video will be recorded while interview is in
						progress
					</Typography>
					{isRecording && question && (
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

					<Box mb={5}>
						<Box textAlign='center' mb={3}>
							<Typography variant='h5'>Audio Settings</Typography>
						</Box>
						{microphoneDevice && (
							<Box display='flex' style={{ gap: '2rem' }}>
								<FormControl fullWidth variant='filled'>
									<InputLabel id='Audio'>{microphoneDevice.label}</InputLabel>
									<Select
										value={microphoneDevice.deviceId}
										label='Audio'
										labelId='demo-simple-select-filled-label'
										id='demo-simple-select-filled'>
										{microphoneDevices.map((device: any, i: any) => {
											return (
												<ListItem
													onClick={() => setMicrophoneDevice(device)}
													button
													key={i}>
													<ListItemText>{device.label}</ListItemText>
													{device.deviceId === microphoneDevice.deviceId && (
														<ListItemIcon>
															<CheckIcon />
														</ListItemIcon>
													)}
												</ListItem>
											);
										})}
									</Select>
								</FormControl>
							</Box>
						)}
					</Box>

					<Box textAlign='center' mb={5}>
						{!isRecording && (
							<>
								<Box display='flex' alignItems='center' justifyContent='center'>
									<Button
										startIcon={
											isLoading ? <CircularProgress size='1rem' /> : null
										}
										onClick={async () => {
											if (!permission) {
												alert('grant webcam and microphone');
											} else {
												mutate();
											}
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
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default InterviewRoom;

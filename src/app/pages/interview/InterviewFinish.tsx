import {
	Box,
	Button,
	CircularProgress,
	Container,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { InterviewContext } from '../../contexts/InterviewContext';

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
	const history = useHistory();
	const classes = useStyles();
	const { file, fileUrl, questionId } = React.useContext(InterviewContext);

	const { mutate, isLoading } = useMutation(
		async (data) => {
			const res = await axios({
				url: '/api/interview/finish',
				method: 'post',
				data,
			});
			return res.data;
		},
		{
			onSuccess: (data: any) => {
				console.log(data);
				history.replace('/');
			},
		}
	);

	const handleInterviewSubmission = () => {
		const data = new FormData();
		data.append('file', file as any);
		data.append('questionid', questionId!);
		mutate(data as any);
	};

	return (
		<>
			<Container>
				<Typography variant='h3' className={classes.heading}>
					Your Interview
				</Typography>
				<Box className={classes.videoContainer}>
					<video className={classes.video} controls src={fileUrl} />
				</Box>
				<Box textAlign='center'>
					<Button
						startIcon={isLoading ? <CircularProgress size='1rem' /> : null}
						onClick={() => {
							handleInterviewSubmission();
						}}
						variant='contained'
						color='primary'>
						Finish Interview
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default InterviewFinish;

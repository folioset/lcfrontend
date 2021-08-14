import {
	Button,
    Box,
	CircularProgress,
	Container,
	makeStyles,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import {useState, useEffect} from 'react';
import FormInput from '../shared/FormInput';
import * as Yup from 'yup';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
// import FormSelect from '../../components/shared/FormSelect';
import { User } from '../../types';
import FormSelect from '../shared/FormSelect';
import InfiniteScroll from 'react-infinite-scroll-component';
// import InfiniteScroll from 'react-infinite-scroller';
import FeedProject from '../Project/FeedProjectCard';
import { ProjectFeed } from '../../types';
import ReactPlayer from 'react-player'

import RatingCard from '../shared/RatingCard';
import ReviewsSection from '../Reviews/ReviewsSection';

// types
import { Project } from '../../types';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2)
		},
		video: {
			// alignContent: 'center',
			// alignItems: 'center',
			// justifyContent: 'center',
			// textAlign: 'center'
		},
		ratings: {
			padding: theme.spacing(1)
		}
	};
});


interface InterviewCardProps {
	project: Project;
	isPublic?: boolean;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ project, isPublic }) => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const history = useHistory();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	const [num, setNum] = useState(1);
	const [mute, setMute] = useState(true);
	

	

	return ( 
		<Box>
            <Typography variant='h4' className={classes.heading}>{project.videoInterviewQuestion}</Typography>
			<ReactPlayer 
			url={project.videoFile}
			playing={true}
			controls={true}
			className={classes.video}
			height='600px'
			width='800px'
			/>
			<div className={classes.ratings} >
				{isPublic && <RatingCard {...{ project }} />}
			</div>
		</Box>
	);
};

export default InterviewCard;

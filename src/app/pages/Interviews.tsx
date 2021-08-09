import { Grid, makeStyles, Theme, Box, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import FeedProject from '../components/Project/FeedProjectCard';
import { ChallengeFeed } from '../types';
import Loader from '../components/shared/Loader';
import ChallengeCard from '../components/Challenge/ChallengeCard';
import SideBtnCard from '../components/User/SideBtnCard';
import InfiniteScroll from 'react-infinite-scroll-component';

import InterviewCard from '../Interviews/InterviewCard';

interface FeedProps { }

const useStyles = makeStyles((theme: Theme) => {
	return {
		container: {
			padding: theme.spacing(1),
		},
		heading: {
			color: theme.palette.grey['200'],
			textAlign: 'center',
			marginBottom: theme.spacing(4),
		},
		loading: {
			textAlign: 'center',
			display: 'block',
			color: theme.palette.grey['50'],
		},
		GridContr: {
			// borderWidth: '4px',
			// borderStyle: 'solid',
			// borderColor: 'green',
			minHeight: '100vh',
			maxWidth: 900,
			margin: 'auto',
			backgroundColor: '#f5f5f5',
			justifyContent: 'center'
		},
		check: {
			padding: theme.spacing(1),
		},
        card: {
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
			width: '95%',
			margin: 'auto',
		},
	};
});

const Interviews: React.FC<FeedProps> = () => {
	const classes = useStyles();
	const [num, setNum] = useState(1);

	const [items, setItems] = useState<Array<any>>([]);

    const { isLoading: isLoadingInterviews, data: interviews } = useQuery<ProjectType[]>(
		'interviews',
		async () => {
			try {
				const res = await axios.get(`/api/interview/${user._id}/interviews`);
				console.log(res.data, 'i am interviews');
				return res.data;
			} catch (err) {
				return err;
			}
		}
	);

    

	return (
		<>
			<Grid container className={classes.GridContr}>
				<Grid item xs={12} md={4} className={classes.check} >
					<SideBtnCard />
				</Grid>
				<Grid item xs={12} md={8}>
                    {interviews?.length ? (interviews.map((interview: Project) => {
								return (
									<Box className={classes.card}>
										<InterviewCard
											key={interview._id}
											{...{ interview }}
										/>
									</Box>
								);
							})) : (<Box textAlign='center'>
								<Typography color='primary' variant='h4'>No Projects Yet!!</Typography>
							</Box>)
				    }
				</Grid>
			</Grid>
		</>
	);
};

export default Interviews;

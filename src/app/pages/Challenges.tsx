import { Grid, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import FeedProject from '../components/Project/FeedProjectCard';
import { ChallengeFeed } from '../types';
import Loader from '../components/shared/Loader';
import ChallengeCard from '../components/Challenge/ChallengeCard';
import FeedChallenge from '../components/Challenge/FeedChallCard';

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
			maxWidth: 850,
			margin: 'auto',
			backgroundColor: '#f5f5f5',
			justifyContent: 'center'
		},
		check: {
			padding: theme.spacing(1),
		}
	};
});

const Feed: React.FC<FeedProps> = () => {
	const classes = useStyles();
	const { isLoading, data } = useQuery('feedChall', async () => {
		const res = await axios({
			method: 'get',
			url: '/api/question',
		});
		return res.data;
	});



	if (isLoading) {
		return <Loader fullScreen />;
	}

	return (
		<>
			<Grid container className={classes.GridContr}>
				<Grid item xs={12} md={8}>
					<Container maxWidth='sm' className={classes.container}>
						{data?.map((challenge: ChallengeFeed) => {
							return <FeedChallenge key={challenge._id} {...{ challenge }} />;
						})}
					</Container>
				</Grid>
			</Grid>
		</>
	);
};

export default Feed;

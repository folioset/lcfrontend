import { Grid, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ChallengeFeed } from '../types';
import ChallengeCard from '../components/Challenge/ChallengeCard';
import SideBtnCard from '../components/User/SideBtnCard';
import InfiniteScroll from 'react-infinite-scroll-component';

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
			minHeight: '100vh',
			maxWidth: 900,
			margin: 'auto',
			justifyContent: 'center'
		},
		check: {
			padding: theme.spacing(1),
		}
	};
});

const Feed: React.FC<FeedProps> = () => {
	const classes = useStyles();
	const [num, setNum] = useState(1);

	const [items, setItems] = useState<Array<any>>([]);


	//getting all questions
	const { isLoading, data, refetch } = useQuery('feedChall', async () => {
		const res = await axios({
			method: 'get',
			url: `/api/question/${num}`,
		});
		setItems(items => ([...items, ...res.data]));
		return res.data;
	});


	const { isLoading: isLoadingNumber , data: numberQuestions } = useQuery('numberQuestions', async () => {
		const res = await axios({
			method: 'get',
			url: '/api/numquestions',
		});
		return res.data;
	});

	useEffect(() => {
		refetch();
	}, [])

	useEffect(() => {
	}, [items]);

	useEffect(() => {
		refetch();
	}, [num]);

	return (
		<>
			<Grid container className={classes.GridContr}>
				<Grid item xs={12} md={3} className={classes.check} >
					<SideBtnCard />
				</Grid>
				<Grid item xs={12} md={9}>
					<InfiniteScroll
						dataLength={items.length}
						next={() => {
							setNum(num + 1)
						}}
						hasMore={num < (numberQuestions?.count/10) + 1}
						loader={<h4>Loading...</h4>}
						scrollThreshold={0.7}
					>
						<Container className={classes.container}>
							{items.map((challenge: ChallengeFeed) => {
								return <ChallengeCard key={challenge._id} challenge={challenge} isPublic />;
							})
							}
						</Container>
					</InfiniteScroll>
				</Grid>
			</Grid>
		</>
	);
};

export default Feed;

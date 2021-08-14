import { Grid, makeStyles, Theme } from '@material-ui/core';
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
import { ProjectFeed } from '../types';

interface InterviewsProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		container: {
			padding: theme.spacing(1),
			width: '815px',
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
			margin: 'auto',
			justifyContent: 'center',
		},
		check: {
			padding: theme.spacing(1),
		},
	};
});

const Interviews: React.FC<InterviewsProps> = () => {
	const classes = useStyles();
	const [num, setNum] = useState(1);
	const [items, setItems] = useState<Array<any>>([]);


    const { isLoading, data, refetch } = useQuery('interviews', async () => {
		const res = await axios({
			method: 'get',
			url: `/api/interview/feed/${num}`,
		});
		setItems(items => ([...items, ...res.data]));
		console.log(res.data);
		return res.data;
	});

	useEffect(() => {
		refetch();
	}, [])

	useEffect(() => {
		console.log(items, "i am in items");
	}, [items]);

    useEffect(() => {
		console.log(num, 'i am in useeffect');
        refetch();
      }, [num]);

	return (
		<>
			<Grid container className={classes.GridContr}>
				<Grid item xs={12} md={2} className={classes.check} >
					<SideBtnCard />
				</Grid>
				<Grid item xs={12} md={10}>
					<InfiniteScroll
						dataLength={items.length}
						next={() => {
							console.log(num, "i am in next");
							setNum(num+1)
						}}
						hasMore={true}
						loader={<h4>Loading...</h4>}
						scrollThreshold={0.7}
						>
						<Container className={classes.container}>
							{items.map((project: ProjectFeed) => {
								return <FeedProject key={project._id} {...{ project }} />;
							})
							}
						</Container>
					</InfiniteScroll>
				</Grid>
			</Grid>
		</>
	);
};

export default Interviews;

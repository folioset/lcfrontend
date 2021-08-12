import { Grid, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import FeedProject from '../components/Project/FeedProjectCard';
import { ProjectFeed } from '../types';
import Loader from '../components/shared/Loader';
import SideBtnCard from '../components/User/SideBtnCard';
import InfiniteScroll from 'react-infinite-scroll-component';

interface FeedProps { }

const useStyles = makeStyles((theme: Theme) => {
	return {
		container: {
			padding: theme.spacing(1),
			marginTop: 2,
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
			maxWidth: 900,
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
	const [num, setNum] = useState(1);
	const [items, setItems] = useState<Array<any>>([]);



	const { isLoading, data, refetch } = useQuery('feed', async () => {
		const res = await axios({
			method: 'get',
			url: `/api/feed/${num}`,
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
				<Grid item xs={12} md={4} className={classes.check} >
					<SideBtnCard />
				</Grid>
				<Grid item xs={12} md={8}>
					<InfiniteScroll
						dataLength={items.length}
						next={() => {
							console.log(num, "i am in next");
							setNum(num + 1)
						}}
						hasMore={true}
						loader={<h4>Loading...</h4>}
						scrollThreshold={0.7}
					>
						<Container maxWidth='sm' className={classes.container}>
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

export default Feed;

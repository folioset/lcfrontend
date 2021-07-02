import { makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import FeedProject from '../components/dashboard/Project/FeedProjectCard';
import { ProjectFeed } from '../types';

interface FeedProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		container: {
			padding: theme.spacing(3),
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
	};
});

const Feed: React.FC<FeedProps> = () => {
	const classes = useStyles();
	const { isLoading, data } = useQuery('feed', async () => {
		const res = await axios({
			method: 'get',
			url: '/api/feed',
		});
		return res.data;
	});

	return (
		<>
			<Container maxWidth='md' className={classes.container}>
				<Typography variant='h2' className={classes.heading}>
					My Feed
				</Typography>
				{isLoading && (
					<Typography className={classes.loading} variant='caption'>
						Loading Feed...
					</Typography>
				)}
				{data?.map((project: ProjectFeed) => {
					return <FeedProject {...{ project }} />;
				})}
			</Container>
		</>
	);
};

export default Feed;

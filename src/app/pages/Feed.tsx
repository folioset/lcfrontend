import { makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

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
		},
	};
});

const Feed: React.FC<FeedProps> = () => {
	const classes = useStyles();
	const { isLoading } = useQuery('feed', async () => {
		const res = await axios({
			method: 'get',
			url: '/api/feed',
		});
		return res.data;
	});

	return (
		<>
			<Container className={classes.container}>
				<Typography variant='h2' className={classes.heading}>
					My Feed
				</Typography>
				{isLoading && (
					<Typography className={classes.loading} variant='caption'>
						Loading Feed...
					</Typography>
				)}
			</Container>
		</>
	);
};

export default Feed;

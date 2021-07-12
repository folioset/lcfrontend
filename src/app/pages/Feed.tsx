import { Grid, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import FeedProject from '../components/Project/FeedProjectCard';
import { ProjectFeed } from '../types';
import Loader from '../components/shared/Loader';
import SideBtnCard from '../components/Project/SideBtnCard';

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
	const { isLoading, data } = useQuery('feed', async () => {
		const res = await axios({
			method: 'get',
			url: '/api/feed',
		});
		return res.data;
	});

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return (
		<>
			<Grid container className={classes.GridContr}>
				<Grid item xs={12} md={4} className={classes.check} >
					<SideBtnCard />
				</Grid>
				<Grid item xs={12} md={8}>
					<Container maxWidth='sm' className={classes.container}>
						{data?.map((project: ProjectFeed) => {
							return <FeedProject key={project._id} {...{ project }} />;
						})}
					</Container>
				</Grid>
			</Grid>
		</>
	);
};

export default Feed;

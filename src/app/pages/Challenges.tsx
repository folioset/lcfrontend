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
	// const [items, setItems] = useState<Array<any>>([{ "_id": "60f7d420ccd9631bf04f7202", "title": "Question Test", "description": "demo", "isCaseStudy": false, "createdBy": { "phone": { "phoneNumber": "", "code": "91" }, "isVerified": true, "interests": "Ed-tech", "_id": "60e56aa73374c14e18543252", "email": "gk886509@gmail.com", "name": "Gaurav Kumar", "username": "Gaurav Kumar", "projectsAdded": [{ "_id": "60f7d172cc8c913ae415b721" }, { "_id": "60f7ec27ccd9631bf04f7213" }, { "_id": "60f802016f134a1b7f260561" }], "createdAt": "2021-07-07T08:49:43.999Z", "updatedAt": "2021-07-21T11:16:17.597Z", "__v": 41, "about": "CS Student | React Developer | MERN", "hours": 2, "linkedinUrl": "www.linkedin.com/in/gauravkumar0130", "location": "", "profilePicture": "https://backend-sample-bucket.s3.ap-south-1.amazonaws.com/nl.jpg" }, "answers": [{ "_id": "60f7d43dccd9631bf04f7203" }, { "_id": "60f7d508ccd9631bf04f7206" }, { "_id": "60f7e599ccd9631bf04f7209" }, { "_id": "60f7e9a4ccd9631bf04f720c" }, { "_id": "60f7eb99ccd9631bf04f720f" }, { "_id": "60f7f43d98978e3660156a34" }], "createdAt": "2021-07-21T08:00:32.853Z", "updatedAt": "2021-07-21T10:17:34.106Z", "__v": 6 }]);


	const [items, setItems] = useState<Array<any>>([]);


	//getting all answers
	const { isLoading, data, refetch } = useQuery('feedChall', async () => {
		const res = await axios({
			method: 'get',
			url: `/api/question/${num}`,
		});
		setItems(items => ([...items, ...res.data]));
		console.log("challenges", res.data);
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

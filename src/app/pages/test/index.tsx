import {
	Button,
	CircularProgress,
	Container,
	makeStyles,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as React from 'react';
import {useState, useEffect} from 'react';
import FormInput from '../../components/shared/FormInput';
import * as Yup from 'yup';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import useAuthRoute from '../../hooks/useAuthRoute';
// import FormSelect from '../../components/shared/FormSelect';
import { User } from '../../types';
import FormSelect from '../../components/shared/FormSelect';
import InfiniteScroll from 'react-infinite-scroll-component';
// import InfiniteScroll from 'react-infinite-scroller';
import FeedProject from '../../components/Project/FeedProjectCard';
import { ProjectFeed } from '../../types';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			marginBottom: theme.spacing(5),
			textAlign: 'center',
		},
	};
});

const validationSchema = Yup.object().shape({
	username: Yup.string().required('This field is required'),
	about: Yup.string().required('This field is required'),
	// hours: Yup.number().required('This field is required').positive(),
	interests: Yup.string().required('This field is required'),
});


const Test: React.FC = () => {
	const location = useLocation();
	useAuthRoute(location.pathname);
	const classes = useStyles();
	const history = useHistory();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');
	const [num, setNum] = useState(1);
	const [items, setItems] = useState<Array<any>>([{"reviews":[],"contributors":["60d8d75b4582e0c5acfc0a29","60d8b16eb6a31437d0c91793","60e68c456d41433e708bf07a"],"tools":["Adobe XD"],"skills":["Go to Market Strategy"],"fineRatings":0,"goodRatings":0,"excellentRatings":0,"extraOrdinaryRatings":0,"_id":"60ed80e1000cf4222030c25e","avgRating":0,"updatedVersion":false,"title":"sdfsdfsfd","description":"sdfsdfsdf","createdBy":"60e68c456d41433e708bf07a","projectFile":"https://backend-sample-bucket.s3.ap-south-1.amazonaws.com/dummy.pdf","ratings":[],"likes":[],"createdAt":"2021-07-13T12:02:41.059Z","updatedAt":"2021-07-13T12:02:41.113Z","__v":0,"lastUpdatedDate":"2021-07-13T12:02:41.059Z","numberOfRatings":0,"username":"GeekyBabbar","name":"Geeky Babbar","profilePicture":"https://backend-sample-bucket.s3.ap-south-1.amazonaws.com/circle-cropped.png","about":"Cs Student","contributorDetailsArr":[{"isVerified":true,"interests":"Ed-tech","_id":"60d8d75b4582e0c5acfc0a29","email":"abhishek.c.2435@gmail.com","name":"Abhishek Chatterjee","username":"AbhishekChatterjee","projectsAdded":[{"_id":"60ddc063041d9012b4213cff"},{"_id":"60ddc6fedbb66413d29eda83"},{"_id":"60df6a3c44804340f27fd275"},{"_id":"60e00cc605497c55a81d6701"},{"_id":"60e0155d285497571ff77bd9"},{"_id":"60e70d53449ed75c0fa5d392"},{"_id":"60ed80e1000cf4222030c25e"},{"_id":"60eea5c64f6b232680424de8"}],"createdAt":"2021-06-27T19:54:03.082Z","updatedAt":"2021-07-14T08:52:22.892Z","__v":8,"about":"tyreghf","hours":5},{"isVerified":true,"interests":"Health-tech","_id":"60d8b16eb6a31437d0c91793","email":"f20171079@hyderabad.bits-pilani.ac.in","name":"GEETANSH HANS","username":"GEETANSH HANS","projectsAdded":[{"_id":"60d8b35c9d01244e508f4a7d"},{"_id":"60d8b52ca263174710948886"},{"_id":"60e005ea2d15e74f2ca38814"},{"_id":"60e82678ade7b300f4e84358"},{"_id":"60ed80e1000cf4222030c25e"}],"createdAt":"2021-06-27T17:12:14.194Z","updatedAt":"2021-07-13T12:02:41.365Z","__v":5,"about":"Blah blah","hours":23},{"phone":{"phoneNumber":"","code":"91"},"isVerified":true,"interests":"Fin-tech","_id":"60e68c456d41433e708bf07a","email":"geekybabbar@gmail.com","name":"Geeky Babbar","username":"GeekyBabbar","projectsAdded":[{"_id":"60e6a4236d41433e708bf07b"},{"_id":"60e82678ade7b300f4e84358"},{"_id":"60ed11a4975c9f218cadb871"},{"_id":"60ed80e1000cf4222030c25e"},{"_id":"60ed8529000cf4222030c265"}],"createdAt":"2021-07-08T05:25:25.784Z","updatedAt":"2021-07-13T12:20:58.017Z","__v":5,"about":"Cs Student","hours":2,"linkedinUrl":"","location":"","profilePicture":"https://backend-sample-bucket.s3.ap-south-1.amazonaws.com/circle-cropped.png"}]}]);



    const { isLoading, data, refetch } = useQuery('feed', async () => {
		const res = await axios({
			method: 'get',
			url: `/api/feed/${num}`,
		});
		// setItems(items.concat(data));
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

    // const fetchMoreData = async () => {
    //     // a fake async api call like which sends
    //     // 20 more records in 1.5 secs
    //     // setTimeout(() => {
    //     //   this.setState({
    //     //     items: this.state.items.concat(Array.from({ length: 20 }))
    //     //   });
    //     // }, 1500);
    //     setNum(num + 1);
    //     await refetch();
    //   };

	return (
		<>
		<Typography>Testing 1 2 3..</Typography>
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
          <Container>
			
			{items.map((project: ProjectFeed) => {
				return <FeedProject key={project._id} {...{ project }} />;
			})
			
			}
        </Container>
        </InfiniteScroll>
		{/* <InfiniteScroll
			pageStart={0}
			loadMore={fetchMoreData}
			hasMore={true}
			loader={<h4>Loading...</h4>}
			threshold={400}
		>
			<Container>
            {data?.map((project: ProjectFeed) => {
				return <FeedProject key={project._id} {...{ project }} />;
			})}
        	</Container>
		</InfiniteScroll> */}
        {/* <Button onClick={fetchMoreData}>See more</Button>
        <Container>
            {data?.map((project: ProjectFeed) => {
				return <FeedProject key={project._id} {...{ project }} />;
			})}
        </Container> */}
		</>
	);
};

export default Test;

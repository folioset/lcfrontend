import * as React from 'react';
import * as Yup from 'yup';

// Material ui

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {
    CardActions,
    Collapse,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Link,
    CardContent,
    Button,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Box from '@material-ui/core/Box';

// types
import { Challenge, Answer, User, Review } from '../../types';
import Avatar from '../shared/Avatar';
import { Form, Formik } from 'formik';
import FormInput from '../shared/FormInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import useDisclosure from '../../hooks/useDisclosure';
import AnswerCard from '../Answers/AnswersCard';
import AnswersCard from '../Answers/AnswersCard';
import RatingCard from '../shared/RatingCard';
import ReviewsSection from '../Reviews/ReviewsSection';

interface AnswersSectionProps {
    answer: Answer;
    challenge: Challenge;
    isPublic?: boolean;
}

const validationSchema = Yup.object().shape({
    review: Yup.string()
        .required('This is a required field')
        .max(200, 'Too Long! Review can only have a maximum of 100 characters'),
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(1),
            backgroundColor: theme.palette.grey['100'],
            borderRadius: 15
        },
        avatar: {
            backgroundColor: theme.palette.primary.main,
        },
        content: {
            marginTop: theme.spacing(3),
        },
        comment: {
            '& fieldset': {
                borderRadius: 30,
            },
        },
        replyForm: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        likeIcon: {
            color: theme.palette.error.light,
        },
        countBox: {
            marginLeft: 10,
            paddingLeft: 10,
            borderLeft: '1px solid',
            borderLeftColor: theme.palette.divider,
        },
        cardActions: {
            flexDirection: 'column',
        },
        cardContent: {
            borderBottomColor: theme.palette.divider,
            paddingBottom: theme.spacing(4),
        },
    })
);

const AnswerSection: React.FC<AnswersSectionProps> = ({ answer, challenge }) => {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const [liked, setLiked] = React.useState(false);
    const [numlikes, setNumLikes] = React.useState(0);
    const { isOpen, toggleOpen, onOpen } = useDisclosure();
    const user = queryClient.getQueryData<User>('user');
    const [num, setNum] = React.useState(1);


    //get complete answer by ID
    const { isLoading: isAnswerLoading, data: answersData } = useQuery(
        ['all-answer', answer._id],
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/question/${challenge._id}/${answer._id}/complete`,
            });
            return res.data;
        }
    );


    React.useEffect(() => {
        console.log(num, 'this is num in 2nd use');
        refetchReviews();
    }, [num])

    // Get all Project Reviews
    const { isLoading, data: reviews, refetch: refetchReviews } = useQuery(
        ['project-reviews', answer._id, num],
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/project/${answer._id}/reviews/${num}`,
            });
            return res.data;
        }
    );

    // console.log("reviewssss", reviews);
    // console.log("answer yaha h", answersData?.reviews.length);

    const handleMoreReviews = () => {
        setNum(num + 5);
    }

    // const handlePreviousReviews = () => {
    //     setNum(num - 1);
    // }


    return (
        <>

            <Card elevation={0} className={classes.root}>
                <AnswersCard answersData={answersData} challenge={challenge} isPublic answer={answer} />

                {/* feedback */}
                <CardActions className={classes.cardActions}>
                    <RatingCard project={answersData} />
                </CardActions>
            </Card>
            <Card elevation={0}>
                <CardContent className={classes.cardContent}>
                    {/* {num > 1 && <Button onClick={handlePreviousReviews} style={{ textTransform: 'none' }}>
                        Previous reviews
                    </Button>} */}
                    {isLoading && (
                        <Typography color='primary' variant='caption'>
                            Loading reviews
                        </Typography>
                    )}
                    {reviews?.length > 0 && (
                        <>
                            <Box>
                                {reviews?.map((review: Review) => {
                                    return (
                                        <ReviewsSection
                                            key={review.reviewDetails!._id}
                                            review={review} project={answersData}
                                        />
                                    );
                                })}
                            </Box>

                            {reviews?.length !== answersData?.reviews.length ? (<Button onClick={handleMoreReviews} style={{ textTransform: 'none', marginBottom: -20 }}>
                                Load more reviews
                            </Button>) : null}
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default AnswerSection;

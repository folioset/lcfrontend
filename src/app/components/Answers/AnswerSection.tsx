import * as React from 'react';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';

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

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

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
        avatar: {
            backgroundColor: theme.palette.primary.main,
        },
        content: {
            marginTop: theme.spacing(1),
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
        },
        active: {
			color: theme.palette.primary.main,
			textTransform: 'none',
			fontWeight: 550,
			fontSize: 13,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
			paddingLeft: 10,
			// borderLeft: '0.1px solid',
			// borderLeftColor: theme.palette.divider,
		},
		inactive: {
			color: theme.palette.secondary.main,
			textTransform: 'none',
			fontSize: 13,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
			paddingLeft: 10,
			// borderLeft: '0.1px solid',
			// borderLeftColor: theme.palette.divider,
		},
        ratingButton: {
            marginTop: 1.5, 
            fontWeight: 550, 
            fontSize: 14
        },
        ratings: {

        },
        display: {
            color: theme.palette.secondary.main,
			textTransform: 'none',
			fontSize: 13,
            fontWeight: 550,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
			paddingLeft: 10,
			borderLeft: '1px solid',
			borderLeftColor: theme.palette.divider,
        },
        submitButton: {
			marginTop: 10,
			marginLeft: 2,
			textTransform: 'none',
			width: '30px',
			height: '30px',
			backgroundColor: theme.palette.primary.main,
			color: 'black',
			borderRadius: 15
		},
    })
);


const AnswerSection: React.FC<AnswersSectionProps> = ({ answer, challenge }) => {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const [liked, setLiked] = React.useState(false);
    const [ratings, setRatings] = React.useState(0);
    const user = queryClient.getQueryData<User>('user');
    const [num, setNum] = React.useState(1);
    const [rating, setRating] = useState('');
    const [typing, setTyping] = useState(false);
    const { isOpen, toggleOpen, onOpen } = useDisclosure();

    //get complete answer by ID
    const { isLoading: isAnswerLoading, data: project } = useQuery(
        ['all-answer', answer._id],
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/question/${challenge._id}/${answer._id}/complete`,
            });
            setRatings(res.data.goodRatings+res.data.excellentRatings+res.data.extraOrdinaryRatings);
            return res.data;
        }
    );

    	// Update Rating
	const { mutate: addRating } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'PUT',
				url: `/api/project/${project._id}/add-rating`,
				data,
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

    //  Add Review
	const { mutate: addReview } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'POST',
				url: `/api/project/${project._id}/reviews/`,
				data,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['project-reviews', project._id]);
			},
		}
	);

    const handleMoreReviews = () => {
        setNum(num + 5);
    }

    const showRating = (value: any) => {
		setRating(value)
		addRating({ value: value } as any)
	}

    return (
        <>

            <Card elevation={0}>
                <AnswersCard answersData={project} challenge={challenge} isPublic answer={answer} />
                <Box style={{ display: 'flex', alignItems: 'center', paddingBottom: 20}}>
					<Link onClick={() => showRating('good')}
                    style={{paddingLeft: 0}}
                    className={rating === 'good' ? classes.active : classes.inactive}>
						{rating === 'good' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
                    </Link>
                    <Link onClick={() => showRating('excellent')}
                    className={rating === 'excellent' ? classes.active : classes.inactive}>
						{rating === 'excellent' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
						{rating === 'excellent' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
					</Link>
					<Link onClick={() => showRating('extraordinary')}
					className={rating === 'extraordinary' ? classes.active : classes.inactive}>
						{rating === 'extraordinary' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
						{rating === 'extraordinary' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
						{rating === 'extraordinary' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
                    </Link>
                    {/* {!isAnswerLoading && <Link className={classes.display}>
                        {ratings} ratings
                    </Link>} */}
                    <Link
						onClick={toggleOpen}
                        className={classes.display}
					>
						{reviews?.length || 0} Replies
					</Link>
                </Box>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                <Box>
                    <Formik
					initialValues={{
						review: ``,
					}}
					validateOnBlur={false}
					onSubmit={async ({ review }, { resetForm }) => {
						const data = {
							review,
							category: 'feedback',
						};
						await addReview(data as any);
						resetForm();
					}}
				>
					{({ values }) => {
						return (
							<>
								<Form
									autoComplete='off'
									style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginLeft: 15 }}>
									<FormInput
										multiline
										name='review'
										className={classes.comment}
										fullWidth
										placeholder={`Share your feedback...`}
										variant='outlined'
										size='small'
										onFocus={() => setTyping(true)}
									/>
									{typing && <Button type='submit' color='primary' className={classes.submitButton}>Post</Button>}
								</Form>
							</>
						);
					}}
				</Formik>
				</Box>
                <CardContent className={classes.cardContent}>
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
                                            review={review} project={project}
                                        />
                                    );
                                })}
                            </Box>

                            {reviews?.length !== project?.reviews.length ? (<Button onClick={handleMoreReviews} style={{ textTransform: 'none', marginBottom: -20 }}>
                                Load more reviews
                            </Button>) : (<Box style={{ textTransform: 'none', marginBottom: -20 }}>
                            </Box>)}
                        </>
                    )}
                </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

export default AnswerSection;

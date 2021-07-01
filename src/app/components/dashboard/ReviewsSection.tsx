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
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MessageIcon from '@material-ui/icons/Message';
import Box from '@material-ui/core/Box';

// types
import { Project, Review, User } from '../../types';
import Avatar from '../shared/Avatar';
import { Form, Formik } from 'formik';
import FormInput from '../shared/FormInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import useDisclosure from '../../hooks/useDisclosure';
import ReviewCard from './ReviewCard';

interface ReviewsSectionProps {
	review: Review;
	project: Project;
}

const validationSchema = Yup.object().shape({
	review: Yup.string()
		.required('This is a required field')
		.max(200, 'Too Long! Review can only have a maximum of 100 characters'),
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: theme.spacing(3),
			backgroundColor: theme.palette.grey['100'],
		},
		avatar: {
			backgroundColor: theme.palette.primary.main,
		},
		content: {
			marginTop: theme.spacing(3),
		},
		comment: {
			'& fieldset': {
				borderRadius: 500,
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
	})
);

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ review, project }) => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const [liked, setLiked] = React.useState(false);
	const [numlikes, setNumLikes] = React.useState(0);
	const { isOpen, toggleOpen, onOpen } = useDisclosure();
	const user = queryClient.getQueryData<User>('user');

	const { mutate: addReply } = useMutation(
		async (data: any) => {
			const res = await axios({
				method: 'POST',
				url: `/api/project/${project._id}/reviews/${review.reviewDetails._id}/replies`,
				data,
			});
			return res.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries([
					'project-review-replies',
					project._id,
					review.reviewDetails._id,
				]);
				await queryClient.invalidateQueries(['project-reviews', project._id]);
				onOpen();
			},
		}
	);

	const { isLoading: repliesLoading, data: replies } = useQuery(
		['project-review-replies', project._id, review.reviewDetails._id],
		async () => {
			const res = await axios({
				method: 'GET',
				url: `/api/project/${project._id}/reviews/${review.reviewDetails._id}/replies`,
			});
			return res.data;
		}
	);

	const { mutate: handleLike } = useMutation(
		async () => {
			const res = await axios({
				method: 'post',
				url: `/api/project/${project._id}/reviews/${review.reviewDetails._id}/toggle-like`,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				setNumLikes(numlikes + (liked ? -1 : 1));
				setLiked(!liked);
			},
		}
	);

	React.useEffect(() => {
		review.reviewDetails.likes?.forEach((like) => {
			if (like.createdBy === user!._id) {
				setLiked(true);
			} else {
				setLiked(false);
			}

			setNumLikes(review.reviewDetails.likes?.length || 0);
		});
	}, [user, review]);

	return (
		<>
			<Card elevation={0} className={classes.root}>
				<ReviewCard {...{ review, project }} />

				<CardActions>
					<Formik
						initialValues={{
							review: '',
						}}
						validateOnBlur={false}
						validationSchema={validationSchema}
						onSubmit={async ({ review }, { resetForm }) => {
							const data = {
								review,
								category: 'reply',
							};
							await addReply(data as any);
							resetForm();
						}}>
						<>
							<Form autoComplete='off' className={classes.replyForm}>
								<Avatar
									style={{ marginRight: 10 }}
									src={user?.profilePicture}
								/>
								<FormInput
									name='review'
									className={classes.comment}
									fullWidth
									placeholder={`Reply to this ${review.reviewDetails.category}`}
									variant='outlined'
									size='small'
								/>
								<IconButton type='submit' color='primary'>
									<SendIcon />
								</IconButton>
							</Form>
						</>
					</Formik>
					<Box textAlign='center'>
						<IconButton
							className={classes.likeIcon}
							onClick={() => handleLike()}>
							{liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
						</IconButton>
						<Typography variant='caption'>{numlikes}</Typography>
					</Box>

					<Box textAlign='center'>
						<IconButton onClick={toggleOpen} color='primary'>
							<MessageIcon />
						</IconButton>
						<Typography variant='caption'>
							{review.reviewDetails.replies?.length || 0}
						</Typography>
					</Box>
				</CardActions>
				<Collapse in={isOpen} timeout='auto' unmountOnExit>
					{repliesLoading && <Typography>Loading....</Typography>}

					{replies?.map((reply: any) => {
						return <ReviewCard review={reply} />;
					})}
				</Collapse>
			</Card>
		</>
	);
};

export default ReviewsSection;

import * as React from 'react';
import { format } from 'date-fns';
import * as Yup from 'yup';

// Material ui

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
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
import MessageIcon from '@material-ui/icons/Message';
import Box from '@material-ui/core/Box';

// types
import { Project, Review } from '../../types';
import Avatar from '../shared/Avatar';
import { Form, Formik } from 'formik';
import FormInput from '../shared/FormInput';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import useDisclosure from '../../hooks/useDisclosure';
import theme from '../../theme';

interface ReviewCardProps {
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
	})
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review, project }) => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const [type, setType] = React.useState<'comment' | 'suggestion'>('comment');
	const { isOpen, toggleOpen } = useDisclosure();

	const { mutate: addReview } = useMutation(
		async (data: any) => {
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

	return (
		<>
			<Card elevation={0} className={classes.root}>
				<CardHeader
					action={
						<Typography
							style={{ paddingRight: 3 }}
							color='textSecondary'
							variant='caption'>
							{format(new Date(review.reviewDetails.updatedAt), 'dd MMMM yyyy')}
						</Typography>
					}
					style={{ marginBottom: -20 }}
					avatar={
						<Avatar className={classes.avatar} src={review.profilePicture}>
							{review.name}
						</Avatar>
					}
					title={<Typography variant='body1'>{review.name}</Typography>}
					subheader={
						<>
							<Typography color='textSecondary' variant='caption'>
								{review.about}
							</Typography>
						</>
					}
				/>
				<CardContent className={classes.content}>
					{review.reviewDetails.review}
				</CardContent>
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
								category: type,
							};
							await addReview(data as any);
							resetForm();
						}}>
						<>
							<Form autoComplete='off' className={classes.replyForm}>
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
						<IconButton style={{ color: theme.palette.error.light }}>
							<FavoriteIcon />
						</IconButton>
						<Typography variant='caption'>12</Typography>
					</Box>

					<Box textAlign='center'>
						<IconButton onClick={toggleOpen} color='primary'>
							<MessageIcon />
						</IconButton>
						<Typography variant='caption'>2</Typography>
					</Box>
				</CardActions>
				<Collapse in={isOpen} timeout='auto' unmountOnExit>
					<CardContent>
						<Card elevation={0} className={classes.root}>
							<CardHeader
								action={
									<Typography
										style={{ paddingRight: 3 }}
										color='textSecondary'
										variant='caption'>
										{format(
											new Date(review.reviewDetails.updatedAt),
											'dd MMMM yyyy'
										)}
									</Typography>
								}
								style={{ marginBottom: -20 }}
								avatar={
									<Avatar
										className={classes.avatar}
										src={review.profilePicture}>
										{review.name}
									</Avatar>
								}
								title={<Typography variant='body1'>{review.name}</Typography>}
								subheader={
									<>
										<Typography color='textSecondary' variant='caption'>
											{review.about}
										</Typography>
									</>
								}
							/>
							<CardContent className={classes.content}>
								{review.reviewDetails.review}
							</CardContent>
						</Card>
					</CardContent>
				</Collapse>
			</Card>
		</>
	);
};

export default ReviewCard;

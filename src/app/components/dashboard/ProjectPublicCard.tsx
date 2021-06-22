import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
	IconButton,
	Box,
	Grid,
	makeStyles,
	Theme,
	Button,
	Collapse,
	Modal,
} from '@material-ui/core';
import Rating from '../shared/Rating';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { Project, Review, User } from '../../types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PictureAsPdf } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import ReviewCard from './ReviewCard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useDisclosure from '../../hooks/useDisclosure';
import clsx from 'clsx';
import axios from 'axios';
import PdfViewer from '../shared/Pdf/PdfViewer';
import FormInput from '../shared/FormInput';

const validationSchema = Yup.object().shape({
	review: Yup.string()
		.min(10, 'Too Short! You should atleast have 10 characters')
		.max(100, 'Too Long! Review can only have a maximum of 100 characters'),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		comment: {
			'& .MuiInputBase-input': {
				borderRadius: '100px',
			},
		},
		cardActions: {
			flexDirection: 'column',
		},
		cardCommentBox: {
			marginBottom: theme.spacing(2),
		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
	};
});

interface ProjectPublicCardProps {
	project: Project;
	isPublic?: boolean;
}

const ProjectPublicCard: React.FC<ProjectPublicCardProps> = ({
	project,
	isPublic,
}) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const [rating, setRating] = React.useState(0);
	const classes = useStyles();
	const { isOpen, toggleOpen } = useDisclosure();
	const [type, setType] = React.useState<'comment' | 'suggestion'>('comment');

	// Modal Toggle
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();

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

	React.useEffect(() => {
		if (project) {
			project.ratings.forEach((el: any) => {
				if (el.createdBy === user._id) {
					setRating(el.value);
				}
			});
		}
	}, [project, user._id]);

	const { isLoading, data } = useQuery(
		['project-reviews', project._id],
		async () => {
			try {
				const res = await axios({
					method: 'get',
					url: `/api/project/${project._id}/reviews`,
				});

				return res.data;
			} catch (err) {
				return err;
			}
		}
	);

	const { mutate: addRating } = useMutation(async (data) => {
		const res = await axios({
			method: 'PUT',
			url: `/api/project/${project._id}/add-rating`,
			data,
		});
		return res.data;
	});

	return (
		<>
			<Modal
				open={isModalOpen}
				onClose={onModalClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<PdfViewer filename={project.projectFile} />
			</Modal>
			<Card style={{ marginBottom: 30, paddingLeft: 5, paddingRight: 5 }}>
				<CardHeader
					title={project.title}
					subheader={`${new Date(
						project.createdAt
					).toLocaleString()}`}
					style={{marginBottom: -30}}
				/>
				<CardContent>
					<Grid container direction="row">
						<Grid item xs={9} style={{display: 'flex', alignItems: 'center'}}>
						{project.description && (
								<Typography>{project.description}</Typography>
						)}
						</Grid>
						<Grid item xs={3}>
									<IconButton color='primary' onClick={onModalOpen}>
										<Box mr={2}>
											<PictureAsPdf />
										</Box>
										<Typography variant='caption'>
											{project.projectFile.split('.com/')[1]}
										</Typography>
									</IconButton>
						</Grid>
					</Grid>
					{isPublic && (
						<Grid container>
							<Grid item xs={2} style={{display: 'flex', alignItems: 'center'}}>
							    <Typography color='primary' variant='h4'>4.5</Typography>
							</Grid>
							<Grid item xs={10} style={{display: 'flex', alignItems: 'center'}}>
								<Box>
									<Box
										style={{ width: 240 }}
										display='flex'
										alignItems='center'
										justifyContent='space-between'>
										<Typography variant='caption' component='legend'>
											Your Rating
										</Typography>
										<Typography color='primary'>
											{rating.toFixed(1)} / 10
										</Typography>
									</Box>
									<Rating
										value={rating}
										onChange={(e: any) => {
											let newRating = parseFloat(e.target.value);
											if (rating === newRating) newRating = 0;
											setRating(newRating);
											addRating({ value: newRating } as any);
										}}
										max={10}
										name={`project-${project._id}-rating`}
									/>
								</Box>
							</Grid>
							
						</Grid>
					)}
				</CardContent>
				<CardActions className={classes.cardActions}>
					{isPublic && (
						<Grid container className={classes.cardCommentBox}>
							<Grid container item xs={1} justify='center'>
								<Avatar aria-label={user.name} src={user.profilePicture} />
							</Grid>
							<Grid item xs={11}>
								<Formik
									initialValues={{
										review: '',
										category: type,
									}}
									validationSchema={validationSchema}
									onSubmit={async ({ review, category }, { resetForm }) => {
										const data = {
											review,
											category,
										};
										console.log({ data });
										await addReview(data as any);
										resetForm();
									}}>
									<>
										<Form style={{ display: 'flex' }}>
											<FormInput
												name='review'
												className={classes.comment}
												fullWidth
												placeholder={`Add a ${type}...`}
												variant='outlined'
												size='small'
											/>
											<IconButton type='submit' color='primary'>
												<SendIcon />
											</IconButton>
										</Form>
										<Button
											onClick={() => {
												setType(type === 'comment' ? 'suggestion' : 'comment');
											}}
											color='primary'
											size='small'>
											This is a {type}
										</Button>
									</>
								</Formik>
							</Grid>
						</Grid>
					)}

					<Grid container>
						<Grid item>
							<Button
								onClick={toggleOpen}
								color='primary'
								size='small'
								endIcon={
									<ExpandMoreIcon
										className={clsx(classes.expand, {
											[classes.expandOpen]: isOpen,
										})}
									/>
								}>
								All Reviews
							</Button>
						</Grid>
					</Grid>
				</CardActions>
				<Collapse in={isOpen} timeout='auto' unmountOnExit>
					<CardContent>
						{isLoading && (
							<Typography color='primary' variant='caption'>
								Loading reviews
							</Typography>
						)}
						{data?.map((review: Review) => {
							return <ReviewCard key={review._id} {...{ review }} />;
						})}
						{!isLoading && !data?.length && (
							<Typography color='primary'>No reviews yet</Typography>
						)}
					</CardContent>
				</Collapse>
			</Card>
		</>
	);
};

export default ProjectPublicCard;

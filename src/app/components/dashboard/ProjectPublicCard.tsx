import {
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
	Tooltip,
	Paper,
	CircularProgress,
} from '@material-ui/core';
import Rating from '../shared/Rating';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { Project, Review, User } from '../../types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SendIcon from '@material-ui/icons/Send';
import ReviewCard from './ReviewCard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useDisclosure from '../../hooks/useDisclosure';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
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
			'& fieldset': {
				borderRadius: 500,
			},
		},
		cardActions: {
			flexDirection: 'column',
		},
		cardCommentBox: {
			marginBottom: theme.spacing(1),
			marginLeft: theme.spacing(1),
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
		secondColumn: {
			paddingLeft: theme.spacing(4),
		},
		rating: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: theme.spacing(2),
		},
		deleteConfirm: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: `translate(-50%, -50%)`,
			padding: theme.spacing(3),

			[theme.breakpoints.down('sm')]: {
				width: '55%',
			},

			[theme.breakpoints.down('xs')]: {
				width: '90%',
			},
		},
		deleteConfirmBtns: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: theme.spacing(2),

			'& button': {
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
			},
		},
		pdf: {
			height: '100vh',
			width: '70vw',
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
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
	const { isOpen, toggleOpen, onOpen } = useDisclosure();
	const [type, setType] = React.useState<'comment' | 'suggestion'>('comment');

	// Modal Toggle
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();

	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
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
				onOpen();
			},
		}
	);

	const { mutate: deleteProject, isLoading: isDeleting } = useMutation(
		async () => {
			const res = await axios({
				method: 'delete',
				url: `/api/project/${project._id}`,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('my-projects');
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

	const { mutate: addRating } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'PUT',
				url: `/api/project/${project._id}/add-rating`,
				data,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['projects', user._id]);
			},
		}
	);

	return (
		<>
			<Modal
				open={isDeleteOpen}
				onClose={onDeleteClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<Paper className={classes.deleteConfirm}>
					<Typography>
						Are you sure you want to delete this project ?
					</Typography>
					<Box className={classes.deleteConfirmBtns}>
						<Button
							disableElevation
							onClick={() => deleteProject()}
							variant='contained'
							color='primary'
							disabled={isDeleting}
							startIcon={
								isDeleting ? (
									<CircularProgress size='small' style={{ color: 'white' }} />
								) : (
									<DeleteIcon />
								)
							}>
							Yes
						</Button>
						<Button variant='outlined' onClick={onDeleteClose}>
							Cancel
						</Button>
					</Box>
				</Paper>
			</Modal>
			<Modal
				open={isModalOpen}
				onClose={onModalClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<PdfViewer className={classes.pdf} filename={project.projectFile} />
			</Modal>
			<Card style={{ marginBottom: 30, paddingLeft: 5, paddingRight: 5 }}>
				<CardHeader
					title={project.title}
					action={
						!isPublic ? (
							<>
								<IconButton>
									<EditIcon color='primary' />
								</IconButton>
								<IconButton onClick={onDeleteOpen}>
									<DeleteIcon style={{ color: 'red' }} />
								</IconButton>
							</>
						) : null
					}
				/>
				<CardContent>
					<Grid
						container
						direction='row'
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Grid
							item
							xs={3}
							style={{ display: 'flex', justifyContent: 'space-around' }}>
							<Typography color='primary' variant='h4'>
								{project.avgRating?.toFixed(2)}
							</Typography>
						</Grid>
						<Grid item xs={8} className={classes.secondColumn}>
							<Grid container direction='column' style={{ display: 'flex' }}>
								<Grid
									item
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: 5,
									}}>
									{project.description && (
										<Typography>{project.description}</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={1}>
							<Button
								variant='contained'
								size='small'
								color='primary'
								onClick={onModalOpen}>
								View
							</Button>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					{isPublic && (
						<Grid container className={classes.cardCommentBox}>
							<Grid item xs={3}>
								<Box
									style={{ width: 240 }}
									display='flex'
									alignItems='center'
									justifyContent='space-between'>
									<Typography variant='caption' component='legend'>
										Your Rating
									</Typography>
									<Typography variant='body2'>{rating.toFixed(1)}</Typography>
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
							</Grid>
							<Grid item xs={9} className={classes.secondColumn}>
								<Formik
									initialValues={{
										review: '',
									}}
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
										<Form style={{ display: 'flex', alignItems: 'center' }}>
											<FormInput
												name='review'
												className={classes.comment}
												fullWidth
												placeholder={`Add a ${type}...`}
												variant='outlined'
												size='small'
											/>
											<Tooltip
												title='This as a Suggestion for further Improvement'
												aria-label='Add project'>
												<IconButton
													onClick={() => {
														setType(
															type === 'comment' ? 'suggestion' : 'comment'
														);
													}}>
													{type === 'comment' ? (
														<EmojiObjectsIcon />
													) : (
														<EmojiObjectsIcon color='primary' />
													)}
												</IconButton>
											</Tooltip>
											<IconButton type='submit' color='primary'>
												<SendIcon />
											</IconButton>
										</Form>
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
							return (
								<ReviewCard key={review.reviewDetails._id} {...{ review }} />
							);
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

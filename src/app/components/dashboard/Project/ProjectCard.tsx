import * as React from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Material UI
import { makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

// components
import Rating from '../../shared/Rating';
import ReviewCard from '../ReviewCard';
import PdfViewer from '../../shared/Pdf/PdfViewer';
import FormInput from '../../shared/FormInput';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';

// types
import { Project, Review, User } from '../../../types';

// hooks
import useDisclosure from '../../../hooks/useDisclosure';

const validationSchema = Yup.object().shape({
	review: Yup.string()
		.required()
		.min(1, 'Too Short! You should atleast have 1 characters')
		.max(200, 'Too Long! Review can only have a maximum of 100 characters'),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		cardActions: {
			flexDirection: 'column',
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
		description: {
			paddingLeft: theme.spacing(4),
		},
		commentForm: {
			paddingLeft: theme.spacing(4),

			[theme.breakpoints.down('sm')]: {
				paddingLeft: 0,
			},
		},
		comment: {
			'& fieldset': {
				borderRadius: 500,
			},
		},
		cardCommentBox: {
			marginBottom: theme.spacing(1),
			marginLeft: theme.spacing(1),
		},
		rating: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: theme.spacing(2),
		},
		pdf: {
			height: '100vh',
			width: '70vw',
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',

			[theme.breakpoints.down('sm')]: {
				width: '80vw',
			},

			[theme.breakpoints.down('xs')]: {
				left: 0,
				transform: 'translateX(0)',
				width: '100vw',
			},
		},
		pdfCloseBtn: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			position: 'absolute',
			top: -3,
			right: 30,
			zIndex: 2000,
		},
		xsDescription: {
			marginTop: theme.spacing(4),
			textAlign: 'justify',
		},
		avgRating: {
			display: 'flex',
			justifyContent: 'space-around',

			[theme.breakpoints.down('xs')]: {
				justifyContent: 'flex-start',
			},
		},
	};
});

interface ProjectCardProps {
	project: Project;
	isPublic?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isPublic }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const [rating, setRating] = React.useState(0);
	const classes = useStyles();
	const { isOpen, toggleOpen, onOpen } = useDisclosure();
	const [type, setType] = React.useState<'comment' | 'suggestion'>('comment');

	// Project Modal Toggler
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();

	// Delete Confirm Toggler
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	// Update Project Toggler
	const {
		isOpen: isUpdateOpen,
		onOpen: onUpdateOpen,
		onClose: onUpdateClose,
	} = useDisclosure();

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
				onOpen();
			},
		}
	);

	// Set Default Project Rating
	React.useEffect(() => {
		if (project) {
			project.ratings.forEach((el: any) => {
				if (el.createdBy === user._id) {
					setRating(el.value);
				}
			});
		}
	}, [project, user._id]);

	// Get all Project Reviews
	const { isLoading, data } = useQuery(
		['project-reviews', project._id],
		async () => {
			const res = await axios({
				method: 'get',
				url: `/api/project/${project._id}/reviews`,
			});

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
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['projects', user._id]);
			},
		}
	);

	return (
		<>
			{/* Delete Project */}
			<Modal
				open={isDeleteOpen}
				onClose={onDeleteClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<DeleteProject onClose={onDeleteClose} project={project} />
			</Modal>
			{/* Update Project */}
			<Modal
				open={isUpdateOpen}
				onClose={onUpdateClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<UpdateProject onClose={onUpdateClose} project={project} />
			</Modal>
			{/* Show Project File */}
			<Modal
				open={isModalOpen}
				onClose={onModalClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<>
					<Hidden only={['xl', 'lg', 'md', 'sm']}>
						<Box className={classes.pdfCloseBtn}>
							<IconButton onClick={onModalClose} color='inherit'>
								<CancelIcon />
							</IconButton>
						</Box>
					</Hidden>

					<PdfViewer className={classes.pdf} filename={project.projectFile} />
				</>
			</Modal>
			<Card style={{ marginBottom: 30, paddingLeft: 5, paddingRight: 5 }}>
				<CardHeader
					title={project.title}
					subheader={
						<Typography color='textSecondary' variant='caption'>
							{'Updated on ' +
								format(new Date(project.updatedAt!), 'MMMM dd yyyy')}
						</Typography>
					}
					action={
						!isPublic ? (
							<>
								<IconButton onClick={onUpdateOpen}>
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
						<Grid item xs={6} sm={2} className={classes.avgRating}>
							<Typography color='primary' variant='h4'>
								{project.avgRating?.toFixed(2)}
							</Typography>
						</Grid>
						<Hidden only={['xs']}>
							<Grid item sm={8} className={classes.description}>
								<Grid container direction='column' style={{ display: 'flex' }}>
									<Grid item>
										{project.description && (
											<Typography>{project.description}</Typography>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Hidden>
						<Grid container item xs={6} sm={2} justify='flex-end'>
							<Button
								variant='contained'
								size='small'
								color='primary'
								onClick={onModalOpen}>
								View
							</Button>
						</Grid>
					</Grid>
					<Hidden only={['xl', 'lg', 'sm', 'md']}>
						<Grid item xs={12} className={classes.xsDescription}>
							<Grid container direction='column' style={{ display: 'flex' }}>
								<Grid item>
									{project.description && (
										<Typography>{project.description}</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Hidden>
				</CardContent>
				<CardActions className={classes.cardActions}>
					{isPublic && (
						<Grid container className={classes.cardCommentBox}>
							<Grid item xs={3}>
								<Box
									style={{ width: 235 }}
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
							<Grid item md={9} xs={12} className={classes.commentForm}>
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

export default ProjectCard;

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
// import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
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
		.required('This is a required field')
		.max(200, 'Too Long! Review can only have a maximum of 100 characters'),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		card: {
			marginBottom: 30,
			paddingLeft: 5,
			paddingRight: 5,
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)'
		},
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
		cardContent: {
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderBottomColor: theme.palette.divider,
			paddingBottom: theme.spacing(4),
		},
		rating: {
			paddingLeft: theme.spacing(3.3),
		},
		comment: {
			'& fieldset': {
				borderRadius: 500,
			},
		},
		section: {
			padding: theme.spacing(0.5),
		},
		centered: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		centeredPadding: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			paddingLeft: theme.spacing(4),
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
			onSuccess: async () => {
				await queryClient.invalidateQueries(['projects', project.createdBy]);
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
			<Card className={classes.card}>
				<CardHeader
					title={project.title}
					subheader={
						<Typography color='textSecondary' variant='caption'>
							{'Updated on ' +
								format(new Date(project.updatedAt!), 'dd MMMM yyyy')}
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
				<CardContent className={classes.cardContent}>
					<Grid container direction='row' className={classes.centered}>
						<Grid
							container
							item
							sm={1}
							style={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								variant='contained'
								size='small'
								color='primary'
								onClick={onModalOpen}>
								View
							</Button>
						</Grid>
						<Grid item sm={11} className={classes.centeredPadding}>
							<Grid
								container
								direction='column'
								style={{ display: 'flex', justifyContent: 'center' }}>
								<Grid item>
									{project.description && (
										<Typography>{project.description}</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					{isPublic && (
						<Grid container direction='column' className={classes.section}>
							<Grid
								item
								container
								direction='row'
								className={classes.section}
								style={{ marginBottom: 5 }}
								spacing={1}>
								<Grid item sm={1} className={classes.avgRating}>
									<Typography variant='h4'>
										{project.avgRating?.toFixed(1)}
									</Typography>
								</Grid>
								<Grid item className={classes.centeredPadding}>
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
										className={classes.rating}
									/>
								</Grid>
								<Grid item className={classes.centered}>
									<Typography variant='body2' color='primary'>
										{rating.toFixed(1)}
									</Typography>
								</Grid>
							</Grid>
							<Grid item>
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
										<Form
											autoComplete='off'
											style={{ display: 'flex', alignItems: 'center' }}>
											<FormInput
												name='review'
												className={classes.comment}
												fullWidth
												placeholder={`Share your feedback...`}
												variant='outlined'
												size='small'
											/>
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
								<ReviewCard
									key={review.reviewDetails._id}
									{...{ review, project }}
								/>
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

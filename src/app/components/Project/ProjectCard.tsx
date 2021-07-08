import * as React from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Material UI
import { makeStyles, Theme, Link } from '@material-ui/core';
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
import Hidden from '@material-ui/core/Hidden';

import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import StarRateIcon from '@material-ui/icons/StarRate';

// components
import Rating from '../shared/Rating';
import ReviewsSection from '../Reviews/ReviewsSection';
import PdfViewer from '../shared/Pdf/PdfViewer';
import FormInput from '../shared/FormInput';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';

// types
import { Project, Review, User } from '../../types';

// hooks
import useDisclosure from '../../hooks/useDisclosure';
import { useLocation } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';
import PdfThumbnail from '../shared/Pdf/PdfThumbnail';

const validationSchema = Yup.object().shape({
	review: Yup.string()
		.required('This is a required field')
		.max(200, 'Too Long! Review can only have a maximum of 100 characters'),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		card: {
			marginBottom: 20,
			paddingLeft: 5,
			paddingRight: 5,
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
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
			paddingLeft: theme.spacing(0.7),
			paddingBottom: theme.spacing(0.1),
		},
		ratingNumber: {
			paddingLeft: theme.spacing(0.7),
		},
		comment: {
			'& fieldset': {
				borderRadius: 30,
			},
		},
		section: {
			padding: theme.spacing(0.5),
		},
		centered: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',

			[theme.breakpoints.down('xs')]: {
				flexDirection: 'column',
			},
		},
		centeredButton: {
			display: 'flex',
			justifyContent: 'center',

			[theme.breakpoints.down('xs')]: {
				marginBottom: theme.spacing(3),
			},
		},
		description: {
			[theme.breakpoints.down('xs')]: {
				textAlign: 'left',
				fontSize: 15,
				marginBottom: theme.spacing(3),
			},
		},
		centeredPadding: {
			display: 'flex',
			justifyContent: 'center',
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),

			[theme.breakpoints.down('xs')]: {
				paddingLeft: 0,
				paddingRight: 0,
			},
		},
		collabBox: {
			display: 'flex',
			justifyContent: 'center',
			paddingLeft: theme.spacing(4),
			borderLeftWidth: '1px',
			borderLeftColor: theme.palette.divider,
			borderLeftStyle: 'solid',
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
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			paddingLeft: theme.spacing(1),

			[theme.breakpoints.down('xs')]: {
				justifyContent: 'flex-start',
			},
		},
		avgRatingBox: {
			display: 'flex',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		ratingBox: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',

			[theme.breakpoints.down('xs')]: {
				marginTop: 10,
				flexDirection: 'column',
				alignItems: 'start',

				'& h6': {
					paddingLeft: theme.spacing(1),
				},
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
	const location = useLocation();

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
				if (location.pathname === '/') {
					await queryClient.invalidateQueries('feed');
				} else {
					await queryClient.invalidateQueries(['projects', project.createdBy]);
				}
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
					title={<Typography variant='h4'>{project.title}</Typography>}
					subheader={
						<Typography color='textSecondary' variant='caption'>
							{'Updated on ' +
								format(
									new Date(project.lastUpdatedDate || project.createdAt!),
									'dd MMMM yyyy'
								)}
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
						<Grid item sm={1} className={classes.centeredButton}>
							<PdfThumbnail file={project.projectFile} onClick={onModalOpen} />
						</Grid>
						<Grid item sm={6} className={classes.centeredPadding}>
							<Grid
								container
								direction='column'
								style={{ display: 'flex', justifyContent: 'center' }}>
								<Grid item>
									{project.description && (
										<Typography className={classes.description}>
											{project.description}
										</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							sm={5}
							container
							direction='column'
							className={classes.collabBox}>
							{project.contributors.length !== 0 ? (
								<Grid item container direction='row'>
									<Grid item style={{ marginRight: 5 }}>
										<Typography variant='body2' color='textSecondary'>
											Contributors:
										</Typography>
									</Grid>
									<Grid item>
										{project.contributorDetailsArr?.map(
											(el: any, i: number) => {
												return (
													<Link
														key={i}
														component={RouterLink}
														to={`/public/users/${el._id}`}
														color='primary'
														style={{ fontSize: 14, fontWeight: 550 }}>
														{el.name}
														{i === project.contributors.length - 1 ? '' : ', '}
													</Link>
												);
											}
										)}
									</Grid>
								</Grid>
							) : null}
							{project.tools.length !== 0 ? (
								<Grid item container direction='row'>
									<Grid item style={{ marginRight: 5 }}>
										<Typography variant='body2' color='textSecondary'>
											Tools:
										</Typography>
									</Grid>
									<Grid item>
										{project.tools.map((el: any, i: number) => {
											return (
												<Typography
													key={i}
													variant='body2'
													color='secondary'
													style={{ fontSize: 14, fontWeight: 500 }}>
													{el} {i === project.tools.length - 1 ? '' : ','}
												</Typography>
											);
										})}
									</Grid>
								</Grid>
							) : null}
							{project.skills.length !== 0 ? (
								<Grid item container direction='row'>
									<Grid item style={{ marginRight: 5 }}>
										<Typography variant='body2' color='textSecondary'>
											Skills:
										</Typography>
									</Grid>
									<Grid item>
										{project.skills.map((el: any, i: number) => {
											return (
												<Typography
													key={i}
													variant='body2'
													color='secondary'
													style={{ fontSize: 14, fontWeight: 500 }}>
													{el} {i === project.skills.length - 1 ? '' : ','}
												</Typography>
											);
										})}
									</Grid>
								</Grid>
							) : null}
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
								style={{
									marginBottom: 5,
									display: 'flex',
									alignItems: 'center',
								}}>
								<Grid item sm={1} className={classes.avgRating}>
									<Box className={classes.avgRatingBox}>
										<Typography variant='h4' style={{ fontSize: 18 }}>
											{project.avgRating?.toFixed(1)}
										</Typography>
										<StarRateIcon color='primary' />
										<Typography
											color='textSecondary'
											variant='h5'
											style={{ marginLeft: 1 }}>
											({project.numberOfRatings})
										</Typography>
									</Box>
								</Grid>
								<Grid item className={classes.centeredPadding}>
									<Box className={classes.ratingBox}>
										<Typography variant='subtitle2' color='textSecondary'>
											Add Rating:
										</Typography>

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
										<Typography
											variant='h6'
											color='primary'
											className={classes.ratingNumber}>
											{rating.toFixed(1)}
										</Typography>
									</Box>
								</Grid>
							</Grid>
							<Grid item>
								<Formik
									initialValues={{
										review: ``,
									}}
									validateOnBlur={false}
									validationSchema={validationSchema}
									onSubmit={async ({ review }, { resetForm }) => {
										const data = {
											review,
											category: 'feedback',
										};
										await addReview(data as any);
										resetForm();
									}}>
									{({ values }) => {
										return (
											<>
												<Form
													autoComplete='off'
													style={{ display: 'flex', alignItems: 'center' }}>
													<FormInput
														multiline
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
										);
									}}
								</Formik>
							</Grid>
						</Grid>
					)}

					<Grid container>
						<Grid item>
							<Button
								onClick={toggleOpen}
								color='default'
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
								<ReviewsSection
									key={review.reviewDetails!._id}
									{...{ review, project }}
								/>
							);
						})}

						{!isLoading && !data?.length && (
							<Typography variant='body2'>No reviews yet</Typography>
						)}
					</CardContent>
				</Collapse>
			</Card>
		</>
	);
};

export default ProjectCard;

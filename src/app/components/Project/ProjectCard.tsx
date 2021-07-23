import * as React from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';

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

const useStyles = makeStyles((theme: Theme) => {
	return {
		card: {
			paddingLeft: 3,
			paddingRight: 5
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
			marginTop: -20,
			borderBottomWidth: '1px',
			borderBottomStyle: 'solid',
			borderBottomColor: theme.palette.divider,
			paddingBottom: theme.spacing(4),
		},
		tag: {
			backgroundColor: theme.palette.grey['200'],
			borderRadius: 8,
			paddingTop: 4,
			paddingBottom: 4,
			paddingLeft: 10,
			paddingRight: 10,
			marginLeft: 3,
			marginRight: 3
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
		centeredButton: {
			display: 'flex',
			justifyContent: 'center',

			[theme.breakpoints.down('xs')]: {
				marginBottom: theme.spacing(3),
			},
		},
		ratings: {
			display: 'flex',
		},
		thumbnail: {
			// paddingRight: theme.spacing(4),
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		collabBox: {
			display: 'flex',
			justifyContent: 'flex-start',
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
		// ratingBox: {
		// 	display: 'flex',
		// 	justifyContent: 'center',
		// 	alignItems: 'center',

		// 	[theme.breakpoints.down('xs')]: {
		// 		marginTop: 10,
		// 		flexDirection: 'column',
		// 		alignItems: 'start',

		// 		'& h6': {
		// 			paddingLeft: theme.spacing(1),
		// 		},
		// 	},
		// },
		active: {
			color: theme.palette.primary.main,
			textTransform: 'none',
			fontWeight: 550,
			fontSize: 16

		},
		inactive: {
			color: theme.palette.secondary.main,
			textTransform: 'none',
			fontSize: 16

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

		}
	};
});

interface ProjectCardProps {
	project: Project;
	isPublic?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isPublic }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const classes = useStyles();
	const { isOpen, toggleOpen, onOpen } = useDisclosure();
	const location = useLocation();
	const [rated, setRated] = useState(false);
	const [rating, setRating] = useState('');
	const [typing, setTyping] = useState(false);
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
	// React.useEffect(() => {
	// 	if (project) {
	// 		project.ratings.forEach((el: any) => {
	// 			if (el.createdBy === user._id) {
	// 				setRating(el.value);
	// 				setRated(true);
	// 				// console.log(el.value)
	// 			}
	// 		});
	// 	}
	// }, [project, user._id]);

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
				console.log('success!');
				if (location.pathname === '/') {
					await queryClient.invalidateQueries('feed');
				} else {
					await queryClient.invalidateQueries(['projects', project.createdBy]);
				}
			},
		}
	);

	const showRating = (value: any) => {
		setRating(value)
		addRating({ value: value } as any)
	}

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
					action={
						<Box style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
							<Typography color='textSecondary' variant='caption'>
								{format(
									new Date(project.lastUpdatedDate || project.createdAt!),
									'dd MMMM yyyy'
								)}
							</Typography>
							{!isPublic && (
								<>
									<IconButton onClick={onUpdateOpen}>
										<EditIcon color='primary' />
									</IconButton>
									<IconButton onClick={onDeleteOpen}>
										<DeleteIcon style={{ color: 'red' }} />
									</IconButton>
								</>
							)}
						</Box>

					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container>
						{project.description && (
							<Grid item style={{ marginBottom: 10 }}>
								<Typography variant='body2'>
									{project.description}
								</Typography>
							</Grid>
						)}
						<Grid item container direction='row'>
							{project.skills.length !== 0 ? (
								<Grid item container direction='row'>
									{project.skills.map((el: any, i: number) => {
										return (
											<Grid item className={classes.tag}>
												<Typography
													key={i}
													variant='h5'>
													{el}
												</Typography>
											</Grid>
										);
									})}
								</Grid>
							) : null}
							{project.tools.length !== 0 ? (
								<Grid item container direction='row'>
									{project.tools.map((el: any, i: number) => {
										return (
											<Grid item className={classes.tag}>
												<Typography
													key={i}
													variant='h5'>
													{el}
												</Typography>
											</Grid>
										);
									})}
								</Grid>
							) : null}
						</Grid>
						<Grid item sm={12} className={classes.thumbnail}>
							<PdfThumbnail file={project.projectFile} onClick={onModalOpen} />
						</Grid>
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
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					{isPublic && (
						<Grid container direction='column' className={classes.section}>
							<Grid item className={classes.ratings}>
								<Button onClick={() => showRating('fine')}
									className={rating === 'fine' ? classes.active : classes.inactive}>
									Good
								</Button>
								<Button onClick={() => showRating('good')}
									className={rating === 'good' ? classes.active : classes.inactive}>
									Great
								</Button>
								<Button onClick={() => showRating('excellent')}
									className={rating === 'excellent' ? classes.active : classes.inactive}>
									Excellent
								</Button>
								<Button onClick={() => showRating('extraordinary')}
									className={rating === 'extraordinary' ? classes.active : classes.inactive}>
									Extraordinary
								</Button>
							</Grid>
							<Grid item>
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
													style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
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
							</Grid>
						</Grid>
					)}

					{/* <Grid container>
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
					</Grid> */}
				</CardActions>
				{/* <Collapse in={isOpen} timeout='auto' unmountOnExit> */}
				<CardContent>
					{isLoading && (
						<Typography color='primary' variant='caption'>
							Loading reviews
						</Typography>
					)}
					{/* {data && (
							<>
								<Box mb='5'>
									{[...data?.latestReviews].map((review: Review) => {
										return (
											<ReviewsSection
												key={review.reviewDetails!._id}
												{...{ review, project }}
											/>
										);
									})}
								</Box>
								{data?.previousReviews.length > 0 && (
									<>
										<Box mb='3'>
											<Typography>Previous Reviews</Typography>
										</Box>
										{[...data.previousReviews].map((review: Review) => {
											return (
												<ReviewsSection
													key={review.reviewDetails!._id}
													{...{ review, project }}
												/>
											);
										})}
									</>
								)}
							</>
						)} */}
				</CardContent>
				{/* </Collapse> */}
			</Card>
		</>
	);
};

export default ProjectCard;

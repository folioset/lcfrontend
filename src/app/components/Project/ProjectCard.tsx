import * as React from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import { format } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';

// Material UI
import { makeStyles, Theme, Link, MenuItem } from '@material-ui/core';

import {
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Box,
	Grid,
	Button,
	Modal,
	Hidden,
	Typography,
	IconButton,
	Fade,
	Menu,
} from '@material-ui/core';

import CancelIcon from '@material-ui/icons/Cancel';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// components
import RatingCard from '../shared/RatingCard';
import ReviewsSection from '../Reviews/ReviewsSection';
import PdfViewer from '../shared/Pdf/PdfViewer';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';

// types
import { Project, Review, User } from '../../types';

// hooks
import useDisclosure from '../../hooks/useDisclosure';

import { Link as RouterLink } from 'react-router-dom';
import PdfThumbnail from '../shared/Pdf/PdfThumbnail';

const useStyles = makeStyles((theme: Theme) => {
	return {
		card: {
			paddingLeft: 3,
			paddingRight: 5,
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
			marginRight: 3,
		},
		thumbnail: {
			// paddingRight: theme.spacing(4),
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
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
		MenuItem: {
			color: 'red',
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
	const classes = useStyles();
	const [num, setNum] = useState(1);

	// project dot menu
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


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

	useEffect(() => {
		console.log(num, 'this is num in 2nd use');
		refetchReviews();
	}, [num]);

	// Get all Project Reviews
	const {
		isLoading,
		data: reviews,
		refetch: refetchReviews,
	} = useQuery(['project-reviews', project._id, num], async () => {
		const res = await axios({
			method: 'get',
			url: `/api/project/${project._id}/reviews/${num}`,
		});
		return res.data;
	});

	// console.log("projecttttttt", project);


	const handleMoreReviews = () => {
		setNum(num + 5);
	};

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
						<Box
							style={{
								display: 'flex',
								textAlign: 'center',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Typography color='textSecondary' variant='caption'>
								{format(
									new Date(project.lastUpdatedDate || project.createdAt!),
									'dd MMMM yyyy'
								)}
							</Typography>

							{/* menu */}
							{!isPublic && (
								<>
									<div>
										<Button
											aria-controls='fade-menu'
											aria-haspopup='true'
											onClick={handleClick}>
											<MoreHorizIcon />
										</Button>
										<Menu
											id='fade-menu'
											anchorEl={anchorEl}
											keepMounted
											open={open}
											onClose={handleClose}
											TransitionComponent={Fade}>
											<MenuItem onClick={onUpdateOpen}>Edit Challenge</MenuItem>
											<MenuItem onClick={onDeleteOpen}>
												Delete Challenge
											</MenuItem>
										</Menu>
									</div>
								</>
							)}
						</Box>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container>
						{project.description && (
							<Grid item style={{ marginBottom: 10 }}>
								<Typography variant='body2'>{project.description}</Typography>
							</Grid>
						)}
						<Grid item container direction='row'>
							{project.skills.length !== 0 ? (
								<Grid item container direction='row'>
									{project.skills.map((el: any, i: number) => {
										return (
											<Grid item className={classes.tag}>
												<Typography key={i} variant='h5'>
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
												<Typography key={i} variant='h5'>
													{el}
												</Typography>
											</Grid>
										);
									})}
								</Grid>
							) : null}
						</Grid>
						{project.projectFile && (
							<Grid item sm={12} className={classes.thumbnail}>
								<PdfThumbnail
									file={project.projectFile}
									onClick={onModalOpen}
								/>
							</Grid>
						)}
						{project.contributors.length !== 0 ? (
							<Grid item container direction='row'>
								<Grid item style={{ marginRight: 5 }}>
									<Typography variant='body2' color='textSecondary'>
										Contributors:
									</Typography>
								</Grid>
								<Grid item>
									{project.contributorDetailsArr?.map((el: any, i: number) => {
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
									})}
								</Grid>
							</Grid>
						) : null}
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					{isPublic && <RatingCard {...{ project }} />}
				</CardActions>
				<CardContent className={classes.cardContent}>
					{isLoading && (
						<Typography variant='caption'>
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
											{...{ review, project }}
										/>
									);
								})}
							</Box>
							{reviews?.length !== project?.reviews.length ? (<Button
								onClick={handleMoreReviews}
								style={{ textTransform: 'none', marginBottom: -20 }}>
								Load more reviews
							</Button>) : null}
						</>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default ProjectCard;

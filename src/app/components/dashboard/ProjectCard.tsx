import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	Grid,
	IconButton,
	makeStyles,
	Modal,
	Tab,
	Tabs,
	Theme,
	Typography,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import * as React from 'react';
import useDisclosure from '../../hooks/useDisclosure';
import Rating from '../shared/Rating';
import PdfView from '../shared/Pdf/PdfView';
import PdfViewer from '../shared/Pdf/PdfViewer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { Project, User } from '../../types';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormInput from '../shared/FormInput';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import ProjectReviewDrawer from './ProjectReviewDrawer';

interface ProjectProps {
	project: Project;
	isPublic?: boolean;
}

const validationSchema = Yup.object().shape({
	review: Yup.string()
		.min(10, 'Too Short! You should atleast have 10 characters')
		.max(100, 'Too Long! Review can only have a maximum of 100 characters'),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		projectCard: {
			marginBottom: theme.spacing(4),
		},
		projectDescription: {
			textAlign: 'justify',
		},
		overallRating: {
			padding: theme.spacing(1),
		},
		pdfIconGridItem: {
			display: 'flex',
			justifyContent: 'flex-end',

			'& > div': {
				textAlign: 'center',
				cursor: 'pointer',
			},
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
		cardActions: ({ isPublic }: any) => {
			return {
				display: 'flex',
				alignItems: 'center',
				justifyContent: isPublic ? 'space-between' : 'flex-end',
			};
		},
		reviewBox: {
			marginBottom: theme.spacing(4),
		},
		commentCta: {
			display: 'block',
			marginLeft: 'auto',
		},
		seeAllReviewsBtn: {
			marginRight: theme.spacing(2),

			[theme.breakpoints.down('md')]: {
				marginRight: 0,
				marginBottom: theme.spacing(1),
			},
		},

		reviewBtns: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',

			[theme.breakpoints.down('md')]: {
				flexDirection: 'column',

				'& > *': {
					width: '100%',
				},
			},
		},
		tabs: {
			marginBottom: theme.spacing(2),
		},
	};
});

const tabProps = (index: any) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

const ProjectCard: React.FC<ProjectProps> = ({ project, isPublic }) => {
	const queryClient = useQueryClient();
	const classes = useStyles({ isPublic });
	const [rating, setRating] = React.useState(0);
	const user = queryClient.getQueryData<User>('user')!;

	React.useEffect(() => {
		if (project) {
			project.ratings.forEach((el: any) => {
				if (el.createdBy === user._id) {
					setRating(el.value);
				}
			});
		}
	}, [project, user._id]);

	// Modal Toggle
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();

	// Review Box
	const {
		isOpen: expanded,
		toggleOpen: toggleExpanded,
		onClose: closeExpanded,
	} = useDisclosure();

	// All Reviews
	const {
		isOpen: isReviewsOpen,
		onOpen: onReviewsOpen,
		onClose: onReviewsClosed,
	} = useDisclosure();
	const [tabValue, setTabValue] = React.useState(0);

	const onTabValueChange = (_: React.ChangeEvent<{}>, newValue: number) => {
		setTabValue(newValue);
	};

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
			onSettled: (data) => {
				if (data) {
					closeExpanded();
					onReviewsOpen();
				}
			},
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
				{/* <PdfView onClose={onModalClose} filename={project.projectFile} /> */}
				<PdfViewer filename={project.projectFile} />
			</Modal>

			{isReviewsOpen && (
				<ProjectReviewDrawer
					isOpen={isReviewsOpen}
					onOpen={onReviewsOpen}
					onClose={onReviewsClosed}
					project={project}
				/>
			)}

			<Card elevation={3} className={classes.projectCard}>
				<CardHeader
					action={
						<Typography
							className={classes.overallRating}
							color='primary'
							variant='subtitle1'>
							8.0 / 10.0
						</Typography>
					}
					title={project.title}
					subheader={`posted on ${new Date(
						project.createdAt
					).toLocaleDateString()}`}
				/>
				{project.description && (
					<CardContent>
						<Grid container spacing={4}>
							<Grid item xs={9}>
								<Typography
									variant='body2'
									className={classes.projectDescription}>
									{project.description}
								</Typography>
							</Grid>

							<Grid item xs={3} className={classes.pdfIconGridItem}>
								<Box onClick={onModalOpen}>
									<IconButton color='primary'>
										<PictureAsPdf />
									</IconButton>
									<Typography variant='caption'>Your file.pdf</Typography>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				)}

				<>
					<CardActions className={classes.cardActions}>
						{isPublic && (
							<Box component='fieldset' borderColor='transparent'>
								<Box
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
									onChange={(e: any) => {
										let newRating = parseFloat(e.target.value);
										if (rating === newRating) newRating = 0;
										setRating(newRating);
										addRating({ value: newRating } as any);
									}}
									value={rating}
									max={10}
									name={`project-${project._id}-rating`}
								/>
							</Box>
						)}
						<Box className={classes.reviewBtns}>
							<Button
								onClick={onReviewsOpen}
								className={classes.seeAllReviewsBtn}
								size='small'
								color='primary'
								variant='outlined'>
								See all reviews
							</Button>
							{isPublic && (
								<Button
									size='small'
									onClick={toggleExpanded}
									aria-expanded={expanded}
									aria-label='show more'
									color='primary'
									variant='contained'
									disableElevation
									startIcon={
										<ExpandMoreIcon
											className={clsx(classes.expand, {
												[classes.expandOpen]: expanded,
											})}
										/>
									}>
									Add your review
								</Button>
							)}
						</Box>
					</CardActions>
					{isPublic && (
						<Collapse in={expanded} timeout='auto' unmountOnExit>
							<CardContent>
								<Formik
									initialValues={{
										review: '',
									}}
									validationSchema={validationSchema}
									onSubmit={async ({ review }, { resetForm }) => {
										const data = {
											review,
											category: tabValue === 0 ? 'suggestion' : 'comment',
										};
										await addReview(data as any);
										resetForm();
									}}>
									{() => {
										return (
											<Form>
												<Tabs
													className={classes.tabs}
													indicatorColor='primary'
													value={tabValue}
													onChange={onTabValueChange}
													aria-label='select review type'>
													<Tab label='Add Suggestion' {...tabProps(0)} />
													<Tab label='Add Comment' {...tabProps(1)} />
												</Tabs>
												<FormInput
													className={classes.reviewBox}
													label={
														tabValue === 0 ? 'Your Suggestion' : 'Your Comment'
													}
													required
													multiline
													name='review'
													rows={4}
													fullWidth
													variant='outlined'
												/>
												<Button
													type='submit'
													variant='contained'
													color='primary'
													className={classes.commentCta}>
													Save {tabValue === 0 ? 'Suggestion' : 'Comment'}
												</Button>
											</Form>
										);
									}}
								</Formik>
							</CardContent>
						</Collapse>
					)}
				</>
			</Card>
		</>
	);
};

export default ProjectCard;

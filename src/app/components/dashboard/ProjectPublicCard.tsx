import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
	TextField,
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
import * as React from 'react';
import { Project, Review, User } from '../../types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PictureAsPdf } from '@material-ui/icons';
import ReviewCard from './ReviewCard';
// import PdfViewer from '../shared/Pdf/PdfViewer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useDisclosure from '../../hooks/useDisclosure';
import clsx from 'clsx';
import axios from 'axios';
import PdfViewer from '../shared/Pdf/PdfViewer';

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

	// Modal Toggle
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();

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
				{/* <PdfView onClose={onModalClose} filename={project.projectFile} /> */}
				<PdfViewer filename={project.projectFile} />
			</Modal>
			<Card style={{ marginBottom: 40 }}>
				<CardHeader
					avatar={<Avatar aria-label={user.name} src={user.profilePicture} />}
					action={<Typography color='primary'>4.5 / 10.0</Typography>}
					title={project.title}
					subheader={`posted on ${new Date(
						project.createdAt
					).toLocaleString()}`}
				/>
				<CardContent>
					{project.description && (
						<Box mb={4}>
							<Typography>{project.description}</Typography>
						</Box>
					)}
					<Box>
						<IconButton color='primary' onClick={onModalOpen}>
							<Box mr={2}>
								<PictureAsPdf />
							</Box>
							<Typography variant='caption'>
								{project.projectFile.split('.com/')[1]}
							</Typography>
						</IconButton>
					</Box>

					{isPublic && (
						<Box mt={1}>
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
					)}
				</CardContent>
				<CardActions className={classes.cardActions}>
					{isPublic && (
						<Grid container spacing={2} className={classes.cardCommentBox}>
							<Grid container item xs={1} justify='center'>
								<Avatar aria-label={user.name} src={user.profilePicture} />
							</Grid>
							<Grid item xs={11}>
								<TextField
									className={classes.comment}
									fullWidth
									placeholder='Add a comment...'
									variant='outlined'
									size='small'
								/>
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

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
	TextField,
	Theme,
	Typography,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import * as React from 'react';
import useDisclosure from '../../hooks/useDisclosure';
import Rating from '../shared/Rating';
import samplePDF from '../../../assets/test.pdf';
import PdfView from '../shared/PdfView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

interface ProjectProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
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
		cardActions: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		reviewBox: {
			marginBottom: theme.spacing(4),
		},
		commentCta: {
			display: 'block',
			marginLeft: 'auto',
		},
	};
});

const Project: React.FC<ProjectProps> = () => {
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<>
			<Modal
				open={isModalOpen}
				onClose={onModalClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<PdfView onClose={onModalClose} filename={samplePDF} />
			</Modal>

			<Card elevation={3}>
				<CardHeader
					action={
						<Typography
							className={classes.overallRating}
							color='primary'
							variant='subtitle1'>
							8.0 / 10
						</Typography>
					}
					title='Improving Pharmeasy'
					subheader='posted on 12th Mar'
				/>
				<CardContent>
					<Grid container spacing={4}>
						<Grid item xs={9}>
							<Typography
								variant='body2'
								className={classes.projectDescription}>
								I have examined pharmeasy and how to improve it by looking at
								user personas, user journey mapping and understanding what pain
								points customers have while using the pharmeasy app
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
				<CardActions className={classes.cardActions}>
					<Box component='fieldset' borderColor='transparent'>
						<Typography variant='caption' component='legend'>
							Your Rating
						</Typography>
						<Rating max={10} name='project rating' />
					</Box>
					<Box>
						<Box display='inline-block' mr={2}>
							<Button size='small' color='primary' variant='outlined'>
								See all reviews
							</Button>
						</Box>
						<Button
							size='small'
							onClick={handleExpandClick}
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
					</Box>
				</CardActions>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<TextField
							className={classes.reviewBox}
							label='You Review'
							required
							multiline
							rows={4}
							fullWidth
							variant='outlined'
						/>
						<Button
							variant='contained'
							color='primary'
							className={classes.commentCta}>
							Save
						</Button>
					</CardContent>
				</Collapse>
			</Card>
		</>
	);
};

export default Project;

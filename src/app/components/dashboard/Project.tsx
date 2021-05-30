import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	makeStyles,
	Modal,
	Theme,
	Typography,
} from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import * as React from 'react';
import useDisclosure from '../../hooks/useDisclosure';
import Rating from '../shared/Rating';
import samplePDF from '../../../assets/test.pdf';
import PdfView from '../shared/PdfView';

interface ProjectProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		projectDescription: {
			textAlign: 'justify',
		},
		overallRating: {
			padding: theme.spacing(1),
		},
		pdfIconBtn: {
			width: '80%',
			height: '60%',
		},
	};
});

const Project: React.FC<ProjectProps> = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const classes = useStyles();

	return (
		<>
			<Modal
				open={isOpen}
				onClose={onClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<PdfView filename={samplePDF} />
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
						<Grid item xs={8}>
							<Typography
								variant='body2'
								className={classes.projectDescription}>
								I have examined pharmeasy and how to improve it by looking at
								user personas, user journey mapping and understanding what pain
								points customers have while using the pharmeasy app
							</Typography>
						</Grid>

						<Grid item xs={3}>
							<Box textAlign='center'>
								<IconButton
									onClick={onOpen}
									color='primary'
									className={classes.pdfIconBtn}>
									<PictureAsPdf />
								</IconButton>

								<Typography variant='caption'>You file.pdf</Typography>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Box component='fieldset' borderColor='transparent'>
						<Typography variant='caption' component='legend'>
							Your Rating
						</Typography>
						<Rating precision={0.5} color='primary' name='simple-controlled' />
					</Box>
				</CardActions>
			</Card>
		</>
	);
};

export default Project;

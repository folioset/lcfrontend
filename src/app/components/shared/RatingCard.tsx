import { Link, Typography, Button, Grid, Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { Project, Review } from '../../types';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useLocation } from 'react-router-dom';

import FormInput from '../shared/FormInput';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';

interface RatingCardProps {
	project: Project;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		comment: {
			'& fieldset': {
				borderRadius: 30,
			},
		},
		section: {
			padding: theme.spacing(0.5),
		},
		giveRatings: {
			display: 'flex',
			marginBottom: 3
		},
		showRatings: {

		},
		active: {
			color: theme.palette.primary.main,
			textTransform: 'none',
			fontWeight: 550,
			fontSize: 16,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		},
		inactive: {
			color: theme.palette.secondary.main,
			textTransform: 'none',
			fontSize: 16,
			marginRight: 10,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
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
		},
	})
);

const RatingCard: React.FC<RatingCardProps> = ({ project }) => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const location = useLocation();
	const [rating, setRating] = useState('');
	const [typing, setTyping] = useState(false);
	const [goodRatings, setGoodRatings] = useState(1);
	const [excellentRatings, setExcellentRatings] = useState(1);
	const [extraOrdinaryRatings, setExtraOrdinaryRatings] = useState(1);

	useEffect(() => {
		if (rating=='good') setGoodRatings(goodRatings+1);
		if (rating=='excellent') setExcellentRatings(excellentRatings+1);
		if (rating=='extraordinary') setExtraOrdinaryRatings(extraOrdinaryRatings+1);
	}, [rating]);


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
			},
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
				// console.log('success!');
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
		<Grid container direction='column' className={classes.section}>
			<Grid item className={classes.giveRatings}>
				<Button onClick={() => showRating('good')}>
					<Box className={rating === 'good' ? classes.active : classes.inactive}>
						<Typography style={{ marginRight: 4, marginTop: 1.5, fontWeight: 450 }}>({goodRatings})</Typography>
						<Typography style={{ marginRight: 4, marginTop: 1.5, fontWeight: 450 }}>Good</Typography>
						{rating === 'good' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}

					</Box>
				</Button>
				<Button onClick={() => showRating('excellent')}>
					<Box className={rating === 'excellent' ? classes.active : classes.inactive}>
						<Typography style={{ marginRight: 4, marginTop: 1.5, fontWeight: 450 }}>({excellentRatings})</Typography>
						<Typography style={{ marginRight: 4, marginTop: 1.5, fontWeight: 450 }}>Excellent</Typography>
						{rating === 'excellent' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
						{rating === 'excellent' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
					</Box>
				</Button>
				<Button onClick={() => showRating('extraordinary')}>
					<Box className={rating === 'extraordinary' ? classes.active : classes.inactive}>
						<Typography style={{ marginRight: 4, marginTop: 1.5, fontWeight: 450 }}>({extraOrdinaryRatings})</Typography>
						<Typography style={{ marginRight: 4, marginTop: 1.5, fontWeight: 450 }}>Extraordinary</Typography>
						{rating === 'extraordinary' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
						{rating === 'extraordinary' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
						{rating === 'extraordinary' ?
							<ThumbUpAltRoundedIcon fontSize='small' color='primary'></ThumbUpAltRoundedIcon>
							:
							<ThumbUpAltOutlinedIcon fontSize='small' color='secondary'></ThumbUpAltOutlinedIcon>
						}
					</Box>
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
	);
};

export default RatingCard;

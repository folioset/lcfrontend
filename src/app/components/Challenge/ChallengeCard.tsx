import * as React from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';

// Material UI
import { makeStyles, Theme, Link, MenuItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';

import CancelIcon from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import FormInput from '../shared/FormInput';
import AnswerSection from '../Answers/AnswerSection';

// types
import { Challenge, User, Answer } from '../../types';

// hooks
import useDisclosure from '../../hooks/useDisclosure';

import CreateCaseAnswer from './CreateCaseAnswer';
import UpdateChallenge from './UpdateChallenge';
import EndChallenge from './EndChallenge';

const validationSchema = Yup.object().shape({
	text: Yup.string()
		.required('This is a required field')
		.max(1000, 'Too Long! Answer can only have a maximum of 1000 characters'),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		card: {
			marginBottom: theme.spacing(3),
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
			borderRadius: 10,
			borderWidth: 5,
			borderColor: '#111111',
			elevation: 0,
			boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
			width: '100%',
			height: 'auto',
			margin: 'auto',
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
			marginTop: -theme.spacing(2),
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
				borderRadius: 10,
			},
		},
		section: {
			padding: theme.spacing(0.5),
		},
		centered: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-start',

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
		thumbnail: {
			// paddingRight: theme.spacing(4),
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
		dataOneHide: {
			display: 'none',
		},
		submitButton: {
			marginTop: 10,
			marginLeft: 2,
			textTransform: 'none',
			width: '30px',
			height: '30px',
			backgroundColor: theme.palette.primary.main,
			color: 'black',
			borderRadius: 15,
		},
		loadMore: {
			textTransform: 'none',
			cursor: 'pointer',
			textAlign: 'right',
			margin: '-20px 15px 5px 0',
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
			marginBottom: 3,
		},
		answers: {
			marginTop: -theme.spacing(2)
		},
		ended: {
			marginBottom: theme.spacing(1),
			paddingLeft: theme.spacing(1)
		},
		gridItem: {
			marginTop: theme.spacing(2)
		}
	};
});

interface ChallengeCardProps {
	challenge: Challenge;
	isPublic?: boolean;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
	challenge,
	isPublic,
}) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const [rating, setRating] = React.useState(0);
	const [num, setNum] = useState(1);
	const classes = useStyles();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [typing, setTyping] = useState(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// End Confirm Toggler
	const {
		isOpen: isEndOpen,
		onOpen: onEndOpen,
		onClose: onEndClose,
	} = useDisclosure();

	// Update Challenge Toggler
	const {
		isOpen: isUpdateOpen,
		onOpen: onUpdateOpen,
		onClose: onUpdateClose,
	} = useDisclosure();

	// Get all Answers
	const { isLoading, data, refetch } = useQuery(
		['all-answer', challenge._id],
		async () => {
			const res = await axios({
				method: 'get',
				url: `/api/question/answers/${challenge._id}/${num}`,
			});
			return res.data;
		}
	);

	useEffect(() => {
		refetch();
	}, []);

	useEffect(() => {
		console.log(num, 'i am in useeffect');
		refetch();
	}, [num]);

	const handleMoreAnswers = () => {
		setNum(num + 5);
	};


	//adding normal answer
	const { mutate: addAnswerMutate, isLoading: addAnswerLoading } = useMutation(
		(data) =>
			axios({
				method: 'POST',
				url: `/api/question/${challenge._id}`,
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('all-answer');
			},
			onSettled: (data) => {
				if (data) {
					onClose();
				}
			},
			onError: (err) => {
				console.log(err);
			},
		}
	);


	// authorizing Endtion of question
	if (user._id === challenge.createdBy._id) isPublic = false;

	return (
		<>
			{/* Add answer modal */}
			<Modal
				open={isOpen}
				onClose={onClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<CreateCaseAnswer {...{ onClose, challenge }} />
			</Modal>

			{/* Update challenge */}
			<Modal
				open={isUpdateOpen}
				onClose={onUpdateClose}
				aria-labelledby='project-file'
				aria-describedby='pdf file of the project'>
				<UpdateChallenge onClose={onUpdateClose} challenge={challenge} />
			</Modal>

			{/* End challenge */}
			<Modal
				open={isEndOpen}
				onClose={onEndClose}
				aria-labelledby='challenge-file'
				aria-describedby='pdf file of the challenge'>
				{/* <EndChallenge onClose={onEndClose} challenge={challenge} /> */}
				<EndChallenge onClose={onEndClose} challenge={challenge} />
			</Modal>

			<Card className={classes.card}>
				<CardHeader
					title={<Typography variant='h4'>{challenge.title}</Typography>}
					action={
						<Box
							style={{
								display: 'flex',
								textAlign: 'center',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Typography color='textSecondary' variant='caption'>
								{format(new Date(challenge.createdAt!), 'dd MMMM yyyy')}
							</Typography>
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
											{!challenge.closeAnswers ? (
												<MenuItem onClick={onEndOpen}>End Challenge</MenuItem>
											) : (
												<MenuItem
													style={{ cursor: 'not-allowed', color: 'gray' }}>
													Ended
												</MenuItem>
											)}
											<MenuItem onClick={onUpdateOpen}>Edit Challenge</MenuItem>
										</Menu>
									</div>
								</>
							)}
						</Box>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container direction='column'>
						<Grid item sm={12}>
							{challenge.description && (
								<Typography className={classes.description}>
									{challenge.description}
								</Typography>
							)}
						</Grid>
						{challenge.skills.length !== 0 ? (
								<Grid item sm={12}className={classes.gridItem} container direction='row'>
									{challenge.skills.map((el: any, i: number) => {
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
					<Grid item className={classes.gridItem}>
					{isLoading && (
						<Typography variant='caption'>Loading answers...</Typography>
					)}
					{data?.length ? (
						<AnswerSection answer={data[0]} challenge={challenge} />
					) : null}
					{data?.length > 1 ? 
						data.slice(1).map((answer: Answer) => {
								return (
									<AnswerSection key={answer._id} {...{ answer, challenge }} />
								);
						}
					) : null}
					</Grid>
				<Grid item sm={12} className={classes.gridItem}>

				{data?.length !== challenge?.answers.length &&
				!isLoading &&
				challenge?.answers.length > 1 ? (
					<Button onClick={handleMoreAnswers} className={classes.loadMore}>
						Load more answers
					</Button>
				) : null}
				</Grid>
				<Grid item sm={12}>
				{!challenge.closeAnswers ? (
						challenge.isCaseStudy ? (
							<Button size='small' color='primary' onClick={onOpen}>
								Add Project
							</Button>
						) : (
							<Box width='100%'>
									<Formik
											initialValues={{
												text: ``,
											}}
											validateOnBlur={false}
											validationSchema={validationSchema}
											onSubmit={async ({ text }, { resetForm }) => {
												const data = {
													text,
												};
												await addAnswerMutate(data as any);
												resetForm();
											}}>
											{({ values }) => {
												return (
													<>
														<Form
															autoComplete='off'
															style={{
																display: 'flex',
																flexDirection: 'column',
																textAlign: 'left',
																alignItems: 'flex-end',
															}}>
															<FormInput
																multiline
																name='text'
																className={classes.comment}
																fullWidth
																placeholder={`Answer this question`}
																variant='outlined'
																size='small'
																onFocus={() => setTyping(true)}
															/>
															{typing && (
																<Button
																	type='submit'
																	color='primary'
																	className={classes.submitButton}>
																	Post
																</Button>
															)}
														</Form>
													</>
												);
											}}
										</Formik>
							</Box>
						)
				) : null}
				</Grid>
				{/* {!isLoading && !data?.length && !challenge.closeAnswers ? 
				    (num === 1 ? (
						<Grid item sm={12} className={classes.gridItem}>
							<Typography variant='body2' style={{ marginTop: 2 }}>
								Be the first to answer!
							</Typography>
						</Grid>
						) : (
						<Grid item sm={12} className={classes.gridItem}>
							<Typography variant='body2'>No more answers</Typography>
						</Grid>)
					) : null} */}
				<Grid item sm={12}>
				{challenge.closeAnswers ? (<Typography variant='body2'>
						This challenge has ended 
						</Typography>) : null}
				</Grid>
				</Grid>
				</CardContent>

			</Card>
		</>
	);
};

export default ChallengeCard;

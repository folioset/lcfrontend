import * as React from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import axios from 'axios';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Material UI
import { makeStyles, Theme, Link, MenuItem } from '@material-ui/core';
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
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';

import CancelIcon from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';

// components
import Rating from '../shared/Rating';
import ReviewsSection from '../Reviews/ReviewsSection';
import PdfViewer from '../shared/Pdf/PdfViewer';
import FormInput from '../shared/FormInput';
import AnswerSection from '../Answers/AnswerSection';

// types
import { Challenge, User, Answer } from '../../types';

// hooks
import useDisclosure from '../../hooks/useDisclosure';
import { useLocation } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';
import PdfThumbnail from '../shared/Pdf/PdfThumbnail';
import CreateCaseAnswer from './CreateCaseAnswer';
import DeleteChallenge from './DeleteChallenge';
import UpdateProject from '../Project/UpdateProject';
import UpdateChallenge from './UpdateChallenge';

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .required('This is a required field')
        .max(1000, 'Too Long! Answer can only have a maximum of 1000 characters'),
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
            width: '95%',
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
        thumbnail: {
            // paddingRight: theme.spacing(4),
        },
        collabBox: {
            display: 'flex',
            justifyContent: 'flex-start',
            // paddingLeft: theme.spacing(1),

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
        btnAlign: {
            justifyContent: 'flex-end'
        },
        dataOneHide: {
            display: 'none',
        }
    };
});

interface ChallengeCardProps {
    challenge: Challenge;
    isPublic?: boolean;
}


const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isPublic }) => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>('user')!;

    const classes = useStyles();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const location = useLocation();

    // Add Answer Modal Toggler
    const {
        isOpen: isAnswerOpen,
        onOpen: onAnswerOpen,
        onClose: onAnswerClose,
    } = useDisclosure();

    // view Answer Toggler
    const {
        isOpen: isAnsViewOpen,
        toggleOpen: AnsViewToggleOpen,
        onClose: onAnsViewClose,
    } = useDisclosure();

    // // Project Modal Toggler
    // const {
    //     isOpen: isModalOpen,
    //     onOpen: onModalOpen,
    //     onClose: onModalClose,
    // } = useDisclosure();

    // // Update Project Toggler
    // const {
    //     isOpen: isUpdateOpen,
    //     onOpen: onUpdateOpen,
    //     onClose: onUpdateClose,
    // } = useDisclosure();

    // React.useEffect(() => {
    // Get all Answers 
    const { isLoading, data } = useQuery(
        ['all-answer', challenge._id],
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/question/answers/${challenge._id}/1`,
            });
            return res.data;
        },
    );
    // }, [])

    //adding normal answer
    const { mutate: addAnswerMutate, isLoading: addAnswerLoading } = useMutation(
        (data) =>
            axios({
                method: 'POST',
                url: `/api/question/${challenge._id}`,
                data
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('all-answer');
                // console.log("success");
                // AnsViewToggleOpen();
            },
            onSettled: (data) => {
                if (data) {
                    onClose();
                    console.log(data);
                }
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );





    //  Add Review
    // const { mutate: addReview } = useMutation(
    //     async (data) => {
    //         const res = await axios({
    //             method: 'POST',
    //             // url: `/api/project/${project._id}/reviews/`,
    //             data,
    //         });
    //         return res.data;
    //     },
    //     {
    //         onSuccess: () => {
    //             // queryClient.invalidateQueries(['project-reviews', project._id]);
    //             onOpen();
    //         },
    //     }
    // );

    // // Set Default Project Rating
    // React.useEffect(() => {
    //     if (challenge) {
    //         challenge.ratings.forEach((el: any) => {
    //             if (el.createdBy === user._id) {
    //                 setRating(el.value);
    //             }
    //         });
    //     }
    // }, [project, user._id]);

    // Get all Project Reviews
    // const { isLoading, data } = useQuery(
    //     ['project-reviews', project._id],
    //     async () => {
    //         const res = await axios({
    //             method: 'get',
    //             url: `/api/project/${project._id}/reviews`,
    //         });

    //         return res.data;
    //     }
    // );

    // Update Rating
    // const { mutate: addRating } = useMutation(
    //     async (data) => {
    //         const res = await axios({
    //             method: 'PUT',
    //             url: `/api/project/${project._id}/add-rating`,
    //             data,
    //         });
    //         return res.data;
    //     },
    //     {
    //         onSuccess: async () => {
    //             if (location.pathname === '/') {
    //                 await queryClient.invalidateQueries('feed');
    //             } else {
    //                 await queryClient.invalidateQueries(['projects', project.createdBy]);
    //             }
    //         },
    //     }
    // );


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

            {/* Update Project */}
            {/* <Modal
                open={isUpdateOpen}
                onClose={onUpdateClose}
                aria-labelledby='project-file'
                aria-describedby='pdf file of the project'>
                <UpdateChallenge onClose={onUpdateClose} challenge={challenge} />
            </Modal> */}
            {/* Show Project File */}
            {/* <Modal
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
            </Modal> */}
            <Card className={classes.card}>
                <CardHeader
                    title={<Typography variant='h4'>Question:{challenge.title}</Typography>}
                // subheader={
                //     <Typography color='textSecondary' variant='caption'>
                //         {'Updated on ' +
                //             format(
                //                 new Date(challenge.lastUpdatedDate || challenge.createdAt!),
                //                 'dd MMMM yyyy'
                //             )}
                //     </Typography>
                // }
                />
                <CardContent className={classes.cardContent}>
                    <Grid container direction='row' className={classes.centered}>
                        {/* <Grid item sm={12} className={classes.thumbnail}>
                            <PdfThumbnail file={project.projectFile} onClick={onModalOpen} />
                        </Grid> */}
                        <Grid
                            item
                            sm={12}
                            container
                            direction='column'
                            className={classes.collabBox}>
                            {challenge.description && (
                                <Grid item style={{
                                    marginBottom: 10
                                }}>
                                    <Typography className={classes.description}>
                                        Description:{challenge.description}
                                    </Typography>
                                </Grid>
                            )}
                            {/* {challenge.skills.length !== 0 ? (
                                <Grid item container direction='row'>
                                    <Grid item style={{ marginRight: 5 }}>
                                        <Typography variant='body2' color='textSecondary'>
                                            Skills:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {challenge.skills.map((el: any, i: number) => {
                                            return (
                                                <Typography
                                                    key={i}
                                                    variant='body2'
                                                    style={{ fontWeight: 500 }}>
                                                    {el} {i === challenge.skills.length - 1 ? '' : ','}
                                                </Typography>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            ) : null} */}
                            {/* {project.tools.length !== 0 ? (
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
                                                    style={{ fontWeight: 500 }}>
                                                    {el} {i === project.tools.length - 1 ? '' : ','}
                                                </Typography>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            ) : null} */}
                            {/* {project.contributors.length !== 0 ? (
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
                            ) : null} */}
                        </Grid>
                    </Grid>
                </CardContent>
                {/* <CardActions className={classes.cardActions}>
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
                                            {challenge.avgRating?.toFixed(1)}
                                        </Typography>
                                        <StarRateIcon color='primary' />
                                        <Typography
                                            color='textSecondary'
                                            variant='h5'
                                            style={{ marginLeft: 1 }}>
                                            ({challenge.numberOfRatings})
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
                            // </Grid>
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
                </CardActions> */}
                {/* <Collapse in={isOpen} timeout='auto' unmountOnExit>
                    <CardContent>
                        {isLoading && (
                            <Typography color='primary' variant='caption'>
                                Loading reviews
                            </Typography>
                        )}
                        {data?.latestReviews.map((review: Review) => {
                            return (
                                <ReviewsSection
                                    key={review.reviewDetails!._id}
                                    {...{ review, challenge }}
                                />
                            );
                        })}
                        {!isLoading && !data?.length && (
                            <Typography variant='body2'>No reviews yet</Typography>
                        )}
                    </CardContent>
                </Collapse> */}
                <CardActions className={classes.btnAlign}>
                    {challenge.isCaseStudy ?
                        (<Button size="small" color="primary" onClick={onOpen}>
                            Add Project
                        </Button>) :
                        (
                            // <Button size="small" color="primary" onClick={onAnswerOpen}>
                            //     Add Answer
                            // </Button>
                            <>
                                <Grid style={{ width: '100%' }}>
                                    <Grid item>
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
                                                            style={{ display: 'flex', alignItems: 'center' }}>
                                                            <FormInput
                                                                multiline
                                                                name='text'
                                                                className={classes.comment}
                                                                fullWidth
                                                                placeholder={`Share your Answer...`}
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
                            </>
                        )}
                    {/* <h3>{challenge.answers?.[0]}</h3> */}
                    {/* {((challenge.answers.length)) ?
                    (
                        challenge.answers.map(ans => {
                            return (<Typography className={classes.description}>
                                {ans._id}
                                </Typography>)
                            })
                            ) :
                    (<Typography className={classes.description}>
                        No answers yet
                    </Typography>)}
                     */}

                </CardActions>
                <CardContent>
                    {isLoading && (
                        <Typography color='primary' variant='caption'>
                            Loading answers
                        </Typography>
                    )}
                    {data?.length ? (
                        <AnswerSection
                            answer={data[0]} challenge={challenge}
                        />
                    ) : null}
                    {!isLoading && !data?.length && (
                        <Typography variant='body2'>No answers yet</Typography>
                    )}
                </CardContent>
                {data?.length ? (<Grid container>
                    <Grid item>
                        <Button
                            onClick={AnsViewToggleOpen}
                            color='default'
                            size='small'
                            endIcon={
                                <ExpandMoreIcon
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: isAnsViewOpen,
                                    })}
                                />
                            }>
                            All Answers
                        </Button>
                    </Grid>
                </Grid>) : null}

                <Collapse in={isAnsViewOpen} timeout='auto' unmountOnExit>
                    <CardContent>
                        {isLoading && (
                            <Typography color='primary' variant='caption'>
                                Loading answers
                            </Typography>
                        )}
                        {data?.length ? (data.slice(1).map((answer: Answer) => {
                            return (
                                <AnswerSection
                                    key={answer._id}
                                    {...{ answer, challenge }}
                                />
                            );
                        })) : null}
                        {!isLoading && !data?.length && (
                            <Typography variant='body2'>No answers yet</Typography>
                        )}
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

export default ChallengeCard;

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
// import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import Collapse from '@material-ui/core/Collapse';
import Modal from '@material-ui/core/Modal';
// import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';

import CancelIcon from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// components
// import Rating from '../shared/Rating';
// import ReviewsSection from '../Reviews/ReviewsSection';
// import PdfViewer from '../shared/Pdf/PdfViewer';
import FormInput from '../shared/FormInput';
import AnswerSection from '../Answers/AnswerSection';

// types
import { Challenge, User, Answer } from '../../types';

// hooks
import useDisclosure from '../../hooks/useDisclosure';
import { useLocation } from 'react-router-dom';

// import { Link as RouterLink } from 'react-router-dom';
// import PdfThumbnail from '../shared/Pdf/PdfThumbnail';
import CreateCaseAnswer from './CreateCaseAnswer';
// import DeleteChallenge from './DeleteChallenge';
// import UpdateProject from '../Project/UpdateProject';
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
            marginBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
            borderRadius: 10,
            borderWidth: 5,
            borderColor: '#111111',
            elevation: 0,
            boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
            width: '100%',
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
            margin: '0 15px 10px 0',
            fontSize: 13,
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
    const [rating, setRating] = React.useState(0);
    const [num, setNum] = useState(1);
    const classes = useStyles();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const location = useLocation();
    const [typing, setTyping] = useState(false);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log("challesasasas", challenge);


    // view Answer Toggler
    const {
        isOpen: isAnsViewOpen,
        toggleOpen: AnsViewToggleOpen,
        onClose: onAnsViewClose,
    } = useDisclosure();

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
        },
    );

    useEffect(() => {
        refetch();
    }, [])

    useEffect(() => {
        console.log(num, 'i am in useeffect');
        refetch();
    }, [num]);

    const handleMoreAnswers = () => {
        setNum(num + 5);
    }

    // const handlePreviousAnswers = () => {
    //     setNum(num - 1);
    // }

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
            },
            onSettled: (data) => {
                if (data) {
                    onClose();
                }
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    // if (data?.length === 0 && num > 1) handlePreviousAnswers();


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
                    title={
                        <Typography variant='h4'>Question: {challenge.title}</Typography>
                    }
                    action={
                        <Box style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color='textSecondary' variant='caption'>
                                {format(
                                    new Date(challenge.createdAt!),
                                    'dd MMMM yyyy'
                                )}
                            </Typography>
                            {!isPublic && (
                                <>
                                    <div>
                                        <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                                            <MoreHorizIcon />
                                        </Button>
                                        <Menu
                                            id="fade-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={open}
                                            onClose={handleClose}
                                            TransitionComponent={Fade}
                                        >
                                            {!challenge.closeAnswers ? (<MenuItem onClick={onEndOpen}>End Challenge</MenuItem>) : <MenuItem style={{ cursor: 'not-allowed', color: 'gray' }}>Ended</MenuItem>}
                                            <MenuItem onClick={onUpdateOpen}>Edit Challenge</MenuItem>
                                        </Menu>
                                    </div>
                                </>
                            )}
                        </Box>
                    }
                />
                <CardContent className={classes.cardContent}>
                    <Grid container direction='row' className={classes.centered}>

                        <Grid
                            item
                            sm={12}
                            container
                            direction='column'
                            className={classes.collabBox}>
                            {challenge.description && (
                                <>
                                    <Grid item style={{
                                        marginBottom: 10
                                    }}>

                                        <Typography className={classes.description}>
                                            Description: {challenge.description}
                                        </Typography>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>

                {!challenge.closeAnswers ? (<CardActions>
                    {challenge.isCaseStudy ?
                        (<Button size="small" color="primary" onClick={onOpen}>
                            Add Project
                        </Button>) :
                        (
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
                                                            style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', alignItems: 'flex-end' }}>
                                                            <FormInput
                                                                multiline
                                                                name='text'
                                                                className={classes.comment}
                                                                fullWidth
                                                                placeholder={`Share your Answer...`}
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
                            </>
                        )}
                </CardActions>) : null}
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
                {/* {num > 1 &&
                    (<Button onClick={handlePreviousAnswers} style={{ textTransform: 'none' }}>
                        Load Previous answers.
                    </Button>)
                } */}

                {/* showing one answer immediately */}
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
                        num === 1 ?
                            (<Typography variant='body2'>No answers yet</Typography>) : (<Typography variant='body2'>No more answers</Typography>)
                    )}
                </CardContent >

                {challenge.closeAnswers ? (
                    <>
                        <Box color="text.primary" style={{ textAlign: 'center', marginBottom: 10 }}>
                            <Typography color='primary' variant='h4'>
                                This challenge has now ended!
                            </Typography>
                        </Box>
                    </>
                ) : null}

                {/* Loading more answers here */}
                {data?.length > 1 ? (<CardContent>
                    {isLoading && (
                        <Typography color='primary' variant='caption'>
                            Loading answers
                        </Typography>
                    )}

                    {
                        data.slice(1).map((answer: Answer) => {
                            return (
                                <AnswerSection
                                    key={answer._id}
                                    {...{ answer, challenge }}
                                />
                            );
                        })
                    }
                </CardContent>) : null}
                {data?.length !== challenge?.answers.length ?
                    (
                        <Box>
                            <Typography onClick={handleMoreAnswers} className={classes.loadMore}>
                                ..Load more answers
                            </Typography>
                        </Box>
                    ) : null
                }
            </Card>
        </>
    );
};

export default ChallengeCard;

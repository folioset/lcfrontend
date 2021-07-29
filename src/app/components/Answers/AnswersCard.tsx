import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { Challenge, Answer, User } from '../../types';
import Avatar from '../shared/Avatar';
import { format } from 'date-fns';
import PdfViewer from '../shared/Pdf/PdfViewer';
import PdfThumbnail from '../shared/Pdf/PdfThumbnail';
import { Box, Button, Grid, Hidden, IconButton, MenuItem, Modal } from '@material-ui/core';
import useDisclosure from '../../hooks/useDisclosure';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteAnswer from './DeleteAnswer';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Fade from '@material-ui/core/Fade';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormInput from '../shared/FormInput';
import axios from 'axios';
import { Form } from 'formik';

interface AnswerCardProps {
    answersData: Answer;
    challenge: Challenge;
    isPublic?: boolean;
    answer: Answer;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // marginBottom: theme.spacing(1),
            backgroundColor: theme.palette.grey['100'],
            // borderRadius: 10,
        },
        avatar: {
            backgroundColor: theme.palette.primary.main,
        },
        content: {
            justifyContent: 'center',
            marginLeft: 30,
            whiteSpace: 'pre-line',
        },
        comment: {
            '& fieldset': {
                borderRadius: 500,
            },
        },
        replyForm: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
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
        section: {
            alignItems: 'flex-end',
            padding: theme.spacing(0.5),
        },
        ratings: {
            display: 'flex',
        },
        // fullShow: {
        //     height: 'max-content'
        // },
        // halfShow: {
        //     fontSize: 16,
        //     height: 3 * 19.2,
        //     lineHeight: 'normal'
        // },
        readMore: {
            textAlign: 'end',
        }
    })
);

const AnswersCard: React.FC<AnswerCardProps> = ({ answersData, challenge, isPublic, answer }) => {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>('user')!;

    // get half answer answer by ID
    const { isLoading: isHalfAnswerLoading, data: answersHalfData } = useQuery<Answer>(
        ['half-answer', answer._id],
        async () => {
            const res = await axios({
                method: 'get',
                url: `/api/question/${challenge._id}/${answer._id}`,
            });
            return res.data;
        }
    );


    //menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [rated, setRated] = React.useState(false);
    const [rating, setRating] = React.useState('');
    const [typing, setTyping] = React.useState(false);
    const [showMore, setShowMore] = React.useState(false);


    // if (answersHalfData) handleHalf;
    // showMore ? setCurrAnswerDescription() : setCurrAnswerDescription("half answer");

    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose,
    } = useDisclosure();

    // Delete answer Toggler
    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose,
    } = useDisclosure();

    // Update answer Toggler
    const {
        isOpen: isUpdateOpen,
        onOpen: onUpdateOpen,
        onClose: onUpdateClose,
    } = useDisclosure();


    // const {
    //     isOpen: isModalOpen,
    //     onOpen: onModalOpen,
    //     onClose: onModalClose,
    // } = useDisclosure();

    // authorizing deletetion of answer
    if (user._id === challenge.createdBy._id) isPublic = false;


    // Update Rating
    const { mutate: addRating } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'PUT',
                // url: `/api/project/${project._id}/add-rating`,
                data,
            });
            return res.data;
        },
        // {
        //     onSuccess: async () => {
        //         console.log('success!');
        //         if (location.pathname === '/') {
        //             await queryClient.invalidateQueries('feedChall');
        //         } else {
        //             await queryClient.invalidateQueries(['all-answer', answersData.createdBy]);
        //         }
        //     },
        // }
    );

    const showRating = (value: any) => {
        setRating(value)
        addRating({ value: value } as any)
    }



    return (

        <>

            {/* {answersHalfData ? handleHalf : ""}
            {console.log(answersHalfData)
            } */}
            {/* Update answer */}
            {/* <Modal
                open={isUpdateOpen}
                onClose={onUpdateClose}
                aria-labelledby='project-file'
                aria-describedby='pdf file of the project'>
                <UpdateAnswer onClose={onUpdateClose} answer={answer} />
            </Modal> */}

            {/* Delete answer */}
            <Modal
                open={isDeleteOpen}
                onClose={onDeleteClose}
                aria-labelledby='challenge-file'
                aria-describedby='pdf file of the challenge'>
                <DeleteAnswer onClose={onDeleteClose} challenge={challenge} answersData={answersData} />
            </Modal>


            {/* Show answerData File */}
            {answersData?.projectFile ? (<Modal
                open={isModalOpen}
                onClose={onModalClose}
                aria-labelledby='project-file'
                aria-describedby='pdf file of the answerData'>
                <>
                    <Hidden only={['xl', 'lg', 'md', 'sm']}>
                        <Box className={classes.pdfCloseBtn}>
                            <IconButton onClick={onModalClose} color='inherit'>
                                <CancelIcon />
                            </IconButton>
                        </Box>
                    </Hidden>

                    <PdfViewer className={classes.pdf} filename={answersData?.projectFile} />

                </>
            </Modal>) : null}

            <Card elevation={0} className={classes.root}>
                <CardHeader
                    action={
                        <Box style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography
                                // style={{ paddingRight: 3 }}
                                color='textSecondary'
                                variant='caption'>
                                {/* {answersData?.createdAt} */}
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
                                            <MenuItem onClick={onUpdateOpen}>Edit answer</MenuItem>
                                            <MenuItem onClick={onDeleteOpen}>Delete asnwer</MenuItem>
                                        </Menu>
                                    </div>
                                </>
                            )}
                        </Box>
                    }
                    avatar={
                        <Avatar className={classes.avatar} src={answersData?.createdBy.profilePicture}>
                            {answersData?.createdBy.name.split('')[0]}
                        </Avatar>
                    }
                    title={
                        <Typography variant='body2' style={{ fontWeight: 500 }}>
                            {answersData?.createdBy.name}
                        </Typography>
                    }
                    subheader={
                        <Typography color='textSecondary' variant='caption'>
                            {answersData?.createdBy.about}
                        </Typography>
                    }
                />

                {answersData?.projectFile ? (<Grid sm={12} className={classes.content}>
                    <Grid item>
                        <PdfThumbnail file={answersData.projectFile} onClick={onModalOpen} />
                    </Grid>
                </Grid>) : null}

                <CardContent className={classes.content}>
                    {/* <Typography className={showMore ? classes.fullShow : classes.halfShow} variant="body1" color="textPrimary" component="p"> */}
                    <Typography variant="body1" color="textPrimary" component="p">
                        <Typography variant="subtitle1" color="textPrimary" component="p">
                            Answer :
                        </Typography>
                        {/* {answersData?.description} */}
                        {!showMore ? answersHalfData?.description : answersData?.description}
                    </Typography>
                    {/* {!showMore &&
                        (<Typography variant="body1" color="textPrimary" component="p">
                            read more
                        </Typography>)} */}
                </CardContent>
            </Card>
            {answersHalfData?.description !== answersData?.description ? (<Typography className={classes.readMore}>
                {!showMore ?
                    <Button style={{ textTransform: 'lowercase', backgroundColor: 'transparent' }} color="primary" onClick={() => { setShowMore(true) }}>...show more</Button> :
                    <Button style={{ textTransform: 'lowercase', backgroundColor: 'transparent' }} color="primary" onClick={() => { setShowMore(false) }}>...hide some</Button>}
            </Typography>) : null}
        </>
    );
};

export default AnswersCard;

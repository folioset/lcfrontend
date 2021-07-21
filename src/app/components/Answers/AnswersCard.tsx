import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { Challenge, Answer } from '../../types';
import Avatar from '../shared/Avatar';
import { format } from 'date-fns';
import PdfViewer from '../shared/Pdf/PdfViewer';
import PdfThumbnail from '../shared/Pdf/PdfThumbnail';
import { Box, Grid, Hidden, IconButton, Modal } from '@material-ui/core';
import useDisclosure from '../../hooks/useDisclosure';
import CancelIcon from '@material-ui/icons/Cancel';

interface AnswerCardProps {
    answersData: Answer;
}

// const initialValues = {

//     createdBy: {
//         profilePicture = "";
//     }
// }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(1),
            backgroundColor: theme.palette.grey['100'],
            borderRadius: 10,
        },
        avatar: {
            backgroundColor: theme.palette.primary.main,
        },
        content: {
            // marginTop: theme.spacing(3),
            // marginBottom: -10,
            justifyContent: 'center',
            // marginLeft: 50,
            fontSize: 15,
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
    })
);

const AnswersCard: React.FC<AnswerCardProps> = ({ answersData }) => {
    const classes = useStyles();
    // const [ansDeatils, setAnsDeatils] = React.useState<Answer>(null)
    // console.log("answerData from answer", answerData);

    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose,
    } = useDisclosure();



    return (

        <>
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
                        <Typography
                            style={{ paddingRight: 3 }}
                            color='textSecondary'
                            variant='caption'>
                            {/* {format(new Date(answersData?.updatedAt), 'dd MMMM yyyy')} */}
                            {answersData?.updatedAt}
                        </Typography>
                    }
                    // style={{ marginBottom: -40 }}
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
                    {/* {`${answersData.reviewDetails?.review}`.split('\n').map((el) => {
                    if (!el.length) {
                        return <br />;
                    }
                    return <Typography>{el}</Typography>;
                })} */}
                    <Typography variant="body1" color="textPrimary" component="p">
                        Answer : {answersData?.description}
                    </Typography>
                </CardContent>

            </Card>
        </>
    );
};

export default AnswersCard;

import * as React from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

// Material UI core
import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

// types
import { Answer, Challenge } from '../../types';

interface DeleteAnswerProps {
    challenge: Challenge;
    onClose: () => void;
    answersData: Answer;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        deleteConfirm: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
            padding: theme.spacing(3),

            [theme.breakpoints.down('sm')]: {
                width: '55%',
            },

            [theme.breakpoints.down('xs')]: {
                width: '90%',
            },
        },
        deleteConfirmBtns: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing(2),

            '& button': {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            },
        },
    };
});

const DeleteAnswer: React.FC<DeleteAnswerProps> = ({ onClose, challenge, answersData }) => {
    const queryClient = useQueryClient();
    const classes = useStyles();

    console.log(answersData);


    const { mutate: deleteAnswer, isLoading: isDeletingAnswer } = useMutation(
        async () => {
            const res = await axios({
                method: 'delete',
                url: `/api/question/${challenge._id}/${answersData._id}`,
            });
            return res.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('all-answer');
                onClose();
            },
            onError: (err) => {
                console.log(err);
            }
        }
    );

    return (
        <>
            <Paper className={classes.deleteConfirm}>
                <Typography>Are you sure you want to delete this answer ?</Typography>
                <Box className={classes.deleteConfirmBtns}>
                    <Button
                        disableElevation
                        onClick={() => deleteAnswer()}
                        variant='contained'
                        color='primary'
                        disabled={isDeletingAnswer}
                        startIcon={
                            isDeletingAnswer ? (
                                <CircularProgress size='small' style={{ color: 'white' }} />
                            ) : (
                                <DeleteIcon />
                            )
                        }>
                        Yes
                    </Button>
                    <Button variant='outlined' onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default DeleteAnswer;

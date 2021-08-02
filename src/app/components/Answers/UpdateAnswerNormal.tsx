import * as React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Form, Formik } from 'formik';

// material UI
import { Hidden, makeStyles, Paper, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// components
import FormInput from '../shared/FormInput';

// types
import { Answer, Challenge, Project } from '../../types';

interface UpdateAnswerProps {
    onClose: () => void;
    answersData: Answer;
    challenge: Challenge;
}

const validationSchema = Yup.object().shape({
    description: Yup.string()
        .notRequired()
        .max(1000, 'You can only enter a max of 1000 characters'),
});

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: () => {
            return {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%)`,
                padding: theme.spacing(3),
                backgroundColor: theme.palette.common.white,
                // width: 'max-content',
                maxWidth: 600,
            };
        },
        heading: {
            marginBottom: theme.spacing(2),
        },
    };
});



interface InitialValues {
    description: string;
}

const UpdateAnswer: React.FC<UpdateAnswerProps> = React.forwardRef(
    ({ onClose, challenge, answersData }) => {
        const classes = useStyles();
        const queryClient = useQueryClient();
        const { mutate, isLoading } = useMutation(
            (data) =>
                axios({
                    method: 'PUT',
                    url: `/api/question/${challenge._id}/${answersData._id}`,
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
            }
        );

        const initialValues: InitialValues = {
            description: answersData?.description,
        };

        // const [isUpdated, setIsUpdated] = React.useState<'yes' | 'no'>('no');

        // const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        //     setIsUpdated((event.target as HTMLInputElement).value as any);
        // };

        return (
            <>
                <Grid container className={classes.container}>
                    <Container>
                        <Typography
                            color='primary'
                            variant='h5'
                            className={classes.heading}>
                            Update this Answer
                        </Typography>
                        <Formik
                            onSubmit={async ({
                                description
                            }) => {
                                const data = {
                                    description
                                }

                                await mutate(data as any);
                            }}
                            initialValues={initialValues}
                            validationSchema={validationSchema}>
                            {() => {
                                return (
                                    <Form noValidate autoComplete='off'>
                                        <FormInput
                                            name='description'
                                            fullWidth
                                            multiline
                                            rows={10}
                                            variant='outlined'
                                            size='medium'
                                            label='Answer'
                                        />

                                        <Button
                                            type='submit'
                                            size='small'
                                            disabled={isLoading}
                                            startIcon={
                                                isLoading ? <CircularProgress size='1rem' /> : null
                                            }
                                            variant='contained'
                                            color='primary'>
                                            Update
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Container>
                </Grid>
            </>
        );
    }
);

export default UpdateAnswer;

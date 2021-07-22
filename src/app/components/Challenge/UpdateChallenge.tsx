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
import { Challenge, Project } from '../../types';
import useFileUpload from '../../hooks/useFileUpload';
import { PictureAsPdf } from '@material-ui/icons';
import FileUpload from '../shared/FileUpload';
import PdfViewer from '../shared/Pdf/PdfViewer';

interface UpdateChallengeProps {
    onClose: () => void;
    challenge: Challenge;
}

const SUPPORTED_FORMATS = ['application/pdf'];

const validationSchema = Yup.object().shape({
    title: Yup.string().required('project title is required'),
    description: Yup.string()
        .notRequired()
        .max(200, 'You can only enter a max of 200 characters'),
    file: Yup.mixed()
        .test(
            'fileFormat',
            'Unsupported Format. Please upload pdfs only',
            (value: File) => (value ? SUPPORTED_FORMATS.includes(value?.type) : true)
        )
        .notRequired(),
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
                width: 'max-content',
            };
        },
        heading: {
            marginBottom: theme.spacing(2),
        },
    };
});



interface InitialValues {
    title: string;
    description: string;
    isCaseStudy: boolean;
}

const UpdateChallenge: React.FC<UpdateChallengeProps> = React.forwardRef(
    ({ onClose, challenge }) => {
        const { fileUrl, handleUploadFileUrl } = useFileUpload();
        // const checkFile = fileUrl || challenge.projectFile;
        const classes = useStyles();
        const queryClient = useQueryClient();
        const { mutate, isLoading } = useMutation(
            (data) =>
                axios({
                    method: 'PUT',
                    url: `/api/question/${challenge._id}`,
                    data
                }),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('feedChall');
                },
                onSettled: (data) => {
                    if (data) {
                        onClose();
                    }
                },
            }
        );

        const initialValues: InitialValues = {
            title: challenge.title,
            description: challenge.description,
            isCaseStudy: challenge.isCaseStudy,
        };

        const [isUpdated, setIsUpdated] = React.useState<'yes' | 'no'>('no');

        const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsUpdated((event.target as HTMLInputElement).value as any);
        };

        return (
            <>
                <Grid container className={classes.container}>
                    <Container>
                        <Typography
                            color='primary'
                            variant='h5'
                            className={classes.heading}>
                            Update this challenge
                        </Typography>
                        <Formik
                            onSubmit={async ({
                                title,
                                description,
                                isCaseStudy,
                            }) => {
                                const data = {
                                    title: title,
                                    description: description,
                                    isCaseStudy: isCaseStudy,
                                }

                                await mutate(data as any);
                            }}
                            initialValues={initialValues}
                            validationSchema={validationSchema}>
                            {({ values, setFieldValue }) => {
                                return (
                                    <Form noValidate autoComplete='off'>
                                        <FormInput
                                            name='title'
                                            fullWidth
                                            variant='outlined'
                                            label='Project Title'
                                            size='small'
                                        />
                                        <FormInput
                                            name='description'
                                            fullWidth
                                            multiline
                                            rows={4}
                                            variant='outlined'
                                            size='small'
                                            label='Description'
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
                                            Update Challenge
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

export default UpdateChallenge;

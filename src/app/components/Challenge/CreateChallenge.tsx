import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Hidden,
    makeStyles,
    Paper,
    Switch,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import FormInput from '../shared/FormInput';
import FormGroup from '@material-ui/core/FormGroup';
// import { PictureAsPdf } from '@material-ui/icons';
// import FileUpload from '../shared/FileUpload';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
// import PdfViewer from '../shared/Pdf/PdfViewer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import useFileUpload from '../../hooks/useFileUpload';

interface CreateChallengeProps {
    onCloseChall: () => void;
    isCaseStudy?: boolean;
}

interface InitialValues {
    title: string;
    description: string;
    // isCaseStudy: boolean;
    // skills: string[];
}

const initialValues: InitialValues = {
    title: '',
    description: '',
    // isCaseStudy: false,
    // skills: [],
};

// const SUPPORTED_FORMATS = ['application/pdf'];

const validationSchema = Yup.object().shape({
    title: Yup.string().required('title statement is required!').max(30, 'You can only enter a max of 30 characters'),
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
                width: 'max-content',

                [theme.breakpoints.down('md')]: {
                    width: 'max-content',
                },

                [theme.breakpoints.down('xs')]: {
                    width: '90%',
                },
            };
        },
        heading: {
            marginBottom: theme.spacing(2),
        },
        // formRow: {
        //     justifyContent: 'flex-end',
        // }
    };
});

const SKILLS = [
    'User Research',
    'Market Research',
    'Competitive Analysis',
    'Business Strategy',
    'Go to Market Strategy',
    'Product Roadmapping',
    'Product Prioritization',
    'Writing User Stories',
    'Product Metrics',
    'Product Analytics',
    'Product Requirements Gathering',
    'User Experience Design',
];


// Create Challenge

const CreateChallenge: React.FC<CreateChallengeProps> = React.forwardRef(
    ({ onCloseChall, isCaseStudy }) => {
        // const [state, setState] = React.useState({
        //     isCaseStudy: false,
        // });
        // console.log(state);

        // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //     setState({ ...state, [event.target.name]: event.target.checked });
        // };

        const classes = useStyles();
        const queryClient = useQueryClient();
        const { mutate, isLoading } = useMutation(
            (data) =>
                axios({
                    method: 'POST',
                    url: `/api/question`,
                    data
                }),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('feedChall');
                },
                onSettled: (data) => {
                    if (data) {
                        onCloseChall();
                    }
                },
                onError: (err) => {
                    console.log(err);
                }
            }
        );

        return (
            <>
                <Grid container className={classes.container}>
                    <Grid item>
                        <Container>
                            <Typography
                                color='primary'
                                variant='h5'
                                className={classes.heading}>
                                Create Challenge
                            </Typography>
                            <Formik
                                onSubmit={async (
                                    // { title, description, skills },
                                    // { title, description, isCaseStudy },
                                    { title, description },
                                    { resetForm }
                                ) => {
                                    // const data = new FormData();
                                    // data.append('title', title);
                                    // data.append('description', description);
                                    // console.log(data);
                                    // data.append('isCaseStudy', JSON.stringify(state.checkedB));
                                    // data.append('skills', JSON.stringify(skills));
                                    const data = {
                                        title: title,
                                        description: description,
                                        isCaseStudy: isCaseStudy
                                    }

                                    await mutate(data as any);
                                    resetForm();
                                }}
                                initialValues={initialValues}
                                validationSchema={validationSchema}>
                                {/* {({ values, setFieldValue }) => { */}
                                {() => {
                                    return (
                                        <Form noValidate autoComplete='off'>
                                            <FormInput
                                                name='title'
                                                fullWidth
                                                variant='outlined'
                                                label='title'
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
                                            {/* <FormGroup row className={classes.formRow}>
                                                <FormControlLabel
                                                    control={<Switch checked={state.isCaseStudy} onChange={handleChange} name="isCaseStudy" />}
                                                    label="Case Study"
                                                />

                                            </FormGroup> */}
                                            <Button
                                                type='submit'
                                                size='small'
                                                startIcon={
                                                    isLoading ? <CircularProgress size='1rem' /> : null
                                                }
                                                disabled={isLoading}
                                                variant='contained'
                                                color='primary'>
                                                Create
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Container>
                    </Grid>
                </Grid>
            </>
        );
    }
);

export default CreateChallenge;

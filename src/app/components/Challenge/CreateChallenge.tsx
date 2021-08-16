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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface CreateChallengeProps {
    onCloseChall: () => void;
    isCaseStudy?: boolean;
}

interface InitialValues {
    title: string;
    description: string;
    skills: string[];
}

const initialValues: InitialValues = {
    title: '',
    description: '',
    skills: [],
};


const validationSchema = Yup.object().shape({
    title: Yup.string().required('title statement is required!').max(150, 'You can only enter a max of 150 characters'),
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
                onSettled: (data) => {
                    if (data) {
                        onCloseChall();
                    }
                    queryClient.invalidateQueries('feedChall');
                },
                onError: (err) => {
                    console.log(err);
                }
            }
        );

        return (
            <>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
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
                                    { title, description, skills },

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
                                        isCaseStudy: isCaseStudy,
                                        skills: skills
                                    }
                                    // console.log(data.skills);

                                    await mutate(data as any);
                                    resetForm();
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
                                            <Box mb={3}>
                                                <Autocomplete
                                                    multiple
                                                    id='skills-auto-complete'
                                                    options={SKILLS}
                                                    onChange={(e: React.ChangeEvent<{}>, value: any) => {
                                                        setFieldValue('skills', value);
                                                    }}
                                                    getOptionLabel={(option: any) => option}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            // fullWidth
                                                            style={{ maxWidth: '50vw' }}
                                                            variant='outlined'
                                                            name='skills'
                                                            size='small'
                                                            label='Skills'
                                                        />
                                                    )}
                                                />
                                            </Box>
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

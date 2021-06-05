import {
	Button,
	CircularProgress,
	Container,
	makeStyles,
	Paper,
	Theme,
	Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import FormInput from '../shared/FormInput';
import { PictureAsPdf } from '@material-ui/icons';
import FileUpload from '../shared/FileUpload';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface CreateProjectProps {
	onClose: () => void;
}

interface InitialValues {
	title: string;
	description: string;
	contributors: string;
	file: null | File;
}

const initialValues: InitialValues = {
	title: '',
	description: '',
	contributors: '',
	file: null,
};

const SUPPORTED_FORMATS = ['application/pdf'];

const validationSchema = Yup.object().shape({
	title: Yup.string().required('project title is required'),
	description: Yup.string()
		.required('project description is required')
		.max(200, 'You can only enter a max of 200 characters'),
	file: Yup.mixed()
		.required('your project file is required')
		.test(
			'fileFormat',
			'Unsupported Format. Please upload pdfs only',
			(value: File) => value && SUPPORTED_FORMATS.includes(value.type)
		),
});

const useStyles = makeStyles((theme: Theme) => {
	return {
		container: {
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
		heading: {
			marginBottom: theme.spacing(2),
		},
		fileUpload: {
			marginBottom: theme.spacing(3),
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
	};
});

const CreateProject: React.FC<CreateProjectProps> = React.forwardRef(
	({ onClose }) => {
		const classes = useStyles();
		const queryClient = useQueryClient();
		const { mutate } = useMutation(
			(data) =>
				axios({
					method: 'POST',
					url: `/api/project`,
					data,
				}),
			{
				onSuccess: () => {
					queryClient.invalidateQueries('my-projects');
				},
				onSettled: (data) => {
					if (data) {
						onClose();
					}
				},
			}
		);

		return (
			<>
				<Paper className={classes.container}>
					<Container>
						<Typography
							color='primary'
							variant='h5'
							className={classes.heading}>
							Create Project
						</Typography>
						<Formik
							onSubmit={async (
								{ title, description, contributors, file },
								{ resetForm }
							) => {
								const data = new FormData();
								data.append('title', title);
								data.append('description', description);
								data.append('contributors', contributors);
								if (file) {
									data.append('file', file);
								}
								await mutate(data as any);
								resetForm();
							}}
							initialValues={initialValues}
							validationSchema={validationSchema}>
							{({ values, isSubmitting }) => {
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

										<FileUpload
											name='file'
											filename={values.file?.name}
											icon={<PictureAsPdf />}
										/>

										<Autocomplete
											id='contributors-auto-complete'
											options={['user 1', 'user 2']}
											getOptionLabel={(option) => option}
											renderInput={(params) => (
												<FormInput
													{...params}
													name='contributors'
													fullWidth
													variant='outlined'
													size='small'
													label='Contributors'
												/>
											)}
										/>

										<Button
											type='submit'
											size='small'
											startIcon={
												isSubmitting ? (
													<CircularProgress
														size='small'
														style={{ color: 'white' }}
													/>
												) : null
											}
											variant='contained'
											color='primary'>
											Create Project
										</Button>
									</Form>
								);
							}}
						</Formik>
					</Container>
				</Paper>
			</>
		);
	}
);

export default CreateProject;

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Hidden,
	makeStyles,
	Paper,
	TextField,
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import PdfViewer from '../shared/Pdf/PdfViewer';
import useFileUpload from '../../hooks/useFileUpload';

interface CreateResumeProps {
	onCloseResume: () => void;
}

interface InitialValues {
	title: string;
	file: null | File;
}

const initialValues: InitialValues = {
	title: '',
	file: null,
	
};

const SUPPORTED_FORMATS = ['application/pdf'];

const validationSchema = Yup.object().shape({
	title: Yup.string().required('project title is required'),
	description: Yup.string()
		.notRequired()
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
		container: ({ imageUrl }: any) => {
			return {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: `translate(-50%, -50%)`,
				padding: theme.spacing(3),
				backgroundColor: theme.palette.common.white,
				width: imageUrl ? '75%' : 'max-content',

				[theme.breakpoints.down('md')]: {
					width: imageUrl ? '95%' : 'max-content',
				},

				[theme.breakpoints.down('xs')]: {
					width: '90%',
				},
			};
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
		pdfviewer: {
			'& > *': {
				height: '100%',
				width: '100%',
			},
		},
	};
});


const CreateResume: React.FC<CreateResumeProps> = React.forwardRef(
	({ onCloseResume }) => {
		const { fileUrl, handleUploadFileUrl } = useFileUpload();
		const classes = useStyles({ fileUrl });
		const queryClient = useQueryClient();

		const { mutate, isLoading } = useMutation(
			(data) =>
				axios({
					method: 'POST',
					url: `/api/uploadResume`,
					data,
				}),
			{
				onSuccess: () => {
					// queryClient.invalidateQueries('my-projects');
				},
				onSettled: (data) => {
					if (data) {
						onCloseResume();
					}
				},
			}
		);

		const { isLoading: isUsersLoading, data: users } = useQuery(
			'all-users',
			async (data) => {
				const res = await axios({
					method: 'GET',
					url: `/api/users`,
					data,
				});
				return res.data;
			}
		);

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item lg={fileUrl ? 5 : 12} md={fileUrl ? 6 : 12} xs={12}>
						<Container>
							<Typography
								color='primary'
								variant='h5'
								className={classes.heading}>
								Create Project
							</Typography>
							<Formik
								onSubmit={async (
									{ title, file },
									{ resetForm }
								) => {
									const data = new FormData();
									data.append('title', title);
									if (file) {
										data.append('file', file);
									}

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
												label='Project Title'
												size='small'
											/>
											<FileUpload
												name='file'
												onChange={handleUploadFileUrl}
												filename={values.file?.name}
												icon={<PictureAsPdf />}
											/>
											<Button
												type='submit'
												size='small'
												startIcon={
													isLoading ? <CircularProgress size='1rem' /> : null
												}
												disabled={isLoading}
												variant='contained'
												color='primary'>
												Submit Resume
											</Button>
										</Form>
									);
								}}
							</Formik>
						</Container>
					</Grid>
					{fileUrl && (
						<Grid item lg={7} md={6} xs={12}>
							<Hidden only={['sm', 'xs']}>
								<Paper
									className={classes.pdfviewer}
									style={{ height: 400, width: '100%' }}>
									{fileUrl && <PdfViewer filename={fileUrl} />}
								</Paper>
							</Hidden>
						</Grid>
					)}
				</Grid>
			</>
		);
	}
);

export default CreateResume;

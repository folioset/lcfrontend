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

// components
import FormInput from '../../shared/FormInput';

// types
import { Project } from '../../../types';
import useFileUpload from '../../../hooks/useFileUpload';
import { PictureAsPdf } from '@material-ui/icons';
import FileUpload from '../../shared/FileUpload';
import PdfViewer from '../../shared/Pdf/PdfViewer';

interface UpdateProjectProps {
	onClose: () => void;
	project: Project;
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
		container: ({ checkFile }: any) => {
			return {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: `translate(-50%, -50%)`,
				padding: theme.spacing(3),
				backgroundColor: theme.palette.common.white,
				width: checkFile ? '75%' : 'max-content',

				[theme.breakpoints.down('md')]: {
					width: checkFile ? '95%' : 'max-content',
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

const TOOLS = [
	'Figma',
	'Adobe XD',
	'Balsamiq',
	'Google Analytics',
	'Heap',
	'Mixpanel',
	'Amplitude',
	'JIRA',
];

interface InitialValues {
	title: string;
	description: string;
	contributors: any;
	file: null | File;
	tools: string[];
	skills: string[];
}

const UpdateProject: React.FC<UpdateProjectProps> = React.forwardRef(
	({ onClose, project }) => {
		const { fileUrl, handleUploadFileUrl } = useFileUpload();
		const checkFile = fileUrl || project.projectFile;
		const classes = useStyles({ checkFile });
		const queryClient = useQueryClient();
		const { mutate, isLoading } = useMutation(
			(data) =>
				axios({
					method: 'PUT',
					url: `/api/project/${project._id}`,
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

		const { data: users } = useQuery('all-users', async () => {
			const res = await axios({
				method: 'GET',
				url: `/api/users`,
			});
			return res.data;
		});

		const initialValues: InitialValues = {
			title: project.title,
			description: project.description,
			contributors: project.contributors.length > 0 ? project.contributors : [],
			file: null,
			skills: project.skills || [],
			tools: project.tools || [],
		};

		console.log(initialValues);

		return (
			<>
				<Grid container className={classes.container}>
					<Grid
						lg={fileUrl || project.projectFile ? 5 : 12}
						md={fileUrl || project.projectFile ? 6 : 12}
						xs={12}>
						<Container>
							<Typography
								color='primary'
								variant='h5'
								className={classes.heading}>
								Update this Project
							</Typography>
							<Formik
								onSubmit={async ({
									title,
									description,
									contributors,
									file,
									skills,
									tools,
								}) => {
									const data = new FormData();
									data.append('title', title);
									data.append('description', description);
									data.append('contributors', JSON.stringify(contributors));
									data.append('skills', JSON.stringify(skills));
									data.append('tools', JSON.stringify(tools));
									if (file) {
										data.append('file', file);
									}
									await mutate(data as any);
								}}
								initialValues={initialValues}
								validationSchema={validationSchema}>
								{({ values, isSubmitting, setFieldValue }) => {
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
												onChange={handleUploadFileUrl}
												filename={values?.file?.name}
												icon={<PictureAsPdf />}
											/>
											<Box mb={3} mt={3}>
												{users && (
													<Autocomplete
														multiple
														id='contributors-auto-complete'
														options={users}
														defaultValue={[...project.contributorDetailsArr!]}
														onChange={(
															e: React.ChangeEvent<{}>,
															value: any
														) => {
															const getId = () =>
																value.map((el: any) => el.id ?? el._id);
															setFieldValue('contributors', getId());
														}}
														getOptionLabel={(option: any) => option?.name}
														renderInput={(params) => (
															<TextField
																{...params}
																fullWidth
																variant='outlined'
																name='contributors'
																size='small'
																label='Contributors'
															/>
														)}
													/>
												)}
											</Box>

											<Box mb={3}>
												<Autocomplete
													multiple
													id='skills-auto-complete'
													options={SKILLS}
													defaultValue={[...project.skills]}
													onChange={(e: React.ChangeEvent<{}>, value: any) => {
														setFieldValue('skills', value);
													}}
													getOptionLabel={(option: any) => option}
													renderInput={(params) => (
														<TextField
															{...params}
															fullWidth
															variant='outlined'
															name='skills'
															size='small'
															label='Skills'
														/>
													)}
												/>
											</Box>

											<Box mb={3}>
												<Autocomplete
													multiple
													defaultValue={[...project.tools]}
													id='tools-auto-complete'
													options={TOOLS}
													onChange={(e: React.ChangeEvent<{}>, value: any) => {
														setFieldValue('tools', value);
													}}
													getOptionLabel={(option: any) => option}
													renderInput={(params) => (
														<TextField
															{...params}
															fullWidth
															variant='outlined'
															name='tools'
															size='small'
															label='Tools'
														/>
													)}
												/>
											</Box>

											<Button
												type='submit'
												size='small'
												disabled={isLoading}
												startIcon={
													isLoading ? (
														<CircularProgress color='primary' size='small' />
													) : null
												}
												variant='contained'
												color='primary'>
												Update Project
											</Button>
										</Form>
									);
								}}
							</Formik>
						</Container>
					</Grid>
					<Grid item lg={7} md={6} xs={12}>
						<Hidden only={['sm', 'xs']}>
							<Paper
								className={classes.pdfviewer}
								style={{ height: 400, width: '100%' }}>
								{(fileUrl || project.projectFile) && (
									<PdfViewer filename={fileUrl || project.projectFile} />
								)}
							</Paper>
						</Hidden>
					</Grid>
				</Grid>
			</>
		);
	}
);

export default UpdateProject;

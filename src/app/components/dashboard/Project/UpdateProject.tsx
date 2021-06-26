import * as React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Form, Formik } from 'formik';

// material UI
import { makeStyles, Theme } from '@material-ui/core';
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

interface UpdateProjectProps {
	onClose: () => void;
	project: Project;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required('project title is required'),
	description: Yup.string()
		.notRequired()
		.max(200, 'You can only enter a max of 200 characters'),
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

const UpdateProject: React.FC<UpdateProjectProps> = React.forwardRef(
	({ onClose, project }) => {
		const classes = useStyles();
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

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item lg={12} md={12} xs={12}>
						<Container>
							<Typography
								color='primary'
								variant='h5'
								className={classes.heading}>
								Update this Project
							</Typography>
							<Formik
								onSubmit={async ({ title, description, contributors }) => {
									const data = {
										title,
										description,
										contributors,
									};
									await mutate(data as any);
								}}
								initialValues={{
									title: project.title,
									description: project.description,
									contributors: project.contributors
										? project.contributors.map((el: any) => el)
										: [],
								}}
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
											<Box mb={2}>
												{users && (
													<Autocomplete
														multiple
														id='contributors-auto-complete'
														options={users}
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
				</Grid>
			</>
		);
	}
);

export default UpdateProject;

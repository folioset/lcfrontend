import {
	Box,
	Button,
	Container,
	IconButton,
	makeStyles,
	Paper,
	Theme,
	Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import * as React from 'react';
import FormInput from '../shared/FormInput/FormInput';
import BackupIcon from '@material-ui/icons/Backup';
import { PictureAsPdf } from '@material-ui/icons';

interface CreateProjectProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		container: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: `translate(-50%, -50%)`,
			padding: theme.spacing(3),
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

const CreateProject: React.FC<CreateProjectProps> = () => {
	const classes = useStyles();

	return (
		<>
			<Paper className={classes.container}>
				<Container>
					<Typography color='primary' variant='h5' className={classes.heading}>
						Create Project
					</Typography>
					<Formik
						onSubmit={() => {}}
						initialValues={{
							title: '',
							description: '',
							contributors: '',
						}}>
						{() => (
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
									variant='outlined'
									size='small'
									label='Description'
								/>

								<Box className={classes.fileUpload}>
									<Button
										startIcon={<BackupIcon />}
										variant='outlined'
										size='small'
										htmlFor='file'
										component='label'>
										Upload File
									</Button>
									<input
										style={{ display: 'none' }}
										id='file'
										name='file'
										type='file'
									/>
									<Box>
										<Typography variant='caption'>filename.pdf</Typography>
										<IconButton color='primary'>
											<PictureAsPdf />
										</IconButton>
									</Box>
								</Box>

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

								<Button size='small' variant='contained' color='primary'>
									Create Project
								</Button>
							</Form>
						)}
					</Formik>
				</Container>
			</Paper>
		</>
	);
};

export default CreateProject;

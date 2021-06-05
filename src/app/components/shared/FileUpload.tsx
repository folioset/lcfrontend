import {
	Box,
	Button,
	Typography,
	IconButton,
	makeStyles,
	Theme,
} from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import * as React from 'react';
import { FieldAttributes, useField } from 'formik';

type FileUploadProps = FieldAttributes<{}> &
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> & {
		filename?: string;
		icon: React.ReactNode;
	};

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

const FileUpload: React.FC<FileUploadProps> = ({
	filename,
	icon,
	...props
}) => {
	const classes = useStyles();
	const [
		{ value, name, onChange, ...field },
		{ touched, error },
		{ setValue },
	] = useField(props);

	return (
		<Box className={classes.fileUpload}>
			<Box>
				<Button
					startIcon={<BackupIcon />}
					variant='outlined'
					size='small'
					htmlFor={name}
					component='label'>
					Upload File
				</Button>
				<small
					style={{
						display: 'block',
						marginTop: 10,
						color: 'red',
						marginLeft: 15,
					}}>
					{touched && error && error}
				</small>
			</Box>
			<input
				id={name}
				name={name}
				style={{ display: 'none' }}
				type='file'
				onChange={(e) => {
					if (e.target.files) {
						setValue(e.target.files[0]);
					}
				}}
				{...field}
			/>
			<Box>
				<Typography variant='caption'>{filename}</Typography>
				<IconButton color='primary'>{icon}</IconButton>
			</Box>
		</Box>
	);
};

export default FileUpload;

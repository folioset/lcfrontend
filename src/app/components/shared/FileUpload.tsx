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
		icon?: React.ReactNode;
	};

const useStyles = makeStyles((theme: Theme) => {
	return {
		fileUpload: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
		},
	};
});

const FileUpload: React.FC<FileUploadProps> = ({
	filename,
	icon,
	onChange: onExtraChange,
	required,
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
					variant='contained'
					size='small'
					htmlFor={name}
					component='label'>
				    Change Profile Picture
				</Button>
				<small
					style={{
						display: 'block',
						color: 'red',
					}}>
					{touched && error && error}
				</small>
			</Box>
			<input
				id={name}
				name={name}
				required={required}
				style={{ display: 'none' }}
				type='file'
				onChange={(e) => {
					if (e.target.files) {
						setValue(e.target.files[0]);

						if (onExtraChange) {
							onExtraChange(e);
						}
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

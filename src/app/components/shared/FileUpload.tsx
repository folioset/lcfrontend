import {
	Box,
	Button,
	Typography,
	IconButton,
	makeStyles,
	Theme,
} from '@material-ui/core';
import * as React from 'react';
import { FieldAttributes, useField } from 'formik';

type FileUploadProps = FieldAttributes<{}> &
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> & {
		filename?: string;
		btnText?: string;
		icon?: React.ReactNode;
	};

const useStyles = makeStyles((theme: Theme) => {
	return {
		fileUpload: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		},
	};
});

const FileUpload: React.FC<FileUploadProps> = ({
	filename,
	btnText = 'upload file',
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
					{btnText}
				</Button>
				<Box
					component='small'
					style={{
						display: 'block',
						color: 'red',
					}}>
					{touched && error && error}
				</Box>
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

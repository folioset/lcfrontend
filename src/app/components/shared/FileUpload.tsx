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

interface FileUploadProps {
	error?: string;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
	filename?: string;
	icon: React.ReactNode;
}

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
	error,
	filename,
	setFieldValue,
	icon,
}) => {
	const classes = useStyles();

	return (
		<Box className={classes.fileUpload}>
			<Box>
				<Button
					startIcon={<BackupIcon />}
					variant='outlined'
					size='small'
					htmlFor='file'
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
					{error && error}
				</small>
			</Box>
			<input
				style={{ display: 'none' }}
				id='file'
				name='file'
				type='file'
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setFieldValue('file', event.target!.files![0]);
				}}
			/>
			<Box>
				<Typography variant='caption'>{filename}</Typography>
				<IconButton color='primary'>{icon}</IconButton>
			</Box>
		</Box>
	);
};

export default FileUpload;

import { makeStyles, Theme, createStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import { FieldAttributes, useField } from 'formik';
import * as React from 'react';

type FormSelectProps = FieldAttributes<{}> & SelectProps;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			marginBottom: theme.spacing(2),
			width: '100%',
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	})
);

const FormSelect: React.FC<FormSelectProps> = ({
	children,
	label,
	...props
}) => {
	const [field, { touched, error }] = useField(props);
	const classes = useStyles();

	return (
		<>
			<FormControl variant='filled' className={classes.formControl}>
				<InputLabel id='demo-simple-select-filled-label'>{label}</InputLabel>
				<Select
					labelId='demo-simple-select-filled-label'
					id='demo-simple-select-filled'
					{...field}>
					{children}
				</Select>
				<small
					style={{
						display: 'block',
						marginTop: 10,
						color: 'red',
						marginLeft: 15,
					}}>
					{touched && error && error}
				</small>
			</FormControl>
		</>
	);
};

export default FormSelect;

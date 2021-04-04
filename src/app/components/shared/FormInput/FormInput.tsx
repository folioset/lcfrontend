import * as React from 'react';
import { Field, FieldAttributes, useField } from 'formik';

// Material UI
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

// styles
const useStyles = makeStyles((theme) => {
	return {
		textField: {
			marginBottom: theme.spacing(3),
		},
	};
});

const FormInput: React.FC<FieldAttributes<{}> & TextFieldProps> = (props) => {
	const [field, { touched, error }] = useField(props);
	const classes = useStyles();

	return (
		<Field
			className={classes.textField}
			as={TextField}
			error={touched && !!error}
			helperText={touched && !!error ? error : ''}
			{...field}
			{...props}
		/>
	);
};

export default FormInput;

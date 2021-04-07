import * as React from 'react';

// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components
import FormInput from '../../../components/shared/FormInput/FormInput';

// styles
const useStyles = makeStyles((theme) => {
	return {
		container: {
			minHeight: '70vh',
			flexDirection: 'column',
			display: 'flex',
			alignItems: 'center',

			'& h4': {
				textAlign: 'center',
				marginBottom: theme.spacing(10),
				marginTop: theme.spacing(4),
			},
		},
	};
});

interface Props {}

const AdditionalDetails: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography variant='h4'>Contact Information</Typography>

			<Container>
				<FormInput
					fullWidth
					variant='filled'
					multiline
					rows={6}
					required
					name='about'
					label='What can others talk to you about?'
					placeholder={`My experience designing large-scale software systems at Microsoft.\n\nNote: If you are a student, you can share something specific that you have knowledge in,\nthat others might be interested in knowing.`}
				/>
			</Container>
		</Box>
	);
};

export default AdditionalDetails;

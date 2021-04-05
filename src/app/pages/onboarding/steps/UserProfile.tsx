import * as React from 'react';

// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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
			justifyContent: 'center',

			'& h4': {
				textAlign: 'center',
				marginBottom: theme.spacing(4),
			},
		},
	};
});

interface Props {
	// setValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfile: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography variant='h4'>User Profile</Typography>
			<Container>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<FormInput
							disabled
							fullWidth
							variant='outlined'
							label='Name'
							name='name'
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<FormInput
							disabled
							fullWidth
							variant='outlined'
							label='Email'
							name='email'
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<FormInput
							fullWidth
							variant='filled'
							label='LinkedIn'
							name='linkedinUrl'
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<FormInput
							fullWidth
							variant='filled'
							multiline
							rows={5}
							required
							name='about'
							label='Tell us about yourself'
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default UserProfile;

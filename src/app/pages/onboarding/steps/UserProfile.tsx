import * as React from 'react';

// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components
import FormInput from '../../../components/shared/FormInput';

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

const UserProfile: React.FC = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography variant='h4'>User Profile</Typography>
			<Container>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<FormInput
							fullWidth
							variant='filled'
							label='LinkedIn'
							name='linkedinUrl'
							required
							helperText='If you are on mobile, you can find this url by going to the Linkedin app -> View Profile -> Scrolling down on your profile -> In the Contact section, you will find your profile’s url which you can copy-paste here'
						/>
					</Grid>

					<Grid item md={1} xs={2}>
						<FormInput disabled variant='outlined' name='code' />
					</Grid>

					<Grid item md={11} xs={10}>
						<FormInput
							fullWidth
							variant='filled'
							label='Phone Number'
							name='phoneNumber'
							required
						/>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default UserProfile;

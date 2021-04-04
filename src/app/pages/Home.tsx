import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		grid: {
			height: '93vh',
		},
		registerForm: {
			width: '75%',
			display: 'flex',
			marginTop: theme.spacing(5),

			'& div': {
				flexGrow: 1,
			},
		},
		googleRegister: {
			width: '75%',
			marginTop: theme.spacing(2),

			'& p': {
				textAlign: 'center',
				marginBottom: theme.spacing(2),
			},
		},
		googleRegister__btns: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',

			'& p': {
				marginBottom: 0,
			},

			'& a': {
				cursor: 'pointer',
			},
		},
	};
});

const Home: React.FC = () => {
	const classes = useStyles();

	return (
		<Container>
			<Grid alignItems='center' spacing={4} container className={classes.grid}>
				<Grid item lg={6}>
					<Typography variant='h3' component='h1'>
						Please Register or Login to Continue
					</Typography>
					<Box className={classes.registerForm}>
						<TextField size='small' variant='outlined' label='Email' />
						<Button color='primary' variant='outlined'>
							Get Started
						</Button>
					</Box>
					<Box className={classes.googleRegister}>
						<Typography>OR</Typography>
						<Box className={classes.googleRegister__btns}>
							<Button
								href='/api/auth/google'
								color='secondary'
								variant='outlined'>
								Sign Up With google
							</Button>
							&nbsp;
							<Typography color='textSecondary' variant='body2'>
								Already a Member ?{' '}
								<Link component={RouterLink} to='/auth/login' color='secondary'>
									Login
								</Link>
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item lg={6}>
					<Typography></Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;

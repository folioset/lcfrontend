import * as React from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';
// import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import useAuthRoute from '../hooks/useAuthRoute';

import { ReactComponent as SvgBackground } from './../../assets/home.svg';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		grid: {
			height: '93vh',
		},
		gridHeading: {
			[theme.breakpoints.down('xl')]: {
				marginTop: theme.spacing(12),
				marginBottom: theme.spacing(5),
			},

			[theme.breakpoints.down('sm')]: {
				marginTop: theme.spacing(8),
				marginBottom: theme.spacing(5),

				'& h1': {
					fontSize: 40,
				},
			},

			[theme.breakpoints.down('xs')]: {
				'& h1': {
					fontSize: 30,
				},
			},
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
	useAuthRoute('not-protected');
	const classes = useStyles();

	return (
		<Container>
			<Grid alignItems='center' spacing={4} container className={classes.grid}>
				<Grid item lg={6} xs={12} className={classes.gridHeading}>
					<Typography variant='h3' component='h1'>
						Please Register or Login to Continue
					</Typography>
					<Box mt={2}>
						<Typography variant='subtitle1'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
							voluptates expedita, maiores sed asperiores vel non voluptas.
						</Typography>
					</Box>

					<Box mt={4}>
						<Button
							href='/api/auth/google'
							color='secondary'
							variant='outlined'>
							Continue With google
						</Button>
					</Box>
					{/* <Box className={classes.registerForm}>
						<TextField size='small' variant='outlined' label='Email' />
						<Button color='primary' variant='outlined'>
							Get Started
						</Button>
					</Box> */}
					{/* <Box className={classes.googleRegister}>
						<Typography>OR</Typography>
						<Box className={classes.googleRegister__btns}>
							<Button
								href='/api/auth/google'
								color='secondary'
								variant='outlined'>
								Continue With google
							</Button>
							&nbsp;
							<Typography color='textSecondary' variant='body2'>
								Already a Member ?{' '}
								<Link component={RouterLink} to='/auth/login' color='secondary'>
									Login
								</Link>
							</Typography>
						</Box>
					</Box> */}
				</Grid>
				<Grid item lg={6} xs={12}>
					<SvgBackground style={{ maxWidth: '100%', height: '100%' }} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;

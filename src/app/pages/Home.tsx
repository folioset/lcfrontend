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

// import { ReactComponent as SvgBackground } from './../../assets/home.svg';
// import theme from '../theme';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		grid: {
			height: '93vh',
			'& > *': {
				padding: theme.spacing(6),

				[theme.breakpoints.down('sm')]: {
					padding: theme.spacing(2),
				},
			},
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
			<Grid alignItems='center' container className={classes.grid}>
				<Grid item lg={6} xs={12} className={classes.gridHeading}>
					<Typography variant='h3' component='h1'>
						Have 1:1 calls with experts in your field
					</Typography>
					<Box mt={2}>
						<Typography variant='subtitle1'>
							"Learn from others' experiences!""
						</Typography>
					</Box>

					<Box mt={4}>
						<Button
							href='/api/auth/google'
							color='secondary'
							variant='outlined'>
							Signup With google
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
					<Box mt={3}>
						<Typography color='textSecondary' variant='h5'>
							Our community works on the concept of
						</Typography>
						<Box>
							<Typography color='primary' variant='h5' component='span'>
								“Giving & Receiving”{' '}
							</Typography>
							<Typography color='textSecondary' variant='h5' component='span'>
								where:
							</Typography>
						</Box>
					</Box>
					<Box mt={3}>
						<Typography variant='h6'>
							<Typography color='primary' variant='h5'>
								Call 1 (Receiving)
							</Typography>
							<Typography variant='h6' component='span'>
								You will get matched with experienced folks in any field you are
								interested in -
								{/* {' '}
								Get matched with experienced folks in any <br />
								field you are interested in */}
							</Typography>
							<Typography variant='subtitle1' component='span'>
								{' '}
								where you can ask them about their experiences and get career
								guidance or even just read articles together and discuss trends
								in the field.
							</Typography>
						</Typography>
						<Box my={2}>
							<Typography color='primary' variant='h5'>
								Call 2 (Giving):
							</Typography>
							<Typography variant='h6' component='span'>
								You will get matched with someone who can learn something from
								you -
							</Typography>
							<Typography variant='subtitle1' component='span'>
								{' '}
								where you can have discussions about something you have
								knowledge about.
							</Typography>
						</Box>
						<Typography variant='h6'>
							<Typography color='primary' variant='h5'>
								Call 3 Onwards:
							</Typography>
							<Typography variant='h6'>Cycle continues</Typography>
						</Typography>
					</Box>
					{/* <SvgBackground style={{ maxWidth: '100%', height: '100%' }} /> */}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;

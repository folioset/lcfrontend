import * as React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Hooks
import useAuthRoute from '../hooks/useAuthRoute';

// Assets
import { ReactComponent as SvgBackground } from '../../assets/home.svg';

// Styles
const useStyles = makeStyles((theme) => {
	return {
		grid: {
			height: '90vh',
			'& > *': {
				padding: theme.spacing(4),

				[theme.breakpoints.down('sm')]: {
					padding: theme.spacing(2),
				},

				[theme.breakpoints.down('xs')]: {
					padding: theme.spacing(1),
				},
			},
		},
		mainHeading: {
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(4),
				fontSize: 40,
			},

			[theme.breakpoints.down('sm')]: {
				fontSize: 30,
			},

			[theme.breakpoints.down('xs')]: {
				fontSize: 28,
			},
		},
		googleBtn: {
			color: theme.palette.common.white,
			textTransform: 'capitalize',
		},
		subHeading: {
			[theme.breakpoints.down('xs')]: {
				fontSize: 15,
			},
		},
	};
});

const Home: React.FC = () => {
	useAuthRoute('not-protected', '/dashboard');
	const classes = useStyles();

	return (
		<Container maxWidth='xl'>
			<Grid
				alignItems='center'
				justify='center'
				container
				className={classes.grid}>
				<Grid item lg={6} xs={12}>
					<Box ml={'-5px'}>
						<Typography
							className={classes.mainHeading}
							variant='h4'
							component='h1'
							style={{ fontWeight: 'bold' }}>
							Join the Exclusive Community of Product Managers Learning
							Together!
						</Typography>
					</Box>

					<Box mt={2}>
						<Typography className={classes.subHeading} variant='subtitle1'>
							Get matched with 2 PMs from our community every week <br />
							and read articles, solve cases, discuss trends together.
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography
							style={{ fontWeight: 'bold' }}
							variant='subtitle1'
							color='primary'>
							Network. Learn. Grow.
						</Typography>
					</Box>

					<Box mt={2}>
						<Button
							className={classes.googleBtn}
							href='/api/auth/google'
							color='primary'
							variant='contained'>
							Sign Up with Google
						</Button>
					</Box>
				</Grid>
				<Grid item lg={4} xs={12}>
					<SvgBackground style={{ maxWidth: '100%', height: '100%' }} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;

import * as React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CreateIcon from '@material-ui/icons/Create';

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
			fontWeight: 'bold',
			[theme.breakpoints.down('sm')]: {
				fontSize: 30,
			},

			[theme.breakpoints.down('xs')]: {
				fontSize: 28,
			},
		},
		googleBtn: {
			color: theme.palette.common.black,
			textTransform: 'capitalize',
		},
		subHeading: {
			
		},
		subHeadingContainer: {
			display: 'flex',
			alignItems: 'center',
		},
		subHeadingIcon: {
			marginRight: 10,
		},
		svgBg: {
			maxWidth: '100%',
			height: '100%',
		},
	};
});

const Home: React.FC = () => {
	const classes = useStyles();

	return (
		<Container maxWidth='xl'>
			<Grid
				alignItems='center'
				justify='center'
				container
				className={classes.grid}>
				<Grid item lg={8} md={8} sm={8} xs={12}>
					<Box>
						<Typography
							className={classes.mainHeading}
							variant='h3'
							component='h1'>
							Showcase your Product Skills. Get noticed!
						</Typography>
					</Box>

					<Box mt={4} className={classes.subHeadingContainer}>
						<ForumIcon
							fontSize='small'
							className={classes.subHeadingIcon}
							color='primary'
						/>
						<Typography className={classes.subHeading} variant='subtitle1'>
							Join an exclusive community of product professionals!
						</Typography>
					</Box>

					<Box mt={1} className={classes.subHeadingContainer}>
						<EmojiObjectsIcon
							fontSize='small'
							className={classes.subHeadingIcon}
							color='primary'
						/>
						<Typography className={classes.subHeading} variant='subtitle1'>
							Showcase your Product thinking. Build your Portfolio.
						</Typography>
					</Box>

					<Box mt={1} className={classes.subHeadingContainer}>
						<CreateIcon
							fontSize='small'
							className={classes.subHeadingIcon}
							color='primary'
						/>
						<Typography className={classes.subHeading} variant='subtitle1'>
							Give and Receive Feedback. Learn from the community.
						</Typography>
					</Box>

					<Box mt={4}>
						<Button
							style={{ marginRight: 20 }}
							className={classes.googleBtn}
							href='/api/auth/google'
							color='primary'
							variant='contained'>
							Sign In with Google
						</Button>

						<Button
							className={classes.googleBtn}
							href='/api/auth/linkedin'
							color='primary'
							variant='contained'>
							Sign In with Linkedin
						</Button>
					</Box>
				</Grid>
				<Grid item lg={4} md={4} sm={4} xs={12}>
					<SvgBackground className={classes.svgBg} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;

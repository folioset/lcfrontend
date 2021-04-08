import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Logo from './../../../assets/logo.png';

// MUI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Components
import StepperContent from './StepperContent';
import StepperIcon from '../../components/onboarding/StepperIcon';
import StepConnector from '../../components/onboarding/StepConnector';

// hooks
import useAuthRoute from './../../hooks/useAuthRoute';

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			position: 'relative',

			[theme.breakpoints.down('md')]: {
				padding: `${theme.spacing(3)}px 0`,
			},

			[theme.breakpoints.down('sm')]: {
				padding: 0,
				paddingTop: theme.spacing(1),
				paddingBottom: theme.spacing(1),
			},
		},
		brand: {
			padding: theme.spacing(3),
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center',
			},
		},
		stepper: {
			[theme.breakpoints.down('lg')]: {
				marginBottom: theme.spacing(3),
			},

			[theme.breakpoints.down('sm')]: {
				padding: 0,
				paddingTop: theme.spacing(2),
				marginBottom: theme.spacing(4),
			},
		},

		backButton: {
			marginRight: theme.spacing(1),
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		btns: {
			textAlign: 'right',
		},
	})
);

function getSteps() {
	return [
		{ label: 'Desired Matches' },
		{ label: 'Objectives' },
		{ label: 'Experience' },
		{ label: 'About You' },
	];
}

export default function OnBoarding() {
	useAuthRoute();
	const history = useHistory();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	React.useEffect(() => {
		if (!user) {
			return history.replace('/');
		}
	}, [user, history]);

	React.useEffect(() => {
		if (activeStep === steps.length) {
			return history.replace('/dashboard/schedule');
		}
	}, [activeStep, history, steps]);

	return (
		<div className={classes.root}>
			<Box
				className={classes.brand}
				display='flex'
				alignItems='center'
				justifyContent='center'
				onClick={() => (user ? history.push('/dashboard') : history.push('/'))}>
				<img
					style={{
						maxWidth: '100%',
						height: 70,
						paddingTop: 2,
						marginRight: 6,
					}}
					src={Logo}
					alt='logo'
				/>
				<Typography variant='h5'>Learning Circle</Typography>
			</Box>
			<Stepper
				connector={<StepConnector />}
				className={classes.stepper}
				activeStep={activeStep}
				alternativeLabel>
				{steps.map(({ label }) => (
					<Step key={label}>
						<StepLabel StepIconComponent={StepperIcon}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Container maxWidth='md'>
				<StepperContent {...{ handleNext, activeStep, steps, handleBack }} />
			</Container>
		</div>
	);
}

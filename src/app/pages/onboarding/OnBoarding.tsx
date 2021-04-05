import React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

// MUI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Components
import UserProfile from './steps/UserProfile';
import Objectives from './steps/Objectives';
import FinalSlider from './steps/FinalSlider';
import AdditionalDetails from './steps/AdditionalDetails';
import StepperIcon from '../../components/onboarding/StepperIcon';
import StepConnector from '../../components/onboarding/StepConnector';

// assets

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			position: 'relative',

			[theme.breakpoints.down('md')]: {
				padding: `${theme.spacing(3)}px 0`,
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
		{
			label: 'Tell Us About Yourself',
		},
		{ label: 'Additional Details' },
		{ label: 'Your Objectives' },
	];
}

function getStepContent(stepIndex: number) {
	switch (stepIndex) {
		case 0:
			return <UserProfile />;
		case 1:
			return <AdditionalDetails />;
		case 2:
			return <Objectives />;
		default:
			return 'Unknown stepIndex';
	}
}

export default function OnBoarding() {
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

	return (
		<div className={classes.root}>
			<Box className={classes.brand}>
				<Typography variant='h5'>Learning Center</Typography>
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
				{activeStep === steps.length ? (
					<div>
						<Box className={classes.instructions}>
							<FinalSlider />
						</Box>
					</div>
				) : (
					<div>
						<Box className={classes.instructions}>
							{getStepContent(activeStep)}
						</Box>
						<Box className={classes.btns}>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.backButton}>
								Back
							</Button>
							<Button variant='contained' color='primary' onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</Box>
					</div>
				)}
			</Container>
		</div>
	);
}

import React from 'react';

// MUI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// Components
import UserProfile from './steps/UserProfile';
import Objectives from './steps/Objectives';
import FinalSlider from './steps/FinalSlider';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';

// components
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
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
	return ['Tell Us About Yourself', 'Your Objectives'];
}

function getStepContent(stepIndex: number) {
	switch (stepIndex) {
		case 0:
			return <UserProfile />;
		case 1:
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
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Container>
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

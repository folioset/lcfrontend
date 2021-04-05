import * as React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { useMutation, useQueryClient } from 'react-query';

// MUI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import UserProfile from './steps/UserProfile';
import Objectives from './steps/Objectives';
import AdditionalDetails from './steps/AdditionalDetails';

/////////////////////////////////////////////////////////////////////////////////////////////
// FORMIK
// Page 1 - Linkedin and about details
const LinkedInRegExp = /((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!]))?/;

const userProfileInitState = (user: any) => {
	return {
		name: user.name,
		email: user.email,
		linkedinUrl: user.linkedinUrl || '',
		about: user.about || '',
	};
};

const userProfileValidationSchema = Yup.object().shape({
	linkedinUrl: Yup.string()
		.required('Users must provide their linkedin profile url')
		.matches(LinkedInRegExp, 'Please enter a valid linkedin url'),
	about: Yup.string().required('Cannot be empty'),
});

// Page 3 - phone number

const otherInitValues = (user: any) => {
	return {
		phoneNumber: user.phoneNumber || '',
		code: '91',
	};
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const otherDetailsSchema = Yup.object().shape({
	phoneNumber: Yup.string()
		.required('Phone number is required')
		.length(10, 'Please enter a valid phone number')
		.matches(phoneRegExp, 'Please enter a valid phone number'),
});

////////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
// Get content based on active step

function getStepContent(stepIndex: number) {
	switch (stepIndex) {
		case 0:
			return <UserProfile />;
		case 2:
			return <AdditionalDetails />;
		default:
			return 'Unknown stepIndex';
	}
}

// Get Form initialValues
const getValues = (stepIndex: number, user: any) => {
	switch (stepIndex) {
		case 2:
			return otherInitValues(user);
		default:
			return userProfileInitState(user);
	}
};

// Get Form Validation Schema
const getSchema = (stepIndex: number) => {
	switch (stepIndex) {
		case 2:
			return otherDetailsSchema;
		default:
			return userProfileValidationSchema;
	}
};

// Get Initial Form Validity
const getInitialIsValid = (stepIndex: number, user: any) => {
	switch (stepIndex) {
		case 1:
			return;
		default:
			return user.linkedinUrl.trim().length > 0 && user.about.trim().length > 0;
	}
};

interface Props {
	handleNext: any;
	activeStep: any;
	steps: any;
	handleBack: any;
}

const StepperContent: React.FC<Props> = ({
	handleNext,
	activeStep,
	steps,
	handleBack,
}) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user') as any;
	const classes = useStyles();

	// State and validation for objectives
	const [objectiveValid, setObjectiveValid] = React.useState<boolean>(false);
	const [objectives, setObjectives] = React.useState<string[]>([]);

	// Mutation
	const { mutate, isLoading } = useMutation(
		async (data) => {
			const res = await axios({
				method: 'POST',
				url: '/api/user/updateDetails',
				data,
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('user', data);
			},
		}
	);

	// Content for objectives
	if (activeStep === 1) {
		return (
			<>
				<Objectives {...{ setObjectiveValid, objectives, setObjectives }} />
				<Box className={classes.btns}>
					<Button
						disabled={activeStep === 0 || isLoading}
						onClick={handleBack}
						className={classes.backButton}>
						Back
					</Button>
					<Button
						startIcon={isLoading ? <CircularProgress size='1rem' /> : null}
						onClick={() => {
							if (objectiveValid) {
								handleNext();
								mutate({ objectives } as any);
							}
						}}
						disabled={!objectiveValid || isLoading}
						type='submit'
						variant='contained'
						color='primary'>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
				</Box>
			</>
		);
	}

	// Content for forms
	return (
		<Formik
			isInitialValid={getInitialIsValid(activeStep, user)}
			initialValues={getValues(activeStep, user)}
			validationSchema={getSchema(activeStep)}
			onSubmit={(values) => {
				console.log(values);
				mutate(values as any);
				handleNext();
			}}>
			{({ isValid, isSubmitting }) => {
				return (
					<Form autoComplete='off'>
						<Box className={classes.instructions}>
							{/* Steps that are rendered */}
							{getStepContent(activeStep)}

							{/* Form CTA */}

							<Box className={classes.btns}>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
									className={classes.backButton}>
									Back
								</Button>
								<Button
									startIcon={
										isSubmitting ? <CircularProgress size='1rem' /> : null
									}
									disabled={!isValid || isLoading}
									type='submit'
									variant='contained'
									color='primary'>
									{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
								</Button>
							</Box>
						</Box>
					</Form>
				);
			}}
		</Formik>
	);
};

export default StepperContent;

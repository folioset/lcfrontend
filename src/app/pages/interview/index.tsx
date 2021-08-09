import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { InterviewContext } from '../../contexts/InterviewContext';
import InterviewFinish from './InterviewFinish';
import InterviewOnboarding from './InterviewOnboarding';
import InterviewRoom from './InterviewRoom';

interface InterviewRoutesProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		errorTextMain: {
			marginTop: theme.spacing(8),
			marginBottom: theme.spacing(2),
			textAlign: 'center',
		},
		errorTextSub: {
			marginBottom: theme.spacing(5),
			textAlign: 'center',
			color: theme.palette.grey['600'],
		},
	};
});

const InterviewRoutes: React.FC<InterviewRoutesProps> = () => {
	const classes = useStyles();
	const { browserAllowed } = React.useContext(InterviewContext);
	return (
		<>
			{!browserAllowed ? (
				<>
					<Typography
						variant='h3'
						color='error'
						className={classes.errorTextMain}>
						Your Browser is not supported!
					</Typography>
					<Typography variant='h3' className={classes.errorTextSub}>
						Please use Google Chrome or Microsoft Edge.
					</Typography>
				</>
			) : (
				<Switch>
					<Route path='/interview' exact>
						<InterviewOnboarding />
					</Route>

					<Route path='/interview/room' exact>
						<InterviewRoom />
					</Route>

					<Route path='/interview/finish' exact>
						<InterviewFinish />
					</Route>
				</Switch>
			)}
		</>
	);
};

export default InterviewRoutes;

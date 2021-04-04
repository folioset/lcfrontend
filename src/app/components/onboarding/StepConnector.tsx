// Material UI
import MUIStepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core';

const StepConnector = withStyles((theme) => {
	return {
		alternativeLabel: {
			top: 22,
		},
		active: {
			'& $line': {
				backgroundImage: `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
			},
		},
		completed: {
			'& $line': {
				backgroundImage: `linear-gradient(to right bottom, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
			},
		},
		line: {
			height: 3,
			border: 0,
			backgroundColor: '#eaeaf0',
			borderRadius: 1,
		},
	};
})(MUIStepConnector);

export default StepConnector;

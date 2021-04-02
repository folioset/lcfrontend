import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';

const palette = {
	primary: {
		main: purple[800],
	},
	secondary: {
		main: indigo['A700'],
	},
};

const typography = {
	fontFamily: '"Poppins", sans-serif',
};

const theme = createMuiTheme({ palette, typography });

export default theme;

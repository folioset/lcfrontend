import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const palette = {
	primary: {
		main: '#F9A826',
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

import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const palette = {
	primary: {
		main: '#00BFA6',
	},
	secondary: {
		main: indigo['A700'],
	},
};

const typography = {
	fontFamily: "'Montserrat', sans-serif",
};

const theme = createMuiTheme({ palette, typography });

export default theme;

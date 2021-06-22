import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const palette = {
	primary: {
		main: '#00BFA6',
	},
	secondary: {
		main: indigo['A700'],
	},
	background: {
		default: '#fff',
	},
};

const typography = {
    fontFamily: "'Montserrat', sans-serif",
    h3: {
        fontSize: 20,
        fontWeight: 500
    }
};

const theme = createMuiTheme({
	palette,
	typography,
});

export default theme;

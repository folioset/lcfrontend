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
		default: '#111111',
	},
	profile: {
		background: '#f3f2ee',
	},
};

const typography = {
	fontFamily: "'Montserrat', sans-serif",
	h3: {
		fontSize: 30,
		fontWeight: 500,
		color: 'white',
	},
	h4: {
		fontSize: 20,
		fontWeight: 500,
		color: 'black',
	},
	subtitle1: {
		color: 'white',
	},
};

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		...palette,
	},
	typography,
});

export default theme;

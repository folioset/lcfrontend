import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	primary: {
		main: '#00BFA6',
	},
	background: {
		default: '#f9f9f9',
		// default: '#111111',
	},
	secondary: {
		main: '#444444',
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
		color: 'black',
	},
	h4: {
		fontSize: 20,
		fontWeight: 500,
		color: 'black',
	},
	subtitle1: {
		color: 'black',
		fontWeight: 400
	},
	h5: {
		fontSize: 16,
	},
	h6: {
		fontSize: 17,
		fontWeight: 500,
	},
	body2: {
		fontSise: 14
	}
};

const theme = createMuiTheme({
	palette,
	typography,
});

export default theme;

import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	primary: {
		// main: '#00BFA6',
		main: '#11b7c5',
		light: '#90EE90',
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
	fontFamily: "'Helvetica Neue', sans-serif",
	h3: {
		fontSize: 30,
		fontWeight: 500,
		color: 'black',
	},
	h4: {
		fontSize: 17,
		fontWeight: 450,
		color: 'black',
	},
	subtitle1: {
		color: 'black',
		fontWeight: 400,
	},
	h5: {
		fontSize: 13,
		fontWeight: 500,
	},
	h6: {
		fontSize: 17,
		fontWeight: 500,
	},
	caption: {},
	body2: {
		fontSize: 15,
	},
};

const theme = createMuiTheme({
	palette,
	typography,
});

export default theme;

import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	primary: {
		main: '#00BFA6',
	},
	background: {
		default: '#f9f9f9',
		// default: '#111111',
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
	h5: {
		fontSize: 16,
	},
	h6: {
		fontSize: 16,
		fontWeight: 500,
	},
};

const theme = createMuiTheme({
	palette,
	typography,
});

export default theme;

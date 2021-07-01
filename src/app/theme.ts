import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	primary: {
		main: '#00BFA6',
	},
	background: {
		default: '#f7f7f7',
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
		fontSize: 18,
	},
	h6: {
		fontSize: 18,
	},
};

const theme = createMuiTheme({
	palette,
	typography,
});

export default theme;

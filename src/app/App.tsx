import * as React from 'react';

// Material UI
import theme from './theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

// Components
import Layout from './layout/Layout';
import LayoutContextProvider from './contexts/LayoutContext';

const App: React.FC = () => {
	return (
		<ThemeProvider {...{ theme }}>
			<CssBaseline />
			<LayoutContextProvider>
				<Layout />
			</LayoutContextProvider>
		</ThemeProvider>
	);
};

export default App;

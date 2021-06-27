import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Material UI
import theme from './theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

// Components
import Layout from './layout/Layout';
import LayoutContextProvider from './contexts/LayoutContext';
import UserContextProvider from './contexts/UserContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<ThemeProvider {...{ theme }}>
					<CssBaseline />
					<LayoutContextProvider>
						<Layout />
					</LayoutContextProvider>
				</ThemeProvider>
				{process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
			</UserContextProvider>
		</QueryClientProvider>
	);
};

export default App;

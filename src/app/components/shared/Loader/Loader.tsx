import * as React from 'react';

// material ui
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

interface Props {
	size?: number | string;
	fullScreen?: boolean;
}

const Loader: React.FC<Props> = ({ size = '1rem', fullScreen }) => {
	if (fullScreen) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='100vh'>
				<CircularProgress size='4rem' />
			</Box>
		);
	}

	return <CircularProgress {...{ size }} />;
};

export default Loader;

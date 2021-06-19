import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import * as React from 'react';

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
	return (
		<>
			<Box textAlign='center'>
				<Typography variant='h4'>Users</Typography>
			</Box>
		</>
	);
};

export default Search;

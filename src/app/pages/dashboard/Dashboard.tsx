import * as React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles, Typography } from '@material-ui/core';

import Profile from '../../components/dashboard/Profile';
import { useQuery, useQueryClient } from 'react-query';
import { Project as ProjectType, User } from '../../types';
import Project from '../../components/dashboard/Project';
import axios from 'axios';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			height: '100vh',
			backgroundColor: theme.palette.common.white,
			padding: theme.spacing(4),

			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2),
				height: 'auto',
				minHeight: '100vh',
			},

			[theme.breakpoints.down('sm')]: {
				padding: 0,
			},
		},
		heading: {
			marginBottom: theme.spacing(4),

			[theme.breakpoints.down('sm')]: {
				fontSize: 30,
			},
		},
	};
});

const Dashboard: React.FC = () => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const { isLoading, data } = useQuery<ProjectType[]>(
		'my-projects',
		async () => {
			try {
				const res = await axios.get(`/api/user/${user._id}/get-all-projects`);
				return res.data;
			} catch (err) {
				return err;
			}
		}
	);

	return (
		<>
			<Box className={classes.root}>
				<Container maxWidth='md'>
					<Box my={5}>
						<Profile user={user} />
					</Box>
					<Box>
						<Box mb={5} textAlign='center'>
							<Typography color='primary' variant='h4'>
								Your Projects
							</Typography>
						</Box>
						{isLoading && (
							<Box textAlign='center'>
								<Typography color='primary'>Loading Projects ....</Typography>
							</Box>
						)}
						{data?.map((project: ProjectType) => {
							return <Project {...{ project }} />;
						})}
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Dashboard;

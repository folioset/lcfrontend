import * as React from 'react';
import { Link } from 'react-router-dom';

// Material UI

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, makeStyles } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useQueryClient } from 'react-query';
import { Schedule as ScheduleType } from '../../types';

import { ScheduleContext } from '../../contexts/ScheduleContext';

import MatchCard from '../../components/dashboard/home/MatchCard';

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box pt={3}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => {
	return {
		root: {
			height: '100vh',
			backgroundColor: theme.palette.grey['200'],
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

const Schedule: React.FC = () => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const { userScheduleLoading } = React.useContext(ScheduleContext);
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const schedule = queryClient.getQueryData<ScheduleType[]>('schedule');

	return (
		<Box className={classes.root}>
			<Container maxWidth={'md'}>
				<AppBar color='transparent' elevation={0} position='static'>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='upcoming and past meet'>
						<Tab label='Upcoming' {...a11yProps(0)} />
						<Tab label='Past' {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<Typography variant='h4' className={classes.heading}>
						We are excited to match you with interesting folk
					</Typography>
					{schedule && schedule.length === 0 && (
						<>
							<Typography
								color='error'
								variant='h6'
								className={classes.heading}>
								You do not have any scheduled meets
							</Typography>
							<Button
								component={Link}
								to='/dashboard/schedule'
								variant='outlined'
								color='primary'>
								Schedule One!
							</Button>
						</>
					)}
					{userScheduleLoading && (
						<Box textAlign='center'>
							<Typography color='primary'>Loading schedule...</Typography>
						</Box>
					)}
					{schedule?.map((meet) => {
						return <MatchCard key={meet._id} {...{ meet }} />;
					})}
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Typography variant='h4' className={classes.heading}>
						Your Past Meets
					</Typography>
					<Box my={3} p={0}>
						<Typography variant='h6' color='error'>
							You did not attend any meets yet!
						</Typography>
					</Box>
					<Button
						component={Link}
						to='/dashboard/schedule'
						variant='outlined'
						color='primary'>
						Schedule One!
					</Button>
				</TabPanel>
			</Container>
		</Box>
	);
};

export default Schedule;

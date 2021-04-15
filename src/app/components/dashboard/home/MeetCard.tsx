import * as React from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

// MUI
import theme from '../../../theme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// icons
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//
// types
import { Schedule } from '../../../types';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginBottom: theme.spacing(5),
			padding: theme.spacing(0),
			backgroundColor: '#f7f7f7',
		},
		link: {
			cursor: 'pointer',
		},
		moreDetailsContainer: {
			alignSelf: 'flex-end',
			display: 'flex',
			justifyContent: 'flex-end',
			padding: '0, 4px 4px 0',
		},
	};
});

interface Props {
	meet: Schedule;
}

const DAYS = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
];

const MONTHS = [
	'January',
	'Feburary',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const MeetCard: React.FC<Props> = ({ meet }) => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	// const [showDetails, setShowDetails] = React.useState<boolean>(false);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const { mutate, isLoading } = useMutation(
		async () => {
			handleClose();
			const data = {
				schedule: meet,
			};
			const res = await axios({
				method: 'POST',
				url: '/api/user/deleteSchedule',
				data,
			});
			return res.data;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData('user', data);
				queryClient.setQueryData('schedule', data.schedule);
			},
		}
	);

	if (isLoading) {
		return (
			<Box textAlign='center'>
				<Typography>Loading schedule....</Typography>
			</Box>
		);
	}

	return (
		<>
			<Card className={classes.root}>
				<CardContent>
					<Grid
						spacing={5}
						container
						justify='space-between'
						alignItems='center'>
						<Grid item xs={12} sm={6}>
							<Box ml={0.5}>
								<Typography color='textPrimary' variant='h6'>
									{meet.time.split('-').join(' ')} on {MONTHS[meet.month]}{' '}
									{meet.date}, {meet.year}{' '}
									<span style={{ textTransform: 'capitalize' }}>
										{' '}
										({DAYS[meet.day]})
									</span>
								</Typography>
							</Box>
							<Box mt={2} ml={0.5}>
								<Button
									to='/dashboard/schedule/update'
									component={RouterLink}
									size='small'
									style={{ cursor: 'pointer' }}
									color='primary'>
									Change Timing
								</Button>
							</Box>

							<Box ml={0.5} mt={2} color={theme.palette.text.secondary}>
								<Button color='inherit' size='small' onClick={handleClick}>
									Can't Attend this week
								</Button>
								<Menu
									id='simple-menu'
									anchorEl={anchorEl}
									keepMounted
									style={{ outline: 'none' }}
									open={Boolean(anchorEl)}
									onClose={handleClose}>
									<Box style={{ outline: 'none' }} p={3}>
										<Typography>
											Are you sure you want to skip this week's call ?
										</Typography>
										<Box mt={4} textAlign='center'>
											<Button
												onClick={() => mutate()}
												disableElevation
												color='secondary'
												variant='contained'>
												Yes
											</Button>
											<Button onClick={handleClose}>No</Button>
										</Box>
									</Box>
								</Menu>
							</Box>
						</Grid>
						<Grid item xs={12} sm={4} className={classes.moreDetailsContainer}>
							{/* <Button
								onClick={() => setShowDetails(!showDetails)}
								endIcon={
									!showDetails ? <ExpandMoreIcon /> : <ExpandLessIcon />
								}>
								{showDetails ? 'Hide Details' : 'More Details'}
							</Button> */}
						</Grid>
					</Grid>

					{/* {showDetails && (
						<Box padding={3} mt={3}>
							<Box mb={1} textAlign='center'>
								<Typography color='secondary' variant='h6'>
									Finding the best matches for you!
								</Typography>
							</Box>

							<Box textAlign='center'>
								<Typography color='textSecondary'>
									We'll let you know as soon as we find the perfect match
								</Typography>
							</Box>
						</Box>
					)} */}
				</CardContent>
			</Card>
		</>
	);
};

export default MeetCard;

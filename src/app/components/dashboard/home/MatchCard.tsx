import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
	Box,
	Button,
	CardHeader,
	Grid,
	IconButton,
	Link,
	makeStyles,
	Menu,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Schedule } from '../../../types';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginBottom: theme.spacing(5),
			padding: theme.spacing(0),
		},
		link: {
			cursor: 'pointer',
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

const MatchCard: React.FC<Props> = ({ meet }) => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const [showDetails, setShowDetails] = React.useState<boolean>(false);

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
				<CardHeader
					action={
						<>
							<IconButton
								aria-controls='simple-menu'
								aria-haspopup='true'
								onClick={handleClick}
								aria-label='delete'>
								<DeleteIcon color='error' />
							</IconButton>
							<Menu
								id='simple-menu'
								anchorEl={anchorEl}
								keepMounted
								style={{ outline: 'none' }}
								open={Boolean(anchorEl)}
								onClose={handleClose}>
								<Box style={{ outline: 'none' }} p={3}>
									<Typography>Are you sure you want to delete ?</Typography>
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
						</>
					}
				/>
				<CardContent>
					<Grid
						spacing={5}
						container
						justify='space-between'
						alignItems='center'>
						<Grid item xs={12}>
							<Typography color='primary' variant='h6'>
								{meet.time.split('-').join(' ')} on {MONTHS[meet.month]}{' '}
								{meet.date}, {meet.year}{' '}
								<span style={{ textTransform: 'capitalize' }}>
									{' '}
									({DAYS[meet.day]})
								</span>
							</Typography>
							<Box mt={3}>
								<Link
									to='/dashboard/schedule/update'
									component={RouterLink}
									style={{ cursor: 'pointer' }}
									color='textSecondary'>
									Change Timing ?
								</Link>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button
								onClick={() => setShowDetails(!showDetails)}
								endIcon={
									!showDetails ? <ExpandMoreIcon /> : <ExpandLessIcon />
								}>
								{showDetails ? 'Hide Details' : 'More Details'}
							</Button>
						</Grid>
					</Grid>

					{showDetails && (
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
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default MatchCard;

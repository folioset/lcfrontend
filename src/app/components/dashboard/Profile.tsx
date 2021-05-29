import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton, makeStyles, Theme } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { User } from '../../types';
import { Tooltip } from '@material-ui/core';
import useDisclosure from '../../hooks/useDisclosure';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: 'auto',
		maxWidth: 700,
	},
	details: {
		padding: theme.spacing(3),
		marginTop: theme.spacing(2),
	},
	avatar: {
		backgroundColor: theme.palette.primary.light,
	},
}));

interface ProfileCardProps {
	user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
	const classes = useStyles();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Modal
				open={isOpen}
				onClose={onClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<Paper>
					<Typography>Create Form Field</Typography>
				</Paper>
			</Modal>
			<Box className={classes.root}>
				<Paper elevation={3} className={classes.paper}>
					<Grid container>
						<Grid item xs={2} className={classes.details}>
							<Avatar
								className={classes.avatar}
								alt={user.name}
								src='../../public/logo192.png'
							/>
						</Grid>
						<Grid
							className={classes.details}
							item
							xs={10}
							sm
							direction='column'
							spacing={2}>
							<Typography gutterBottom variant='subtitle1'>
								{user.name} (Name)
							</Typography>
							<Typography variant='body2' gutterBottom>
								{user.about} (Headline)
							</Typography>
							<Typography variant='body2' color='textSecondary'>
								Hyderabad, India (Location)
							</Typography>
						</Grid>
						<Grid item>
							<Tooltip title='Add Project' aria-label='Add project'>
								<IconButton color='primary' onClick={onOpen}>
									<AddCircleIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	);
};

export default ProfileCard;

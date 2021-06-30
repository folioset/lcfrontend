import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box, Button, makeStyles, Theme, IconButton } from '@material-ui/core';
import { User } from '../../types';
import useDisclosure from '../../hooks/useDisclosure';
import CreateProject from './Project/CreateProject';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import Avatar from '../shared/Avatar';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.common.white,
	},
	paper: {
		backgroundColor: theme.palette.common.white,
		borderRadius: 20,
			borderWidth: 1,
			borderColor: theme.palette.divider,
			
			elevation: 0,
			boxShadow: 'none'
	},
	details: {
		padding: theme.spacing(3),

		[theme.breakpoints.down('sm')]: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
		},

		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
		},
	},
	about: {
		marginBottom: theme.spacing(1),
	},
	avatar: {
		backgroundColor: theme.palette.primary.light,
		marginBottom: theme.spacing(3),
		height: 100,
		width: 100,
	},
	addProjectGridBtn: {
		marginTop: theme.spacing(2),
	},
	link: {
		cursor: 'pointer',
	},
	editIcon: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',

		[theme.breakpoints.down('xs')]: {
			order: -1,
			alignItems: 'center',
		},
	},
}));

interface ProfileCardProps {
	user: User;
	isPublic?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isPublic }) => {
	const classes = useStyles();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();

	return (
		<>
			{!isPublic && (
				<Modal
					open={isOpen}
					onClose={onClose}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'>
					<CreateProject {...{ onClose }} />
				</Modal>
			)}
			<Box className={classes.root}>
				<Paper className={classes.paper}>
					<Grid container direction='row'>
						<Grid item xs={12} sm={11} className={classes.details}>
							<Avatar
								className={classes.avatar}
								alt={user.name}
								src={user.profilePicture}
							/>

							<Typography gutterBottom variant='h4'>
								{user.name}
							</Typography>
							{user.about && (
								<Typography
									variant='body2'
									gutterBottom
									className={classes.about}>
									{user.about}
								</Typography>
							)}
							{user.location && (
								<Typography variant='body2' color='textSecondary'>
									{user.location}
								</Typography>
							)}
							{!isPublic && (
								<Box className={classes.addProjectGridBtn}>
									<Button color='primary' variant='contained' onClick={onOpen}>
										Add Project
									</Button>
								</Box>
							)}
						</Grid>
						<Grid item xs={12} sm={1} className={classes.editIcon}>
							{!isPublic && (
								<IconButton
									onClick={() => history.push('/dashboard/me/update')}>
									<EditIcon color='primary' />
								</IconButton>
							)}
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</>
	);
};

export default ProfileCard;

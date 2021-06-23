import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Box, Button, makeStyles, Theme } from '@material-ui/core';
import { User } from '../../types';
import useDisclosure from '../../hooks/useDisclosure';
import CreateProject from './CreateProject';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {},
	details: {
		padding: theme.spacing(3),
		margin: theme.spacing(1),

		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
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
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
		},
		marginTop: theme.spacing(2),
	},
	link: {
		cursor: 'pointer',
	},
}));

interface ProfileCardProps {
	user: User;
	isPublic?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isPublic }) => {
	const classes = useStyles();
	const { isOpen, onOpen, onClose } = useDisclosure();

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
					<Grid container direction='column' className={classes.details}>
						<Avatar
							className={classes.avatar}
							alt={user.name}
							src={user.profilePicture}
						/>

						<Typography gutterBottom variant='h3'>
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
								{user.location} (Location)
							</Typography>
						)}
						{/* {!isPublic && (
									<Link component={RouterLink} to='/dashboard/me/update'>
										Click Here to update your profile
									</Link>
								)} */}
						{!isPublic && (
							<Box className={classes.addProjectGridBtn}>
								<Button color='primary' variant='contained' onClick={onOpen}>
									Add Project
								</Button>
							</Box>
						)}
					</Grid>
					{/* <Grid item xs={1}>
							{!isPublic && (
								<Box className={classes.addProjectGridBtn}>
									<Tooltip title='Add Project' aria-label='Add project'>
										<Button color='primary' variant="contained" onClick={onOpen} >
											Add Project
										</Button>
									</Tooltip>
								</Box>
							)}
						</Grid> */}
				</Paper>
			</Box>
		</>
	);
};

export default ProfileCard;

import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box, Button, makeStyles, Theme, IconButton, ButtonGroup } from '@material-ui/core';
import { User } from '../../types';
import useDisclosure from '../../hooks/useDisclosure';
import CreateProject from '../Project/CreateProject';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import Avatar from '../shared/Avatar';
import CreateChallenge from '../Challenge/CreateChallenge';
import CreateResume from './CreateResume';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.common.white,
		marginBottom: 20,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 10,
		borderWidth: 5,
		borderColor: '#111111',
		elevation: 0,
		boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
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
		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			flexDirection: "column",
			alignItems: 'center',
			marginTop: theme.spacing(2),
		},
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
	btnPad: {
		marginLeft: 15,
		[theme.breakpoints.down('xs')]: {
			marginLeft: 0,
			marginTop: theme.spacing(1),
		},
	}
}));

interface ProfileCardProps {
	user: User;
	isPublic?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isPublic }) => {
	const classes = useStyles();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenChall,
		onOpen: onOpenChall,
		onClose: onCloseChall,
	} = useDisclosure();
	const {
		isOpen: isOpenResume,
		onOpen: onOpenResume,
		onClose: onCloseResume,
	} = useDisclosure();
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
			{!isPublic && (
				<Modal
					open={isOpenChall}
					onClose={onCloseChall}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'>
					<CreateChallenge {...{ onCloseChall }} />
				</Modal>
			)}
			{!isPublic && (
				<Modal
					open={isOpenResume}
					onClose={onCloseResume}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'>
					<CreateResume {...{ onCloseResume }} />
				</Modal>
			)}
			<Box className={classes.root}>
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
								{/* <Button color='primary' variant='contained' onClick={onOpenChall} className={classes.btnPad}>
									Add Challenge
								</Button>
								<Button color='primary' variant='contained' className={classes.btnPad}>
									All Challenges
								</Button> */}
								<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" className={classes.btnPad}>
									<Button> All Challenges</Button>
									<Button onClick={onOpenChall}><AddIcon /></Button>
								</ButtonGroup>
								<Button color='primary' variant='contained' onClick={onOpenResume}>
									Add Resume
								</Button>
							</Box>
						)}
					</Grid>
					<Grid item xs={12} sm={1} className={classes.editIcon}>
						{!isPublic && (
							<IconButton onClick={() => history.push('/dashboard/me/update')}>
								<EditIcon color='primary' />
							</IconButton>
						)}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default ProfileCard;

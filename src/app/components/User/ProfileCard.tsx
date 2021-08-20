import * as React from 'react';
import { Box, Button, makeStyles, Theme, IconButton, Link, Modal, Grid, Typography, CardContent,
	CardActionArea, Card } from '@material-ui/core';
import { User } from '../../types';
import useDisclosure from '../../hooks/useDisclosure';
import CreateProject from '../Project/CreateProject';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '../shared/Avatar';
import CreateChallenge from '../Challenge/CreateChallenge';
// import CreateResume from './CreateResume';
import { Link as RouterLink, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			maxWidth: 580,
			position: 'sticky',
			margin: 'auto',
			borderRadius: 8,
			padding: theme.spacing(2),
		},
		avatarBox: {
			justifyContent: 'center',
			width: '100%',
			display: 'flex',
			marginTop: theme.spacing(2)
		},
		avatar: {
            height: '5rem',
            width: '5rem',
        },
		userDetails: {
			textAlign: 'center',
			marginTop: theme.spacing(1)
		}, 
		btnAlign: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
		},
		cardTypo: {
			color: 'black',
			fontWeight: 550,
			fontSize: 17
			
		},
		action: {
			textTransform: 'none',
			fontWeight: 'bold',
		},
	};
});

interface ProfileCardProps {
	user: User;
	isPublic?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isPublic }) => {
	const classes = useStyles();
	const { isOpen, onOpen, onClose } = useDisclosure();
	// const {
	// 	isOpen: isOpenResume,
	// 	onOpen: onOpenResume,
	// 	onClose: onCloseResume,
	// } = useDisclosure();
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
			{/* {!isPublic && (
				<Modal
					open={isOpenResume}
					onClose={onCloseResume}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'>
					<CreateResume {...{ onCloseResume }} />
				</Modal>
			)} */}
			<Card className={classes.root}>
					<CardActionArea>
						<Box className={classes.avatarBox}>
							<Avatar
								className={classes.avatar}
								src={user.profilePicture}
							/>
						</Box>
						<Link
							component={RouterLink}
							to={`/dashboard`}>
							<CardContent className={classes.userDetails}>
								<Typography
									gutterBottom
									variant='h4'
									component='h2'
									className={classes.cardTypo}>
									{user.name}
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									{user.about}
								</Typography>
							</CardContent>
						</Link>
						
					</CardActionArea>
			
				<Box className={classes.btnAlign}>
					<Button
						size='large'
						color='primary'
						className={classes.action}
						onClick={onOpen}>
						Add Project
					</Button>
					<Button
						component={RouterLink}
						to='/interview'
						size='large'
						color='primary'
						className={classes.action}>
						Take an Interview
					</Button>
				</Box>
			</Card>
		</>
	);
};

export default ProfileCard;

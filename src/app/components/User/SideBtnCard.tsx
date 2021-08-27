import {
	CardMedia,
	CardContent,
	CardActionArea,
	CardHeader,
	Button,
	makeStyles,
	Theme,
	Typography,
	Link, Card, Box
} from '@material-ui/core';
import * as React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { User } from '../../types';
import { useQueryClient } from 'react-query';
import useDisclosure from '../../hooks/useDisclosure';
import Modal from '@material-ui/core/Modal';
import CreateProject from '../Project/CreateProject';
import CreateChallenge from '../Challenge/CreateChallenge';
import Avatar from '../shared/Avatar';

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
	isPublic?: boolean;
}

const SideBtnCard: React.FC<ProfileCardProps> = ({ isPublic }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const { isOpen, onOpen, onClose } = useDisclosure();

	//for case study answer
	const {
		isOpen: isOpenChall,
		onOpen: onOpenChall,
		onClose: onCloseChall,
	} = useDisclosure();

	//for normal study answer
	const {
		isOpen: isOpenAnswer,
		onOpen: onOpenAnswer,
		onClose: onCloseAnswer,
	} = useDisclosure();

	const classes = useStyles();

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
					<CreateChallenge onCloseChall={onCloseChall} isCaseStudy={true} />
				</Modal>
			)}
			{!isPublic && (
				<Modal
					open={isOpenAnswer}
					onClose={onCloseAnswer}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'>
					<CreateChallenge onCloseChall={onCloseAnswer} isCaseStudy={false} />
				</Modal>
			)}
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
						component={RouterLink}
						to='/interview'
						size='large'
						color='primary'
						className={classes.action}>
						Take an Interview
					</Button>
					<Button
						size='large'
						color='primary'
						className={classes.action}
						onClick={onOpen}>
						Add Project
					</Button>
					{/* <Button
						size='large'
						color='primary'
						className={classes.action}
						onClick={onOpenChall}>
						Add Challenge
					</Button> */}
					<Button
						size='large'
						color='primary'
						className={classes.action}
						onClick={onOpenAnswer}>
						Ask a Question
					</Button>
				</Box>
			</Card>
		</>
	);
};

export default SideBtnCard;

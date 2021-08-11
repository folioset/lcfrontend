import {
	CardMedia,
	CardContent,
	CardActionArea,
	Button,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import { Card, Box } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types';
import { useQueryClient } from 'react-query';
import useDisclosure from '../../hooks/useDisclosure';
import Modal from '@material-ui/core/Modal';
import CreateProject from '../Project/CreateProject';
import CreateChallenge from '../Challenge/CreateChallenge';

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			maxWidth: 580,
			position: 'sticky',
			top: 90,
			margin: 'auto',
			borderRadius: 8,
			padding: 20,
		},
		CardImg: {
			borderRadius: '50%',
			width: '50%',
			margin: 'auto',
			marginTop: 10,
			[theme.breakpoints.down('sm')]: {
				borderRadius: '50%',
				width: '25%',
			},
			[theme.breakpoints.down('xs')]: {
				borderRadius: '50%',
				width: '35%',
			},
		},
		textAlign: {
			textAlign: 'center',
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
			fontWeight: 600,
			'&:hover': {
				textDecoration: 'underline',
			},
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
	// const history = useHistory();

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
				<Link to='/dashboard'>
					<CardActionArea>
						<CardMedia
							className={classes.CardImg}
							component='img'
							alt='Profile Picture'
							height='140'
							image={user.profilePicture}
							title='Contemplative Reptile'
						/>
						<CardContent className={classes.textAlign}>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'
								className={classes.cardTypo}>
								{user.name}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								{user.about}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
				<Box className={classes.btnAlign}>
					<Button
						size='large'
						color='primary'
						className={classes.action}
						onClick={onOpen}>
						Add Project
					</Button>
					<Button
						size='large'
						color='primary'
						className={classes.action}
						onClick={onOpenChall}>
						Add Challenge
					</Button>
					<Button
						size='large'
						color='primary'
						className={classes.action}
						onClick={onOpenAnswer}>
						Ask a Question
					</Button>
					<Button
						component={Link}
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

export default SideBtnCard;

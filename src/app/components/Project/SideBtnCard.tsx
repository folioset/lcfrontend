import {
	CardMedia,
	CardContent,
	CardActions,
	CardActionArea,
	Button,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import * as React from 'react';
import { User } from '../../types';
import { useQueryClient } from 'react-query';
import useDisclosure from '../../hooks/useDisclosure';
import Modal from '@material-ui/core/Modal';
import CreateProject from '../Project/CreateProject';

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			maxWidth: 580,
			position: 'sticky',
			top: 90,
			margin: 'auto',
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
			justifyContent: 'space-around',
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
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						className={classes.CardImg}
						component='img'
						alt='Contemplative Reptile'
						height='140'
						image={user.profilePicture}
						title='Contemplative Reptile'
					/>
					<CardContent className={classes.textAlign}>
						<Typography gutterBottom variant='h5' component='h2'>
							{user.name}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{user.about}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className={classes.btnAlign}>
					<Button size='small' color='primary' onClick={onOpen}>
						Add Project
					</Button>
					<Button size='small' color='primary' disabled>
						Add Challenge
					</Button>
					<Button size='small' color='primary' disabled>
						Take an interview
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default SideBtnCard;

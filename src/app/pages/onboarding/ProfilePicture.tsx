import {
	Avatar,
	Box,
	Button,
	Container,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { OnboardingContext } from '../../contexts/OnboardingContext';

interface ProfilePictureProps {}

const useStyles = makeStyles((theme: Theme) => {
	return {
		heading: {
			textAlign: 'center',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(10),
			fontSize: 24
		},
		photoContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
			marginBottom: theme.spacing(10),
		},
		photo: {
			height: '200px',
			width: '200px',
		},
		btnContainer: {
			maxWidth: '300px',
			margin: '0 auto',

			'& label': {
				marginBottom: theme.spacing(4),
			},
		},
	};
});

const ProfilePicture: React.FC<ProfilePictureProps> = () => {
	const classes = useStyles();
	const history = useHistory();
	const [photoUrl, setPhotoUrl] = React.useState('');

	const { setPhoto } = React.useContext(OnboardingContext);

	return (
		<>
			<Box>
				<Container maxWidth='md'>
					<Typography variant='h3' className={classes.heading}>
						Adding a photo helps people recognize you
					</Typography>
					<Box className={classes.photoContainer}>
						<Avatar className={classes.photo} src={photoUrl} />
						<input
							id='photo'
							type='file'
							style={{ display: 'none' }}
							onChange={(e: any) => {
								if (setPhoto) setPhoto(e.target.files[0]);
								const url = URL.createObjectURL(e.target.files[0]);
								setPhotoUrl(url);
							}}
						/>
					</Box>
					<Box className={classes.btnContainer}>
						<Button
							htmlFor='photo'
							component='label'
							fullWidth
							variant='contained'
							color='primary'>
							Upload Photo
						</Button>
						<Button
							onClick={() => {
								history.push('/onboarding/current-role');
							}}
							fullWidth
							variant='outlined'
							style={{border: '0px solid'}}>
							{photoUrl ? 'Next' : 'Skip'}
						</Button>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default ProfilePicture;

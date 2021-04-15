import * as React from 'react';
import {
	// Avatar,
	Box,
	Grid,
	Link,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { useQueryClient } from 'react-query';
import FormInput from '../../shared/FormInput/FormInput';
import { User } from '../../../types';
import { LinkedIn } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
	view: 'edit' | 'private' | 'public';
}

// FORMIK

const useStyles = makeStyles((theme) => {
	return {
		profile: {
			justifyContent: 'center',
			marginBottom: theme.spacing(4),
		},
		profileDetails: {
			[theme.breakpoints.down('sm')]: {
				textAlign: 'center',
				order: 2,
			},
		},
		profilePhoto: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			flexDirection: 'column',

			[theme.breakpoints.down('sm')]: {
				justifyContent: 'center',
				textAlign: 'center',
				order: 1,
			},
		},
		linkedinUrl: {
			display: 'flex',
			alignItems: 'center',

			'& a': {
				marginLeft: theme.spacing(4),
			},
		},
	};
});

const Profile: React.FC<Props> = ({ view }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const classes = useStyles();

	if (view === 'edit') {
		return (
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<FormInput
						fullWidth
						variant='filled'
						label='LinkedIn'
						name='linkedinUrl'
						required
						helperText='If you are on mobile, you can find this url by going to the Linkedin app -> View Profile -> Scrolling down on your profile -> In the Contact section, you will find your profile’s url which you can copy-paste here'
					/>
				</Grid>

				<Grid item md={1} xs={2}>
					<FormInput disabled variant='outlined' name='code' />
				</Grid>

				<Grid item md={11} xs={10}>
					<FormInput
						fullWidth
						variant='filled'
						label='Phone Number'
						name='phoneNumber'
						required
					/>
				</Grid>

				<FormInput
					fullWidth
					variant='filled'
					multiline
					rows={6}
					required
					name='about'
					label='Bio'
					placeholder={`Product Manager at Zerodha. IIM Calcutta grad. Former Engineer who loves finance and fin-tech products`}
				/>
			</Grid>
		);
	}

	return (
		<Grid className={classes.profile} container spacing={2} justify='center'>
			<Grid className={classes.profileDetails} item xs={12}>
				<Typography variant='h4'>{user?.name}</Typography>
				<Box mt={2}>
					<Typography variant='h6'>{user?.about}</Typography>
				</Box>
				<Box mt={3}>
					{user && user.linkedinUrl!.trim().length > 0 ? (
						<Link
							className={classes.linkedinUrl}
							href={`https://${user?.linkedinUrl && user?.linkedinUrl}`}
							color='secondary'>
							<LinkedIn />

							{user?.linkedinUrl}
						</Link>
					) : (
						<Link
							className={classes.linkedinUrl}
							component={RouterLink}
							to='/dashboard/me/update'
							color='secondary'>
							<LinkedIn />
							Update Linkedin URL
							{user?.linkedinUrl}
						</Link>
					)}
				</Box>
			</Grid>
			{/* <Grid className={classes.profilePhoto} item xs={12} md={4}>
				<Avatar variant='square' style={{ height: '8rem', width: '8rem' }} />
			</Grid> */}
		</Grid>
	);
};

export default Profile;

import * as React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';

// Styles
const useStyles = makeStyles({
	root: {
		minWidth: 275,
		marginBottom: 40,
		minHeight: 340,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionarea: {
		height: 340,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	iconContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	icon: {
		height: 70,
		width: 70,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

interface Props {
	objective: string;
}

const ObjectiveCard: React.FC<Props> = ({ objective }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root} color='primary' variant='outlined'>
			<CardActionArea className={classes.actionarea}>
				<CardContent>
					<Box className={classes.iconContainer}>
						<Avatar className={classes.icon} />
					</Box>
					<Box textAlign='center' marginTop={6}>
						<Typography variant='h5' component='p'>
							{objective}
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ObjectiveCard;

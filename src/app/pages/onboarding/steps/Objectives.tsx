import React from 'react';

// MUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

// Components
import ObjectiveCard from '../../../components/onboarding/ObjectiveCard';
import { useQueryClient } from 'react-query';

const OBJECTIVES = [
	{
		name: 'Career guidance',
		description:
			'Get advice on how to break into a certain field/company or move up the ladder',
	},
	{
		name: 'Upskilling ',
		description:
			'Read articles together, discuss trends and learn from others experiences',
	},
	{
		name: 'Building Connections',
		description:
			'Connect with people from diverse background and learn about their experiences',
	},
];

const useStyles = makeStyles((theme) => {
	return {
		root: {
			minHeight: '70vh',
		},
		heading: {
			textAlign: 'center',
			marginBottom: 40,

			[theme.breakpoints.down('md')]: {
				fontSize: 30,
			},

			[theme.breakpoints.down('md')]: {
				fontSize: 28,
			},
		},
	};
});

interface Props {
	setObjectiveValid: React.Dispatch<React.SetStateAction<boolean>>;
	setObjectives: React.Dispatch<React.SetStateAction<string[]>>;
	objectives: string[];
}

const Objectives: React.FC<Props> = ({
	setObjectiveValid,
	objectives,
	setObjectives,
}) => {
	const classes = useStyles();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user') as any;

	const handleObjectives = (obj: string) => {
		let objsCopy = [...objectives];
		if (objsCopy.includes(obj)) {
			objsCopy = objsCopy.filter((el) => el !== obj);
		} else {
			objsCopy.push(obj);
		}
		setObjectives(objsCopy);
	};

	React.useEffect(() => {
		if (user.objectives.length > 0) {
			setObjectives(user.objectives);
		}
	}, [user, setObjectives]);

	React.useEffect(() => {
		if (objectives.length >= 1) {
			setObjectiveValid(true);
		} else {
			setObjectiveValid(false);
		}
	}, [setObjectiveValid, objectives]);

	return (
		<Box className={classes.root}>
			<Container>
				<Typography className={classes.heading} variant='h4' component='h1'>
					What is your primary objective?
				</Typography>
				<Box mb={3}>
					<Box mb={2}>
						<Typography color='error'>*Select atleast 1 objective </Typography>
					</Box>
					<Typography color='secondary' variant='h6'>
						You selected {objectives.length} objective(s)
					</Typography>
				</Box>
				<Grid container spacing={4}>
					{OBJECTIVES.map((objective) => {
						return (
							<Grid key={objective.name} item md={4} sm={6} xs={12}>
								<ObjectiveCard
									{...{ handleObjectives, objectives, objective }}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</Box>
	);
};

export default Objectives;

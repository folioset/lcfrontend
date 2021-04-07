import React from 'react';

// MUI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { CareerOptions as CareerOptionsType, User } from '../../../types';
import CareerOptionCard from '../../../components/onboarding/CareerOptionCard';
import { Grid, makeStyles } from '@material-ui/core';

interface Props {
	careerOptions: CareerOptionsType[];
	setCareerOptValid: React.Dispatch<React.SetStateAction<boolean>>;
	setCareerOptions: React.Dispatch<React.SetStateAction<CareerOptionsType[]>>;
}

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			[theme.breakpoints.down('md')]: {
				fontSize: 30,
			},

			[theme.breakpoints.down('md')]: {
				fontSize: 28,
			},
		},
	};
});

const CarrerOptions: React.FC<Props> = ({
	careerOptions,
	setCareerOptValid,
	setCareerOptions,
}) => {
	const classes = useStyles();
	const { isLoading } = useQuery<CareerOptionsType, Error>(
		'carrer-options',
		async () => {
			const res = await axios({
				method: 'GET',
				url: '/api/careerOptions/all',
			});
			return res.data;
		}
	);
	const queryClient = useQueryClient();
	const options = queryClient.getQueryData<CareerOptionsType[]>(
		'carrer-options'
	);
	const user = queryClient.getQueryData<User>('user')!;

	const handleOptions = (opt: CareerOptionsType) => {
		let carrerOptsCopy = [...careerOptions];
		if (carrerOptsCopy.some((el) => el._id === opt._id)) {
			carrerOptsCopy = carrerOptsCopy.filter((el) => el._id !== opt._id);
		} else {
			carrerOptsCopy.push(opt);
		}
		setCareerOptions(carrerOptsCopy);
	};

	React.useEffect(() => {
		if (careerOptions.length >= 1) {
			setCareerOptValid(true);
		} else {
			setCareerOptValid(false);
		}
	}, [setCareerOptValid, careerOptions]);

	React.useEffect(() => {
		if (user.careerOptions.length > 0) {
			setCareerOptions(user.careerOptions);
		}
	}, [user, careerOptions, setCareerOptions]);

	return (
		<Box mb={4}>
			<Box my={3} textAlign='center'>
				<Typography className={classes.heading} variant='h4' component='h1'>
					Who do you want to get matched with and learn from?
				</Typography>
			</Box>
			{!isLoading && (
				<Box mb={3}>
					<Box mb={2}>
						<Typography color='error'>*Select atleast 1 option </Typography>
					</Box>
					<Typography color='secondary' variant='h6'>
						You selected {careerOptions.length} options(s)
					</Typography>
				</Box>
			)}
			{isLoading && (
				<Box mt={3} textAlign='center'>
					<Typography>Loading Options...</Typography>
				</Box>
			)}
			<Grid container spacing={4}>
				{options?.map((option: CareerOptionsType) => {
					return (
						<Grid item key={option._id} xs={12} sm={6} md={4}>
							<CareerOptionCard {...{ option, handleOptions, careerOptions }} />
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default CarrerOptions;

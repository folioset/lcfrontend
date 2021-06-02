import * as React from 'react';
import MuiRating, { RatingProps } from '@material-ui/lab/Rating';
import { Theme, withStyles } from '@material-ui/core';

const StyledRating = withStyles((theme: Theme) => {
	return {
		iconFilled: {
			color: theme.palette.primary.light,
		},
		iconHover: {
			color: theme.palette.primary.main,
		},
	};
})(MuiRating);

const Rating: React.FC<RatingProps> = ({ precision = 0.5, ...props }) => {
	return <StyledRating precision={precision} {...props} />;
};

export default Rating;

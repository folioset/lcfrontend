import * as React from 'react';
import MuiAvatar, { AvatarProps } from '@material-ui/core/Avatar';
import theme from '../../theme';

const Avatar: React.FC<AvatarProps> = ({
	alt,
	src,
	children,
	style,
	...props
}) => {
	return (
		<>
			<MuiAvatar
				style={{
					backgroundColor: theme.palette.grey['300'],
					color: theme.palette.grey['500'],
					...style,
				}}
				alt={alt}
				src={src}
				{...props}>
				{children}
			</MuiAvatar>
		</>
	);
};

export default Avatar;

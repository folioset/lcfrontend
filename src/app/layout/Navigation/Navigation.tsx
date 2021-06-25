import Hidden from '@material-ui/core/Hidden';
import * as React from 'react';

// hooks
import useDisclosure from '../../hooks/useDisclosure';

// components
import Navbar from './desktop/Navbar';
import Drawer from './mobile/Drawer';

const Navigation: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Navbar {...{ onOpen }} />
			<Hidden only={['xl', 'lg', 'md']}>
				<Drawer {...{ isOpen, onClose }} />
			</Hidden>
		</>
	);
};

export default Navigation;

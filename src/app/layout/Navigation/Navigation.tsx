import * as React from 'react';
import useDisclosure from '../../hooks/useDisclosure';

// components
import Navbar from './desktop/Navbar';
import Drawer from './mobile/Drawer';

const Navigation: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Navbar {...{ onOpen }} />
			<Drawer {...{ isOpen, onClose }} />
		</>
	);
};

export default Navigation;

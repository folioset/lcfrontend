import * as React from 'react';

const useDisclosure: (t?: boolean) => {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	toggleOpen: () => void;
} = (initalValue = false) => {
	const [isOpen, setIsOpen] = React.useState(initalValue);

	const onClose = () => setIsOpen(false);
	const onOpen = () => setIsOpen(true);
	const toggleOpen = () => setIsOpen(!isOpen);

	return {
		isOpen,
		onClose,
		onOpen,
		toggleOpen,
	};
};

export default useDisclosure;

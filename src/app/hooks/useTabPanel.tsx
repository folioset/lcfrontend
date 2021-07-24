import * as React from 'react';

const useTabPanel = () => {
	const [value, setValue] = React.useState<number>(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const tabPanelProps = (index: any) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	return { value, handleChange, tabPanelProps };
};

export default useTabPanel;

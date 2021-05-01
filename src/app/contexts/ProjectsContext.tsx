import * as React from 'react';
import { useLocation } from 'react-router';

interface Props {
	showView: 'edit' | 'display';
	sections: any;
	setSections: React.Dispatch<any>;
	editView: () => void;
	displayView: () => void;
	currentProjectData: any;
	setCurrentProjectData: React.Dispatch<any>;
}

export const ProjectContext = React.createContext<Partial<Props>>({});

const ProjectsContextProvider = ({ children }: any) => {
	const location = useLocation();
	const [showView, setShowView] = React.useState<'edit' | 'display'>('edit');

	const [sections, setSections] = React.useState<any>([]);

	const editView = () => setShowView('edit');
	const displayView = () => setShowView('display');

	const [currentProjectData, setCurrentProjectData] = React.useState<any>('');

	React.useEffect(() => {
		// if (location.pathname === '/projects/:id') {
		//     console.log()
		// }
	}, [location]);

	return (
		<ProjectContext.Provider
			value={{
				editView,
				displayView,
				showView,
				sections,
				setSections,
				currentProjectData,
				setCurrentProjectData,
			}}>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectsContextProvider;

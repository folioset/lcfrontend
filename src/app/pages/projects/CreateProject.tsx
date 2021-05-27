import * as React from 'react';
import Editor from '../../components/projects/Editor';
import Output from 'editorjs-react-renderer';
import { ProjectContext } from '../../contexts/ProjectsContext';

const CreateProject: React.FC = () => {
	const { showView, currentProjectData } = React.useContext(ProjectContext);

	return (
		<>
			{showView === 'edit' ? <Editor /> : <Output data={currentProjectData} />}
		</>
	);
};

export default CreateProject;

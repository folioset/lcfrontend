import { Box, Button, makeStyles } from '@material-ui/core';
import * as React from 'react';
// import EditorJs from 'react-editor-js';
import EditorJS from '@editorjs/editorjs';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { EDITOR_JS_TOOLS } from './../../utils/editorJsTools';

const useStyles = makeStyles(() => {
	return {
		container: {
			width: '100%',
		},
		saveBtn: {
			textAlign: 'center',
		},
	};
});

const Editor: React.FC = () => {
	const { setCurrentProjectData, currentProjectData } = React.useContext(
		ProjectContext
	);
	const classes = useStyles();
	const editorRef = React.useRef<any>();

	const handleSave = async () => {
		await editorRef!.current?.instance.save();
	};

	const handleChange = React.useCallback(
		async (data: any) => {
			const editorData = await data.saver.save();
			setCurrentProjectData!(editorData);
		},
		// eslint-disable-next-line
		[]
	);

	React.useEffect(() => {
		if (!editorRef.current) {
			editorRef.current = new EditorJS({
				holder: 'editorjs',
				placeholder: 'start writing here....',
				data: currentProjectData,
				tools: EDITOR_JS_TOOLS,
				onChange: (data: any) => handleChange(data),
			});
		}
	}, [handleChange, currentProjectData]);

	return (
		<>
			<Box className={classes.container}>
				<div id='editorjs'></div>
				<Box className={classes.saveBtn}>
					<Button variant='contained' color='primary' onClick={handleSave}>
						Save
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Editor;

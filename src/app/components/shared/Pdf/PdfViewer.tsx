import * as React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Box, makeStyles, Theme } from '@material-ui/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

import clsx from 'clsx';

interface PdfViewerProps {
	filename: string;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		pdfView: {
			overflowY: 'scroll',
			// height: '100vh',
			// width: '70vw',
			// position: 'absolute',
			// left: '50%',
			// transform: 'translateX(-50%)',
		},
	};
});

const PdfViewer: React.FC<PdfViewerProps> = ({ filename }) => {
	const classes = useStyles();

	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const thumbnailPluginInstance = thumbnailPlugin();

	return (
		<>
			<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
				<Box className={clsx(classes.pdfView, 'hide-scrollbar')}>
					<Viewer
						plugins={[defaultLayoutPluginInstance, thumbnailPluginInstance]}
						fileUrl={filename}
					/>
				</Box>
			</Worker>
		</>
	);
};

export default PdfViewer;

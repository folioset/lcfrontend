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
	className?: string;
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		pdfView: {
			overflowY: 'scroll',
		},
	};
});

const PdfViewer: React.FC<PdfViewerProps> = ({ filename, className }) => {
	const classes = useStyles();

	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const thumbnailPluginInstance = thumbnailPlugin();

	return (
		<>
			<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
				<Box className={clsx(classes.pdfView, 'hide-scrollbar', className)}>
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

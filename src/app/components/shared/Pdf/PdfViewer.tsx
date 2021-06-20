import * as React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';

interface PdfViewerProps {
	filename: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ filename }) => {
	return (
		<>
			<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
				<Viewer fileUrl={filename} />
			</Worker>
		</>
	);
};

export default PdfViewer;

import { Box } from '@material-ui/core';
import * as React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';

const PdfThumbnail: React.FC<{ file: string; onClick: (e: any) => void }> = ({
	file,
	onClick,
}) => {
	React.useEffect(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
	}, []);

	return (
		<Box style={{ cursor: 'pointer' }} onClick={onClick}>
			<Document file={file}>
				<Page height={60} width={80} pageNumber={1} />
			</Document>
		</Box>
	);
};

export default PdfThumbnail;

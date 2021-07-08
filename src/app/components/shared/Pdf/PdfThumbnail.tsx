import { Box } from '@material-ui/core';
import * as React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const PdfThumbnail: React.FC<{ file: string; onClick: (e: any) => void }> = ({
	file,
	onClick,
}) => {
	return (
		<Box style={{ cursor: 'pointer' }} onClick={onClick}>
			<Document file={file}>
				<Page height={400} width={400} pageNumber={1} />
			</Document>
		</Box>
	);
};

export default PdfThumbnail;

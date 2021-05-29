import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { Page } from 'react-pdf';

import { Document } from 'react-pdf/dist/esm/entry.webpack';
import Loader from '../Loader/Loader';

interface PdfViewProps {
	filename: any;
}

const useStyles = makeStyles(() => {
	return {
		pdfView: {
			position: 'absolute',
			top: 0,
			left: '50%',
			transform: 'translateX(-50%)',
			width: 'max-content',
			height: '100%',
			overflow: 'scroll',
			display: 'flex',
			justifyContent: 'center',
		},
	};
});

const PdfView: React.FC<PdfViewProps> = ({ filename }) => {
	const [numPages, setNumPages] = React.useState<null | number>(null);
	const classes = useStyles();

	function onDocumentLoadSuccess(context: any) {
		setNumPages(context.numPages);
	}

	return (
		<Box className={clsx(classes.pdfView, 'hide-scrollbar')}>
			<Document
				file={filename}
				loading={
					<Box className='hide-scrollbar'>
						<Loader fullScreen />
					</Box>
				}
				onLoadSuccess={onDocumentLoadSuccess}>
				{Array.from(new Array(numPages), (el, index) => (
					<Page key={`page_${index + 1}`} pageNumber={index + 1} />
				))}
			</Document>
		</Box>
	);
};

export default PdfView;

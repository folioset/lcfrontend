import {
	Box,
	IconButton,
	makeStyles,
	Theme,
	useMediaQuery,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
// import axios from 'axios';
import clsx from 'clsx';
import * as React from 'react';
import { Page } from 'react-pdf';

import { Document } from 'react-pdf/dist/esm/entry.webpack';
// import { useQuery } from 'react-query';
import Loader from '../Loader';
// import SamplePdf from './../../../../assets/test.pdf';

interface PdfViewProps {
	filename: any;
	onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
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
			maxWidth: 'max-content',
		},
		closeBtn: {
			position: 'absolute',
			top: 0,
			right: 0,
			color: '#fff',
		},
	};
});

const PdfView: React.FC<PdfViewProps> = ({ filename, onClose }) => {
	const [numPages, setNumPages] = React.useState<null | number>(null);
	const [width, setWidth] = React.useState<number>(1000);
	const classes = useStyles();

	const laptopWidth = useMediaQuery('(min-width: 960px)');
	const tabletWidth = useMediaQuery('(min-width: 650px)');
	const mobileWidth = useMediaQuery('(min-width: 300px)');

	const resizePdf = React.useCallback(() => {
		if (laptopWidth) {
			setWidth(1000);
		} else if (tabletWidth) {
			setWidth(600);
		} else if (mobileWidth) {
			setWidth(window.innerWidth - 200);
		}
	}, [mobileWidth, tabletWidth, laptopWidth]);

	React.useEffect(() => {
		resizePdf();
	}, [resizePdf]);

	window.addEventListener('resize', () => {
		resizePdf();
	});

	function onDocumentLoadSuccess(context: any) {
		setNumPages(context.numPages);
	}

	return (
		<>
			<IconButton className={classes.closeBtn} onClick={onClose}>
				<Close />
			</IconButton>

			<Box className={clsx(classes.pdfView, 'hide-scrollbar')}>
				<Document
					file={filename}
					loading={
						<Box className='hide-scrollbar'>
							<Loader fullScreen />
						</Box>
					}
					renderMode='canvas'
					onLoadSuccess={onDocumentLoadSuccess}>
					{Array.from(new Array(numPages), (el, index) => (
						<Page
							width={width}
							key={`page_${index + 1}`}
							pageNumber={index + 1}
						/>
					))}
				</Document>
			</Box>
		</>
	);
};

export default PdfView;

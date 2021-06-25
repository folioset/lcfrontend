import * as React from 'react';

const useFileUpload = () => {
	const [fileUrl, setFileUrl] = React.useState<string>('');

	const handleUploadFileUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target?.files) {
			const currPhotoUrl = URL.createObjectURL(e.target.files[0]);
			setFileUrl(currPhotoUrl);
		}
	};

	return { fileUrl, handleUploadFileUrl };
};

export default useFileUpload;

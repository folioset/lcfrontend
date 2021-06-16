import * as React from 'react';

const useImageUpload = () => {
	const [imageUrl, setImageUrl] = React.useState<string>('');

	const handleUploadImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target?.files) {
			const currPhotoUrl = URL.createObjectURL(e.target.files[0]);
			setImageUrl(currPhotoUrl);
		}
	};

	return { imageUrl, handleUploadImageUrl };
};

export default useImageUpload;

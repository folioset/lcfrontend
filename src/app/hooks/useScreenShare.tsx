import * as React from 'react';
import { useHistory } from 'react-router-dom';

const useScreenShare = () => {
	const history = useHistory();
	const userScreenVideoRef = React.useRef<any>();
	const userVideoRef = React.useRef<any>();
	const recorderRef = React.useRef<any>();
	const streamRef = React.useRef<any>();
	const [chunks, setChunks] = React.useState<any>([]);
	const [isRecording, setIsRecording] = React.useState<boolean>(false);

	const [microphoneDevices, setMicrophoneDevices] = React.useState<any>([]);

	React.useEffect(() => {
		(async () => {
			const devices: MediaDeviceInfo[] =
				await navigator.mediaDevices.enumerateDevices();

			// audio devices
			const audioInputDevices = devices.filter((d) => d.kind === 'audioinput');
			setMicrophoneDevices(audioInputDevices);
		})();
	}, []);

	React.useEffect(() => {
		if (chunks.length) {
			const blob = new Blob(chunks, {
				type: 'video/mp4',
			});

			const blobUrl = URL.createObjectURL(blob);
			setChunks([]);
			history.push('/interview/finish', { url: blobUrl, blob });
		}
	}, [chunks, history]);

	const getStream = async () => {
		// Screen record stream
		const userVideoScreenStream = await (
			navigator.mediaDevices as any
		).getDisplayMedia({
			video: true,
		});
		userScreenVideoRef.current.srcObject = userVideoScreenStream;

		// User Media (Webcam & Microphone)
		const userVideoStream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});

		userVideoRef.current.srcObject = userVideoStream;
		userVideoRef.current.muted = true;

		return new MediaStream([
			...userScreenVideoRef.current.srcObject.getTracks(),
			...userVideoRef.current.srcObject.getTracks(),
		]);
	};

	const handleDataAvailable = (event: any) => {
		const newChunks = [...chunks];
		if (event.data.size > 0) {
			newChunks.push(event.data);
			setChunks(newChunks);
		} else {
		}
	};

	const startRecord = async () => {
		streamRef.current = await getStream();

		recorderRef.current = new MediaRecorder(streamRef.current);
		recorderRef.current.ondataavailable = handleDataAvailable;
		try {
			await recorderRef.current.start();
			setIsRecording(true);
		} catch (err) {
			setIsRecording(false);
		}
	};

	const stopRecord = async () => {
		userVideoRef.current?.srcObject?.getTracks().forEach(async (track: any) => {
			await track.stop();
		});
		userScreenVideoRef.current?.srcObject
			?.getTracks()
			.forEach(async (track: any) => {
				await track.stop();
			});
		userVideoRef.current.pause();
		userScreenVideoRef.current.srcObject = undefined;
		userVideoRef.current.srcObject = undefined;
		await recorderRef.current?.stop();
		setIsRecording(false);
	};

	return {
		userScreenVideoRef,
		userVideoRef,
		startRecord,
		stopRecord,
		isRecording,
		microphoneDevices,
	};
};

export default useScreenShare;

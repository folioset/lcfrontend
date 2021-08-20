import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { InterviewContext } from '../contexts/InterviewContext';

const useScreenShare = () => {
	const history = useHistory();
	const userVideoRef = React.useRef<any>();
	const recorderRef = React.useRef<any>();
	const streamRef = React.useRef<any>();
	const [chunks, setChunks] = React.useState<any>([]);
	const [isRecording, setIsRecording] = React.useState<boolean>(false);
	const [videoBlob, setVideoBlob] = React.useState<Blob>();
	const { saveFile } = React.useContext(InterviewContext);
	const [permission, setPermission] = React.useState<any>(true);
	const [browserAllowed, setBrowserAllowed] = React.useState<any>(true);
	const [microphoneDevices, setMicrophoneDevices] = React.useState<any>([]);
	const [microphoneDevice, setMicrophoneDevice] = React.useState<any>();

	React.useEffect(() => {
		(() => {
			if (
				navigator.userAgent.indexOf('Chrome') > -1 ||
				navigator.userAgent.indexOf('Edge') > -1
			) {
				setBrowserAllowed(true);
			} else {
				setBrowserAllowed(false);
			}
		})();
	}, []);

	const checkMediaPermission = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});
			setPermission(true);

			stream.getTracks().forEach((e) => {
				e.stop();
			});
		} catch (err) {
			setPermission(false);
		}
	};

	React.useEffect(() => {
		(async () => {
			const devices: MediaDeviceInfo[] =
				await navigator.mediaDevices.enumerateDevices();

			if (!devices.length) {
				setPermission(false);
				return;
			}

			// audio devices
			const audioInputDevices = devices.filter(
				(d) =>
					d.kind === 'audioinput' &&
					(d.label.includes('Microphone') || d.label.includes('microphone'))
			);
			const currentDevice =
				devices.filter((d) => d.deviceId === 'default')[0] ||
				audioInputDevices[0];
			setMicrophoneDevice(currentDevice);
			setMicrophoneDevices(audioInputDevices);
		})();
	}, [permission]);

	React.useEffect(() => {
		navigator.mediaDevices.ondevicechange = async function (e) {
			const devices: MediaDeviceInfo[] =
				await navigator.mediaDevices.enumerateDevices();

			// audio devices
			const audioInputDevices = devices.filter((d) => d.kind === 'audioinput');
			const currentDevice =
				devices.filter((d) => d.deviceId === 'default')[0] ||
				audioInputDevices[0];
			setMicrophoneDevice(currentDevice);
			setMicrophoneDevices(audioInputDevices);
		};
	}, [permission]);

	React.useEffect(() => {
		if (chunks.length) {
			const vBlob = new Blob(chunks, {
				type: 'video/mp4',
			});
			setVideoBlob(vBlob);

			// Save Blob
			history.push('/interview/finish');
		}
	}, [chunks, history, saveFile]);

	const getStream = async () => {
		// User Media (Webcam & Microphone)
		const userVideoStream = await navigator.mediaDevices.getUserMedia({
			audio: {
				deviceId: microphoneDevice.deviceId,
			},
			video: true,
		});

		userVideoRef.current.srcObject = userVideoStream;
		userVideoRef.current.muted = true;

		return new MediaStream(userVideoRef.current.srcObject.getTracks());
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
			console.log({ ...err });
			setIsRecording(false);
		}
	};

	const stopRecord = async () => {
		userVideoRef.current?.srcObject?.getTracks().forEach(async (track: any) => {
			await track.stop();
		});

		userVideoRef.current.pause();
		userVideoRef.current.srcObject = undefined;
		await recorderRef.current?.stop();
		setIsRecording(false);
	};

	return {
		userVideoRef,
		startRecord,
		stopRecord,
		isRecording,
		microphoneDevices,
		videoBlob,
		microphoneDevice,
		setMicrophoneDevice,
		permission,
		browserAllowed,
		setIsRecording,
		checkMediaPermission,
	};
};

export default useScreenShare;

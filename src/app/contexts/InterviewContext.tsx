import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useScreenShare from '../hooks/useScreenShare';

interface InterviewContextProps {
	question: string;
	questionId: string;
	updateQuestion: (question: string, id: string) => void;
	userScreenVideoRef: React.MutableRefObject<any>;
	userVideoRef: React.MutableRefObject<any>;
	startRecord: () => Promise<void>;
	stopRecord: () => Promise<void>;
	isRecording: boolean;
	saveFile: (file: File) => void;
	fileUrl: string;
	file: File;
	microphoneDevices: any;
	microphoneDevice: any;
	setMicrophoneDevice: any;
	switchedTab: boolean;
	permission: boolean;
	browserAllowed: boolean;
}

export const InterviewContext = React.createContext<
	Partial<InterviewContextProps>
>({});

const InterviewContextProvider: React.FC = ({ children }: any) => {
	const [question, setQuestion] = React.useState<string>('');
	const [questionId, setQuestionId] = React.useState<string>('');
	const [file, setFile] = React.useState<File>();
	const [fileUrl, setFileUrl] = React.useState<string>('');
	const [switchedTab, setSwitchedTab] = React.useState<boolean>(false);
	const location = useLocation();
	const history = useHistory();

	const {
		userScreenVideoRef,
		userVideoRef,
		startRecord,
		stopRecord,
		isRecording,
		videoBlob,
		microphoneDevices,
		microphoneDevice,
		setMicrophoneDevice,
		permission,
		browserAllowed,
		checkMediaPermission,
	} = useScreenShare();

	React.useEffect(() => {
		if (location.pathname === '/interview/room') {
			checkMediaPermission();
		}
	}, [location, checkMediaPermission]);

	React.useEffect(() => {
		if (!permission) {
			alert('please give access to microphone and webcam');
		}
	}, [permission]);

	React.useEffect(() => {
		if (location.pathname === '/interview/room' && isRecording) {
			window.onblur = () => {
				setSwitchedTab(true);
			};
		} else {
			setSwitchedTab(false);
		}
	}, [location, isRecording]);

	React.useEffect(() => {
		if (location.pathname === '/interview/room' && isRecording) {
			if (switchedTab) {
				window.onfocus = async () => {
					const timer = setTimeout(async () => {
						window.close();
						userVideoRef.current?.srcObject
							?.getTracks()
							.forEach(async (track: any) => {
								await track?.stop();
							});
						userScreenVideoRef.current?.srcObject
							?.getTracks()
							.forEach(async (track: any) => {
								await track?.stop();
							});

						window.location.href = '/';
					}, 1000);
					return () => clearTimeout(timer);
				};
			}
		}
	}, [
		location.pathname,
		switchedTab,
		history,
		isRecording,
		userScreenVideoRef,
		userVideoRef,
	]);

	React.useEffect(() => {
		if (videoBlob) {
			let date = new Date();
			let b: any = videoBlob;
			b.lastModifiedDate = date;
			b.name = `interview-${date.toISOString()}.mp4`;
			const f = new File([b], b.name, {
				type: b.type,
			});
			setFile(f);
			const url = URL.createObjectURL(b);
			setFileUrl(url);
		}
	}, [videoBlob]);

	const updateQuestion = (question: string, id: string) => {
		setQuestion(question);
		setQuestionId(id);
	};

	return (
		<>
			<InterviewContext.Provider
				value={{
					question,
					questionId,
					updateQuestion,
					userScreenVideoRef,
					userVideoRef,
					startRecord,
					stopRecord,
					isRecording,
					fileUrl,
					file,
					microphoneDevices,
					microphoneDevice,
					setMicrophoneDevice,
					switchedTab,
					permission,
					browserAllowed,
				}}>
				{children}
			</InterviewContext.Provider>
		</>
	);
};

export default InterviewContextProvider;

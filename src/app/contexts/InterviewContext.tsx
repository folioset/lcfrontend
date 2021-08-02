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

	React.useEffect(() => {
		if (location.pathname === '/interview/room') {
			window.onblur = () => {
				setSwitchedTab(true);
			};
		} else {
			setSwitchedTab(false);
		}
	}, [location]);

	React.useEffect(() => {
		if (location.pathname === '/interview/room') {
			if (switchedTab) {
				window.onfocus = () => {
					const timer = setTimeout(() => {
						window.close();
						history.replace('/');
					}, 1000);
					return () => clearTimeout(timer);
				};
			}
		}
	}, [location, switchedTab, history]);

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
	} = useScreenShare();

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
				}}>
				{children}
			</InterviewContext.Provider>
		</>
	);
};

export default InterviewContextProvider;

import * as React from 'react';
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
}

export const InterviewContext = React.createContext<
	Partial<InterviewContextProps>
>({});

const InterviewContextProvider: React.FC = ({ children }: any) => {
	const [question, setQuestion] = React.useState<string>('');
	const [questionId, setQuestionId] = React.useState<string>('');
	const [file, setFile] = React.useState<File>();
	const [fileUrl, setFileUrl] = React.useState<string>('');

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
				}}>
				{children}
			</InterviewContext.Provider>
		</>
	);
};

export default InterviewContextProvider;

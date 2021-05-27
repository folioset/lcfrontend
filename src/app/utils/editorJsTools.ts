import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';
import Image from '@editorjs/image';
import Header from '@editorjs/header';

export const EDITOR_JS_TOOLS: any = {
	header: {
		class: Header,
		inlineToolbar: true,
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
	list: {
		class: List,
		inlineToolbar: true,
	},
	simpleimage: {
		class: SimpleImage,
		inlineToolbar: true,
	},
	image: {
		class: Image,
		inlineToolbar: true,
	},
};

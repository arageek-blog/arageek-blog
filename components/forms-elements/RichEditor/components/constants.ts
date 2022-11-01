import type { Descendant, Editor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

export const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code'
};

export const ARIA_LABELS = {
	'heading-two': 'عنوان ثانوي',
	'heading-three': 'عنوان ثالثي',
	bold: 'عريض',
	italic: 'مائل',
	underline: 'تحته خط',
	code: 'كود',
	'block-quote': 'إقتباس',
	'numbered-list': 'قائمة مرقمة',
	'bulleted-list': 'قائمة غير مرقمة',
	justify: 'محاذاة لكامل العرض',
	right: 'محاذاة لليمين',
	left: 'محاذاة لليسار',
	center: 'محاذة للوسط',
	link: 'إضافة رابط',
	image: 'إضافة صورة'
};

export type EditorProps = Editor | ReactEditor | HistoryEditor;

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const INITIAL_VALUE: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }]
	}
];

import escapeHtml from 'escape-html';
import { Text } from 'slate';

const serialize = node => {
	if (Text.isText(node)) {
		let string = escapeHtml(node.text);
		if (node.bold) {
			string = `<strong>${string}</strong>`;
		}
		if (node.code) {
			string = `<code>${string}</code>`;
		}
		if (node.italic) {
			string = `<em>${string}</em>`;
		}
		if (node.underline) {
			string = `<u>${string}</u>`;
		}
		return string;
	}

	const children = node.children.map(n => serialize(n)).join('');

	switch (node.type) {
		case 'block-quote':
			return `<blockquote><p>${children}</p></blockquote>`;
		case 'list-item':
			return `<li>${children}</li>`;
		case 'numbered-list':
			return `<ol>${children}</ol>`;
		case 'bulleted-list':
			return `<ul>${children}</ul>`;
		case 'heading-one':
			return `<h1>${children}</h1>`;
		case 'heading-two':
			return `<h2>${children}</h2>`;
		case 'heading-three':
			return `<h3>${children}</h3>`;
		case 'paragraph':
			return `<p>${children}</p>`;
		case 'link':
			return `<a href="${escapeHtml(node.url)}">${children}</a>`;
		case 'image':
			return `<img src="${escapeHtml(node.url)}" />`;
		default:
			return children;
	}
};

export const serializeNodes = nodes => nodes.map(n => serialize(n)).join('\n');

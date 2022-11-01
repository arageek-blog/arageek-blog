import {
	chakra,
	Heading,
	Link,
	ListItem,
	OrderedList,
	Text,
	UnorderedList
} from '@chakra-ui/react';
import React from 'react';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';
import { CustomImage } from './CustomImage';

export const Element: React.FC<RenderElementProps> = props => {
	const { attributes, children, element } = props;
	switch (element.type) {
		case 'block-quote':
			return (
				<chakra.blockquote
					borderLeftWidth={'10px'}
					borderLeftColor={'light.500'}
					mx={6}
					px={6}
					py={'0.5em'}
					{...attributes}
				>
					{children}
				</chakra.blockquote>
			);
		case 'list-item':
			return <ListItem {...attributes}>{children}</ListItem>;
		case 'numbered-list':
			return <OrderedList {...attributes}>{children}</OrderedList>;
		case 'bulleted-list':
			return <UnorderedList {...attributes}>{children}</UnorderedList>;
		case 'heading-one':
			return (
				<Heading
					as='h1'
					size='2xl'
					{...attributes}
				>
					{children}
				</Heading>
			);
		case 'heading-two':
			return (
				<Heading
					as='h2'
					size='xl'
					{...attributes}
				>
					{children}
				</Heading>
			);
		case 'heading-three':
			return (
				<Heading
					as='h3'
					size='lg'
					{...attributes}
				>
					{children}
				</Heading>
			);
		case 'link':
			return (
				<Link
					href={element.url}
					isExternal
					{...attributes}
				>
					<InlineChromiumBugfix />
					{children}
					<InlineChromiumBugfix />
				</Link>
			);
		case 'image':
			return <CustomImage {...props} />;

		default:
			return <Text {...attributes}>{children}</Text>;
	}
};

export const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = (
			<chakra.code
				padding={'3px'}
				backgroundColor={'gray.200'}
				fontSize={'90%'}
			>
				{children}
			</chakra.code>
		);
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const InlineChromiumBugfix = () => (
	<Text
		as='span'
		contentEditable={false}
		fontSize='0'
	>
		${String.fromCodePoint(160) /* Non-breaking space */}
	</Text>
);

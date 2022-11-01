import { Box, Flex, Icon, IconButton, Image } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { Transforms } from 'slate';
import type {
	RenderElementProps} from 'slate-react';
import {
	ReactEditor,
	useFocused,
	useSelected,
	useSlateStatic
} from 'slate-react';

export const CustomImage: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
	const editor = useSlateStatic();
	const path = ReactEditor.findPath(editor, element);

	const selected = useSelected();
	const focused = useFocused();

	const handleRemove = () => Transforms.removeNodes(editor, { at: path });

	return (
		<Box {...attributes}>
			{children}
			<Box
				position={'relative'}
				contentEditable={false}
			>
				<Image
					src={element.url}
					boxShadow={selected && focused ? '0 0 0 3px #E7E5D8' : 'none'}
				/>
				{selected && focused && (
					<Flex
						pos={'absolute'}
						inset='0'
						p={2}
						pointerEvents='none'
					>
						<IconButton
							size='sm'
							aria-label={'حذف'}
							onClick={handleRemove}
							icon={<Icon as={MdDelete} />}
							pointerEvents='auto'
						/>
					</Flex>
				)}
			</Box>
		</Box>
	);
};

import type { As } from '@chakra-ui/react';
import {
  Button,
  Collapse,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  useDisclosure,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { ALLOWEDFILETYPE } from 'configs/imageTypes';
import { useAuth } from 'context';
import isUrl from 'is-url';
import { forwardRef, useRef, useState } from 'react';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumberedRtl,
  MdFormatQuote,
  MdFormatUnderlined,
  MdImage,
  MdLink,
  MdLooks3,
  MdLooksTwo,
} from 'react-icons/md';
import { useSlate, useSlateStatic } from 'slate-react';
import { mutationFn } from 'utls';
import type { RichEditorProps } from './';
import {
  ARIA_LABELS,
  insertImage,
  insertLink,
  isBlockActive,
  isLinkActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
  unwrapLink,
} from './';

export const Toolbar: React.FC<Pick<RichEditorProps, 'type'>> = ({
  type = 'simple',
}) => {
  const uploaderEl = useRef<HTMLInputElement>(null);
  const {
    isOpen: isLinkBoxOpen,
    onOpen: onLinkBoxOpen,
    onClose: onLinkBoxClose,
  } = useDisclosure();

  const handleOpenFileSelect = () => {
    uploaderEl.current.click();
  };

  const isSimple = type === 'simple';
  const isFull = type === 'full';

  return (
    <>
      <HStack
        backgroundColor={'white'}
        zIndex={1}
        pos={'sticky'}
        top={0}
        wrap={'wrap'}
        borderBottomWidth={1}
        borderColor='light.500'
        divider={<StackDivider borderColor='light.100' />}
      >
        {isFull && (
          <HStack>
            {/* <BlockButton
							format='heading-one'
							icon={MdLooksOne}
						/> */}
            <BlockButton format='heading-two' icon={MdLooksTwo} />
            <BlockButton format='heading-three' icon={MdLooks3} />
          </HStack>
        )}
        <HStack>
          <MarkButton format='bold' icon={MdFormatBold} />
          <MarkButton format='italic' icon={MdFormatItalic} />
          <MarkButton format='underline' icon={MdFormatUnderlined} />
        </HStack>
        <HStack>
          {isFull && (
            <>
              {/* <MarkButton
								format='code'
								icon={MdCode}
							/> */}
              <BlockButton format='block-quote' icon={MdFormatQuote} />
            </>
          )}
          <BlockButton format='numbered-list' icon={MdFormatListNumberedRtl} />
          <BlockButton format='bulleted-list' icon={MdFormatListBulleted} />
        </HStack>
        {/* {isFull && (
					<HStack>
						<BlockButton
							format='justify'
							icon={MdFormatAlignJustify}
						/>
						<BlockButton
							format='right'
							icon={MdFormatAlignRight}
						/>
						<BlockButton
							format='left'
							icon={MdFormatAlignLeft}
						/>
						<BlockButton
							format='center'
							icon={MdFormatAlignCenter}
						/>
					</HStack>
				)} */}
        <HStack>
          <LinkButton format='link' icon={MdLink} onOpen={onLinkBoxOpen} />
          <ImageButton onClick={handleOpenFileSelect} />
        </HStack>
      </HStack>
      <LinkBox isOpen={isLinkBoxOpen} onClose={onLinkBoxClose} />
      <ImageBox ref={uploaderEl} />
    </>
  );
};

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: As<any>;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant='outline'
      size={'md'}
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      aria-label={ARIA_LABELS?.[format] ?? ''}
      icon={<Icon as={icon} />}
      borderWidth={0}
    />
  );
};

export const BlockButton = ({
  format,
  icon,
}: {
  format: string;
  icon: As<any>;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant='outline'
      size={'md'}
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      aria-label={ARIA_LABELS?.[format]}
      icon={<Icon as={icon} />}
      borderWidth={0}
    />
  );
};

export const LinkButton = ({
  format,
  icon,
  onOpen,
}: {
  format: string;
  icon: As<any>;
  onOpen: () => void;
}) => {
  const editor = useSlate();

  const isActive = isLinkActive(editor);
  return (
    <IconButton
      variant='outline'
      size={'md'}
      isActive={isActive}
      onMouseDown={(event) => {
        if (isActive) {
          event.preventDefault();
          unwrapLink(editor);
        } else {
          onOpen();
        }
      }}
      aria-label={ARIA_LABELS?.[format] ?? ''}
      icon={<Icon as={icon} />}
      borderWidth={0}
    />
  );
};

const ImageButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <IconButton
      variant='outline'
      size={'md'}
      onClick={onClick}
      aria-label={ARIA_LABELS?.['image'] ?? ''}
      icon={<Icon as={MdImage} />}
      borderWidth={0}
    />
  );
};

const ImageBox = forwardRef((props, ref) => {
  const { token } = useAuth();
  const editor = useSlateStatic();

  const handleUploaderInput: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    const file = event?.currentTarget?.files?.[0];
    if (file) {
      const { size, type } = file;
      const fileSize = size / 1024 / 1024;
      const isValid = ALLOWEDFILETYPE.includes(type);

      if (fileSize > 1 || !isValid) {
        return;
      }

      try {
        const { data } = await mutationFn({
          name: 'media',
          namespace: 'wp/v2',
          params: { file },
          token,
        });
        const { source_url } = data;

        insertImage(editor, source_url);
      } catch (error) {}
    }
  };

  return (
    <VisuallyHiddenInput
      ref={ref}
      size={2000000}
      accept={ALLOWEDFILETYPE?.join(',')}
      type='file'
      onChange={handleUploaderInput}
    />
  );
});
ImageBox.displayName = 'ImageBox';

const LinkBox = ({ isOpen, onClose }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [value, setValue] = useState('');
  const editor = useSlate();

  const handleSave = (event) => {
    if (value === '') {
      onClose();
    }
    if (isUrl(value)) {
      event.preventDefault();
      insertLink(editor, value);
      setValue('');
      onClose();
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <Collapse in={isOpen} animateOpacity>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={'url'}
          inputMode='url'
          autoComplete='url'
          placeholder='ادخل الرابط'
          value={value}
          isInvalid={isInvalid}
          onChange={(e) => {
            setValue(e.target.value);
            if (isInvalid) {
              setIsInvalid(false);
            }
          }}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleSave}>
            إضافة
          </Button>
        </InputRightElement>
      </InputGroup>
    </Collapse>
  );
};

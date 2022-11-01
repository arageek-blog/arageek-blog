import {
  Box,
  FormControl as ChakraFormControl,
  FormErrorMessage,
  Input,
  useStyleConfig,
  VStack,
} from '@chakra-ui/react';
import { dequal } from 'dequal/lite';
import { useField } from 'formik';
import isHotkey from 'is-hotkey';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import type { RichEditorProps } from './components';
import {
  Element,
  HOTKEYS,
  INITIAL_VALUE,
  Leaf,
  serializeNodes,
  toggleMark,
  Toolbar,
  withInlines,
} from './components';

export const RichEditor: React.FC<RichEditorProps> = ({
  type = 'simple',
  name,
}) => {
  const [field, { error, touched }, { setTouched, setValue: setFormikValue }] =
    useField(name);
  const [value, setValue] = useState<Descendant[]>(INITIAL_VALUE);
  const [htmlValue, setHtmlValue] = useState<string>('');
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    [],
  );

  const style = useStyleConfig('Input');
  const {
    field: { _invalid, _focus },
  } = style;
  const isInvalid = !!error && touched;

  //focus selection
  const [focused, setFocused] = useState(false);
  const savedSelection = useRef(editor.selection);

  const onFocus = useCallback(() => {
    setFocused(true);
    setTouched(true);
    if (!editor.selection && value?.length) {
      Transforms.select(
        editor,
        savedSelection.current ?? Editor.end(editor, []),
      );
    }
  }, [editor]);

  const onBlur = useCallback(() => {
    setFocused(false);
    savedSelection.current = editor.selection;
  }, [editor]);

  const divRef = useRef<HTMLDivElement>(null);

  const focusEditor = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const handleOnChange = (newValue) => {
    if (!dequal(value, newValue)) {
      setHtmlValue(serializeNodes(newValue));
      setFormikValue(serializeNodes(newValue));
    }
    setValue(newValue);
  };

  return (
    <ChakraFormControl id={name} isInvalid={isInvalid}>
      <Box
        ref={divRef}
        onMouseDown={focusEditor}
        transitionDuration='normal'
        transitionProperty='common'
        borderBottomWidth={1}
        sx={focused ? _focus : isInvalid && _invalid}
      >
        <Slate editor={editor} value={value} onChange={handleOnChange}>
          <VStack align={'stretch'} pos='relative'>
            <Toolbar type={type} />
            <Box
              px={1}
              sx={{
                '* + *': {
                  mt: 2,
                },
              }}
              overflow='auto'
              resize={'vertical'}
              as={Editable}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              spellCheck
              style={{
                minHeight: type === 'full' ? '20rem' : '10rem',
              }}
            />
          </VStack>
        </Slate>
        <Input type='hidden' value={htmlValue} {...field} />
      </Box>
      {isInvalid && <FormErrorMessage>{error}</FormErrorMessage>}
    </ChakraFormControl>
  );
};

import type { TextareaProps } from '@chakra-ui/react';
import { Textarea as ChakraTextarea, VisuallyHidden } from '@chakra-ui/react';
import { useField } from 'formik';
import type { ChangeEventHandler } from 'react';
import { useRef, useState } from 'react';
import { FormControl } from './';

interface Props {
  name: string;
  size: TextareaProps['size'];
}

const height = {
  md: 'var(--arageek-sizes-12)',
  sm: 'var(--arageek-sizes-8)',
};

const fontSizes = {
  md: 'var(--arageek-fontSizes-lg)',
  sm: 'var(--arageek-fontSizes-sm)',
};

export const CommentTextarea: React.FC<Props> = ({ name, size }) => {
  const buttonRef = useRef();
  const [field, , { setValue }] = useField(name);
  const [linesCount, setLinesCount] = useState<number>(0);

  const handleOnKeyUp: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value = '' } = event?.target;

    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    setLinesCount(numberOfLineBreaks);
    setValue(value);
  };

  const minHeight = height?.[size];
  const fontSize = fontSizes?.[size];

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  return (
    <FormControl name={name}>
      <ChakraTextarea
        {...field}
        value={field.value ?? ''}
        name={name}
        size={size}
        variant={'outline'}
        minH={minHeight}
        style={{
          '--number-of-line-breaks': linesCount,
        }}
        // min-height + lines x line-height + padding + border
        height={`calc(${minHeight} + var(--number-of-line-breaks) * var(--arageek-lineHeights-short) * ${fontSize})`}
        placeholder='إضافة تعليق...'
        overflow={'hidden'}
        onChange={handleOnKeyUp}
        rounded='lg'
        backgroundColor='white'
        onKeyDown={onKeyDown}
      />
      <VisuallyHidden>
        <button ref={buttonRef} type='submit'>
          إضافة
        </button>
      </VisuallyHidden>
    </FormControl>
  );
};

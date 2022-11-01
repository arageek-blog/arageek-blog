import { useMemo } from 'react';
import uniqolor from 'uniqolor';

export const useQuestionColors = (text: string = ''): string => {
  const [c1, c2] = useMemo(() => {
    const color1 = uniqolor(text);
    const color2 = uniqolor(text.split('').reverse().join(''));

    return [color1, color2];
  }, [text]);

  return `linear(to-r, ${c1.color}, ${c2.color})`;
};

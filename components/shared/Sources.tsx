import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ListItem,
  OrderedList,
  useAccordionItemState
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useState } from 'react';
import { htmlParser } from 'utls';

interface Props {
  contentRef: MutableRefObject<any>;
}

type Item = {
  id: string;
  content: string;
};

const Sources: React.FC<Props> = ({ contentRef }) => {
  const [items, setItems] = useState<Item[]>([]);
  const { asPath } = useRouter();
  const urlWithoutHash = asPath.split('#')[0];

  useEffect(() => {
    if (!contentRef?.current) {
      return;
    }
    const nodes = contentRef.current?.querySelectorAll('.bfn-footnoteHook');
    const items = [...nodes].map(({ hash, dataset }) => ({
      id: hash?.replace('#', ''),
      content: dataset?.['footnoteContent']
    }));

    setItems(items);
  }, [urlWithoutHash, contentRef]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion id={'sources'} allowToggle py='6'>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              المصادر
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <OrderedList>
            {items.map(({ content, id }, index) => (
              <ListItem id={id} key={index}>
                {htmlParser(content)}
              </ListItem>
            ))}
          </OrderedList>
        </AccordionPanel>
        <AccordionOpenHandler />
      </AccordionItem>
    </Accordion>
  );
};

const AccordionOpenHandler = () => {
  const { onOpen } = useAccordionItemState();
  const { asPath } = useRouter();

  useEffect(() => {
    if (asPath.includes('#sources')) {
      onOpen();
    }
    //eslint-disable-next-line
  }, [asPath]);

  return null;
};

export default Sources;

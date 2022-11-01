import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';

type Item = {
  title: string;
  href: string;
};
interface Props {
  items: Item[];
}

export const GeneralSources: React.FC<Props> = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
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
          <UnorderedList>
            {items.map(({ title, href }, index) => (
              <ListItem key={index}>
                <Link href={href} isExternal>
                  {title}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

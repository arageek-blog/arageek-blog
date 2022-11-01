import { VStack } from '@chakra-ui/react';
import { ContentRenderer, Heading } from 'components/shared';
import React from 'react';

interface Props {
  id?: string;
  title: string;
  content: string;
}

export const ContentSection: React.FC<Props> = ({ title, id, content }) => {
  if (!content) {
    return null;
  }

  return (
    <VStack align={'stretch'} spacing={2}>
      <Heading id={id} title={title} />
      <ContentRenderer content={content} />
    </VStack>
  );
};

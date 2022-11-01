import type { IconButtonProps } from '@chakra-ui/react';
import { HStack, Icon, IconButton, useClipboard } from '@chakra-ui/react';
import {
  FaFacebook,
  FaLink,
  FaLinkedinIn,
  FaRegThumbsUp,
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';

interface Props {
  link: string;
  title: string;
}

const sharedProps: IconButtonProps = {
  as: 'a',
  size: 'md',
  variant: 'ghost',
  target: '_blank',
  rel: 'noopener noreferrer'
};

export const ShareMenu: React.FC<Props> = ({ link, title }) => {
  const pageTitle = title?.rendered;

  const { hasCopied, onCopy } = useClipboard(link);

  return (
    <HStack spacing={1}>
      <IconButton
        {...sharedProps}
        icon={<Icon as={hasCopied ? FaRegThumbsUp : FaLink} />}
        aria-label='نسخ اللينك'
        onClick={onCopy}
        colorScheme={hasCopied ? 'green' : 'dark'}
      />
      <IconButton
        {...sharedProps}
        href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
        icon={<Icon as={FaFacebook} />}
        aria-label='مشاركة على فيسبوك'
        colorScheme={'facebook'}
      />
      <IconButton
        {...sharedProps}
        href={`https://twitter.com/intent/tweet?text=${pageTitle} ${link}`}
        icon={<Icon as={FaTwitter} />}
        aria-label='مشاركة على تويتر'
        colorScheme={'twitter'}
      />
      {/* <IconButton
        {...sharedProps}
        href={`https://www.linkedin.com/sharing/share-offsite/?&url=${link}`}
        icon={<Icon as={FaLinkedinIn} />}
        aria-label='مشاركة على ليندك إن'
        colorScheme={'linkedin'}
      /> */}
      <IconButton
        {...sharedProps}
        href={`https://api.whatsapp.com/send?text=${pageTitle} ${link}`}
        icon={<Icon as={FaWhatsapp} />}
        aria-label='مشاركة عن طريق الواتساب'
        colorScheme={'whatsapp'}
      />
    </HStack>
  );
};

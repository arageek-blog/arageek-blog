import { BioCard } from 'components/shared';

const BioCardShortcode = ({ data, children }) => {
  const imageUrl = data?.['data-image'];
  const title = data?.['data-title'];
  const link = data?.['data-link'] ?? '/';

  const imageData = {
    url: imageUrl,
    alt: title,
  };

  return (
    <BioCard title={title} link={link} image={imageData}>
      {children}
    </BioCard>
  );
};

export default BioCardShortcode;

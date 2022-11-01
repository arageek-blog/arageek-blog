import { Center } from '@chakra-ui/react';
import Embed from 'react-embed';
import { useInView } from 'react-intersection-observer';

export const Twitter = ({ url }) => {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true
	});

	if (!url) {
		return null;
	}

	return (
		<Center
			ref={ref}
			w='full'
			sx={{
				'& > div': {
					width: { base: 'full', md: 4 / 5 }
				},
				'& .twitter-tweet': {
					margin: '0 auto !important'
				}
			}}
		>
			{inView && <Embed url={url} />}
		</Center>
	);
};

import { AspectRatio, Center, Icon, IconButton, Image, useDisclosure } from '@chakra-ui/react';
import getYouTubeID from 'get-youtube-id';
import { Play } from 'iconsax-react';

export const YouTube = ({ url }) => {
	const { isOpen, onOpen } = useDisclosure();
	const videoId = getYouTubeID(url);
	const thumb = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

	if (!url) {
		return null;
	}

	return (
		<>
			{isOpen ? (
				<AspectRatio
					maxW='100%'
					ratio={16 / 9}
				>
					<iframe
						src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					/>
				</AspectRatio>
			) : (
				<AspectRatio ratio={16 / 9}>
					<Center>
						<Image
							rounded={'md'}
							pos={'absolute'}
							inset={0}
							w='full'
							h='full'
							objectFit={'cover'}
							src={thumb}
							loading='lazy'
							alt={`فيديو يوتيوب`}
						/>
						<IconButton
							size={'lg'}
							icon={<Icon as={Play} />}
							onClick={onOpen}
							aria-label='تشغيل الفيديو'
						/>
					</Center>
				</AspectRatio>
			)}
		</>
	);
};

import type { AspectRatioProps} from '@chakra-ui/react';
import { AspectRatio, Skeleton, WrapItem } from '@chakra-ui/react';

// export const SkeletonText: React.FC<SkeletonProps> = ({
// 	height = 4,
// 	mb = 0,
// 	noOfLines = 3,
// 	...props
// }) => {
// 	return (
// 		<VStack
// 			w='full'
// 			align='stretch'
// 			mb={mb}
// 			spacing={1}
// 		>
// 			{Array(noOfLines)
// 				.fill('')
// 				.map((_, index) => (
// 					<Skeleton
// 						height={height}
// 						key={index}
// 						width={1 + index === noOfLines ? '50%' : 'full'}
// 						{...props}
// 					/>
// 				))}
// 		</VStack>
// 	);
// };

// export const SkeletonHeading: React.FC<SkeletonProps> = ({ noOfLines = 2, ...props }) => {
// 	return (
// 		<SkeletonText
// 			height={4}
// 			noOfLines={noOfLines}
// 			{...props}
// 		/>
// 	);
// };

export const SkeletonImage: React.FC<AspectRatioProps> = ({ ratio = 16 / 9, ...rest }) => {
	return (
		<AspectRatio
			ratio={ratio}
			w='full'
			{...rest}
		>
			<Skeleton />
		</AspectRatio>
	);
};

export const SkeletonButton = () => {
	return (
		<Skeleton
			height={10}
			width={44}
		/>
	);
};

export const SkeletonWrapButton = () => {
	return (
		<WrapItem>
			<SkeletonButton />
		</WrapItem>
	);
};

export const SkeletonSlide = () => {
	return <SkeletonImage ratio={{ base: 16 / 9, xl: 21 / 9 }} />;
};

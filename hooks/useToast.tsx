import type { UseToastOptions } from '@chakra-ui/react';
import { useToast as useChakraToast } from '@chakra-ui/react';

export const useToast = () => {
	const toast = useChakraToast();

	const fns = (params: UseToastOptions): void => {
		if (!params || Object.keys(params)?.length === 0) {
			return;
		}

		toast({
			status: 'success',
			...params,
			duration: 9000,
			isClosable: true,
			variant: 'subtle',
			position: 'top'
		});
	};

	return fns;
};

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtl from 'stylis-plugin-rtl';

export const RTLProvider: React.FC = ({ children }) => {
	const cache = createCache({ key: 'css-ar', stylisPlugins: [rtl] });
	return (
		<CacheProvider
			value={cache}
			children={children}
		/>
	);
};

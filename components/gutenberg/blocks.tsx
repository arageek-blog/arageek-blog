// const HtmlComponent = dynamic(() => import('./core/Html'));
import { acfBlocks } from './acf';
import { coreBlocks } from './core';

export const BlocksDirectory = {
	...coreBlocks,
	...acfBlocks
};

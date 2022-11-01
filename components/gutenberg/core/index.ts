import dynamic from 'next/dynamic';

export const coreBlocks = {
  'core/paragraph': dynamic(() => import('./Paragraph')),
  'core/heading': dynamic(() => import('./Heading')),
  'core/list': dynamic(() => import('./List')),
  'core/quote': dynamic(() => import('./GlobalParser')),
  'core/code': dynamic(() => import('./GlobalParser')),
  'core/preformatted': dynamic(() => import('./GlobalParser')),
  'core/pullquote': dynamic(() => import('./GlobalParser')),
  'core/verse': dynamic(() => import('./GlobalParser')),
  'core/table': dynamic(() => import('./GlobalParser')),

  'core/image': dynamic(() => import('./GlobalParser')),
  'core/gallery': dynamic(() => import('./Gallery')),
  'core/audio': dynamic(() => import('./GlobalParser')),
  'core/video': dynamic(() => import('./GlobalParser')),
  'core/file': dynamic(() => import('./File')),
  'core/buttons': dynamic(() => import('./Buttons')),
  'core/button': dynamic(() => import('./Button')),
  // 'core/cover': //! not used,
  // 'core/media-text': //! not used,

  'core/group': dynamic(() => import('./Group')),
  'core/columns': dynamic(() => import('./Columns')),
  'core/column': dynamic(() => import('./Column')),
  'core/separator': dynamic(() => import('./GlobalParser')),
  'core/spacer': dynamic(() => import('./Spacer')),
  'core/embed': dynamic(() => import('./Embed')),

  'tadv/classic-paragraph': dynamic(() => import('./GlobalParser')),

  'core/shortcode': dynamic(() => import('./Shortcode')),

  'core/html': dynamic(() => import('./GlobalParser')),
  fallback: dynamic(() => import('./GlobalParser'))
};

import dynamic from 'next/dynamic';

const postTypesDirectory = {
  post: {
    page: dynamic(() => import('./post/page')),
    bio: dynamic(() => import('./post/bio')),
    encyclopedia: dynamic(() => import('./post/encyclopedia')),
    tv: dynamic(() => import('./post/tv')),
    podcast: dynamic(() => import('./post/podcast')),
    art: dynamic(() => import('./post/post')),
    edu: dynamic(() => import('./post/post')),
    ibda3world: dynamic(() => import('./post/post')),
    news: dynamic(() => import('./post/post')),
    listat: dynamic(() => import('./post/post')),
    post: dynamic(() => import('./post/post')),
    tech: dynamic(() => import('./post/post'))
  },
  taxonomy: {
    person_zodiac: dynamic(() => import('./taxonomy/bio')),
    person_nationality: dynamic(() => import('./taxonomy/bio')),
    person_country_of_birth: dynamic(() => import('./taxonomy/bio')),
    person_city_of_birth: dynamic(() => import('./taxonomy/bio')),
    person_job: dynamic(() => import('./taxonomy/bio')),
    arts_cat: dynamic(() => import('./taxonomy/post')),
    edu_cat: dynamic(() => import('./taxonomy/post')),
    encyclopedia_cat: dynamic(() => import('./taxonomy/post')),
    ibda3world_cat: dynamic(() => import('./taxonomy/post')),
    listat_cat: dynamic(() => import('./taxonomy/post')),
    news_cat: dynamic(() => import('./taxonomy/post')),
    tech_cat: dynamic(() => import('./taxonomy/post')),
    tv_cat: dynamic(() => import('./taxonomy/post')),
    podcast_cat: dynamic(() => import('./taxonomy/post')),
    podcast_playlist: dynamic(() => import('./taxonomy/post')),
    category: dynamic(() => import('./taxonomy/post'))
  },
  user: {
    author: dynamic(() => import('./user/author'))
  }
};

export default postTypesDirectory;

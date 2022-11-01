import dayjs from 'dayjs';

export const getGAPostParams = (url, route_data) => {
  const { id, date, title, _embedded, type } = route_data ?? {};

  const author = _embedded?.['author']?.[0];

  const autherData = author
    ? {
        pagePostAuthor: author?.name,
        pagePostAuthorID: author?.id
      }
    : {
        pagePostAuthor: 'أراجيك',
        pagePostAuthorID: '14'
      };

  const dateFns = dayjs(date);

  const postDate = dateFns.format('YYYY-MM-DD');
  const [pagePostDateYear, pagePostDateMonth, pagePostDateDay] =
    postDate.split('-');

  return {
    postParams: {
      ...autherData,
      pagePostDate: postDate,
      pagePostDateDay,
      pagePostDateMonth,
      pagePostDateYear,
      pageTitle: title?.rendered ?? '',
      postID: id,

      pagePostTerms: { post_tag: [] },
      pagePostType: type,
      pagePostType2: `single-${type}`,
      postFormat: 'standard',
      visitorType: 'visitorType',
      visitorLoginState: 'logged-out'
    },
    scrollURI: url
  };
};

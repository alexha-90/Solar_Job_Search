import NewsAPI from 'newsapi';
//===============================================================================================//

export default function fetchNewsFeeds() {
    const newsAPI = new NewsAPI('54951ead39004d56aedc7ad8fd43affa'); //temporary key. not for production

    return newsAPI.v2.everything({
        // q: 'solar AND (energy or industry or panel or technology or cost or price or company or rebate)',
        q: 'solar energy',
        sources: 'the-new-york-times, abc-news',
        domains: 'http://www.nytimes.com, http://abcnews.go.com',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        page: 10
    }).then(response => {
        console.log(response);
        return response;
    }).catch(err => {
        // cannot get error to trigger. attempted to break API call, trigger on landing page, no luck.
        console.log(err);
    });
}
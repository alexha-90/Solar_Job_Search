import React from 'react';
//================================================================================================//
export default function populateNewsFeed(data, loading) {
    if (loading) {
        return 'Loading...';
    }
    console.log(data);
    const top10 = data.splice(0, 11);
    return (
        <div>
            {top10.map((article) => {
                return (
                    <div className='' key={article.url}>
                        <div id='articleContainer'>
                            <div id='articleImage'>
                            </div>
                            <a href={article.url}>{article.title}</a>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
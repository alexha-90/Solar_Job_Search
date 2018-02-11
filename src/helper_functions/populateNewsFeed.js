import React from 'react';
//================================================================================================//
export default function populateNewsFeed(data, loading) {
    if (loading) {
        return 'Loading...';
    }

    // console.log(data);

    for (let i = 0; i < data.length; i++) {
        if (!data[i].urlToImage) {
            data[i].urlToImage = 'https://png.icons8.com/cotton/50/000000/news.png'
        }
    }

    return (
        <div>
            {data.map((article) => {
                return (
                    <div className='' key={article.url}>
                        <div id='articleContainer'>
                            <div id='articleImage'>
                                <img src={article.urlToImage} alt="articleImg"/>
                            </div>
                            <div id='articleContents'>
                                <a href={article.url}>{article.title}</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
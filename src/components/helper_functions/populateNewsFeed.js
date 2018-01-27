import React from 'react';
//================================================================================================//
export default function populateNewsFeed(data, loading) {
    if (loading) {
        return 'Loading...';
    }
    console.log(data);
    const top10 = data.splice(1, 11); // first result was erroneous sometimes

    for (let i = 0; i < top10.length; i++) {
        if (!top10[i].urlToImage) {
            top10[i].urlToImage = 'http://clipartix.com/wp-content/uploads/2016/04/Clipart-light-bulb-lit-clipartbold.png'
        }
    }

    return (
        <div>
            {top10.map((article) => {
                return (
                    <div className='' key={article.url}>
                        <div id='articleContainer'>
                            <div id='articleImage'>
                                <img src={article.urlToImage} alt="img"/>
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
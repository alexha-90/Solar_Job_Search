import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-up';
import NewsAPI from 'newsapi';
// import { removeDuplicates } from '../helperFunctions';


class Landing extends Component {
    constructor() {
        super();
        this.state = {
            loadingFeed: true
        };

        this.newsAPI = new NewsAPI('');
        this.populateFeed = this.populateFeed.bind(this);
    }

    populateFeed() {
        let articlesArr = [];

        this.newsAPI.v2.everything({
            q: 'solar AND (cells or cell or panel or panels or technology or cost or price or company or industry) OR photovoltaic OR photovoltaics',
            sources: 'google-news',
            domains: 'news.google.com',
            language: 'en',
            sortBy: 'publishedAt',
            page: 1
        }).then(response => {
            console.log(response);
            articlesArr = [response.articles];

            // need to remove duplicate titles. Doubled since some are videos
            // const hashTable = {};
            //
            // for (let i = 0; i < articlesArr.length; i++) {
            //
            // }
        }).catch(err => {
            console.log(err);
            articlesArr = false;
        });
        return (
            <div>
                {articlesArr.length}
            </div>
        )
    }


    render() {
        return (
            <section className="landing">
                <div className="mainJumbotron">
                    <div id="searchContainer">
                        <div id="search">
                            test
                        </div>
                    </div>
                </div>
                <Grid id="additionalContent">
                    <Row>
                        <Col md={12} lg={7} id="learnMore">
                            <h1>Why solar?</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas semper urna, a blandit urna bibendum eu. Fusce lobortis sapien non dui feugiat varius. Aliquam erat volutpat. Mauris accumsan ex vitae dolor mollis, et hendrerit erat porta. Aliquam eu ante nunc. Maecenas fringilla hendrerit justo vitae luctus. Vestibulum a tincidunt diam. Cras in tincidunt metus. Curabitur lacinia, lacus et mattis blandit, sapien lorem fermentum massa, in pharetra turpis lorem ac ante. Suspendisse at est lorem. Praesent a rutrum nibh. Ut consectetur sit amet est quis hendrerit. Pellentesque in nibh ante. Phasellus dictum velit in nulla ullamcorper tincidunt. Sed ut sagittis nunc.
                                Donec aliquet dolor non posuere fringilla. Pellentesque eget posuere velit. Mauris eget accumsan metus. In eu aliquet tellus. Pellentesque eros nibh, tristique ut elit non, gravida gravida neque. Integer malesuada justo urna, a ornare ante malesuada ut. Nam pulvinar pharetra dui et mattis. In pharetra euismod augue, sit amet consectetur lectus. Donec facilisis ligula sapien, et lacinia ipsum egestas ut. Nam magna turpis, venenatis sed mi non, faucibus rutrum metus. Cras vel ipsum fermentum, blandit dolor eu, feugiat arcu. Nulla tincidunt tincidunt mauris quis dictum.
                            </p>

                        </Col>
                        <Col md={12} lg={5} id="rssFeed">
                            <h1>Solar News</h1>
                            {this.populateFeed()}
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas semper urna, a blandit urna bibendum eu. Fusce lobortis sapien non dui feugiat varius. Aliquam erat volutpat. Mauris accumsan ex vitae dolor mollis, et hendrerit erat porta. Aliquam eu ante nunc. Maecenas fringilla hendrerit justo vitae luctus. Vestibulum a tincidunt diam. Cras in tincidunt metus. Curabitur lacinia, lacus et mattis blandit, sapien lorem fermentum massa, in pharetra turpis lorem ac ante. Suspendisse at est lorem. Praesent a rutrum nibh. Ut consectetur sit amet est quis hendrerit. Pellentesque in nibh ante. Phasellus dictum velit in nulla ullamcorper tincidunt. Sed ut sagittis nunc.
                                Donec aliquet dolor non posuere fringilla. Pellentesque eget posuere velit. Mauris eget accumsan metus. In eu aliquet tellus. Pellentesque eros nibh, tristique ut elit non, gravida gravida neque. Integer malesuada justo urna, a ornare ante malesuada ut. Nam pulvinar pharetra dui et mattis. In pharetra euismod augue, sit amet consectetur lectus. Donec facilisis ligula sapien, et lacinia ipsum egestas ut. Nam magna turpis, venenatis sed mi non, faucibus rutrum metus. Cras vel ipsum fermentum, blandit dolor eu, feugiat arcu. Nulla tincidunt tincidunt mauris quis dictum.
                            </p>
                        </Col>
                    </Row>
                </Grid>
                test




                <ScrollToTop showUnder={160}>
                    <span>UP</span>
                </ScrollToTop>








                <div className="infoJumbotron">

                </div>
            </section>
        )
    }
}

export default Landing;
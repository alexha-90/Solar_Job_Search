import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
// import ScrollToTop from 'react-scroll-up';
import getNewsFeeds from './helper_functions/getNewsFeeds';
import populateNewsFeed from './helper_functions/populateNewsFeed';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

//TO-DO:
// can't get getNewsFeed catch statement to trigger properly
// remove duplicate entries if present
// get local time based on client location

//===============================================================================================//

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingFeed: true,
            articlesArr: [],
            address: 'San Francisco, CA'
        };
        this.onChange = (address) => this.setState({ address })

    }

    componentWillMount() {
        getNewsFeeds()
        .then(res => {
            if (!res) {
                return <div>Something went wrong... unable to retrieve solar related news feed.</div>
            }
            return this.setState({loadingFeed: false, articlesArr: res.articles});
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error))
    };


    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        };

        const options = {
            types: ['(cities)']
        };


        return (
            <section className="landing">
                <div className="mainJumbotron">
                    <div id="searchContainer">
                        <div id="search">
                            <form onSubmit={this.handleFormSubmit}>
                                <PlacesAutocomplete inputProps={inputProps} options={options}/>
                                <button type="submit">Submit</button>
                            </form>


                        </div>
                    </div>
                </div>
                <Grid id="additionalContent">
                    <Row>
                        <Col md={12} lg={6} className="learnMore">
                            <h1>Why solar?</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas semper urna, a blandit urna bibendum eu. Fusce lobortis sapien non dui feugiat varius. Aliquam erat volutpat. Mauris accumsan ex vitae dolor mollis, et hendrerit erat porta. Aliquam eu ante nunc. Maecenas fringilla hendrerit justo vitae luctus. Vestibulum a tincidunt diam. Cras in tincidunt metus. Curabitur lacinia, lacus et mattis blandit, sapien lorem fermentum massa, in pharetra turpis lorem ac ante. Suspendisse at est lorem. Praesent a rutrum nibh. Ut consectetur sit amet est quis hendrerit. Pellentesque in nibh ante. Phasellus dictum velit in nulla ullamcorper tincidunt. Sed ut sagittis nunc.
                                Donec aliquet dolor non posuere fringilla. Pellentesque eget posuere velit. Mauris eget accumsan metus. In eu aliquet tellus. Pellentesque eros nibh, tristique ut elit non, gravida gravida neque. Integer malesuada justo urna, a ornare ante malesuada ut. Nam pulvinar pharetra dui et mattis. In pharetra euismod augue, sit amet consectetur lectus. Donec facilisis ligula sapien, et lacinia ipsum egestas ut. Nam magna turpis, venenatis sed mi non, faucibus rutrum metus. Cras vel ipsum fermentum, blandit dolor eu, feugiat arcu. Nulla tincidunt tincidunt mauris quis dictum.
                            </p>
                            <Button bsStyle="info" id="learnMoreButton">Learn more</Button>
                            &nbsp;
                            &nbsp;
                            <Button bsStyle="primary" id="trainingButton">Get training</Button>

                        </Col>
                        <Col md={12} lg={6} className="rssFeed">
                            <h1>Solar News</h1>
                            {populateNewsFeed(this.state.articlesArr, this.state.loadingFeed)}
                            <hr/>
                            <span id="newsAPICredit">
                                RSS feed courtesy of <a href="https://newsapi.org">News API</a>.
                            </span>
                        </Col>
                    </Row>
                </Grid>
                test
                <br/>


                {/*<ScrollToTop showUnder={160}>*/}
                    {/*<span>UP</span>*/}
                {/*</ScrollToTop>*/}


                <div className="infoJumbotron">

                </div>
            </section>
        )
    }
}

export default Landing;
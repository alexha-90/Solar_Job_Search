import React, { Component } from 'react';
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
// import ScrollToTop from 'react-scroll-up';
import { connect } from 'react-redux';
import getNewsFeeds from './helper_functions/getNewsFeeds';
import populateNewsFeed from './helper_functions/populateNewsFeed';
import PlacesAutocomplete from 'react-places-autocomplete'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import store from '../index';


//TO-DO:
// can't get getNewsFeed catch statement to trigger properly
// integrate redux so entirety of Landing is not passed into result
// remove duplicate entries if present
// redundant articles
// error handling for location
// get local time based on client location
// custom styling for auto complete: https://www.npmjs.com/package/react-places-autocomplete#geocode-by-place-id

//===============================================================================================//

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingFeed: true,
            redirectToJobResults: false,
            location: '',
            maxDistance: '',
        };
        this.articlesArr = null;
        this.onUpdateLocation = this.onUpdateLocation.bind(this);
        this.onGetGeolocation = this.onGetGeolocation.bind(this);
        this.onUpdateMaxDistance = this.onUpdateMaxDistance.bind(this);
        this.onHandleInputSubmit = this.onHandleInputSubmit.bind(this);
    }

    componentWillMount() {
        getNewsFeeds()
            .then(res => {
                if (!res) {
                    return <div>Something went wrong... unable to retrieve solar related news feed.</div>
                }
                this.articlesArr = res.articles;
                return this.setState({ loadingFeed: false });
        });
    }

    onUpdateLocation(location) {
        this.setState({ location: location });
    }

    onGetGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setTimeout(() => {
                    let latitude = position.coords.latitude.toString().slice(0,7);
                    let longitude = position.coords.longitude.toString().slice(0,9);
                    this.setState({ location: latitude + ', ' + longitude });
                }, 500)
            });
        } else {
            return alert('You must allow geolocation permission for us to retrieve your location.');
        }
    }

    onUpdateMaxDistance(event) {
        this.setState({ maxDistance: event.target.value });
    }

    onHandleInputSubmit = () => {
        // return all USA results if no location selected
        let submittedDistance = this.state.maxDistance || '3000';

        axios.post('/api/fetchJobs', [this.state.location, submittedDistance])
            .then(res => {
                console.log(res);
                if (res.data === 'error') {
                    return alert('Something went wrong :( We were unable to retrieve job results. Please try again later or let us know if this issue persists.');
                }
                // dispatch results to redux store
                this.props.dispatch(() => {
                    store.dispatch({
                        type: 'JOB_LIST_TO_PROPS',
                        payload: res.data
                    });
                })
            })
            .then(() => {
                this.setState({ redirectToJobResults: true });
            });
    };

    render() {
        // console.log(this.state);
        if (this.state.redirectToJobResults) {
            return <Redirect push to='/jobs'/>;
        }


        return (
            <section className="landing">

                <div className="mainJumbotron">
                    <div id="searchContainer">
                        <div id="search">

                            {/*<Form onSubmit={this.handleInputSubmit}>*/}
                            <Form>
                                <FormGroup>
                                    <ControlLabel>Location:</ControlLabel>
                                    <PlacesAutocomplete
                                        inputProps={{ value: this.state.location, onChange: this.onUpdateLocation, autoFocus: true, placeholder: 'Enter city or leave blank to see all results' }}
                                        options={{types: ['(cities)']}}/>
                                </FormGroup>

                                <Button onClick={this.onGetGeolocation} bsStyle="warning">Get my location</Button>

                                <FormGroup>
                                    <ControlLabel>Max distance</ControlLabel>
                                    <FormControl
                                        componentClass="select"
                                        name="maxDistance"
                                        onChange={this.onUpdateMaxDistance}
                                        value={this.state.maxDistance}
                                        >
                                        <option value="3000">-</option>
                                        <option value="25">25 miles</option>
                                        <option value="50">50 miles</option>
                                        <option value="75">75 miles</option>
                                        <option value="100">100 miles</option>
                                        <option value="500">500 miles</option>
                                        <option value="1000">1000 miles</option>
                                    </FormControl>
                                </FormGroup>
                                <Button onClick={this.onHandleInputSubmit} bsStyle="success">Search for jobs!</Button>
                                {/*<Button type="submit" bsStyle="success">Search for jobs!</Button>*/}
                            </Form>


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
                            {populateNewsFeed(this.articlesArr, this.state.loadingFeed)}
                            <hr/>
                            <span id="newsAPICredit">
                                RSS feed courtesy of <a href="https://newsapi.org">News API</a>.
                            </span>
                        </Col>
                    </Row>
                </Grid>

                <br/>


                {/*<ScrollToTop showUnder={160}>*/}
                    {/*<span>UP</span>*/}
                {/*</ScrollToTop>*/}


                <div className="infoJumbotron">
                    <h1>info goes here later</h1>

                </div>
            </section>
        )
    }
}

export default connect(mapStateToProps)(Landing);

function mapStateToProps(state) {
    return {
        jobList: state.jobList,
    };
}

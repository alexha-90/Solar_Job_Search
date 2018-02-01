import React, { Component } from 'react';
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
// import ScrollToTop from 'react-scroll-up';
import { connect } from 'react-redux';
import fetchNewsFeed from '../helper_functions/fetchNewsFeed'
import fetchJobs from '../helper_functions/fetchJobs';
import populateNewsFeed from '../helper_functions/populateNewsFeed';
import PlacesAutocomplete from 'react-places-autocomplete'
import { Redirect } from 'react-router-dom';
import Typist from 'react-typist';
import ReactTooltip from 'react-tooltip'
import { ChasingDots } from 'better-react-spinkit';


//TO-DO:
// add note that all links go through indeed portal first. they are getting affiliate and aggregate links
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
            loadingJobs: false,
            redirectToJobResults: false,
            location: '',
            maxDistance: '',
        };
        this.articlesArr = null;
        this.onUpdateLocation = this.onUpdateLocation.bind(this);
        this.onGetGeolocation = this.onGetGeolocation.bind(this);
        this.onUpdateMaxDistance = this.onUpdateMaxDistance.bind(this);
        this.onHandleInputSubmit = this.onHandleInputSubmit.bind(this);
        this.loadingJobResultsAnimation = this.loadingJobResultsAnimation.bind(this);
    }

    componentWillMount() {
        fetchNewsFeed()
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

    onHandleInputSubmit() {
        this.setState({ loadingJobs: true });
        fetchJobs(this.state.location, this.state.maxDistance, this.props)
            .then((res) => {
                if (res === 'error') {
                    return alert('Something went wrong :( We were unable to retrieve job results. Please try again later or let us know if this issue persists.');
                }
                this.setState({ redirectToJobResults: true });
            })
    };

    loadingJobResultsAnimation() {
        if (this.state.loadingJobs) {
            return (
                <div className="loadingJobsSpinner">
                    <div>
                        <ChasingDots
                            size = {100}
                            color = {'orange'}
                        />
                    </div>
                </div>
            )
        }
    }


    render() {
        // console.log(this.state);
        let submittedLocation;
        if (this.state.location.includes('United States')) {
            submittedLocation = this.state.location.replace(/United States/i, 'USA');
        } else {
            submittedLocation = this.state.location;
        }

        if (this.state.redirectToJobResults) {
            return <Redirect push to={'/jobs/maxDistance=' + this.state.maxDistance + '_location=' + submittedLocation}/>;
        }

        const cssClasses = {
            root: 'placeAutoComplete',
        };

        const defaultStyles = {
            input: {
                border: "2px solid #003300",
                paddingLeft: "3em",
                width: '100%',
                height: '40px',
            }
        };





        return (
            <section className="landing">

                {this.loadingJobResultsAnimation()}

                <div className="mainJumbotron">

                    <div id="searchContainer" className="animated fadeIn">
                        <div id="headline">
                            <Typist cursor={{ show: false }}>
                                <h2>
                                    Power your life with sunshine <span>&#9788;</span>
                                </h2>
                            </Typist>
                        </div>
                        <div id="search">
                            <Form>
                                <Button onClick={this.onGetGeolocation} bsStyle="warning" id="homeIcon">
                                    <a data-tip="Locate me!">
                                        <Glyphicon glyph="home"/>
                                    </a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Button>

                                <div id="updateLocation">
                                    <Glyphicon glyph="search" bsStyle='large' id="searchIcon"/>
                                    <FormGroup>
                                        <PlacesAutocomplete
                                            inputProps={{
                                                value: this.state.location,
                                                onChange: this.onUpdateLocation,
                                                placeholder: 'Enter city or leave blank to see all results'
                                            }}
                                            options={{types: ['(cities)'], componentRestrictions: {country: 'us'}}}
                                            classNames={cssClasses}
                                            styles={defaultStyles}
                                        />
                                    </FormGroup>
                                </div>

                                <div id="updateMaxDistance">
                                    <a data-tip="Leave blank to view all solar jobs">
                                        <Glyphicon glyph="map-marker" bsStyle='large' id="radiusIcon"/>
                                    </a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                    <FormGroup>
                                        <FormControl
                                            className="distanceDropDownMenu"
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
                                </div>
                                <div id="submitButton">
                                    <Button onClick={this.onHandleInputSubmit} bsStyle="success">
                                        Search for solar jobs!
                                    </Button>
                                </div>
                            </Form>

                        </div>
                    </div>
                </div>

                <div className='threeHighlights'>
                    <h1 style={{textAlign: 'center'}}>
                        Solar job searching made easy...
                    </h1>
                    <Grid className='threeHighlightsGrid'>
                        <Row id='threeHighlightsRow'>
                            <Col lg={4} xs={12} className="blurb-specific">
                                <img alt="blurb-specific-img" src="https://png.icons8.com/dusk/100/000000/natural-food.png"/>
                                <p>
                                    ed dignissim fermentum dolor sed sodales. Pellentesque sapien sapien, posuere nec arcu dictum, bibendum suscipit purus. Integer non odio a metus tincidunt blandit.
                                </p>
                            </Col>
                            <Col lg={4} xs={12} className="blurb-map">
                                <img alt="blurb-map-img" src="https://png.icons8.com/dusk/100/000000/worldwide-location.png" />
                                <p>
                                    ed dignissim fermentum dolor sed sodales. Pellentesque sapien sapien, posuere nec arcu dictum, bibendum suscipit purus. Integer non odio a metus tincidunt blandit.
                                </p>
                            </Col>
                            <Col lg={4} xs={12} className="blurb-efficiency">
                                <img alt="blurb-efficiency" src="https://png.icons8.com/cotton/100/000000/gears.png" />
                                <p>
                                    ed dignissim fermentum dolor sed sodales. Pellentesque sapien sapien, posuere nec arcu dictum, bibendum suscipit purus. Integer non odio a metus tincidunt blandit.
                                </p>
                            </Col>
                        </Row>
                        <Row id='threeHighlightsRow'>
                            <Col lg={4} xs={12} className="blurb-specific">
                                <h2>Specific</h2>
                            </Col>
                            <Col lg={4} xs={12} className="blurb-specific">
                                <h2>Visual</h2>
                            </Col>
                            <Col lg={4} xs={12} className="blurb-specific">
                                <h2>Efficient</h2>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Grid className="newsFeedAndBlurbGrid">
                    <Row id='newsFeedAndBlurbRow'>
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
                            <span id="newsAPICredit" style={{float: 'right'}}>
                                RSS feed courtesy of <a href="https://newsapi.org">News API</a>.
                            </span>
                        </Col>
                    </Row>
                </Grid>

                {/*<ScrollToTop showUnder={160}>*/}
                    {/*<span>UP</span>*/}
                {/*</ScrollToTop>*/}

            </section>
        )
    }
}

export default connect(mapStateToProps)(Landing);

function mapStateToProps(state) {
    return {
        jobList: state.jobList.jobsList,
    };
}

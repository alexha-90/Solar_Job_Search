import React, { Component } from 'react';
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
// import ScrollToTop from 'react-scroll-up';
import { connect } from 'react-redux';
import fetchJobs from '../helper_functions/fetchJobs';
import populateNewsFeed from '../helper_functions/populateNewsFeed';
import PlacesAutocomplete from 'react-places-autocomplete'
import { Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import { ChasingDots } from 'better-react-spinkit';
import axios from 'axios';

//TO-DO:
// maybe not load newsfeed for mobiel devices
// can't get getNewsFeed catch statement to trigger properly
// remove duplicate articles if present
// error handling for location
// create new and mask api keys

//loader can get stuck in a loop if no results

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
        axios.get('/api/fetchNews')
            .then(res => {
                if (res.data === 'error') {
                    return <div>Something went wrong... unable to retrieve solar related news feed.</div>
                }
                // console.log(res.data.articles);
                this.articlesArr = res.data.articles;
                return this.setState({ loadingFeed: false });
            })
            .catch(err => {
                console.log(err);
                return <div>Something went wrong... unable to retrieve solar related news feed.</div>
            })
    }

    onUpdateLocation(location) {
        this.setState({ location: location });
    }

    onGetGeolocation() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        };

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);


        // if (navigator.geolocation) {
        //     this.setState({ location: 'Identifying your location...'});
        //     navigator.geolocation.getCurrentPosition(position => {
        //
        //         console.log(position);
        //         // setInterval(() => {
        //         //     if (!position) {
        //         //         alert('something went worng');
        //         //     }
        //         // }, 1500);
        //
        //
        //         setTimeout(() => {
        //             let latitude = position.coords.latitude.toString().slice(0,7);
        //             let longitude = position.coords.longitude.toString().slice(0,9);
        //             const mapKey = 'AIzaSyCX5D7_oHfZASpq8-cv16MBy5G68yeRe6E';
        //             let decodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + mapKey;
        //             axios.get(decodeURL)
        //                 .then(data => {
        //                     // console.log(data.data.results[2].formatted_address);
        //                     this.setState({ location: data.data.results[2].formatted_address });
        //                 })
        //         }, 1000);
        //     });
        // } else {
        //     return alert('You must allow geolocation permission for us to retrieve your location.');
        // }
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
                    <div style = {{zIndex: '100'}}>
                        <ChasingDots
                            size = {100}
                            color = {'orange'}
                            id='loadingDots'
                        />
                    </div>
                </div>
            )
        }
    }


    render() {
        let submittedLocation = this.state.location.includes('United States') ? this.state.location.replace(/United States/i, 'USA') : this.state.location;

        if (this.state.redirectToJobResults) {
            return <Redirect push to={'/jobs/maxDistance=' + this.state.maxDistance + '_location=' + submittedLocation}/>;
        }


        return (
            <section className="landing">

                {this.loadingJobResultsAnimation()}

                <div className="mainJumbotron">

                    <div id="searchContainer" className="animated fadeIn">
                        <div id="headline">
                            <h2>
                                Power your life with sunshine <span>&#9788;</span>
                            </h2>
                        </div>
                        <div id="search">
                            <Form>
                                <Button onClick={this.onGetGeolocation} bsStyle="warning" id="homeIcon">
                                    <a data-tip="Locate me!">
                                        <Glyphicon glyph="home" style={{color: '#4d4d4d'}}/>
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
                                            classNames={{
                                                root: 'placeAutoComplete'
                                            }}
                                            styles={{ input: {
                                                border: "2px solid #003300",
                                                paddingLeft: "3em",
                                                width: '100%',
                                                height: '40px'
                                            }}}
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

                <div className='threeHighlightsContainer'>
                    <div id="threeHighlights">
                        <h1>
                            Solar job searching made easy...
                        </h1>
                        <Grid className='threeHighlightsGrid'>
                            <Row id='threeHighlightsRow'>
                                <Col lg={4} xs={12} className="blurb-specific">
                                    <img alt="blurb-specific-img" src="https://png.icons8.com/dusk/100/000000/natural-food.png"/>
                                    <p>
                                        This website only displays jobs that are relevant for the solar industry.
                                        You don't have to sort through irrelevant results like on typical job boards.
                                    </p>
                                    <h2 id="smallScreenHeadline">
                                        Specific
                                    </h2>
                                </Col>
                                <Col lg={4} xs={12} className="blurb-map">
                                    <img alt="blurb-map-img" src="https://png.icons8.com/dusk/100/000000/worldwide-location.png" />
                                    <p>
                                        You can instantly preview a job's location by clicking on an automatically generated
                                        link. Great for quick referencing.
                                    </p>
                                    <h2 id="smallScreenHeadline">
                                        Visual
                                    </h2>
                                </Col>
                                <Col lg={4} xs={12} className="blurb-efficiency">
                                    <img alt="blurb-efficiency" src="https://s3.amazonaws.com/solarjobsearch/efficiencyGear.png" />
                                    <p>
                                        Job results are posted in table format for easy viewing. You can catalog multiple job
                                        listings and open links for each them at the same time!
                                    </p>
                                    <h2 id="smallScreenHeadline">
                                        Efficient
                                    </h2>
                                </Col>
                            </Row>
                            <Row id='threeHighlightsRow'>
                                <Col lg={4} xs={12} className="blurb-specific">
                                    <h2 id='largerScreenHeadline'>Specific</h2>
                                </Col>
                                <Col lg={4} xs={12} className="blurb-specific">
                                    <h2 id='largerScreenHeadline'>Visual</h2>
                                </Col>
                                <Col lg={4} xs={12} className="blurb-specific">
                                    <h2 id='largerScreenHeadline'>Efficient</h2>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>

                <div id='whySolar'>
                    <h1>Why solar?</h1>
                    <p>
                        Solar employment expanded last year 17 times faster than the total US economy, according to
                        an International Renewable Energy Agency report published on Wednesday that cited data from
                        the Solar Foundation. Overall, more than 260,000 people work in the solar industry, up by 24% from 2015.
                        The solar business has benefited from the falling cost of solar energy and generous federal tax credits
                        that make it more affordable for businesses and homeowners to install solar panels.
                    </p>
                </div>

                <div className="solarJobTypesDescription">
                    <h1>Types of solar jobs</h1>
                    <Grid className="jobDescriptionGrid">
                        <Row id='jobDescriptionRow'>
                            <Col sm={12} md={5} >
                                <img alt="salesImg" src="https://s3.amazonaws.com/solarjobsearch/salesImg.jpeg"/>
                            </Col>
                            <Col sm={0} md={0} lg={1} />
                            <Col sm={12} md={6} id="jobDescription">
                                <div>
                                    <h2>Field / Sales</h2>
                                    <p>
                                        Roles that engage more with customers. Talk with them to sign up for PV.
                                        Go in the field and make sure things are working properly. Being comfortable
                                        understanding customer demands and being personalable are essential traits.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row id='jobDescriptionRow'>
                            <Col lg={0} md={5} id="jobImgSmallOnly">
                                <img alt="engineerImg1" src="https://s3.amazonaws.com/solarjobsearch/engineerImg.jpeg"/>
                            </Col>
                            <Col sm={12} md={6} id="jobDescription">
                                <div>
                                    <h2>Design / Engineering</h2>
                                    <p>
                                        Roles that require deeper technical understanding about how PV works. Technical aspects
                                        on where panels should go, their productivity, electrical conduit runs, racking. Roof type
                                        and structural considerations.
                                    </p>
                                </div>
                            </Col>
                            <Col sm={0} md={0} lg={1} />
                            <Col sm={12} md={5} id="jobImgLargerOnly">
                                <img alt='engineerImg2' src="https://s3.amazonaws.com/solarjobsearch/engineerImg.jpeg"/>
                            </Col>
                        </Row>
                        <Row id='jobDescriptionRow'>
                            <Col sm={12} md={5}>
                                <img alt='technicianImg' src="https://s3.amazonaws.com/solarjobsearch/installerImg.jpg"/>
                            </Col>
                            <Col sm={0} md={0} lg={1} />
                            <Col sm={12} md={6} id="jobDescription">
                                <div>
                                    <h2>Installation / Technician</h2>
                                    <p>
                                        Hands-on roles that focus with the physical solar panels themselves. Go on-site and
                                        use your knowledge to install solar panels and diagnose potential production problems.
                                        The rewarding position that lets you physically see the system get interconnected.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row id='jobDescriptionRow'>
                            <Col lg={0} md={5} id="jobImgSmallOnly">
                                <img alt='pmImg1' src="https://s3.amazonaws.com/solarjobsearch/pmImg.jpeg"/>
                            </Col>
                            <Col sm={12} md={6} id="jobDescription">
                                <div>
                                    <h2>Project Management / Analytics</h2>
                                    <p>
                                        Roles that deal with the logistics, numbers, and business aspects associated with solar. It is
                                        up to you to make sure the panels are installed as scheduled with proper inventory. See why
                                        panels are producing poorly and make sense of all the dynamic parts involved with a solar system.
                                    </p>
                                </div>
                            </Col>
                            <Col sm={0} md={0} lg={1} />
                            <Col sm={12} md={5} id="jobImgLargerOnly">
                                <img alt='pmImg2' src="https://s3.amazonaws.com/solarjobsearch/pmImg.jpeg"/>
                            </Col>
                        </Row>
                        <Row id='jobDescriptionRow'>
                            <Col sm={12} md={5}>
                                <img alt='csrImg' src="https://s3.amazonaws.com/solarjobsearch/csrImg.jpg"/>
                            </Col>
                            <Col sm={0} md={0} lg={1} />
                            <Col sm={12} md={6} id="jobDescription">
                                <div>
                                    <h2>Customer Service</h2>
                                    <p>
                                        Roles that interact with solar customers to ensure they are happy. Explain referral
                                        processes and help customers when things don't go as planned. You should be personable
                                        and level-headed.
                                    </p>
                                </div>
                            </Col>
                        </Row>

                    </Grid>
                </div>

                <div className="newsFeedContainer">
                    <h1>Solar news</h1>
                    <div id='newsFeed'>
                        {populateNewsFeed(this.articlesArr, this.state.loadingFeed)}
                        <hr/>
                        <span id="newsAPICredit" style={{float: 'right'}}>
                            Icon pack by<a href="https://icons8.com">Icons8</a>. RSS feed courtesy of <a href="https://newsapi.org">News API</a>.
                        </span>
                    </div>
                </div>


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

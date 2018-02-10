import React, { Component } from 'react';
import { Button, FormControl, Glyphicon } from 'react-bootstrap';
// import ScrollToTop from 'react-scroll-up';
import { connect } from 'react-redux';
import fetchJobs from '../helper_functions/fetchJobs';
import landingStaticText from '../helper_functions/landingStaticText';

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
                        <div className="search">
                                <div id="geolocationButton">
                                    <Button onClick={this.onGetGeolocation} bsStyle="warning">
                                        <a data-tip="Locate me!">
                                            <Glyphicon glyph="home" style={{color: '#4d4d4d'}}/>
                                        </a>
                                        <ReactTooltip place="top" type="dark" effect="float"/>
                                    </Button>
                                </div>

                                <div id="locationContainer">
                                    <div id="buttonContainer">
                                        <Glyphicon glyph="search" bsStyle='large' id="icon"/>
                                    </div>
                                    <PlacesAutocomplete
                                        inputProps={{
                                            value: this.state.location,
                                            onChange: this.onUpdateLocation,
                                            placeholder: 'Enter city or leave blank to see all results'
                                        }}
                                        options={{types: ['(cities)'], componentRestrictions: {country: 'us'}}}
                                        classNames={{
                                            root: 'autoComplete'
                                        }}
                                        styles={{ input: {
                                            height: '39px',
                                            background: 'none'
                                        }}}
                                    />
                                </div>

                                <div id="maxDistanceContainer">
                                    <div id="buttonContainer">
                                        <a data-tip="Leave blank to view all solar jobs">
                                            <Glyphicon glyph="map-marker" bsStyle='large' id="icon"/>
                                        </a>
                                    </div>
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
                                </div>

                                <div id="submitButton">
                                    <Button onClick={this.onHandleInputSubmit} bsStyle="success">
                                        Search for solar jobs!
                                    </Button>
                                </div>
                        </div>
                    </div>
                </div>

                {/* Import grid layout text */}
                {landingStaticText}


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

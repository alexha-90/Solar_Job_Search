import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox, Button, Radio, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import fetchJobs from '../helper_functions/fetchJobs';
import PlacesAutocomplete from 'react-places-autocomplete'
import PopulateJobList from './PopulateJobList';
import GoogleMapsModal from './GoogleMapsModal';
import infoSpace from '../helper_functions/infoSpace';
import store from '../index';

/*
TO:DO:
// display 1-25.. etc can be messed up if there are less than intervals of 25 results
paginate onclick update url
 */
//===============================================================================================//
let queryArr = [];

class JobResults extends Component {
    constructor() {
        super();
        this.state = {
            location: '',
            newLocation: false,
            maxDistance: '',
            queryBuilder: queryArr,
            jobType: '',
            showAllJobs: true,
            showSalesJobs: false,
            showEngineerJobs: false,
            showInstallerJobs: false,
            showPMJobs: false,
            showCSRJobs: false
        };
        this.onUpdateLocation = (location) => this.setState({ location: location, newLocation: true });
        this.showFetchNewResultsButton = this.showFetchNewResultsButton.bind(this);
        this.onNewLocationResults = this.onNewLocationResults.bind(this);
        this.onUpdateMaxDistance = this.onUpdateMaxDistance.bind(this);
        this.onFilterJobRoles = this.onFilterJobRoles.bind(this);
        this.onFilterJobType = this.onFilterJobType.bind(this);
    }


    componentWillMount() {
        // reload page on browser back button press. Method from https://stackoverflow.com/questions/31337274/refresh-browser-on-click-of-back-button-js
        window.onpopstate = () => {
            window.location.reload();
        };

        // NOTE: no perceived problems if user manipulates URL
        // handle routing to result page from URL. Not landing page
        if (this.props.location.pathname.length > 28 && (!this.props.locationParam || !this.props.maxDistance)) {
            console.log('retrieving');
            // slice to remove extra data and maxDistanceParam. Extract input location from URL
            const locationStr = this.props.location.pathname.slice(18);
            const locationFromURL = locationStr.substr(locationStr.indexOf('=') + 1);

            if (locationFromURL) {
                this.setState({ location: locationFromURL})
            }

            if (this.props.location.pathname.match(/\d+/)) {
                const maxDistanceParam = this.props.location.pathname.match(/\d+/);
                this.setState({ maxDistance: maxDistanceParam})
            }

            return setTimeout(() => {
                fetchJobs(this.state.location, this.state.maxDistance, this.props)
                    .then((res) => {
                        if (res === 'error') {
                            alert('Something went wrong :( We were unable to retrieve job results. Please try again later or let us know if this issue persists.');
                        }
                    })
            }, 1000);
        }

        // user did not provide any parameters. Populate national job results
        if (!this.props.jobList.length) {
            console.log('defaulting...');
            fetchJobs(null, null, this.props)
                .then((res) => {
                    this.setState({ location: 'USA'});
                    if (res === 'error') {
                        alert('Something went wrong :( We were unable to retrieve job results. Please try again later or let us know if this issue persists.');
                    }
                    window.history.pushState('newLoc', 'location', '/jobs/maxDistance=' + this.state.maxDistance + '_location=' + this.state.location);
                })
        }

        // default case where user submitted inputs on landing page. Job list already fetched
        if (this.props.locationParam) {
            this.setState({ location: this.props.locationParam})
        }
        if (this.props.maxDistance) {
            this.setState({ maxDistance: this.props.maxDistance})
        }
    }

    showFetchNewResultsButton() {
        if (this.state.newLocation) {
            return (
                <Button onClick={this.onNewLocationResults} bsStyle='success'>
                    Go!
                </Button>
            )
        }
    }

    onNewLocationResults() {
        loadingNewResults(true);
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType)
            .then(() => {
                this.setState({ newLocation: false });
                window.history.pushState('newLoc', 'location', '/jobs/maxDistance=' + this.state.maxDistance + '_location=' + this.state.location);
                loadingNewResults(false)
            })
    }

    onUpdateMaxDistance(event) {
        loadingNewResults(true);
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ maxDistance: event.target.value });
        fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType)
            .then(() => {
                this.setState({ newLocation: false });
                let maxDist = this.state.maxDistance == 3000 ? '' : this.state.maxDistance;
                window.history.pushState('newLoc', 'location', '/jobs/maxDistance=' + maxDist + '_location=' + this.state.location);
                loadingNewResults(false)
            })
    }

    onFilterJobRoles(event) {
        loadingNewResults(true);
        if (event.target.value ==='sales') {
            this.setState({showSalesJobs: !this.state.showSalesJobs});
        } if (event.target.value === 'engineer') {
            this.setState({showEngineerJobs: !this.state.showEngineerJobs});
        } if (event.target.value === 'installer') {
            this.setState({ showInstallerJobs: !this.state.showInstallerJobs });
        } if (event.target.value === 'pm') {
            this.setState({ showPMJobs: !this.state.showPMJobs });
        } if (event.target.value === 'csr') {
            this.setState({showCSRJobs: !this.state.showCSRJobs});
        }

        if (event.target.checked) {
            if (event.target.name !== 'default') {
                queryArr.push(event.target.value);
                this.setState({showAllJobs: false});
            } if (event.target.name === 'default') {
                queryArr = [];
                this.setState({ showAllJobs: true, showSalesJobs: false, showEngineerJobs: false, showInstallerJobs: false, showPMJobs: false, showCSRJobs: false });
            }
        } else {
            const index = queryArr.indexOf(event.target.value);
            if (index > -1) {
                queryArr.splice(index, 1);
            }
        }
        // if queryArr is empty, it will change to a default string in external function below
        fetchJobs(this.state.location, this.state.maxDistance, this.props, queryArr, this.state.jobType)
            .then(() => {
                // just for visual purposes so tacked on the end. Default results were already retrieved by this point
                if (!queryArr.length) {
                    this.setState({showAllJobs: true});
                }
                loadingNewResults(false);
            });
    }

    onFilterJobType(event) {
        loadingNewResults(true);
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ jobType: event.target.value });
        setTimeout(() => {
            fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType);
            loadingNewResults(false);
        }, 500);
    }


    render() {
        // console.log(this.state);

        return (
            <section className="jobResults">
                <div className="modifyJobSearch">
                    <span id="overflowBG"/>
                    <Form>
                        <div className="geoUpdateContainer">
                            <div id="updateLoc">
                                <div id="buttonContainer">
                                    <Glyphicon glyph="search" bsStyle='large' id="icon"/>
                                </div>
                                <PlacesAutocomplete
                                    inputProps={{
                                        value: this.state.location,
                                        onChange: this.onUpdateLocation,
                                        placeholder: 'Input a city name...'
                                    }}
                                    options={{types: ['(cities)'], componentRestrictions: {country: 'us'}}}
                                    classNames={{
                                        root: 'autoComplete'
                                    }}
                                    styles={{ input: {
                                        height: '39px',
                                        background: 'none',
                                        outline: 'none'
                                    }}}
                                />
                            </div>

                            <br id='mobileDeviceBreak'/>

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
                                    // value={this.state.maxDistance}
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

                            <div id='updateResultsButton'>
                                {this.showFetchNewResultsButton()}
                            </div>
                        </div>

                        <div className='modifyJobRoleAndType'>
                            <div id="jobRole">
                                <FormGroup id="modifyJobRole">
                                    <FormGroup>
                                        <Checkbox inline value="''" name="default" checked={this.state.showAllJobs} onChange={this.onFilterJobRoles}>
                                            All roles
                                        </Checkbox>
                                        <Checkbox inline value="sales" checked={this.state.showSalesJobs} onChange={this.onFilterJobRoles}>
                                            <a data-tip="Roles that focus more on the interconnection and sales side of solar systems">Field / Sales</a>
                                        </Checkbox>
                                        <Checkbox inline value="engineer" checked={this.state.showEngineerJobs} onChange={this.onFilterJobRoles}>
                                            <a data-tip="Roles that require deeper technical understanding about how PV works">Design / Engineering</a>
                                        </Checkbox>
                                        <br id='smallSeparator'/>
                                        <Checkbox inline value="installer" checked={this.state.showInstallerJobs} onChange={this.onFilterJobRoles}>
                                            <a data-tip="Hands-on roles that focus with the physical solar panels themselves">Installer / Technician</a>
                                        </Checkbox>
                                        <Checkbox inline value="pm" checked={this.state.showPMJobs} onChange={this.onFilterJobRoles}>
                                            <a data-tip="Roles that deal with the logistics, numbers, and business aspects associated with solar">Project Management / Analyst</a>
                                        </Checkbox>
                                        <Checkbox inline value="csr" checked={this.state.showCSRJobs} onChange={this.onFilterJobRoles}>
                                            <a data-tip="Roles that interact with solar customers to ensure they are happy">Customer Service</a>
                                        </Checkbox>
                                    </FormGroup>
                                </FormGroup>
                            </div>

                            <div id="jobType">
                                <FormGroup id="modifyJobType">
                                    <FormGroup>
                                        <Radio inline name="jobTypeGroup" value='""' onChange={this.onFilterJobType} defaultChecked={true}>
                                            All job types
                                        </Radio>
                                        <Radio inline name="jobTypeGroup" value="fulltime" onChange={this.onFilterJobType}>
                                            Full-Time
                                        </Radio>
                                        <Radio inline name="jobTypeGroup" value="parttime" onChange={this.onFilterJobType}>
                                            Part-Time
                                        </Radio>
                                        <Radio inline name="jobTypeGroup" value="contract" onChange={this.onFilterJobType}>
                                            Contract
                                        </Radio>
                                        <Radio inline name="jobTypeGroup" value="internship" onChange={this.onFilterJobType}>
                                            Internship
                                        </Radio>
                                    </FormGroup>
                                </FormGroup>
                            </div>
                        </div>
                    </Form>
                    <div style={{clear: "both", marginBottom: '20px'}}/>
                </div>

                {/* Import iFrame class component */}
                <GoogleMapsModal />

                {/* Import class to populate table body with job results*/}
                <PopulateJobList/>

                <br />

                {/* Import placeholder for ads*/}
                {infoSpace}

            </section>
        );
    }
}


export default connect(mapStateToProps)(JobResults);

function mapStateToProps(state) {
    return {
        jobList: state.jobList.jobsList,
        loadingNewResults: state.jobList.loadingNewResults,
        locationParam: state.jobList.locationParam,
        maxDistance: state.jobList.maxDistance,
        urlOpenList: state.jobList.urlOpenList,
        locationToLaunch: state.jobList.locationToLaunch,
        currentPage: state.jobList.currentPage
    };
}


function loadingNewResults(status) {
    store.dispatch({
        type: 'UPDATING_NEW_JOB_RESULTS',
        payload: status
    });
}
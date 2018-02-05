import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox, Radio, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import fetchJobs from '../helper_functions/fetchJobs';
import PlacesAutocomplete from 'react-places-autocomplete'
import PopulateJobList from './PopulateJobList';
import GoogleMapsModal from './GoogleMapsModal';
import ReactTooltip from 'react-tooltip'
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
        this.onUpdateLocation = this.onUpdateLocation.bind(this);
        this.onUpdateMaxDistance = this.onUpdateMaxDistance.bind(this);
        this.onFilterJobRoles = this.onFilterJobRoles.bind(this);
        this.onFilterJobType = this.onFilterJobType.bind(this);
    }


    componentWillMount() {
        // user did not arrive at this page from landing. Populate national job results.
        if (!this.props.jobList.length) {
            fetchJobs(null, null, this.props)
                .then((res) => {
                    if (res === 'error') {
                        return alert('Something went wrong :( We were unable to retrieve job results. Please try again later or let us know if this issue persists.');
                    }
                })
        }
        if (this.props.locationParam) {
            this.setState({ location: this.props.locationParam})
        }
        if (this.props.maxDistance) {
            this.setState({ maxDistance: this.props.maxDistance})
        }
    }

    onUpdateLocation(location) {
        loadingNewResults(true);
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ location: location });
        fetchJobs(location, this.state.maxDistance, this.props, query, this.state.jobType)
            .then(() => { loadingNewResults(false) })
    }

    onUpdateMaxDistance(event) {
        loadingNewResults(true);
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ maxDistance: event.target.value });
        fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType)
            .then(() => { loadingNewResults(false) })
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
            return (
            <section className="jobResults">
                <div className="modifyJobSearch">

                    <span id="overflowBG"/>

                    <Form>
                        <div className="geoUpdateContainer">
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
                                <Glyphicon glyph="map-marker" bsStyle='large' id="radiusIcon"/>

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
                                            {/*rule below applies for all tooltips*/}
                                            <ReactTooltip place="top" type="dark" effect="float"/>
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
        )
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
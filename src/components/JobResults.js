import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Checkbox, Radio, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import fetchJobs from '../helper_functions/fetchJobs';
import PlacesAutocomplete from 'react-places-autocomplete'
import PopulateJobList from './PopulateJobList';
import GoogleMapsModal from './GoogleMapsModal';
import ReactTooltip from 'react-tooltip'
import infoSpace from '../helper_functions/infoSpace';

/*
TO:DO:
always shows 'Displaying 1-25'
select all jobs
paginate onclick update url
 */
//===============================================================================================//
const queryArr = [];

class JobResults extends Component {
    constructor() {
        super();
        this.state = {
            location: '',
            maxDistance: '',
            queryBuilder: queryArr,
            jobType: ''
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
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ location: location });
        fetchJobs(location, this.state.maxDistance, this.props, query, this.state.jobType)
    }

    onUpdateMaxDistance(event) {
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ maxDistance: event.target.value });
        fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType)
    }

    onFilterJobRoles(event) {
        if (event.target.checked) {
            queryArr.push(event.target.value);
        } else {
            const index = queryArr.indexOf(event.target.value);
            if (index > -1) {
                queryArr.splice(index, 1);
            }
        }
        fetchJobs(this.state.location, this.state.maxDistance, this.props, queryArr, this.state.jobType)
    }

    onFilterJobType(event) {
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ jobType: event.target.value });
        fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType)
    }


    render() {

            return (
            <section className="jobResults">

                <div className="modifyGeoSearch">
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
                                        classNames={{ root: 'placesAutoComplete' }}
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

                        <FormGroup id="modifyJobRole">
                            <FormGroup>
                                <Checkbox inline name="" value="sales" onClick={this.onFilterJobRoles}>
                                    <a data-tip="Roles that focus more on customer interactions">Field/Sales</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="engineer" onClick={this.onFilterJobRoles}>
                                    <a data-tip="Technical roles that require deeper understanding about how PV works">Design/Engineer</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="installer" onClick={this.onFilterJobRoles}>
                                    <a data-tip="Hands-on roles that deal with the physical solar panels themselves">Installer/Technician</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="pm" onClick={this.onFilterJobRoles}>
                                    <a data-tip="Roles that deal with the logistics, numbers, and business behind solar">Project Management/Analyst</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="csr" onClick={this.onFilterJobRoles}>
                                    <a data-tip="Roles that interact with customers">Customer Service</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                            </FormGroup>
                        </FormGroup>

                        <FormGroup id="modifyJobType">
                            <FormGroup>
                                <Radio inline name="jobTypeGroup" value='""' onClick={this.onFilterJobType} defaultChecked={true}>
                                    All job types
                                </Radio>
                                <Radio inline name="jobTypeGroup" value="fulltime" onClick={this.onFilterJobType}>
                                    Full-Time
                                </Radio>
                                <Radio inline name="jobTypeGroup" value="parttime" onClick={this.onFilterJobType}>
                                    Part-Time
                                </Radio>
                                <Radio inline name="jobTypeGroup" value="contract" onClick={this.onFilterJobType}>
                                    Contract
                                </Radio>
                                <Radio inline name="jobTypeGroup" value="internship" onClick={this.onFilterJobType}>
                                    Internship
                                </Radio>
                            </FormGroup>
                        </FormGroup>
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
        locationParam: state.jobList.locationParam,
        maxDistance: state.jobList.maxDistance,
        urlOpenList: state.jobList.urlOpenList,
        locationToLaunch: state.jobList.locationToLaunch,
        currentPage: state.jobList.currentPage
    };
}
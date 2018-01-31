import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Form, ControlLabel, Checkbox, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import fetchJobs from '../helper_functions/fetchJobs';
import PlacesAutocomplete from 'react-places-autocomplete'
import PopulateJobList from './PopulateJobList';
import GoogleMapsModal from './GoogleMapsModal';
import adblockDetect from 'adblock-detect';
import ReactTooltip from 'react-tooltip'
import infoSpace from '../helper_functions/infoSpace';
import store from '../index';



/*
TO:DO:
select all jobs
paginate onclick update url
clear job selection
 */
//===============================================================================================//
const queryArr = [];

class JobResults extends Component {
    constructor() {
        super();
        this.state = {
            // currentPage: 1,
            location: '',
            maxDistance: '',
            queryBuilder: queryArr,
            jobType: ''
        };
        this.onUpdateLocation = this.onUpdateLocation.bind(this);
        this.onUpdateMaxDistance = this.onUpdateMaxDistance.bind(this);
        this.onFilterJobRoles = this.onFilterJobRoles.bind(this);
        this.jobResultsHeadline = this.jobResultsHeadline.bind(this);
        this.onOpenMultipleURLs = this.onOpenMultipleURLs.bind(this);
        this.onFilterJobType = this.onFilterJobType.bind(this);
        // this.onPagination = this.onPagination.bind(this);
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
        fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType)
    }

    onUpdateMaxDistance(event) {
        let query = (this.state.queryBuilder.length ? this.state.queryBuilder: 'solar');
        this.setState({ maxDistance: event.target.value });
        fetchJobs(this.state.location, this.state.maxDistance, this.props, query, this.state.jobType)
    }

    jobResultsHeadline () {
        const jobsPerPg = 25;
        let lowerBound = (this.state.currentPage - 1) * jobsPerPg;
        if (lowerBound === 0) {
            lowerBound = 1;
        }
        let upperBound = this.state.currentPage * jobsPerPg;
        if (this.props.jobList.length) {
            return (
                <div>
                    <h3>
                        Displaying {lowerBound + '-' + upperBound + ' of ' + this.props.jobList.length} recently posted solar jobs in the area:
                    </h3>
                    <Button onClick={this.onOpenMultipleURLs} bsSize="small">
                        <a data-tip="Select the checkboxes next to jobs you're interested in. Then click the button above to open each link in a new tab!">
                            Open links for all selected jobs
                        </a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Button>
                    &nbsp;&nbsp;
                    <Button bsSize="small" onClick={clearOpenJobList}>
                        Clear job selection
                    </Button>
                    &nbsp;&nbsp;
                    <Button bsSize="small" id="infoButton">
                        <a data-tip="the checkbox next to jobs you're interested in to open each link a new tab!">
                            <Glyphicon glyph="info-sign" />
                        </a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Button>
                </div>
            )
        }
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

    // onPagination(page) {
    //     this.setState({ currentPage: page });
    //     currentPageToProps(page);
    // }

    onOpenMultipleURLs(event) {
        event.preventDefault();
        adblockDetect(blocker => {
            if (blocker) {
                return alert('Note: for the open multiple links feature to work, you must disable ad blocker by browser AND any addons. Then refresh page. We do not spam you.');
            } else {
                if (!this.props.urlOpenList) {
                    return alert('You must select at least one job to open in a new tab!')
                }
                const urlOpenList = this.props.urlOpenList;
                for (let i = 0; i < urlOpenList.length; i++) {
                    window.open(urlOpenList[i]);
                }
            }
        });
    }


    render() {
        // console.log(this.state);
        console.log(this.props.urlOpenList);

        return (
            <section className="jobResults">

                <div className="modifyGeoSearch">
                    <span id="grayBG"/>

                    <Form>
                        <div className="geoUpdateContainer">
                            <div id="updateLocation">
                                <Glyphicon glyph="search" bsStyle='large' id="searchIcon"/>

                                <FormGroup id="updateLocation">
                                    <PlacesAutocomplete
                                        inputProps={{
                                            value: this.state.location,
                                            onChange: this.onUpdateLocation,
                                            placeholder: 'Enter city or leave blank to see all results'
                                        }}
                                        styles= {{
                                            root: { width: '90%', marginLeft: '2.5em', display: 'inline-block', marginRight: '0'}
                                        }}
                                        options={{types: ['(cities)']}}/>
                                </FormGroup>
                            </div>
                            <div id="updateMaxDistance">
                                <Glyphicon glyph="map-marker" bsStyle='large' id="radiusIcon"/>

                                <FormGroup>
                                    <FormControl
                                        id="distanceDropDownMenu"
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

                        <br />

                        <FormGroup id="modifyJobRole">
                            <ControlLabel id="label">Filter job roles:</ControlLabel>
                            <FormGroup>
                                <Checkbox inline name="" value="sales" onClick={this.onFilterJobRoles}>
                                    <a data-tip="tbd tbd tbd">Field/Sales</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="engineer" onClick={this.onFilterJobRoles}>
                                    <a data-tip="an engineer does this">Design/Engineer</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="installer" onClick={this.onFilterJobRoles}>
                                    <a data-tip="installer, roofer, etc">Installer/Technician</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="pm" onClick={this.onFilterJobRoles}>
                                    <a data-tip="project manager, analsyst">Project Management/Analyst</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                                <Checkbox inline name="" value="csr" onClick={this.onFilterJobRoles}>
                                    <a data-tip="customer service, talk on phone">Customer Service</a>
                                    <ReactTooltip place="top" type="dark" effect="float"/>
                                </Checkbox>
                            </FormGroup>
                        </FormGroup>
                    </Form>

                    <div className='modifyJobType'>
                        <Button value='""' onClick={this.onFilterJobType}>All job types</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button value='fulltime' onClick={this.onFilterJobType}>Full-Time</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button value='parttime' onClick={this.onFilterJobType}>Part-Time</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button value='contract' onClick={this.onFilterJobType}>Contract</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button value='internship' onClick={this.onFilterJobType}>Internship</Button>
                    </div>
                </div>


                {/* Import iFrame class component */}
                <GoogleMapsModal />


                {/* Import class to populate table body with job results*/}
                <PopulateJobList/>

                <br />

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

// function totalPages(jobCount) {
//     // display 25 per page
//     if (jobCount) {
//         return Math.floor(jobCount)
//     } else {
//         return 1;
//     }
// }

function clearOpenJobList() {
    return store.dispatch({
        type: 'REMOVE_URLS_FROM_PROPS',
        payload: null
    });
}

// function currentPageToProps(currentPg) {
//     return store.dispatch({
//         type: 'CURRENT_PAGE_TO_PROPS',
//         payload: currentPg
//     });
// }

/*
                    <Table responsive striped>
                        <thead>
                        <tr>
                            <th>
                                <a data-tip="Select all jobs">
                                    <input id="checkBox" type="checkbox"/>
                                </a>
                                <ReactTooltip place="top" type="dark" effect="float"/>
                            </th>
                            <th>Posted</th>
                            <th>Company</th>
                            <th>Job Title</th>
                            <th>Location</th>
                            <th>Summary</th>
                        </tr>
                        </thead>
<PopulateJobList/>
</Table>
 */
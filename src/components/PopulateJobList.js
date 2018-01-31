import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Glyphicon, Button } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import adblockDetect from 'adblock-detect';
import store from '../index';
import jobResultsHeadline from '../helper_functions/jobResultsHeadline';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
// import populateTable from '../helper_functions/populateTable';

/*
TO:DO:
select all jobs
paginate onclick update url
 */
//================================================================================================//
let openListArr = [];

class PopulateJobList extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            openListArr: []
        };
        this.populateTable = this.populateTable.bind(this);
        this.buttonActions = this.buttonActions.bind(this);
        this.gatherOpenList = this.gatherOpenList.bind(this);
        this.onOpenMultipleURLs = this.onOpenMultipleURLs.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.paginateDisplay = this.paginateDisplay.bind(this);
    }


    buttonActions() {
        if (this.props.jobList.length) {
            return (
                <div>
                    <Button onClick={this.onOpenMultipleURLs} bsSize="small">
                        <a data-tip="Open multiple job links at one time. For this to work, you must select at least one checkbox and
                         disable ad blocker on your browser AND addons.">
                            Open links for all selected jobs
                        </a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Button>
                    &nbsp;&nbsp;
                    <Button bsSize="small" onClick={() => {
                        this.setState({openListArr: []});
                        openListArr = [];
                    }}
                    >
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

    populateTable() {
        // console.log(data);
        if (!Object.keys(this.props.jobList).length) {
            return (
                <tbody>
                <tr>
                    <td>
                        Loading...
                    </td>
                </tr>
                </tbody>
            )
        }

        const jobsPerPage = 25;
        let currentPageData = this.props.jobList.slice(jobsPerPage * (this.state.currentPage-1), this.state.currentPage * jobsPerPage);

        // object to array conversion method from https://stackoverflow.com/questions/38824349/convert-object-to-array-in-javascript
        let jobsArr = Object.keys(currentPageData).map(key => {
            // ID = 0, postDate = 1, company = 2, title = 3, location = 4, summary = 5, URL = 6
            return [key, currentPageData[key]['postDate'], currentPageData[key]['company'], currentPageData[key]['title'],
                currentPageData[key]['location'], currentPageData[key]['summary'], currentPageData[key]['url']];
        });

        // console.log(jobsArr);

        return (
            <tbody>
            {jobsArr.map((job) => {
                return (
                    <tr key={job[0] + ' - ' + job[6]}>
                        <td>
                            <input
                                checked={this.state.openListArr.includes(job[6])}
                                onClick={this.gatherOpenList}
                                id="checkBox"
                                type="checkbox"
                                value={job[6]}/>
                        </td>
                        <td>{job[1]}</td>
                        <td>{job[2]}</td>
                        <td>
                            <a href={job[6]} target="_blank">{job[3]}</a>
                        </td>
                        <td >
                            <span onClick={() => onTriggerMap(job)} id="jobLocation">
                                {job[4]}
                            </span>
                        </td>
                        <td>{job[5].slice(0,80) + '...'}</td>
                    </tr>
                )
            })}
            </tbody>
        );
    }


    gatherOpenList(event) {
        if (event.target.checked) {
            openListArr.push(event.target.value);
        } else {
            const index = openListArr.indexOf(event.target.value);
            openListArr.splice(index, 1);
        }
        console.log(openListArr);
        this.setState({ openListArr: openListArr });
    }



    onOpenMultipleURLs(event) {
        event.preventDefault();
        adblockDetect(blocker => {
            if (blocker) {
                return alert('Note: for the open multiple links feature to work, you must disable ad blocker by browser AND any addons. Then refresh page. We do not spam you.');
            } else {
                if (!this.state.openListArr.length) {
                    return alert('You must select at least one job to open in a new browser tab!')
                }
                const urlOpenList = this.state.openListArr;
                for (let i = 0; i < urlOpenList.length; i++) {
                    window.open(urlOpenList[i]);
                }
            }
        });
    }

    onPagination(page) {
        openListArr = [];
        this.setState({ currentPage: page, openListArr: [] });
    }

    paginateDisplay() {
        if (Object.keys(this.props.jobList).length) {
            return (
                <div id="pager">
                    <Pagination
                        id="pageObj"
                        onChange={this.onPagination}
                        current={this.state.currentPage}
                        total={totalPages(this.props.jobList.length)}
                    />
                    <div>
                        (NOTE: clicking a page button above will clear your checkbox selections)
                    </div>
                </div>
            )
        }
    }



    render() {
        console.log(this.state);


        return (
            <div>
                {jobResultsHeadline(this.props.jobList, this.props.currentPage)}
                {this.buttonActions()}
                <div id="jobTable">
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
                        {this.populateTable()}
                        {/*{populateTable(this.props.jobList, this.state.currentPage, this.props.urlOpenList)}*/}
                    </Table>

                    {this.paginateDisplay()}

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PopulateJobList);


function mapStateToProps(state) {
    return {
        jobList: state.jobList.jobsList,
        urlOpenList: state.jobList.urlOpenList,
        locationToLaunch: state.jobList.locationToLaunch,
        currentPage: state.jobList.currentPage
    };
}

function totalPages(jobCount) {
    // display 25 per page
    if (jobCount) {
        return Math.floor(jobCount)
    } else {
        return 1;
    }
}


function onTriggerMap(job) {
    store.dispatch({
        type: 'JOB_LOCATION_TO_PROPS',
        payload: job
    });
}

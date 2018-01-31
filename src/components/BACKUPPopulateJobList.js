import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import store from '../index';
import jobResultsHeadline from '../helper_functions/jobResultsHeadline';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

//================================================================================================//
const openListArr = [];

class PopulateJobList extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
        };
        this.populateTable = this.populateTable.bind(this);
        this.onPagination = this.onPagination.bind(this);
    }

    componentWillMount() {
        console.log(this.props.urlOpenList);
    }

    onPagination(page) {
        this.setState({ currentPage: page });
        currentPageToProps(page);
    }


    populateTable() {
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

        let currentPage = 1;
        if (this.props.currentPage) {
            currentPage = this.props.currentPage;
        }

        const jobsPerPage = 25;
        let currentPageData = this.props.jobList.slice(jobsPerPage * (currentPage-1), currentPage * jobsPerPage);

        // object to array conversion method from https://stackoverflow.com/questions/38824349/convert-object-to-array-in-javascript
        let jobsArr = Object.keys(currentPageData).map(key => {
            // ID = 0, postDate = 1, company = 2, title = 3, location = 4, summary = 5, URL = 6
            return [key, currentPageData[key]['postDate'], currentPageData[key]['company'], currentPageData[key]['title'],
                currentPageData[key]['location'], currentPageData[key]['summary'], currentPageData[key]['url']];
        });

        console.log(jobsArr);

        return (
            <tbody>
            {jobsArr.map((job) => {
                return (
                    <tr key={job[0] + ' - ' + job[6]}>
                        <td>
                            <input
                                defaultChecked={true}
                                onClick={gatherOpenList}
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


    render() {
        return (
            <div>
                {jobResultsHeadline(this.props.jobList, this.props.currentPage)}
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
                    </Table>

                    <div id="pager">
                        <Pagination
                            onChange={this.onPagination}
                            current={this.state.currentPage}
                            total={totalPages(this.props.jobList.length)}
                        />
                    </div>
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

function currentPageToProps(currentPg) {
    return store.dispatch({
        type: 'CURRENT_PAGE_TO_PROPS',
        payload: currentPg
    });
}


function gatherOpenList(event) {
    if (event.target.checked) {
        openListArr.push(event.target.value);
    } else {
        openListArr.pop();
    }

    return store.dispatch({
        type: 'GATHER_URLS_TO_PROPS',
        payload: openListArr
    });
}

function onTriggerMap(job) {
    store.dispatch({
        type: 'JOB_LOCATION_TO_PROPS',
        payload: job
    });
}

function clearOpenJobList() {
    return store.dispatch({
        type: 'REMOVE_URLS_FROM_PROPS',
        payload: null
    });
}

/*
const openListArr = [];

export default function populateJobList(data, currentPage) {
    // console.log(data);

    if (!Object.keys(data).length) {
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
    let currentPageData = data.slice(jobsPerPage * (currentPage-1), currentPage * jobsPerPage);

    // object to array conversion method from https://stackoverflow.com/questions/38824349/convert-object-to-array-in-javascript
    let jobsArr = Object.keys(currentPageData).map(key => {
        // ID = 0, postDate = 1, company = 2, title = 3, location = 4, summary = 5, URL = 6
        return [key, currentPageData[key]['postDate'], currentPageData[key]['company'], currentPageData[key]['title'],
            currentPageData[key]['location'], currentPageData[key]['summary'], currentPageData[key]['url']];
    });

    console.log(jobsArr);

    return (
        <tbody>
            {jobsArr.map((job) => {
                return (
                    <tr key={job[0] + ' - ' + job[6]}>
                        <td>
                            <input
                                defaultChecked={true}
                                onClick={gatherOpenList}
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
 */
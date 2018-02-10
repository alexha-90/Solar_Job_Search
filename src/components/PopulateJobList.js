import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import adblockDetect from 'adblock-detect';
import store from '../index';
import jobResultsHeadline from '../helper_functions/jobResultsHeadline';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { FadingCircle } from 'better-react-spinkit';

// import populateTable from '../helper_functions/populateTable';

/*
TO:DO:
paginate onclick update url
 */
//================================================================================================//
let openListArr = [];
let currentPageJobURLs = [];

class PopulateJobList extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            openListArr: [],
        };
        this.jobsPerPage = 25;
        this.populateTable = this.populateTable.bind(this);
        this.buttonActions = this.buttonActions.bind(this);
        this.gatherOpenList = this.gatherOpenList.bind(this);
        this.onSelectAllJobs = this.onSelectAllJobs.bind(this);
        this.onOpenMultipleURLs = this.onOpenMultipleURLs.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.paginateDisplay = this.paginateDisplay.bind(this);
    }

    buttonActions() {
        if (this.props.jobList.length) {
            return (
                <div style={{marginTop: '15px'}}>
                    <Button onClick={this.onOpenMultipleURLs} bsSize="small">
                        <a data-tip="Open multiple job links at one time. For this to work, you must select at least one checkbox and
                         disable ad blocker on your browser AND addons.">
                            View selected jobs
                        </a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Button>
                    &nbsp;&nbsp;
                    <Button bsSize="small" onClick={() => {
                        this.setState({openListArr: []});
                        openListArr = [];
                    }}
                    >
                        Clear selection
                    </Button>
                </div>
            )
        }
    }

    populateTable() {
        // console.log(data);
        if (!Object.keys(this.props.jobList).length || this.props.loadingNewResults) {
            return (
                <tbody>
                <tr style={{background: 'none'}}>
                    <td>
                        <FadingCircle
                            size = {80}
                            color = {'orange'}
                        />
                    </td>
                </tr>
                </tbody>
            )
        }

        let currentPageData = this.props.jobList.slice(this.jobsPerPage * (this.state.currentPage-1), this.state.currentPage * this.jobsPerPage);


        let urlArr = [];
        // object to array conversion method from https://stackoverflow.com/questions/38824349/convert-object-to-array-in-javascript
        let jobsArr = Object.keys(currentPageData).map(key => {
            urlArr.push(currentPageData[key]['url']);

            // ID = 0, postDate = 1, company = 2, title = 3, location = 4, summary = 5, URL = 6
            return [key, currentPageData[key]['postDate'], currentPageData[key]['company'], currentPageData[key]['title'],
                currentPageData[key]['location'], currentPageData[key]['summary'], currentPageData[key]['url']];
        });

        // remove duplicate entries from repeat urlArr pushes
        currentPageJobURLs = [...new Set(urlArr)];

        // console.log(currentPageJobURLs);
        // console.log(jobsArr);

        return (
            <tbody>
            {jobsArr.map((job) => {
                return (
                    <tr key={job[0] + ' - ' + job[6]}>
                        <td>
                            <input
                                checked={this.state.openListArr.includes(job[6])}
                                onChange={this.gatherOpenList}
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

    onSelectAllJobs(event) {
        if (event.target.checked) {
            this.setState({ openListArr: currentPageJobURLs });
        } else {
            this.setState({ openListArr: [] });
        }
        console.log(currentPageJobURLs);
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
                            defaultPageSize={this.jobsPerPage}
                            total={Math.floor(this.props.jobList.length)}
                            showLessItems={true}
                        />
                    <div>
                        (NOTE: clicking a page button above will clear your checkbox selections)
                    </div>
                </div>
            )
        }
    }

    render() {
        // console.log(this.state);
        console.log(this.props);

        return (
            <div>
                {jobResultsHeadline(this.props.jobList, this.state.currentPage, this.props.locationParam, this.props.loadingNewResults)}
                {this.buttonActions()}
                <div id="jobTable">
                    <span id='mobileScrollTip'>
                        &rarr; Scroll to see more of table &rarr;
                    </span>
                    <Table responsive striped>
                        <thead>
                        <tr>
                            <th>
                                <input id="selectAllJobs" type="checkbox" onChange={this.onSelectAllJobs} checked={this.state.openListArr.length === this.jobsPerPage}/>
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
        loadingNewResults: state.jobList.loadingNewResults,
        urlOpenList: state.jobList.urlOpenList,
        locationParam: state.jobList.locationParam,
        locationToLaunch: state.jobList.locationToLaunch,
        currentPage: state.jobList.currentPage
    };
}

function onTriggerMap(job) {
    store.dispatch({
        type: 'JOB_LOCATION_TO_PROPS',
        payload: job
    });
}
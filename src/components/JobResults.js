import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import fetchJobs from './helper_functions/fetchJobs';
import populateJobList from './helper_functions/populateJobList';
import adblockDetect from 'adblock-detect';

/*
TO:DO:
auto populate with national results if user loads up /jobs
 */
//===============================================================================================//

class JobResults extends Component {
    constructor() {
        super();
        this.state = {
            loadingComponent: true
        }
        this.onOpenMultipleURLs = this.onOpenMultipleURLs.bind(this)
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
    }

    componentDidMount() {
        setTimeout(() => {
            return this.setState({ loadingComponent: false });
        }, 1500);
    }


    onOpenMultipleURLs(event) {
        event.preventDefault();
        adblockDetect(blocker => {
            if (blocker) {
                return alert('Note: for the open multiple links feature to work, you must disable ad blocker by browser AND any addons. Then refresh page. We do not spam you.');
            } else {
                const urlOpenList = this.props.urlOpenList;
                for (let i = 0; i < urlOpenList.length; i++) {
                    window.open(urlOpenList[i]);
                }
            }
        });
    }


    render() {
        if (this.state.loadingComponent) {
            return 'Loading...'
        }

        return (
            <div>
                <div className="">
                    <h1>Job results:</h1>
                </div>

                <button onClick={this.onOpenMultipleURLs}>Test open multiple links</button>

                <Table responsive>
                    <thead>
                    <tr>
                        <th> </th>
                        <th>Date Posted</th>
                        <th>Company</th>
                        <th>Job Title</th>
                        <th>Location</th>
                        <th>Summary</th>
                    </tr>
                    </thead>
                    {populateJobList(this.props.jobList)}
                </Table>

            </div>
        )
    }
}


export default connect(mapStateToProps)(JobResults);

function mapStateToProps(state) {
    return {
        jobList: state.jobList.jobsList,
        urlOpenList: state.jobList.urlOpenList
    };
}
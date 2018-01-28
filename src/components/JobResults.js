import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import fetchJobs from './helper_functions/fetchJobs';
import populateJobList from './helper_functions/populateJobList';

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
        this.openMultiple = this.openMultiple.bind(this)
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


    openMultiple(event) {
        event.preventDefault();
        window.open('http://google.com');
        window.open('http://bing.com');
    }





    render() {
        if (this.state.loadingComponent) {
            return 'Loading...'
        }

        return (
            <div>
                <div className="">
                    <h1>Job results:</h1>
                    Note: for the open multiple links feature to work, you must disable ad blocker by browser AND any addons. We do not spam you.
                    {populateJobList(this.props.jobList)}
                </div>

                <button onClick={this.openMultiple}>Test open multiple links</button>

                <Table responsive>
                    <thead>
                    <tr>
                        <th>(gather)</th>
                        <th>Date Posted</th>
                        <th>Company</th>
                        <th>Job Title</th>
                        <th>Location</th>
                        <th>Summary</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input id="checkBox" type="checkbox"/>
                        </td>
                        <td>Just posted</td>
                        <td>LG Electronics USA very long title</td>
                        <td>Field Applications engineering at LG Consulting. Early!</td>
                        <td>Big Valley in the small town, CA</td>
                        <td>
                            Put simply, we offer the latest innovations to make "Life Good"
                        </td>
                    </tr>
                    </tbody>
                </Table>

            </div>
        )
    }
}


export default connect(mapStateToProps)(JobResults);

function mapStateToProps(state) {
    return {
        jobList: state.jobList,
    };
}



/*
                        <td>Just posted</td>
                        <td>LG Electronics USA very long title</td>
                        <td>Field Applications engineering at LG Consulting. Early!</td>
                        <td>Big Valley in the small town, CA</td>
                        <td>Put simply, we offer the latest innovations to make "Life Good" – from home appliances, consumer electronics, vehicle components and mobile communications to.</td>

 */
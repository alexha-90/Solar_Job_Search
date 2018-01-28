import React, { Component } from 'react';
import { connect } from 'react-redux';
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


    render() {
        if (this.state.loadingComponent) {
            return 'Loading...'
        }

        return (
            <div>
                hey results page

                <div className="">
                    <h1>Job results:</h1>
                    {populateJobList(this.props.jobList)}
                </div>


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

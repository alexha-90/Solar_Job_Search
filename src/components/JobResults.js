import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
TO:DO:
auto populate with national results if user loads up /jobs
 */
//===============================================================================================//

class JobResults extends Component {
    constructor() {
        super()
    }


    render() {
        console.log(this.props.jobList);

        return (
            <div>
                hey results page
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

import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect} from 'react-redux';
import store from '../index';
import Iframe from 'react-iframe';

//TO-DO: onhover, load google maps api and show location in modal
// g key: AIzaSyDJlAgCIT52lOjHJKUzLIsyc-VMR4r3voQ
// AIzaSyDM79XowJmUO9FJmV99vyDpnd-6tKywxWY
// {googleMapsModal(this.props.jobList, this.props.locationToLaunch)}
//================================================================================================//

class GoogleMapsModal extends Component {
    constructor() {
        super();
        this.renderContent = this.renderContent.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    closeModal() {
        // set props.location to false
        store.dispatch({
            type: 'REMOVE_JOB_LOCATION_PROPS',
            payload: null
        });
    }


    renderContent() {
        if (this.props.locationToLaunch) {
            let showModal = true;
            let loc = this.props.locationToLaunch[4];
            const googleMapURL='https://www.google.com/maps/embed/v1/place?q=' + loc + '&zoom=9&key=AIzaSyDM79XowJmUO9FJmV99vyDpnd-6tKywxWY';

            return (
                <Modal show={showModal} onHide={this.closeModal} bsSize='large' className='googleMapsModal'>
                    <Modal.Header closeButton>
                        <Modal.Title id="header">
                            <span id="companyName">
                                {this.props.locationToLaunch[2]} - ({this.props.locationToLaunch[3]})
                            </span>
                            <br/>
                            <span id="datePosted">
                                Date posted: {this.props.locationToLaunch[1]}
                            </span>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="googleMapFrame">
                        <Iframe url={ googleMapURL }
                            width="100%"
                            height="100%"
                            position="relative"
                            />
                    </Modal.Body>
                    <Modal.Footer>
                        <span id="jobSummary">
                            {this.props.locationToLaunch[5]}
                        </span>
                        <br/>
                        <Button id="viewJobButton" bsStyle="primary">
                            <a href={this.props.locationToLaunch[6]} target='_blank'>
                                View Job
                            </a>
                        </Button>
                        <Button bsStyle="danger" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

    render() {
        // console.log(this.props.locationToLaunch);

        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default connect(mapStateToProps)(GoogleMapsModal);

function mapStateToProps(state) {
    return {
        jobList: state.jobList.jobsList,
        locationToLaunch: state.jobList.locationToLaunch
    };
}
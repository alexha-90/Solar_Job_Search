import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

//===============================================================================================//

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Grid id="centeredFooterText">
                    <Row>
                        <Col sm={2} md={2}>{' '}</Col>
                        <Col sm={8} md={8}>
                            <a href="mailto:#" title="contact">Contact Us</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="/terms">Terms of Use</a>
                            <br />
                            Follow us on social media:&nbsp;
                            <a href="https://www.facebook.com/SolarJobSearch/" className="fa fa-facebook"> </a>
                            <br/>
                            <span id='copyright'>
                                © 2018 SolarJobSearch.com
                            </span>
                        </Col>
                        <Col sm={2} md={2}>{' '}</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Footer;
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
                            <div id="footerLicensing">
                                <a href="https://icons8.com">Icon pack by Icons8</a>
                            </div>
                            Follow us on social media:&nbsp;
                            <a href="https://www.facebook.com/SolarJobSearch/" className="fa fa-facebook"> </a>
                            <hr/>
                            © 2018 SolarJobSearch.com
                        </Col>
                        <Col sm={2} md={2}>{' '}</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Footer;
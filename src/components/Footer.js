import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//===============================================================================================//

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Grid id="centeredFooterText">
                    <Row>
                        <Col sm={2} md={2}>{' '}</Col>
                        <Col sm={8} md={8}>
                            <Link to="/contact">Contact Us</Link>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link to="/terms">Terms of Use</Link>
                            <br />
                            © 2018 SolarJobSearch.com
                        </Col>
                        <Col sm={2} md={2}>{' '}</Col>
                    </Row>
                </Grid>


                {/*<div id="footerLicensingColor">*/}
                    {/*<h6 id="footerLicensing">*/}
                        {/*golden gate bridge graphic by <a href="https://thenounproject.com/prosymbols">tnp_prosymbols</a>*/}
                        {/*from <a href="https://thenounproject.com/">TheNounProject</a> is licensed*/}
                        {/*under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>.*/}
                        {/*Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Maker">*/}
                        {/*LogoMaker.com. </a><a href="https://icons8.com">Icon pack by Icons8</a>*/}
                    {/*</h6>*/}
                {/*</div>*/}

            </div>
        );
    }
}

export default Footer;
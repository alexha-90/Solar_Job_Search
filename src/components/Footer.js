import React, { Component } from 'react';

//===============================================================================================//

class Footer extends Component {
    render() {
        return (
            <div className="footer">

                <a href="mailto:#" title="contact">Contact Us</a>

                &nbsp;&nbsp;|&nbsp;&nbsp;

                <a href="/terms">
                    Terms
                </a>

                &nbsp;&nbsp;|&nbsp;&nbsp;

                <a href="/privacy">
                    Privacy
                </a>

                <br />

                Follow us on social media:&nbsp;

                <a href="https://www.facebook.com/SolarJobSearch/" className="fa fa-facebook">
                    {' '}
                </a>

                <br/>

                <span id='copyright'>
                    © 2018 SolarJobSearch.com
                </span>
            </div>
        );
    }
}

export default Footer;
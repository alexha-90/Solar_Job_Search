import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
// import { Navbar, NavItem, Nav } from 'react-bootstrap';

// NOTE: Simplistic header for now. Commented code below is for training section expansion
//===============================================================================================//

class Header extends Component {
    render() {
        return (
            <section className="header">
                <Navbar collapseOnSelect className="headerContainer">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" alt="SolarJobSearch">
                                <img src="https://s3.amazonaws.com/solarjobsearch/solarJobSearch_logo1.png" alt="SolarJobSearch_Logo" id="color1Logo"/>
                                <img src="https://s3.amazonaws.com/solarjobsearch/solarJobSearch_logo2.png" id="color2Logo"/>
                            </a>
                        </Navbar.Brand>
                        {/*<Navbar.Toggle />*/}
                    </Navbar.Header>
                    {/*<Navbar.Collapse>*/}
                        {/*<Nav pullRight>*/}
                            {/*<NavItem active eventKey={1} href="/">*/}
                                {/*Find Jobs*/}
                            {/*</NavItem>*/}
                            {/*/!*<NavItem divider="true" />*!/*/}
                            {/*<NavItem className="disabled" eventKey={2} href="#">*/}
                                {/*Training (TBD)*/}
                            {/*</NavItem>*/}
                        {/*</Nav>*/}
                    {/*</Navbar.Collapse>*/}
                </Navbar>
            </section>
        )
    }
}


export default Header;
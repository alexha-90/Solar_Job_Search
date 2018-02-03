import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
//===============================================================================================//

class Header extends Component {
    render() {
        return (
            <section className="header">
                <Navbar collapseOnSelect className="headerContainer">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" alt="SolarJobSearch">SolarJobSearch</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem active eventKey={1} href="/">
                                Find Jobs
                            </NavItem>
                            {/*<NavItem divider="true" />*/}
                            <NavItem disabled eventKey={2} href="#">
                                Training (TBD)
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </section>
        )
    }
}


export default Header;
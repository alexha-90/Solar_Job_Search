import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';


class Header extends Component {
    render() {
        return (
            <section className="header">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" alt="SolarJobSearch">SolarJobSearch</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                Find Jobs
                            </NavItem>
                            <NavItem divider />
                            <NavItem eventKey={2} href="#">
                                Get Training
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </section>
        )
    }
}


export default Header;

import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

class NavigationBar extends React.Component {
    render(): React.ReactNode {
        return (
            <Navbar sticky="top" bg="primary" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Flight Service Portal</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer> 

                            <LinkContainer to="/passenger">
                                <Nav.Link>Passenger</Nav.Link>
                            </LinkContainer>    

                            <LinkContainer to="/flight">
                                <Nav.Link>Flight</Nav.Link>
                            </LinkContainer>           
                    
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavigationBar;
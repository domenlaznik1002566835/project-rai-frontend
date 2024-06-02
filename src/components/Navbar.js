import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaJediOrder, FaComments, FaTimes } from 'react-icons/fa';
import { IoFastFood } from "react-icons/io5";

const NavigationBar = () => {
    const { user } = useUser();
    const [isChatExpanded, setChatExpanded] = useState(false);
    const [chatAreaWidth, setChatAreaWidth] = useState(window.innerWidth / 5);
    const [chatAreaHeight, setChatAreaHeight] = useState(window.innerHeight / 2);

    useEffect(() => {
        const handleResize = () => {
            setChatAreaWidth(window.innerWidth / 5);
            setChatAreaHeight(window.innerHeight / 2);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <FaJediOrder size="2em" color="blue" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Button as={Link} to="/dbm" variant="outline-danger" className="mx-1">Database</Button>
                            <Button as={Link} to="/dbi" variant="outline-danger" className="mx-1">Insert</Button>
                            <Button as={Link} to="/order" variant="outline-primary" className="mx-1"><IoFastFood /></Button>
                            {user ? (
                                <>
                                    <Button as={Link} to="/userInfo" variant="outline-primary" className="mx-1">User Info</Button>
                                    <Button as={Link} to="/logout" variant="outline-danger" className="mx-1">Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button as={Link} to="/login" variant="outline-primary" className="mx-1">Login</Button>
                                    <Button as={Link} to="/register" variant="outline-primary" className="mx-1">Register</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <FaComments size="2em" color="blue" style={{ cursor: 'pointer' }} onClick={() => setChatExpanded(!isChatExpanded)} />
                {isChatExpanded && (
                    <div className="chat-area" style={{ position: 'fixed', bottom: '20px', right: '20px', width: `${chatAreaWidth}px`, height: `${chatAreaHeight}px`, backgroundColor: 'white', border: '1px solid black', borderRadius: '10px', padding: '10px', overflow: 'auto' }}>
                        <FaTimes style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => setChatExpanded(false)} />
                        <div>Experiencing issues? Let us know.</div>
                    </div>
                )}
            </div>
        </>
    );
}

export default NavigationBar;
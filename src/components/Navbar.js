import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaJediOrder, FaComments, FaTimes, FaUserCircle, FaPencilAlt } from 'react-icons/fa';
import { IoFastFood } from "react-icons/io5";

const NavigationBar = () => {
    const { user, level } = useUser();
    const [isChatExpanded, setChatExpanded] = useState(false);
    const [isNotepadExpanded, setNotepadExpanded] = useState(false);
    const [chatAreaWidth, setChatAreaWidth] = useState(window.innerWidth / 5);
    const [chatAreaHeight, setChatAreaHeight] = useState(window.innerHeight / 2);
    const [notepadAreaWidth, setNotepadAreaWidth] = useState(window.innerWidth / 5);
    const [notepadAreaHeight, setNotepadAreaHeight] = useState(window.innerHeight / 2);
    const [notepadContent, setNotepadContent] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setChatAreaWidth(window.innerWidth / 5);
            setChatAreaHeight(window.innerHeight / 2);
            setNotepadAreaWidth(window.innerWidth / 5);
            setNotepadAreaHeight(window.innerHeight / 2);
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
                            {level === 3 ? (
                                <Button as={Link} to="/dbm" variant="outline-danger" className="mx-1">Database</Button>
                            ) : null}
                            {level > 0 ? (
                                <Button as={Link} to="/dbi" variant="outline-danger" className="mx-1">Insert</Button>
                            ) : null}
                            {level > -1 ? (
                                <Button as={Link} to="/contracts" variant="outline-danger" className="mx-1">Contracts</Button>
                            ) : null}
                            {user ? (
                                <>
                                    <Button as={Link} to="/userInfo" variant="outline-primary" className="mx-1">
                                        <FaUserCircle />
                                    </Button>
                                    <Button as={Link} to="/logout" variant="outline-danger" className="mx-1">Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button as={Link} to="/login" variant="outline-primary" className="mx-1">Login</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                {level > -1 && (
                    <div style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
                        <FaPencilAlt size="2em" color="blue" style={{ cursor: 'pointer' }} onClick={() => setNotepadExpanded(!isNotepadExpanded)} />
                        {isNotepadExpanded && (
                            <div className="notepad-area" style={{ position: 'fixed', bottom: '20px', left: '20px', width: `${notepadAreaWidth}px`, height: `${notepadAreaHeight}px`, backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', overflow: 'auto', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                                <FaTimes style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => setNotepadExpanded(false)} />
                                <textarea value={notepadContent} onChange={(e) => setNotepadContent(e.target.value)} style={{ width: '100%', height: '90%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}></textarea>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default NavigationBar;
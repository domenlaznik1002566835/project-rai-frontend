import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const { user, level } = useUser();
    const navigate = useNavigate();

    const handleSeeMore = (path) => {
        navigate(path);
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <Card className="text-center">
                        <Card.Header>
                            <h2>{level > -1 ? 'Staff Information' : 'User Information'}</h2>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}<br/>
                                <small><strong>ID:</strong> {user._id}</small>
                            </Card.Text>
                            {level > -1 && <Card.Text><strong>Level:</strong> {user.level}</Card.Text>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {level === -1 && (
                <Row className="justify-content-md-center">
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Package</Card.Title>
                                <Card.Text>See logs for you package here</Card.Text>
                                <Button variant="primary" onClick={() => handleSeeMore('/package')}>See More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Room</Card.Title>
                                <Card.Text>See your room contract here</Card.Text>
                                <Button variant="primary" onClick={() => handleSeeMore('/room')}>See More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Package</Card.Title>
                                <Card.Text>See your package contract here</Card.Text>
                                <Button variant="primary" onClick={() => handleSeeMore('/packageinfo')}>See More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default UserInfo;
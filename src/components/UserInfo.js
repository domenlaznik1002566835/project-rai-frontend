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
                <>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Package</Card.Title>
                                    <Card.Text>Random text for package</Card.Text>
                                    <Button variant="primary" onClick={() => handleSeeMore('/package')}>See More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Room</Card.Title>
                                    <Card.Text>Random text for room</Card.Text>
                                    <Button variant="primary" onClick={() => handleSeeMore('/room')}>See More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Contract</Card.Title>
                                    <Card.Text>Random text for contract</Card.Text>
                                    <Button variant="primary" onClick={() => handleSeeMore('/contract')}>See More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Recent Orders</Card.Title>
                                    <Card.Text>Random text for recent orders</Card.Text>
                                    <Button variant="primary" onClick={() => handleSeeMore('/orders')}>See More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default UserInfo;
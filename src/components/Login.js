import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ip } from './ip';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserContext, setLevel, setId } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login form submitted');

        try {
            const response = await axios.post(`${ip}/clients/login`, { email, password });
            const userInfo = response.data;
            setUserContext(userInfo);
            console.log('User context set:', userInfo);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }

        try {
            const isStaff = await axios.get(`${ip}/staff/email/${email}`);
            setLevel(isStaff.data.level)
        } catch (error) {
            console.log('Not staff')
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                    <p className="mt-3">New here? <Button variant="link" onClick={handleRegisterRedirect}>Register</Button></p>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
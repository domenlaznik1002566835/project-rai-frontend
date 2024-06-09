import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Toast } from 'react-bootstrap';
import axios from 'axios';
import { ip } from './ip';
import {toast, ToastContainer} from "react-toastify";

const InsertPackage = () => {
    const [code, setCode] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!code.trim()) {
            setToastVariant('danger');
            setToastMessage('Code cannot be empty');
            setShowToast(true);
            return;
        }

        const data = {
            code: code
        }

        try {
            const response = await fetch(`${ip}/packages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if(!response.ok){
                toast.error(response.statusText);
            }
            else{
                toast.success('Package inserted successfully');
            }
            setCode('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCode">
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Insert
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 20, right: 20, color: 'white', backgroundColor: toastVariant === 'success' ? '#28a745' : '#dc3545' }}>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </Container>
    );
};

export default InsertPackage;
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ContractForm = () => {
    const [contractData, setContractData] = useState({
        contractType: 'room', // Set initial value to 'room'
        roomNumber: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        packageCode: '', // New field for package code
        // Add more fields as needed
    });

    const handleChange = (event) => {
        setContractData({
            ...contractData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Form onSubmit={handleSubmit} className="p-5 border rounded-3 bg-light">
                        <Form.Group controlId="contractType" className="mb-3">
                            <Form.Label>Contract Type</Form.Label>
                            <Form.Select name="contractType" value={contractData.contractType} onChange={handleChange}>
                                <option value="room">Room</option>
                                <option value="package">Package</option>
                            </Form.Select>
                        </Form.Group>

                        {contractData.contractType === 'room' && (
                            <>
                                {/* Fields for room contract */}
                                <Form.Group controlId="roomNumber" className="mb-3">
                                    <Form.Label>Room Number</Form.Label>
                                    <Form.Control type="text" name="roomNumber" value={contractData.roomNumber} onChange={handleChange} />
                                </Form.Group>
                            </>
                        )}

                        {contractData.contractType === 'package' && (
                            <>
                                {/* Fields for package contract */}
                                <Form.Group controlId="packageCode" className="mb-3">
                                    <Form.Label>Package Code</Form.Label>
                                    <Form.Control type="text" name="packageCode" value={contractData.packageCode} onChange={handleChange} />
                                </Form.Group>
                                {/* Add more fields for package contract here */}
                            </>
                        )}

                        <Form.Group controlId="clientEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="clientEmail" value={contractData.clientEmail} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="startDate" className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate" value={contractData.startDate} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="endDate" className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="endDate" value={contractData.endDate} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ContractForm;
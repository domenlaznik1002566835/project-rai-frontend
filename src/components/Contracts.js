import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { ip } from './ip';
import { Toast } from 'react-bootstrap';
import {toast, ToastContainer} from "react-toastify";

const ContractForm = () => {
    const [contractData, setContractData] = useState({
        contractType: 'room', // Set initial value to 'room'
        roomNumber: '',
        clientEmail: '',
        startDate: '',
        endDate: '',
        packageCode: '',
    });
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        setContractData({
            ...contractData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!contractData.roomNumber || !contractData.clientEmail || !contractData.startDate || !contractData.endDate || (contractData.contractType === 'package' && !contractData.packageCode)) {
            setShowModal(true);
            return;
        }
        var client;

        try{
            const response = await fetch(`${ip}/clients/email/${contractData.clientEmail}`);
            client = await response.json();
            if (!client) {
                console.error('No such client');
                return;
            }
        } catch (error) {
            console.error('Error:', error);
        }

        if (contractData.contractType === 'room') {
            const data = {
                clientId: client._id,
                roomNumber: contractData.roomNumber,
                contractCreated: contractData.startDate,
                contractEnds: contractData.endDate,
            };
            try {
                const response = await fetch(`${ip}/clientHasRooms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if(!response.ok){
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                }
                const res = await response.json();
                toast.success('Contract created successfully');
                console.log(res);
                setContractData({
                    contractType: 'room',
                    roomNumber: '',
                    clientEmail: '',
                    startDate: '',
                    endDate: '',
                    packageCode: '',
                });

            } catch (error) {
                toast.error(error.message);
                console.error('Error:', error);
            }
        } else if (contractData.contractType === 'package') {
            const data = {
                client: client._id,
                package: contractData.packageCode,
                start: contractData.startDate,
                end: contractData.endDate,
            };
            try {
                const response = await fetch(`${ip}/packageContracts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const res = await response.json();
                console.log(res);
                setContractData({
                    contractType: 'package',
                    roomNumber: '',
                    clientEmail: '',
                    startDate: '',
                    endDate: '',
                    packageCode: '',
                });
                toast.success('Package contract created successfully')
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>All required fields must be filled out</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                <Form.Group controlId="packageCode" className="mb-3">
                                    <Form.Label>Package Code</Form.Label>
                                    <Form.Control type="text" name="packageCode" value={contractData.packageCode} onChange={handleChange} />
                                </Form.Group>
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
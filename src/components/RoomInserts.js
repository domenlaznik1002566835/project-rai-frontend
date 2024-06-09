import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer} from "react-toastify";
import { ip } from './ip';

const RoomInserts = () => {
    const [roomData, setRoomData] = useState({
        roomSize: 1,
        roomType: 1,
        roomNumber: '',
    });

    const handleChange = (e) => {
        setRoomData({
            ...roomData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            size: Number(roomData.roomSize),
            type: Number(roomData.roomType),
            number: roomData.roomNumber,
        };

        try {
            const response = await fetch(`${ip}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }

            const res = await response.json();
            toast.success('Room inserted successfully');
            console.log(res);
        } catch (error) {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error('An error occurred');
            }
            console.error('An error occurred while making the API request:', error);
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="roomSize">
                            <Form.Label>Room Size</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                name="roomSize"
                                value={roomData.roomSize}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="roomType">
                            <Form.Label>Room Type</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                name="roomType"
                                value={roomData.roomType}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="roomNumber"> {/* Add this block */}
                            <Form.Label>Room Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="roomNumber"
                                value={roomData.roomNumber}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomInserts;
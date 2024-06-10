import React, { useState, useEffect } from 'react';
import { useUser } from "../contexts/UserContext";
import { Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { ip } from './ip';

const RoomInfo = () => {
    const { user } = useUser();
    const [roomInfo, setRoomInfo] = useState({
        roomName: '',
        roomCapacity: '',
        roomType: '',
        clientHasRoom: null,
        room: null
    });

    useEffect(() => {
        const fetchRoomInfo = async () => {
            const response = await fetch(`${ip}/clientHasRooms/${user._id}`);
            const data = await response.json();

            const contractStartDate = new Date(data.clientHasRoom.contractCreated);
            const contractEndDate = new Date(data.clientHasRoom.contractEnds);
            const duration = Math.ceil((contractEndDate - contractStartDate) / (1000 * 60 * 60 * 24));

            const roomPrice = duration * data.room.type * 50;

            setRoomInfo({
                roomName: data.room.number,
                roomCapacity: data.room.size,
                roomType: data.room.type,
                clientHasRoom: data.clientHasRoom,
                room: data.room,
                roomPrice: roomPrice,
                duration: duration,
            });
        };
        fetchRoomInfo();
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Card className="mb-3">
                        <Card.Header>
                            <h2>Room Information</h2>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Room Number:</strong> {roomInfo.roomName}</p>
                            <p><strong>Room Capacity:</strong> {roomInfo.roomCapacity}</p>
                            <p><strong>Room Type:</strong> {roomInfo.roomType}</p>
                        </Card.Body>
                    </Card>

                    {roomInfo.clientHasRoom ? (
                        <Card className="mb-3">
                            <Card.Header>
                                <h3>Client Room Contract Information</h3>
                            </Card.Header>
                            <Card.Body>
                                <p><strong>Contract ID:</strong> {roomInfo.clientHasRoom._id}</p>
                                <p><strong>Room:</strong> {roomInfo.clientHasRoom.room}</p>
                                <p><strong>Contract Created:</strong> {new Date(roomInfo.clientHasRoom.contractCreated).toLocaleDateString()}</p>
                                <p><strong>Contract Ends:</strong> {new Date(roomInfo.clientHasRoom.contractEnds).toLocaleDateString()}</p>
                                <p>Room ordered for <strong>{roomInfo.duration}</strong> days</p>
                                <p><strong>Room Price:</strong> {roomInfo.roomPrice}€</p>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Alert variant="info">No contract yet</Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RoomInfo;
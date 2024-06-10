import React, { useEffect, useState } from 'react';
import { useUser } from "../contexts/UserContext";
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { ip } from './ip';

const PackageInfo = () => {
    const [packageInfo, setPackageInfo] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchPackageInfo = async () => {
            try {
                const response = await fetch(`${ip}/packageContracts/all/${user._id}`);
                if (!response.ok) { // if HTTP-status is 404-599
                    console.log('HTTP-Status is not ok');
                    return;
                }
                const data = await response.json();
                console.log(data);

                const validContracts = data.filter(contract => new Date(contract.end) > new Date());
                setPackageInfo(validContracts);
            } catch (error) {
                console.error('Fetch failed', error);
            }
        };
        fetchPackageInfo();
    }, []);

    return (
        <Container>
            {packageInfo.map((contract, index) => (
                <Row className="justify-content-md-center" key={index}>
                    <Col xs lg="6">
                        <Card className="mb-3">
                            <Card.Header>
                                <h4>{contract._id}</h4>
                            </Card.Header>
                            <Card.Body>
                                <p><strong>Package ID:</strong> {contract.package}</p>
                                <p><strong>Contract Start:</strong> {new Date(contract.start).toLocaleDateString()}</p>
                                <p><strong>Contract End:</strong> {new Date(contract.end).toLocaleDateString()}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
            {packageInfo.length === 0 && (
                <Alert variant="info">No contract yet</Alert>
            )}
        </Container>
    );
};

export default PackageInfo;
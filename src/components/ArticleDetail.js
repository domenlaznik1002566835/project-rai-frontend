import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { ip } from './ip';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch(`${ip}/info/${id}`)
            .then(response => response.json())
            .then(data => setArticle(data));
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }

    const date = new Date(article.created);
    const formattedDate = date.toLocaleDateString('sl-Sl', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const imageUrl = `${ip}/${article.image}`;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8} lg={6} className="mx-auto">
                    <Card className="mb-4">
                        {article.image && <Card.Img variant="top" src={imageUrl} />}
                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>{article.text}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">{formattedDate}</small>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ArticleDetail;
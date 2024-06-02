import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NewsArticle from "./NewsArticle";
import UserInfo from './UserInfo';
import { ip } from './ip';

const HomePage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(`${ip}/info`)
            .then(response => response.json())
            .then(data => setNews(data));
    }, []);

    return (
        <Container className="mt-4">
            <Row>
                {news.map(article => (
                    <Col sm={6} md={4} lg={3} key={article.id}>
                        <NewsArticle article={article} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
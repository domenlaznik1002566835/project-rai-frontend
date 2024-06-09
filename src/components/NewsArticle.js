import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ip } from './ip';

const NewsArticle = ({ article }) => {
    const [isImageLoaded, setImageLoaded] = useState(false);
    const imageUrl = `${ip}/${article.image}`;

    const date = new Date(article.created);
    const formattedDate = date.toLocaleDateString('sl-Sl', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const currentDate = new Date();
    const difference = currentDate - date;
    const differenceInHours = difference / (1000 * 60 * 60);
    const isLessThanADayOld = differenceInHours < 24;

    return (
        <Link to={`/article/${article._id}`} style={{ textDecoration: 'none' }}>
            <Card className={`mb-4 ${isLessThanADayOld ? 'new-article-golden-shadow' : 'new-article shadow'}`}>
                {article.image && (
                    <>
                        {!isImageLoaded && <div>Loading...</div>}
                        <Card.Img variant="top" src={imageUrl} onLoad={() => setImageLoaded(true)} />
                    </>
                )}
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.content}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{formattedDate}</small>
                </Card.Footer>
            </Card>
        </Link>
    );
};

export default NewsArticle;
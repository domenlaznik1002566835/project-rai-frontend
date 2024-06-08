import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ip } from './ip';

// Javni VAPID ključ za Web Push obvestila
const publicVapidKey = 'BMf9iJSPvw4KeZJm-QO4S6QiScqlM-nk4j23rSvrvSYHwOpjxCjt3LQ6TH20_BtGHfU9foZuqOIBjIbXHA4aw_M';

const Login = () => {
  const [email, setEmail] = useState('');  // Stanje za shranjevanje e-pošte
  const [password, setPassword] = useState('');  // Stanje za shranjevanje gesla
  const { setUserContext, setLevel, setUserId, userId } = useUser();  // Uporaba prilagojenega hooka za upravljanje uporabniškega konteksta
  const navigate = useNavigate();  // Hook za navigacijo
  const [subscription, setSubscription] = useState(null);  // Stanje za shranjevanje objekta naročnine

  // Učinek za ravnanje z registracijo servisnega delavca in naročnino na potisna obvestila
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          if (sub) {
            // Odjava, če je že naročen
            sub.unsubscribe().then(() => {
              subscribeUserToPush(registration);
            }).catch(err => console.error('Failed to unsubscribe from Web Push:', err));
          } else {
            subscribeUserToPush(registration);
          }
        });
      });
    }
  }, []);

  // Funkcija za ravnanje z naročnino na potisna obvestila
  const subscribeUserToPush = (registration) => {
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    }).then(sub => {
      setSubscription(sub);
    }).catch(err => console.error('Failed to subscribe to Web Push:', err));
  };

  // Pomožna funkcija za pretvorbo VAPID ključa
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    if (!subscription) {
      console.error('Subscription is not set.');
      return;
    }

    try {
      const response = await axios.post(`${ip}/clients/login`, { email, password, subscription });
      const userInfo = response.data;
      setUserContext(userInfo);  
      setUserId(userInfo.userId);  
      setLevel(userInfo.level); 

      console.log('User context set:', userInfo);
      
      // Pošlji testno obvestilo po uspešni prijavi
      await sendTestNotification(userInfo.userId);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // pošiljanje testnega obvestila tu
  const sendTestNotification = async (userId) => {
    if (!userId) {
      console.error('User ID is not set.');
      return;
    }

    try {
      console.log('Sending test notification to userId:', userId);
      // Zahteva za 2fa web push obvestilo
      const response = await axios.post(`${ip}/clients/send-test-notification`, {
        userId,
        title: 'Test Notification',
        message: 'This is a test notification.'
      });
      console.log('Test notification sent:', response.data);
    } catch (error) {
      console.error('Failed to send test notification:', error);
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

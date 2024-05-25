import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserContext } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login form submitted'); // Debugging log

        try {
            const response = await axios.post('http://localhost:3001/clients/login', { email, password });
            const userInfo = response.data;
            setUserContext(userInfo);
            console.log('User context set:', userInfo); // Debugging log
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

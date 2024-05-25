import React from 'react';
import { useUser } from '../contexts/UserContext';

const Logout = () => {
    const { logout } = useUser();

    return <button onClick={logout}>Logout</button>;
};

export default Logout;

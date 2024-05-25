import React from 'react';
import { useUser } from '../contexts/UserContext';

const UserInfo = () => {
    const { user } = useUser();

    if (!user) {
        return <p>No user logged in</p>;
    }

    return (
        <div>
            <p>Logged in as: {user.email}</p>
        </div>
    );
};

export default UserInfo;

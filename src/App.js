import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import UserInfo from './components/UserInfo';

function App() {
    return (
        <div className="App">
            <h1>Package Tracker</h1>
            <UserInfo />
            <Login />
            <Logout />
        </div>
    );
}

export default App;

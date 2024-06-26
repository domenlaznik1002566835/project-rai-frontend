import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import UserInfo from './components/UserInfo';
import DatabaseManipulation from "./components/DatabaseManipulation";
import DatabaseInserts from "./components/DatabaseInserts";
import ArticleDetail from "./components/ArticleDetail";
import Contracts from "./components/Contracts";
import PackageLogs from "./components/PackageLogs";
import RoomInfo from './components/RoomInfo';
import PackageInfo from "./components/PackageInfo";

function App() {
    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);

    const updateUserData = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    };

    return (
        <Router>
            <UserProvider value={{ user, setUserContext: updateUserData }}>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/userinfo" element={<UserInfo />} />
                        <Route path="/dbm" element={<DatabaseManipulation />} />
                        <Route path="/dbi" element={<DatabaseInserts />} />
                        <Route path="/article/:id" element={<ArticleDetail />} />
                        <Route path="/contracts" element={<Contracts />} />
                        <Route path="/package" element={<PackageLogs />} />
                        <Route path="/room" element={<RoomInfo />} />
                        <Route path="/packageinfo" element={<PackageInfo />} />
                    </Routes>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;

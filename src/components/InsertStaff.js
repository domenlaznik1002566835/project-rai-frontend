import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import {ip} from "./ip";
import {toast, ToastContainer} from "react-toastify";

function InsertStaff() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !level.trim()) {
            setShowErrorModal(true);
            return;
        }

        if (level < 0 || level > 3) {
            toast.error('Level must be a number between 0 and 3');
            return;
        }

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            level: Number(level)
        };

        try {
            const response = await fetch(`${ip}/staff`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message);
            }
            else{
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setLevel("");
                toast.success('Staff member inserted successfully')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-3">Insert Staff</h1>

            <ToastContainer />

            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>All fields must be filled out</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={firstName}
                           onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={lastName}
                           onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Level</label>
                    <input type="number" className="form-control" value={level}
                           onChange={e => setLevel(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default InsertStaff;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { ip } from './ip';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from "react-bootstrap/ToastContext";
import { ToastContainer } from 'react-toastify';

const InsertIngredient = () => {
    const [name, setName] = useState("");
    const [grams, setGrams] = useState("");
    const [calories, setCalories] = useState("");
    const [vegetarian, setVegetarian] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !calories.trim() || !grams.trim()) {
            setShowErrorModal(true);
            return;
        }

        const data = {
            name: name,
            grams: grams,
            calories: calories,
            vegetarian: vegetarian
        };

        try {
            const response = await fetch(`${ip}/ingredients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toast.error('Error inserting ingredient');
            }
            else{
                toast.success('Ingredient inserted successfully');
            }
            setName("");
            setCalories("");
            setVegetarian(false);
            setGrams("");
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container">
            <ToastContainer />
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Name, grams and calories cannot be empty</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className="my-3">Insert Ingredient</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="Name"/>
                </div>
                <div className="mb-3">
                    <input type="number" className="form-control" value={grams}
                           onChange={(e) => setGrams(e.target.value)}
                           placeholder="Grams"/> {/* New input field for grams */}
                </div>
                <div className="mb-3">
                    <input type="number" className="form-control" value={calories}
                           onChange={(e) => setCalories(e.target.value)} placeholder="Calories"/>
                </div>
                <div className="mb-3 form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" id="vegetarianCheck" checked={vegetarian}
                           onChange={(e) => setVegetarian(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="vegetarianCheck">Vegetarian</label>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default InsertIngredient;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { ip } from './ip';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const InsertMeal = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [showGramsErrorModal, setShowGramsErrorModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showImageErrorModal, setShowImageErrorModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !price.trim() || !image) {
            setShowErrorModal(true);
            return;
        }

        const data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append('image', image, image.name);
        data.append('ingredients', JSON.stringify(selectedIngredients));

        try {
            const response = await fetch(`${ip}/meals`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                toast.error('Error inserting meal');
            }
            else{
                toast.success('Meal inserted successfully');
            }
            setName("");
            setPrice("");
            setImage(null);
            setSelectedIngredients([]);
            setAddedIngredients([]);
            document.getElementById('imageUpload').value = "";
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleAddIngredient = (ingredient, grams) => {
        if (grams && grams !== 0) {
            const ingredientFromDatabase = ingredients.find(i => i._id === ingredient._id);
            if (ingredientFromDatabase) {
                setSelectedIngredients(prevIngredients => [
                    ...prevIngredients,
                    {
                        id: ingredient._id,
                        name: ingredient.name,
                        grams,
                        caloriesPerGram: ingredientFromDatabase.calories / ingredientFromDatabase.grams
                    }
                ]);
                setAddedIngredients(prevAddedIngredients => [...prevAddedIngredients, ingredient._id]);
            } else {
                console.error('Ingredient not found in the database');
            }
        } else {
            setShowGramsErrorModal(true);
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            console.error('File is not an image.');
            setShowImageErrorModal(true);
            return;
        }
        setImage(file);
    }

    const handleRemoveIngredient = (ingredientId) => {
        setSelectedIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
        setAddedIngredients(prevAddedIngredients => prevAddedIngredients.filter(id => id !== ingredientId));
        document.getElementById(`grams-${ingredientId}`).value = '';
    }

    const fetchIngredients = async () => {
        try {
            const response = await fetch(`${ip}/ingredients`);
            if (!response.ok) {
                toast.error('HTTP error ' + response.status);
            }
            const data = await response.json();
            setIngredients(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchIngredients();
    }, []);

    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <ToastContainer/>

            <Modal show={showImageErrorModal} onHide={() => setShowImageErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>File is not an image.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setShowImageErrorModal(false);
                        document.getElementById('imageUpload').value = "";
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Name, price and image cannot be empty</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showGramsErrorModal} onHide={() => setShowGramsErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please enter a value for grams that is not 0</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowGramsErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className="my-3">Insert Meal</h1>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="Name"/>
                </div>
                <div className="mb-3">
                    <input type="number" className="form-control" value={price}
                           onChange={(e) => setPrice(e.target.value)} placeholder="Price"/>
                </div>
                <div className="mb-3">
                    <input type="file" id="imageUpload" className="form-control" onChange={handleImageUpload}
                           accept="image/*"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPreviewModal(true)}>Preview
                </button>

                <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>{name}</h1>
                        <p>{price}€</p>
                        {image && <img src={URL.createObjectURL(image)} alt={name} className="img-fluid" />}
                        <p>Total Calories: {Math.round(selectedIngredients.reduce((total, ingredient) => total + ingredient.grams * ingredient.caloriesPerGram, 0))}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShowPreviewModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </Form.Group>
            <div className="row">
                <div className="col-md-6">
                    <h2 className="mb-3">Selected Ingredients</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grams</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedIngredients.map(ingredient => (
                            <tr key={ingredient.id}>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.grams}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-md-6">
                    <h2 className="mb-3">Available Ingredients</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Vegetarian</th>
                            <th>Grams</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredIngredients.map(ingredient => {
                            const isAdded = addedIngredients.includes(ingredient._id);
                            return (
                                <tr key={ingredient._id} className={isAdded ? 'table-warning' : ''}>
                                    <td>{ingredient.name}</td>
                                    <td>{ingredient.vegetarian ? 'True' : 'False'}</td>
                                    <td>
                                        <Form.Control type="number" min="0" id={`grams-${ingredient._id}`}/>
                                    </td>
                                    <td>
                                        {isAdded ? (
                                            <Button variant="danger" onClick={() => handleRemoveIngredient(ingredient._id)}>
                                                Remove
                                            </Button>
                                        ) : (
                                            <Button variant="primary"
                                                    onClick={() => handleAddIngredient(ingredient, document.getElementById(`grams-${ingredient._id}`).value)}>
                                                Add
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default InsertMeal;
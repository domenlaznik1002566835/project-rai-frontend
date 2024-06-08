import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { ip } from './ip';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from "react-bootstrap/ToastContext";
import { ToastContainer } from 'react-toastify';

const InsertNewsArticle = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showImageErrorModal, setShowImageErrorModal] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            console.error('File is not an image.');
            setShowImageErrorModal(true);
            return;
        }
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            setShowErrorModal(true);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', description);
        formData.append('image', image);

        try {
            const response = await fetch(`${ip}/info`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                toast.error('Error inserting news article')
            }
            else{
                toast.success('News article inserted successfully');
            }
            setTitle("");
            setDescription("");
            setImage(null);
            document.getElementById('imageUpload').value = null;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handlePreview = () => {
        if (image) {
            setPreviewImage(URL.createObjectURL(image));
            setShowPreviewModal(true);
        } else {
            setPreviewImage(null);
            setShowPreviewModal(true);
        }
    }


    return (
        <div className="container">
            <ToastContainer />

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
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Title and description cannot be empty</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {previewImage && <img src={previewImage} alt="preview" className="preview-image" />}
                    <p>{new Date().toLocaleString()}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPreviewModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className="my-3">Insert News Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </div>
                <div className="mb-3">
                    <input type="file" id="imageUpload" className="form-control" onChange={handleImageUpload}
                           accept="image/*"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={handlePreview}>Preview</button>
            </form>
        </div>
    );
}

export default InsertNewsArticle;
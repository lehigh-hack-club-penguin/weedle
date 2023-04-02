import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ref, onValue, set } from "firebase/database";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import css
import './styles/Upload.css';

export default function Upload(props) {
    const [file, setFile] = useState(null);
    const [attemptedUpload, setAttemptedUpload] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUploadClick = () => {
        if (file !== null && file !== undefined) {
            console.log(file);
            // TODO: UPLOAD FILE TO FIREBASE
            // TODO: 
            props.handleCloseUpload();
        } else {
            setAttemptedUpload(true);
        }
    }

    const handleCloseUpload = () => {
        setFile(null);
        setAttemptedUpload(false);
        props.handleCloseUpload();
    }

    const fileInputClasses = `form-control ${attemptedUpload && !file ? 'is-invalid shake' : ''}`;

    return (
        <>
            <Modal show={props.showUpload} onHide={props.handleCloseUpload} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Let's Weedle!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFile">
                            <Form.Label>Choose a picture to upload:</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} className={fileInputClasses} />
                            {attemptedUpload && !file && (
                                <div className="invalid-feedback">Please select a file</div>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpload}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUploadClick}>
                        Weedle
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ref, onValue, set } from "firebase/database";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import css
import './styles/Upload.css';

export default function Upload(props) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUploadClick = () => {
        // You can add your own logic to handle the file upload here
        console.log(file);
        props.handleCloseUpload();
    }

  return (
    <>
        <Modal show={props.showUpload} onHide={props.handleCloseUpload} centered>
        <Modal.Header closeButton>
            <Modal.Title>Upload Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="formFile">
                <Form.Label>Choose a picture to upload:</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseUpload}>
            Cancel
            </Button>
            <Button variant="primary" onClick={handleUploadClick}>
            Upload
            </Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}



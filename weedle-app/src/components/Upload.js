import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ref, onValue, set, child, push, update } from "firebase/database";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
// import css
import './styles/Upload.css';

export default function Upload(props) {
    const [file, setFile] = useState(null);
    const [attemptedUpload, setAttemptedUpload] = useState(false);
    const [showPointsNotification, setShowPointsNotification] = useState(false);
    const userID = localStorage.getItem('userID');
    const [points, setPoints] = useState(0);
    
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    // LOAD DATA FOR OPTIONS
    useEffect(() => {
        const query = ref(props.db, 'plants');
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            console.log(data.length);
            const options = []; // iterate through data get data[i]['commonName']
            for (let i = 0; i < data.length; i++) {
                options.push(data[i]['commonName']);
            }
            setOptions(options);
        });
    }, []);

    const handleSelect = (selected) => {
        setSelectedOption(selected[0]);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUploadClick = () => {
        if (file !== null && file !== undefined) {
            console.log(file);
            // TODO: UPLOAD FILE TO FIREBASE
            // UPDATE POINTS FOR USER
            // get user's current points
            // we have table users with userID as key
            // each user has a points field
            console.log('user id: ' + userID);
            const query = ref(props.db, 'users/' + userID);
            onValue(query, (user) => {
                const data = user.val();
                // console.log(data);
                // console.log(data.points);
                setPoints(data.points);
            });
            // add 10 points to user's points
            const newPoints = points + 10;
            update(ref(props.db, '/users/' + userID), {
                points: newPoints
            });
            // show points notification
            setShowPointsNotification(true);
            setTimeout(() => {
                    setShowPointsNotification(false);
                }, 3000);
            // close modal
            handleCloseUpload();
            
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
                <Typeahead
                id="searchable-dropdown"
                labelKey={(option) => option}
                options={options}
                placeholder="Select an invasive species..."
                onChange={handleSelect}
                selected={selectedOption ? [selectedOption] : []}
                />
                <br />
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
            {showPointsNotification && (
                <div className="points-notification">
                    +10 points!
                </div>
            )}
        </>
    );
}

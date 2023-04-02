import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ref, onValue, set, child, push, update, get } from "firebase/database";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Profile(props) {
    const userID = localStorage.getItem('userID'); 

    const handleCloseProfile = () => {
        props.handleCloseProfile();
    }

    return (
        <>
            <Modal show={props.showProfile} onHide={handleCloseProfile} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Let's Weedle!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <br />
                <p>
                    <strong>Regional Rarity: </strong> {}
                </p>
                <p>
                    <strong>Points: </strong> {}
                </p>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}
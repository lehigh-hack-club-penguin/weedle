import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ref, onValue, set, child, push, update, get } from "firebase/database";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import logo from '../logo.svg'
import './styles/Profile.css'

export default function Profile(props) {
    const userID = localStorage.getItem('userID');
    const [user, setUser] = useState("");
    const [points, setPoints] = useState(0);

    // LOAD DATA FOR OPTIONS
    useEffect(() => {
        if (userID !== null) {
            const query = ref(props.db, 'users/' + userID);
            onValue(query, (user) => {
                const data = user.val();
                setUser(user.val())
                console.log(user.val());
                // console.log(data.points);
                setPoints(data.points);
            });
        }
    }, []);

    const handleCloseProfile = () => {
        props.handleCloseProfile();
    }

    return (
        <>
            <Modal show={props.showProfile} onHide={handleCloseProfile} centered >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container fluid>
                    <Row>
                        <Col xs={6} md={4}>
                            <div >
                                <img src={user.profile_url} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                            </div>
                        </Col>
                        <Col xs={12} md={8}>
                            <br></br>
                            Welcome back <strong>{user.username}</strong>!
                            <br></br>
                            <br></br>
                            You have <strong>{points}</strong> points.
                        </Col>
                    </Row>
                    </Container>
                    <br></br>
                    <br></br>
                    <br></br>
                </Modal.Body>
                {/* <Modal.Body>
                <br />
                <p>
                    <strong>Regional Rarity: </strong> {}
                </p>
                <p>
                    <strong>Points: </strong> {}
                </p>
                </Modal.Body> */}
                <Modal.Footer>
                <div style={{ position: 'relative',left:'50px' }}>
                        <img src={logo} alt="Weedle Logo" style={{ width: '10%', height: 'auto' }} />
                </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
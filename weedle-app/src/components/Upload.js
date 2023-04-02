import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ref, onValue, set, child, push, update, get } from "firebase/database";
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
    const [data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTypeaheadNotification, setShowTypeaheadNotification] = useState(false);
    const [options, setOptions] = useState([]);
    const [frequency, setFrequency] = useState('');
    const [bonusPoints, setBonusPoints] = useState(0);

    var userLat = 40.600526;
    var userLng = -75.362015;

    // LOAD DATA FOR OPTIONS
    useEffect(() => {
        const query = ref(props.db, 'plants');
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            // console.log(data.length);
            const options = []; // iterate through data get data[i]['commonName']
            for (let i = 0; i < data.length; i++) {
                options.push(data[i]['commonName']);
            }
            setOptions(options);
        });

        if (userID !== null) {
            const query2 = ref(props.db, 'users/' + userID);
            onValue(query2, (user) => {
                const data = user.val();
                // console.log(data);
                // console.log(data.points);
                setPoints(data.points);
            });
        }
        
        loadData();
    }, []);

    async function loadData() {
        var d = []
        var frequency = []
        const query = ref(props.db, 'plants/')
        await get(query).then((plants) => {
            var plant = plants.val()
            for (var p in plant) {
                var counter = 0
                var thisPlant = plant[p].observations.data
                for (var i = 0; i < thisPlant['decimalLatitude'].length; i++) {
                    if (calculateDistance(userLat, userLng, thisPlant['decimalLatitude'][i], thisPlant['decimalLongitude'][i]) < 500) {
                        counter++
                    }
                }
                frequency.push(counter)
                d.push({ name: plant[p].commonName, desc: plant[p].description, img: plant[p].image, frequency: 0 })
            }
            var sum=0
            for(var i=0; i<frequency.length; i++){
                sum += frequency[i]
            }
            for (var i=0; i<d.length; i++) {
                d[i]['frequency'] = (100*(frequency[i] / sum)).toFixed(2)
            }
        });
        d.sort((a, b) => b.frequency - a.frequency);
        setData(d);
        console.log(d);
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }


    const handleSelect = (selected) => {
        setSelectedOption(selected);
        console.log(selectedOption);

        // everytime user selects an option, look through data and find the plant with the same name and get data[i]['frequency']
        // set frequency to state
        for (let i = 0; i < data.length; i++) {
            if (data[i]['name'] === selected[0]) {
                setFrequency(data[i]['frequency']);
                // console.log(data[i]['frequency']);
                // convert frequency to a double
                const rarity = parseFloat(data[i]['frequency']);
                // calculate points
                const points = calculatePoints(rarity);
                // set bonus points
                setBonusPoints(points);
                break;
            }
        }
    };

    function calculatePoints(rarity) {
        // if rarity is 0, then 100 points
        // if rarity is <= 1, then 50 points
        // if rarity is 1 < rarity <= 3, then 25 points
        // if rarity is > 3 then 10 points
        if (rarity === 0) {
            return 100;
        }
        if (rarity <= 1) {
            return 50;
        }
        if (rarity <= 3) {
            return 25;
        }
        return 10;
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    function handleUploadClick() {
        if (file !== null && file !== undefined && selectedOption !== null && selectedOption !== undefined && userID !== null && userID !== undefined) {
            console.log(file);
            // TODO: UPLOAD FILE TO FIREBASE
            // UPDATE POINTS FOR USER
            // get user's current points
            // we have table users with userID as key
            // each user has a points field

            // add 10 points to user's points
            const newPoints = points + bonusPoints;
            // set points
            setPoints(newPoints);
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
            if (selectedOption === null || selectedOption === undefined) {
                setShowTypeaheadNotification(true);
            }
        }
    }
    
    const handleCloseUpload = () => {
        setFile(null);
        setAttemptedUpload(false);
        setShowTypeaheadNotification(false);
        setSelectedOption(null);
        props.handleCloseUpload();
    }

    const fileInputClasses = `form-control ${attemptedUpload && !file ? 'is-invalid shake' : ''}`;

   
    return (
        <>
            <Modal show={props.showUpload} onHide={handleCloseUpload} centered >
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
                selected={selectedOption ? selectedOption : ""}
                className={showTypeaheadNotification && (selectedOption === null || selectedOption === undefined) ? 'border border-danger' : ''}
                />
                <br />
                <p>
                    <strong>Regional Rarity: </strong> {selectedOption === null || selectedOption.length === 0 ? 'N/A' : frequency + '%'}
                </p>
                <p>
                    <strong>Points: </strong> {selectedOption === null || selectedOption.length === 0 ? 'N/A' : bonusPoints}
                </p>
                
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
                    +{bonusPoints} points!
                </div>
            )}
        </>
    );
}


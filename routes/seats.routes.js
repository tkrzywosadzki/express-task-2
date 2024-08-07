const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

//get all seats
router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

//get a seats by id
router.route('/seats/:id').get((req, res) => {
    const id = parseInt(req.params.id);
    const seat = db.seats.find(s => s.id === id);

    if (seat) {
        res.json(seat);
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

//post new seat
router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;

    if (!day || !seat || !client || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isSeatTaken = db.seats.some(existingSeat => existingSeat.day === day && existingSeat.seat === seat);
    if (isSeatTaken) {
        return res.status(409).json({ message: 'The slot is already taken...' });
    }

    const newId = uuidv4();

    const newSeat = { id: newId, day, seat, client, email };
    db.seats.push(newSeat);
    req.io.emit('seatsUpdated', db.seats);

    res.json({ message: 'OK'});
});

//delete a seat
router.route('/seats/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    const index = db.seats.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Seat not found' });
    }

    db.seats.splice(index, 1);

    res.json({ message: "OK" });
});

//modify fields
router.route('/seats/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { day, seat, client, email } = req.body;

    const index = db.seats.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Seat not found' });
    }

    if (!day || !seat || !client || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.seats[index].day = day;
    db.seats[index].seat = seat;
    db.seats[index].client = client;
    db.seats[index].email = email;

    res.json({ message: 'OK' });
});

module.exports = router;
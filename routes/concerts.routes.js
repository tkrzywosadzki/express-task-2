const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

//get all concerts
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

//get a concert by id
router.route('/concerts/:id').get((req, res) => {
    const id = parseInt(req.params.id);
    const concert = db.concerts.find(c => c.id === id);

    if (concert) {
        res.json(concert);
    } else {
        res.status(404).json({ message: 'Concert not found' });
    }
});

//post new concert
router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    if (!performer || !genre || !price || !day || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newId = uuidv4();

    const newConcert = { id: newId, performer, genre, price, day, image };
    db.concerts.push(newConcert);

    res.json({ message: 'OK'});
});

//delete a concert
router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    const index = db.concerts.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Concert not found' });
    }

    db.concerts.splice(index, 1);

    res.json({ message: "OK" });
});

//modify fields
router.route('/concerts/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { performer, genre, price, day, image } = req.body;

    const index = db.concerts.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Concert not found' });
    }

    if (!performer || !genre || !price || !day || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    db.concerts[index].performer = performer;
    db.concerts[index].genre = genre;
    db.concerts[index].price = price;
    db.concerts[index].day = day;
    db.concerts[index].image = image;

    res.json({ message: 'OK' });
});

module.exports = router;
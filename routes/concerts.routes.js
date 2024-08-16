const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');


//get all concerts
router.get('/concerts', ConcertController.getAll);

//get a concert by id
router.get('/concerts/:id', ConcertController.getById);

//post new concert
router.post('/concerts', ConcertController.postNew);

//delete a concert
router.delete('/concerts/:id', ConcertController.deleteById);

//modify fields
router.put('concerts/:id', ConcertController.putById);

module.exports = router;
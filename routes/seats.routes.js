const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller')

//get all seats
router.get('/seats', SeatController.getAll);

//get a seats by id
router.get('/seats/:id', SeatController.getById);

//post new seat
router.post('/seats', SeatController.postNew);

//delete a seat
router.delete('/seats/:id', SeatController.deleteById);

//modify fields
router.put('/seats/:id', SeatController.putById)

module.exports = router;
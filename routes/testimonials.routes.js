const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller')


//get all testimonials
router.get('/testimonials', TestimonialController.getAll);

//get random testimonial
router.get('/testimonials/random', TestimonialController.getRandom);

//get a testimonial by id
router.get('/testimonials/:id', TestimonialController.getById);


//post new testimonial
router.post('/testimonials', TestimonialController.postNew);

//modify author and text
router.put('/testimonials/:id', TestimonialController.putById);

//delete a testimonial
router.delete('/testimonials/:id', TestimonialController.deleteById);

module.exports = router;
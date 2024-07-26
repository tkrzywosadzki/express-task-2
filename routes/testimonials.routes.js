const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


//get all testimonials
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

//get random testimonial
router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[randomIndex];
    res.json(randomTestimonial);
});

//get a testimonial by id
router.route('/testimonials/:id').get((req, res) => {
    const id = parseInt(req.params.id);
    const testimonial = db.testimonials.find(t => t.id === id);

    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});


//post new testimonial
router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ message: 'Author and text are required' });
    }

    const newId = uuidv4();

    const newTestimonial = { id: newId, author, text };
    db.testimonials.push(newTestimonial);

    res.json({ message: 'OK' });
});

//modify author and text
router.route('/testimonials/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;

    const index = db.testimonials.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (!author || !text) {
        return res.status(400).json({ message: 'Author and text are required' });
    }

    db.testimonials[index].author = author;
    db.testimonials[index].text = text;

    res.json({ message: 'OK' });
});

//delete a testimonial
router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    const index = db.testimonials.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    db.testimonials.splice(index, 1);

    res.json({ message: "OK" });
});

module.exports = router;
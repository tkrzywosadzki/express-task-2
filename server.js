const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

/* -----endpoints----- */

//get all testimonials
app.get('/testimonials', (req, res) => {
    res.json(db);
});

//get random testimonial
app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const randomTestimonial = db[randomIndex];
    res.json(randomTestimonial);
});

//get a testimonial by id
app.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const testimonial = db.find(t => t.id === id);

    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});


//post new testimonial
app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ message: 'Author and text are required' });
    }

    const newId = uuidv4();

    const newTestimonial = { id: newId, author, text };
    db.push({ message: 'OK' });

    res.status(201).json(newTestimonial);
});

//modify author and text
app.put('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { author, text } = req.body;

    const index = db.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (!author || !text) {
        return res.status(400).json({ message: 'Author and text are required' });
    }

    db[index].author = author;
    db[index].text = text;

    res.json({ message: 'OK' });
});

//delete a testimonial
app.delete('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = db.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    db.splice(index, 1);

    res.json({ message: "OK" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Not found..." });
  });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
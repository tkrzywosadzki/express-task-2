const express = require('express');
const cors = require('cors');
const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const db = require('./db');
const path = require('path');

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);



  // Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

app.use((req, res) => {
    res.status(404).json({ message: "Not found..." });
  });

app.listen(process.env.PORT || 8000, () => {
console.log('Server is running on port: 8000');
});
const Concert = require('../models/concerts.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.postNew = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const performerClean = sanitize(performer);
        const genreClean = sanitize(genre);
        const priceClean = sanitize(price);
        const dayClean = sanitize(day);
        const imageClean = sanitize(image);

        const newConcert = new Concert({ 
            performer: performerClean,
            genre: genreClean,
            price: priceClean,
            day: dayClean,
            image: imageClean
         });
        await newConcert.save();
        res.json({ message: 'OK' });

    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(con) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK', con });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.putById = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const con = await Concert.findById(req.params.id);
        if(con) {
        con.performer = performer;
        con.genre = genre;
        con.price = price;
        con.day = day;
        con.image = image;
        await con.save();
        res.json({ message: 'OK', con });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
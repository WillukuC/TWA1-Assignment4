const express = require("express");
const router = express.Router();
const { createUser, verifyUser, getMoviesByGenre } = require('../controllers/movies.controller')
const { ObjectId } = require("mongodb");

router.post('/register', function(req, res) {
    console.log(req.body)
    const userData = req.body;
    if (!userData.email || !userData.password || !userData.favGenre) {
        res.status(400).send('Missing information from user.');
    }
    try {
        console.log("Success! Registering...")
        createUser(userData);
        res.status(201).send;
    } catch (err) {

    }
})

router.post('/login', function(req, res) {
    try {
        verifyUser()
    } catch (err) {

    }
})

router.get('/movies', function(req, res) {
    try {
        getMoviesByGenre()
    } catch (err) {

    }
})

module.exports = router;
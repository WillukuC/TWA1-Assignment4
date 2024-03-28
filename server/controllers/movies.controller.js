const express = require('express');
const router = express.Router();
const { connect, mongoose, url } = require('../database/database');
const User = require('../models/user.model');
const client = mongoose.connection;

async function createUser(userData) {
    console.log("Howdy! Step one of user creation, inbound!")
    const result = client.insertOne(userData);
    return result;
}

async function verifyUser(userData) {
}

async function getMoviesByGenre(genre) {

}

module.exports = {
    createUser,
    verifyUser,
    getMoviesByGenre
}
const path = require("path");
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');

const databaseName = 'movie_app'
const uri = process.env.DATABASE
async function connect() {

    console.log(process.env.DATABASE);

    try {
        await mongoose.connect(uri, { })
    } catch (err) {
        console.error("DB Connection error: " + err);
    }
    
    console.log('MongoDB connected with Mongoose at', uri)
}

module.exports = {
    connect: connect
}
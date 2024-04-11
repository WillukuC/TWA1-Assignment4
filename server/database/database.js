const path = require("path");
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE
const client = new MongoClient(uri);

async function connect() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to MongoDB database');

    return 'done.';
}

// We export the connect method and the collection reference
module.exports = {
    connect,
    client,
}
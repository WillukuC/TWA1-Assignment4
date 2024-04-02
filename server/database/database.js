const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017"
const client = new MongoClient(url);

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
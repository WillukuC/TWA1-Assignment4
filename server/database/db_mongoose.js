const mongoose = require('mongoose');

const databaseName = 'movie_app'

async function connect() {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, { })
    } catch (err) {
        console.error("DB Connection error: " + err);
    }
    
    console.log('MongoDB connected with Mongoose')
}

module.exports = {
    connect: connect
}
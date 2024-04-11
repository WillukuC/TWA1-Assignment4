const path = require("path");
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { client } = require('../database/database')
const jwt = require('jsonwebtoken')
var ObjectId = require('mongodb').ObjectId

const movieCollection = client.db('test').collection('movies');
const userCollection = client.db('test').collection('users')

/**
 * Registers a new use by adding it to the database, if it has the proper credentials
 * @param {JSON} userDocument holds the new account information
 * @returns the new User
 */
async function registerNewUser(userDocument) {
    console.log("Registering Part 2");
    const newUser = new User(userDocument)
    console.log("New User made");
    await newUser.save()
    console.log("New User saved");

    return newUser
}

/**
 * Logs in an existing user
 * @param {JSON} userDocument holds the email and password used for login attempt
 * @returns true if login successful, false otherwise
 */
async function loginUser(userDocument) {
    let existingUser
    try {
        existingUser = await User.findOne({ email: userDocument.email })

        // Checks if the user exists
        if (!existingUser) {
            return false
        }
    } catch (err) {
        return next(err)
    }

    const isMatch = await bcrypt.compare(userDocument.password, existingUser.password);

    if (isMatch) {
        const payload = {
            userId: existingUser._id
        };
        const token = await jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 10000
            })
        return {
            status: 200,
            message: {
                token
            }
        }
    }

    return isMatch;
}

async function displayMovies(uid) {
    const user = await userCollection.findOne({ _id: new ObjectId(uid) })
    const favGenre = user.favGenre[0]
    const movieData = []
    const movies = []
    const moviesCursor = await movieCollection.find({ genres: favGenre })

    let counter = 0;
    while (moviesCursor.hasNext() && counter < 25) {
        movies.push(await moviesCursor.next());
        counter++;
    }

    movieData.push(favGenre)
    movieData.push(movies)
    console.log(movieData);
    return movieData;
}

module.exports = {
    registerNewUser,
    loginUser,
    displayMovies,
}
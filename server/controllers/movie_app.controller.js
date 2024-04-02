const path = require("path");
const dotenv = require('dotenv').config({path: path.join(__dirname, '../../.env')});
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { client } = require('../database/database')
const jwt = require('jsonwebtoken')

const movieCollection = client.db('movie_app').collection('movies');

/**
 * Registers a new use by adding it to the database, if it has the proper credentials
 * @param {JSON} userDocument holds the new account information
 * @returns the new User
 */
async function registerNewUser(userDocument) {
    const newUser = new User(userDocument)
    await newUser.save()
    return newUser
}

        // TODO: send JWT token with a secret if passwords match,
        // sending back the token in message body
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
    } catch(err) {
        return next(err)
    }

    const isMatch = await bcrypt.compare(userDocument.password, existingUser.password);

    if (isMatch) {
        const payload = {
            userId: existingUser._id
        };
        const token = await jwt.sign (
            payload,
            dotenv.parsed.SECRET,
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

async function displayMovies(favGenre) {
    const movies = [];
    const moviesCursor = await movieCollection.find({ genres: favGenre.favGenre })

    let counter = 0;
    while(moviesCursor.hasNext() && counter < 25) {
        movies.push(await moviesCursor.next());
        counter++;
    }

    console.log(movies);
    return movies;
}

module.exports = {
    registerNewUser,
    loginUser,
    displayMovies,
}
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { client } = require('../database/database')

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
    try {
        existingUser = await User.findOne({ email: userDocument.email })

        // Checks if the user exists
        if (!existingUser) {
            return false
        }
    } catch(err) {
        return next(err)
    }

    const validPass = await bcrypt.compare(userDocument.password, existingUser.password);

    console.log(validPass);
    
    return validPass;
}

async function displayMovies(favGenre) {
    const movies = await movieCollection.find({ genres: favGenre }) 

    console.log(movies)

    return movies;
}

module.exports = {
    registerNewUser,
    loginUser,
    displayMovies,
}
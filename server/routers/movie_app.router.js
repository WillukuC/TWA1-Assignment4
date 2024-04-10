const path = require("path");
const dotenv = require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const express = require('express')
const router = express.Router()
const appController = require('../controllers/movie_app.controller')
const jwt = require('jsonwebtoken')

//Post route to create new user on register
router.post('/register', async function (req, res) {
    console.log("Registering...");

    const newUserBody = req.body

    try {
        const newUser = await appController.registerNewUser(newUserBody)

        res.status(201)
        res.send({ id: newUser._id })
    }
    catch (err) {
        console.error('err: ', err.message)
        res.status(400)
        res.send({ message: 'Incorrect body', error: err.message })
    }
})

//Get route to get tickets based on priority (Oldest)
router.post('/login', async function (req, res) {
    console.log("Logging in...");

    const loginUserBody = req.body

    try {
        const loginUser = await appController.loginUser(loginUserBody)

        console.log(loginUser.message.token)

        if (!loginUser) {
            res.status(401)
            res.send({ message: 'Incorrect credentials' })
        } else {
            res.status(200)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({token: loginUser.message.token}))
            res.send()
        }
    }
    catch (err) {
        console.error('err: ', err.message)
        res.status(400)
        res.send({ message: 'Incorrect body', error: err.message })
    }
})

//Update route to update the assignee of a ticket
router.get('/movies', async function (req, res) {
    console.log("Displaying movies...");
    
    const jwt_token = req.header("token")

    if (!jwt_token) return res.status(401).send({ message: 'Auth Error' });

    try {
        const decoded = jwt.verify(jwt_token, process.env.SECRET)
        req.userId = decoded.userId
        try {
            const movies = await appController.displayMovies(req.userId)

            res.status(200)
            res.send({ message: 'Fetch movies successful', movies: movies })
        }
        catch (err) {
            console.error('err: ', err.message)
            res.status(400)
            res.send({ message: 'Incorrect body', error: err.message })
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Invalid Token' })
    }
})

module.exports = router
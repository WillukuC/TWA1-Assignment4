const express = require('express')
const router = express.Router()
const appController = require('../controllers/movie_app.controller')

//Post route to create new user on register
router.post('/register', async function (req, res) {

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
    
    const loginUserBody = req.body

    try {
        const loginUser = await appController.loginUser(loginUserBody)

        if(!loginUser) {
            res.status(401)
            res.send({message: 'Incorrect credentials'})
        } else {
            res.status(200)
            res.send({ message: 'Login successful', user: loginUser })
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
    
    const favMovie = req.body

    try {
        const movies = await appController.displayMovies(favMovie)

        res.status(200)
        res.send({ message: 'Fetch movies successful', movies: movies })
    }
    catch (err) {
        console.error('err: ', err.message)
        res.status(400)
        res.send({ message: 'Incorrect body', error: err.message })
    }
})

module.exports = router
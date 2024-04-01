const express = require('express')
const router = express.Router()
const userController = require('../controllers/movies.controller')

//Post route to create new user on register
router.post('/register', async function (req, res) {

    const newUserBody = req.body

    try {
        const newUser = await userController.registerNewUser(newUserBody)

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
router.get('/login', async function (req, res) {
    
    const loginUserBody = req.body

    try {

    }
    catch (err) {
        console.error('err: ', err.message)
        res.status(400)
        res.send({ message: 'Incorrect body', error: err.message })
    }
})

//Update route to update the assignee of a ticket
router.patch('/', async function (req, res) {

    const ticketId = req.params.id
    const assingeeBody = req.body

    try {
        //Checks if body only has the "assigned_to" field
        if (!assingeeBody || Object.keys(assingeeBody).length !== 1 || !assingeeBody.hasOwnProperty('assigned_to')) {
            res.status(400)
            res.send({ message: "Incorrect body. Provide an 'assigned_to' field." })
            return
        }

        await ticketController.updateAssignee(ticketId, assingeeBody)
        res.status(200)
        res.send({ message: "Ticket update successful" })
    } catch (err) {
        res.status(404)
        res.send({ message: "ID not found" })
    }
})

module.exports = router
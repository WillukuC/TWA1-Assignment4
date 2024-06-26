const path = require("path");
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')});
const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/db_mongoose')
const moviesRouter = require('./routers/movie_app.router')
const fs = require('fs')

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'dist')))

// Health check 
app.get('/health', function(req, res) {
    res.status(200);
    res.send("Healthy");
  })

//Routers
app.use('/api', moviesRouter)

//Error handler
function errorHandler(err, req, res, next) {
    // Log the error to a file
    const errorLog = `${new Date().toISOString()} - ${err.stack}\n`;
    fs.appendFile('error.log', errorLog, (error) => {
      if (error) {
        console.error('Error logging to file:', error);
      }
    });

    // Set response status
    res.status(500).json({ error: err.message || "Internal server error" });

    // Pass the error to the next error-handling middleware
    next(err);
}
app.use(errorHandler)


const port = process.env.PORT || 8080;
app.listen(port, async function() {
    await connect()
    console.log("Server listening on port " + port)
})
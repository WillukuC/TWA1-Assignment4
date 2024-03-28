const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/database');
const { movieRouter } = require('./routers/movies.router')


app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', movieRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect();
    console.log("Server listening on port " + port);
});
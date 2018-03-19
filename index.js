const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const messageRouter = require('./routes/messages');

const config = require('./config.json');

const app = express();

app.set('port', process.env.PORT || 3000);

mongoose.connect(config.mongodb.url);

const db = mongoose.connection;

db.on('error', () => {
    throw new Error(`unable to connect to database at ${config.mongodb.url}`);
});

app.use((req, res, next) => { /* Enable CORS */
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/message', messageRouter);

if(!module.parent) app.listen(app.get('port')); /* to prevent listen twice by npm test */

module.exports = app;
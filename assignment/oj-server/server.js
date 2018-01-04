const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://mumuceiber:body292@ds137957.mlab.com:37957/ojc-bittiger')

const restRouter = require('./router/rest');
const indexRouter = require('./router/index');

// app.get('/', (req, res) => res.send('Hello World'));
app.use('/', indexRouter);
app.use('/api/v1', restRouter);
app.listen(3000, () => console.log('Example app listening on port 3000!'));

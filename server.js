const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import routes
const entriesRoute = require('./routes/entries');
app.use('/entries', entriesRoute);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to mongodb');
});

// listen to server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
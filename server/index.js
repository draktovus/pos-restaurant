require('dotenv').config();

const http = require('http');
const routes = require('../routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const app = express();

app.use(express.json());
app.use('/api', routes);

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

mongoose.connect(mongoString);
const database = mongoose.connection

app.get('/', (req, res) => {
    res.send("Server was accessed")
})

app.listen(port, ()=>{
    console.log(`Listening at http://${hostname}:${port}`);
})

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
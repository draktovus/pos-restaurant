const http = require('http');
const express =  require('express');
const path = require('path')
const app = express();
const products = require('./controllers/products')
const users = require('./controllers/users')
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Creates a middleware for json.
app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        next()
    })


// Actions
app
    .get('/', (req, res) => {
        res.send("Server was accessed")
    })
app
    .use('/api/v1/products', products)
    .use('/api/v1/users', users)

// Catch all (called deep linking)
app
    .get('*', (req,res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    })

//error handling
app
    .use((err, req, res, next) => {
        console.log(err)
        const msg = {
            status: err.code || 500,
            error: err.message || 'Internal Server Error',
            isSuccess: false
        }
        res.status(msg.status).json(msg)
    })

app.listen(port, ()=>{
    console.log(`Listening at http://${hostname}:${port}`);
})
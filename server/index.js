const http = require('http');
const express =  require('express');
const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Server was accessed")
})

app.listen(port, ()=>{
    console.log(`Listening at http://${hostname}:${port}`);
})
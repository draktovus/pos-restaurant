const express = require('express');
const model = require('../models/users')
const router = express.Router();

router
    .get('/', (req,res) => {
        const list = model.getUsers();
        const data = {
            data: list, 
            total: list.length,
            isSuccess: true
        };
        res.send(data)
    })

    .get('/search/:q', (req, res) => {
        const term = req.params.q;
        console.log(term)
        const list = model.searchUsers(term);
        const data = {
            data: list,
            total: list.length,
            isSuccess: true
        }
        res.send(data)
    })

    .get('/:id', (req,res) => {
        const id = +req.params.id
        const product = model.getUserById(id);
        const data = { data:product, total: 1, isSuccess: true}
        res.send(data)
    })

    .post('/', (req,res) => {
        const product = req.body;

        console.log(req.query)
        console.log(req.headers)
        console.log(req.body)

        model.addUser(product);
        const data = { data:product, total: 1, isSuccess: true}
        res.send(data)
    })

    .patch('/:id', (req,res) => {
        const product = req.body;
        model.updateUser(product);
        res.send(product)
    })

    .delete('/:id', (req,res) => {
        const id = +req.params.id
        model.deleteUser(id);
        const data = { data:id, total: 1, isSuccess: true}
        res.send(data)
    })

module.exports = router;
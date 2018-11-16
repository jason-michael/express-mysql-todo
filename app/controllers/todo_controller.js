// Dependencies
const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();


// Routes

router.get('/', (req, res) => {
    Todo.getAll((err, data) => {
        res.render('index', {
            todos: data
        });
    });
});

router.get('/api/all', (req, res) => {
    Todo.getAll((err, data) => res.json(data));
});

router.post('/api/add', (req, res) => {

    // If todo name is empty send an error back.
    if (req.body.task.trim() === '') {
        res.statusMessage = 'Todo name is required.';
        res.status(400).end();
    } else {

        Todo.add(req.body, (err, data) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(data);
            }
        });
    }
});

router.delete('/api/delete/:id', (req, res) => {
    Todo.delete(req.params.id, (err, data) => res.json(data));
});

router.put('/api/update', (req, res) => {
    Todo.update(req.body, (err, data) => res.json(data));
});

module.exports = router;
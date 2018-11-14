// Dependencies
const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();


// Routes
//--------------------------------------
// Home view
router.get('/', (req, res) => {
    Todo.getAll((err, data) => {
        res.render('index', {
            todos: data
        });
    });
});

// Get all
router.get('/api/all', (req, res) => {
    Todo.getAll((err, data) => {
        res.json(data);
    });
});

// Add new
router.post('/api/add', (req, res) => {

    /*
        - If todo name is empty send an error back.
        - Else add the todo.
    */
    if (req.body.todo_name.trim() === '') {
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

    // TODO: validate id & handle error

    Todo.delete(req.params.id, (err, data) => {
        res.json(data)
    });
});

module.exports = router;
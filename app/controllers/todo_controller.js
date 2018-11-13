const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Todo.getAll(todos => {
        res.render('index', {
            todos
        });
    });
});

router.get('/api/todos', (req, res) => {
    Todo.getAll(todos => res.json(todos));
});


// Unwrap all post requests to 'api/todos'.
router.post('/api/todos/*', (req, res) => {
    const method = req.body._method;

    switch (method) {
        case 'PUT':
            const updatedTodo = {
                id: req.body.id,
                todo_name: req.body.todo_name,
                completed: req.body.completed
            };
            Todo.update(updatedTodo, result => console.log(result));
            break;

        case 'DELETE':
            Todo.delete(req.body.id, result => console.log(result));
            break;

        default:
            Todo.add(req.body.todo_name, result => console.log(result));
            break;
    }

    res.redirect('/');
    res.end();
});

module.exports = router;
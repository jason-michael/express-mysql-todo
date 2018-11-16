//============================
// DEPENDENCIES
//============================
const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();

//============================
// ROUTES
//============================
/**
 * VIEW: home
 */
router.get('/', (req, res) => {
    Todo.getAll((err, data) => {
        if (err) throw err;
        res.render('index', {
            todos: data
        });
    });
});

/**
 * API: all todos
 */
router.get('/api/all', (req, res) => {
    Todo.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

/**
 * API: completed todos
 */
router.get('/api/complete', (req, res) => {
    Todo.getAllComplete((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

/**
 * API: incompleted todos
 */
router.get('/api/incomplete', (req, res) => {
    Todo.getAllIncomplete((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

/**
 * API: add todo
 */
router.post('/api/add', (req, res) => {
    // If todo name is empty send an error back.
    if (req.body.task.trim() === '') {
        res.statusMessage = 'Todo name is required.';
        return res.status(400).end();
    }

    Todo.add(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
});

/**
 * API: update todo
 */
router.put('/api/update', (req, res) => {
    Todo.update(req.body, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

/**
 * API: delete todo
 */
router.delete('/api/delete/:id', (req, res) => {
    Todo.delete(req.params.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;
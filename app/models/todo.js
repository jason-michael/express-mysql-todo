const orm = require('../config/orm');

module.exports = {
    getAll: (cb) => {
        orm.selectAllFrom('todos', todos => cb(todos));
    },

    add: (name, cb) => {
        orm.insertOne('todos', {todo_name: name}, res => cb(res));
    },

    update: (todo, cb) => {
        orm.updateOne('todos', todo, res => cb(res));
    },

    delete: (id, cb) => {
        orm.deleteOne('todos', id, res => cb(res));
    }
}
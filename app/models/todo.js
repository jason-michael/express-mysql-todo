const orm = require('../config/orm');

module.exports = {
    add: (todo, callback) => orm.insertOne('todos', todo, callback),

    delete: (id, callback) => orm.deleteOne('todos', id, callback),

    getAll: (callback) => orm.selectAllFrom('todos', callback),

    update: (todo, callback) => orm.updateOne('todos', todo, callback),
}
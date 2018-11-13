const conn = require('./connection');

// Helper
function sendResults (err, res, cb) {
    if (err) throw err;
    if (cb && typeof cb === 'function') cb(res);
}

module.exports = {
    selectAllFrom: (tbl, cb) => {
        const query = 'SELECT * FROM ??';
        conn.query(query, [tbl], (err, res) => sendResults(err, res, cb));
    },

    insertOne: (tbl, obj, cb) => {
        const query = 'INSERT INTO ?? SET ?';
        conn.query(query, [tbl, obj], (err, res) => sendResults(err, res, cb));
    },

    updateOne: (tbl, obj, cb) => {
        const query = 'UPDATE ?? SET ? WHERE id = ?';
        conn.query(query, [tbl,obj,obj.id], (err,res) => sendResults(err, res, cb));
    },

    deleteOne: (tbl, id, cb) => {
        const query = 'DELETE FROM ?? WHERE id = ?';
        conn.query(query, [tbl, id], (err, res) => sendResults(err, res, cb));
    }
}
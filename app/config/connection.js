const mysql = require('mysql');

const config = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b661e35d1515b8',
    password: '5d083f0f',
    database: 'heroku_cb4cbc431b7d8d6',
}

let connection;
connection = mysql.createConnection(config);
connection.connect(err => {
    if(err) throw err;
    console.log(`--> Connected to 'todos_db' as ID ${connection.threadId}`);
});

module.exports = connection;
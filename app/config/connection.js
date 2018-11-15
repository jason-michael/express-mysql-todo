const mysql = require('mysql');

const config = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b661e35d1515b8',
    password: '5d083f0f',
    database: 'heroku_cb4cbc431b7d8d6',
}

let connection;
function attemptConnection() {
    console.log('--> Connecting to Express Todo ClearDB...');
    connection = mysql.createConnection(config);
    connection.connect(err => {
        if (err) {
            console.log('--> Disconnected from DB: ', err);
            setTimeout(attemptConnection, 2000);
        }
    });

    connection.on('error', attemptConnection);
    connection.on('connect', () => {
        console.log(`--> Connected to database '${connection.config.database}'.`);
    });
}

attemptConnection();

module.exports = connection;
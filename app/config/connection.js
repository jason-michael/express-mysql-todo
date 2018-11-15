const mysql = require('mysql');

const config = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b661e35d1515b8',
    password: '5d083f0f',
    database: 'heroku_cb4cbc431b7d8d6',
}

let connection;
(function handleDisconnect() {
    console.log('--> Connecting to database...');
    connection = mysql.createConnection(config);

    connection.connect(err => {
        if (err) {
            console.log('--> Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', err => {
        console.log('--> Database error: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    connection.on('connect', () => {
        console.log(`--> Connected to database '${connection.config.database}'.`)
    });
})()

module.exports = connection;
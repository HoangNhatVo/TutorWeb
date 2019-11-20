const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'apiadmin'        // Ví dụ tồn tại db apiadmin
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
}

module.exports = connection;


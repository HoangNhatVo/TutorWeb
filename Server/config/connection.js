const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: 'sql12.freemysqlhosting.net',
        user: 'sql12314047',
        password: 'hLPCyBgzmC',
        database: 'sql12314047'        
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
}

module.exports = connection;


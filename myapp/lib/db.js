const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'db',
    user: process.env.DATABASE_USER || 'exgen_user',
    password: process.env.DATABASE_PASSWORD || 'exgen_pass',
    database: process.env.DATABASE_NAME || 'exgen_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;

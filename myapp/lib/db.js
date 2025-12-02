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

const initDb = async () => {
    try {
        const sql = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL
      )
    `;
        await pool.query(sql);
        console.log('Table created or already exists');
    } catch (err) {
        console.log('Database not ready yet, retrying in 5 seconds...');
        setTimeout(initDb, 5000);
    }
};

initDb();

module.exports = pool;

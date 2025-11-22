const express = require('express');
const router = express.Router();
const pool = require('../lib/db');

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, message FROM hello_messages ORDER BY id');
    res.render('hello-db', {
      title: 'Hello from MySQL',
      messages: rows
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

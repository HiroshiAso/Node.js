const express = require('express');
const router = express.Router();
const pool = require('../lib/db');

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM todos');
        res.render('index', { todos: rows });
    } catch (err) {
        next(err);
    }
});

router.post('/add', async (req, res, next) => {
    const task = req.body.task;
    try {
        await pool.query('INSERT INTO todos (task) VALUES (?)', [task]);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

router.post('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM todos WHERE id = ?', [id]);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

module.exports = router;

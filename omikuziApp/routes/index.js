var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const fortunes = ['大吉', '中吉', '小吉', '吉', '凶'];
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('index', { title: 'おみくじアプリ', fortune: fortune });
});

module.exports = router;

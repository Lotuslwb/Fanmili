var express = require('express');
var router = express.Router();

console.log(1);

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    res.render('login', {'title': '登录和注册'});
});

module.exports = router;

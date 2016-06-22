var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Login = require('../models/lib_Login');


/* GET home page. */
router.get('/', function (req, res, next) {
    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            var cookies = req.cookies;
            var data = JSON.parse(cookies.docs);
            data.title = '首页';
            res.render('index', data);
        } else {
            Login.gotoLogin(req, res);
        }
    })

});

module.exports = router;

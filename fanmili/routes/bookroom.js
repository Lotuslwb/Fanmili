var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Login = require('../models/lib_Login');


/* GET home page. */
router.get('/', function (req, res, next) {
    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            res.render('bookroom', {title: '会议预订'});
        } else {
            Login.gotoLogin(req, res);
        }
    });
});

module.exports = router;

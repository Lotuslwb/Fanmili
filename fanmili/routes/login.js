var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Login = require('../models/lib_Login');


//数据库处理
var user = require('../models/DB');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var cookies = req.cookies;
    var host = req.headers.host;

    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            var url = req.params.redirect || '/';
            res.redirect(url);
        } else {
            res.render('login', {'title': '登录和注册'});
        }
    });

});

/*  POST login */
router.post('/login', function (req, res, next) {
    var name = req.body.name;
    var tel = req.body.tel;
    var json = {'name': name};
    var host = req.headers.host;

    user.User.findOne(json).then(function (docs) {
        if (docs && docs.tel == tel) {
            res.json({"respCode": 200, "respStatus": "请求成功", "result": docs});
        } else {
            res.json({"respCode": 500, "respStatus": "登录失败,用户名或手机错误"});
        }
    });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Login = require('../models/lib_Login');


//数据库处理
var user = require('../models/DB');

router.get('/list', function (req, res, next) {
    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            user.find({}).then(function (docs) {
                var data = {
                    title: '电话列表', telList: docs
                }
                res.json(data);
            })
        }
    });
});

router.get('/', function (req, res, next) {
    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            user.find({}).then(function (docs) {
                var types = [];
                var telList = {};
                _.each(docs, function (n, e) {

                    var data = (JSON.parse(JSON.stringify(n)));

                    if (_.indexOf(types, data.type) < 0) {
                        types.push(data.type);
                        telList[data.type] = new Array();
                    }
                    telList[data.type].push(data);

                })
                var data = {
                    title: '电话列表', telList: telList, types: types
                }
                res.render('list', data);
            })
        } else {
            Login.gotoLogin(req, res);
        }
    })

});


module.exports = router;


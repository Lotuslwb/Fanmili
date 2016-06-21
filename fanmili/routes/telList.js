var express = require('express');
var router = express.Router();
var _ = require('lodash');


//数据库处理
var Person = require('../models/DB');


/* GET home page. */
var user = new Person();

router.get('/list', function (req, res, next) {
    user.find({}).then(function (docs) {
        var data = {
            title: '电话列表', telList: docs
        }
        res.json(data);
    })
});

router.get('/', function (req, res, next) {
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
});


module.exports = router;

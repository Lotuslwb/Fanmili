var express = require('express');
var router = express.Router();
//数据库处理
var Person = require('../models/DB');
//excel JSON
var excelJSON = require('../models/excelHandle');
//excel Array
var excelArray = [];

for (var key in excelJSON) {
    var item = excelJSON[key];
    if (item) {
        var obj = {
            name: item.name || '',
            tel: item.tel || '',
            gender: '未知',
            age: '真的是未知!!'
        };
        excelArray.push(obj);
    }
}

/* GET home page. */
var user = new Person();

user.User.collection.insert(excelArray, function (err, docs) {

    if (err) {
        console.log(err);
    } else {
        console.log('批量插入成功!');
        user.find({}, function (err, docs) {
            var data = {
                title: 'telList', telList: docs
            }
            router.get('/', function (req, res, next) {
                res.render('list', data);
            });


            router.get('/test', function (req, res, next) {
                res.json(data);
            });
        })
    }

});


module.exports = router;

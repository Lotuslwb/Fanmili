var express = require('express');
var router = express.Router();
var Person = require('../models/DB');

/* GET home page. */
var user = new Person();
var data = {
    name: '李文彬',
    tel: '99999',
    gender: '男',
    age: '12'
}

user.add(data, function (err) {
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
});


module.exports = router;

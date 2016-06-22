/**
 * Created by lotuslwb on 16/6/15.
 */
var _ = require('lodash');

//数据库处理
var user = require('../models/DB');
//excel JSON
var excelJSON = require('../models/excelHandle');
//excel Array
var excelArray = [];
//excel 数据整理
for (var key in excelJSON) {
    var item = excelJSON[key];
    if (item) {
        var obj = {
            name: item.name || '',
            tel: item.tel || '',
            gender: '未知',
            age: '真的是未知!!',
            type: item.type
        };
        excelArray.push(obj);
    }
}

user.find({}).then(function (docs) {
    excelArray = _.filter(excelArray, function (n) {
        var data = {tel: n.tel.toString()}
        var m = _.filter(docs, _.matches(data));
        return !m.length;
    });
    if (excelArray.length) {
        console.log('有' + excelArray.length + '条记录可插入');
        var promise = user.User.collection.insert(excelArray);
        return promise;
    } else {
        console.log('去重之后,没有可以插入的数据!');
        return false;
    }

}).then(function (docs) {
    if (docs) {
        console.log('批量插入成功!');
    }
}, function (e) {
    console.log(e);
});


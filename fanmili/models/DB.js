/**
 * Created by lotuslwb on 16/6/6.
 */

var mongoose = require('mongoose');


var Person = function () {

    var me = this;
    mongoose.connect('mongodb://localhost/Fanmili');

    var Schema = mongoose.Schema;
    //骨架模版
    me.userSchema = new Schema({
        name: String,
        tel: String,
        gender: String,
        age: String
    })
    //模型
    me.User = mongoose.model('User', me.userSchema);
};

Person.prototype.add = function (json, callback) {

    var me = this;
    //存储数据
    var _user = new me.User(json);

    //保存数据库
    _user.save(function (err, docs) {
        if (err) {
            console.log('保存失败', err)
            return;
        }
        console.log('保存成功');
        callback(err, docs);
    });

}

Person.prototype.find = function (json, callback) {
    var me = this;
    me.User.find(json, function (err, docs) {
        if (err) {
            console.log('查找失败', err);
            return;
        }
        console.log('查找成功');
        callback(err, docs);
    })
}

Person.prototype.update = function () {
    var me = this;
}

Person.prototype.remove = function (json, callback) {
    var me = this;
    me.User.remove(json, function (err, docs) {
        if (err) {
            console.log('删除失败', err);
            return;
        }
        console.log('删除成功');
        callback(err, docs);
    });
}


module.exports = Person;
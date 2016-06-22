/**
 * Created by lotuslwb on 16/6/22.
 */

//数据库处理
var user = require('../models/DB');

var checkLogin = function (req) {
    var cookies = req.cookies;
    var isLogin = false;
    var promise = new Promise(function (resolve, reject) {
        resolve();
    });

    if (cookies.docs) {
        var json = JSON.parse(cookies.docs);
        promise = user.User.findOne({'name': json.name}).then(function (docs) {
            if (docs && docs.tel == json.tel) {
                //已经登录
                isLogin = true;
            }
            return isLogin;
        });
    }

    return promise;

}

var gotoLogin = function (req, res) {
    var redirect = req.originalUrl;
    res.redirect('./login?redirect=' + redirect);
}

module.exports = {
    checkLogin: checkLogin,
    gotoLogin: gotoLogin
}
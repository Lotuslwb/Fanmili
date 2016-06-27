var express = require('express');
var router = express.Router();

var Login = require('../models/lib_Login');

var Form = require('../models/DBModels/formDB');


/* GET home page. */
router.get('/', function (req, res, next) {
    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            var cookies = req.cookies;
            var data = JSON.parse(cookies.docs);
            data.title = '表单一个';
            res.render('form', data);
        } else {
            Login.gotoLogin(req, res);
        }
    })
});

/* GET home page. */
router.get('/form_s', function (req, res, next) {
    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            var cookies = req.cookies;
            var data = JSON.parse(cookies.docs);
            data.title = '表单一个';
            res.render('form_s', data);
        } else {
            Login.gotoLogin(req, res);
        }
    })
});

router.get('/data', function (req, res, next) {
    res.redirect('/')
})

/*  POST Data */
router.post('/data', function (req, res, next) {
    var cookies = JSON.parse(req.cookies.docs);
    var data = {
        'name': cookies.name,
        'tel': cookies.tel,
        'mac1': req.body.mac1,
        'mac2': req.body.mac2,
        'mac3': req.body.mac3,
    }


    Form.User.findOne({
        'name': cookies.name,
    }).then(function (doc) {
        if (doc) {
            res.render('form_s', {"title": "提交结果", "respCode": 500, "respStatus": "提交失败", "result": '请不要重复提交'});
        } else {
            return Form.add(data);
        }
    }).then(function (doc) {
        if (doc) {
            res.render('form_s', {
                "title": "提交结果",
                "respCode": 200,
                "respStatus": "提交成功",
                "result": '你可以安静的离开了~~哈哈哈~~'
            });
        }
    })


});


router.get('/form_excel', function (req, res, next) {
    Login.checkLogin(req).then(function (isLogin) {
        if (isLogin) {
            require('../models/DBModels/exportExcel');
            res.download('./data.csv');
        } else {
            Login.gotoLogin(req, res);
        }
    })
});


module.exports = router;

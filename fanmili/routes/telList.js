var express = require('express');
var router = express.Router();

/* GET home page. */
var data = {
    title: 'telList', telList: [
        {'name': '李文彬', 'tel': '18616172907'},
        {'name': '何婷婷', 'tel': '110'}
    ]
}

router.get('/', function (req, res, next) {
    res.render('list', data);
});

module.exports = router;

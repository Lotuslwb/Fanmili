var express = require('express');
var router = express.Router();
var _ = require('lodash');


/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('admin/index');

});

module.exports = router;

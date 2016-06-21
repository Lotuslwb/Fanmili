/**
 * Created by lotuslwb on 16/6/15.
 */
var _ = require('lodash');

//数据库处理
var Person = require('../models/DB');


/* GET home page. */
var user = new Person();

user.remove({});



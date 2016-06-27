var jsonexport = require('jsonexport');

var fs = require('fs');
var path = require('path');
var Form = require('../DBModels/formDB');

var _ = require('lodash');


Form.find({}, function (error, docs) {

    var data = [];
    _.each(docs, function (item, index) {
        data.push({
            name: item.name,
            tel: item.tel,
            mac1: item.mac1,
            mac2: item.mac1,
            mac3: item.mac1
        });
    });

    jsonexport(data, function (err, csv) {
        if (err) return console.log(err);
        fs.writeFile('data.csv', csv, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Export Account Success!");
            }
        })
    });
});



var loadWay;

var load = function (way, url, callback, callback_err) {

    if (way == 'https') {
        loadWay = require('https');
    }

    loadWay.get(url, function (ress) {
        ress.on('data', function (chunk) {
            var chunk = JSON.parse(chunk);
            callback && callback(chunk);
        })
    }).on('error', function (error) {
        callback_err && callback_err(error);
    });
}


module.exports = load;
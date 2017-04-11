var debug = require("../../package.json").debug;

var log = function (msg) {
    debug && console.log(msg);
}

module.exports = log;
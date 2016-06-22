;
(function (win) {
    // 对cookie操作
    var Cookies = {
        /**
         * 写cookie
         * @param name 名字
         * @param value 值
         * @param expires 过期时间，单位“天”
         * @param path 路径
         */
        setCookie: function (name, value, expires, path) {
            if ((typeof name == 'undefined') || (name == '') || (typeof value == 'undefined') || value == '') {
                return;
            }

            var cookieStr = name + '=' + encodeURIComponent(value) + ';';
            if (typeof expires != 'undefined') {
                var exp = new Date();
                exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000);
                cookieStr += 'expires=' + exp.toGMTString() + ';';
            }
            // JS在存储的时候，可能是存储的路径没有指定，所以存储的时候，在不同的目录存储，导致了不同的结果，最后在存储的时候，指定了下path，问题得意解决
            if (typeof path != 'undefined') {
                cookieStr += 'path=' + path;
            }

            document.cookie = cookieStr;
        },
        getCookie: function (name) {
            var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return decodeURIComponent(arr[2]);
            } else {
                return null;
            }
        },
        /**
         * 删除cookie
         * @param name 名字
         * @param path 路径
         */
        delCookie: function (name, path) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var val = Cookies.getCookie(name);
            if (val != null) document.cookie = name + '=' + val + ';expires=' + exp.toGMTString() + ';path=' + path;
        }
    };

    win.Cookies = Cookies;

})(window);


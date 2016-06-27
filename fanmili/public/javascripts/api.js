/**
 * Created by lotuslwb on 16/6/22.
 */
window.oo = {
    GetRequest: GetRequest,
    fastClick: fastClick
}


function fastClick() {
    var touchObj = {};
    touchObj.isSupportTouch = "ontouchend" in document ? true : false;
    touchObj.isEvent = touchObj.isSupportTouch ? 'touchstart' : 'click';
    return touchObj.isEvent;
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var srtArry = strs[i].split("=");
            var y = srtArry.shift();
            theRequest[y] = unescape(srtArry.join('='));
        }
    }
    return theRequest;
}
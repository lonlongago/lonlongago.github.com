function browserRedirect(url) {
    var Url = url;
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
//      var path = location.pathname
        console.log(location.pathname);
//      var path = location.pathname. 
        if (location.pathname == '/') {
        	window.location.href = "/mView/index.html";
        } else if (location.pathname.toString().indexOf('catalog') != -1) {
        	var _data = location.pathname.toString();
          	_data = _data.substr(_data.lastIndexOf('/') + 1, _data.length)
            window.location.href = "/mView/book.html?bookId="+_data;
        } else if (location.pathname.toString().indexOf('class') != -1) {
        	 window.location.href = "/mView/classFirst.html"
        } else if (location.pathname.toString().indexOf('ranking') != -1) {
        	window.location.href = "/mView/rank.html"
        } else if (location.pathname.toString().indexOf('readBook') != -1) {
        	var _data = location.pathname.toString();
          	_data = _data.substr(_data.lastIndexOf('/')  + 1, _data.length)
            _data = _data.split('@');
          	window.location.href = "/mView/read.html?bookId="+_data[1]+'&contentId='+_data[0];
        } else if (location.pathname.toString().indexOf('userInfo') != -1) {
        	window.location.href = "/mView/personal.html"
        } else {
        	window.location.href = "/mView/index.html";
        }		
         
    }
    return false;
}
browserRedirect();
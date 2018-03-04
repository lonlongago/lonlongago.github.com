module.exports = function() {

var header = '<div class="qcacg-header-parent" id="qcacg-header-parent" style="position:relative">'
    +'<div class="qcacg-header">'
    +  '<a href="/index.html"><div class="logo">轻创文学网</div></a>'   
    +  '<ul class="nav-left">'   
    +    '<li :class="active"><a href="/index.html">首页</a></li>'
    +    '<li><a href="/view/class.html">分类</a></li>'
    +    '<li><a href="/view/ranking.html">排行榜</a></li>'
    +    '<li><a href="../../painter/index.html">画师</a></li>'
    +    '<li class="none"><a href="javascript:;">周边</a></li>'
    +    '<li><a href="/view/welfare.html">福利</a></li>'
    +    '<li class="client">下载客户端 <div class="clientBox"><img class="qrCode"  src="../img/erweima_and_01.png" alt="" /><div class="android">Android</div></div></li>'
    +  '</ul>'
    +  '<mylogin :login-img.sync="loginImg" :user-name.sync="userName" :active.sync="active"></mylogin>'
    +  '<h3 style="text-indent: -9999px;">登陆/注册</h3>'
    +  '<h3 style="text-indent: -9999px;">投稿</h3>'
    +'</div>'
  +'</div>';
  
  return header;
}  

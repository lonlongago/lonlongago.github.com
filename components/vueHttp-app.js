import PathList from '~/components/conf'
import Vue from 'vue';
import VueValidator from 'vue-resource';
Vue.use(VueValidator);
import Vuex from 'vuex'
Vue.use(Vuex);

var SZXJ = {};
SZXJ.isPhoneNumber = function(s) { // 测试是否手机号码
  var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(s) ? true:false; 
}
SZXJ.trimRight = function(s){ 
  if(s == null) {
    return "";
  }
  var whitespace = new String(" \t\n\r"); 
  var str = new String(s); 
  if (whitespace.indexOf(str.charAt(str.length-1)) != -1){ 
    var i = str.length - 1; 
    while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){ 
      i--; 
    } 
    str = str.substring(0, i+1); 
  } 
  return str; 
}     
SZXJ.trimLeft = function(s){ 
  if(s == null){ 
    return ""; 
  } 
  var whitespace = new String(" \t\n\r"); 
  var str = new String(s); 
  if (whitespace.indexOf(str.charAt(0)) != -1) { 
    var j=0, i = str.length; 
    while (j < i && whitespace.indexOf(str.charAt(j)) != -1){ 
      j++; 
    } 
    str = str.substring(j, i); 
  } 
  return str; 
}
SZXJ.trimToStr = function(s) {
  if(s == null) return ""; 
  var str = SZXJ.trimRight(s);
  return SZXJ.trimLeft(str);
}
SZXJ.isDouble = function(s) {
  var isDouble =/^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/
  return isDouble.test(s) ? true:false;
}
SZXJ.isInt = function(s) {
  var isInt = /^-?[1-9]\d*$/
  return isInt.test(s) ? true:false;
}
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 
SZXJ.getLocalTime =  function(nS) {
  var time = new Date(nS * 1000);
  return time.Format("yyyy-MM-dd hh:mm:ss");
    // return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
}
SZXJ.getLocalTimeTwo =  function(nS) {
  var time = new Date(nS);
  return time.Format("yyyy-MM-dd hh:mm");
  // return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
}
SZXJ.getLocalDate =  function(nS) { 
  var time = new Date(nS);
  return time.Format("yyyy-MM-dd");
    // return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
}
SZXJ.getLocalDateTwo =  function(nS) { 
  var time = new Date(nS);
  return time.Format("hh:mm");
    // return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17);
}
SZXJ.getQueryString = function(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return decodeURIComponent(r[2]); 
  return null;
}
SZXJ.loadImg = function(url, event) {
  var dom = event.target;
  if (url && dom.src !== url) {
    var img = new Image();
    var This = this;
    img.src = url;
    img.addEventListener('load', function() {
      dom.src = img.src;
    });
  }
};
//此方法被改写过,只能在nuxt的asyncData方法内执行,需要asyncData有实参context且需要传入对象context.req.headers（固定写法)及cookie的名称
SZXJ.getCookie = function(obj,c_name){         
    if (obj.cookie.length>0){ 
      var c_start=obj.cookie.indexOf(c_name + "=")
      if (c_start!=-1){ 
        c_start=c_start + c_name.length+1 
        var c_end=obj.cookie.indexOf(";",c_start)
        if (c_end==-1)
          var c_end=obj.cookie.length
        return unescape(obj.cookie.substring(c_start,c_end))
      } 
    }
    return ""
};
//此方法通用
SZXJ.setCookie=function (c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};
SZXJ.http = (This,_method, _url, _data, successfn, errorfn) => {
  // 设置登入请求头
  
  if (localStorage.getItem('JSESSIONID')) {
    Vue.http.headers.common['JSESSIONID'] = localStorage.getItem('JSESSIONID');
    
  }
  if(window.plus){
      var a = plus.navigator.getCookie('https://ex.qcacg.com/mView/')
      if(a){
        SZXJ.setCookie('JSESSIONID',a);
      }
  }
  // 设置登入URL
  var _URL = _url;
  // GET请求
  if (_method === 'get') {
    Vue.http.get(_URL, _data).then(
      (response) => {
        if (response.data.length !== 0) {
          successfn(response);
        }
      },
      (err) => {
        if (!err.status) {
          return;
        }
        /*if (This.$refs.vueAlert || This.$parent.$refs.vueAlert) {
           var Utils = This.$refs.vueAlert ? This.$refs.vueAlert : This.$parent.$refs.vueAlert;
           Utils.setMessage(true, err.data.msg, function(){
            if(err.data.code == 901) { // 未登入
              location.href = AppPathList.TemprootPath + '/view/login.html';
              localStorage.removeItem('JSESSIONID');
            }
            if(err.data.code == 1001) { // 登入超时
              location.href = AppPathList.TemprootPath + '/view/login.html';
              localStorage.removeItem('JSESSIONID');
            }
           });
        }*/
        if (errorfn) {
            errorfn(err);
        }
      }
    );
  }
  // POST请求
  if (_method === 'post') {
    Vue.http.post(_URL, _data).then(
      (response) => {
        if (response.data.length !== 0) {
          successfn(response);
        }
      },
      (err) => {
        if (!err.status) {
          return;
        }
//      if (This.$refs.vueAlert || This.$parent.$refs.vueAlert) {
//         var Utils = This.$refs.vueAlert ? This.$refs.vueAlert : This.$parent.$refs.vueAlert;
//         Utils.setMessage(true, err.data.msg, function(){
//          if(err.data.code == 901) { // 未登入
//            location.href = AppPathList.TemprootPath + '/view/login.html';
//            localStorage.removeItem('JSESSIONID');
//          }
//          if(err.data.code == 1001) { // 登入超时
//            location.href = AppPathList.TemprootPath + '/view/login.html';
//            localStorage.removeItem('JSESSIONID');
//          }
//
//         });
//      }
        if (errorfn) {
            errorfn(err);
        }
      }
    );
  }
  // 图片上传
  if (_method === 'upload') {
     // 
  }
};
export default SZXJ;
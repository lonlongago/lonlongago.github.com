import Vue from '../../lib/vue.min.js';
import PathList from '../../lib/apis/conf.js';
var footer = Vue.extend({
  template: '<footer class="qcacg-footer-parent"><div class="qcacg-footer"><div class="qcacg-top"><div class="pull-left qcacg-footer-block"><p class="qcacg-title">关于</p>'
  
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/about.html?id=2\'">关于我们</a></p>'
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/about.html?id=3\'">免责声明</a></p>'
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/about.html?id=1\'">公司信息</a></p>'
  +'<div class="qcacg-hr"></div></div><div class="pull-left qcacg-footer-block"><p class="qcacg-title">联系方式</p>'
  +'<p class="qcacg-content"><a href="http://weibo.com/5872021446/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1">微博</a></p>'
  +'<p class="qcacg-content"><a :href="javascript:;">电子邮件</a></p>'
  +'<div class="qcacg-hr"></div></div><div class="pull-left qcacg-footer-block"><p class="qcacg-title">投稿</p>'
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/about.html?id=5\'"">签约制度</a></p>'
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/about.html?id=7\'">作者福利</a></p>'
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/about.html?id=4\'">签约流程</a></p>'
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/commission.html\'">约稿函</a></p>'
  +'<p class="qcacg-content"><a :href="path.TemprootPath + \'/view/about.html?id=6\'">投稿流程</a></p>'
  +'<div class="qcacg-hr"></div></div><div class="pull-left qcacg-footer-block"><p class="qcacg-title">友情链接</p>'
  +'<p class="qcacg-content"><a href="http://www.tadu.com/">塔读文学</a></p>'
  // <p class="qcacg-content"><a href="javascript:;">网易GACHA</a></p><p class="qcacg-content"><a href="javascript:;">MissEvan_M站</a></p>'
  +'</div><div class="qcacg-footer-logo" onclick="location.href="path.TemprootPath + \'/index.html\'">轻创文学网</div></div><div class="qcacg-bottom"><p>杭州轻悦网络科技有限公司<span class="driver"> |</span>浙ICP备16021285号</p></div></div></footer>'
  +'<div style="text-align: center;background-color: #f2f2f2;margin-top: -10px;">'
  +'<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602007631" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img :src="path.ImagePath + \'/img/police.png\'" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#c8cbcc;">浙公网安备 33010602007631号</p></a>'
  +'</div>'
  ,
  data:function(){
    return {
      path: PathList,
    }
  },
  ready: function() {
    var _hmt = _hmt || [];
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?ec8c853059c8a6f927ecfbedee4c437d";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  }
});

export default footer;
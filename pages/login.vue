<template>
  <div>
  	<!--<div>{{loginFlag}}</div>-->
    <script src="/lib/jquery.min.js"></script>
    <script src="/lib/jquery-ui.min.js" ></script>
    <script src="/lib/jquery.validate.js"></script>
    <script src="https://static.geetest.com/static/tools/gt.js"></script>   
    <alert ref="alert"></alert>
      <myheader></myheader>
      <div style="position: relative;width: 100%;min-width: 1200px;">
        <img :src="path.ImagePath + '/img/background-jpg.jpg'" style="margin-top: -153px;width: 100%;min-height:768px ;"/>
        <form class="Login" id="Login">
          <div class="Login_small"  style="margin-top: 20px;">
          <img :src="path.ImagePath + '/img/logo-1.png'" class="Login_img" style="margin-top: -17px;"/>
          <p class="line">
            <input  type="password" style="position: absolute; top: -999px" />
            <input class="input" name="user" placeholder ="请输入手机号" autocomplete="off"  color="black" v-model="telephone"/>
            <img :src="path.ImagePath + '/img/lock-1.png'"/>
          </p>
          <p class="line">
            <input class="input" type="password" name="password" placeholder ="请输入密码" autocomplete="off" v-model="password" />
            <img :src="path.ImagePath + '/img/lock-png.png'"/>
          </p>
          <p class="line">
            <input type="checkbox" class="Login_input"/>
            <label>记住登录状态</label>
          </p>
          <div id="popup-captcha"></div>
          <a class="btn btn_submit a" id="btn-login">登入</a>
          <ul>
            <li><a :href="path.TemprootPath + '/password'">忘记密码</a></li>
            <li>|</li>
            <li><a style="color:#000000" :href="path.TemprootPath + '/register'">注册新帐号</a></li>
          </ul>
          </div>
        </form>
    </div>
    <!--<counter></counter>-->
    <myfooter></myfooter>
  </div>
</template>

<script>
import PathList from '~/components/conf'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import myHeader from '~/components/Header'
import myFooter from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
import axios from 'axios'
export default {
  components:{
    'alert': Alert,
    'myheader': myHeader,
    'myfooter': myFooter,
  },
  computed: {
  },
  asyncData: function(){
  },
  data:function() {
    return{
    	loginObj:{
    		loginFlag: false,
    	},
    	path: PathList,
      remeberme:'',
      telephone:'',
      password:'',
    }
  },
  mounted: function() {
    this.$nextTick(function () {
      this.getGeetestFn();
      // 主URL地址
      // 登入框动态弹出 start
      $('.Login').animate({height: '350px'});
      $('.Login').slideDown(1000);
      $("#Login").tooltip({show: false,hide: false});
    })
  },
  methods: {
    handlerPopup: function(captchaObj) {
      var This = this;
      captchaObj.onReady(function() {
        $('.btn_submit').click(function() {
          $('#Login').submit();
        });
        $.validator.setDefaults({
          submitHandler: function() {
            captchaObj.show();
          },
          showErrors: function(map, list) {
            // there's probably a way to simplify this
            var focussed = document.activeElement;
            if (focussed && $(focussed).is("input, textarea")) {
              $(this.currentForm).tooltip("close", {
                currentTarget: focussed
              },
              true);
            }
            this.currentElements.removeAttr("title").removeClass("ui-state-highlight");
            $.each(list,
            function(index, error) {
              $(error.element).attr("title", error.message).addClass("ui-state-highlight");
            });
            if (focussed && $(focussed).is("input, textarea")) {
              $(this.currentForm).tooltip("open", {target: focussed});
            }
          }
        });
        $("#Login").validate({
          rules: {
            user: {
              required: true,
              minlength: 11,
              number: true
              
            },
            password: {
              required: true,
              minlength: 6
            },
          },
          messages: {
            user: {
              required: "此为必填项",
              minlength: "长度最小为11位！",
              number: "必须是数字"
            },
            password: {
              required: "此为必填项",
              minlength: "长度最小为6位！"
            },
          }
        });
//      $(function() {      
//      });
        $("#Login input:not(:submit)").addClass("ui-widget-content");
        $(":submit").button();
        captchaObj.onSuccess(function() {
          var validate = captchaObj.getValidate();
          if (!validate) {
            //  alert('请先完成验证！');
            //  return;
            this.$refs.alert.setMessage(true,'请先完成验证!',function(){})
          }       
          var userEntity = new Object();
          var name = document.getElementsByName('user');
          var passworld = document.getElementsByName('password');
          userEntity.telephone = name[0].value;
          userEntity.passWord = passworld[0].value;
          userEntity.geetest_challenge = validate.geetest_challenge;
          userEntity.geetest_validate = validate.geetest_validate;
          userEntity.geetest_seccode = validate.geetest_seccode;
          if(document.getElementsByClassName('Login_input')[0].checked ){
              userEntity.remeberme  = 1 ;
          }
          SZXJ.http(This,'post', PathList.VerifyLoginServlet, userEntity, (data) => {
            document.cookie="JSESSIONID="+data.data.msg;
			      localStorage.setItem('JSESSIONID',data.data.msg);
            location.href = '/userInfo';
          },(err) => {
//          if(err){
              This.$refs.alert.setMessage(true,err.body.msg,function(){
                if (err.code === 1002) {
                  This.getGeetestFn();
                }
              })
//          }
            if (err.code === 1002) {
              This.getGeetestFn();
            }
          });
        })
      });
      // 将验证码加到id为captcha的元素里
      captchaObj.appendTo("#popup-captcha");
      // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    },
    getGeetestFn : function () { // 获取就极验验证码
      SZXJ.http(this,'get', PathList.StartCaptchaServlet, {}, (data) => {
        var res = JSON.parse(data.data);
        // 使用initGeetest接口
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
        window.initGeetest({
          gt: res.gt,
          challenge: res.challenge,
          product: "popup",
          // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
          offline: !res.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
        },
        this.handlerPopup);
      });
    },
  },
  head: function(){
    return{
      title: '登录-QC轻小说',
        meta: [
          { charset: 'UTF-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: 'apple-touch-fullscreen', content: 'yes' },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
          { name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
          { name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
          { name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
      ],
      link: [
          { rel: 'stylesheet', href: '/css/main.css' },
          { rel: 'stylesheet', href: '/css/LOgin.css' },
          { rel: 'stylesheet', href: '/css/headerOrFooter.css' },
          { rel: 'stylesheet', href: '/css/jquery-ui.min.css' },
        ]
      }
    }
}

</script>


<style>

</style>
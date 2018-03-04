<template>
	<div id="app">
		<script type="text/javascript" src="../lib/jquery.min.js"></script>
		<script type="text/javascript" src="../lib/jquery-ui.min.js" ></script>
		<script type="text/javascript" src="../lib/jquery.validate.js"></script>
		<script src="https://static.geetest.com/static/tools/gt.js"></script>
	    <alert ref="alert"></alert>
		<myheader></myheader>
		<div style="position: relative;width: 100%;min-width: 1200px;">
		    <img :src="path.ImagePath + '/img/background-jpg.jpg'" style="margin-top: -55px;width: 100%;min-height: 768px;" />
		    <form class="regist" id="regist"  method="get" action="" style="display: block;">
		        <div class="Password_rec">
			        <img :src="path.ImagePath + '/img/logo-1.png'" class="regist_img"/>
			        <p class="line">
			            <input  type="password" style="position: absolute; top: -999px" />
			            <input  class="input" name="user" placeholder="输入手机号" autocomplete="off" v-model="telephone" />
			            <img :src="path.ImagePath + '/img/lock-1.png'"/>
			        </p>
			        <p class="line">
			            <input name="verification" v-model="verification" placeholder="输入验证码" class="regist_Veri" />
			            <a v-if="verificationBtnFlag" class="btn verificationBtn a" @click="verificationBtn">获取验证码</a>
			            <a v-else class="btn verificationBtn a2">重新发送验证码<span style="padding-left: 3px;">{{verificationBtnTime}}</span></a>
			        </p>
			        <p class="line">
			            <input class="input" type="password" name="password" v-model="password" placeholder="密码"/>
			            <img :src="path.ImagePath + '/img/lock-png.png'"/>
			        </p>
			        <p class="line">
			            <input class="input" type="password" name="password2" v-model="password2" placeholder="确认密码"/>
			            <img :src="path.ImagePath + '/img/lock-png.png'"/>
			        </p>
			        <p class="regist_p"><a style="color:#000000" href="/login">立即登入</a></p>
			        <a class="btn btn_submit Password_rec_btn_a" href="/password">找回密码</a>
			        <div id="popup-captcha"></div>
		        </div>
		    </form>
		</div>
		<myfooter></myfooter>
    </div>
</template>

<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'myheader':Header,
		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			path: PathList,
	        telephone: '', // 手机号码
	        verification: '', // 手机验证码
	        username: '', // 昵称
	        password: '', // 密码
	        password2: '', // 确认密码
	        uid: '', // 推荐人
	        verificationBtnTime: 60, // 验证码时间
	        verificationBtnFlag: true, // 验证码状态
	        captchaObj: {},
	        verificationFlag: false,
	    }
	},
    mounted: function () { // ready -->
	    this.$nextTick(function () {
	  		this.getGeetestFn();
	    })
	},
	methods: {
		verificationTimeFn: function() {
	        if (this.verificationBtnTime === 0) {
	            this.verificationBtnTime = 60;
	            this.verificationBtnFlag = true;
	            return;
	        } else {
                this.verificationBtnTime = this.verificationBtnTime - 1;
	            var This = this;
	            setTimeout(function(){
	                This.verificationTimeFn();
	            }, 1000);
	        }
        },
        verificationBtn :function() {
            this.verificationFlag = true;
            this.captchaObj.show();
        },
        register :function(validate) {
            var registCodeId = localStorage.getItem('verificationId');
            var _data = {};
            _data.telephone = this.telephone;
            _data.telephoneCode = this.verification;
            _data.uuid = registCodeId;
            _data.passWord = this.password;
            _data.passWordConfirm = this.password2;
            SZXJ.http(this,'post', PathList.updatePassword, _data, (response) => {
                location.href = this.path.TemprootPath + '/login';
            });
        },
        handlerPopup: function(captchaObj) {
            this.captchaObj = captchaObj;
            var This = this;
	        captchaObj.onReady(function() {
	            // 设置验证的
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
			                },true)
		                }
		                this.currentElements.removeAttr("title").removeClass("ui-state-highlight");
		                $.each(list,
		                function(index, error) {
		                    $(error.element).attr("title", error.message).addClass("ui-state-highlight");
		                });
		                if (focussed && $(focussed).is("input, textarea")) {
			                $(this.currentForm).tooltip("open", {
			                    target: focussed
			                });
		                }
		            }
	            });
			    $('.btn_submit').click(function() {
			        $('#regist').submit();
			    });

			    $("#regist").validate({
			        rules: {
				        verification: {
				            required: true,
				            minlength: 6,
				            number: true
				        },
				        user: {
				            required: true,
				            minlength: 11,
				            number: true
				        },
				        password: {
				            required: true,
				            minlength: 6
				        },
				        password2: {
				            required: true,
				            minlength: 6
				        },
			        },
			        messages: {
				        verification: {
				            required: "此为必填项",
				            minlength: "长度最小为6位！",
				            number: "必须是数字"
				        },
				        user: {
				            required: "此为必填项",
				            minlength: "长度最小为11位！",
				            number: "必须是数字"
				        },
				        password: {
				            required: "此为必填项",
				            minlength: "长度最小为6位！"
				        },
				        password2: {
				            required: "此为必填项",
				            minlength: "长度最小为6位！"
				        },
			        }
                });
 
                $("#regist input:not(:submit)").addClass("ui-widget-content");

                $(":submit").button();
                 // 极验验证成功
			    captchaObj.onSuccess(function() {
			        var validate = captchaObj.getValidate();
			        if (!validate) {
			          //  alert('请先完成验证！');
			          //  return;
			        }
			        
			        if (This.verificationFlag) {
			            var _data = {};
			            _data.telephone = This.telephone;
			            _data.geetest_challenge = validate.geetest_challenge;
			            _data.geetest_validate = validate.geetest_validate;
			            _data.geetest_seccode = validate.geetest_seccode;
				        SZXJ.http(This,'post', PathList.updatePasswordTelephoneCode, _data, (data) => {
				            This.verificationBtnFlag = false;
				            This.verificationTimeFn();
				            localStorage.setItem('verificationId', data.data.updateVariId);
				        });
			        } else {
			            This.register(validate);
			        }
			        This.verificationFlag = false;
			    });
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
	    }
	},
  	head: function(){
		return {
			title: '密码找回-QC轻小说',
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
		    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
		    	{ rel: 'stylesheet', href: '/css/register.css' },
		    	{ rel: 'stylesheet', href: '/css/jquery-ui.min.css' }
	  		]
	  	}
  	}
}
</script>
<style>

</style>
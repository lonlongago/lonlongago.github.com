<template>
	<div id="allog">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div class="login" v-show="displayFlag" id="login">
		    <div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
		    <myheader msgfromfa="登录"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
		    <div class="logo">
		        	<img src="http://cdn.qcacg.com/img/app_book/logo.png"/>
		    </div>
		    <div class="loginInfo">
			        <input class="tel" type="text" v-model="userTele" placeholder="请输入手机号" />
			        <img class="userImg" src="http://cdn.qcacg.com/img/app_book/fff_03_update.png" alt="" />
			        <input class="password" type="password" v-model="userPassword" placeholder="请输入密码" />
			        <p class="wrong" style="display: none;" v-show="codeTrue">*密码错误</p>
			        <img class="passwordImg" src="http://cdn.qcacg.com/img/app_book/user_update.png" alt="" />
			        <div class="verify" style="display: none;" v-show="uuid">
			            <input type="text" placeholder="请输入验证码" v-model="picCode"/>
			            <img @click="getTime" class="vertifyPic" alt="验证码" :src="vertifyPic"/>
			        </div>
		    </div>
		    <div class="submit" @click="login">
		      		<p>登录</p>
		    </div>
		    <div class="loginBottom">
			        <!--<a class="forget" href="password.html">忘记密码</a>-->
			        <a class="register" href="/app/register"> 手机注册</a>
		    </div>
	    <appBottom></appBottom>
	    </div>
	</div>
</template>

<script>
import Header from '~/components/Headerapp'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList,
		'myheader':Header
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			displayFlag:false,
	        appPath: appPathList,
	        userTele: "",
	        userPassword: "",
	        picCode: "",
	        personal: true,
	        menuList: false,
	        toWrap: false,
	        codeTrue:false,
	        uuid: '',
	        time: '',
	         
	    }
	},
	computed: {
        vertifyPic: function() {
            return appPathList.rootPath+'/mobilelogincode.shtml?uuidStr='+this.uuid+'&time=' + this.time;
        },
    },
    mounted: function () { // ready -->
	  this.$nextTick(function () {
    	  k_touch("login", "y");
	  	  this.displayFlag = true;
	      if(document.getElementById("loading")){
	          document.body.removeChild(document.getElementById("loading"));
	       }  
	  })
	},
	methods: {
		back: function() {
            window.history.back();
        },
        getTime: function() {
        	var _date = new Date();
        	this.time = _date.getTime();
        },
        login: function() {
//          var data = {
//              telephone: this.userTele,
//              password: this.userPassword,
//              // checkCode: this.picCode,
//              // uuid: this.uuid
//          };
            var formData = new FormData();
			formData.append("telephone", this.userTele);
			formData.append("password", this.userPassword);
			formData.append("checkCode", this.picCode);
			formData.append("uuid", this.uuid);
			
            SZXJ.http(this, 'post', appPathList.login, formData, (res)=>{
                localStorage.setItem('JSESSIONID', res.data.data.jsessionId);
                setTimeout(function(){
		            history.back();
		         },300)
//              window.location.href= appPathList.TemprootPath + '/app' ;
            }, (err) => {
                this.uuid = err.data.data ? err.data.data : '';
                this.codeTrue = true;
            	if(this.telephone == undefined && this.password == undefined){
	            	alert("账户或密码输入有误");
	            	return;
	            };
            });
        },
        showMenu: function() {
            this.menuList = !this.menuList
            this.toWrap = !this.toWrap;
            if(this.menuList){
                document.body.style.overflow = "hidden";
            }else{
                document.body.style.overflow = "auto";
            };
        }  
	},
  	head: function(){
  		return {
  			title: '登录-QC轻小说',
  	    meta: [
  			    { charset: 'UTF-8' },
  			    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no' },
  			  	{ name: 'format-detection', content: 'telephone=no' },
  			  	{ name: 'apple-touch-fullscreen', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  			  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
  			  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
  			  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
  			],
  			link: [
  		    	{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		]
  	  }
  	}
}
</script>
<style scoped>

		#allog{background-color:#f4f4f4;padding-bottom:.8rem;position: fixed;width: 100%;height: 100%;}
		.login {max-width: 7.5rem;overflow-x: hidden;margin:0 auto;margin-top: 1.42rem;}
		.login .logo{text-align:center;margin-top:20%;margin-bottom:.26rem}
		.login .logo img{height:.72rem}
		.login .loginInfo{width:75%;margin:0 auto;font-size:.24rem;position:relative;}
		.login .loginInfo input{box-sizing: border-box;background-color:#E3E3E3;margin-bottom:.3rem;padding-left:.6rem;font-size:.32rem;width:100%;height:.9rem;line-height: .36rem;padding-top: .04rem;border-radius:.03rem;border:none;-webkit-appearance:none}
		
		.login .loginInfo .userImg{position:absolute;top:1.49rem;left:3%;height:.28rem}
		.login .loginInfo .passwordImg{position:absolute;top:.3rem;left:3%;height:.28rem}
		.login .loginInfo .password{background-size:.19rem .22rem;background-position:.16rem .09rem}
		.login .loginInfo .verify{width:100%;margin:0 auto;margin-bottom:.3rem}
		.login .loginInfo .verify input{width:4rem;padding-left:.19rem;margin-bottom:0}
		.login .loginInfo .verify .vertifyPic{display:inline-block;float:right;width:1.33rem;height:.9rem;border-radius:.01rem}
		.login .submit {
			display: block;
		    width: 4.8rem;
		    margin: 0 auto;
		    padding-top: .17rem;
		    padding-bottom: .13rem;
		    color: #FFF;
		    background-color: #3fd2e8;
		    border-radius: 100rem;
		    text-align: center;
		    position: relative;
		    margin-top: .30rem;
		    font-size: 0.32rem;
		}
		.login .submit p{ color: #FFFFFF;}
		.login .loginBottom{
			width: 75%;
		    font-size: .24rem;
		    margin: 20px auto;
		    text-align: end;
	    }
		.login .loginBottom a{color:#B1B1B1}
		.login .loginBottom .forget{display:inline-block}
		.login .loginBottom .register{float:right}
		.login .blackWrap{background-color:#000;opacity:.4;width:100%;height:100%;position:fixed;left:0;top:0;z-index:10}
		.login .wrong{
			margin-top: -.16rem;
			padding-bottom: .16rem;
		    margin-left: .2rem;
		    padding-top: .05rem;
		    font-size: .32rem;
		    color: #EE7271;
	    }
</style>
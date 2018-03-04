<template>
	<div id="register"  v-show="displayFlag" >
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="register">
			<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
    		<div :class="wrap?'wrap':''"></div>
    		<myheader msgfromfa="注册"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
			<div class="registerInfo">
		      <input type="text" placeholder="请输入手机号" v-model="tel" @blur="makeSureNum"/>
		      <p class="wrong" style="display: none;" v-show="telErr">*手机格式不正确</p>
		      <div class="verify">
		        <input type="text" placeholder="请输入验证码" v-model="vertify"/>
		        <div v-if="verificationBtnFlag" class="getVerify" @click="getVertifyPic">获取验证码</div>
		        <div v-else class="verifyBtn" @click="getVertifyPic">重新获取验证码{{verificationBtnTime}}</div>
		      </div>
		      <input type="password" class="password" placeholder="请输入密码" v-model="code" @blur="makeSurePwd()"/>
		      <input type="password" class="password" placeholder="确认密码" v-model="recode" @blur="makeSurePwd()"/>
		      <p class="wrong" style="display: none;" v-show="codeTrue">*两次密码不一致</p>
		      <input type="text" placeholder="昵称" v-model="userName" @blur="makeSureNickName()"/>
		      <p class="wrong" style="display: none;" v-show="showNull">昵称不能为空</p>
		      <p class="wrong" style="display: none;" v-show="tooLong">昵称不能超过10位</p>
		      <input type="text" placeholder="邀请人uid(选填)" v-model="invite"/>
		      <div class="agreement">
		        <div @click="agreementFn" class="inp">
		          <div v-if="mentFlag" class="circular"></div>
		        </div>
		        <div class="ment">&nbsp;&nbsp;我已同意<a href="/app/agreement">用户服务协议</a></div>
		      </div>
		      <div href="javascript:;" class="submit" @click="register">立即注册</div>
		      
		    </div>
		    <div class="popupBox"  v-if="popup">
		      <div class="popup">
		        <img src="http://cdn.qcacg.com/img/app_index/shut.png" class="quit" @click="quit">
		        <div class="window">
		          <input type="text" placeholder="请输入验证码" v-model="picCode"/>
		          <img class="vertifyPic" alt="验证码" :src="vertifyPic" @click="getVertifyPic"/>
		        </div> 
		        <span v-if="errFlag" class="err">*{{errMsg}}</span>
		        <div class="vertifyTrue" @click="getVertifyMessage">确定</div>
		      </div>
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
		'myheader':Header
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			displayFlag:false,
	        tel: "",
	        vertify: "",
	        picCode: "",
	        code: "",
	        recode: "",
	        userName: "",
	        invite: "",
	        uuid: false,
	        wrap: false,
	        telErr: false,
	        vertifyErr: false,
	        popup: false,
	        personal: true,
	        menuList: false,
	        toWrap: false,
	        errFlag:false,
	        codeTrue:false,
	        mentFlag:false,
	        verificationBtnTime:60,
	        verificationBtnFlag:true,
	        errMsg:'',
	        showNull:false,
	        tooLong:false
		}
	},
	computed: {
        vertifyPic: function() {
            return appPathList.rootPath+'/mobileRegisterCode.shtml?uuidStr='+this.uuid;
        },
    },
    mounted: function () { // ready -->
	  this.$nextTick(function () {
		k_touch("register", "y");
	  	this.displayFlag = true;
      	setTimeout(function(){
	        document.body.removeChild(document.getElementById("loading"));
	      },300)
		})
	},
	methods: {
	      	verificationTimeFn: function() {
	          if (this.verificationBtnTime === 0) {
	            this.verificationBtnTime= 60;
	            this.verificationBtnFlag = true;
	            return;
	          } else {
	            this.verificationBtnFlag = false;
	            this.verificationBtnTime= --this.verificationBtnTime;
	            var This = this;
	            setTimeout(function(){
	              This.verificationTimeFn();
	            }, 1000);
	          }
	        },
	      	agreementFn:function(){
		        if(this.mentFlag){
		          this.mentFlag = false;
		        }else{
		          this.mentFlag = true;
		        }
	      	},
	      	 back: function() {
	            window.history.back();
	        },
	        getVertifyPic:function() {
	            var test = /\d{11}/g;
				if(this.tel.length!=11){
	            	prompt("手机号码不正确");
	                return false;
	            }
				this.errFlag = false;
	            this.uuid = Date.parse(new Date());
	            this.wrap = true;
	            this.popup = true;
	        },
	       	makeSurePwd:function(){
				if(this.code.length>0&&this.recode.length>0)
				{
					if(this.code!=this.recode){
						this.codeTrue = true;
					}
					else{
						this.codeTrue = false;
					}
				
				}
			},
	       	//校验昵称
	       	makeSureNickName:function(){
	       		if(this.userName.trim().length==0){
	       			this.tooLong = false;
	       			this.showNull = true;
	       			return "";
	       		}else if(this.userName.trim().length>10){
	       			this.tooLong = true;
	       			this.showNull = false;
	       			return "";
	       		}
	       		else{
	       			this.tooLong = false;
	       			this.showNull = false;
	       			return "";
	       		}
	       			
	       	},
	       	//校验是否勾选协议
	        quit: function() {
	            this.wrap = false;
	            this.popup = false;
	        },
	        getVertifyMessage: function() {
	            let data = {
	                telephone: this.tel,
	                type:0,
	                checkCode: this.picCode,
	                uuidStr: this.uuid
	            };
	            SZXJ.http(this, 'post', appPathList.registerCheckCode, data, (response)=>{
	                this.wrap = false;
	                this.popup = false;
	                this.picCode = "";
	                this.errMsg = '';
	                this.verificationTimeFn();
	            },(err) =>{
	            	this.picCode = "";
	            	this.errFlag =true;
	            	this.errMsg = err.data.msg;
	            });
	        },
	        register: function() {
	          	let data = {
		           	telephone: this.tel,
		          	telephoneCode: this.vertify,
		          	userName: this.userName,
		         	passWord: this.code,
		            passWordConfirm: this.recode,
		            uuid: this.uuid,
		            invitePeople: this.invite
	          	};
	         
				 if(this.mentFlag==true&&this.tel!=''&&this.vertify!=""&&this.code!=''&&this.recode!=''&&this.username!=''){
				 	 SZXJ.http(this, 'post', appPathList.register, data, function(res){
		         	prompt('注册成功');
		         	setTimeout(function(){
		         		window.location.href = "/app/login";
		         	},1500)
		         },function(err){ prompt(err.data.msg) } );	
				 	
				 }else{
		        	prompt("信息填写正确并勾选协议");
				}	
	        },
	        //校验手机号码
	        makeSureNum:function(){
	            if(this.tel.length!=11){
	                this.telErr = true;
	            }else{
	            	this.telErr = false;
	            };
	        },
	        showMenu: function() {
	            this.menuList = !this.menuList
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        },
	},
  	head: function(){
  		return {
  			title: '注册-QC轻小说',
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

<style>

		body{padding-bottom:.8rem;background-color:#FBFBFB}
  		.register .registerInfo * {box-sizing: border-box;}
		.register .registerInfo{width:5.5rem;margin:0 auto;margin-top:1.92rem;margin-bottom:.7rem}
		.register .registerInfo input{font-size:.32rem;line-height: .36rem;background-color:#E3E3E3;margin-bottom:.4rem;padding-left:.19rem;width:100%;height:.8rem;border-radius:.03rem;border:none;-webkit-appearance:none}
		.register .registerInfo .verify{display:inline-block;width:100%;height:.8rem;font-size:.32rem;margin-bottom:.4rem}
		.register .registerInfo .verify input{width:3.5rem;height:100%;font-size:.32rem;line-height: .36rem;padding-left:.19rem;background-color:#E3E3E3;border-radius:.03rem;border:none;-webkit-appearance:none}
		.register .registerInfo .verify .getVerify{
			box-sizing: border-box;
			font-size: .30rem;display:inline-block;float:right;width:1.8rem;text-align:center;padding-top:.18rem;line-height:1.5;padding-bottom:.12rem;height:100%;color:#FFF;background-color:#3fd2e8;border-radius:.01rem;cursor:pointer}
	    .register .registerInfo .verify .verifyBtn{display: inline-block;
		    float: right;
		    width: 1.8rem;
		    text-align: center;
		    padding-top: .1rem;
		    line-height: 1.3;
		    padding-bottom: .12rem;
		    height: 100%;
		    color: #FFF;
		    background-color: #8C8C8C;
		    border-radius: .01rem;
		    cursor: pointer;
		    font-size: .24rem;}
		.register .registerInfo .password{
	    background: url(http://cdn.qcacg.com/img/app_book/fff_03_update.png) right center no-repeat #E3E3E3;
	    background-size: .48rem .48rem;
	    background-position: 4.75rem .16rem;
		}
		.register .registerInfo .submit{display:block;width:4.8rem;margin:0 auto;
		padding-top: .17rem;padding-bottom: .13rem;
		font-size:.24rem;color:#FFF;text-align:center;background-color:#3fd2e8;border-radius:100rem;cursor:pointer}
		.register .registerInfo .agreement{margin-bottom:.2rem;text-align:center;}
		.register .registerInfo .agreement .inp {margin-top: -0.04rem ;width:.24rem;height:.24rem;border-radius: 100rem;border:1px solid #777;vertical-align:middle;display: inline-block;background-color: white;}
		.register .registerInfo .agreement .circular{height: 80%;width: 80%;margin:10%;border-radius: 100rem;padding: 10% 0; background-color: #1CC8ED;}
		.register .registerInfo .agreement .ment{display:inline-block;font-size:.24rem;color:#C5C5C5;}
		.register .registerInfo .agreement .ment a{color:#58c6db}
		.register .registerInfo .wrong{
			margin-top: -.26rem;
	    padding: .1rem;
	    font-size: .24rem;
	    color: #EE7271;
		}
		.register .popupBox{
			box-shadow: 1px 1px 10px rgba(0,0,0,0.3);
			width:6rem;height:3.5rem;margin:0 auto;border-radius:.1rem;background-color:#FFF;position:fixed;top:30%;left:50%;margin-left:-3rem;z-index:20}
		.register .popupBox .popup{position:relative;width:100%;height:100%}
		.register .popupBox .popup .window{padding-top:1rem}
		.register .popupBox .popup .err{
			display: inline-block;
	    color: #EE7271;
	    font-size: .30rem;
	    padding-left: .59rem;
	    margin-top: .15rem;
		}
		.register .popupBox .quit{width:.48rem;height:.48rem;cursor:pointer;position:absolute;right:.1rem;top:.1rem}
		.register .popupBox input{box-sizing: border-box;width:3.05rem;height:.8rem;font-size:.24rem;padding-left:.19rem;background-color:#E3E3E3;border-radius:.03rem;border:none;-webkit-appearance:none;vertical-align:middle;margin:0 .5rem}
		.register .popupBox .vertifyPic{height:.6rem;border-radius:.01rem;cursor:pointer;vertical-align:middle}
		.register .popupBox .vertifyTrue{
			background-color: #3fd2e8;
	    text-align: center;
	    border-radius: 5rem;
	    color: #fff;
	    font-size: .32rem;
	    padding-top: .17rem;
	    padding-bottom: .13rem;
	    margin: 0 auto;   
	    width: 4.2rem;
	    position: absolute;
	    bottom: .50rem;
	    left: .9rem;
		}
	 
		.register .wrap{background-color:#000;opacity:.4;position:fixed;top:0;left:0;right: 0;bottom: 0;z-index:15}
</style>
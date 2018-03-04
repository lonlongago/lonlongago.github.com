<template>
	<div style="display: none;" v-show="displayFlag" id="enroll" class="enroll">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
			<myheader msg="提现信息登记"></myheader>
	        <div class="lower">
	          <div class="title">
	            <span class="new">真实姓名</span>
	            <input type="" name="" id="" placeholder="请输入您的真实姓名" v-model="realName" />
	          </div>
	          <div class="title ">
	            <span class="new">支付宝账号</span>
	            <input type="" name="" id="" placeholder="请输入支付宝账号" v-model="alipayAccount" />
	          </div>
	          <div class="title ">
	            <span class="new">确认支付宝账号</span>
	            <input type="" name="" id="" placeholder="确认支付宝账号" v-model="residence" />
	          </div>
	          <div class="title ">
	            <span class="new">手机验证</span>
	            <input type="" name="" id="" placeholder="请输入验证码" v-model="inputCode" />
	            <span @click="codeFn" class="code">获取验证码</span>
	            <div v-if="codeFlag" class="background"></div>
	             <div class="popupBox"  v-if="codeFlag">
	                <div class="popup">
	                   <img src="http://cdn.qcacg.com/img/app_index/shut.png" class="quit" @click="quit">
	                   <div class="window">
	                      <input type="text" placeholder="请输入验证码" v-model="checkCode"/>
	                      <img class="vertifyPic" alt="验证码" :src="vertifyPic" @click="showCaptchaObj"/>
	                   </div> 
	                   <span v-if="errFlag" class="err">*验证码错误</span>
	                   <div class="vertifyTrue" @click="vertifyTrue">确定</div>
	                </div>
	             </div>
	          </div>
	        </div>
	        <span v-if=" promptFlag == 1 " class="prompt">*请仔细检查个人信息，确认无误后在提交</span>
	        <span v-if=" promptFlag == 2 " class="prompt">*两次支付宝账号不一致</span>
	        <span v-if=" promptFlag == 3 " class="prompt">*手机验证码错误</span>
	        <div @click="getValueFn" class="true">下一步</div>
	        <appBottom></appBottom>
	    </div>      
	</div>
</template>

<script>
import Header from '~/components/Headerapt'
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
		    path: appPathList,
		    szxj:SZXJ,
		    realName:'',
		    alipayAccount:'',
		    residence:'',
		    uuid:'',
		    codeFlag:false,
		    checkCode:'',
		    vertifyPic:'',
		    errFlag:false,
		    promptFlag:1,
		    inputCode:'',
		    menuList: false,
		    toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
    	k_touch("enroll", "y");
	  	this.vertifyPic =  appPathList.code + '?time=' + new Date();
      	this.timeFn();
	  })
	},
	methods: {
	    showMenu: function() {
	            this.menuList = !this.menuList
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        },
	    backFn:function(){
	      history.go(-1);
	    },
	    showCaptchaObj:function(){
	       this.vertifyPic =  appPathList.code + '?time=' + new Date();
	    },
	    vertifyTrue:function(){
	      var data = {
	        checkCode :this.checkCode,
	      };
	      SZXJ.http(this,'post', appPathList.mobileTelephoneCode, data, (response) => {
	        this.codeFlag = false;
	        this.uuid = response.data.data;
	        this.checkCode = '';
	      },(err) => {
	        this.errFlag = true;
	        this.checkCode = '';
	      });
	    },
	    codeFn:function(){
	      this.codeFlag = true;
	    },
	    quit:function(){
	      this.codeFlag = false;
	    },
	    getValueFn:function(){
	      if( this.alipayAccount == this.residence ){
	        var data= {
	        realName : this.realName ,
	        alipayAccount : this.alipayAccount ,
	        inputCode : this.inputCode,
	        uuid : this.uuid ,
	      };
	        SZXJ.http(this,'get', appPathList.saveAlipay, data, (response) => {
	        location.href = this.path.TemprootPath + '/app/deposit?numBer=' + this.alipayAccount + '&name=' + this.realName;
	          console.log(response.data);
	        }, (err) => {
	           this.promptFlag= 3;
	        });
	      }else{
	        this.promptFlag= 2;
	      }
	    },
	    timeFn:function(){
	      this.displayFlag = true;
	      setTimeout(function(){
	            document.body.removeChild(document.getElementById("loading"));
	      },300)
	    }
    },
  	head: function(){
  		return {
  			title: '提现信息登记-QC轻小说',
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
		
		body{background-color:#f4f4f4;padding-bottom:.8rem;}
		.enroll .content{max-width: 7.5rem;margin:0 auto;position:relative;min-height:12rem;margin-top: 0.88rem;}
		.enroll .content .lower{margin-top:7%;background-color:#fff;padding:0 0;overflow:hidden;font-size:.28rem}
		.enroll .content .lower .title{padding:1.5% 0;border-bottom:.011rem solid rgba(0,0,0,.05);line-height:1.5}
		.enroll .content .lower .title .code{display:inline-block;padding:.3% 1.5%;background-color:#6ebbe5;color:#fff;border-radius:5rem;font-size:.2rem;margin-left:2%}
		.enroll .content .lower .title input{font-size:.28rem;width:40%;height:.4rem}
		.enroll .content .lower .title .new{padding:1% 0;width:27%;border-right:.011rem solid #e0e0e0;text-align:right;margin-right:3%;display:inline-block;padding-right:5%;color:rgba(0,0,0,.65)}
		.enroll .content .true{padding:1% 2.5%;background-color:#3fd2e8;text-align:center;margin:10% 25% 0 25%;border-radius:5rem;color:#fff;font-size:.28rem}
		.enroll .content .prompt{margin-left:15%;color:#f28b8c;font-size:.2rem;margin-top:1%;display:inline-block}
		.enroll .popupBox{width:6rem;height:2rem;margin:0 auto;border-radius:.1rem;background-color:#FFF;position:fixed;top:30%;left:50%;margin-left:-3rem;z-index:20}
		.enroll .popupBox .popup{position:relative;widows:100%;height:100%}
		.enroll .popupBox .popup .window{padding-top:10%}
		.enroll .popupBox .popup .err{color:#EE7271;font-size:.16rem;position:absolute;left:10%;top:55%}
		.enroll .popupBox .quit{width:.24rem;height:.24rem;cursor:pointer;position:absolute;right:.1rem;top:.1rem}
		.enroll .popupBox input{width:3.05rem;height:.4rem;font-size:.24rem;padding-left:.19rem;background-color:#E3E3E3;border-radius:.03rem;border:none;-webkit-appearance:none;vertical-align:middle;margin:0 .5rem}
		.enroll .popupBox .vertifyPic{height:.4rem;border-radius:.01rem;cursor:pointer;vertical-align:middle}
		.enroll .popupBox .vertifyTrue{padding:1% 1.5%;background-color:#3fd2e8;text-align:center;margin:7% 28% 0 28%;border-radius:5rem;color:#fff;font-size:.28rem}
		.enroll .background{background-color:rgba(0,0,0,.2);width:100%;height:100%;z-index:9;position:absolute;top:0}
</style>
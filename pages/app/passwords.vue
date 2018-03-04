<template>
	<div id="pwd">
		<script src="/lib/resize.js"></script>
		<div class="alls">
			<div class="tou">
				<img @click="backFn" class="back" src="/img/back.png" alt="" />
				<span>修改密码</span>
				<div class="btn" @click="vertifyTrue"><a>确定</a></div>
			</div>
			<div class="mi">
				<div class="title">
			        <input type="password" name="" id="" placeholder=" 输入新密码" v-model="passWord" />
			    </div>
			    <div class="title">
			        <input type="password" name="" id="" placeholder=" 确认新密码" v-model="passWordConfirm" />
			    </div>
			    <span v-if="passWord != passWordConfirm " >*两次密码输入不一致</span>
			    <span v-if="miFlag">*密码有误</span>
			    <span v-if="passWord.length <6 || passWord.length >16 ">*密码长度在6-16位之间</span>
			    <div class="title1">
			    	<input class="shur" type="" name="" id="" placeholder=" 输入验证码" v-model="telephoneCode" />
			    	<div v-if="verificationBtnFlag" class="vertifyPic" id="yan" @click="getVertifyPic">获取验证码</div>
			    	<div v-else class="verifyBtn">{{verificationBtnTime}} s</div>
			    	
					<!--<div class="lower">
				      <input type="" name="" id="" placeholder="请输入验证码" v-model="telephoneCode" />
				      <div v-if="verificationBtnFlag" v-else class="vertifyPic" @click="getVertifyPic">获取验证码</div>
				      <div v-else class="verifyBtn">重新获取验证码{{verificationBtnTime}}</div>
				    </div>-->
				    <div class="fix" v-if="popup"></div>
				    <div class="popupBox"  v-if="popup">
				      <div class="popup">
				        <img src="http://cdn.qcacg.com/img/app_index/shut.png" class="quit" @click="quit">
				        <div class="window">
				          <input type="text" placeholder="请输入验证码" v-model="picCode"/>
				          <img class="vertifyPic vertifyPicImg" alt="验证码" :src="vertifyPic" @click="showCaptchaObj"/>
				        </div> 
				        <span v-if="errFlag" class="err">*验证码错误</span>
				        <div class="vertifyTrue" @click="getVertifyMessage">确定</div>
				      </div>
				    </div>
				    <span v-if="mesFlag" class="err">*验证码错误</span>
				</div>
			</div>
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
		'myheader':Header,
	},
	data : function() {
		return {
			path: appPathList,
		    szxj:SZXJ,
			codeFlag:'',
		    checkCode:'',
			passWord:'',
		    telphone:'',
			passWordConfirm:'',
		    uuid:'',
		    telephoneCode:'',
		    codeFlag:'',
		    vertifyPic:'',
		    picCode:'',
			displayFlag:false,
		    popup:false,
		    miFlag:false,
		    mesFlag:false,
		    errFlag:false,
		    verificationBtnTime:60,
		    verificationBtnFlag:true,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
	  	this.vertifyPic =  appPathList.code + '?time=' + new Date();
	  	this.displayFlag = true;
	  })
	},
	methods: {
		backFn: function(){
			history.go(-1);
		},
		getVertifyPic: function(){
			this.popup=true;
	    	this.errFlag = false;
		},
		quit:function(){
	      this.popup=false;
	    },
	    showCaptchaObj:function(){
	      this.vertifyPic =  appPathList.code + '?time=' + new Date();
	    },
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
        getVertifyMessage:function(){
	      var data = {
	        checkCode :this.picCode,
	      };
	      SZXJ.http(this,'post', appPathList.mobileTelephoneCode, data, (response) => {
	        this.uuid = response.data.data;
	        this.popup=false;
	        this.picCode = '';
	        this.verificationTimeFn();
	      },(err) =>{
	        this.errFlag = true;
	        this.picCode = '';
	      });
	    }, 
	    vertifyTrue:function(){
	      var _data = {
	        telephoneCode: this.telephoneCode,
	        uuid: this.uuid,
	        passWord : this.passWord,
	        passWordConfirm : this.passWordConfirm,
	      };
//			var formData = new FormData();
//			formData.append("telephoneCode", this.telephoneCode);
//			formData.append("uuid", this.uuid);
//			formData.append("passWord", this.passWord);
//			formData.append("passWordConfirm", this.passWordConfirm);
		  if(6<this.passWord.length<16 && this.passWord != ""){
		      SZXJ.http(this,'post', appPathList.updatePassword, _data, (response) => {
		      	if(this.passWord == this.passWordConfirm && this.passWord.length == this.passWordConfirm.length){
		          location.href = this.path.TemprootPath + '/app/personal';
		      	}
		         },(err) => {
		           this.mesFlag = true;
		         });
		  }else{
		      		this.miFlag = true;
		      	};
	    },
	    getValueFn:function(){
	      SZXJ.http(this,'get', appPathList.getStatus, {}, (response) => {
	        this.telphone = response.data.status.telphone;
	      });
	      this.$nextTick(function(){
		       this.displayFlag = true;
		       var  This = this;
		       setTimeout(function(){
		          document.body.removeChild(document.getElementById("loading"));
		       },300)
		    });
	    },
	},
  	head: function(){
  		return {
  			title: '修改密码-QC轻小说',
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
//		    	{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		]
  	  }
  	}
}
</script>

<style>
	body{background-color: #F4F4F4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;}
	#pwd .alls{background-color: white;margin: 0 auto;max-width: 7.5rem;width: 100%;}
	#pwd .alls .tou{position: fixed;max-width:7.5rem;width: 100%;height:0.88rem;background-color: white;}
	#pwd .alls .tou .back{height: 0.33rem;width: 0.16rem;left: 0.3rem;top:0.28rem;position: absolute;box-sizing: border-box;}
	#pwd .alls .tou span{font-size: 0.33rem;text-align: center;padding-top: 0.28rem;padding-bottom:0.28rem;display: block;}
	#pwd .alls .tou .btn{box-sizing: border-box;position: absolute;height: .49rem;line-height: .49rem;top: .19rem;right: .3rem;padding: 0 0.3rem;background: #02bafa;border: 1px #26bbdb solid;border-radius: 3px;font-size: .28rem;text-align: center;}
	#pwd .alls .tou .btn a{color: white;}
	#pwd .alls .mi{position: absolute;max-width: 7.5rem;width: 100%;top: .9rem;}
	#pwd .alls .mi .title input{border: 0px;height: .88rem;margin-top:.25rem;margin-left: .44rem;width: 88%;font-size: .32rem;font-family: "微软雅黑";font-weight: 600;}
	#pwd .alls .mi .title1 .shur{border: 0px;height: .88rem; margin-top: .25rem;margin-left: .44rem;width: 4.66rem;font-size: .32rem;font-family: "微软雅黑";font-weight: 600;}
	#pwd .alls .mi .title1 #yan{height: .88rem;line-height:.88rem;margin-right: .44rem;width: 1.76rem;float: right;margin-top: .25rem;border-radius: 2px;background-color: #26bbdb;text-align: center;font-size: .32rem;color: white;font-family: "微软雅黑";}
	#pwd .alls .mi span{margin-left: .44rem;color: darkolivegreen;}
	#pwd .popupBox{width:6rem;height:2rem;margin:0 auto;border-radius:.1rem;background-color:#FFF;position:fixed;top:30%;left:50%;margin-left:-3rem;z-index:20;}
    #pwd .popupBox .popup{position:relative;widows:100%;height:100%}
    #pwd .popupBox .popup .window{padding-top:10%}
    #pwd .popupBox .popup .err{color:#EE7271;font-size:.16rem;position:absolute;left:10%;top:55%}
    #pwd .popupBox .quit{width:.24rem;height:.24rem;cursor:pointer;position:absolute;right:.1rem;top:.1rem}
    #pwd .popupBox input{width:3.05rem;height:.4rem;font-size:.24rem;padding-left:.19rem;background-color:#E3E3E3;border-radius:.03rem;border:none;-webkit-appearance:none;vertical-align:middle;margin:0 .5rem}
    #pwd .alls .mi .title1 .popupBox .vertifyPic{height:.4rem;border-radius:.01rem;cursor:pointer;vertical-align:middle}
    #pwd .popupBox .vertifyTrue{padding:1% 1.5%;background-color:#3fd2e8;text-align:center;margin:7% 28% 0 28%;border-radius:5rem;color:#fff;font-size:.28rem}
    .fix{width: 100%;height: 100%;position: fixed;z-index: 11;background-color: rgba(0,0,0,0.35);top: 0;}
	.verifyBtn{font-weight: 600;text-align:center;border-radius:.01rem;cursor:pointer;display: inline-block;background-color: #8C8C8C;vertical-align:top;color: white;padding: 1% 2%;margin-top: .25rem;width: 1.4rem;margin-left: .2rem;height: .7rem;line-height: .7rem;font-size: .3rem;}
</style>
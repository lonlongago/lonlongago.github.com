<template>
  <div style="font-size: 12px; position: fixed; left: 0; right: 0; top: 0; bottom: 0; background-color: #f2f2f2;">
    <appAlert ref="appAlert"></appAlert>
    <!--<div class="tp"></div>-->
    <!--头部-->
    <!--<div class="header_book">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>注册</span>
      </div>
    </div>-->
    <div class="content">
      <div class="user_part" style="margin-top: 0.128rem;">
        <input type="text" v-model="telphone" placeholder="请输入用户名（手机号码）" @blur="makeSureNum(1)" />
      </div>
      <div class="psw_part">
        <input type="text" v-model="password" placeholder="请输入密码" @blur="makeSureNum(2)"/>
      </div>
      <div class="psw_part">
        <input type="text" v-model="passwordConfirm" placeholder="请再次输入密码" @blur="makeSureNum(3)"/>
      </div>
      <div class="user_part">
        <input type="text" v-model="userName" placeholder="请输入昵称" @blur="makeSureNum(4)"/>
      </div>
      <div class="Verification_part">
        <input type="text" v-model="verfigy" placeholder="请输入验证码"/> 
        <div class="btn vertifygsss" @click="openTest" :style="verBol?'background-color:#c3c3c3;;':'background-color:#2ec0ff'">{{ver}}</div>
      </div>
      <div class="psw_part">
        <input type="text" v-model="uid" placeholder="邀请人UID（可不填）"/>
      </div>
      <div class="all_btn">
        <div class="resigter_contain">
          <div class="resigter_btn btn" @click="register()">注册</div>
        </div>
      </div>
      <div class="hintInformation">
        点击“注册”按钮，既表示同意<a href="javascript:;" @click="agreFn" style="color: #fedc6f;">注册协议</a>
      </div>
    </div>
    <div class="shadow" v-if="shadowBol"></div>
    <div class="popup" v-if="popup">
      <div class="popup_title">验证码获取</div>
      <div class="popup_input">
        <input type="text" placeholder="请输入验证码" v-model="picCode"/>
        <div style="width: 40%; display: inline-block; box-sizing: border-box; padding-left: 0.0853rem; vertical-align: top; line-height: 0.2048rem;">
          <img class="vertifyPic vertifyPicImg" alt="验证码" :src="vertifyPic" @click="showCaptchaObj"/>
        </div>
      </div> 
      <!--<span v-if="errFlag" class="err">*验证码错误</span>-->
      <div class="btn_contain">
        <div class="true_contain">
          <div class="vertifyTrue" @click="getVertifyMessage">确定</div>
        </div>
        <div class="false_contain">
          <div class="vertifyFalse" @click="quit">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
   import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  import appAlert from "~/components/AppAlert"
  
  export default{
    components:{
      appAlert
    },
    data:function(){
      return {
        telphone:'',
        userName:'',
        password:'',
        passwordConfirm:'',
        ver:'验证码',
        verNum:60,
        verBol:false,
        popup:false,
        vertifyPic:'',
        picCode:'',
        shadowBol:false,
        vertifyPic:'',
        verfigy:'',
        uid:'',
        ws:{},
        wn:{},
        uuid: false,
      }
    },
    mounted:function(){
      this.$nextTick(function(){
      	this.uuid = Date.parse(new Date());
        this.vertifyPic =  Path.rootPath+'/mobileRegisterCode.shtml?uuidStr='+this.uuid;
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready',this.plusReady,false);
        }
      })
    },
    methods:{
      goBack:function(){
        if(window.plus){
          this.webviewAnimation();
        }else{
          history.back()
        }
      },
      agreFn: function(){
      	if(window.plus){
      		this.wn = plus.webview.create(Path.netWorks+"/agreement",'agreement',
      		{
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'有关协议',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
		          'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
	        });
	        this.wn.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
	        this.wn.show('slide-in-out');
      	}else{
//    		location.href = '/mView/agreement';
      	}
      },
      plusReady:function(){
        var self = this;
        this.ws = plus.webview.currentWebview();
        this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
	        console.log('reject url: '+e.url);
	    });
        plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right");
//					self.ws.opener().reload();  //webview重新加载
				}, false);
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      makeSureNum:function(num){
        if(num==1){
          if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.telphone))){
          	if(window.plus){
		    			plus.nativeUI.toast( "请输入11位合法的手机号");
		    		}
//           this.$refs.appAlert.setMessage('请输入11位合法的手机号');
          }
        }
        if(num==2){
          if(this.password.length<6 ||this.password.length>=18){
          	if(window.plus){
		    			plus.nativeUI.toast( "请输入6-18位密码");
		    		}
//          this.$refs.appAlert.setMessage('请输入6-18位密码');
          }
        }
        if(num==3){
          if(this.password != this.passwordConfirm){
          	if(window.plus){
		    			plus.nativeUI.toast( "请输入6-18位密码");
		    		}
//          this.$refs.appAlert.setMessage('请输入6-18位密码');
          }
        }
        if(num==4){
          if(this.userName < null){
          	if(window.plus){
		    			plus.nativeUI.toast( "昵称不可为空");
		    		}
//          this.$refs.appAlert.setMessage('昵称不可为空');
          }
        }
      },
      register:function(){
        if(this.telphone==null || this.password==null || this.passwordConfirm==null || this.userName==null || this.verfigy==null){
        	if(window.plus){
		    			plus.nativeUI.toast( "请填写必要信息再注册");
		    		}
//        this.$refs.appAlert.setMessage('请填写必要信息再注册');
        }
        let data = {
          telephone: this.telphone,
          telephoneCode: this.verfigy,
          userName: this.userName,
          passWord: this.password,
          passWordConfirm: this.passwordConfirm,
          uuid: this.uid,
          invitePeople: ''
        };
        var self = this;
        SZXJ.http(this, 'post', Path.register, data, function(res){
        	if(window.plus){
		    			plus.nativeUI.toast( "注册成功");
		    		}
//        self.$refs.appAlert.setMessage('注册成功');
        },function(err){ 
        	if(window.plus){
		    			plus.nativeUI.toast(err.data.msg);
		    		}
//        self.$refs.appAlert.setMessage(err.data.msg);
        });
      },
      openTest:function(){
        this.popup = true;
        this.uuid = Date.parse(new Date());
        this.vertifyPic =  Path.rootPath+'/mobileRegisterCode.shtml?uuidStr='+this.uuid;
        this.shadowBol = true;
      },
      quit:function(){
        this.popup = false;
        this.shadowBol = false;
      },
      showCaptchaObj:function(){
      	this.uuid = Date.parse(new Date());
        this.vertifyPic =  Path.rootPath+'/mobileRegisterCode.shtml?uuidStr='+this.uuid;
      },
      getVertifyMessage:function(){
        var data = {
	        telephone: this.telphone,
	        type:0,
          checkCode :this.picCode,
        	uuidStr: this.uuid
        };
        SZXJ.http(this,'post', Path.registerCheckCode, data, (response) => {
          this.uuid = response.data.data;
          this.popup=false;
          this.picCode = '';
          this.shadowBol = false;
          this.testCode();
        },(err) =>{
//        this.errFlag = true;
//        this.shadowBol = false;
//        this.$refs.appAlert.setMessage(err.data.msg);
          if(window.plus){
		    			plus.nativeUI.toast(err.data.msg);
		    		}
          this.picCode = '';
        });
      },
      testCode:function(){
        if(this.ver!='验证码'){
          return
        }
        var self = this;
        self.ver = self.verNum + 's';
        self.verBol = true;
        var time = setInterval(function(){
          self.verNum = self.verNum -1;
          self.ver = self.verNum + 's';
          if(self.verNum<=0){
            clearInterval(time);
            self.verBol = false;
            self.ver = '验证码'
            self.verNum = 60;
          }
        },1000)
      },
      btnFn:function(){
      	console.log(this.password);
      }
    },
    head:{
      title: '分类首页-QC轻小说',
      meta: [
          { charset: 'UTF-8' },
          { name: 'apple-touch-fullscreen', content: 'yes' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: "apple-mobile-web-app-capable",content:"yes"},
          { name: "apple-mobile-web-app-status-bar-style",content:"default"},
          { name: "description",content:"轻小说章节"},
          { name: "keywords",content:"轻小说章节"},
      ],
      link: [
          { rel: 'stylesheet', href: '/css/main_app.css' }
      ],
      script:[
          {src:"/lib/resize_320.js"}
      ]
    }
  }
</script>

<style>
	*{user-select: none;}
	.tp{
		height: .171rem;
		background: white;
		width: 100%;
		position: fixed;
		z-index: 25;
	}
  .header_book{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 25;
  }
  .header_book:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: .0072rem;
    width: 100%;
    background-color: #c3c3c3;
  }
  .header_book .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_book .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_book .header_title{
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    width: 77.5%;
  }
  .header_book .header_title span{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    float: right;
    text-overflow: ellipsis;
    text-align: center;
    padding-top: 0.0768rem;
    padding-bottom: 0.0768rem;
    font-size: 0.1365rem;
    line-height: .2048rem;
  }
  .content{
    position: absolute;
    /*top: 0.5294rem;*/
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .content .user_part{
  	margin-top: 1px;
    /*border-top:1px solid #c3c3c3;*/
    /*border-bottom: 1px solid #c3c3c3;*/
  }
  .content .user_part input{
    border: none;
    padding-left: 0.512rem;
    width: 100%;
    height: 0.384rem;
    padding-top: 0.0853rem;
    padding-bottom: 0.0853rem;
    box-sizing: border-box;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_login/user.png);
    background-repeat: no-repeat;
    background-size: auto 0.2133rem;
    background-position: 0.128rem center;
    font-size: 0.1195rem;
  }
  .content .psw_part{
  	margin-top: 1px;
    /*border-bottom: 1px solid #c3c3c3;*/
  }
  .content .psw_part input{
    border: none;
    padding-left: 0.512rem;
    width: 100%;
    height: 0.384rem;
    padding-top: 0.0853rem;
    padding-bottom: 0.0853rem;
    box-sizing: border-box;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_login/psw.png);
    background-repeat: no-repeat;
    background-size: auto 0.2133rem;
    background-position: 0.128rem center;
    font-size: 0.1195rem;
  }
  .content .all_btn{
    margin-top: 0.128rem;
    padding: 0 0.128rem;
  }
  .content .all_btn .resigter_contain{
    display: inline-block;
    width: 100%;
    text-align: -webkit-center;
  }
  .content .all_btn .resigter_contain .resigter_btn{
    width: 75%;
    text-align: center;
    color: #fff;
    background-color: #ff8991;
    font-size: 0.1195rem;
    padding: 0.0856rem 0 0.085rem 0;
    border-radius: 0.01707rem;
  }
  .content .all_btn .login_contain{
    display: inline-block;
    width: 50%;
    text-align: -webkit-right;
  }
  .content .all_btn .login_contain .login_btn{
    width: 90%;
    text-align: center;
    color: #fff;
    background-color: #ffda58;
    font-size: 0.1195rem;
    padding: 0.0856rem 0 0.085rem 0;
    border-radius: 0.01707rem;
  }
  .content .Verification_part{
  	margin-top: 1px;
    /*border-bottom: 1px solid #c3c3c3;*/
    position: relative;
  }
  .content .Verification_part input{
    border: none;
    padding-left: 0.512rem;
    width: 100%;
    height: 0.384rem;
    padding-top: 0.0853rem;
    padding-bottom: 0.0853rem;
    box-sizing: border-box;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_login/verification.png);
    background-repeat: no-repeat;
    background-size: 0.2133rem auto;
    background-position: 0.128rem center;
    font-size: 0.1195rem;
  
  }
  .content .unlogin{
    text-align: center;
    display: block;
    font-size: 0.1024rem;
    padding-top: 0.1707rem;
    color: #f83e3e;
  }
  .hintInformation{
    text-align: center;
    font-size: 0.1024rem;
    margin-top: 0.0853rem;
  }
  .shadow{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
  }
  .popup{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 0.8936rem;
    width: 70%;
    background-color: #fff;
    border-radius: 0.01707rem;
  }
  .popup_title{
    text-align: center;
    padding: 0.128rem;
    font-size: 0.1365rem;
  }
  .popup_input{
    padding: 0 0.128rem;
  }
  .popup_input input{
    border: none;
    font-size: 0.1195rem;
    padding: 0.0427rem 0.0512rem;
    background-color: #f2f2f2;
    width: 60%;
    box-sizing: border-box;
  }
  .popup_input img{
    display: inline-block;
    height: 0.2048rem;
    vertical-align: top;
    width: 100%;
  }
  .btn_contain{
    padding: 0.128rem;
  }
  .true_contain{
    display: inline-block;
    width: 50%;
    text-align: -webkit-left;
  }
  .false_contain{
    display: inline-block;
    width: 50%;
    text-align: -webkit-right;
  }
  .vertifyTrue{
    display: inline-block;
    width: 90%;
    font-size: 0.1195rem;
    padding: 0.0853rem 0;
    text-align: center;
    color: #fff;
    background-color: #fedc6f;
    border-radius: 0.01707rem;
  }
  .vertifyFalse{
    display: inline-block;
    width: 90%;
    font-size: 0.1195rem;
    padding: 0.0853rem 0;
    text-align: center;
    color: #fff;
    background-color: #989898;
    border-radius: 0.01707rem;
  }
  .vertifygsss{
    position: absolute;
    right: 0.128rem;
    top: 0.0853rem;
    height: 0.2133rem;
    font-size: 0.1195rem;
    color: #fff;
    background-color: #64bafe;
    padding: 0.050rem 0.1024rem 0.042rem 0.1024rem;
    box-sizing: border-box;
    border-radius: 0.01707rem;
  }
</style>
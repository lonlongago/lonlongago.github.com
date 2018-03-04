<template>
  <div style="font-size: 12px; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: #f2f2f2;">
    <appAlert ref="appAlert"></appAlert>
    <!--<div class="tp"></div>-->
    <!--头部-->
    <!--<div class="header_book">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>修改密码</span>
      </div>
    </div>-->
    <div class="content">
      <div class="newPsw">
        <input type="text" placeholder="请输入账号" v-model="userName"/>
      </div>
      <div class="newPsw">
        <input type="password" placeholder="输入新密码" v-model="password"/>
      </div>
      <div class="newPsw">
        <input type="password" placeholder="确认新密码" v-model="passWordConfirm"/>
      </div>
      <div class="newPsw">
        <div class="yanContain">
          <input type="text" placeholder="输入验证码" v-model="verfigy"/> 
        </div>
        <div class="yan btn" @click="openTest()" :style="verBol?'background-color:#c3c3c3;':'background-color:#2ec0ff'">{{ver}}</div>
      </div>
      <div class="issure newPsw">
        <span class="btn" @click="updataPsw()">确认</span>
      </div>
    </div>
    <div class="shadow" v-if="shadowBol"></div>
    <!--<div class="popup" v-if="popup">
      <div class="popup_title">验证码获取</div>
      <div class="popup_input">
        <input type="text" placeholder="请输入验证码" v-model="picCode"/>
        <div style="width: 40%; display: inline-block; box-sizing: border-box; padding-left: 0.0853rem; vertical-align: top; line-height: 0.2048rem;">
          <img class="vertifyPic vertifyPicImg" alt="验证码" :src="vertifyPic" @click="showCaptchaObj"/>
        </div>
      </div> -->
      <!--<span v-if="errFlag" class="err">*验证码错误</span>-->
      <!--<div class="btn_contain">
        <div class="true_contain">
          <div class="vertifyTrue" @click="getVertifyMessage">确定</div>
        </div>
        <div class="false_contain">
          <div class="vertifyFalse" @click="quit">取消</div>
        </div>
      </div>
    </div>-->
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
        userName:'',
        password:'',
        passWordConfirm:'',
        verfigy:'',
        ver:'验证码',
        verNum:60,
        verBol:false,
        popup:false,
        vertifyPic:'',
        picCode:'',
        shadowBol:false,
        vertifyPic:'',
        ws:{},
        wn:{},
      }
    },
    mounted:function(){
      this.$nextTick(function(){
//      this.vertifyPic =  Path.code + '?time=' + new Date();
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
      updataPsw:function(){
        if(this.password == this.passWordConfirm && this.password!=null){
            var _data = {
              telephoneCode: this.verfigy,
              uuid: this.uuid,
              telephone: this.userName,
              passWord: this.password,
              passWordConfirm: this.passWordConfirm,
            };
            SZXJ.http(this,'post', Path.updatePassword, _data, (response) => {
               console.log(response);
               if(window.plus){
	    			plus.nativeUI.toast(response.data.msg);
	    		}
            },(err) => {
              
            });
        }
      },
      openTest:function(){
//      this.popup = true;
//      this.shadowBol = true;
//      this.testCode();
        this.getVertifyMessage();
      },
      quit:function(){
        this.popup = false;
        this.shadowBol = false;
      },
      showCaptchaObj:function(){
//      this.vertifyPic =  Path.code + '?time=' + new Date();
      },
      getVertifyMessage:function(){
        var data = {
          telephone :this.userName,
        };
        SZXJ.http(this,'post', Path.newMobileTelephoneCode, data, (response) => {
          this.uuid = response.data.data;
//        this.popup=false;
//        this.picCode = '';
//        this.shadowBol = false;
          this.testCode();
        },(err) =>{
//        this.errFlag = true;
//        this.shadowBol = false;
          if(window.plus){
		    			plus.nativeUI.toast(err.data.msg);
		    		}
//        this.$refs.appAlert.setMessage(err.data.msg);
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
	.tp{
		background: white;
		height: .171rem;
    width: 100%;
    z-index: 25;
    position: fixed;
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
    padding: 0 0.128rem;
  }
  .content .newPsw{
    margin-top: 0.0853rem;
  }
  .content .newPsw input{
    border: none;
    padding: 0.1024rem 0.0853rem;
    font-size: 0.1365rem;
    width: 100%;
    box-sizing: border-box;
  }
  .content .yanContain{
    width: 70%;
    box-sizing: border-box;
    padding-right: 0.128rem;
    display: inline-block;
  }
  .content .yan{
    width: 30%;
    text-align: center;
    font-size: 0.1365rem;
    padding: 0.105rem 0;
    background-color: #c3c3c3;
    display: inline-block;
    border-radius: 0.03413rem;
    color: #fff;
  }
  .content .issure{
    text-align: center;
  }
  .content .issure span{
    display: inline-block;
    font-size: 0.1195rem;
    background-color: #ff8991;
    width: 60%;
    padding: 0.0853rem 0;
    color: #fff;
    border-radius: 0.01707rem;
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
</style>
<template>
  <div style="font-size: 12px; position: fixed; left: 0; right: 0; top: 0; bottom: 0; background-color: #f2f2f2;">
    <!--<div class="tp"></div>-->
    <!--头部-->
    <!--<div class="header_book">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>登录</span>
      </div>
    </div>-->
    <div class="content">
      <div class="user_part">
        <input type="text" v-model="userName" placeholder="请输入用户名"/>
      </div>
      <div class="psw_part">
        <input type="password" v-model="password" placeholder="请输入密码"/>
      </div>
      <div class="all_btn">
        <div class="resigter_contain">
          <a class="resigter_btn btn" href="javascript:;" @click="goRegister">注册</a>
        </div>
        <div class="login_contain">
          <div class="login_btn btn" @click="loginVerify">登录</div>
        </div>
      </div>
      <a class="unlogin" href="javascript:;" @click="goPassword">忘记密码</a>
    </div>
  </div>
</template>

<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  export default{
    data:function(){
      return {
        userName:'',
        password:'',
        ws:{},
        wn:{},
        webContainer:{}
      }
    },
    mounted:function(){
      this.$nextTick(function(){
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
        this.webContainer = plus.webview.getLaunchWebview();
        plus.key.addEventListener('backbutton', function(){
//      	self.ws.opener().reload();  //webview重新加载
					self.ws.close("slide-out-right");
				}, false);
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      loginVerify:function(){
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.userName))){
        	if(window.plus){
		    			plus.nativeUI.toast( "请输入合法的手机号");
		    		}
          return
        }
        if(this.password.length<6){
        	if(window.plus){
		    			plus.nativeUI.toast( "请输入6-18位密码");
		    		}
          return
        }
        this.login();
      },
      goRegister:function(){
        if(window.plus){
          this.wn = plus.webview.create(Path.netWorks+'/register','register',
          {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'注册',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
	        });
          this.wn.show('slide-in-right')
        }
      },
      goPassword:function(){
        if(window.plus){
          this.wn = plus.webview.create(Path.netWorks+'/passwords','passwords',
          {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'忘记密码',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
	        });
          this.wn.show('slide-in-right')
        }
      },
      login:function(){
        var formData = new FormData();
        formData.append("telephone", this.userName);
        formData.append("password", this.password);
        var self = this;
        SZXJ.http(this, 'post', Path.login, formData, (res)=>{
            var value = res.data.data.jsessionId;
            localStorage.setItem('JSESSIONID', value);
            if(window.plus){
		    			plus.nativeUI.toast( "登录成功");
            	var time = new Date();
              plus.navigator.setCookie(Path.netWorks,'JSESSIONID='+value+';expires='+time+';path=/');
              self.webContainer.reload()
              self.ws.opener().reload();  //webview重新加载
              plus.nativeUI.showWaiting();
              setTimeout(function(){
              	plus.nativeUI.closeWaiting();
              	self.ws.close("slide-out-right")
              },1200)
            }
      }, (err) => { 
      	    if(window.plus){
		    			plus.nativeUI.toast(err.data.msg);
		    		}
//        this.$refs.appAlert.setMessage(err.data.msg);
      });
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
		height: .171rem;
		background: white;
		width: 100%;
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
    margin-top: 0.128rem;
    /*border-top:1px solid #c3c3c3;
    border-bottom: 1px solid #c3c3c3;*/
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
    width: 50%;
    text-align: left;
  }
  .content .all_btn .resigter_contain .resigter_btn{
    width: 90%;
    text-align: center;
    color: #fff;
    background-color: #ff8991;
    font-size: 0.1195rem;
    padding: 0.0856rem 0 0.085rem 0;
    border-radius: 0.01707rem;
    display: block;
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
  .content .unlogin{
    text-align: center;
    display: block;
    font-size: 0.1024rem;
    margin-top: 0.1707rem;
    color: #f83e3e;
  }
</style>
<template>
  <div style="font-size: 12px; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: #f2f2f2;">
    <div style="position: absolute; left: 0; right: 0; top: 0; height: 0.1707rem; background-color: #fff;"></div>
    <div class="message_header">
      <div class="header_title">消息</div>
    </div>
    <div class="message_content">
      <a class="relay" href="javascript:;" @click="setreplyFn">
        <span class="relay_icon"></span>
        <span class="title">我的回复</span>
        <span class="right_move"></span>
        <span class="num_container" v-if="loginObj.reply!=0">
          <span class="num">{{loginObj.reply}}</span>
        </span>
      </a>
      <a class="marginTop1" href="javascript:;" @click="setRelaFn">
        <span class="relation_icon"></span>
        <span class="title">@我的</span>
        <span class="right_move"></span>
        <span class="num_container" style="display: none;">
          <span class="num"></span>
        </span>
      </a>
      <a class="marginTop1" href="javascript:;" @click="setbookFn">
        <span class="work_icon"></span>
        <span class="title">作品相关</span>
        <span class="right_move"></span>
        <span class="num_container" v-if="loginObj.book!=0">
          <span class="num">{{loginObj.book}}</span>
        </span>
      </a>
      <a class="marginTop1" href="javascript:;" @click="setsystemFn">
        <span class="system_icon"></span>
        <span class="title">系统消息</span>
        <span class="right_move"></span>
        <span class="num_container" v-if="loginObj.system!=0">
          <span class="num">{{loginObj.system}}</span>
        </span>
      </a>
      <a class="marginTop1" href="javascript:;" @click="setofficialFn">
        <span class="Official_icon"></span>
        <span class="title">官方公告</span>
        <span class="right_move"></span>
        <span class="num_container" v-if="loginObj.official!=0">
          <span class="num">{{loginObj.official}}</span>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  export default{
    data:function(){
      return {
        loginObj:{
          book:0,
          official:0,
          reply:0,
          system:0,
        },
        loginFlag:false,
        ws:{},
        webcontain:{},
        urls:[
          "https://ex.qcacg.com/mView/system",
          "https://ex.qcacg.com/mView/offical",
          "https://ex.qcacg.com/mView/myreply",
          "https://ex.qcacg.com/mView/bokabout",
        ]
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        SZXJ.http(this,'get', Path.getStatus, {}, (response) => {
        	this.loginFlag = response.data.loginFlag;
        	console.log(this.loginFlag);
          if(response.body.loginFlag){
            this.loginObj.book = response.data.book;
            this.loginObj.official = response.data.official;
            this.loginObj.reply = response.data.reply;
            this.loginObj.system = response.data.system;
          }
        });
        var self =this;
        if(window.plus){
          self.plusReady();
        }else{
          document.addEventListener('plusready',self.plusReady,false);
        }
      })
    },
    methods:{
      plusReady:function(){
        this.ws = plus.webview.currentWebview();
//      plus.webview.prefetchURLs(this.urls);
//      this.webcontain = plus.webview.create("https://ex.qcacg.com/mView/system",'system',{'popGesture':'close'})
      },
      setbookFn: function(){
          this.loginObj.book = 0;
          if(!this.loginFlag){
            if(window.plus){
	            this.webBook = plus.webview.create(Path.netWorks+'/login','login',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webBook.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webBook.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
	            this.webBook.show('slide-in-right');
	          }else{
//	            location.href = "/mView/login";
	          }
          }else{
            if(window.plus){
//            this.webcontain.loadURL(this.urls[3]);
              this.webcontain = plus.webview.create(Path.netWorks+'/bokabout','login',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'作品相关','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webcontain.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webcontain.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
              this.webcontain.show('slide-in-right')
            }else{
//            location.href = "/mView/bokabout"
            }
          }
      },
      setRelaFn:function(){
      	  if(!this.loginFlag){
            if(window.plus){
	            this.webBook = plus.webview.create(Path.netWorks+'/login','login',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webBook.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webBook.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
	            this.webBook.show('slide-in-right');
	          }else{
//	            location.href = "/mView/login";
	          }
          }else{
            if(window.plus){
               this.webcontain = plus.webview.create(Path.netWorks+'/replyme','replyme',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'@我的','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webcontain.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webcontain.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
              this.webcontain.show('slide-in-right')
            }else{
//            location.href = "/mView/offical"
            }
          }
      },
      setofficialFn: function(){
          this.loginObj.official = 0;
          if(!this.loginFlag){
            if(window.plus){
	            this.webBook = plus.webview.create(Path.netWorks+'/login','login',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webBook.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webBook.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
	            this.webBook.show('slide-in-right');
	          }else{
//	            location.href = "/mView/login";
	          }
          }else{
            if(window.plus){
               this.webcontain = plus.webview.create(Path.netWorks+'/offical','offical',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'官方公告','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webcontain.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webcontain.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
              this.webcontain.show('slide-in-right')
            }else{
//            location.href = "/mView/offical"
            }
          }
      },
      setreplyFn: function(){
          this.loginObj.reply = 0;
          if(!this.loginFlag){
            if(window.plus){
	            this.webBook = plus.webview.create(Path.netWorks+'/login','login',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webBook.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webBook.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
	            this.webBook.show('slide-in-right');
	          }else{
//	            location.href = "/mView/login";
	          }
          }else{
            if(window.plus){
                this.webcontain = plus.webview.create(Path.netWorks+'/myreply','myreply',{
					        'popGesture':'close',
					        'titleNView':{'backgroundColor':'#ffffff','titleText':'我的回复','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
					        'statusbar':{'background':'#ffffff'},
					        "backButtonAutoControl":'close'
				        });
				        this.webcontain.onloading= function(){
									plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
								}
								this.webcontain.onloaded=function(){
									plus.nativeUI.closeWaiting();
								}
               this.webcontain.show('slide-in-right')
            }else{
//            location.href = "/mView/myreply"
            }
          }
      },
      setsystemFn: function(){
          this.loginObj.system = 0;
          if(!this.loginFlag){
            if(window.plus){
	            this.webBook = plus.webview.create(Path.netWorks+'/login','login',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webBook.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webBook.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
	            this.webBook.show('slide-in-right');
	          }else{
//	            location.href = "/mView/login";
	          }
          }else{
            if(window.plus){
              this.webcontain = plus.webview.create(Path.netWorks+'/system','system',{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'系统消息','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.webcontain.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webcontain.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
              this.webcontain.show('slide-in-right')
            }else{
//            location.href = "/mView/system"
            }
          }
      },
    },
    head:{
      title:'消息页',
      meta:[
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
          {src:"/lib/resize_320.js"},
      ]
    }
  }
</script>
  
<style>
  *{user-select: none;}
  .message_header{
    position: fixed;
    left: 0;
    right: 0;
    top: 0.1707rem;
    height: 0.3584rem;
    background-color: #fff;
  }
  .message_header:after{
  	content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: .0072rem;
    width: 100%;
    background-color: #c3c3c3;
  }
  .message_header .header_title{
    height: 100%;
    line-height: 0.3860rem;
    font-size: 0.1365rem;
    text-align: center;
  }
  .message_content{
    margin-top: 0.5561rem;
  }
  .message_content a{
    padding: 0.0683rem 0.128rem;
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    display: inline-block;
    /*height: 0.384rem;*/
  }
  .message_content .relay{
    margin-top: 0.0853rem;
  }
  .message_content a .title{
    display: inline-block;
    margin-left: 0.0853rem;
    font-size: 0.128rem;
    vertical-align: top;
    padding-top: 0.050rem;
    padding-bottom: 0.035rem;
  }
  .message_content a .relay_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_message/relay.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .message_content a .relation_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_message/relation.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .message_content a .work_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_message/work.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .message_content a .system_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_message/system.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .message_content a .Official_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_message/Official.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .message_content a .right_move{
    display: inline-block;
    float: right;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/right.png);
    background-repeat: no-repeat;
    background-size: 0.064rem 0.128rem;
    background-position: center right; 
    height: 0.2133rem;
    width: 0.128rem;
  }
  .message_content a .num_container .num{
    display: inline-block;
    padding: 0.0260rem 0.0512rem 0.0252rem 0.0512rem;
    background-color: #ff8383;
    color: #fff;
    font-size: 0.0853rem;
    border-radius: 0.1109rem;
    margin-top: 0.0064rem;
  }
  .message_content a .num_container{
    display: inline-block;
    float: right;
    height: 0.2133rem;
    box-sizing: border-box;
    padding: 0.0260rem 0 0.0252rem 0;
  }
  .marginTop1{
    margin-top: 1px;
  }
</style>
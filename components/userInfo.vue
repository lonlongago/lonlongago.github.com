<template>
<div style="font-size: 12px;">
  <div class="userInfo_header">
		<div class="userInfo_tp"></div>
    <div class="header_title">个人中心</div>
    <div class="header_userInfo">
      <div class="header_user_msg" v-if="loginFlag">
        <a class="msg_head_user" href="javascript:;" @click="joinMsg">
          <img :src="loginImg" onerror="this.src = '/img/app_userInfo/user_header.png'"/>
        </a>
        <div class="user_name">{{userName}}</div>
      </div>
      <div class="header_user_msg" v-else>
        <div class="msg_head_user">
          <img style="background-color:#4f4f4f" />
        </div>
        <div class="user_name">昵称（未登录）</div>
      </div>
      <div class="signOrLogin btn" @click="signFn()">
        <div class="sign" v-if="loginFlag">
          <div v-if="!sign" style="height: 100%;text-align: center;">
            <img src="http://cdn.qcacg.com/mobile/img/app_userInfo/goodCard.png" style=" height: 90%; vertical-align: top;"/>
            <span style="display: inline-block; font-size: 0.128rem; color: #fff; padding-top: 0.05980rem; padding-bottom: 0.05970rem;vertical-align: top;">签到</span>
          </div>
          <div v-else>
            <span style="display: inline-block; font-size: 0.128rem; color: #fff; padding-top: 0.05980rem; padding-bottom: 0.05970rem;vertical-align: top;">已签到</span>
          </div>
        </div>
        <a href='javascript:;' @click="goLogin()" class="login" v-else>登录/注册</a>
      </div>
    </div>
  </div>
  <div class="other_content">
    <div class="other_list">
      <div class="other_part">
        <p>{{bookCount}}</p>
        <p>作品</p>
      </div>
      <div class="other_part">
        <p>{{attentionCount}}</p>
        <p>关注</p>
      </div>
      <div class="other_part">
        <p>{{byAttentionCount}}</p>
        <p>粉丝</p>
      </div>
    </div>
    <a class="contribute marginTop" href="javascript:;" @click="goContribute">
      <span class="contribute_icon"></span>
      <span class="title">我的投稿</span>
      <span class="right_move"></span>
    </a>
    <a class="money marginTop" href="javascript:;" @click="goWallet">
      <span class="money_icon"></span>
      <span class="title">我的钱包</span>
      <span class="right_move"></span>
    </a>
    <a class="good_card marginTop1" href="javascript:;" @click="goGoodCard">
      <span class="good_card_icon"></span>
      <span class="title">我的好人卡</span>
      <span class="right_move"></span>
    </a>
    <a class="attention marginTop1" href="javascript:;" @click="goFollow">
      <span class="attention_icon"></span>
      <span class="title">我的关注</span>
      <span class="right_move"></span>
    </a>
   
  </div>
</div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  export default{
    data:function(){
      return {
        loginFlag:false,
        userName:"",
        loginImg:'',
        SZXJ:SZXJ,
        Path:appPathList,
        sign:false,
        attentionCount:0,
        byAttentionCount:0,
        bookCount:0,
        ws:{}, //本页面webview
        webcontain:{}, //新webview容器
        urls:[
          'https://ex.qcacg.com/mView/contribute',
          'https://ex.qcacg.com/mView/mywallte',
          'https://ex.qcacg.com/mView/goodCard1',
          'https://ex.qcacg.com/mView/follow',
          'https://ex.qcacg.com/mView/userInfoMsg',
          'https://ex.qcacg.com/mView/login',
        ],
        iosOrAndriod:false,
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getStatusFn();
        SZXJ.http(this,'post',appPathList.queryUser,{},(response)=>{
            this.userInfoList = response.data;
            this.userName = response.data.userName;
            this.loginImg = this.Path.imagePath + response.data.userHead;
        },(err)=>{
        });
        this.getAllValueFn();
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//      var iosOrAndriod = null;
        if(isAndroid){
          this.iosOrAndriod = true;
          console.log("是安卓手机")
        }
        if(isiOS){
          this.iosOrAndriod = false;
          console.log("是苹果手机")
        }
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
//      this.webcontain = this.openWebviewfn("https://ex.qcacg.com/mView/system",'userInfoChild')
      },
      goLogin:function(){
          if(window.plus){
            this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',
            {
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
//          location.href = "/mView/login";
          }
      },
      newBooks:function(){
      	if(window.plus){
            this.webBook = plus.webview.create(appPathList.netWorks+'/newsbooks','newsbooks',
            {
				      'popGesture':'close',
				      'titleNView':{'backgroundColor':'#ffffff','titleText':'新建书籍','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
//          location.href = "/mView/newsbooks";
          }
      },
      goContribute:function(){
        if(!this.loginFlag){
          if(window.plus){
	        	this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',
	        	{
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
//	        	location.href = "/mView/login";
         	}
        }else{
          if(window.plus){
          	
          	this.webBook = plus.webview.create(appPathList.netWorks+'/contribute','contribute',
	        	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'发布投稿','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
//          location.href = "/mView/contribute"
          }
        }
      },
      goWallet:function(){
        if(!this.loginFlag){
          if(window.plus){
	        	this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',
	        	{
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
//	        	location.href = "/mView/login";
         	}
        }else{
          if(window.plus){
            this.webBook = plus.webview.create(appPathList.netWorks+'/mywallte','mywallte',
	        	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#329eff','titleText':'我的钱包','titleColor':'#000000','autoBackButton':true
				        },
				        'statusbar':{'background':'#329eff'},
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
//          location.href = "/mView/mywallte"
          }
        }
      },
      goGoodCard:function(){
        if(!this.loginFlag){
          if(window.plus){
	        	this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',
	        	{
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
	//          location.href = "/mView/login";
	          }
        }else{
          if(window.plus){
          	var str ="";
          	if(this.iosOrAndriod){
          		str = '/goodCard';
//            plus.nativeUI.alert('安卓支付暂不开放');
//            return
          	}else{
          		str = '/goodCard1';
          	}
            this.webBook = plus.webview.create(appPathList.netWorks+''+str,'goodCard1',
	        	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#329eff','titleText':'我的好人卡','titleColor':'#000000','autoBackButton':true},
				        'statusbar':{'background':'#329eff'},
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
//          location.href = "/mView/goodCard1"
          }
        }
      },
      goFollow:function(){
        if(!this.loginFlag){
          if(window.plus){
            this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',
            {
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
//          location.href = "/mView/login";
          }
        }else{
          if(window.plus){
            this.webBook = plus.webview.create(appPathList.netWorks+'/follow','follow',
	        	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'我的关注','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
//          location.href = "/mView/follow"
          }
        }
      },
      joinMsg:function(){
        if(!this.loginFlag){
          if(window.plus){
            this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',
            {
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
//          location.href = "/mView/login";
          }
        }else{
          if(window.plus){
            this.webBook = plus.webview.create(appPathList.netWorks+'/userInfoMsg','userInfoMsg',
	        	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'个人信息','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
//          location.href = "/mView/userInfoMsg"
          }
        }
      },
      signFn: function() {  
        if(this.sign){
          return
        }
        SZXJ.http(this,'get', appPathList.cardsign, {}, (response) => {
            this.sign=true;
            if(window.plus){
		    			plus.nativeUI.toast( "签到成功，获得10张好人卡");
		    		}
//          this.$refs.appAlert.setMessage('签到成功，获得10张好人卡');
        });
      },
      getStatusFn:function(){
        SZXJ.http(this,'get', appPathList.getStatus, {}, (response) => {    //获取服务器登入信息
            this.loginFlag = response.data.loginFlag;
            console.log(this.loginFlag);
            if(response.body.loginFlag){
              this.userId = response.data.status.userId;
              this.sign = response.data.status.sign;
            }
        });
      },
      getAllValueFn:function(){
        SZXJ.http(this,'get', appPathList.allUserInfo, {}, (response) => { 
            this.attentionCount =response.data.data.attentionsCount;
            this.byAttentionCount = response.data.data.fansCount;
            this.bookCount = response.data.data.disPlayBooksCount;
        },(err) => {
          
        });
      }
    }
  }
</script>

<style>
	*{user-select: none;}
	.userInfo_tp{
		height: .171rem;
		width: 100%;
	}
  .userInfo_header{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 1.2547rem;
    background-image: url(http://cdn.qcacg.com/mobile/img/tops.png);
    background-repeat: repeat-x;
    background-size: 2px 100%;
  }
  .userInfo_header .header_title{
    font-size: 0.128rem;
    padding-top: 0.128rem;
    padding-bottom: 0.1109rem;
    text-align: center;
    color:#323232;
  }
  .userInfo_header .header_userInfo{
    width: 100%;
    box-sizing: border-box;
    height: 0.7083rem;
    padding: 0 0.128rem;
  }
  .userInfo_header .header_userInfo .header_user_msg {
    display: inline-block;
  }
  .userInfo_header .header_userInfo .header_user_msg .msg_head_user{
    display: inline-block;
    padding-top: 0.0853rem;
  }
  .userInfo_header .header_userInfo .header_user_msg .msg_head_user img{
    width: 0.5291rem;
    height: 0.5291rem;
    border-radius: 100%;
    border: 2px solid #fff;
    display: inline-block;
    vertical-align: top;
  }
  .userInfo_header .header_userInfo .header_user_msg .user_name{
    display: inline-block;
    font-size: 0.1109rem;
    padding-top: 0.3072rem;
    padding-bottom: 0.2901rem;
    vertical-align: top;
    padding-left: 0.0853rem;
  }
  .userInfo_header .header_userInfo .signOrLogin{
    float: right;
    height: 0.2475rem;
    background-color: #fedc6f;
    width: 0.6827rem;
    border-radius: 0.1024rem;
    box-shadow:0 0 4px #fff;
    margin-top: 0.2389rem;
    margin-bottom: 0.2210rem;
    text-align: center;
  }
  .userInfo_header .header_userInfo .signOrLogin .sign{
    height: 100%;
    text-align: center;
  }
  .userInfo_header .header_userInfo .signOrLogin .login{
    height: 100%;
    text-align: center;
    line-height: 0.2475rem;
    color: #fff;
    font-size: 0.1195rem;
  }
  .other_content{
    position: absolute;
    left: 0;
    right: 0;
    top: 1.2547rem;
    bottom: 0.4181rem;
    background-color: #f2f2f2;
  }
  .other_content .other_list{
    width: 100%;
    height: 0.4181rem;
    background-color: #fff;
    padding: 0 0.128rem;
    box-sizing: border-box;
    display: flex;
  }
  .other_content .other_list .other_part{
    flex: 1;
  }
  .other_content .other_list .other_part p{
    text-align: center;
    font-size: 0.1024rem;
    padding-top: 0.0453rem;
    padding-bottom: 0.03rem;
  }
  .other_content a{
    display: block;
    background-color: #fff;
    padding: 0.0810rem 0.128rem;
  }
  .other_content .contribute .contribute_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/tougao.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .other_content .money .money_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/money.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .other_content .good_card .good_card_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/goodManCard.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .other_content .attention .attention_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/attention.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .other_content .bookList .bookList_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/bookList.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .other_content .message .message_icon{
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/message.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  
  .other_content .title{
    display: inline-block;
    margin-left: 0.0853rem;
    font-size: 0.128rem;
    vertical-align: top;
    padding-top: 0.050rem;
    padding-bottom: 0.035rem;
  }
  .other_content .right_move{
    display: inline-block;
    float: right;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/right.png);
    background-repeat: no-repeat;
    background-size: 0.064rem 0.128rem;
    background-position: center right; 
    height: 0.2133rem;
    width: 0.128rem;
  }
  .marginTop{
    margin-top: 0.0427rem;
  }
  .marginTop1{
    margin-top: 1px;
  }
</style>
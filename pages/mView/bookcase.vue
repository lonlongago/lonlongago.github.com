<template>
   <div style="font-size: 12px; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: #f2f2f2;">
  	<div class="bookcase_tp"></div>
    <!--头部-->
    <div class="bookcase_header">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_Text"><span>书架</span></div>
      <div class="header_share" @click="operate()">
        <div class="header_share_tu"></div>
      </div>
      
    </div>
    <div class="case_operate" v-if="operateBol">
      <ul style="width: 100%; height: 100%; ">
        <li class="btn" style=" width: 100%;height: 50%; font-size: 0.1365rem; padding: 0.09385rem 0.128rem 0.09385rem 0; box-sizing: border-box; border-bottom: 1px solid #c3c3c3;" @click="moveHistory()">
          <span style="background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/history.png);width: 10%; background-repeat: no-repeat; background-size: 0.1365rem 0.1365rem; height: 0.1365rem; display: inline-block;background-position: center; padding: 0.0286rem 0.128rem; vertical-align: top; display: inline-block;"></span>
          <span style="padding: 0.0286rem 0; vertical-align: top;height: 0.1365rem;width: 60%; color: #656565; display: inline-block;">浏览历史</span>
        </li>
        <li class="btn" style="width: 100%;height: 50%; font-size: 0.1365rem; padding: 0.09385rem 0.128rem 0.09385rem 0;box-sizing: border-box;" @click="startOperate()">
          <span style="background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/operate.png);width: 10%; background-repeat: no-repeat; background-size: 0.1365rem 0.1365rem; height: 0.1365rem; display: inline-block;background-position: center; padding: 0.0286rem 0.128rem; vertical-align: top; display: inline-block;"></span>
          <span style="padding: 0.0286rem 0; vertical-align: top;height: 0.1365rem;width: 60%; color: #656565; display: inline-block;">编辑书架</span>
        </li>
      </ul>
    </div>
    <div class="bookcase_content" v-if="loginFlag">
      <div class="case_list" v-if="this.bookList.length != 0">
        <div class="part_container" v-for="(obj,index) in bookList" @click="readBook(obj.bookId,obj.bookName)">
          <div class="case_part">
            <div class="part_img">
              <img :src="Path.imagePath+obj.bookCoverImage"/>
              <div :class="obj.selectBol?'img_select':'img_unselect'" @click="setSelect(index,obj)" v-if="selectBol"></div>
            </div>
            <div class="part_name">{{obj.bookName}}</div>
          </div>
        </div>
      </div>
      <div class="bokca" v-else>亲，您还未收藏任何书籍哟</div>
    </div>
    <div class="contenter" v-else>
    	<div class="ntalls">
				<div class="covup">你还没登陆。请登陆~~“喵喵”</div>
				<img src="/img/appcov.png" alt="" />
				<button class="upda btn" @click="logintoFn">登录/注册</button>
			</div>
    </div>
    <div class="bottom_btn" v-if="selectBol">
      <div class="btn_part" @click="selectAll()">全选</div>
      <div class="btn_part" style="color: #f74747; box-sizing: border-box; border-right: 1px solid #c3c3c3;" @click="delCase()">删除</div>
      <div class="btn_part" @click="closeSelect()">完成</div>
    </div>
    <div class="shadow" v-if="shadowBol" @click="closeOperate()"></div>
  </div>
</template>

<script>
  import axios from "axios"
  import SZXJ from "~/components/vueHttp-app"
  import PathList from "~/components/conf-app"
  export default{
    data:function(){
      return {
        Path:PathList,
        bookList:[],
        operateBol:false,
        selectBol:false,
        bookList:[],
        shadowBol:false,
        allBol:false,
        loginFlag:false,
        ws:{}
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getBookListTwoFn();
        var self =this;
        if(window.plus){
          self.plusReady();
        }else{
          document.addEventListener('plusready',self.plusReady,false);
        }
      })
    },
    methods:{
//    goBack:function(){
//      history.back();
//    },
      plusReady:function(){
        
      },
      openView:function(){
        
      },
      operate:function(){
        this.operateBol = true;
        this.shadowBol = true;
      },
      logintoFn: function(){
      	if(this.loginFlag == false){
      		if(window.plus){
            	this.ws = plus.webview.create(PathList.netWorks + '/login','login',
            	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.ws.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.ws.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
            	this.ws.show('slide-in-right');
          	}
      	}
      },
      startOperate:function(){
      	if(this.loginFlag == true){
	        this.selectBol = true;
	        this.operateBol = false;
	        this.shadowBol = false;
      	}else{
      		if(window.plus){
            	this.ws = plus.webview.create(PathList.netWorks + '/login','login',
            	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.ws.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.ws.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
            	this.ws.show('slide-in-right');
          	}else{
//          	location.href = "/mView/login";
         	}
      	}
      },
      selectAll:function(){
        var arr = this.bookList;
        var ttt = '';
        if(this.allBol){
          ttt = this.allBol;
          this.allBol = false;
        }else{
          ttt = this.allBol;
          this.allBol = true;
        }
        for(var i =0; i<arr.length; i++){
          arr[i].selectBol = this.allBol;
          this.bookList.splice(i,1,arr[i]);
        }
      },
      closeSelect:function(){
        this.selectBol = false;
      },
      moveHistory:function(){
      	if(this.loginFlag){
	        if(window.plus){
	          this.ws = plus.webview.create(PathList.netWorks+'/history','history',
	          {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'浏览历史','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        'backButtonAutoControl':'close'
		        });
		         this.ws.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.ws.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
	          this.ws.show('slide-in-right');
	        }else{
//	          location.href = '/mView/history';
	        }
        }else{
        	if(window.plus){
            	this.ws = plus.webview.create(PathList.netWorks+'/login','login',
            	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			         this.ws.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.ws.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
            	this.ws.show('slide-in-right');
          	}else{
//          	location.href = "/mView/login";
         	}
        }
      },
      readBook:function(bookId,bookName){
      	if(this.selectBol == false){
      		if(window.plus){
	          this.ws = plus.webview.create(PathList.netWorks+'/book/'+bookId,'book',
	          {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,'titleColor':'#000000','autoBackButton':true,titleOverflow:'ellipsis',splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
		        });
		        this.ws.onloading= function(){
							plus.nativeUI.showWaiting();
						}
						this.ws.onloaded=function(){
							plus.nativeUI.closeWaiting();
						}
	          this.ws.show('slide-in-right');
	        }else{
//	          location.href = '/mView/book/'+bookId;
	        }
      	}else{
      		
      	}
      },
      closeOperate:function(){
        this.operateBol = false;
        this.shadowBol = false;
      },
      setSelect:function(index,obj){
        var _obj = obj;
        if(obj.selectBol){
          _obj.selectBol = false;
          this.bookList.splice(index,1,_obj);
        }else{
           _obj.selectBol = true;
          this.bookList.splice(index,1,_obj);
        }
      },
      delCase:function(){
        var str = '';
        var bookList = this.bookList;
        for(var i = 0 ; i<bookList.length ; i++){
          if(bookList[i].selectBol){
            if(i==1){
              str = bookList[i].bookId;
            }else{
              str = str+','+bookList[i].bookId;
            }
          }
        }
        var self = this
        if(window.plus){
        	plus.nativeUI.confirm( "确定删除这些书籍吗?", function(e){
        		if(e.index == 0){
	        		SZXJ.http(this,'get', PathList.removeBookCollects+'?bookId='+str, {}, (response) => {
			          console.log("执行删除操作");
								console.log("Close confirm: "+e.index);
								self.getBookListTwoFn();
		          })
        		}else if(e.index == 1){
        			plus.nativeUI.toast( "已取消删除");
        		}
					});
        }   
      },
      getBookListTwoFn: function() { // 获取我的收藏的数据
        var _data = {};
        this.bookList= [];
        SZXJ.http(this,'get', PathList.findBookCollectByUser, {}, (response) => {
          this.bookList=response.data;
          var arr = [];
          var list = [];
          for(var i = 0; i < this.bookList.length;i++){
            this.bookList[i].selectBol = false;
          };
       },(err)=>{
       });
       SZXJ.http(this,'get',PathList.getStatus,{},(response)=>{
       	this.loginFlag = response.data.loginFlag;
       })
      }
    },
    head:{
      title: '书架页-QC轻小说',
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
          {src:"/lib/resize_320.js"},
      ]
    }
  }
</script>

<style>
	*{user-select: none;}
	.bookcase_tp{
		height: .171rem;
		background-color: #FFFFFF;
	}
	.bokca{
		text-align: center;
		font-size: .128rem;
		margin-top: 50%;
	}
	.contenter{
		position: fixed;
		top: 30%;
		bottom: 0;
		left: 0;
		right: 0;
		/*margin-top: 50%;*/
		font-family: "微软雅黑";
		font-size: .128rem;
		text-align: center;
	}
	.contenter .ntalls{
		width: 100%;
		margin: 0 auto;
	}
	.contenter .ntalls .covup{
		text-align: center;
    font-size: .1194rem;
    color: #ffcd6d;
	}
	.contenter .ntalls img{
		height: .7253rem;
    width: 1.5147rem;
    position: absolute;
    top: 8%;
    left: 27%;
	}
	.contenter .ntalls .upda{
    background-color: #ffcd6d;
    color: #fff;
    border-radius: .2rem;
    height: .256rem;
    width: .768rem;
    border: 0;
    position: absolute;
    top: 32%;
    left: 38%;
    font-size: .1194rem;
	}
  .bookcase_header {
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    /*z-index: 30;*/
  }
  .bookcase_header:after{
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: .0072rem;
    width: 100%;
    background-color: #c3c3c3;
  }
  .bookcase_header .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .bookcase_header .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    /*background-image: url('/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;*/
  }
  .bookcase_header .header_Text {
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    /*text-align: center;*/
    width: 68.125%;
  }
  .bookcase_header .header_Text span{
    display: inline-block;
    width: 86.238%;
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
  .bookcase_header .header_share{
    float: right;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .bookcase_header .header_share .header_share_tu{
    margin-top: 0.1195rem;
    margin-bottom: 0.1195rem;
    display: inline-block;
    width: .151rem;
    height: .151rem;
    /*width: .1365rem;
    height: .1365rem;*/
    background-image: url('http://cdn.qcacg.com/mobile/img/app_userInfo/case.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .case_operate{
    position: absolute;
    right: 0;
    top: 0.523rem;
    width: 1.0667rem;
    height: 0.7509rem;
    background-color: #f2f2f2;
    z-index: 30;
  }
  .bookcase_content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0.5294rem;
    background-color: #f2f2f2;
    box-sizing: border-box;
    padding: 0.128rem .128rem .5rem .128rem;
    min-height: 3rem;
    bottom: 0.4181rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .bookcase_content .case_list{
    width: 100%;
    min-height: 3rem;
  }
  .bookcase_content .case_list .part_container{
    width: 33.333%; 
    display: inline-block;
    text-align: center;
    text-align: -moz-center;
    text-align: -webkit-center;
  }
  .bookcase_content .case_list .part_container .case_part{
  }
  .bookcase_content .case_list .part_container .case_part .part_img{
    width: 0.7253rem;
    height: 1.024rem;
    border-radius: 4px;
    border: 4px solid #fff;
    position: relative;
  }
  .bookcase_content .case_list .part_container .case_part .img_select{
    position: absolute;
    background-color: rgba(0,0,0,0.7);
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/selected.png);
    width: 0.7253rem;
    height: 1.024rem;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0.4181rem;
  }
  .bookcase_content .case_list .part_container .case_part .img_unselect{
    position: absolute;
    background-color: rgba(0,0,0,0.7);
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/unselected.png);
    width: 0.7253rem;
    height: 1.024rem;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0.4181rem;
  }
  .bookcase_content .case_list .part_container .case_part .part_img img{
    width: 100%;
    height: 100%;
  }
  .bookcase_content .case_list .part_container .case_part .part_name{
    color: #282828;
    font-size: 0.1109rem;
    padding: 0.064rem 0;
    width: 0.7253rem;
    height: 0.1109rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    white-space: nowrap;
    /*-webkit-line-clamp: 2;
    -webkit-box-orient: vertical;*/
  }
  .shadow{
    position: fixed;
    top: 0.523rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 25;
  }
  .bottom_btn{
    position: fixed;
    bottom: .42rem;
    left: 0;
    right: 0;
    height: 0.4181rem;
    background-color: #f2f2f2;
    z-index: 20;
    display: flex;
    border-top: 1px solid #c3c3c3;
  }
  .bottom_btn .btn_part{
    flex: 1;
    font-size: 0.1365rem;
    text-align: center;
    padding: 0.1410rem 0 0.1406rem 0;
    color: #656565;
  }
</style>
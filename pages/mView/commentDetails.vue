<template>
  <div style="font-size: 12px; background-color: #f2f2f2;position: absolute; left: 0; right: 0; top: 0; bottom: 0; ">
    <div class="comment_all">
	    <div class="comment_user">
	        <img :src="path.imagePath + comment.userHead" style="border-radius: 100%"/>
	    </div>
	    <div class="comment_details">
	      <div class="comment_content_header">
	        <span class="comment_user_name">{{comment.userName}}</span>
	        <span style="display: inline-block; float: right; margin-left: 0.128rem;" class="btn" @tap="replyFn(comment.commentId,0,'','')">
	          <img src="http://cdn.qcacg.com/mobile/img/app_newBook/huihua.png" style="width: 0.1024rem; height: 0.1024rem;"/>
	        </span>
	        <span style="display: inline-block; float: right;" >
	          <span>{{comment.replysCount}}</span>
	          <img src="http://cdn.qcacg.com/mobile/img/app_newBook/yan.png" style="width: 0.1024rem; height: 0.0824rem;margin-left: 0.0427rem;"/>
	        </span>
	      </div>
	      <span class="comment_user_time">{{comment.commentDate | reverse}}</span>
	      <div class="comment_user_reply" v-html="comment.commentContent">{{comment.commentContent}}</div>
	    </div>
	  </div>
    <div class="comment">
      	<div class="reply_list mui-content mui-scroll-wrapper" id="pullrefresh">
	      	<div class="mui-scroll">
	      		<div class="mui-table-view mui-table-view-chevron">
			        <div class="reply_part" v-for="(obj,index) in commen">
			          <div class="reply_user">
			              <img :src="path.imagePath + obj.userHead" style="border-radius: 100%; width: 100%;"/>
			          </div>
			          <div class="reply_details">
			            <div class="reply_content_header" v-if="obj.replyStatus==0" >
			              <span class="reply_user_name">{{obj.userName}}</span>
			              <span style="display: inline-block; float: right; margin-left: 0.128rem;" class="btn" @tap="replyFn(comment.commentId,1,obj.userId,obj.replyId)">
			                <img src="http://cdn.qcacg.com/mobile/img/app_newBook/huihua.png" style="width: 0.1024rem; height: 0.1024rem;"/>
			              </span>
			            </div>
			            <div v-if="obj.replyStatus==1" class="reply_content_header" >
			              <span class="reply_user_name">{{obj.userName}}</span>
			              <span style="color: lightskyblue;">@</span>
			              <span class="reply_user_name">{{obj.replyUserName}}</span>:
			              <span style="display: inline-block; float: right; margin-left: 0.128rem;" class="btn" @tap="replyFn(comment.commentId,1,obj.userId,obj.replyId)">
			                <img src="http://cdn.qcacg.com/mobile/img/app_newBook/huihua.png" style="width: 0.1024rem; height: 0.1024rem;"/>
			              </span>
			            </div>
			            <span class="reply_user_time">{{obj.replyDate | reverse}}</span>
			            <div class="reply_user_reply" v-html="obj.replyContent">{{obj.replyContent}}</div>
			          </div>
			          <div class="repxi"></div>
			        </div>
	      		</div>
	      	</div>
	      </div>
    </div>
    <div class="comment_bottom btn" @tap="replyFn(comment.commentId,0,'','')">
      <a href="javascript:;" >发表回复</a>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  export default{
    asyncData:function(context){
      var obj = {};
      obj.bookId = context.params.id.split("&")[1];
      obj.commentId =context.params.id.split("&")[0];
      console.log(obj.bookId);
      console.log(obj.commentId)
      return obj
    },
    data:function(){
      return {
      	path:appPathList,
        bookId:'',
        comment:{},
        commen:[],
        replayCount:0,
        commentId: '',
        offsetHeight:0,
        clientHeight:0,
        srcollTop:0,
        srcollH:0,
        control:1,
        commentList:[],
        replyEntityList:[],
        data1:{
        	activeId:2,
        	commentId:0,
        	pageNo:1,
        	pageSize:10,
        	status:0,
        	sort:1
        },
        loginFlag:false,
        numBer:0,
        max:1000,
        ws:{},
        wn:{}
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getComment(this.data1);
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready',this.plusReady,false);
        }
        var self =this;
        var u = navigator.userAgent;
       	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var iosOrAndriod = null;
        if(isAndroid){
          iosOrAndriod = true;
          console.log("是安卓手机")
        }
        if(isiOS){
          iosOrAndriod = false;
          console.log("是苹果手机")
        }
        console.log(iosOrAndriod?'circle':'none');
		    mui.init({
				  pullRefresh: {
					  container: '#pullrefresh',
					  down: {
					   	style:iosOrAndriod?'circle':'none',//单webview模式的下拉刷新
							callback: pulldownRefresh
						},
						up: {
							height:50,
							contentremore:'没有更多数据',
							callback: pullupRefresh
						}
					}
				});
				var count = 0;
				/**
				 * 下拉刷新具体业务实现
				 */
				var self = this;
				function pulldownRefresh() {
					setTimeout(function() {
            count = 0;
            self.data1.pageNo = 1;
            SZXJ.http(this, 'get', appPathList.moreReply+'?commentId='+self.commentId+'&pageNo='+self.data1.pageNo+'&pageSize='+self.data1.pageSize, {}, (res)=>{
               if(res.data != null){
               	 self.commen = res.data;
               }
            })
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					setTimeout(function() {
						self.data1.pageNo = self.data1.pageNo + 1;
						SZXJ.http(this, 'get', appPathList.moreReply+'?commentId='+self.commentId+'&pageNo='+self.data1.pageNo+'&pageSize='+self.data1.pageSize, {}, (res)=>{
              var list =res.data;
              if(list){
              	for(var i=0;i<list.length;i++){
		              self.commen.push(list[i]);
		            }
              }
//	            self.totalPage = res.data.totalPage;
	          },function(err){ 
	          })
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >self.count)); //参数为true代表没有更多数据了。
					}, 100);
				}
      });
    },
    filters:{
      reverse:function(value){
        var currentTime = new Date();
        let time = currentTime.getTime() - value;
        if(Math.floor(time/31536000000) > 0){
            return Math.floor(time/31536000000) + "年前";
        };
        if(Math.floor(time/2592000000) > 0){
            return Math.floor(time/2592000000) + "月前";
        };
        if(Math.floor(time/604800000) > 0){
            return Math.floor(time/604800000) + "周前";
        };
        if(Math.floor(time/86400000) > 0){
            return Math.floor(time/86400000) + "天前";
        };
        if(Math.floor(time/3600000) > 0){
            return Math.floor(time/3600000) + "小时前";
        };
        if(Math.floor(time/60000) > 0){
            return Math.floor(time/60000) + "分钟前";
        }
        if(Math.floor(time/1000) > 0){
            return Math.floor(time/1000) + "秒前";
        }else{
            return "0秒前";
        }
      },
    },
    methods:{
      replyFn:function(a,b,c,d){
//    		if(this.loginFlag){
		        if(window.plus){
		        	console.log('进入replay');
		          this.wn = plus.webview.create(appPathList.netWorks+'/replay/'+a+'&'+b+'&'+c+'&'+d,'replay',
		          {
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'发表回复','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.wn.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.wn.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
		          this.wn.show('slide-in-right');
		        }else{
//		          location.href = '/mView/replay/'+a+'&'+b+'&'+c;
		        }
//	        }else{
//	        	if(window.plus){
//	            this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',{'popGesture':'close'});
//	            this.webBook.show('slide-in-right');
//	          }else{
//	            location.href = "/mView/login";
//	          }
//	        }
      },
      goBack:function(){
        if(window.plus){
          this.webviewAnimation();
        }else{
          history.back();
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
				}, false);
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      getComment:function(_data){
        var self = this;
        console.log(this.bookId);
        if(this.bookId != ''){
        	SZXJ.http(this,'get',appPathList.acquireComment+'?commentId='+this.commentId+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize+'&status='+_data.status, {} ,(response)=>{
	//      	console.log(response);
	        	self.comment = response.data.data;
	        	self.count = Math.ceil(self.comment.replysCount/10); 
	        });
	        SZXJ.http(this, 'get', appPathList.moreReply+'?commentId='+this.commentId+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize, {}, (res)=>{
	        		self.commen = res.data;
	        });
        }else{
        	SZXJ.http(this,'get',appPathList.acquireComment+'?commentId='+this.commentId + '&activeId=' + _data.activeId +'&pageNum='+_data.pageNo+'&pageSize='+_data.pageSize+'&status='+_data.status, {} ,(response)=>{
	//      	console.log(response);
	        	self.comment = response.data.data;
	        	self.count = Math.ceil(self.comment.replysCount/10); 
	        });
	        SZXJ.http(this, 'get', appPathList.moreReply+'?commentId='+this.commentId+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize, {}, (res)=>{
	        		self.commen = res.data;
	        });
//      	var self = this;
//      	SZXJ.http(this,'get', appPathList.collectGetComment+'?activeId='+_data.activeId+'&pageNum='+_data.pageNo+'&pageSize='+_data.pageSize+'&sort='+_data.sort, {}, (res) => {
//	          console.log(res);
//	          self.commentList = res.data.data.list;
//	          for(var i = 1;i <= self.commentList.length;i++){
////	          	console.log(self.commentList[i].commentId == this.commentId);
//	          	if(this.commentList[i].commentId == this.commentId){
//	          		console.log(this.commentId)
//	          		self.comment = self.commentList[i];
//	          	}
////	          	if(self.commentList[i].commentId === self.commentId){
////	          		self.comment = self.commentList[i];
////		          	self.replyEntityList = self.commentList[i].replyEntityList;
////		          	for(var q = 1;q <= self.replyEntityList.length;q++){
////		          		self.commen = self.replyEntityList[q];
////		          	}
////	          	}
//	          	
////	          	console.log(self.replyEntityList)
//	         }
//	        })
        }
//    	SZXJ.http(this,'get', appPathList.getStatus, {}, (response) => {
//    		this.loginFlag = response.data.loginFlag;
//    		console.log(this.loginFlag);
//    	})
      }
    },
    head:{
      title: '评论详情-QC轻小说',
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
          { rel: 'stylesheet', href: '/css/main_app.css' },
          { rel: 'stylesheet', href: '/css/mui.min.css'}
      ],
      script:[
          {src:"/lib/resize_320.js"},
          {src:"/js/mui.min.js"}
      ]
    }
  }
</script>

<style>
	.tp{
		height: .171rem;
		background: white;
		position: fixed;
    width: 100%;
    top: 0;
    z-index: 25;
	}
  .header_comment{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 25;
  }
  .header_comment:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_comment .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_comment .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_comment .header_title{
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    width: 77.5%;
  }
  .header_comment .header_title span{
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
  .comment{
  	flex: 7;
  	position: absolute;
  	top: 0.8912rem;
  	left: 0;
  	right: 0;
  	bottom: 0.3584rem;
  	z-index: 15;
  }
  .comment_all{
    height: 0.7912rem;
    background-color: #fff;
    padding: 0.0853rem 0.128rem;
    box-sizing: border-box;
    border-bottom: .01rem solid #C3C3C3;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 20;
  }
  /*.comment_all:after{
  	height: .0853rem;
  	position: absolute;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	content: '';
  	background: #f2f2f2;
  },*/
  .comment_all .comment_user{
    display: inline-block;
    vertical-align: top;
    width: 12%;
    padding-right: 3%;
  }
  .comment_all .comment_user img{
  	width: 100%;
  }
  .comment_all .comment_details{
    display: inline-block;
    vertical-align: top;
    width: 85%;
  }
  .comment_all .comment_details .comment_content_header{
    font-size: 0.1024rem;
    padding: 0.0341rem 0;
  }
  .comment_all .comment_details .comment_content_header .comment_user_name{
    color: #848484;
    font-size: 0.1024rem;
  }
  .comment_all .comment_details .comment_user_time{
    font-size: 0.0938rem;
    color: #9d9d9d;
  }
  .comment_all .comment_details .comment_user_reply{
    color:#282828;
    font-size: 0.128rem;
    padding-top: 0.06826rem;
    line-height: 1.3;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
   .comment_all .comment_details .comment_user_reply p{
   	margin: 0;
   	height: .3rem;
    line-height: .16rem;
   }
  .comment .reply_list{
  }
  .comment .reply_list .reply_part{
    width: 100%;
    padding: .0853rem .128rem 0 .128rem;
    box-sizing: border-box;
  }
  .comment .reply_list .reply_part .reply_user{
    display: inline-block;
    vertical-align: top;
    width: 12%;
    padding-right: 3%;
  }
  .comment .reply_list .reply_part .reply_details{
    display: inline-block;
    vertical-align: top;
    width: 85%;
  }
  .comment .reply_list .reply_part .reply_details .reply_content_header{
    font-size: 0.1024rem;
    padding: 0.0341rem 0;
  }
  .comment .reply_list .reply_part .reply_details .reply_content_header .reply_user_name{
    color: #848484;
    font-size: 0.1024rem;
  }
  .comment .reply_list .reply_part .reply_details .reply_user_time{
    font-size: 0.0512rem;
    color: #9d9d9d;
  }
  .repxi{
  	width: 100%;
  	height: .008rem;
  	background: #F2F2F2;
  	padding-left: .128rem;
  	margin-top: .0853rem;
  }
  .comment .reply_list .reply_part .reply_details .reply_user_reply{
    color:#282828;
    font-size: 0.128rem;
    padding-top: 0.06826rem;
    line-height: 1.2;
    overflow: hidden;
  }
  .comment_bottom{
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.3584rem;
    background-color: #fedc6f;
    color: #fff;
    font-size: 0.128rem;
    text-align: center;
    z-index: 20;
  }
  .comment_bottom a{
    color: #fff;
    font-size: 0.128rem;
    padding: 0.128rem 0;
    display: inline-block;
  }
  .more{color:#777;font-size:.128rem;text-align:center;padding:2% 0;margin-bottom: 0.35rem;}
  .more span{display:inline-block;color:#777;margin:0 3%}
  .more .left{width:.25rem;border:.012rem solid #777;display:inline-block;vertical-align:middle}
</style>
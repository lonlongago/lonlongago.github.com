<template>
  <div style="font-size: 12px;">
  	<!--<div class="tp"></div>
    <div class="header_comment">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>全部评论</span>
      </div>
    </div>-->
    <div class="newComment">
      <div class="header_title" v-if="this.bookId != ''">最新评论</div>
      <div class="header_title" v-else>活动评论</div>
      <a href="javascript:;" style="color: #989898; float: right;font-size: 0.1195rem;">{{comments}}条</a>
    </div>
    <div class="comment_list mui-content mui-scroll-wrapper" id="pullrefresh">
    	<div class="mui-scroll">
    		<div class="mui-table-view mui-table-view-chevron">
		      <div class="comment_part " v-for="(temp,index) in comment" :style="index==comment.length - 1?'':''">
		        <div class="comment_user">
		          <img :src="Path.imagePath + temp.userHead" style="border-radius: 100%;" onerror="javascript:this.src='data:image/jpeg;base64,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';"/>
		          <!--<img src="/img/app_newBook/people.png" style="border-radius: 100%;"/>-->
		        </div>
		        <div class="comment_content">
		          <div class="comment_content_header" @tap="joinCommentDetails(temp.commentId)">
		            <span class="comment_user_name">{{temp.userName}}</span>
		            <span class="comment_user_time">{{temp.commentDate | reverse}}</span>
		          </div>
		          <div class="comment_user_reply" v-html="temp.commentContent" style="line-height: 1.3;">{{temp.commentContent}}</div>
		          <div v-if="temp.bookId != null">
			          <div class="comment_other_reply" v-if="temp.replyEntityList.length!=0">
			            <div class="comment_reply_part" >
			              <div class="user_comment" >
			                <div class="user_comment" v-for="(obj,index) in temp.replyEntityList" v-if="index<2">
			                  <div v-if="obj.replyStatus==0" style="padding-bottom: .128rem;display: inline-block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
			                    <span>
			                      <span style="font-size: 0.1024rem;">{{obj.userName}}</span>:
			                    </span>
			                    <span v-html="obj.replyContent" style="font-size: 0.1024rem;white-space:normal;color: #656565;"></span>
			                  </div>
			                  <div v-if="obj.replyStatus==1" style="padding-bottom: .128rem;display: inline-block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
			                    <span class="aite_user" >
			                      <span style="font-size: 0.1024rem;">{{obj.userName}}</span>
			                      <span style="color: lightskyblue;">@</span>
			                      <span style="font-size: 0.1024rem;">{{obj.replyUserName}}</span>:
			                    </span>
			                    <span v-html="obj.replyContent" style="color: #656565;white-space:normal"></span>
			                  </div>
			                </div>
			              </div>
			            </div>
			            <a href="javascript:;" @tap="joinCommentDetails(temp.commentId)" class="comment_reply_count" style="font-size: 0.1024rem;">共{{temp.replyEntityList.length}}条回复</a>
			          </div>
		          </div>
		          <div v-else>
			          <div class="comment_other_reply" v-if="temp.replyEntityList!=null">
			            <div class="comment_reply_part" >
			              <div class="user_comment" >
			                <div class="user_comment" v-for="(obj,index) in temp.replyEntityList" v-if="index<2">
			                  <div v-if="obj.replyStatus==0" style="padding-bottom: .128rem;display: inline-block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
			                    <span>
			                      <span style="font-size: 0.1024rem;">{{obj.userName}}</span>:
			                    </span>
			                    <span v-html="obj.replyContent" style="font-size: 0.1024rem;white-space:normal;color: #656565;"></span>
			                  </div>
			                  <div v-if="obj.replyStatus==1" style="padding-bottom: .128rem;display: inline-block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
			                    <span class="aite_user" >
			                      <span style="font-size: 0.1024rem;">{{obj.userName}}</span>
			                      <span style="color: lightskyblue;">@</span>
			                      <span style="font-size: 0.1024rem;">{{obj.replyUserName}}</span>:
			                    </span>
			                    <span v-html="obj.replyContent" style="color: #656565;white-space:normal"></span>
			                  </div>
			                </div>
			              </div>
			            </div>
			            <a href="javascript:;" @tap="joinCommentDetails(temp.commentId)" class="comment_reply_count" style="font-size: 0.1024rem;">共{{temp.replyEntityList.length}}条回复</a>
			          </div>
		          </div>
		        </div>
		      </div>
		    </div>  
      </div>
    </div>
    <div class="comment_bottom btn" @tap="commentFn(bookId)">
      <a href="javascript:;" >发表评论</a>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp"
  export default{
    asyncData:function(context){
      var obj = {};
      obj.bookId = context.params.id;
      return obj
    },
    data:function(){
      return {
      	Path:appPathList,
        bookId:'',
        comment:[],
        commentCount:10,
        comments:10,
        offsetHeight:0,
        clientHeight:0,
        srcollTop:0,
        srcollH:0,
        topFlag:false,
        isTop:false,
        updateFlag:false,
        number:1,
        data1:{
        	activeId:2,
          bookId:0,
          pageNo:1,
          pageSize:10,
          status:0,
          sort:1
        },
        max:1000,
        control:1,
        numBer:0,
        ws:{},
        wn:{}
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.data1.bookId = this.bookId;
        console.log(this.bookId)
        this.getComment(this.data1);
	    	if(window.plus){
		        this.plusReady();
		    }else{
		        document.addEventListener('plusready', this.plusReady, false);
		    }
				if(this.bookId != ''){
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
	            SZXJ.http(this,'get', appPathList.findCommentAndReply+'?bookId='+self.bookId+'&pageNo='+self.data1.pageNo+'&pageSize='+self.data1.pageSize+'&status='+self.data1.status, {}, (res) => {
	              self.comment = res.data.comment;
		          },function(err){ 
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
							SZXJ.http(this,'get', appPathList.findCommentAndReply+'?bookId='+self.bookId+'&pageNo='+self.data1.pageNo+'&pageSize='+self.data1.pageSize+'&status='+self.data1.status, {}, (res) => {
	              var list =res.data.comment;
	              console.log(list);
		            for(var i=0;i<list.length;i++){
		              self.comment.push(list[i]);
		            }
		            self.commentCount = Math.ceil(res.data.totalCount/10);;
		          },function(err){ 
		          })
							mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= self.commentCount)); //参数为true代表没有更多数据了。
						}, 100);
					}
				}else{
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
	            SZXJ.http(this,'get', appPathList.collectGetComment+'?activeId='+self.data1.activeId+'&pageNum='+self.data1.pageNo+'&pageSize='+self.data1.pageSize+'&sort='+self.data1.sort, {}, (res) => {
	              self.comment = res.data.data.list;
		          },function(err){ 
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
							SZXJ.http(this,'get', appPathList.collectGetComment+'?activeId='+self.data1.activeId+'&pageNum='+self.data1.pageNo+'&pageSize='+self.data1.pageSize+'&sort='+self.data1.sort, {}, (res) => {
	              var list =res.data.data.list;
	              console.log(list);
		            for(var i=0;i<list.length;i++){
		              self.comment.push(list[i]);
		            }
		            self.commentCount = Math.ceil(res.data.data.total/10);;
		          },function(err){ 
		          })
							mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= self.commentCount)); //参数为true代表没有更多数据了。
						}, 100);
					}
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
//    onscrollFn:function(){  
//        this.offsetHeight = document.documentElement.offsetHeight;   // 页面总高度
//        this.clientHeight = document.documentElement.clientHeight;   // 可视区高度
//        this.srcollTop  = document.documentElement.scrollTop || document.body.scrollTop ;   //滚动条的高度 
//        this.srcollH  = document.body.scrollHeight;
//        if(this.control !=1 ){
//          return
//        }
//        if ( this.offsetHeight - this.clientHeight  <  this.srcollTop + 300  ) {
//          this.control = 2;
//          this.lastupdataFn();  
//        };
//        var self = this
//        setTimeout(function(){
//          self.control = 1;
//        },500)
//        if( this.srcollTop >= this.clientHeight ){
//            this.topFlag = true;
//        }else{
//            this.topFlag = false;
//        };
//        if(!this.isTop){
//          clearInterval(this.timer);
//        } 
//        this.isTop = false;
//    },
//    lastupdataFn:function(){
//      this.data1.pageNo = this.data1.pageNo +1;
////      console.log(this.max);
//      if(this.data1.pageNo < this.max){
//        this.getComment(this.data1);
//      }else{
//      }
//    },
      getComment:function(_data){
        var self = this;
//      if(this.numBer < 1){
//        this.updateFlag = false;
//      }else{
//        this.updateFlag = true;
//      }
        this.data1.pageNo = 1;
        if(self.bookId != ''){
        	SZXJ.http(this,'get', appPathList.findCommentAndReply+'?bookId='+self.bookId+'&pageNo='+this.data1.pageNo+'&pageSize='+this.data1.pageSize+'&status='+this.data1.status, {}, (res) => {
	          self.commentCount = Math.ceil(res.data.totalCount/10);
	          console.log(self.commentCount);
	          self.numBer = res.data.comment.length;
	          self.comments = res.data.totalCount;
	          console.log(self.numBer);
	          if(self.numBer!=0){
	          	console.log(1121);
	            for( var i = 0 ; i < self.numBer ; i++  ){
	              self.comment.push(res.data.comment[i]);
	            }
	          }else{
	            self.max = self.data1.pageNo;
	          }
	        })
        }else{
        	SZXJ.http(this,'get', appPathList.collectGetComment+'?activeId='+this.data1.activeId+'&pageNum='+this.data1.pageNo+'&pageSize='+this.data1.pageSize+'&sort='+this.data1.sort, {}, (res) => {
	          console.log(res)
	          self.commentCount = Math.ceil(res.data.data.total/10);
	          console.log(self.commentCount);
	          self.numBer = res.data.data.list.length;
	          self.comments = res.data.data.total;
	          console.log(self.numBer);
	          if(self.numBer!=0){
	          	console.log(1121);
	            for( var i = 0 ; i < self.numBer ; i++  ){
	              self.comment.push(res.data.data.list[i]);
	            }
	          }else{
	            self.max = self.data1.pageNo;
	          }
	        })
        }
      },
      commentFn:function(a){
        SZXJ.http(this,'get', appPathList.getStatus, {}, (res) => {
          if(res.data.loginFlag){
          	if(window.plus){
          		this.webBook = plus.webview.create(appPathList.netWorks+'/comment/'+a,'comment',
          		{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'发表评论','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
//        		location.href = '/mView/comment/'+a;
          	}
          }else{
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
//	            location.href = "/mView/login";
	          }
          }
        })
      },
      joinCommentDetails:function(a){
        SZXJ.http(this,'get', appPathList.getStatus, {}, (res) => {
          console.log(res)
          if(res.data.loginFlag){
          	if(window.plus){
          		this.webBook = plus.webview.create(appPathList.netWorks+'/commentDetails/'+a+'&'+this.bookId,'commentDetails',
          		{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'评论详情','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
//        		location.href = '/mView/commentDetails/'+a+'&'+this.bookId;
          	}
          }else{
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
//	            location.href = "/mView/login";
	          }
          }
        })
      }
    },
    head:{
      title: '书籍页-QC轻小说',
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
		background: white;
		height: .171rem;
		position: fixed;
		z-index: 25;
		top: 0;
		width: 100%;
	}
	.mui-table-view{
		background-color: #F2F2F2!important;
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
  .newComment{
    background-color: #f2f2f2;
    position: fixed; top: 0;left: 0;right: 0;
    min-height: 0.128rem;
    padding: 0.128rem;
    z-index: 25;
    border-bottom: 1px solid #c3c3c3;
  }
  /*.newComment{
    position: relative;
    min-height: 0.128rem;
    padding: 0.128rem;
  }*/
  .newComment  .header_title{
    float: left;
    font-size: 0.1195rem;
    font-weight: 500;
  }
  .comment_list{
    /*margin-top: 0.8878rem;*/
    box-sizing: border-box;
    margin-top: .375rem;
    /*padding: 0 0.128rem;*/
    margin-bottom: 0.3584rem;
  }
  .comment_list .comment_part{
    padding: .128rem .128rem .1024rem;
    position: relative;
    background-color: white;
    margin-top: 1px;
  }
  /*.comment_list .comment_part:after{
    content: '';
    position: absolute;
    left: 0rem;
    right: 0rem;
    bottom: 0;
    height: 1px;
    background-color: #ccc;
  }*/
  .comment_list .comment_part .comment_user{
    display: inline-block;
    width: 12%;
    /*height: 0.2731rem;*/
    /*margin-right: 0.0512rem;*/
    padding-right: 3%;
    vertical-align: top;
  }
  .comment_list .comment_part .comment_user img{
    width: 100%;
    height: 100%;
  }
  .comment_list .comment_part .comment_content{
    display: inline-block;
    width: 88%;
    /*min-height: 0.5rem;*/
    /*background-color: #92C202;*/
    vertical-align: top;
  }
  .comment_list .comment_part .comment_content .comment_content_header{
    height: 0.1024rem;
    width: 100%;
    font-size: 0.1024rem;
    padding-bottom: 0.0512rem;
  }
  .comment_list .comment_part .comment_content .comment_content_header .comment_user_name{
    font-size: 0.11093rem;
    float: left;
  }
  .comment_list .comment_part .comment_content .comment_content_header .comment_user_time{
    font-size: 0.1024rem;
    float: right;
    color: #989898;
  }
  .comment_list .comment_part .comment_content .comment_user_reply{
    font-size: 0.1024rem;
    padding: .128rem 0;
    color: #656565;
    /*padding-bottom: 0.0512rem;*/
  }
  .comment_list .comment_part .comment_content .comment_user_reply p{
    /*font-size: 0.128rem;*/
    /*padding-bottom: 0.0512rem;*/
    /*line-height: 1.3;*/
    line-height: .128rem;
  }
  p{
  	line-height: .128rem!important;
  	color: #656565!important;
  }
  .comment_list .comment_part .comment_content .comment_other_reply{
    /*min-height: 0.8rem;*/
    background-color: #f2f2f2;
    /*padding: 0.0853rem;*/
    padding: .128rem .0853rem;
    border-radius: .03813rem;
  }
  .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_part{
    /*padding: 0.0256rem 0;*/
  }
  .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_part span{
    font-size: 0.0853rem;
  }
  .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_count{
    color: #43d8ff;
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
  }
  .comment_bottom a{
    color: #fff;
    font-size: 0.128rem;
    padding: 0.128rem 0;
    display: inline-block;
  }
  .more{color:#777;font-size:.128rem;text-align:center;padding:2% 0;margin-bottom: 0.5rem;}
  .more span{display:inline-block;color:#777;margin:0 3%}
  .more .left{width:.25rem;border:.012rem solid #777;display:inline-block;vertical-align:middle}
  .loadingWait{text-align: center;height: 0.8rem;position: relative;}
  .loadingWait img{
    vertical-align: baseline;
    position: absolute;
    box-sizing: border-box;
    height: .2rem;
    width: auto;
    right: 56%;}
  .loadingWait span{    
    color: #777;
    display: inline-block;
    right: 30%;
    font-size: 0.128rem;
    }
</style>
<template>
  <div style="font-size: 12px;position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: #f2f2f2;">
    
		  <div class="content_header">
		    	<a href="javascript:;" class="time" @click="tapMove(1)">
		        <div :style="active==1?'color:#ffd700;':''">轻小说</div>
		        <span :class="active==1?'active hr':'hr'"></span>
		      </a>
		      <a href="javascript:;" class="time" @click="tapMove(2)">
		        <div :style="active==2?'color:#ffd700;':''">画集</div>
		        <span :class="active==2?'active hr':'hr'"></span>
		      </a>
		  </div>
		  <div class="all_content">
		  	<div class="tag_part" style="background-color:#f2f2f2" v-show="!tagNumBol">
	          <div class="tag_header">
	                   热门标签
	          </div>
	          <div class="tag_list">
	            <span v-for="(obj,index) in searchList" @click="searchSpanFn(obj)">{{obj}}</span>
	          </div>
	      </div>
	      <div class="mui-content mui-scroll-wrapper" ref="allContent" id="pullrefresh" v-show="tagNumBol">
	      	<div class="mui-scroll" style="background-color: #f2f2f2;">
		        <div class="book_content_part mui-table-view mui-table-view-chevron" style="background-color:#f2f2f2" v-if="active == 1">
		          <a class="book_part" v-for="(obj,index) in bookInfo"  @tap="joinBookFn(obj.bookId,obj.bookName)" href="javascript:;">
		            <div class="part_img">
		              <img :src="path.imagePath+obj.bookCoverImage" />
		            </div>
		            <div class="part_content">
		              <div class="part_title">{{obj.bookName}}</div>
		              <div style="height: 0.6485rem; position: relative;">
		                <div class="part_intro">{{obj.bookIntroduction}}</div>
		              </div>
		              <div class="part_other">
		                <div class="part_icon">
		                  <img src="http://cdn.qcacg.com/mobile/img/app_ranking/my.png" />
		                </div>
		                <div class="part_author">{{obj.author}}</div>
		                <div class="part_type">
		                  <span v-for="(temp,ind) in obj.bookTypeList" v-if="ind<3">{{temp.bookTypeName}}</span>
		                </div>
		              </div>
		            </div>
		          </a>
		        </div>
		        <div class="art_part mui-table-view mui-table-view-chevron" style="background-color:#f2f2f2" v-if="active == 2"></div>
		      </div>  
	      </div>
	      <transition name="fade">
	      	<div class="sear" v-if="searBol">敬请期待</div>
	      </transition>
		  </div>
		 
  </div>
</template>

<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  export default{
    data:function(){
      return {
        path:Path,
        content:'',
        activeTab: 'tab1',
        tagNum:0,
        bookInfo:[],
        RequestObj: {
          sort: 0, // 排序 ： id
          bookTypeId: '', // 分类 id
          wordMin: 0,
          wordMax: '',
          isSign: 0,
          Keyword: '', // 搜索的书名
          pageNo: 1, // 页码
          pageSize:12,
        },
        searchList:[],
        scrollHeight:0,
        clientHeight:0,
        scrollTop:0,
        ctrollBol:true,
        totalPage:50,
        numBer:0,
        ws:{},
        wn:{},
        view:{},
        mWidth:0,
        active:1,
        searBol:false,
        tagNumBol:false
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getTag();
        this.mWidth = window.innerWidth;
		    if(window.plus){
		        this.plusReady();
		    }else{
		        document.addEventListener('plusready', this.plusReady, false);
		    }
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
							callback: pulldownRefresh,
						},
						up: {
							height:50,
							contentdown: "",
							contentrefresh: "",
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
//						console.log(12323);
            count = 0;
            self.getContent();
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					setTimeout(function() {
						self.RequestObj.pageNo = self.RequestObj.pageNo + 1;
						SZXJ.http(this,'get', Path.queryBookClass+'?sort='+self.RequestObj.sort+'&bookTypeId='+self.RequestObj.bookTypeId+'&wordMin='+self.RequestObj.wordMin+'&wordMax='+self.RequestObj.wordMax+'&isSign='+self.RequestObj.isSign+'&Keyword='+self.RequestObj.Keyword+'&pageNo='+self.RequestObj.pageNo+'&pageSize='+self.RequestObj.pageSize, {}, (res)=>{
              var list =res.data.bookInfo;
              if(list){
              	for(var i=0;i<list.length;i++){
		              self.bookInfo.push(list[i]);
		            }
              }
	            self.totalPage = res.data.totalPage;
	          },function(err){ 
	          })
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= self.totalPage)); //参数为true代表没有更多数据了。
					}, 100);
				}
	    })
    },
    methods:{
      searchFn:function(e){
      	var self = this;
      	if(e.clientX<self.mWidth-109){
      		return
      	}
      	this.content = this.view.getInputValueById('sousuo');
        this.getContent();
      },
      searchSpanFn:function(val){
        this.content = val; 
        this.getContent();
      },
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
	      this.view = this.ws.getTitleNView();
	      this.view.drawText('搜索',{top:'0px',left:(self.mWidth-59).toString()+'px',width:'50px',height:'44px'},{size:'15px'})
		    this.view.drawRect({color:'#f2f2f2',radius:'4px'}, {top:'7px',left:'50px',width:(self.mWidth-109).toString()+'px',height:'30px'});
		    this.view.drawBitmap('_www/img/search.png',{top:'0px',left:'0px',width:'100%',height:'100%'}, {top:'12px',left:'55px',width:'20px',height:'20px'})
		    this.view.drawInput({top:'8px',left:'80px',width:(self.mWidth-149).toString()+'px',height:'28px'},{borderColor:'#f2f2f2',placeholder:'请输入搜索内容',fontSize:'16px'},'sousuo');
//			  this.view.setTouchEventRect({top:'0px',left:(self.mWidth-59).toString()+'px',width:'50px',height:'44px'});
	      this.view.interceptTouchEvent(true);
	      this.view.addEventListener("touchend",self.searchFn, false);
	    },
	    webviewAnimation:function(){
	      this.ws.hide('slide-out-right');
	    },
	    joinBookFn:function(bookId,bookName){
	    	if(window.plus){
	    		this.wn = plus.webview.create(Path.netWorks+"/book/"+bookId,'book',
	    		{
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
		        'statusbar':{'background':'#ffffff'},
		        "backButtonAutoControl":'close'
	        });
	        this.wn.onloading= function(){
						plus.nativeUI.showWaiting();
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
	    		this.wn.show('slide-in-right');
	    	}else{
//	    		location.href = "/mView/book/"+bookId;
	    	}
	    },
	    tapMove:function(a){
        this.active = a;
        if( a == 1){
        	this.searBol = false;
//        this.getTag();
        }else if(a == 2){
        	this.searBol = true;
//      	this.$refs.appAlert.setMessage('此功能暂不开放');
//      	if(window.plus){
//	    			plus.nativeUI.toast( "此功能暂不开放");
//	    		}
//        this.tapMove(1);
        }
      },
      getTag: function() {
          SZXJ.http(this, 'get', Path.keyWord, {}, (res)=>{
              this.searchList = res.data.data;
          });
      },
      getContent:function(){
        this.RequestObj.Keyword = this.content;
        this.RequestObj.pageNo = 1;
        SZXJ.http(this,'get', Path.queryBookClass+'?sort='+this.RequestObj.sort+'&bookTypeId='+this.RequestObj.bookTypeId+'&wordMin='+this.RequestObj.wordMin+'&wordMax='+this.RequestObj.wordMax+'&isSign='+this.RequestObj.isSign+'&Keyword='+this.RequestObj.Keyword+'&pageNo='+this.RequestObj.pageNo+'&pageSize='+this.RequestObj.pageSize, {}, (response)=>{
            this.bookInfo = response.data.bookInfo;
            if(this.bookInfo==null){
              this.tagNumBol=false;
              if(window.plus){
			    			plus.nativeUI.toast( "没有搜到相关的内容");
			    		}
            }else{
              this.tagNumBol =true;
            }
            
        });
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
	.bttn{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}
	.bttn:hover{outline:0;cursor:pointer}
	.bttn:focus{outline:0;cursor:pointer}
	.bttn:active{-webkit-box-shadow:inset 0 0 1px rgba(0,0,0,.3);box-shadow:inset 0 0 1px rgba(0,0,0,.3)}
	.active{border-bottom: 0.0213rem solid #ffd700;border-radius: 3px;}
	.time{position:relative;display: inline-block;width: 50%;vertical-align: middle;line-height: 0.2475rem;text-align: center;font-size: 0.128rem;color: #fff; padding: 0.1152rem 0;}
	.hr{display:inline-block;position: absolute;bottom:0;left:37%;width: 26%;}
  .sear{margin-top: 35%;font-size: .128rem;text-align: center;}
  .fade-enter-active, .fade-leave-active {
    	transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
	    opacity: 0;
	}
  .tab{
    background-color: #fff !important;
    height: 0.3584rem;
    box-sizing: border-box;
  }
 .content_header{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /*box-shadow: 0 0.01707rem 0.01707rem #888;*/
    padding-bottom: 0.0456rem;
    z-index: 20;
    background-color: #fff;
  }
  .content_header:after{
  	content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: .0072rem;
    width: 100%;
    background-color: #c3c3c3;
  }
  .mu-tab-active *{
    color: #fedc6f !important;
  }
  .mu-tab-text{
    font-size: 0.128rem !important;
  }
 .all_content{
    position: absolute;
    top: 0.3584rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f2f2f2;
  }
 .all_content .tag_part{
    padding: 0.128rem;
    box-sizing: border-box;
    width: 100%;
  }
 .all_content .tag_part .tag_header{
    font-size: 0.1195rem;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_ranking/tag.png);
    background-repeat: no-repeat;
    background-size: auto 0.1195rem;
    background-position: 0.640rem;
    
  }
 .all_content .tag_part .tag_list{
    padding: 0.128rem 0;
    box-sizing: border-box;
  }
 .all_content .tag_part .tag_list span{
    display: inline-block;
    vertical-align: top;
    padding: 0.0430rem 0.128rem 0.0424rem 0.128rem;
    font-size: 0.1195rem;
    border-radius: 0.1024rem;
    color: #fff;
    background-color: #8bcffb;
    margin-right: 0.2133rem;
    margin-bottom: 0.0512rem;
  }
 .all_content .book_content_part{
    
  }
 .all_content .book_content_part .book_part{
    padding: 0.128rem;
    box-sizing: border-box;
    margin-top: 1px;  
    background-color: #fff;
    display: block;
  }
 .all_content .book_content_part .book_part .part_img{
    width: 0.6229rem;
    height: 0.9045rem;
    display: inline-block;
    margin-right: 0.128rem;
    vertical-align: top;
  }
 .all_content .book_content_part .book_part .part_img img{
    width: 0.6229rem;
    height: 0.9045rem;
    border-radius: 4px;
  }
 .all_content .book_content_part .book_part .part_content{
    display: inline-block;
    height: 0.9045rem;
    width: 2.1930rem;
    vertical-align: top;
  }
 .all_content .book_content_part .book_part .part_content .part_intro{
    line-height: 1.8;
    font-size: 0.1109rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
 .all_content .book_content_part .book_part .part_content .part_title{
    font-size: 0.128rem;
    height: 0.128rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
  }
 .all_content .book_content_part .book_part .part_content .part_other{
    height: 0.128rem;
  }
 .all_content .book_content_part .book_part .part_content .part_other .part_icon{
    width: 10%;
    height: 0.128rem;
    display: inline-block;
    vertical-align: bottom;
    
  }
 .all_content .book_content_part .book_part .part_content .part_other .part_icon img{
    width: 0.1195rem;
  }
 .all_content .book_content_part .book_part .part_content .part_other .part_author{
    display: inline-block;
    width: 40%;
    font-size: 0.1109rem;
    box-sizing: border-box;
    vertical-align: bottom;
    height: 0.128rem;
    padding-top: 0.02rem;
    color: #989898;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
  }
 .all_content .book_content_part .book_part .part_content .part_other .part_type{
    display: inline-block;
    width: 40%;
    vertical-align: bottom;
    text-align: right;
  } 
 .all_content .book_content_part .book_part .part_content .part_other .part_type span{
    font-size: 0.1024rem;
    padding: 0.0048rem 0.0256rem 0.0034rem 0.0256rem;
    border: 1px solid #c3c3c3;
    border-radius: 2px;
    margin-left: 0.019rem;
    color: #989898;
    display: inline-block;
  }
  .more{color:#777;font-size:.128rem;text-align:center;padding:2% 0; position: absolute; bottom: 0.256rem; left: 0; right: 0; background-color: #fff;}
  .more span{display:inline-block;color:#777;margin:0 3%}
  .more .left{width:.25rem;border:.012rem solid #777;display:inline-block;vertical-align:middle}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  /*修改过的插件样式*/
  /*.mu-ripple-wrapper{
    overflow: hidden !important;
    background-color: #fff !important;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }*/
</style>
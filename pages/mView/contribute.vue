<template>
<div style="font-size: 12px;">
	<!--<div class="tp"></div>-->
  <!--<div class="header_ReadBook">
    <div class="header_C1" @click = "goBack()">
      <div class="header_back"></div>
    </div>
    <div class="header_Text"><span>发布投稿</span></div>
    <div class="header_C">
        <div class="addCollect btn" @click="createWorks()">创建</div>
    </div> 
  </div>-->
  <div class="content">
    <div class="book_part btn" v-for = "(obj,index) in bookList" @click = "moveBookAdd(obj.bookId,obj.bookName)">
      <div class="book_msg">
        <div class="book_img">
          <img :src = "Path.imagePath+obj.bookCoverImage" style="width: 100%; height: 100%; border-radius: 4px;"/>
        </div>
        <div class="book_other_msg">
          <div class="book_msg_title">
            <div class="book_name">{{obj.bookName}}</div>
            <!--<div class="book_status" v-if="obj.bookSilverCoins==0" style="background-color: #c3c3c3;">已下架</div>
            <div class="book_status" v-if="obj.bookSilverCoins==1" style="background-color: #c3c3c3;">未认证</div>
            <div class="book_status" v-if="obj.bookSilverCoins==2">已认证</div>
            <div class="book_status" v-if="obj.bookSilverCoins==3">已审核</div>-->
            <div class="book_status">{{obj.bookReviewStatus}}</div>
          </div>
          <div class="book_author marginTop"><span>作者：</span>{{userName}}</div>
          <div class="book_author marginTop">
            <span>状态：</span>
            <span v-if="obj.updateCycle==1" style="color: #323232;">日更中</span>
            <span v-if="obj.updateCycle==2" style="color: #323232;">月更中</span>
          </div>
          <div class="book_author marginTop">
            <span>分类：</span>
            <span style="color: #323232;">{{obj.booKTypeList | list}}</span>
          </div>
          <div class="book_introduce marginTop"><span>简介：</span><span style="float: none; color: #000;width: 100%;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;word-break: break-all;line-height: 1.2;">{{obj.bookIntroduction}}</span></div>
        </div>
      </div>
      <div class="book_num">
        <div class="book_num_part" style="text-align: left;">
          <span>点击：</span><span>{{obj.bookHit | reverse}}</span>
        </div>
        <div class="book_num_part">
          <span>收藏：</span><span>{{obj.bookCollect | reverse}}</span>
        </div>
        <div class="book_num_part" style="text-align: right;">
          <span>字数：</span><span>{{obj.bookWordCount | reverse}}</span>
        </div>
      </div>
    </div>
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
        sign:false,
        status:3,
        bookList:[],
        Path:appPathList,
        userName:'',
        height:'',
        ws:{},
        wn:{},
        view:{},
        mHeight:0,
      }
    },
    filters:{
      reverse:function(value){
        var num = value/10000;
        if(num<1){
          return value
        }else{
          return parseInt(num)+'万'  
        }
      },
      list:function(value){
        if(value==null){
          return '未分类'
        }else{
          var str = '';
          for(var i=0;i<value.length;i++){
            if(i==0){
              str = value[i]; 
            }else{
              str = str +'/' +value[i]; 
            }
          }
          return str
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getStatusFn();
        this.getBookListFn();
        this.mWidth = window.innerWidth;
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
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
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      plusReady:function(){
        var self = this;
        this.ws = plus.webview.currentWebview();
        this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
	        console.log('reject url: '+e.url);
	    });
        this.view = this.ws.getTitleNView();
        this.view.drawRect({color:'#2ec0ff',radius:'2px'}, {top:'8px',left:(this.mWidth-65).toString(),width:'50px',height:'28px'});
        this.view.drawText('创建', {top:'0px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'44px'}, {size:'14px',color:'#fff'});
//	      this.view.setTouchEventRect({top:'0px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'44px'});
        this.view.interceptTouchEvent(true);
				this.view.addEventListener("click", self.createWorks, false);
				plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right")
				}, false);
      },
      createWorks:function(e){
        if(e.clientX>=this.mWidth-65){
	          this.wn = plus.webview.create(appPathList.netWorks+'/newbooks','newsbooks',
	          {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'新建书籍',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
        }
      },
      moveBookAdd:function(bookId,bookName){
        if(window.plus){
          this.wn = plus.webview.create(appPathList.netWorks+'/bookDetail/'+bookId,'bookDetail',
          {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
	        });
	        this.wn.onloading= function(){
							plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
						}
						this.wn.onloaded=function(){
							plus.nativeUI.closeWaiting();
						}
//	        this.view.hide();
          this.wn.show('slide-in-right');
        }else{
//        location.href = '/mView/bookDetail/'+bookId;
        }
      },
      getBookListFn: function() {
        var _data = {};
        SZXJ.http(this,'get', appPathList.findBookByUser, {}, (response) => {            
          this.bookList = response.data;
        });
      },
      getStatusFn:function(){
        SZXJ.http(this,'get', appPathList.getStatus, {}, (response) => {
          this.userName = response.data.status.userName;
        })
      }
    },
    head:{
      title: '投稿页-QC轻小说',
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
	.tp{
		background: white;
		height: .171rem;
		position: fixed;
		z-index: 30;
		width: 100%;
	}
  .header_ReadBook {
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 30;
  }
  .header_ReadBook:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_ReadBook .header_C {
    float: left;
    min-width: 0.66rem;
    height: 100%; 
    text-align: center;
    overflow: hidden;
    width: 20.625%;
  }
  .header_ReadBook .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_ReadBook .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_ReadBook .header_C .addCollect {
    background-color: #2ec0ff;
    display: inline-block;
    /*height: 0.1962rem;*/
    width: 0.5034rem;
    border-radius: 3px;
    color: #FFFFFF;
    margin-top: 0.0792rem;
    margin-bottom: 0.0792rem;
    padding-top: 0.04rem;
    padding-bottom: 0.04rem;
    line-height: 0.12rem;
    font-size: 0.128rem;
  }
  .header_ReadBook .header_Text {
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    /*text-align: center;*/
    width: 68.125%;
  }
  .header_ReadBook .header_Text span{
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
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    /*margin-top: 0.5294rem;*/
    min-height: 6rem;
    background-color: #f2f2f2;
    box-sizing: border-box;
    padding: 0 0.128rem 0.256rem 0.128rem;
  }
  .content .book_part{
    width: 100%;
    min-height: 1.5019rem;
    background-color: #fff;
    margin-top: 0.1024rem;
    padding: 0.128rem 0.0853rem 0 0.0853rem;
    box-sizing: border-box;
  }
  .content .book_part .book_msg{
    height: 1.0325rem;
    width: 100%;
  }
  .content .book_part .book_msg .book_img{
    width: 0.7253rem;
    height: 1.0325rem;
    background-color: #323232;
    border-radius: 4px;
    margin-right: 0.1195rem;
    display: inline-block;
  }
  .content .book_part .book_msg .book_other_msg{
    display: inline-block;
    height: 1.0325rem;
    width: 1.9285rem;
    float: right;
  }
  .content .book_part .book_msg .book_other_msg .book_msg_title{
    height: 0.1195rem;
    width: 100%;
  }
  .content .book_part .book_msg .book_other_msg .book_msg_title .book_status{
    float: right;
    background-color: #ffc200;
    width: 0.3413rem;
    height: 0.1195rem;
    font-size: 0.0853rem;
    text-align: center;
    line-height: 0.1200rem;
    color: #fff;
    border-radius: 3px;
  }
  .content .book_part .book_msg .book_other_msg .book_msg_title .book_name{
    width: 60%;
    height: 0.1195rem;
    font-size: 0.1190rem;
    display: inline-block;
    overflow: hidden;
    word-break: keep-all;
    text-overflow: ellipsis;
  }
  .content .book_part .book_msg .book_other_msg .book_author{
    height: 0.1024rem;
    font-size: 0.1024rem;
  }
  .content .book_part .book_msg .book_other_msg .book_introduce{
    font-size: 0.1024rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .content .book_part .book_msg .book_other_msg span{
    color: #ff8383;
  }
  .content .book_part .book_num{
    padding: 0.128rem 0;
    display: flex;
  }
  .content .book_part .book_num .book_num_part{
    flex: 1;
    flex-direction: column;
    text-align: center;
  }
  .content .book_part .book_num .book_num_part span{
    font-size: 0.0853rem;
    color: #989898;
  }
  .marginTop{
    margin-top: 0.0853rem;
  }
</style>
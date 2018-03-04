<template>
  <div style="font-size: 12px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background-color: #f2f2f2;">
    <!--<div class="content">-->
      <div class="type_time">
        <div class="type_time_part" @click="setTypeBol()">
          <span :class="selBol1?'time_select':'type_select'">分类</span>
        </div>
        <div class="type_time_part" @click="setTimeBol()">
          <span :class="selBol2?'time_select':'type_select'">时间</span>
        </div>
      </div>
      <div style="position: absolute; left: 0; right: 0; top: 0.3925rem; bottom: 0;-webkit-overflow-scrolling: touch;">
      	<div id="pullrefresh" class="book_content mui-content mui-scroll-wrapper" ref="bookContent">
	        <div class="mui-scroll">
		        <div class="book_list mui-table-view mui-table-view-chevron">
		          <a class="book_part " v-for="(obj,index) in bookList" href="javascript:;" @tap="joinBook(obj.bookId,obj.bookName)">
		            <div class="part_img">
		              <img :src="path.imagePath+obj.bookCoverImage" />
		            </div>
		            <div class="part_content">
		              <div class="part_title" v-if="index>=3">{{index+1}}.{{obj.bookName}}</div>
		              <div class="part_title" v-if="index  < 3">
		              	<span v-if="index  == 0" class="ind1">{{index+1}}.{{obj.bookName}}</span>
		              	<span v-if="index  == 1" class="ind2">{{index+1}}.{{obj.bookName}}</span>
		              	<span v-if="index  == 2" class="ind3">{{index+1}}.{{obj.bookName}}</span>
		              </div>
		              <div style="height: .6585rem; display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: -webkit-box;display: flex;-webkit-box-align: center;-moz-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;-webkit-box-pack: center;-moz-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;">
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
	        </div>
	      </div>   
      </div>
    <!--</div>-->
    <div class="shadow" v-if="shadowBol" @click="closeAll()"></div>
    <div class="type_list" v-if="typeBol">
    	<span class="bkall" @click="setType('')"><span :class="RequestObj.bookTypeId == '' ? 'primary' : 'default'">全部</span></span>
			<span class="bkall" v-for="(obj,index) in typeListsd" @click="setType(obj.bookTypeId)"><span :class="RequestObj.bookTypeId == obj.bookTypeId ? 'primary' : 'default'">{{obj.bookTypeName}}</span></span>
      <!--<span class="type_part"  @click="setType('')"><span class="chioc btn active1">全部</span></span>
      <span class="type_part" v-for="(obj,index) in typeListsd" @click="setType(obj.bookTypeId)"><span class="chioc btn">{{obj.bookTypeName}}</span></span>-->
    </div>
    <div class="time_list" v-if="timeBol">
      <div class="time_part" @click="setTime(0)">
        <span class="time_name" :style="typeList==0?'color: #2ec0ff;':''">周榜</span><span class="time_right" v-if="typeList==0"></span>
      </div>
      <div class="time_part" @click="setTime(1)">
        <span class="time_name" :style="typeList==1?'color: #2ec0ff;':''">月榜</span><span class="time_right" v-if="typeList==1"></span>
      </div>
      <div class="time_part" @click="setTime(2)">
        <span class="time_name" :style="typeList==2?'color: #2ec0ff;':''">总榜</span><span class="time_right" v-if="typeList==2"></span>
      </div>
    </div>
    <div class="time_list" v-if="listBol" style="top: 0rem; z-index: 20;">
      <div class="time_part" @click="setList(0,'好人榜')">
        <span class="time_name" :style="listList==0?'color: #2ec0ff;':''">好人榜</span><span class="time_right" v-if="listList==0"></span>
      </div>
      <div class="time_part" @click="setList(1,'点击榜')">
        <span class="time_name" :style="listList==1?'color: #2ec0ff;':''">点击榜</span><span class="time_right" v-if="listList==1"></span>
      </div>
      <div class="time_part" @click="setList(2,'字数榜')">
        <span class="time_name" :style="listList==2?'color: #2ec0ff;':''">字数榜</span><span class="time_right" v-if="listList==2"></span>
      </div>
    </div>
  </div>
</template>


<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  export default {
    data:function(){
      return {
        path:Path,
        selBol1:false,
        selBol2:false,
        typeBol:false,
        timeBol:false,
        shadowBol:false,
        typeList:2,
        listList:2,
        listBol:false,
        RequestObj:{
          rankList: 0, // 好人 字数 点击
          timeRank: 0, // 周 月 总
          bookTypeId: '',
          pageNo: 1,
          pageSize: 10,
        },
        bookList:[],
        typeListsd:[],
        listName:'字数榜',
        scrollHeight:0,
        clientHeight:0,
        scrollTop:0,
        ctrollBol:true,
        totalPage:50,
        numBer:0,
        ws:{},
        wn:{},
        view:{},
        mWidth:{}
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getTypeList();
        this.getvalue();
        this.mWidth = window.innerWidth;
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
//						console.log(12323);
            count = 0;
            self.getvalue();
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					setTimeout(function() {
						self.RequestObj.pageNo = self.RequestObj.pageNo + 1;
						SZXJ.http(self,'get',Path.getRankingList+'?rankList='+self.RequestObj.rankList+'&timeRank='+self.RequestObj.timeRank+'&data=1&bookTypeId='+self.RequestObj.bookTypeId+'&pageNo='+self.RequestObj.pageNo+'&pageSize='+self.RequestObj.pageSize,{},function(res){
	            var list =res.data.result
	            for(var i=0;i<list.length;i++){
	              self.bookList.push(list[i]);
	            }
	            self.totalPage = res.data.totalPage;
	          },function(err){ 
	          })
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= self.totalPage)); //参数为true代表没有更多数据了。
					}, 100);
				}
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
	        this.ws.hide('slide-out-right')
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
	      this.view.drawRect({color:'#fedc6f',radius:'2px'}, {top:'13px',left:(self.mWidth-78)+'px',width:'63px',height:'18px'});
        this.view.drawText('字数榜',{top:'0px',left:(self.mWidth-78)+'px',width:'50px',height:'44px'},{size:'14px',color:'#fff'});
        this.view.drawBitmap('_www/img/blankBottom.png',{top:'0px',left:'0px',width:'100%',height:'100%'}, {top:'18px',left:(self.mWidth-30)+'px',width:'12px',height:'8px'})
//      this.view.setTouchEventRect({top:'0px',left:(self.mWidth-70).toString()+'px',width:'55px',height:'44px'});
	      this.view.addEventListener("touchend", self.openList, false);
	      plus.key.addEventListener('backbutton',function(){
	      	self.ws.close("slide-out-right");
	      })
	      this.view.interceptTouchEvent(true)
	    },
      setTypeBol:function(){
        this.closeAll();
        this.selBol1 = true;
        this.shadowBol = true;
        this.typeBol = true;
      },
      setTimeBol:function(){
        this.closeAll();
        this.selBol2 = true;
        this.shadowBol = true;
        this.timeBol = true;
      },
      setType:function(num){
//      console.log(num)
        if(num == ''){
          this.selBol1 =false;
        }
        this.RequestObj.bookTypeId = num;
        this.bookList = [];
        this.ctrollBol = true;
        this.closeAll();
        this.getvalue();
      },
      openList:function(e){
      	if(e.clientX<this.mWidth-70){
//    	this.closeAll();
      		return
      	}
        if(this.listBol){
        	this.listBol = false;
        	this.shadowBol = false;
        }else{
        	this.listBol = true;
        	this.shadowBol = true;
        	this.typeBol = false;
        	this.timeBol = false;
        }
      },
      closeAll:function(){
        this.shadowBol = false;
        this.typeBol = false;
        this.timeBol = false;
        this.listBol = false;
      },
      setTime:function(num){
        this.typeList = num;
        this.RequestObj.timeRank = num;
        this.bookList = [];
        this.ctrollBol = true;
        this.getvalue();
        this.closeAll();
      },
      setList:function(num,str){
      	var self =this;
        this.listName = str;
        this.listList = num;
        this.view.reset();
        this.view.drawRect({color:'#fedc6f',radius:'2px'}, {top:'13px',left:(self.mWidth-78)+'px',width:'63px',height:'18px'});
        this.view.drawText(str,{top:'0px',left:(self.mWidth-78)+'px',width:'50px',height:'44px'},{size:'14px',color:'#fff'});
        this.view.drawBitmap('_www/img/blankBottom.png',{top:'0px',left:'0px',width:'100%',height:'100%'}, {top:'18px',left:(self.mWidth-30)+'px',width:'12px',height:'8px'})
        this.RequestObj.rankList = num;
        this.bookList = [];
        this.ctrollBol = true;
        this.getvalue();
        this.closeAll();
      },
      joinBook:function(bookId,bookName){
      	if(window.plus){
      		this.wn = plus.webview.create(Path.netWorks+"/book/"+bookId,'book',
      		{
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
		        'statusbar':{'background':'#ffffff'},
		        'backButtonAutoControl':'close'
	        });
	        this.wn.onloading= function(){
						plus.nativeUI.showWaiting();
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
      		this.wn.show('slide-in-right')
      	}else{
//    		location.href = "/mView/book/"+bookId;
      	}
      },
      getvalue:function(){
        var self = this;
        this.RequestObj.pageNo = 1;
        SZXJ.http(this,'get',Path.getRankingList+'?rankList='+this.RequestObj.rankList+'&timeRank='+this.RequestObj.timeRank+'&data=1&bookTypeId='+this.RequestObj.bookTypeId+'&pageNo='+this.RequestObj.pageNo+'&pageSize='+this.RequestObj.pageSize,{},function(res){
          self.bookList = res.data.result;
          self.totalPage = res.data.totalPage;
        },function(err){
          
        })
      },
      getTypeList:function(){
        var self = this;
        SZXJ.http(this,'get',Path.queryBookType,{},function(res){
          self.typeListsd = res.data;
        },function(err){
          
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
          {src:"/js/mui.min.js"},
//        {src:"/js/mui.pullToRefresh.js"},
//        {src:"/js/mui.pullToRefresh.material.js"}
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
	.bkall{text-align:center;width:25%;display: inline-block;}
	.default{width:71.4%;text-align:center;color:rgba(0,0,0,.45);font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.0803rem;display: inline-block;}
	.primary{width:71.4%;text-align:center;color:white;background:#ffc200;font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.0803rem;display: inline-block;border-radius: 2rem;}
  .header_book{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 25;
  }
  .mui-table-view {background-color: #f2f2f2 !important;}
  .header_book:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: .0072rem;
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
  .header_book .header_share{
    height: 100%; 
    text-align: center;
    overflow: hidden; 
    position: absolute;
    right: 0.128rem;
  }
  .header_book .header_share .header_list{
    margin-top: 0.1216rem;
    margin-bottom: 0.1216rem;
    display: inline-block;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_newBook/yellowdot.png');
    background-repeat: no-repeat;
    background-size: 0.1024rem 0.0512rem;
    background-position: right center;
    font-size: 0.1024rem;
    padding-right: 0.128rem;
    padding-top: 0.0130rem;
    padding-bottom: 0.0126rem;
    padding-left: 0.0256rem;
    background-color: #f2f2f2;
    color: #fedc6f;
    border-radius: 2px;
  }
  .content{
    position: absolute;
    left: 0;
    /*top: 0.5294rem;*/
   top: 0;
    bottom: 0;
    right: 0;
  }
  .type_time{
    background-color: #fff;
    box-shadow: 0px 0.01707rem 0.01707rem #c3c3c3;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: .3925rem;
    z-index: 10;
  }
.type_time .type_time_part{
    display: inline-block;
    width: 50%;
    text-align: center;
    font-size: 0.1365rem;
    padding-top: 0.1365rem;
    padding-bottom: 0.1195rem;
  }
  .type_time .type_time_part span{
    display: inline-block;  
    padding-right: 0.157rem;
  }
.type_time .type_time_part .type_select{
    background-image:url(http://cdn.qcacg.com/mobile/img/app_ranking/blankBottom.png);
    background-repeat: no-repeat;
    background-size: .1168rem .0653rem;
    background-position: right center;
    color: #656565;
    
  }
  .type_time .type_time_part .time_select{
    background-image:url(http://cdn.qcacg.com/mobile/img/app_ranking/yellowBottom1.png);
    background-repeat: no-repeat;
    background-size: .1168rem .0653rem;
    background-position: right center;
    color: #fedc6f;
  }
  .book_content{
    /*top: 0.3925rem !important;*/
  }
 .book_content .book_list{
    
  }
   .book_content .book_list .book_part{
    padding: 0.128rem;
    box-sizing: border-box;
    margin-top: 1px;  
    background-color: #fff;
    display: block;
  }
   .book_content .book_list .book_part .part_img{
    width: 0.6229rem;
    height: 0.9045rem;
    display: inline-block;
    margin-right: 0.128rem;
    vertical-align: top;
  }
 .book_content .book_list .book_part .part_img img{
    width: 0.6229rem;
    height: 0.9045rem;
    border-radius: 4px;
  }
 .book_content .book_list .book_part .part_content{
    display: inline-block;
    height: 0.9045rem;
    width: 2.1930rem;
    vertical-align: top;
  }
 .book_content .book_list .book_part .part_content .part_intro{
    line-height: 1.8;
    font-size: 0.1109rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    color: #656565;
  }
   .book_content .book_list .book_part .part_content .part_title{
    font-size: 0.128rem;
    height: 0.128rem;
    color: #656565;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
  }
   .book_content .book_list .book_part .part_content .part_title .ind1{
  	color: #ff5b29;
  }
 .book_content .book_list .book_part .part_content .part_title .ind2{
  	color: #ff9600;
  }
   .book_content .book_list .book_part .part_content .part_title .ind3{
  	color: #ffd800;
  }
  .book_content .book_list .book_part .part_content .part_other{
    height: 0.128rem;
  }
   .book_content .book_list .book_part .part_content .part_other .part_icon{
    width: 10%;
    height: 0.128rem;
    display: inline-block;
    vertical-align: bottom;
  }
   .book_content .book_list .book_part .part_content .part_other .part_icon img{
    width: 0.1195rem;
  }
   .book_content .book_list .book_part .part_content .part_other .part_author{
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
  .book_content .book_list .book_part .part_content .part_other .part_type{
    display: inline-block;
    width: 50%;
    vertical-align: bottom;
    text-align: right;
    height: 0.128rem;
    
  } 
   .book_content .book_list .book_part .part_content .part_other .part_type span{
    font-size: 0.1024rem;
    padding: 0.0048rem 0.0256rem 0.0034rem 0.0256rem;
    border: 1px solid #c3c3c3;
    border-radius: 2px;
    margin-left: 0.019rem;
    color: #989898;
    display: inline-block;
  }
  .type_list{
    position: fixed;
    left: 0;
    right: 0;
    /*top: 0.9219rem;*/
   top: .3992rem;
    background-color: #fff;
    z-index: 20;
  }
  .type_list .type_part{
			  font-size: .1195rem;
			  display: inline-block;
  	    text-align: center;
		    padding: .15rem .115rem;
		    width: 25%;
		    /*margin-top: .1024rem;*/
    /*font-size: 0.1195rem;
    border-radius: 0.10245rem;
    background-color: #c3c3c3;
    display: inline-block;
    margin: 0.1024rem 0.1625rem;
    border: 1px solid #c3c3c3;*/
  }
  .chioc{
    padding: 0.0427rem 0.1rem;
    background-color: #c3c3c3;
    border-radius: .1024rem;
  	
  }
  .shadow{
    position: fixed;
    /*top: 0.9219rem;*/
    top: .3992rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 10;
  }
  .time_list{
    position: fixed;
    left: 0;
    right: 0;
    /*top: 0.9219rem;*/
   top: .3992rem;
    z-index: 20;
  }
  .time_list .time_part{
    padding: 0 0.128rem;
    border-bottom: 1px solid #c3c3c3;
    background-color: #fff;
  }
  .time_list .time_part span{
    display: inline-block;
  }
  .time_list .time_part .time_name{
    padding: 0.128rem 0;
    font-size: 0.1195rem;
  }
  .time_list .time_part .time_right{
    padding: 0.188rem 0;
    height: 0.1190rem;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_ranking/blue_right.png);
    background-repeat: no-repeat;
    background-size: 0.128rem 0.1195rem;
    background-position: center;
    float: right;
    width: 0.128rem;
  }
  .more{color:#777;font-size:.128rem;text-align:center;padding:2% 0; position: absolute; bottom: 0.256rem; left: 0; right: 0; background-color: #fff;}
  .more span{display:inline-block;color:#777;margin:0 3%}
  .more .left{width:.25rem;border:.012rem solid #777;display:inline-block;vertical-align:middle}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
  }
  .type_list .active1{
    color: #33b9ff;
    border-color: #33b9ff;
  }
</style>
<template>
	<div id="zong">
		<script src="/lib/resize.js"></script>
		<script src="/lib/jquery.min.js"> </script>
		<script src="/lib/swiper.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="indexApp" v-show="displayFlag" style="display: none;" class="index">
			<div id="pull"></div>
			<div class="content">
		        <img v-if="topFlag"  @click="clickTopFn"  class="top"  src="http://cdn.qcacg.com/img/app_index/top_01.png" alt="" />
		        <div class="header">
		          <img class="logo" src="http://cdn.qcacg.com/img/app_index/index_03.png" alt="" />  
		           <a  v-if="loginFlag" href="/app/personal"><img class="sign" :src="path.rootPath + userImage" alt="" /></a>
		           <a  v-else  href="/app/login"><img class="sign signImg" src="http://cdn.qcacg.com/img/app_index/sign.png" alt="" /></a>
		           <a href="/app/search"><img class="search" src="http://cdn.qcacg.com/img/app_index/classification_10.png" alt="" /></a>
		        </div>
		        <div class="swiper-container"style="width: 100%;height: 2rem;">
		            <div class="swiper-wrapper">  
		                <div class="swiper-slide"><img src="http://cdn.qcacg.com/img/app_banner/ppt1.jpg"></div>  
		                <div class="swiper-slide"><img src="http://cdn.qcacg.com/img/app_banner/ppt2.jpg"></div>  
		                <div class="swiper-slide"><img src="http://cdn.qcacg.com/img/app_banner/ppt3.jpg"></div>  
		            </div>  
		            <div class="swiper-pagination swiprRem"></div>
		        </div>  
		        <div class="navigation">
		          <a href="/app/classFirst" class="column active">
		            <img src="http://cdn.qcacg.com/img/app_index/index_11.png" alt="" />
		            <h4 class="title">分类</h4>
		          </a>
		          <a href="/app/rank" class="column active">
		            <img src="http://cdn.qcacg.com/img/app_index/index_13.png" alt="" />
		            <h4 class="title">排行</h4>
		          </a>
		          <a href="" class="column active">
		            <img src="http://cdn.qcacg.com/img/app_index/index_15.png" alt="" />
		            <h4 class="title">活动</h4>
		          </a>
		          <a v-if="loginFlag" href="/app/bookshelf" class="column active">
		            <img src="http://cdn.qcacg.com/img/app_index/index_17.png" alt="" />
		            <h4 class="title">书架</h4>
		          </a>
		          <a v-else href="/app/login" class="column active">
		            <img src="http://cdn.qcacg.com/img/app_index/index_17.png" alt="" />
		            <h4 class="title">书架</h4>
		          </a>
		        </div>
		        <div class="section first"> 
		           <div class="head">     
		               <img class="pic" src="http://cdn.qcacg.com/img/app_index/index_24.png" alt="" />
		               <h3>小编推荐</h3>
		               <img class="picSec" src="http://cdn.qcacg.com/img/app_index/index_27_01.png" alt="" />
		               <span @click="nextBatch(0)" >换一批</span>
		           </div>
		           <div class="book">
		               <a v-for="(obj,index) in theHotList" v-if="index < 3" class="book_nav active" :href="path.TemprootPath + '/app/book/' + obj.bookId">
		                   <img :src="path.imagePath +obj.bookCoverImage"  />
		                   <div class="booktitle bookFirst">{{obj.bookName}}</div>
		               </a>
		           </div>
		        </div>
		        <img class="bannerSec" src="http://cdn.qcacg.com/img/app_banner/ppt.jpg">
		        <div class="section"> 
		           <div class="head">     
		               <img class="pic" src="http://cdn.qcacg.com/img/app_index/index_31.png" alt="" />
		               <h3>全站推荐</h3>
		               <img class="picSec" src="http://cdn.qcacg.com/img/app_index/index_27_01.png" alt="" />
		               <span @click="nextBatch(1)" >换一批</span>
		           </div>
		           <div class="booklist" v-for="(obj,index) in allBook" v-if="index < 3" >
		             <a :href="path.TemprootPath + '/app/book/' + obj.bookId">
		               <img class="bookimg" :src="path.imagePath +obj.bookCoverImage" alt="" />
		               <ul class="attribute">
		                 <li class="bookname">{{obj.bookName}}</li>
		                 <li class="brief">{{obj.bookIntroduction}}</li>
		                 <li class="author">
		                   <img src="http://cdn.qcacg.com/img/app_index/index_36_01.png" alt="" /><span class="authorname">{{obj.author}}</span>
		                   <div class="bookTypeList">
		                   	<span v-for="(sos,index) in obj.bookTypeList"  v-if=" index < 4 " class="list">{{sos.bookTypeName}}</span>
		                   </div>
		                 </li>
		               </ul>
		             </a>
		             <!--<div class="hr"></div>-->
		           </div>
		        </div>
		        <div class="section second"> 
		           <div class="head">     
		               <img class="pic" src="http://cdn.qcacg.com/img/app_index/index_33.png" alt="" />
		               <h3>新书推荐</h3>
		               <img class="picSec" src="http://cdn.qcacg.com/img/app_index/index_27_01.png" alt="" />
		               <span @click="nextBatch(2)" >换一批</span>
		           </div>
		           <div class="bookSec"  >          
		               <a class="bookSec_nav " :href="path.TemprootPath + '/app/book/' + obj.bookId" v-for="(obj,index) in newBookRecom" v-if="index < 3">
		                   <img :src="path.imagePath +obj.bookCoverImage" alt="" />
		                     <div class="background">
		                       <img class="headimg" :src="path.imagePath + obj.userHead">
		                       <span>{{obj.author}}</span>
		                     </div>
		                   <div class="booktitle">{{obj.bookName}}</div>
		               </a>         
		           </div>
		        </div>
        		<div id="section" class="section"> 
		           <div class="head">     
		               <img class="pic" src="http://cdn.qcacg.com/img/app_index/index_35.png" alt="" />
		               <h3>最近更新</h3>
		           </div>
		           <div class="booklist" v-for="obj in lastUpdate">
		             <a :href="path.TemprootPath + '/app/book/' + obj.bookId">
		               <img class="bookimg" :src=" path.imagePath + obj.bookCoverImage " alt="" />
		               <ul class="attribute">
		                 <li class="bookname">{{obj.bookName}}</li>
		                 <li class="briefSec">{{obj.bookIntroduction}}</li>
		                 <li class="newChapter">最新章节：{{obj.contentTitle}}</li>
		                 <li class="author ">
		                   <img src="http://cdn.qcacg.com/img/app_index/index_36_01.png" alt="" /><span class="authorname Secname" >{{obj.author}}</span>
		                   <!--<img src="http://cdn.qcacg.com/img/app_index/index_38.png" alt="" /><span>{{obj.bookWordCount}}</span>
		                   <img src="http://cdn.qcacg.com/img/app_index/index_40.png" alt="" /><span>{{obj.bookCopperCoins}}</span>
		                   <img src="http://cdn.qcacg.com/img/app_index/index_42.png" alt="" /><span>{{obj.bookHit}}</span>-->
		                 </li>
		               </ul>
		             </a>
		             <div class="hr"></div>
		           </div>
		        </div>
		        <div v-if="numBer < 1 " class="more">
		        	<div class="left"></div>
		        	<span>没有更多内容了哦</span>
		        	<div class="left"></div>
		        </div>
		        <div v-if="updateFlag" class="loadingWait">
		            <img src="http://cdn.qcacg.com/img/loading.gif" alt="" />
		            <span>正在加载中..</span>
		        </div>
		        <appBottom></appBottom>
		      </div>      
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList
//		'myheader':Header,
//		'myfooter':Footer
	},
	asyncData:function(){
		return{}
	},
	data : function() {
		return {
		    path: appPathList,
		    indexList:{},
		    theHotList:[],
		    lastUpdate:[],
		    allBook:[],
		    loginFlag:'',
		    userImage:'',
		    pageNo:1,
		    theHot:'',
		    numBer:3,
		    newBookRecom:[],
		    book: true,
		    menuList: false,
		    toWrap: false,
		    offsetHeight :'',
		    clientHeight :'',
		    srcollH:'',
		    srcollTop:'',
		    displayFlag:false,
		    turnsFlag:1,
		    lastObj:{
		      pageNo:1,
		      pageSize:3,
		    },
		    Img_first:'',
		    Img_second:'',
		    Img_third:'',
		    numBer:'',
		    ispeed:'',
		    isTop:true,
		    timer:'',
		    topFlag:false,
		    clientWidth:'',
		    widthFlag:false,
		    loading:'',
		    updateFlag:false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	window.addEventListener('scroll', this.onscrollFn);
    	this.getValueFn();
    	k_touch("indexApp", "y");
    	var mySwiper = new Swiper(".swiper-container",{  
	        direction:"horizontal",/*横向滑动*/  
	        loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/  
	        pagination:".swiper-pagination",/*分页器*/  
	        autoplay:3000/*每隔3秒自动播放*/  
	    })
	  })
	},
	methods: {
		clickTopFn:function(){
	      var This = this;
	      this.timer = setInterval(function(){
	      //获取滚动条距离顶部高度
	          var ispeed = Math.floor(-This.srcollTop / 7);
	           document.documentElement.scrollTop = document.body.scrollTop = ispeed + This.srcollTop;
	          //到达顶部，清除定时器
	          if (This.srcollTop == 0) {
	            clearInterval(This.timer);
	          };
	          This.isTop = true;  
	        },30);
	    },
	    showMenu: function() {
	            this.menuList = !this.menuList
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        },
	    nextBatch:function(a){
	      if(a == 0){
	        SZXJ.http(this, 'get', appPathList.mobileEditorRecommendedData,{}, (response)=>{  // 小编推荐
	            this.theHotList = response.data.data;
	        });
	      }else if(a == 1){
	        SZXJ.http(this, 'get', appPathList.mobileAllRecommendedData,{}, (response)=>{  // 全站
	            this.allBook = response.data.data;
	        });
	      }else{
	        SZXJ.http(this, 'get', appPathList.mobileNewRecommendedData,{}, (response)=>{    //  新书
	            this.newBookRecom = response.data.data;
	        });
	      }
	    },
	   onscrollFn:function(){  
	        this.offsetHeight = document.documentElement.offsetHeight;   // 页面总高度
	        this.clientHeight = document.documentElement.clientHeight;   // 可视区高度
	        this.srcollTop  = document.documentElement.scrollTop || document.body.scrollTop ;   //滚动条的高度 
	        this.srcollH  = document.body.scrollHeight;
	        if ( this.offsetHeight - this.clientHeight  <  this.srcollTop + 300  ) {
	        		console.log(this.srcollTop);
	            this.lastupdataFn();  
	        };
	        if( this.srcollTop >= this.clientHeight ){
	           this.topFlag = true;
	        }else{
	          this.topFlag = false;
	        };
	        if(!this.isTop){
	          clearInterval(this.timer);
	        } 
	        this.isTop = false;
	    },
	    lastupdataFn:function(){
	    	if(this.numBer < 1){
	          this.updateFlag = false;
	        }else{
	          this.updateFlag = true;
	        }
	    	this.lastObj.pageNo +=1 ;
	      SZXJ.http(this, 'get', appPathList.lastUpdate,this.lastObj, (response)=>{
	         this.updateFlag = false;
	         this.numBer = response.data.data.length;
		         	for( var i = 0 ; i < this.numBer ; i++  ){
		           this.lastUpdate.push(response.data.data[i]);
		         }
	        });
	    },
	    getValueFn:function(){
	       var data = {};
	       SZXJ.http(this, 'get', appPathList.mobileIndexData, data, (response)=>{
	                this.theHotList = response.data.data.editorRecommended;
	                this.allBook = response.data.data.allRecommended;
	                this.newBookRecom = response.data.data.newRecommended;
	          });
	       SZXJ.http(this, 'get', appPathList.getStatus, data, (response)=>{
	                this.loginFlag =  response.data.loginFlag ;
	                if(this.loginFlag){
	                	this.userImage = response.data.status.userImage;
	                }  
	          });
	       this.$nextTick(function(){
	         this.displayFlag = true;
	         var  This = this;
	            if(document.getElementById("loading")){
	              setTimeout(function(){
	               document.body.removeChild(document.getElementById("loading"));
	              },500) 
	         }
	       });
	       SZXJ.http(this, 'get', appPathList.lastUpdate,this.lastObj, (response)=>{
	                this.lastUpdate = response.data.data;    
	                this.numBer = response.data.data.length;
	       });   
	       
	    }, 
	},
  	head: function(){
  		return {
  			title: '首页-QC轻小说',
  	    meta: [
  			    { charset: 'UTF-8' },
  			    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no' },
  			  	{ name: 'format-detection', content: 'telephone=no' },
  			  	{ name: 'apple-touch-fullscreen', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  			  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
  			  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
  			  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
  			],
  			link: [
  		    	{ rel: 'stylesheet', href: '/css/swiper.css' },
  		    	{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		]
  	  }
  	}
}
</script>

<style scoped="scoped">
		body{font-size:100px;}
		#zong {
			background-color:#f4f4f4;
		}
		.index {max-width: 7.5rem;overflow-x: hidden;margin: 0 auto;}
		.index .content .top{width:.8rem;box-shadow:0 0 .03rem .03rem rgba(0,0,0,.1);position:fixed;right:10%;bottom:20%;border-radius:100rem;z-index:9999}
		.index .content .header{height:.8rem;position:relative}
		.index .content .header .logo{position:absolute;left:5%;width:auto;height:.8rem;padding:.1rem;box-sizing:border-box}
		.index .content .header .search{width:auto;height:.8rem;padding:.24rem 0 .26rem 0;position:absolute;display:block;right:7%;box-sizing:border-box}
		.index .content .header .sign{position:absolute;display:block;right:12.4%;width:auto;height:.8rem;box-sizing:border-box;overflow:hidden;border-radius:200px;padding:.25rem}
		.index .content .header .signImg{position:absolute;display:block;right:14.4%;width:auto;height:.8rem;padding:.25rem 0;box-sizing:border-box}
		.index .content .banner{position:relative}
		.index .content .banner .bannerImg{height:2rem;width:100%}
		.index .content .banner .bannerImg img{position:absolute;width:100%;height:100%;display:inline;opacity:0}
		.index .content .banner ul{position:absolute;height:.2rem;bottom:0;left:45%}
		.index .content .banner ul li{width:.1rem;height:.1rem;background-color:#fff;border-radius:1rem;list-style:none;float:left;margin-right:.3rem}
		.index .content .banner ul .spot{background-color:red}
		.index .content .navigation{background-color:#fff;border-bottom:.01rem solid #ececec;margin-bottom:.05rem;position:relative;padding:3% 0;text-align:center}
		.index .content .navigation .column{text-align:center;display:inline-block;width:23%}
		.index .content .navigation .column img{width:.56rem;height:.56rem}
		.index .content .navigation .title{margin-top:5%;font-weight:400;color:#777;font-size:.28rem}
		.index .content .bannerSec{height:1.7rem;width:100%;margin:.03rem 0;border-bottom:.01rem solid #ECECEC}
		.index .content .section{background-color:#fff;border-top:1px solid #ececec;border-bottom:1px solid #ececec;padding:2% 0}
		.index .content .section .head{margin-left:.25rem;margin-bottom:.15rem}
		.index .content .section .head .pic{margin-right:1%;vertical-align:-webkit-baseline-middle;width:.32rem;height:.323rem}
		.index .content .section .head h3{display:inline-block;vertical-align:-webkit-baseline-middle;font-size:.28rem}
		.index .content .section .head h3.website{padding-top:.01rem}
		.index .content .section .head span{vertical-align:-webkit-baseline-middle;color:#777;font-size:.24rem}
		.index .content .section .head .picSec{vertical-align:-webkit-baseline-middle;margin-left:55%;margin-right:1%;width:.16rem;height:.14rem}
		.index .content .section .book{overflow:hidden;text-align:center;padding:1% 0}
		.index .content .section .book .book_nav{display:inline-block;width:25%;text-align:center;margin:0 3%}
		.index .content .section .book .book_nav img{width:1.8rem;height:2.52rem;margin-bottom:3%;border-radius:.08rem;max-width:none;object-fit:cover;border:none!important}
		.index .content .section .booklist {padding: 0 0 .20rem .36rem;}
		.index .content .section .booklist a{display: block;height: 2.63rem;}
		.index .content .section .booklist .booklist{display: block;height: 2.63rem;}
		.index .content .section .booklist .bookimg{width:1.8rem;height:2.52rem;display:inline-block;margin-right:.13rem;vertical-align:top;background-color: #f4f4f4;}
		.index .content .section .booklist .attribute{display:inline-block;width:65%;position: relative;height: 2.52rem;}
		.index .content .section .booklist .attribute .bookname{
		    font-size: .28rem;
		    margin-bottom: .1rem;
		    width: 100%;
		    overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    margin-top: .2rem;
		}
		.index .content .section .booklist .attribute .brief{font-size:.24rem;color:rgba(0,0,0,.35);margin-bottom:1%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-height:1.3}
		.index .content .section .booklist .attribute .author {position: absolute;bottom: 0px;width: 100%;}
		.index .content .section .booklist .attribute .author img{margin-right:2%;font-size:.24rem;vertical-align:middle;width:.2rem;height:.2rem;border:none!important}
		.index .content .section .booklist .attribute .author span{font-size:.24rem;vertical-align:middle;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;color:rgba(0,0,0,.7)}
		.index .content .section .booklist .attribute .author .bookTypeList{margin-top:.10rem}
		.index .content .section .booklist .attribute .author .list{
		    line-height: 1.2;
		    display: inline-block;
		    border: 1px solid rgba(24, 170, 196, 0.3);;
		    margin-right: .10rem;
		    margin-top: 0.05rem;
		    text-align: center;
		    color: #18AAC4;
		    border-radius: 2px;
		    font-size: .16rem;
		    padding: 0 2px;
		    padding-top: 2px;
		    padding-bottom: 2px;
		}
		.index .content .section .booklist .attribute .author .color{border:1px solid #00A1D6;color:#00A1D6}
		.index .content .section .booklist .attribute .author .authorname{font-size:.24rem;width:3.2rem;display:inline-block;vertical-align:middle}
		.index .content .section .booklist .attribute .author .Secname{width:45%}
		.index .content .section .booklist .hr{
			background-color:rgba(0,0,0,.1);
			width:80%;
			height:1px;
			margin-left:20%;margin-top:.10rem;
		}
		.index .content .section .bookSec{overflow:hidden;text-align:center;margin-top:.17rem}
		.index .content .section .bookSec .bookSec_nav{display:inline-block;width:25%;text-align:center;position:relative;margin:0 3%}
		.index .content .section .bookSec .bookSec_nav img{width:1.8rem;height:2.52rem;margin-bottom:10%}
		.index .content .section .bookSec .bookSec_nav .background{position:absolute;bottom:15%;left:5%;background-color:#fff;width:.46rem;height:.46rem;border-radius:1rem}
		.index .content .section .bookSec .bookSec_nav .background .headimg{width:.38rem;height:.38rem;border-radius:1rem;background-color:#00A1D6;margin:10% 0 0 0}
		.index .content .section .bookSec .bookSec_nav .background span{position:absolute;color:#777;width:1.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
		bottom:-8%;left:100%;font-size:.16rem}
		.index .content .section .booklist .attribute .white{height:.12rem}
		.index .content .section .booklist .attribute .briefSec{font-size:.24rem;color:rgba(0,0,0,.35);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-height:1.55;margin:1.5% 0}
		.index .content .section .booklist .attribute .newChapter{
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		    font-size: .24rem;
		    position: absolute;
		    bottom: .40rem;
		    width: 100%;
		
		}
		.index .booktitle{font-size:.28rem;height:.35rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0 auto;margin-top:7%}
		.index .bookFirst{margin-top:0!important}
		.active:active{background-color:rgba(0,0,0,.05)}
		.index .content .more{color:#777;font-size:.28rem;text-align:center;padding:2% 0}
		.index .content .more span{display:inline-block;color:#777;margin:0 3%}
		.index .content .more .left{width:.5rem;border:.012rem solid #777;display:inline-block;vertical-align:middle}
		.index .content .loadingWait{text-align: center;height: 0.8rem;position: relative;}
		.index .content .loadingWait img{box-sizing: border-box;height: 0.8rem;width:auto;vertical-align: baseline;position: absolute;right: 56%;padding:0.2rem 0;margin-right: .10rem;}
		.index .content .loadingWait span{vertical-align: baseline;color: #777;display: inline-block;padding-top: 0.25rem;position: absolute;right: 35%;font-size: 0.28rem;}
		.swiper-pagination-bullet{width:.16rem!important;height:.16rem!important}
		.swiper-slide img{width:7.5rem!important;height:2rem!important}
		.swiper-pagination{bottom:.1rem!important}
</style>
<template>
	<div id="bookshelf" style="display: none;" v-show="displayFlag" class="bookshelf">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
      	<div  class="content">
			<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
			<div class="cephalosome">
	          <img @click="backFn" class="back" src="http://cdn.qcacg.com/img/app_index/classification_03.png" alt="" />
	          <div class="title">
	            <i @click="recordFn(2)"  :class="recordId == 2 ? 'shelf' : 'record'" style="border-radius: .04rem 0 0 .04rem;border:1px solid #1CC8ED;width:.85rem;">历史</i>
	            <i @click="recordFn(1)"  :class="recordId == 1 ? 'shelf' : 'record'" style="border-radius: 0 .04rem .04rem 0;border:1px  solid #1CC8ED;width:.85rem;">书架</i>
	          </div>
	          <a href="/app/search"><img class="searchSec" src="http://cdn.qcacg.com/img/app_index/classification_05.png" alt="" /></a>
	          <img @click="showMenu" class="catalog" src="http://cdn.qcacg.com/img/app_index/classification_07.png" alt="" />
	          <div class="commonHeadMenu" style="display: none;" v-show="menuList">
	            <a href="/app" class="home">
	                <img src="http://cdn.qcacg.com/img/app_book/home.png"/>
	                <p>首页</p>
	            </a>
	            <a href="/app/classFirst" class="list">
	                <img src="http://cdn.qcacg.com/img/app_book/list.png"/>
	                <p>分类</p>
	            </a>
	            <a href="/app/rank" class="sort">
	                <img src="http://cdn.qcacg.com/img/app_book/cup.png"/>
	                <p>排行榜</p>
	            </a>
	            <a href="/app/personal" class="personal">
	                <img src="http://cdn.qcacg.com/img/app_book/personal.png"/>
	                <p>个人中心</p>
	            </a>
	          </div>
	        </div> 
	        <div v-if="recordFlag == 1 && listbookList.length > 0 " class="section"> 
	           <ul class="book" >
	             <li class="book_nav" v-for="obj in listbookList">
	               <a :href="path.TemprootPath + '/app/book/' + obj.bookId">
	                   <img :src="path.imagePath + obj.bookCoverImage" alt="" />
	                   <div class="booktitle">{{obj.bookName}}</div>
	               </a>
	             </li>
	           </ul>
	        </div>
	        <div v-if="recordFlag == 2 && bookList.length > 0 " class="section">
	            <div class="contentSec" v-for="obj in bookList" >
	            	<a :href="path.TemprootPath + '/app/book/' + obj.bookId">
		              <img class="cover" :src="path.imagePath + obj.bookCoverImage">
		              <ul class="attribute">
		                <li class="bookname">{{obj.bookName}}</li>
		                <li class="list">{{obj.author}}<span>著</span></li>
		                <li class="info">观看至<span>{{obj.contentTitle}}</span></li>
		                <li class="ready">{{szxj.getLocalDate(obj.bookHitDate)}}</li>
		              </ul>
	              </a>
	            </div>
	        </div>
	    </div>
        <appBottom></appBottom>
	</div>
</template>

<script>
import Header from '~/components/Headerbook'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import Alert from '~/components/Alert'
import axios from 'axios'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList,
//		'myheader':Header
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			path: appPathList,
		    szxj:SZXJ,
		    bookList:[],
		    recordId:1,
		    recordFlag:1,
		    listbookList:[],
		    bookshelf: true,
		    menuList: false,
		    toWrap: false,
		    displayFlag:false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
    	k_touch("bookshelf", "y");
	  	this.getValueFn();
    	this.displayFlag = true;
	  })
	},
	methods: {
	    showMenu: function() {
	            this.menuList = !this.menuList
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        },
	    backFn:function(){
	      history.go(-1);
	    },
	    recordFn:function(d){
	      this.recordId = d;
	      if(this.recordId == 1){
	        this.recordFlag = 1;
	      }else{
	        this.recordFlag = 2;
	      }
	      this.getValueFn();
	    },
	    getValueFn:function(){
	      if(this.recordId == 1){
	        SZXJ.http(this,'get', appPathList.findBookCollectByUser,{} , (response) => {
	          this.listbookList = response.data;
	          });
	      }else{
	        SZXJ.http(this,'get', appPathList.findBookHitByUser,{} , (response) => {
	          this.bookList = response.data;
	          });
	      }
	      this.$nextTick(function(){
	         this.displayFlag = true;
	         var  This = this;
	         setTimeout(function(){
	            document.body.removeChild(document.getElementById("loading"));
	         },300)
	       });
	    },
	},
  	head: function(){
  		return {
  			title: '书架-QC轻小说',
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
		    	{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		]
  	  }
  	}
}
</script>
<style>
		#bookshelf{padding-bottom:.8rem;}
		body{background-color:#f4f4f4;}
		.bookshelf .content{max-width: 7.5rem;overflow-x: hidden;margin:0 auto;margin-top: 0.88rem;}
		.bookshelf .content .section .book{overflow:hidden}
		.bookshelf .content .section .book .book_nav{margin:3.5% 0 2% 4%;width:28%;text-align:center;float:left}
		.bookshelf .content .section .book .book_nav .booktitle{font-size:.28rem;height:.35rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.bookshelf .content .section .book .book_nav img{width:1.8rem;height:2.52rem;margin-bottom:5%;border-radius:.06rem}
		.bookshelf .content .section{background-color:#fff;border-bottom:.011rem solid rgba(0,0,0,.15);padding-bottom:2%;min-height:.5rem}
		.bookshelf .content .section .contentSec{overflow:hidden;padding-top:3%;margin-left:12%}
		.bookshelf .content .section .contentSec .cover{float:left;width:1.8rem;height:2.52rem;border-radius:.04rem;position:relative}
		.bookshelf .content .section .contentSec .theRank{position:absolute;top:5%;left:-2%}
		.bookshelf .content .section .contentSec .attribute{float:left;margin-left:3%;width:4.5rem}
		.bookshelf .content .section .contentSec .attribute span{margin-left:3%;}
		.bookshelf .content .section .contentSec .attribute .bookname{font-size:.28rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.bookshelf .content .section .contentSec .attribute .list{margin-top:25%;font-size:.24rem}
		.bookshelf .content .section .contentSec .attribute .ready{font-size:.24rem;margin-top:1.5%}
		.bookshelf .content .section .contentSec .attribute .info{font-size:.24rem;margin-top:1.5%;color:#777}
		.bookshelf .blackWrap{background-color:#000;opacity:.4;width:100%;height:100%;position:fixed;left:0;top:0;z-index:10}
		/*.bookshelf .commonHeadMenu{text-align:center;padding-top:.3rem;padding-bottom:.37rem;width:100%;background-color:#FFF;position:absolute;top:.8rem;z-index:10}
		.bookshelf .commonHeadMenu a{display:inline-block;margin:0 6%}
		.bookshelf .commonHeadMenu a img{display:block;width:.26rem;height:.26rem;margin:0 auto}
		.bookshelf .commonHeadMenu a p{margin-top:.08rem;font-size:.22rem;color:#232323}*/
		
</style>
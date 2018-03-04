<template>
	<div v-show="displayFlag" style="display: none;" class="admin" id="admin">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
			<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
			<myheader msgfromfa="小说管理"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
			<div class="section"> 
		         <ul class="book">
		           <li class="book_nav" v-for="obj in bookList" >
		             <a :href="path.TemprootPath + '/app/book/' + obj.bookId">
		                 <img :src="path.imagePath + obj.bookCoverImage" alt="" />
		                 <div class="booktitle">{{obj.bookName}}</div>
		             </a>
		           </li>
		         </ul>
			</div>
			<appBottom></appBottom>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Headerapp'
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
		'myheader':Header,
		'appPathList':appPathList
//		'myfooter':Footer
	},
	asyncData:function(context){
		var obj={};
	    obj.id = context.params.id;
		    console.log(context);
		    console.log(obj.id);
		return obj;
	},
	data : function() {
		return {
			path: appPathList,
		    bookList:[],
		    menuList: false,
		    toWrap: false,
		    displayFlag:false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
    	k_touch("admin", "y");
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
	    getValueFn:function(){
	      SZXJ.http(this,'get', appPathList.findBookByUser, {}, (response) => {
	        this.bookList = response.data;
	      });
	      this.$nextTick(function(){
	        this.displayFlag = true;
	        setTimeout(function(){
	          document.body.removeChild(document.getElementById("loading"));
	        },300)
	     	});
	    }
	},
  	head: function(){
  		return {
  			title: '小说管理-QC轻小说',
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

	/*@font-face{font-family:sansSerif;src:url('../font/app-font/Microsoft Sans Serif.eot');src:url('../font/app-font/Microsoft Sans Serif.eot?#iefix') format('embedded-opentype'),url('../font/app-font/Microsoft Sans Serif.woff') format('woff'),url('../font/app-font/Microsoft Sans Serif.woff2') format('woff'),url('../font/app-font/Microsoft Sans Serif.ttf') format('truetype'),url('../font/app-font/Microsoft Sans Serif.svg#YourWebFontName') format('svg')}*/
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;text-decoration:none;color:#000;line-height: 1.1;}
	a:visited{color:#000}
	#admin{padding-bottom:.8rem;}
	body{background-color:#f4f4f4;}
	.admin .content{margin:0 auto;max-width: 7.5rem;overflow-x: hidden;margin-top: 0.88rem;}
	.admin .content .section .book{overflow:hidden}
	.admin .content .section .book .book_nav{margin:3% 0 2% 4%;width:1.5rem;text-align:center;float:left}
	.admin .content .section .book .book_nav img{width:1.2rem;height:1.7rem;background-color:#adff2f;margin-bottom:5%}
	.admin .content .section .book .book_nav .booktitle{font-size:.24rem}
	
</style>
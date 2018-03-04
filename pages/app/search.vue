<template>
	<div id="searchWrap">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div class="searchWrap" v-cloak>
	    <div class="search">
	      <div class="cephalosome searchHead">
		      <img @click="back" class="back" src="http://cdn.qcacg.com/img/app_index/classification_03.png" alt="" />
		      <input type="text" v-model="searchContent" />
		      <img class="catalog" @click="search" src="http://cdn.qcacg.com/img/app_index/classification_05.png" alt="" />
		    </div>
	    	
	      <div class="searchTop" v-show="tagFlag">
	        <p class="hotTag">热门标签</p>
	        <ul class="tag">
	          <li v-cloak v-for="list in searchList">
	            <a href="javascript:;" @click="goTag(list)">
	              <p v-cloak >{{list}}</p>
	            </a>
	          </li>
	        </ul>
	      </div>
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
		return {}
	},
	data : function() {
		return {
			displayFlag:false,
	        tagFlag: true,
	        path: appPathList,
	        searchContent: "",
	        searchList: {},
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
		  	this.getTag();
	        this.displayFlag = true;
	        if(document.getElementById("loading")){
		          document.body.removeChild(document.getElementById("loading"));
		    }  
	  })
	},
	methods: {
			back: function() {
	            window.history.back();
		    },
	        getTag: function() {
	            SZXJ.http(this, 'get', appPathList.keyWord, {}, (res)=>{
	                this.searchList = res.data.data;
	            });
	        },
	        search: function() {
	            window.location.href = '/app/classSec?keyword=' + this.searchContent.toString();
	        },
	        goTag: function(value) {
	            this.searchContent = value;
	            this.search();
	        }
	},
  	head: function(){
  		return {
  			title: '搜索-QC轻小说',
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
<style scoped>
		#searchWrap{max-width: 7.5rem;margin: 0 auto;}
		[v-cloak]{display:none;}
		.searchWrap .search .searchHead{position:relative;z-index:10;background-color:#fff;box-shadow:0 .05rem .08rem #ececec;}
		.searchWrap .search .searchHead input{
		    display: inline-block;
		    width: 5rem;
		    font-size: 0.32rem;
		    border: 0;
		    border-bottom: .02rem solid #CCC;
		    height: 0.8rem;
		    position: relative;
		}
		
		.searchWrap .search .searchTop{padding:.2rem .4rem}
		.searchWrap .search .searchTop .hotTag{font-size:.26rem;color:#525252;padding-bottom:.08rem;border-bottom:.01rem solid #FBFBFB}
		.searchWrap .search .searchTop .tag{margin:.41rem .23rem}
		.searchWrap .search .searchTop .tag a{display:inline-block;color:#525252}
		.searchWrap .search .searchTop .tag li{display:inline-block;padding:.05rem .15rem;margin-right:.2rem;margin-bottom:.19rem;font-size:.22rem;color:#C5C5C5;border:.01rem solid #E5E5E5;border-radius:.03rem}
	
</style>
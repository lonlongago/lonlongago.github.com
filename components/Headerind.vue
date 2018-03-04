<template>
	<div>
		<script src="/lib/resize.js"></script>
		<script src="/lib/jquery.min.js"> </script>
		<script src="/lib/swiper.js"></script>
		<!--<script src="/lib/pullToRefresh.js"></script>-->
		<div class="header">
          <img class="logo" src="http://cdn.qcacg.com/img/app_index/index_03.png" alt="" />  
           <a  v-if="loginFlag" href="/app/personal"><img class="sign" :src="path.rootPath + userImage" alt="" /></a>
           <a  v-else  href="/app/login"><img class="sign signImg" src="http://cdn.qcacg.com/img/app_index/sign.png" alt="" /></a>
           <a href="/app/search"><img class="search" src="http://cdn.qcacg.com/img/app_index/classification_10.png" alt="" /></a>
        </div>
	</div>
</template>

<script>
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import axios from 'axios'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
		    loginFlag:'',
		    userImage:'',
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
	  })
	},
	methods: {
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
  			title: '',
  	    meta: [
  			    { charset: 'UTF-8' },
  			    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
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

<style>
		.header{height:.8rem;position:relative}
		.header .logo{position:absolute;left:5%;width:auto;height:.8rem;padding:.1rem;box-sizing:border-box}
		.header .search{width:auto;height:.8rem;padding:.24rem 0 .26rem 0;position:absolute;display:block;right:7%;box-sizing:border-box}
		.header .sign{position:absolute;display:block;right:12.4%;width:auto;height:.8rem;box-sizing:border-box;overflow:hidden;border-radius:200px;padding:.25rem}
		.header .signImg{position:absolute;display:block;right:14.4%;width:auto;height:.8rem;padding:.25rem 0;box-sizing:border-box}
</style>
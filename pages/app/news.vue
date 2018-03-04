<template>
	<div v-show="displayFlag" style="display: none;" id="news" class="news">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
			<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
			<myheader msgfromfa="消息"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
			<a href="/app/message" @click="unReadreplyFn()">
		      <div class="main">
		        <img src="http://cdn.qcacg.com/img/app_index/news_03.png" alt="" />
		          <ul class="right">
		            <li class="title">回复   <span v-if="reply > 0" class="red">{{reply}}</span></li>
		            <li class="message">暂无回复消息</li>
		          </ul>
		      </div>
		    </a>
		    <div class="main">
		      <img src="http://cdn.qcacg.com/img/app_index/news_06.png" alt="" />
		        <ul class="right" >
		          <li class="title">@消息</li>
		          <li class="message">此功能暂未开放</li>
		        </ul>
		    </div>
		    <a href="/app/relevant" @click="unReadbookFn()">
		      <div class="main">
		        <img src="http://cdn.qcacg.com/img/app_index/news_08.png" alt="" />
		          <ul class="right">
		            <li class="title">作品相关消息 <span v-if="book > 0" class="red">{{book}}</span></li>
		            <li class="message">暂无作品相关消息</li>
		          </ul>
		      </div>
		    </a>
		    <a href="/app/Official" @click="unReadofficialFn()">
		      <div class="main">
		        <img src="http://cdn.qcacg.com/img/app_index/news_10.png" alt="" />
		          <ul class="right">
		            <li class="title">官方消息 <span v-if="official > 0" class="red">{{official}}</span></li>
		            <li class="message">暂无官方消息</li>
		          </ul>
		      </div>
		    </a>
		    <a href="/app/system" @click="unReadsystemFn()">
		      <div class="main">
		        <img src="http://cdn.qcacg.com/img/app_index/news_12.png" alt="" />
		          <ul class="right">
		            <li class="title">系统消息 <span v-if="system > 0" class="red">{{system}}</span></li>
		            <li class="message">暂无系统消息</li>
		          </ul>
		      </div>
		    </a>
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
		'appPathList': appPathList,
		'myheader':Header
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			displayFlag:false,
		    path: appPathList,
		    szxj:SZXJ,
		    book:'',
		    official:'',
		    reply:'',
		    system:'',
		    message: true,
		    menuList: false,
		    toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
    	this.displayFlag = true;
    	k_touch("news", "y");
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
	    unReadbookFn:function(){
	      this.book=0;
	    },
	    unReadofficialFn:function(){
	      this.official=0;
	    },
	    unReadreplyFn:function(){
	      this.reply=0;
	    },
	    unReadsystemFn:function(){
	      this.system=0;
	    },
	    getValueFn:function(){
	      SZXJ.http(this,'get', appPathList.getStatus, {}, (response) => {
	      		
	          this.reply = response.data.reply;
	          this.book = response.data.book;
	          this.official = response.data.official;
	          this.system = response.data.system;
	      });
	      this.$nextTick(function(){
	                   this.displayFlag = true;
	                   var  This = this;
	                   setTimeout(function(){
	                      document.body.removeChild(document.getElementById("loading"));
	                   },300)
	                });
	    }
	},
  	head: function(){
  		return {
  			title: '消息-QC轻小说',
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
		
		body{padding-bottom:.8rem;background-color:#f4f4f4}
		.news .content{max-width: 7.5rem;margin:0 auto; margin-top: 0.88rem;}
		.news .content .main{border-bottom:1px solid rgba(0,0,0,.055);background-color:#fff;padding:3.5% 0}
		.news .content .main img{width:.6rem;height:.6rem;margin-left:10%;margin-right:3%;vertical-align:middle}
		.news .content .main .right{display:inline-block;vertical-align:middle}
		.news .content .main .right .title{font-size:.28rem;position:relative}
		.news .content .main .right .title .red{
			background-color: #EA5464;
		    color: #fff;
		    padding: .05rem .10rem;
		    border-radius: 1rem;
		    display: inline-block;
		    text-align: center;
		    font-size: .2rem;
		    position: absolute;
		    right: .25rem;
		    top: -.05rem;
		}
		.news .content .main .right .message{font-size:.24rem;color:#777;padding-top:5%}
	
</style>
<template>
	<div v-show="displayFlag" style="display: none;" id="official" class="official">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
		    <myheader msg="官方消息"></myheader>
		    <div class="main" v-for="obj in info">
		      <ul class="right">
		        <li class="title"><div>{{obj.messageTitle}}</div></li>
		        <li class="uptime">{{szxj.getLocalDate(obj.messageCreateDate)}}</li>
		        <li class="mess">{{obj.message}}</li>
		      </ul>    
		    </div>
		    <appBottom></appBottom>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Headerapt'
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
		'appPathList':appPathList,
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
		    obj:{
		      type:2,
		      pageNo:1,
		      pageSize:10, 
		    },
		    info:[],
		    windowFlag:false,
		    menuList: false,
		    toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
    	k_touch("official", "y");
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
	      SZXJ.http(this,'get', appPathList.queryMsg, this.obj, (response) => {
	          this.info = response.data.info;
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
  			title: '官方消息-QC轻小说',
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

		body{padding-bottom:.8rem;background-color:#f4f4f4}
		.official .content{max-width: 7.5rem;margin:0 auto;position:relative;min-height:12rem;margin-top: 0.88rem;}
		.official .content .main{background-color:#fff;padding:3% 0;border-bottom:1px solid rgba(0,0,0,.055)}
		.official .content .main .right{display:inline-block;vertical-align:middle;width:80%;margin-left:10%}
		.official .content .main .right .title{font-size:.28rem;display:inline-block;width:75%;vertical-align:middle}
		.official .content .main .right .title div{width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.official .content .main .right .mess{font-size:.24rem;margin-top:3%;min-height:.26rem;text-indent:.26rem}
		.official .content .main .right .uptime{display:inline-block;font-size:.2rem;color:#777;vertical-align:middle}
</style>
<template>
<div id="repl">
	<script src="/lib/resize_320.js"></script>
		<div class="cont">
			<span class="pro">亲，暂无消息</span>
		</div>
</div>
</template>

<script>
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
export default{
	components:{
		
	},
	data : function(){
		return{
			path:appPathList,
			szxj:SZXJ,
			record:[],
			ws:{},
		}
	},
	mounted: function(){  //ready -->
		this.$nextTick(function(){
		    if(window.plus){
		        this.plusReady();
		    }else{
		        document.addEventListener('plusready', this.plusReady, false);
		    }
		})
	},
	methods: {
		backFn:function(){
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
//				self.ws.opener().reload();  //webview重新加载
			}, false);
	    },
	    webviewAnimation:function(){
	      this.ws.hide('slide-out-right');
	    },
//		getValueFn: function(){
//			SZXJ.http(this,'get',appPathList.findCommentAndReplyByReplyUserId,this.obj,(response)=>{
//				this.record = response.data.info;
//				console.log(response.data.info);
//			})
//		},
	},
	head: function(){
		return{
			title:'@我的-QC轻小说',
			meta:[
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说@我"},
		        { name: "keywords",content:"轻小说@我"},
			],
			link:[
				
			],
		}
	},
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;user-select: none;}
	#repl{width: 100%;}
	#repl .cont{width: 100%;height: 100%;margin: 0 auto;margin-top: 50%;text-align: center;}
	#repl .cont .pro{font-size: .128rem;font-family: "微软雅黑";}
</style>
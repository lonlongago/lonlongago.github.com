<template>
	<div id="activity">
		<div class="actialls">
			<div class="activity_part" @click="goActivityFn">
			    <img src="http://cdn.qcacg.com/mobile/img/app_read/active1.png" style="width: 100%;" />
			    <p style="text-align: left;color: #989898;padding: 0.0853rem 0 0 0.128rem;">活动主题：2018秋季征文</p>
			    <p style="text-align: left;color: #989898;padding: 0.0853rem 0 0.0853rem 0.128rem;">结束时间：2017.4.15</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Path from "~/components/conf-app"
export default{
	data: function(){
		return{
			Path:Path,
			ws:{},
			view:{},
			wn:{},
			mWidth:0
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.mWidth = window.innerWidth;
			if(window.plus){
				this.plusReady();
			}else{
				document.addEventListener('plusready',this.plusReady,false);
			}
		})
	},
	methods: {
		backFn: function(){
			if(window.plus){
				this.ws.close('slide-out-right')
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
			this.view = this.ws.getTitleNView();
			plus.key.addEventListener('backbutton',function(){
	      	   self.ws.close("slide-out-right");
//	      	   self.ws.opener().reload();  //webview重新加载
	       })
		},
		goActivityFn:function(){
			if(window.plus){
				this.wn=plus.webview.create(Path.netWorks+'/activeDetails','activeDetails',
	            {
			        'popGesture':'close',
			        'titleNView':{
			        	'autoBackButton':true,
			        	'type':'transparent'
			        },
			        'backButtonAutoControl':'close',
			        'statusbar': {
			            'background': '#fff'
			        },
		        });
		        this.wn.onloading= function(){
					plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
				}
				this.wn.onloaded=function(){
					plus.nativeUI.closeWaiting();
				}
	            this.wn.show('slide-in-right');
			}
		}
	},
	head: function(){
  		return {
  			title: '活动-QC轻小说',
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
//				{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		],
  	  		script: [
  	  			{src:"/lib/resize_320.js"}
  	  		],
  	  }
  	}
}
</script>

<style>
	body{background-color: #F2F2F2;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;user-select:none;}
	#activity{position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f2f2f2;
    font-size: 12px;}
	#activity .actialls{
		margin: 0 auto;
		width: 100%;
		height: 100%;
		text-align: center;
		box-sizing: border-box;
        padding: 0.128rem;
    }
    #activity .actialls .activity_part{
    	background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 4px 4px #c3c3c3;
    }
       
</style>
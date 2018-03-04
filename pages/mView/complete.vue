<template>
	<div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; font-size: 12px;">
		<div class="content">
			<div class="top">
				<img src="http://cdn.qcacg.com/mobile/img/app_userInfo/regRight.png"  />
				<div style="font-size: 0.128rem; text-align: center; padding-top: 0.05rem; padding-bottom: 0.0424rem; color: #282828; width: 0.7rem; display: inline-block;">支付成功</div>
			</div>
			<div class="title">
				<span>此页面</span><span style="color: red;">{{num}}</span><span>秒后自动关闭</span>
			</div>
			<div style="margin-top: 0.5rem;text-align: -webkit-center;">
				<div class="btn" @click="goBackFn">
					关闭
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return {
				ws:{},
				num:5
			}
		},
		mounted:function(){
			this.$nextTick(function(){
				if(window.plus){
					this.plusReady();
				}else{
					document.addEventListener('plusready',this.plusReady,'false');
				}
				var self = this;
				setInterval(function(){
					console.log("asd")
					if(self.num>0){
			            self.num--;   
			        }else{   
			        	self.goBackFn()
			        	return
			        }
				},1000);  //设置的时间函数
			})
		},
		methods:{
			goBackFn:function(){
				this.ws.close("slide-out-right");
			},
			plusReady:function(){
				this.ws = plus.webview.currentWebview();
				this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
			        console.log('reject url: '+e.url);
			    });
				var view = this.ws.getTitleNView();
				var self = this;
				plus.key.addEventListener('backbutton',function(){
					self.ws.close("slide-out-right");
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
		        { rel: 'stylesheet', href: '/css/main_app.css' }
		    ],
		    script:[
		        {src:"/lib/resize_320.js"}
		    ]
	    }
	}
</script>

<style>
	.content{
		position: absolute;
		left: 0;
		right: 0;
		top: 25%;
	}
	.content .top{
		height: 0.2304rem;
		text-align: -webkit-center;
	}
	.content .top img{
		height: 0.2304rem;
		vertical-align: top;
	}
	.content .title{
		padding-top: 0.128rem;
		text-align: center;
	}
	.content .title span{
		display: inline-block;
		font-size: 0.1109rem;
		color: #989898;
	}
	.content .btn{
		font-size: 0.128rem;
		padding: 0.0683rem 0.1365rem;
		color: #fff;
		background-color: #ffce25;
		border-radius: 3px;
		display: inline-block;
	}
</style>
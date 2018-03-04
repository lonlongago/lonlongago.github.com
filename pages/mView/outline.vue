<template>
	<div style="position: fixed; top: 0; bottom: 0; left: 0; right: 0;background-color: #f2f2f2; font-size: 12px;">
		<div class="content">
			<textarea placeholder="请输入大纲内容" v-model="text"></textarea>
		</div>
		<div class="btn_container">
			<div class="queBtn" @click="submitFn">确认</div>
		</div>
	</div>
</template>

<script>
	import appPathList from "~/components/conf-app"
    import SZXJ from "~/components/vueHttp-app"
    export default{
    	data:function(){
    		return {
    			text:'',
    			ws:{}
    		}
    	},
    	mounted:function(){
    		if(localStorage.getItem('message')){
    			this.text = localStorage.getItem('message')
    		}
    		this.$nextTick(function(){
    			var self = this;
    			if(window.plus){
		          self.plusReady();
		        }else{
		          document.addEventListener('plusready',self.plusReady,false);
		        }
    		})
    	},
    	methods:{
    		plusReady:function(){
    			var self =this;
    			this.ws = plus.webview.currentWebview();
    			this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
		        console.log('reject url: '+e.url);
		      });
    			plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right");
				}, false);
    		},
    		submitFn:function(){
    			console.log(this.text);
    			var self = this;
    			if(this.text==''){
    				plus.nativeUI.toast("内容不能为空")
    				return
    			}
    			localStorage.setItem('message',self.text);
    			this.ws.opener().reload();
    			this.ws.close("slide-out-right");
    		}
    	},
    	head:{
    		title: '书籍创建页-QC轻小说',
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
	            {src:"/lib/resize_320.js"},
	        ]
    	}
    }
</script>

<style>
	.content{
		position: absolute;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0.3584rem;
	}
	.content textarea{
		padding: 0.128rem;
	    border: none;
	    width: 100%;
	    background-color: #f2f2f2;
	    box-sizing: border-box;
	    height: 100%;
	    resize:none
	}
	.btn_container{
		position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    height: 0.3854rem;
	    padding: 0.0853rem 0.128rem;
	    box-sizing: border-box;
	    border-top: 1px #c3c3c3 solid;
	}
	.btn_container .queBtn{
		border-radius: 3px;
	    background-color: #fedc6f;
	    height: 100%;
	    text-align: center;
	    font-size: 0.1365rem;
	    color: #fff;
	    box-sizing: border-box;
	    padding: 0.04rem;
	}
</style>
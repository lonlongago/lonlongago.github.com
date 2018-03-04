<template>
  <div id="reply">
    <!--<div class="tp"></div>
    <header>
      <a class="jump" @click="goBack" href="javascript:;"><img class="arrow" src="/img/app_talk/com.png" alt=""/></a>
      <span class="replay">发布回复</span>
      <span class="hr"></span>
    </header>-->
    <div class="content">
      <textarea ref="text" class="write" autofocus required  value=""></textarea>
      <div class="btn" @click="saveReply">回复 </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import appPathList from "~/components/conf-app"
import SZXJ from "~/components/vueHttp-app"
export default{
  data:function(){
    return {
      ws:{},
      wvs:[],
    }
  },
  asyncData(context){ 
    var obj = {};
    obj.commentId = context.params.id.split("&")[0];
    obj.replyStatus = context.params.id.split("&")[1];
    obj.replyUserId = context.params.id.split("&")[2];
    obj.repliedId = context.params.id.split("&")[3];
    if(obj.replyUserId == ''){
    	obj.replyUserId = 0;
    }
//  if(context.params.id.split("&")[2]==''){
//    obj.replyUserId = 0;
//  }
    console.log(obj.repliedId);
    return obj
  },
  mounted:function(){
    this.$nextTick(function(){
      if(window.plus){
        this.plusReady();
      }else{
        document.addEventListener('plusready',this.plusReady,false);
      }
    })
  },
  methods:{ 
    goBack:function(){
      if(window.plus){
        this.webviewAnimation();
      }else{
        history.back();
      }
    },
    plusReady:function(){
      var self = this;
      this.ws = plus.webview.currentWebview();
      this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
	        console.log('reject url: '+e.url);
	    });
      this.wvs = plus.webview.all();
      plus.key.addEventListener('backbutton', function(){
//    	self.ws.opener().evalJS('this.getComment(this.data1);');  //webview重新加载
//      self.ws.opener().reload();  //webview重新加载
				self.ws.close("slide-out-right");
			}, false);
    },
    webviewAnimation:function(){
      this.ws.hide('slide-out-right');
    },
    saveReply:function(){
      const text = this.$refs.text.value;
      if(text == ''){
      	if(window.plus){
    			plus.nativeUI.toast( "内容不能为空");
    		}
//      this.$refs.appAlert.setMessage("内容不能为空");
        return
      };
      var self = this;
      var _data = {
              replyStatus: this.replyStatus,
              commentId: this.commentId,
              replyUserId: this.replyUserId, 
              replyContent: text,
              repliedId:this.repliedId,
          };
          SZXJ.http(this,'post', appPathList.saveReply, _data, (res) => {     //提交回复
            if(res.data.code == 200){
            	if(window.plus){
			    			plus.nativeUI.toast( "回复成功");
			    			self.ws.opener().reload();  //webview重新加载
//				        self.ws.close("slide-out-right");
			    		}
            }
          },(err)=>{
          	if(window.plus){
		    			plus.nativeUI.toast(err.body.msg);
		    		}
//          this.$refs.appAlert.setMessage(err.body.msg);
          })
    }
  },
  head:{
    title: '回复页-QC轻小说',
    meta: [
      { charset: 'UTF-8' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: "apple-mobile-web-app-capable",content:"yes"},
      { name: "apple-mobile-web-app-status-bar-style",content:"default"},
      { name: "description",content:"轻小说章节"},
      { hid: "1",content:"no-cache", "http-equiv": "pragma"},
      { hid: "3",content:"no-cache", "http-equiv": "cache-control"},
      { hid: "2",content:"0", "http-equiv":"expires"}
    ],
    link: [
      { rel: 'stylesheet', href: '/css/main_app.css' }
    ],
    script:[
      { src: "/lib/resize_320.js"}
    ]
    }
}
</script>

<style>
	.tp{height: .171rem;background: white;width: 100%;}
  #reply{font-size: 12px;}
  #reply header{width: 100%;height: .3755rem;position: fixed; left: 0; right: 0; top: .171rem;background: white;}
  #reply header .jump{display: inline-block;vertical-align: middle;margin-left: .128rem;}
  #reply header .jump .arrow{display: inline-block;width:auto;height: 0.1365rem;}
  #reply header .replay{display:inline-block;font-size: .1365rem;color: #282828;vertical-align:middle;line-height:.3755rem;margin-left: 1.22rem;}
  #reply header .hr{position: absolute;bottom: 0;width: 100%;left: 0;height: 0.017rem;background-color: #ffc200;}
  #reply .content{width: 2.91rem;margin: 0 auto;/*margin-top: 0.5035rem;*/margin-top: .3rem;}
  #reply .content textarea{padding: .0853rem; width: 2.7306rem; height: 1.3312rem; border: 1px solid #C3C3C3;border-radius: 7px;resize: none;background-color: #f2f2f2;font-size: .1009rem;color:  #282828;padding: .0853rem;text-align: justify;}
  #reply .content .btn{width: 2.56rem;height: .256rem;margin: 0 auto;margin-top:.128rem;background-color: #fedc6f;border-radius: 6px;text-align: center;line-height: .256rem;color: #fff;font-size: .1067rem;}
</style>

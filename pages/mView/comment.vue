<template>
  <div id="com">
    <appAlert ref="appAlert"></appAlert>
    <!--<div class="tp"></div>
    <div class="comtop">
      <a class="jump" href="javascript:;" @click="goBack()"><img class="arrow" src="/img/app_talk/com.png" alt=""/></a>
      <span class="replay">发布评论</span>
    </div>-->
    <div class="content">
      <textarea class="write" autofocus required v-model="msg"></textarea>
      <div class="btn" @click = "saveComment()">评论 </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import appPathList from "~/components/conf-app"
import SZXJ from "~/components/vueHttp-app"
import appAlert from "~/components/AppAlert"
export default{
  components:{
    'appAlert':appAlert
  },
  asyncData:function(context){
    var obj = {};
    obj.bookId = context.params.id;
    console.log(obj.bookId)
    return obj;
  },
  data:function(){
    return {
      msg:'',
      bookId:'',
      ws:{},
      webBook:{},
      wvs:[],
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      console.log(this.bookId)
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
        history.back()
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
				self.ws.close("slide-out-right");
			}, false);
    },
    webviewAnimation:function(){
      this.ws.close('slide-out-right');
    },
    saveComment:function(){
      if(this.msg==''){
      	if(window.plus){
    			plus.nativeUI.toast( "内容不能为空");
    		}
//      this.$refs.appAlert.setMessage('内容不能为空');
        return 
      }
      if(this.bookId != ''){
      	var _data = {
          commentContent: this.msg, //文本html内容
          bookId: this.bookId, // 卷id
	      };
	      var self =this;
	      SZXJ.http(this,'post', appPathList.saveComment, _data, (response) => {
	          this.msg = '';
	    			plus.nativeUI.toast( "发表成功");
	    			self.ws.opener().reload();
	//		      self.ws.close("slide-out-right");
	      },(err) => {
	      	  plus.nativeUI.toast(err.data.msg);
	      })
      }else{
      	var data1 = {
      		activeId:2,
					commentContent:this.msg,
					commentType:0,
      	};
      	var self = this;
      	SZXJ.http(this,'post',appPathList.collectSetComment,data1,(response)=>{
      		this.msg = '';
	    	  plus.nativeUI.toast( "发表成功");
      		console.log(JSON.stringify(self.ws))
      		self.ws.opener().reload();
      	},(err)=>{
      		if(window.plus){
	    			plus.nativeUI.toast(err.data.msg);
	    		}
      	})
      }
    }
  },
  head:{
      title: '评论页-QC轻小说',
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
	.tp{height: .171rem;background: white;}
  #com{font-size: 12px;}
  #com .comtop{width: 100%;height: .3755rem;position: fixed; left: 0; right: 0;}
  #com .comtop:after{height: 2px;position: absolute;left: 0;right: 0;bottom: 0;content: '';background: #ffc200;}
  #com .comtop .jump{display: inline-block;vertical-align: middle;margin-left: .128rem;}
  #com .comtop .jump .arrow{display: inline-block;width:auto;height: 0.1365rem;}
  #com .comtop .replay{display:inline-block;font-size: .1365rem;color: #282828;vertical-align:middle;line-height:.3755rem;margin-left: 1.22rem;}
  #com .content{width: 2.91rem;margin: 0 auto;margin-top: 0.3rem;}
  #com .content textarea{padding: .0853rem; width: 2.7306rem; height: 1.3312rem; border: 1px solid #C3C3C3;border-radius: 7px;resize: none;background-color: #f2f2f2;font-size: .1009rem;color:  #282828;padding: .0853rem;text-align: justify;}
  #com .content .btn{width: 2.56rem;height: .256rem;margin: 0 auto;margin-top:.128rem;background-color: #fedc6f;border-radius: 6px;text-align: center;line-height: .256rem;color: #fff;font-size: .1067rem;}
</style>
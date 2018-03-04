<template>
	<div id="replyWrap" v-show="displayFlag" >
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div class="replyWrap">
			<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
			<myheader msgfromfa="分类"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
			<div class="reply">
		      <textarea class="replyContent" v-model="content"></textarea>
		      <div class="replyBtn" @click="send">回复</div>
		    </div>
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
		'myheader':Header
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			displayFlag:false,
	        bookId: "",
	        content: "",
	        commentId: "",
	        userId: "",
	        replyUserId: "",
	        replyStatus:0,
	        menuList: false,
	        toWrap: false,
	        loginFlag: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.bookId = SZXJ.getQueryString('bookId');
        this.commentId = SZXJ.getQueryString('commentId');
        this.replyUserId = SZXJ.getQueryString('userId');
      	k_touch("replyWrap", "y");
        if(SZXJ.getQueryString('status')){
           this.replyStatus = SZXJ.getQueryString('status');
        }
        SZXJ.http(this, 'get', appPathList.getStatus, {}, (res)=>{
            this.loginFlag = res.data.loginFlag;
        });
        if(document.getElementById("loading")){
          setTimeout(function(){
            document.body.removeChild(document.getElementById("loading"));
          },300)
        }  
        this.displayFlag = true;
	  })
	},
	methods: {
	        setComment: function() {
	            prompt("发送成功");
	            let data = {
	                bookId: this.bookId,
	                commentContent: this.content
	            };
	            SZXJ.http(this, 'post', appPathList.saveComment, data, (res)=>{
	                window.history.back();    
	            });
	        },
	        setReply: function() {
//	        	if(this.content==""){
//	        		prompt("评论内容不能为空");
//	        		return;
//	        	}
//	            prompt("评论过于频繁");
	            let data = {
	                commentId: this.commentId,
	                replyContent: this.content,
	                replyUserId: this.replyUserId,
	                replyStatus: this.replyStatus
	            };
	            SZXJ.http(this, 'post', appPathList.saveReply, data, (res)=>{
	                window.history.back();
	            },(err)=>{prompt(err.data.msg)});
	        },
	        send: function() {
	        		if(!this.loginFlag){
	        			window.location.href = "/app/login";
	        		};
	            if(this.commentId){
	                console.log(this.commentId)
	                this.setReply();
	            }else{
	                this.setComment();
	            }
	        },
	        back: function() {
	            window.history.back();
	        },
	        showMenu: function() {
	            this.menuList = !this.menuList
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        }
        },
  	head: function(){
  		return {
  			title: '回复-QC轻小说',
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

		body{padding-bottom:.8rem;}
		.replyWrap .reply{background-color:#FCFCFC;padding:.26rem 0;margin-top: 0.88rem;}
		.replyWrap .reply .replyContent{display:block;width:6rem;height:3rem;margin:0 auto;font-size:.32rem;resize:none;border:none;border-radius:0;-webkit-appearance:none;-webkit-user-select:auto}
		.replyWrap .reply .replyBtn{display:block;width:5.92rem;margin:0 auto;margin-top:.29rem;padding:.08rem 0;background-color:#5BD0F5;border-radius:.06rem;font-size:.30rem;color:#FFF;text-align:center}
		.replyWrap .blackWrap{background-color:#000;opacity:.4;width:100%;height:100%;position:fixed;left:0;top:0;z-index:10}
</style>
<template>	
	<div id="commentSecond">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="commentSecond" v-cloak>
			<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
			<myheader msgfromfa="评论"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
		    <div class="comment">
	    	    <a :href="'/app/reply?commentId=' + replyData.commentId + '&userId=' + replyUserId + '&status=0'">
		    		<div class="userHead">
		    		    <img :src="comment.userHead ? path.imagePath + comment.userHead : 'http://cdn.qcacg.com/img/app_book/userHead.png'"/>
		    		</div>
		    		<div class="commentContent">
		    		    <div class="userName">
		    		        <p v-cloak>{{comment.userName}}</p>
		    		    </div>
		    		    <div class="commentTime">
		    		        <p v-cloak>{{comment.commentDate | commentTime}}</p>
		    		    </div>
		    		    <div class="commentText">
		    		        <p v-html="comment.commentContent">{{comment.commentContent}}</p>
		    		    </div>
		    		</div>
		    		<div class="commentBottom">
	                    <div class="lookNums">
	                        <img src="http://cdn.qcacg.com/img/app_comment/eye.png"/>
	                        <p v-cloak>&nbsp;{{replyTotal}}</p>
	                    </div>
	                    <div class="replyBtn">
	                        <img src="http://cdn.qcacg.com/img/app_comment/reply.png"/>
	                        <p>&nbsp;回复</p>
	                    </div>
	                </div>
	    	    </a>
	    	</div>
	    	<div class="replyNums" v-cloak>
	    	          共 &nbsp; {{replyTotal}} &nbsp; 条
	    	</div>
	    	<ul class="replyList">
	            <li v-for="reply in replyList" v-cloak>
	                <a :href="'/app/reply?commentId=' + replyData.commentId + '&userId=' + reply.userId + '&status=1'">
	                    <div class="userHead">
	                        <img :src="reply.userHead ? path.imagePath + reply.userHead : 'http://cdn.qcacg.com/img/app_book/userHead.png'"/>
	                    </div>
	                    <div class="replyContent">
	                        <div class="userName">
	                            <p>{{reply.userName}}</p>
	                        </div>
	                        <div class="replyText">
	                            <p><span class="replyUser" v-show="replyUserId != reply.replyUserId">@{{reply.replyUserName}}</span><span v-html="reply.replyContent">{{reply.replyContent}}</span></p>
	                        </div>
	                        <div class="replyTime">
	                            <p>{{reply.replyDate | commentTime}}</p>
	                        </div>
	                    </div>
	                    <div class="replyBtn">
	                        <img src="http://cdn.qcacg.com/img/app_comment/reply.png"/>
	                        <p>&nbsp;回复</p>
	                    </div>
	                </a>
	            </li>
	        </ul>
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
	asyncData:function(context){
		var obj={};
	    obj.id = context.params.id;
		    console.log(context);
		    console.log(obj.id);
		return obj;
	},
	data : function() {
		return {
	      	displayFlag:false,
	        commentData: {
	           bookId: "",
	           pageNo: 1,
	           pageSize: 10,
	           status: 0
	        },
	        replyData: {
	            commentId: "",    
	            pageNo: 1,
	            pageSize: 10
	        },
	        path: appPathList,
	        commentIndex:0,
	        comment: {},
	        replyList: {},
	        replyTotal: "",
	        currentTime: "",
	        replyUserId: "",
	        book: true,
	        menuList: false,
	        toWrap: false,
	        commentSec: {
	            commentId:0,    
	            pageNo: 1,
	            pageSize: 10,
	            status:'',
	        },
		}
	},
	filters: {
        commentTime: function(value) {
        	var currentTime = new Date().getTime();
            let time = currentTime - value;
            if(Math.floor(time/31536000000) > 0){
                return Math.floor(time/31536000000) + "年前";
            };
            if(Math.floor(time/2592000000) > 0){
                return Math.floor(time/2592000000) + "月前";
            };
            if(Math.floor(time/604800000) > 0){
                return Math.floor(time/604800000) + "周前";
            };
            if(Math.floor(time/86400000) > 0){
                return Math.floor(time/86400000) + "天前";
            };
            if(Math.floor(time/3600000) > 0){
                return Math.floor(time/3600000) + "小时前";
            };
            if(Math.floor(time/60000) > 0){
                return Math.floor(time/60000) + "分钟前";
            }
            if(Math.floor(time/1000) > 0){
                return Math.floor(time/1000) + "秒前";
            }else{
                return "0秒前";
            }
        },
    },
    mounted: function () { // ready -->
	  this.$nextTick(function () {
		k_touch("commentSecond", "y");
	  	this.commentSec.commentId = SZXJ.getQueryString('commentId');
        this.commentData.bookId = SZXJ.getQueryString('bookId');
        this.commentData.status = SZXJ.getQueryString('status');
        this.commentData.pageSize = SZXJ.getQueryString('pageSize');
        this.commentIndex = SZXJ.getQueryString('commentIndex');
        if(SZXJ.getQueryString('commentId')){
          this.geTreply();
        }else{
          this.getReply();
        }
        this.displayFlag = true;
	  })
	},
	methods: {
	        geTreply:function() {
	            SZXJ.http(this, 'post', appPathList.findCommentAndReplyByOneLever, this.commentSec, (res)=>{
	                this.comment = res.data.comment[0];
	                this.replyList = res.data.comment[0].replyEntityList;
	                this.replyTotal = res.data.comment[0].totalCount;
	                this.replyData.commentId = res.data.comment[0].commentId;
	                this.replyUserId = res.data.comment[0].userId;
	                this.currentTime = new Date().getTime();
	                if(this.replyTotal > 10){
	                    this.replyData.pageSize = res.data.comment[0].totalCount;
	                    SZXJ.http(this, 'get', appPathList.moreReply, this.replyData, (res)=>{
	                        console.log(res);
	                        this.currentTime = new Date().getTime();
	                        this.replyList = res.data;
	                    });
	                };
	                this.$nextTick(function(){
	                   this.displayFlag = true;
	                   var  This = this;
	                   setTimeout(function(){
	                      document.body.removeChild(document.getElementById("loading"));
	                   },300)
	                });
	            });
	        },
	        getReply:function() {
	            SZXJ.http(this, 'get', appPathList.findCommentAndReply, this.commentData, (res)=>{
	                console.log(res);
	                this.comment = res.data.comment[this.commentIndex];
	                this.replyList = res.data.comment[this.commentIndex].replyEntityList;
	                this.replyTotal = res.data.comment[this.commentIndex].totalCount;
	                this.replyData.commentId = res.data.comment[this.commentIndex].commentId;
	                this.replyUserId = res.data.comment[this.commentIndex].userId;
	                this.currentTime = new Date().getTime();
	                if(this.replyTotal > 10){
	                    this.replyData.pageSize = res.data.comment[this.commentIndex].totalCount;
	                    SZXJ.http(this, 'get', appPathList.moreReply, this.replyData, (res)=>{
	                        console.log(res);
	                        this.currentTime = new Date().getTime();
	                        this.replyList = res.data;
	                    });
	                };
	            });
	            this.$nextTick(function(){
	                   this.displayFlag = true;
	                   var  This = this;
	                   setTimeout(function(){
	                      document.body.removeChild(document.getElementById("loading"));
	                   },300)
	                 });
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
  			title: '二级评论-QC轻小说',
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
		[v-cloak]{display:none}
		.commentSecond .cephalosome span{color: #7E7E7E;}
		.commentSecond .comment{margin-bottom:.22rem;background-color:#FCFCFC;position:relative;margin-top:0.88rem;}
		.commentSecond .comment a{display:block;padding-top:.29rem;padding-bottom:.19rem}
		.commentSecond .comment .userHead{display:inline-block;margin-left:.81rem}
		.commentSecond .comment .userHead img{width:.5rem;height:.5rem;border-radius:.25rem}
		.commentSecond .comment .commentContent{display:inline-block;width:5.6rem;margin-left:.15rem;vertical-align:top}
		.commentSecond .comment .commentContent .userName{margin-top:.07rem;font-size:.24rem;color:#4D4D4D}
		.commentSecond .comment .commentContent .commentTime{margin-top:.14rem;font-size:.2rem;color:#646363}
		.commentSecond .comment .commentContent .commentText{font-size:.30rem;line-height:.3rem;min-height:.3rem;color:#646363;margin-top:.23rem;margin-bottom:.57rem}
		.commentSecond .comment .commentContent .commentText p img {width: 0.4rem;}
		.commentSecond .comment .commentBottom .lookNums{display:inline-block;margin-left:.76rem}
		.commentSecond .comment .commentBottom .lookNums img{width:.18rem;height:.12rem;vertical-align:middle}
		.commentSecond .comment .commentBottom .lookNums p{display:inline-block;font-size:.24rem;color:#9D9D9D;vertical-align:middle}
		.commentSecond .comment .commentBottom .replyBtn{display:inline-block;position:absolute;right:.48rem;bottom:.15rem}
		.commentSecond .comment .commentBottom .replyBtn img{width:.22rem;height:.19rem;vertical-align:middle}
		.commentSecond .comment .commentBottom .replyBtn p{display:inline-block;font-size:.26rem;color:#A7A7A7;vertical-align:middle;margin-top:.03rem}
		.commentSecond .replyNums{background-color:#FCFCFC;font-size:.24rem;padding-top:.2rem;padding-bottom:.15rem;padding-left:.59rem;color:#727272}
		.commentSecond .replyList{margin-bottom:.7rem}
		.commentSecond .replyList li{display:block;background-color:#FCFCFC;margin-bottom:.04rem;position:relative}
		.commentSecond .replyList li a{display:block;padding-top:.14rem;padding-bottom:.09rem}
		.commentSecond .replyList li .userHead{display:inline-block;vertical-align:top}
		.commentSecond .replyList li .userHead img{width:.4rem;height:.4rem;border-radius:.2rem;margin-left:.9rem}
		.commentSecond .replyList li .replyContent{display:inline-block;margin-left:.16rem;width:5.4rem;color:#727272}
		.commentSecond .replyList li .replyContent .userName{font-size:.24rem;color:#4B4A4A;margin-top:.12rem}
		.commentSecond .replyList li .replyContent .replyText{font-size:.28rem;line-height:2;margin-top:.23rem;margin-bottom:.2rem}
		.commentSecond .replyList li .replyContent .replyText p img{width: 0.4rem;}
		.commentSecond .replyList li .replyContent .replyText .replyUser{float:left;color:#0086B3;margin-right:.1rem}
		.commentSecond .replyList li .replyContent .replyTime{font-size:.2rem}
		.commentSecond .replyList li .replyBtn{display:inline-block;position:absolute;right:.42rem;bottom:.09rem}
		.commentSecond .replyList li .replyBtn img{width:.22rem;height:.19rem;vertical-align:middle}
		.commentSecond .replyList li .replyBtn p{display:inline-block;font-size:.24rem;color:#A7A7A7;vertical-align:middle;margin-top:.03rem}
		.commentSecond .commonBottom{background-color:#FFF;width:100%;position:fixed;bottom:0;z-index:10;border-top:.01rem solid #F3F3F3}
		.commentSecond .commonBottom ul{font-size:0;padding-top:.15rem;padding-bottom:.13rem;text-align:center;overflow:hidden}
		.commentSecond .commonBottom ul li{display:inline-block;font-size:.2rem;margin:0 .78rem;text-align:center}
		.commentSecond .commonBottom ul .book img{width:.19rem;height:.21rem}
		.commentSecond .commonBottom ul .bookshelf img{width:.24rem;height:.2rem}
		.commentSecond .commonBottom ul .message img{width:.28rem;height:.23rem}
		.commentSecond .commonBottom ul .personal img{width:.23rem;height:.23rem}
		.commentSecond .commonBottom ul li p{margin-top:.05rem;color:#999}
</style>
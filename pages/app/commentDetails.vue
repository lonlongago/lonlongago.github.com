<template>
  <div style="font-size: 12px; background-color: #f2f2f2; min-height: 5.25rem;">
    <div class="header_comment">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>评论详情</span>
      </div>
    </div>
    <div class="comment">
      <div class="comment_all">
        <div class="comment_user">
            <!--<img :src="path.imagePath + temp.userHead" style="border-radius: 100%;"/>-->
            <img src="/img/app_newBook/people.png" style="border-radius: 100%; width: 100%; height: 100%;"/>
        </div>
        <div class="comment_details">
          <div class="comment_content_header">
            <span class="comment_user_name">{{comment.userName}}</span>
            <span style="display: inline-block; float: right; margin-left: 0.128rem;" class="btn" @click="replyFn(comment.commentId,0,'')">
              <img src="/img/app_newBook/huihua.png" style="width: 0.1024rem; height: 0.1024rem;"/>
            </span>
            <span style="display: inline-block; float: right;" >
              <span>{{comment.totalCount}}</span>
              <img src="/img/app_newBook/yan.png" style="width: 0.1024rem; height: 0.0824rem;margin-left: 0.0427rem;"/>
            </span>
          </div>
          <span class="comment_user_time">{{comment.commentDate | reverse}}</span>
          <div class="comment_user_reply" v-html="comment.commentContent">{{comment.commentContent}}</div>
        </div>
      </div>
      <div class="reply_list">
        <div class="reply_part" v-for="(obj,index) in comment.replyEntityList" >
          <div class="reply_user">
              <!--<img :src="path.imagePath + temp.userHead" style="border-radius: 100%;"/>-->
            <img src="/img/app_newBook/people.png" style="border-radius: 100%; width: 100%; height: 100%;"/>
          </div>
          <div class="reply_details">
            <div class="reply_content_header">
              <span class="reply_user_name">{{obj.userName}}</span>
              <span style="display: inline-block; float: right; margin-left: 0.128rem;" class="btn" @click="replyFn(comment.commentId,1,obj.replyUserId)">
                <img src="/img/app_newBook/huihua.png" style="width: 0.1024rem; height: 0.1024rem;"/>
              </span>
            </div>
            <div class="reply_user_time">{{obj.replyDate | reverse}}</div>
            <div class="reply_user_reply" >
              <span v-if="obj.replyStatus==1">
                <span style="color: lightskyblue;font-size: 0.1024rem;">@</span>
                <span style="color: #848484; font-size: 0.1024rem;">{{obj.replyUserName}}</span>
              </span>
              <span v-html="obj.replyContent" style="font-size: 0.1024rem; color: #282828;">{{obj.replyContent}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment_bottom btn">
      <a href="javascript:;" @click="replyFn(comment.commentId,0,'')">发表回复</a>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  export default{
    asyncData:function(context){
      var obj = {};
      var data1 = {};
      obj.commentId = context.params.id.split('&')[0];
      obj.bookId = context.params.id.split('&')[1];
//    data1.bookId = obj.commentId;
//    data1.pageNo = 1;
//    data1.pageSize = 10;
//    data1.status = 0;
//    
//    return axios.get(appPathList.findCommentAndReply+'?bookId='+this.bookId+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize+'&status='+_data.status).then(function(res){
//      
//    }).catch(function(err){
//      
//    })
      return obj;
    },
    data:function(){
      return {
        bookId:15,
        comment:{},
        commentCount:0,
        commentId: 267,
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        var data1 = {};
        data1.bookId = this.bookId;
        data1.pageNo = 1;
        data1.pageSize = 10;
        data1.status = 0;
        this.getComment(data1);
      });
    },
    filters:{
      reverse:function(value){
        var currentTime = new Date();
        let time = currentTime.getTime() - value;
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
    methods:{
      replyFn:function(a,b,c){
        location.href = '/app/replay/'+a+'&'+b+'&'+c;
      },
      goBack:function(){
        history.back();
      },
      getComment:function(_data){
        var self = this;
        SZXJ.http(this,'get', appPathList.findCommentAndReply+'?bookId='+this.bookId+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize+'&status='+_data.status, {}, (res) => {
          console.log(res);
          for(var i=0; i<res.body.comment.length ; i++){
            if(self.commentId == res.body.comment[i].commentId){
              self.comment = res.body.comment[i];
            }
          }
          console.log(self.comment);
        })
      },
      getSecComment:function(){
        var self = this;
        SZXJ.http(this, 'post', appPathList.findCommentAndReplyByOneLever, this.commentSec, function (res) {
          self.comment = res.data.comment[0];
        })  
      }
    },
    head:{
      title: '评论详情-QC轻小说',
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
  .header_comment{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: 0; left: 0;right: 0;
    z-index: 25;
  }
  .header_comment:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_comment .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_comment .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_comment .header_title{
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    width: 77.5%;
  }
  .header_comment .header_title span{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    float: right;
    text-overflow: ellipsis;
    text-align: center;
    padding-top: 0.0768rem;
    padding-bottom: 0.0768rem;
    font-size: 0.1365rem;
    line-height: .2048rem;
  }
  .comment{
    margin-top: 0.3584rem;
    min-height: 3rem;
    
  }
  .comment .comment_all{
    min-height: 0.6912rem;
    background-color: #fff;
    width: 100%;
    padding: 0.0853rem 0.128rem;
    box-sizing: border-box;
  }
  .comment .comment_all .comment_user{
    display: inline-block;
    vertical-align: top;
    width: 12%;
    padding-right: 3%;
  }
  .comment .comment_all .comment_details{
    display: inline-block;
    vertical-align: top;
    width: 85%;
  }
  .comment .comment_all .comment_details .comment_content_header{
    font-size: 0.1024rem;
    padding: 0.0341rem 0;
  }
  .comment .comment_all .comment_details .comment_content_header .comment_user_name{
    color: #848484;
    font-size: 0.1024rem;
  }
  .comment .comment_all .comment_details .comment_user_time{
    font-size: 0.1024rem;
    color: #9d9d9d;
  }
  .comment .comment_all .comment_details .comment_user_reply{
    color:#282828;
    font-size: 0.128rem;
    padding-top: 0.06826rem;
  }
  .comment .reply_list{
    margin-bottom: 0.3584rem;
    padding: 0 0.128rem;
  }
  .comment .reply_list .reply_part{
    
    width: 100%;
    padding: 0.0853rem 0;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .comment .reply_list .reply_part .reply_user{
    display: inline-block;
    vertical-align: top;
    width: 12%;
    padding-right: 3%;
  }
  .comment .reply_list .reply_part .reply_details{
    display: inline-block;
    vertical-align: top;
    width: 85%;
  }
  .comment .reply_list .reply_part .reply_details .reply_user_time{
    font-size: 0.0512rem;
    color: #9d9d9d;
    padding-top: 0.0384rem;
  }
  .comment .reply_list .reply_part .reply_details .reply_user_reply{
    color:#282828;
    font-size: 0.128rem;
    padding-top: 0.06826rem;
  }
  .comment_bottom{
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.3584rem;
    background-color: #fedc6f;
    color: #fff;
    font-size: 0.128rem;
    text-align: center;
  }
  .comment_bottom a{
    color: #fff;
    font-size: 0.128rem;
    padding: 0.128rem 0;
    display: inline-block;
  }
</style>
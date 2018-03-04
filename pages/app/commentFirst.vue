<template>
  <div style="font-size: 12px;">
    <div class="header_comment">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>全部评论</span>
      </div>
    </div>
    <div class="newComment">
      <div class="header_title">最新评论</div>
      <a href="javascript:;" style="color: #989898; float: right;font-size: 0.1195rem;">{{commentCount}}条</a>
    </div>
    <div class="comment_list">
      <div class="comment_part" v-for="(temp,index) in comment" :style="index==comment.length - 1?'':''">
        <div class="comment_user">
          <!--<img :src="path.imagePath + temp.userHead" style="border-radius: 100%;"/>-->
          <img src="/img/app_newBook/people.png" style="border-radius: 100%;"/>
        </div>
        <div class="comment_content">
          <div class="comment_content_header" @click="joinCommentDetails(temp.commentId)">
            <span class="comment_user_name">{{temp.userName}}</span>
            <span class="comment_user_time">{{temp.commentDate | reverse}}</span>
          </div>
          <div class="comment_user_reply" v-html="temp.commentContent" style="line-height: 1.3;">{{temp.commentContent}}</div>
          <div class="comment_other_reply" v-if="temp.replyEntityList.length!=0">
            <div class="comment_reply_part" >
              <div class="user_comment" >
                <div class="user_comment" v-for="(obj,index) in temp.replyEntityList" v-if="index<2">
                  <div v-if="obj.replyStatus==0" style="padding: 0.0256rem 0;display: inline-block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                    <span>
                      <span style="color: #989898; font-size: 0.1024rem;">{{obj.userName}}</span>:
                    </span>
                    <span v-html="obj.replyContent" style="font-size: 0.1024rem;white-space:normal"></span>
                  </div>
                  <div v-if="obj.replyStatus==1" style="padding: 0.0256rem 0;display: inline-block;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                    <span class="aite_user" >
                      <span style="color: #989898;font-size: 0.1024rem;">{{obj.userName}}</span>
                      <span style="color: lightskyblue;">@</span>
                      <span style="color: #989898;font-size: 0.1024rem;">{{obj.replyUserName}}</span>:
                    </span>
                    <span v-html="obj.replyContent" style="white-space:normal"></span>
                  </div>
                </div>
              </div>
            </div>
            <a :href="'/app/commentDetails/'+temp.commentId+'&'+bookId" class="comment_reply_count" style="font-size: 0.1024rem;">共{{temp.replyEntityList.length}}条回复</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="numBer < 1 " class="more">
      <div class="left"></div>
      <span>没有更多内容了哦</span>
      <div class="left"></div>
    </div>
    <!--<div v-if="updateFlag" class="loadingWait">
        <img src="http://cdn.qcacg.com/img/loading.gif" alt="" />
        <span>正在加载中..</span>
    </div>-->
    <div class="comment_bottom btn">
      <a href="javascript:;" @click="commentFn(bookId)">发表评论</a>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp"
  import appAlert from "~/components/AppAlert"
  import appConfirm from "~/components/AppConfirm"
  export default{
    asyncData:function(context){
      var obj = {};
      obj.bookId = context.params.id;
      return obj
    },
    data:function(){
      return {
        bookId:15,
        comment:[],
        commentCount:0,
        offsetHeight:0,
        clientHeight:0,
        srcollTop:0,
        srcollH:0,
        topFlag:false,
        isTop:false,
        updateFlag:false,
        number:1,
        data1:{
          bookId:0,
          pageNo:1,
          pageSize:10,
          status:0
        },
        max:1000,
        control:1,
        numBer:0
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        window.addEventListener('scroll', this.onscrollFn);
//      var data1 = {};
        this.data1.bookId = this.bookId;
        
        this.getComment(this.data1);
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
      goBack:function(){
        history.back();
      },
      onscrollFn:function(){  
          this.offsetHeight = document.documentElement.offsetHeight;   // 页面总高度
          this.clientHeight = document.documentElement.clientHeight;   // 可视区高度
          this.srcollTop  = document.documentElement.scrollTop || document.body.scrollTop ;   //滚动条的高度 
          this.srcollH  = document.body.scrollHeight;
          if(this.control !=1 ){
            return
          }
          if ( this.offsetHeight - this.clientHeight  <  this.srcollTop + 300  ) {
            this.control = 2;
            this.lastupdataFn();  
          };
          var self = this
          setTimeout(function(){
            self.control = 1;
          },500)
          if( this.srcollTop >= this.clientHeight ){
              this.topFlag = true;
          }else{
              this.topFlag = false;
          };
          if(!this.isTop){
            clearInterval(this.timer);
          } 
          this.isTop = false;
      },
      lastupdataFn:function(){
        this.data1.pageNo = this.data1.pageNo +1;
//      console.log(this.max);
        if(this.data1.pageNo < this.max){
          this.getComment(this.data1);
        }else{
        }
      },
      getComment:function(_data){
        var self = this;
        if(this.numBer < 1){
          this.updateFlag = false;
        }else{
          this.updateFlag = true;
        }
        SZXJ.http(this,'get', appPathList.findCommentAndReply+'?bookId='+this.bookId+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize+'&status='+_data.status, {}, (res) => {
          self.commentCount = res.data.totalCount;
          self.numBer = res.data.comment.length;
          if(self.numBer!=0){
            for( var i = 0 ; i < self.numBer ; i++  ){
              self.comment.push(res.data.comment[i]);
            }
          }else{
            self.max = self.data1.pageNo;
          }
        })
      },
      commentFn:function(a){
        SZXJ.http(this,'get', appPathList.getStatus, {}, (res) => {
          if(res.data.loginFlag){
            location.href = '/mView/comment/'+a;
          }else{
            location.href = '/app/login';
          }
        })
      },
      joinCommentDetails:function(a){
        SZXJ.http(this,'get', appPathList.getStatus, {}, (res) => {
          console.log(res)
          if(res.data.loginFlag){
            location.href = '/app/commentDetails/'+a+'&'+this.bookId;
          }else{
            location.href = '/app/login';
          }
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
  .newComment{
    background-color: #f2f2f2;
    position: fixed; top: 0.3584rem; left: 0;right: 0;
    min-height: 0.128rem;
    padding: 0.128rem;
    z-index: 25;
  }
  /*.newComment{
    position: relative;
    min-height: 0.128rem;
    padding: 0.128rem;
  }*/
  .newComment  .header_title{
    float: left;
    font-size: 0.1195rem;
    font-weight: 500;
  }
  .comment_list{
    margin-top: 0.7168rem;
    box-sizing: border-box;
    padding: 0 0.128rem;
    margin-bottom: 0.3584rem;
  }
  .comment_list .comment_part{
    padding: 0.1024rem 0;
    position: relative;
  }
  .comment_list .comment_part:after{
    content: '';
    position: absolute;
    left: 0rem;
    right: 0rem;
    bottom: 0;
    height: 1px;
    background-color: #ccc;
  }
  .comment_list .comment_part .comment_user{
    display: inline-block;
    width: 12%;
    /*height: 0.2731rem;*/
    /*margin-right: 0.0512rem;*/
    padding-right: 3%;
    vertical-align: top;
  }
  .comment_list .comment_part .comment_user img{
    width: 100%;
    height: 100%;
  }
  .comment_list .comment_part .comment_content{
    display: inline-block;
    width: 85%;
    /*min-height: 0.5rem;*/
    /*background-color: #92C202;*/
    vertical-align: top;
  }
  .comment_list .comment_part .comment_content .comment_content_header{
    height: 0.1024rem;
    width: 100%;
    font-size: 0.1024rem;
    padding-bottom: 0.0512rem;
  }
  .comment_list .comment_part .comment_content .comment_content_header .comment_user_name{
    font-size: 0.1024rem;
    float: left;
  }
  .comment_list .comment_part .comment_content .comment_content_header .comment_user_time{
    font-size: 0.1024rem;
    float: right;
    color: #989898;
  }
  .comment_list .comment_part .comment_content .comment_user_reply{
    font-size: 0.128rem;
    padding-bottom: 0.0512rem;
  }
  .comment_list .comment_part .comment_content .comment_user_reply p{
    font-size: 0.128rem;
    /*padding-bottom: 0.0512rem;*/
    line-height: 1.3;
  }
  .comment_list .comment_part .comment_content .comment_other_reply{
    /*min-height: 0.8rem;*/
    background-color: #f2f2f2;
    padding: 0.0853rem;
  }
  .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_part{
    padding: 0.0256rem 0;
  }
  .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_part span{
    font-size: 0.0853rem;
  }
  .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_count{
    color: #c5eef3;
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
  .more{color:#777;font-size:.128rem;text-align:center;padding:2% 0;margin-bottom: 0.5rem;}
  .more span{display:inline-block;color:#777;margin:0 3%}
  .more .left{width:.25rem;border:.012rem solid #777;display:inline-block;vertical-align:middle}
  .loadingWait{text-align: center;height: 0.8rem;position: relative;}
  .loadingWait img{
    vertical-align: baseline;
    position: absolute;
    box-sizing: border-box;
    height: .2rem;
    width: auto;
    right: 56%;}
  .loadingWait span{    
    color: #777;
    display: inline-block;
    right: 30%;
    font-size: 0.128rem;
    }
</style>
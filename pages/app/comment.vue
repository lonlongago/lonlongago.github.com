<template>
  <div id="com">
    <appConfirm ref="appConfirm"></appConfirm>
    <header>
      <a class="jump" href="javascript:;" @click="goBack()"><img class="arrow" src="/img/app_talk/com.png" alt=""/></a>
      <span class="replay">发布评论</span>
    </header>
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
import appConfirm from "~/components/AppConfirm"
export default{
  components:{
    'appConfirm':appConfirm
  },
  asyncData:function(context){
    var obj = {};
    obj.bookId = context.params.id;
    return obj;
  },
  data:function(){
    return {
      msg:'',
      bookId:0,
    }
  },
  mounted:function(){
    this.$nextTick(function(){
    })
  },
  methods:{
    goBack:function(){
      history.back();
    },
    saveComment:function(){
      if(this.msg==''){
        this.$refs.appConfirm.setMessage('内容不能为空');
        return 
      }
      var _data = {
          commentContent: this.msg, //文本html内容
          bookId: this.bookId, // 卷id
      };
      var self =this;
      SZXJ.http(this,'post', appPathList.saveComment, _data, (response) => {
          this.msg = '';
          this.$refs.appConfirm.setMessage('发表成功');
          setTimeout(function(){
            history.back();
          },500)
      },(err) => {
        if(err.body.code==901){
            location.href = "/app/login"
        }
        if(err.body.code==9001){
//        this.$refs.alert.setMessage(true,err.body.msg,function(){
//        })
        }
      })
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
  #com{font-size: 12px;}
  #com header{width: 100%;height: .3755rem;position: fixed; left: 0; right: 0; top: 0; border-bottom: 0.017rem solid #FFC200;}
  #com header .jump{display: inline-block;position: absolute; top: 0; bottom: 0; left: 0.128rem; width: 0.128rem;}
  #com header .jump .arrow{display: inline-block;height: 0.1365rem; padding: 0.1195rem 0;}
  #com header .replay{display:block;font-size: .1365rem;color: #282828;vertical-align:middle;line-height:.3755rem;width: 100%; text-align: center;}
  #com .content{width: 2.91rem;margin: 0 auto;margin-top: 0.5035rem;}
  #com .content textarea{padding: .0853rem; width: 2.7306rem; height: 1.3312rem; border: 1px solid #C3C3C3;border-radius: 7px;resize: none;background-color: #f2f2f2;font-size: .1009rem;color:  #282828;padding: .0853rem;text-align: justify;}
  #com .content .btn{width: 2.56rem;height: .256rem;margin: 0 auto;margin-top:.128rem;background-color: #fedc6f;border-radius: 6px;text-align: center;line-height: .256rem;color: #fff;font-size: .1067rem;}

</style>
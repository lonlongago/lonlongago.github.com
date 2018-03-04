<template>
  <div style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: #f2f2f2;">
    <div class="container">
      <message v-show="active==3"></message>
      <userInfo v-show="active==4"></userInfo>
      <newindex v-show="active==1"></newindex>
      <classAll v-show="active==5"></classAll>
      <bookcase v-show="active==2"></bookcase>
    </div>
    <div class="footer">
      <a href="javascript:;" @click="choosePage(1)">
        <img :src="active==1?'http://cdn.qcacg.com/mobile/img/app_userInfo/yellowIndex.png':'http://cdn.qcacg.com/mobile/img/app_userInfo/blankIndex.png'"/>
        <p :style = "active==1?'color:#ffc838':'color:#323232'">首页</p>
      </a>
      <a href="javascript:;"  @click="choosePage(5)">
        <img :src="active==5?'http://cdn.qcacg.com/mobile/img/app_userInfo/yellowClass.png':'http://cdn.qcacg.com/mobile/img/app_userInfo/blankClass.png'"/>
        <p :style = "active==5?'color:#ffc838':'color:#323232'">分类</p>
      </a>
      <a href="javascript:;"  @click="choosePage(2)">
        <img :src="active==2?'http://cdn.qcacg.com/mobile/img/app_userInfo/yellowList.png':'http://cdn.qcacg.com/mobile/img/app_userInfo/blankList.png'"/>
        <p :style = "active==2?'color:#ffc838':'color:#323232'">书架</p>
      </a>
      <a href="javascript:;" style="position: relative;"  @click="choosePage(3)">
        <img :src="active==3?'http://cdn.qcacg.com/mobile/img/app_userInfo/yellowMessage.png':'http://cdn.qcacg.com/mobile/img/app_userInfo/blankMessage.png'"/>
        <p :style = "active==3?'color:#ffc838':'color:#323232'">消息</p>
        <span class="numtttt" v-if="flag">{{num}}</span>
      </a>
      <a href="javascript:;"  @click="choosePage(4)">
        <img :src="active==4?'http://cdn.qcacg.com/mobile/img/app_userInfo/yellowUser.png':'http://cdn.qcacg.com/mobile/img/app_userInfo/blankUser.png'"/>
        <p :style = "active==4?'color:#ffc838':'color:#323232'">我的</p>
      </a>
    </div>
  </div>
</template>

<script>
  import appFooter from "~/components/AppFooter"
  import message from "~/components/message"
  import newindex from "~/components/newindex"
  import userInfo from "~/components/userInfo"
  import classAll from "~/components/classAll"
  import bookcase from "~/components/bookcase"
  export default{
    components:{
      appFooter,
      message,
      newindex,
      userInfo,
      classAll,
      bookcase
    },
    data:function(){
      return {
        active:1,
        flag:false,
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        
      })
    },
    methods:{
      choosePage:function(v){
        this.active = v;
      }
    },
    head:{
      title:'首页',
      meta:[
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
          { rel: 'stylesheet', href: '/css/main_app.css' },
          { rel: 'stylesheet', href: '/css/swiper.css'}
      ],
      script:[
          {src:"/lib/resize_320.js"},
      ]
    }
  }
</script>

<style>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0.4181rem;
    right: 0;
    /*overflow-y: scroll;
    -webkit-overflow-scrolling: touch;*/
  }
  .footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.4181rem;
    display: flex;
    background-color: #f2f2f2;
  }
  .footer:before{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: .0072rem;
    width: 100%;
    background-color: #c3c3c3;
  }
  .footer a{
    flex: 1;
    text-align: center;
    padding: 0.0427rem 0;
  }
  .footer a img{
    width: 0.1664rem;
    height: 0.1664rem;
  }
  .footer a p{
    font-size: 0.1024rem;
    margin-top: .04rem;
  }
  .numtttt{
    display: inline-block;
    padding: 0.0260rem 0.0512rem 0.0252rem 0.0512rem;
    background-color: #ff8383;
    color: #fff;
    font-size: 0.0853rem;
    border-radius: 0.1109rem;
    position:absolute;
    top:0;
    right:25%;
  }
</style>
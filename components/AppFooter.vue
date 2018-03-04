<template>
  <div class="footer">
    <a href="/mView/newindex">
      <img :src="active==1?'/img/app_userInfo/yellowIndex.png':'/img/app_userInfo/blankIndex.png'"/>
      <p :style = "active==1?'color:#ffc838':'color:#323232'">首页</p>
    </a>
    <a href="/mView/classAll">
      <img :src="active==5?'/img/app_userInfo/yellowClass.png':'/img/app_userInfo/blankClass.png'"/>
      <p :style = "active==5?'color:#ffc838':'color:#323232'">分类</p>
    </a>
    <a href="/mView/bookcase">
      <img :src="active==2?'/img/app_userInfo/yellowList.png':'/img/app_userInfo/blankList.png'"/>
      <p :style = "active==2?'color:#ffc838':'color:#323232'">书架</p>
    </a>
    <a href="/mView/message" style="position: relative;">
      <img :src="active==3?'/img/app_userInfo/yellowMessage.png':'/img/app_userInfo/blankMessage.png'"/>
      <p :style = "active==3?'color:#ffc838':'color:#323232'">消息</p>
      <span class="numtttt" v-if="flag">{{num}}</span>
    </a>
    <a href="/mView/userInfo">
      <img :src="active==4?'/img/app_userInfo/yellowUser.png':'/img/app_userInfo/blankUser.png'"/>
      <p :style = "active==4?'color:#ffc838':'color:#323232'">我的</p>
    </a>
  </div>
</template>

<script>
  export default{
    props:{
      active:{
        type:Number,
        default:1
      },
      num:{
        type:Number,
        default:0
      }
    },
    watch: {
      num: function (val , oldVal){
        if(val!=0){
          this.flag = true;
        }else{
          this.flag = false;
        }
      }
    },
    data:function(){
      return {
        flag:false
      }
    },
    mounted:function(){
        if(this.num != 0){
          this.flag = true;
        }
    },
    methods:{
    }
  }
</script>

<style>
  .footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.4181rem;
    display: flex;
    border-top: 1px solid #c3c3c3;
    background-color: #f2f2f2;
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
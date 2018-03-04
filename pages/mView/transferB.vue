<template>
  <div style="font-size: 12px; position: absolute; top: 0; bottom: 0; left: 0; right: 0;">
    <div id="money" v-html="open"></div>
  </div>
</template>

<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  import axios from "axios"
  export default{
    data:function(){
      return {
        embed:null,
        plus:{},
        amount:0,
        open:''
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        console.log('test');
        if(window.plus){
          this.plus = window.plus;
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
        }
      })
    },
    methods:{
      plusReady:function(){
      	var amount = plus.storage.getItem('amount');
      	console.log(amount);
      	this.getValue();
      },
      getValue:function(){
        var money = document.getElementById("money");
        console.log("<<<<<<<");
        console.log(amount);
        console.log(">>>>>>>");
        var amount = localStorage.getItem('amount');
        console.log(amount);
        plus.nativeUI.showWaiting();
        SZXJ.http(this,'get', Path.newRecharge+"?amount="+amount, {}, (response) => {
           plus.nativeUI.closeWaiting();
           this.open = response.data.data;
           console.log(response.data.data);
           money.innerHTML= this.open;
           document.forms[0].submit();
        },(err)=>{
          console.log("错误")
        });
      }
    },
    head:{
      title: '个人信息页-QC轻小说',
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
</style>
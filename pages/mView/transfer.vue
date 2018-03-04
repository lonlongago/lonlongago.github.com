<template>
  <div style="font-size: 12px; position: absolute; top: 0; bottom: 0; left: 0; right: 0;">
  	<div class="tp"></div>
    <div class="header_book">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>支付</span>
      </div>
    </div>
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
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        if(window.plus){
          this.plus = window.plus;
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
        }
//      this.getValue();
      })
    },
    methods:{
      plusReady:function(){
        this.plus = plus;
        this.embed=plus.webview.create(Path.netWorks+'/transferB', '支付');
        plus.webview.currentWebview().append(this.embed);
      },
      goBack:function(){
        var mv = this.plus.webview.currentWebview();
        mv.back();
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
	.tp{
		height: .171rem;
		background: white;
		width: 100%;
		position: fixed;
		z-index: 99;
		}
  .header_book{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 25;
  }
  .header_book:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_book .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_book .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_book .header_title{
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    width: 77.5%;
  }
  .header_book .header_title span{
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
  .header_book .header_share{
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_book .header_share .header_share_tu{
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_newBook/share.png');
    background-repeat: no-repeat;
    background-size: contain;
    /*background-color: #000000;*/
  }
</style>
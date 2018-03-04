<template>
<div style="font-size: 12px; position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: #f2f2f2;">
  <div id="money"></div>
  <div class="header">
	<!--<div class="tp"></div>
    <div class="header_nav">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_Text"><span>我的好人卡</span></div>
    </div>-->
    <div class="num_msg">
      <span class="money_icon"></span>
      <span class="money_num">{{payCardAmount}}</span>
    </div>
  </div>
  <div class="content">
    <div class="title">
            充值数额选择
    </div>
    <div class="reward_list">
      <div class="reward_part marginRight" :style="backBol==1?'background-color: #ffdfcc;':''" @click="rewardMount(1,100)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem; margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">100张</p>
      </div>
      <div class="reward_part marginRight" :style="backBol==2?'background-color: #ffdfcc;':''" @click="rewardMount(2,500)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">500张</p>
      </div>
      <div class="reward_part marginRight" :style="backBol==3?'background-color: #ffdfcc;':''" @click="rewardMount(3,1000)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">1000张</p>
      </div>
      <div class="reward_part" :style="backBol==4?'background-color: #ffdfcc;':''" @click="rewardMount(4,3000)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">3000张</p>
      </div>
      <div class="reward_part marginRight" :style="backBol==5?'background-color: #ffdfcc;':''" @click="rewardMount(5,5000)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">5000张</p>
      </div>
      <div class="reward_part marginRight" :style="backBol==6?'background-color: #ffdfcc;':''" @click="rewardMount(6,10000)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">10000张</p>
      </div>
      <div class="reward_part marginRight" :style="backBol==7?'background-color: #ffdfcc;':''" @click="rewardMount(7,30000)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">30000张</p>
      </div>
      <div class="reward_part" :style="backBol==8?'background-color: #ffdfcc;':''" @click="rewardMount(8,50000)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">50000张</p>
      </div>
    </div>
    <div class="money_amount">
      支付金额：<span>{{amount}}</span><span>元</span>
    </div>
  </div>
  <div class="bottom_btn">
    <div class="other_btn btn" @click="openSelect()">
      其他支付方式
    </div>
  </div>
  <div class="shadow" v-if="shadowBol" @click="closeSelect()"></div>
  <div class="select_methods"  v-if="shadowBol">
     <div class="methods zfb btn" @click="zfbRecharge()">支付宝</div>
     <div class="methods wx btn">微信充值</div>
     <div class="methods Account btn">账户余额直冲</div>
  </div>
</div>
</template>

<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  export default{
    components:{},
    data:function(){
      return {
        backBol:0,
        amount:0,
        payCardAmount:0,
        shadowBol:false,
        ws:{},
        wn:{}
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getCardFn();
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
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
	      plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right");
//					self.ws.opener().reload();  //webview重新加载
				}, false);
	    },
	    webviewAnimation:function(){
	      this.ws.hide('slide-out-right');
	    },
      rewardMount:function(a,b){
        this.backBol = a;
        this.amount = b/100;
        localStorage.setItem('amount',this.amount)
      },
      zfbRecharge:function(){
      	if(!window.plus){
      		return
      	}
      	var self = this;
      	if(this.amount==0){
      		plus.nativeUI.toast("金额不能为零");
      		return
      	}
      	console.log("<<<<<<")
      	console.log(self.amount);
      	console.log(localStorage.getItem('amount'));
      	console.log(JSON.stringify(plus.storage));
        plus.storage.setItem('amount',self.amount);
        console.log(plus.storage.getItem("amount"));
        this.wn = plus.webview.create(Path.netWorks+'/transferB','payment',{
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':'支付宝支付',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
		        'statusbar':{'background':'#ffffff'},
		        "backButtonAutoControl":'close'
        });
        this.wn.show('slide-in-right');
//      location.href = Path.netWorks+'/transfer';
      },
      wxRecharge:function(){
      },
      openSelect:function(){
        this.shadowBol = true;
      },
      closeSelect:function(){
        this.shadowBol = false;
      },
      getCardFn:function(){
        SZXJ.http(this,'get', Path.cardamount, {}, (response) => {     // 获取好人卡
          this.payCardAmount = response.data.amount.payCardAmount + response.data.amount.welfareCardAmount;
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
	*{user-select: none;}
	.tp{
		height: .171rem;
		width: 100%;
	}
  .header{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    /*height: 1.6729rem;*/
   height: 1.1259rem;
    background-image: url(http://cdn.qcacg.com/mobile/img/mtops.png);
    background-repeat: repeat-x;
    background-size: 100% 100%;
  }
  .header .header_nav {
    height: 0.3584rem;
  }
  .header .header_nav .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header .header_nav .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/blankLeft.png');
    background-repeat: no-repeat;
     background-size: 0.0683rem 0.1365rem;
    background-position: center;
  }
  .header .header_nav .header_Text {
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    /*text-align: center;*/
    width: 68.125%;
  }
  .header .header_nav .header_Text span{
    display: inline-block;
    width: 86.238%;
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
  .header .num_msg{
    text-align: center;
    margin-top: 0.4352rem;
  }
  .header .num_msg span{
    display: inline-block;
  }
  .header .num_msg .money_icon{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_goodMan/money1.png);
    background-repeat: no-repeat;
    background-size: 0.2133rem;
    background-position: center;
    width: 0.2133rem;
    height: 0.2133rem;
  }
  .header .num_msg .money_num{
    font-size: 0.2133rem;
    color: #fff;
    margin-left: 0.0853rem;
  }
  .content{
    position: absolute;
    /*top: 1.6729rem;*/
   top: 1.1259rem;
    left: 0;
    right: 0;
    bottom:0.5461rem;
    padding: 0 0.128rem;
  }
  .content .title{
    font-size: 0.1195rem;
    margin: 0.1365rem 0;
  }
  .content .reward_list{
    height: 1.3579rem;
    width: 100%;
  }
  .content .reward_list .reward_part{
    display: inline-block;
    width: 0.6357rem;
    border: 2px solid #fec359;
    border-radius: 3px;
    margin-bottom: 0.0939rem;
    vertical-align: top;
  }
  .content .money_amount{
    position: absolute;
    bottom: 0.128rem;
    left: 0.128rem;
    font-size: 0.1195rem;
  }
  .content .money_amount span{
    color: red;
    font-size: 0.1195rem;
  }
  .marginRight{
    margin-right: .08rem;
  }
  .bottom_btn{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.5461rem;
    /*background-color: #c3c3c3;*/
    border-top: 1px solid #c3c3c3;
    box-sizing: border-box;
  }
  .bottom_btn .other_btn{
    margin: 0.0853rem 0.128rem;
    border-radius: 4px;
    font-size: 0.1195rem;
    color: #fff;
    background-color: #fedc6f;
    text-align: center;
    /*height: ;*/
    height: 0.3755rem;
    line-height: 0.3755rem;
  }
  .shadow{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
  }
  .select_methods{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    padding: 0.0853rem 0.128rem;
  }
  .select_methods .methods{
    font-size: 0.1195rem;
    text-align: center;
    height: 0.384rem;
    line-height: 0.384rem;
    color: #fff;
    border-radius: 4px;
  }
  .select_methods .zfb{
    background-color: #1ebdff;
    margin-bottom: 0.1707rem;
  }
  .select_methods .wx{
    background-color: #1af115;
    margin-bottom: 0.1707rem;
  }
  .select_methods .Account{
    background-color: #fedc6f;
  }
</style>
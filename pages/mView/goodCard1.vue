<template>
<div style="font-size: 12px; position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: #f2f2f2;">
  <appAlert ref="appAlert"></appAlert>
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
            苹果充值
    </div>
    <div class="reward_list">
      <div class="reward_part marginRight btn" :style="backBol==1?'background-color: #ffdfcc;':''" @click="rewardMount(1,420)">
        <img src="http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem; margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
        <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">420张</p>
      </div>
    </div>
  </div>
  <div class="bottom_btn">
    <a class="other_btn btn" href="javascript:;" @click = "pay(IAPOrders[0])">
            充值
    </a>
  </div>
</div>
</template>

<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  import appAlert from "~/components/AppAlert"
  export default{
    components:{
      appAlert,
    },
    data:function(){
      return {
        backBol:0,
        amount:0,
        payCardAmount:0,
        iapChannel:[],
        plus:{},
        IAPOrders:['qcacg.com420'],
        ws:{},
        result:'',
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
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
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
				console.log("准备ios支付");
        plus.payment.getChannels(function(channels) {
            self.result = self.result + "进入支付通道";
//          console.log(self.result);
//          console.log(JSON.stringify(channels));
            for (var i in channels) {
            	  console.log("还未走ios")
                if (channels[i].id == 'appleiap') {
                    self.iapChannel = channels[i];
                    self.result = self.result + "进入ios支付通道";
                    console.log(self.result);
                    self.iapChannel.requestOrder(self.IAPOrders, function(event) {
//                      for (var index in event) {
//                          var OrderItem = event[index];
//                          outLine("Title:" + OrderItem.title + "Price:" + OrderItem.price + "Description:" + OrderItem.description + "ProductID:" + OrderItem.productid);
//                          self.$refs.appAlert.setMessage("获取ios支付通道失败：请选择其他支付方式" );
//                      }
//                      outLine("plus和通道准备好了" );
//                      console.log("plus和通道准备好了");
//                      plus.nativeUI.alert("plus和通道准备好了");
                    }, function(errormsg) {
//                  	  console.log("获取ios支付通道失败：请选择其他支付方式:"+JSON.stringify(errormsg) );
//                      plus.nativeUI.alert("获取ios支付通道失败：请选择其他支付方式:"+JSON.stringify(errormsg) );
                    });
                }
            }
        }, function(e) {
//      	  console.log("获取ios支付通道失败：请选择其他支付方式:"+JSON.stringify(e) )
            plus.nativeUI.alert("获取ios支付通道失败：请选择其他支付方式:"+JSON.stringify(e) );
        });
//      console.log("ios支付准备完成");
      },
      pay:function(id) {
        var self = this;
        self.result = self.result+"点击ios支付";
        if(!window.plus){
          return
        }
//      console.log("点击");
//      self.result = self.result +"plus装备好";
//      console.log("《《《《《《《《《《《");
//      console.log(id);
        plus.payment.request(self.iapChannel, {
            "productid": id,
            "username": "appusername",
            "quantity": 1
        }, function(result) {
          //ios支付成功回调
//        console.log(result);
//        self.result = JSON.stringify(result)
//        console.log(111);
          var _data = {
            userId:1111,
            receipt:result.transactionReceipt,
            chooseEnv:true,//当chooseENv为true时，为正式支付，false为沙箱模式
          };
          SZXJ.http(self,'post', Path.iosIap, _data, (response) => {
//          self.$refs.appAlert.setMessage("支付成功");
            plus.nativeUI.alert("支付成功")
          }, (err) => {
            
          })
        }, function(e) {
//        console.log('错误')
          if(e.code==21007){
          	var _data = {
	            userId:1111,
	            receipt:result.transactionReceipt,
	            chooseEnv:false,//当chooseENv为true时，为正式支付，false为沙箱模式
	          };
	          SZXJ.http(self,'post', Path.iosIap, _data, (response) => {
	//          self.$refs.appAlert.setMessage("支付成功");
	            plus.nativeUI.alert("支付成功")
	          }, (err) => {
	          })
          }
          plus.nativeUI.alert("支付失败");
//        self.result = self.result +"出现错误"+JSON.stringify(e);
//        console.log(self.result)
        });
      },
      rewardMount:function(a,b){
        this.backBol = a;
        this.amount = b;
//      this.pay(this.IAPOrders[0]);
      },
      getCardFn:function(){
        SZXJ.http(this,'get', Path.cardamount, {}, (response) => {     // 获取好人卡
          this.payCardAmount = response.data.amount.payCardAmount;
        }, (err) => {
          
        });
      }
    },
    head:{
      title: 'ios支付-QC轻小说',
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
    background-color: #ff7b87;
    text-align: center;
    /*height: ;*/
    height: 0.3755rem;
    line-height: 0.3755rem;
    display: block;
  }
</style>
<template>
  <div style="font-size: 12px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background-color: #f2f2f2;">
    <div class="header">
      <div class="num_title">
        合计可提现（元）
      </div>
      <div class="num_msg">
        <span class="money_icon"></span>
        <span class="money_num">{{totalCashAmount+totalCardAmount/150 | floor}}</span>
      </div>
      <div class="money_part">
        <div class="wait_use">
          <span>可提现金额（元）</span><span>￥{{totalCashAmount}}</span>
        </div>
        <div class="use_loading">
           <span>可提现好人卡（张）</span><span>{{totalCardAmount}}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content_tab">
      	<a href="javascript:;" class="time" @click="tapMove(1)">
	        <div :style="active==1?'color:#fedc6f;':''">可提现金额</div>
	        <span :class="active==1?'active hr':'hr'"></span>
	      </a>
	      <a href="javascript:;" class="time" @click="tapMove(2)">
	        <div :style="active==2?'color:#fedc6f;':''">可提现好人卡</div>
	        <span :class="active==2?'active hr':'hr'"></span>
	      </a>
      </div>
    </div>
    <div class="content_show"  >
    	<div class="mui-content mui-scroll-wrapper" id="pullrefresh">
    		<div class="mui-scroll">
	        <div class="mui-table-view mui-table-view-chevron" >
	          <div class="show_part" v-for="(obj,index) in list" v-if="active==1">
	            <span class="part_icon"></span>
	            <span class="part_name">
                <p v-if="obj.typeDescription == 2100">申请提现</p>
	              <p v-if="obj.typeDescription == 2101">充值</p>
	              <p v-if="obj.typeDescription == 2102">购买好人卡</p>
	              <p v-if="obj.typeDescription == 2103">绘画作品订金 </p>
	              <p v-if="obj.typeDescription == 2106">绘画作品稿费</p>
	              <p v-if="obj.typeDescription == 2107">绘画作品稿费</p>
	              <p v-if="obj.typeDescription == 2108">退款</p>
	              <p v-if="obj.typeDescription == 2109">每月福利金额</p>
	              <!--<p v-if=" obj.orderStatus == 0">申请进行中</p>-->
	              <p>（{{obj.createTime | getTime}}）</p>
	            </span>
	            <span class="part_num" v-if="userName == obj.paiedUserName">+{{ obj.exchangeableCashAmount + obj.unexchangeableCashAmount + obj.welfareCashAmount }}</span>
	            <span class="part_num" v-if="userName !== obj.paiedUserName" style="color: #f95c5c;">-{{ obj.exchangeableCashAmount + obj.unexchangeableCashAmount + obj.welfareCashAmount }}</span>
	          </div>
	          <div class="show_part" v-for="(obj,index) in list1" v-if="active==2">
	            <span class="part_icon1"></span>
	            <span class="part_name">
	              <p v-if="obj.typeDescription == 2200">每日签到</p>
	              <p v-if="obj.typeDescription == 2201">打赏好人卡</p>
	              <p v-if="obj.typeDescription == 2202">购买好人卡</p>
	              <p v-if="obj.typeDescription == 2203 &amp;&amp; obj.orderStatus == 0">申请好人卡提现中</p>
	              <p v-if="obj.typeDescription == 2203 &amp;&amp; obj.orderStatus == 1">好人卡提现完成</p>
	              <p v-if="obj.typeDescription == 2205">修改昵称</p>
	              <p>（{{obj.createTime | getTime}}）</p>
	            </span>
	             <span class="part_num"  v-if=" userName == obj.paiedUserName ">+{{ obj.payCardAmount + obj.welfareCardAmount }}</span>
	            <span class="part_num" v-if=" userName !== obj.paiedUserName " style="color: #f95c5c;">-{{ obj.payCardAmount + obj.welfareCardAmount }}</span>
	          </div>
	        </div>
        </div>
      </div>
    </div>
    <div class="Prompt">
      <p>提示：合计可提现金额中的好人卡将以150:1换算后进行计算，且不计小数点</p>
    </div>
  </div>
</template>

<script>
import SZXJ from "~/components/vueHttp-app"
import Path from "~/components/conf-app"
  export default{
    data:function(){
      return {
        activeTab: 'tab1',
        list:[],
        list1:[],
        RequestObj:{
            pageNum: 1,
            pageSize: 10,
        },
        count:0,
        RequestObj1:{
            pageNum: 1,
            pageSize: 10,
        },
        count1:0,
        min:0,
        userName:'',
        system:'系统',
        payCardAmount:0,
        givenPayCardAmount:0,
        totalCardAmount:0,
        totalCashAmount:0,
        ws:{},
        wn:{},
        active:1
      }
    },
    filters:{
      getTime:function(val){
        return SZXJ.getLocalTimeTwo(val)
      },
      floor:function(val){
        return Math.floor(val)
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getValueFn();
        this.getCardlistFn();
        this.amountYueFn();
        this.getCardAmountFn();
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
        }
        var u = navigator.userAgent;
	      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var iosOrAndriod = null;
        if(isAndroid){
          iosOrAndriod = true;
          console.log("是安卓手机")
        }
        if(isiOS){
          iosOrAndriod = false;
          console.log("是苹果手机")
        }
        console.log(iosOrAndriod?'circle':'none');
		    mui.init({
				  pullRefresh: {
					  container: '#pullrefresh',
					  down: {
					   	style:iosOrAndriod?'circle':'none',//单webview模式的下拉刷新
							callback: pulldownRefresh
						},
						up: {
							height:50,
							contentremore:'',
							callback: pullupRefresh
						}
					}
				});
				/**
				 * 下拉刷新具体业务实现
				 */
				var self = this;
				function pulldownRefresh() {
					setTimeout(function() {
						if(self.active==1){
							self.RequestObj.pageNum = 1;
							self.getValueFn();
						}
						if(self.active==2){
							self.RequestObj1.pageNum = 1;
							self.getCardlistFn();
						}
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					setTimeout(function() {
					  if(self.active==1){
							self.RequestObj.pageNum  = self.RequestObj.pageNum  + 1;
							var RequestObj = self.RequestObj;
			        SZXJ.http(this,'get', Path.paylist+'?pageNum='+RequestObj.pageNum+'&pageSize='+RequestObj.pageSize, {}, (response) => {          //  钱包余额
			            var list = response.data.data.list;
			            for(var i=0;i<list.length;i++){
			            	  self.list.push(list[i]);
			            }
			        });
			        mui('#pullrefresh').pullRefresh().endPullupToRefresh((++self.min >= self.count)); //参数为true代表没有更多数据了。
						}
						if(self.active==2){
							self.RequestObj1.pageNum = self.RequestObj1.pageNum  + 1;
							var RequestObj = self.RequestObj1;
							SZXJ.http(this,'get', Path.cardlist+'?pageNum='+RequestObj.pageNum+'&pageSize='+RequestObj.pageSize+'&type=1', {}, (response) => {      //获取好人卡
		              var list1 = response.data.data.list;
		              for(var i=0;i<list1.length;i++){
			            	  self.list1.push(list1[i]);
			            }
		          });
		          mui('#pullrefresh').pullRefresh().endPullupToRefresh((++self.min >= self.count1)); //参数为true代表没有更多数据了。
						}
					}, 100);
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
				}, false);
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      tapMove: function(a){
      	this.active = a;
      	this.min = 0;
      	if(a == 1){
      		this.getCardlistFn();
      	}else if(a == 2){
      		this.getCardlistFn();
      	}
      },
      getValueFn:function(){
        var RequestObj = this.RequestObj
        SZXJ.http(this,'get', Path.paylist+'?pageNum='+RequestObj.pageNum+'&pageSize='+RequestObj.pageSize, {}, (response) => {          //  钱包余额
            this.list = response.data.data.list;
            this.count = response.data.data.pages;
        });
      },
      getCardlistFn:function(){
          var RequestObj=this.RequestObj1;
          SZXJ.http(this,'get', Path.cardlist+'?pageNum='+RequestObj.pageNum+'&pageSize='+RequestObj.pageSize+'&type=1', {}, (response) => {      //获取好人卡
              this.list1 = response.data.data.list;
              this.count1 = response.data.data.pages;
          });  
      },
      amountYueFn:function(){
        SZXJ.http(this,'get', Path.amount, {}, (response) => {          //  钱包余额
            this.exchangeableCashAmount = response.data.amount.exchangeableCashAmount;
            this.totalCashAmount = response.data.amount.exchangeableCashAmount +  response.data.amount.unexchangeableCashAmount + response.data.amount.welfareCashAmount;
            this.welfareCashAmount = response.data.amount.welfareCashAmount;
        });
      },
      getCardAmountFn:function(){
        SZXJ.http(this,'get', Path.cardamount, {}, (response) => {     // 获取好人卡
            this.payCardAmount = response.data.amount.payCardAmount;
            this.givenPayCardAmount =response.data.amount.givenPayCardAmount;
            this.totalCardAmount = response.data.amount.givenWelfareCardAmount + this.givenPayCardAmount;
        });  
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
          { rel: 'stylesheet', href: '/css/main_app.css' },
          { rel: 'stylesheet', href: '/css/mui.min.css'}
      ],
      script:[
          {src:"/lib/resize_320.js"},
          {src:"/js/mui.min.js"}
      ]
    }
  }
</script>

<style>
	.active{border-bottom: 0.0427rem solid #fedc6f;border-radius: 3px;margin-bottom: .03rem;}
	.time{position:relative;display: inline-block;width: 50%;vertical-align: middle;line-height: 0.2475rem;text-align: center;font-size: 0.128rem;color: #fff; padding: 0.1152rem 0;}
	.hr{display:inline-block;position: absolute;bottom:0;left:23%;width: 54%;}
	.mui-table-view{background-color: #F2F2F2!important;}
  .header{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 1.1259rem;
    z-index: 15;
    background-image: url(http://cdn.qcacg.com/mobile/img/mtops.png);
    background-repeat: repeat-x;
    background-size: 100% 100%;
  }
  .header .num_title{
    font-size: 0.1195rem;
    color: #fff;
    text-align: center;
    height: 0.1195rem;
    margin-top: 0.1536rem;
  }
  .header .num_msg{
    text-align: center;
    margin-top: 0.1792rem;
  }
  .header .num_msg span{
    display: inline-block;
  }
  .header .num_msg .money_icon{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_goodMan/yang.png);
    background-repeat: no-repeat;
    background-size: 0.2133rem;
    background-position: center;
    width: 0.2133rem;
    height: 0.2133rem;
    vertical-align: bottom;
  }
  .header .num_msg .money_num{
    font-size: 0.2133rem;
    color: #fff;
    margin-left: 0.0853rem;
  }
  .header .money_part{
    height: 0.1365rem;
    margin-top: 0.2048rem;
    margin-bottom: 0.1152rem;
    box-sizing: border-box;
    padding: 0 0.128rem;
  }
  .header .money_part .wait_use{
    display: inline-block;
    vertical-align: bottom;
  }
  .header .money_part .use_loading{
    display: inline-block;
    float: right;
    vertical-align: bottom;
  }
  .header .money_part span{
    font-size: 0.1195rem;
    color: #fff;
  }
  .content{
    position: fixed;
    /*top: 1.6729rem;*/
    top: 1.1259rem;
    left: 0;
    right: 0;
    z-index: 15;
    /*padding: 0 0.128rem;*/
  }
  .content .content_tab{
    width: 100%;
    background-color: #fff;
    padding: 0 0.128rem;
    box-sizing: border-box;
  }
  .content_show{
    position: absolute;
    top: 1.5113rem;
    left: 0;
    right: 0;
    bottom: 0.3584rem;
    z-index: 10;
    -webkit-overflow-scrolling: touch;
  }
  .content_show .show_part{
    padding: 0 0.128rem;
    background-color: #fff;
    margin-top: 1px;
  }
  .content_show .show_part span{
    display: inline-block;
    vertical-align: top;
  }
  .content_show .show_part .part_icon{
    width: 0.2133rem;
    height: 0.2133rem;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/money.png);
    background-position: center;
    background-size: 0.2133rem;
    background-repeat: no-repeat;
    padding: 0.0768rem 0;
    box-sizing: content-box;
    margin-right: 0.128rem;
  }
  .content_show .show_part .part_icon1{
    width: 0.2133rem;
    height: 0.2133rem;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_goodMan/godcar.png);
    background-position: center;
    background-size: 0.2133rem;
    background-repeat: no-repeat;
    padding: 0.0768rem 0;
    box-sizing: content-box;
    margin-right: 0.128rem;
  }
  .content_show .show_part .part_name{
    
  }
  .content_show .show_part .part_name p{
    font-size: 0.1195rem;
    padding: 0.0319rem 0;
    text-align:center;
  }
  .content_show .show_part .part_num{
    float: right;
    font-size: 0.1195rem;
    color: #fedc6f;
    padding: 0.1237rem 0;
  }
  .Prompt{
    position: fixed;
    bottom: 0;
    height: 0.3584rem;
    left: 0;
    right: 0;
    background-color: #f2f2f2;
    padding: 0.0512rem 0.128rem 0 0.128rem 0;
  }
  .Prompt p{
    line-height: 1.4;
    font-size: 0.1024rem;
    color: #989898;
    text-align: center;
  }
</style>
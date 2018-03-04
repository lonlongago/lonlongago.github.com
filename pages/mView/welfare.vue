<template>
  <div style="font-size: 12px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background-color: #f2f2f2;">
    <div class="header">
      <div class="num_title">
        合计福利（元）
      </div>
      <div class="num_msg">
        <span class="money_icon"></span>
        <span class="money_num">{{welfareCashAmount}}</span>
      </div>
    </div>
    <div class="content">
      <div class="content_tab">
      	<a href="javascript:;" class="time" @click="tapMove(1)">
	        <div :style="active==1?'color:#fedc6f;':''">收入</div>
	        <span :class="active==1?'active hr':'hr'"></span>
	      </a>
	      <a href="javascript:;" class="time" @click="tapMove(2)">
	        <div :style="active==2?'color:#fedc6f;':''">支出</div>
	        <span :class="active==2?'active hr':'hr'"></span>
	      </a>
      </div>
    </div>
    <div class="content_show">
    	<div class="mui-content mui-scroll-wrapper" id="pullrefresh">
	      	<div class="mui-scroll">
	      		<div class="mui-table-view mui-table-view-chevron">
	      			<div class="show_part " v-for="(obj,index) in list" v-if="active==2">
		            <span class="part_icon1"></span>
		            <span class="part_name">
		              <p v-if="obj.typeDescription == 2100">申请提现</p>
		              <p v-if="obj.typeDescription == 2101">充值</p>
		              <p v-if="obj.typeDescription == 2102">购买好人卡</p>
		              <p v-if="obj.typeDescription == 2103">绘画作品订金 </p>
		              <p v-if="obj.typeDescription == 2104">上月福利金额清零</p>
		              <p v-if="obj.typeDescription == 2105">小说作品稿费</p>
		              <!--<p v-if="obj.typeDescription == 2107">绘画作品稿费</p>-->
		              <p v-if="obj.typeDescription == 2106">绘画作品稿费</p>
		              <p v-if="obj.typeDescription == 2109">每月福利金额</p>
		              <!--<p v-if=" obj.orderStatus == 0">申请进行中</p>-->
		              <p>（{{obj.createTime | getTime}}）</p>
		            </span>
		            <span class="part_num" style="color: #f95c5c;">-{{ obj.exchangeableCashAmount + obj.unexchangeableCashAmount + obj.welfareCashAmount }}</span>
		          </div>
		          <div class="show_part" v-for="(obj,index) in list" v-if="active==1">
		            <span class="part_icon"></span>
		            <span class="part_name">
		              <p v-if="obj.typeDescription == 2100">申请提现</p>
		              <p v-if="obj.typeDescription == 2101">充值</p>
		              <p v-if="obj.typeDescription == 2102">购买好人卡</p>
		              <p v-if="obj.typeDescription == 2103">绘画作品订金 </p>
		              <p v-if="obj.typeDescription == 2104">上月福利金额清零</p>
		              <p v-if="obj.typeDescription == 2105">小说作品稿费</p>
		              <!--<p v-if="obj.typeDescription == 2106">绘画作品稿费(交易中)</p>-->
		              <p v-if="obj.typeDescription == 2107">绘画作品稿费</p>
		              <p v-if="obj.typeDescription == 2108">退款</p>
		              <p v-if="obj.typeDescription == 2109">每月福利金额</p>
		              <p>（{{obj.createTime | getTime}}）</p>
		            </span>
		            <span class="part_num">+{{ obj.exchangeableCashAmount + obj.unexchangeableCashAmount + obj.welfareCashAmount }}</span>
		          </div>
	      		</div>
	        </div>
	    </div>
    </div>
    
    <div class="Prompt">
      <p>提示：福利金额将于下月福利金额发放日清零，请注意使用期限</p>
    </div>
  </div>
</template>

<script>
import SZXJ from "~/components/vueHttp-app"
import Path from "~/components/conf-app"
  export default{
    data:function(){
      return {
        szxj:SZXJ,
        activeTab: 'tab1',
        list:[],
        RequestObj:{
            pageNum: 1,
            pageSize: 10,
        },
        count:10,
        min:0,
        userName:'',
        waitNum:0,
        loadingNum:0,
        welfareCashAmount:0,
        totalCashAmount:0,
        exchangeableCashAmount:0,
        unexchangeableCashAmount:0,
        ws:{},
        wn:{},
        active:1
      }
    },
    filters:{
      getTime:function(val){
        return SZXJ.getLocalTimeTwo(val)
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getUserFn();
        this.getValueFn(1);
        this.amountYueFn();
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
            self.min = 0;
            self.RequestObj.pageNum = 1;
		        SZXJ.http(this,'get', Path.paylist+'?pageNum='+self.RequestObj.pageNum+'&pageSize='+self.RequestObj.pageSize+'&payType='+self.active+'&type=3', {}, (response) => {          //  钱包余额,支出记录
		            self.list = response.data.data.list;
		        });
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					setTimeout(function() {
						self.RequestObj.pageNum  = self.RequestObj.pageNum  + 1;
					  SZXJ.http(this,'get', Path.paylist+'?pageNum='+self.RequestObj.pageNum+'&pageSize='+self.RequestObj.pageSize+'&payType='+self.active+'&type=3', {}, (response) => {          //  钱包余额,支出记录
		            var list = response.data.data.list;
		            for(var i =0; i<list.length;i++){
		            	self.list.push(list[i]);
		            }
		        });
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((++self.min >= self.count)); //参数为true代表没有更多数据了。
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
//					self.ws.opener().reload();  //webview重新加载
				}, false);
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      tapMove: function(a){
      	this.active = a;
      	this.RequestObj.pageNum = 1;
      	this.min = 0;
      	if(a == 1){
      		this.getValueFn(1);
      	}else if(a == 2){
      		this.getValueFn(2);
      	}
      },
      getValueFn:function(a){
        var RequestObj = this.RequestObj
        SZXJ.http(this,'get', Path.paylist+'?pageNum='+RequestObj.pageNum+'&pageSize='+RequestObj.pageSize+'&payType='+a+'&type=3', {}, (response) => {          //  钱包余额,支出记录
            this.list = response.data.data.list;
            this.count = Math.ceil(response.data.data.total/10);
        });
      },
      getUserFn:function(){
        SZXJ.http(this,'get', Path.getStatus, {}, (response) => {     //查看是否登入
          if(response.loginFlag==false){
            if(window.plus){
	            	this.webBook = plus.webview.create(Path.netWorks+'/login','login',
	            	{
					        'popGesture':'close',
					        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
					        'statusbar':{'background':'#ffffff'},
					        "backButtonAutoControl":'close'
		            });
		            this.webBook.onloading= function(){
									plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
								}
								this.webBook.onloaded=function(){
									plus.nativeUI.closeWaiting();
								}
		            this.webBook.show('slide-in-right');
	          	}else{
//	            	location.href = "/mView/login";
	         	}
          }
          this.userName = response.data.status.userName;
          
        }); 
      },
      amountYueFn:function(){
        SZXJ.http(this,'get', Path.amount, {}, (response) => {          //  钱包余额
            this.exchangeableCashAmount = response.data.amount.exchangeableCashAmount;
            this.totalCashAmount = response.data.amount.exchangeableCashAmount +  response.data.amount.unexchangeableCashAmount + response.data.amount.welfareCashAmount;
            this.welfareCashAmount = response.data.amount.welfareCashAmount;
            this.unexchangeableCashAmount = response.data.amount.unexchangeableCashAmount;
        });
      },
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
          { rel: 'stylesheet', href: '/css/main_app.css'},
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
  	top: 0;
  	left: 0;
  	right: 0;
  	height: 1.1259rem;
    background-image: url(http://cdn.qcacg.com/mobile/img/mtops.png);
    background-repeat: repeat-x;
    background-size: 100% 100%;
    z-index: 15;
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
    top: 1.1259rem;
    left: 0;
    right: 0;
    z-index: 15;
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
    bottom: 0.3854rem;
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
    background-image: url(http://cdn.qcacg.com/mobile/img/app_goodMan/yellowMoney.png);
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
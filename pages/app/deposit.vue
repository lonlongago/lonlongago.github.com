<template>
	<div style="display: none;" v-show="displayFlag" id="deposit" class="deposit">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
		    <myheader msg="提现"></myheader>
		    <div class="main">
		       <div class="list">
		         <span class="title">真实姓名</span>
		         <span class="name">{{name}}</span>
		       </div>
		       <div class="list">
		         <span class="title">支付宝账号</span>
		         <span class="name">{{numBer}}</span>
		       </div>
		    </div>
		    <div class="main small">
		       <div class="list">
		         <span class="title">可提现金额</span>
		         <input type="" name="" id="" value="" :placeholder="exchangeableCashAmount +'.00(元)'" v-model="cashAmount" readonly="true" />
		         <span>（元）</span>
		       </div>
		       <div class="list">
		         <span class="title">获得的礼物</span>
		         <input type="" name="" id="" value="" :placeholder="cardAmountSec +'.00(元)'" v-model="cardAmount" readonly="true" />
		         <span>（元）</span>
		       </div>
		    </div>
		    <div class="main small">
		       <div class="list">
		         <span class="title">金额总计</span>
		         <input type="number" name="" id="" value="" :placeholder="'最高可提现'+ exchangeableCashAmount + cardAmountSec +'元'"  @change="getValueFn()" v-model="allAmount" />
		         <span>（元）</span>
		       </div>
		    </div>
		    <div @click="SubmitFn" class="true">提交</div>
		    <appBottom></appBottom>
		  </div>
	</div>
</template>

<script>
import Header from '~/components/Headerapt'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList,
		'myheader':Header
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			displayFlag:false,
		    path: appPathList,
		    szxj:SZXJ,
		    cashAmount:'',
		    cardAmount:'',
		    allAmount:'',
		    numBer:'',
		    cardAmountSec:'',
		    exchangeableCashAmount:'',
		    name:'',
		    menuList: false,
		    toWrap: false,
		    totalAmount:'',
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	  this.numBer = SZXJ.getQueryString('numBer');
	      this.name = SZXJ.getQueryString('name');
	      this.aoTuFn();
    	  k_touch("deposit", "y");
	      this.displayFlag = true;
	  })
	},
	methods: {
	    showMenu: function() {
	            this.menuList = !this.menuList
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        },
	    backFn:function(){
	      history.go(-1);
	    },
	    SubmitFn:function(){
	      var data = {
	        cashAmount :this.cashAmount,
	        cardAmount :this.cardAmount * 150,
	      };
	      SZXJ.http(this,'get', appPathList.withdrawals, data, (response) => {
	        location.href = this.path.TemprootPath + '/app/withdrawals';
	      },(err)=>{prompt(err.data.msg)});
	    },
	    aoTuFn:function(){
	      SZXJ.http(this,'get', appPathList.cardamount, {}, (response) => {
	        this.cardAmountSec = Math.floor((response.data.amount.givenWelfareCardAmount + response.data.amount.givenPayCardAmount) / 150);
	      }); 
	      SZXJ.http(this,'get', appPathList.amount, {}, (response) => {
	        this.exchangeableCashAmount = response.data.amount.exchangeableCashAmount;
	      });
	      this.$nextTick(function(){
	         this.displayFlag = true;
	         var  This = this;
	         setTimeout(function(){
	            document.body.removeChild(document.getElementById("loading"));
	         },300)
	       });
	    },
	    getValueFn:function(){  
	      if( this.allAmount <= 0 ){
	        this.cashAmount = 0;
	        this.cardAmount = 0;
	        this.allAmount = 0;
	      }else if(this.allAmount >= (this.cardAmountSec + this.exchangeableCashAmount)){
	        this.allAmount = this.cardAmountSec   + this.exchangeableCashAmount;
	        this.cashAmount = this.exchangeableCashAmount;
	        this.cardAmount = Math.floor(this.cardAmountSec);
	      } else {
	        if(  this.allAmount < this.cardAmountSec){
	             this.cashAmount = 0;
	             this.cardAmount = this.allAmount ;
	          } else if( this.allAmount  ==  this.cardAmountSec){
	               this.cashAmount = 0;
	               this.cardAmount = Math.floor(this.cardAmountSec) ;
	          }else {
	               this.cardAmount = Math.floor(this.cardAmountSec);
	               this.cashAmount = Math.floor(this.allAmount - this.cardAmountSec);
	          } 
	      }
	    },
	},
  	head: function(){
  		return {
  			title: '提现-QC轻小说',
  	    meta: [
  			    { charset: 'UTF-8' },
  			    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no' },
  			  	{ name: 'format-detection', content: 'telephone=no' },
  			  	{ name: 'apple-touch-fullscreen', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  			  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
  			  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
  			  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
  			],
  			link: [
  	  		]
  	  }
  	}
}
</script>

<style>

	/*@font-face{font-family:sansSerif;src:url('../font/app-font/Microsoft Sans Serif.eot');src:url('../font/app-font/Microsoft Sans Serif.eot?#iefix') format('embedded-opentype'),url('../font/app-font/Microsoft Sans Serif.woff') format('woff'),url('../font/app-font/Microsoft Sans Serif.woff2') format('woff'),url('../font/app-font/Microsoft Sans Serif.ttf') format('truetype'),url('../font/app-font/Microsoft Sans Serif.svg#YourWebFontName') format('svg')}*/
		*{margin:0;padding:0;font-family:sansSerif;list-style:none;text-decoration:none;border:0;color:#000;line-height: 1.1;}
		a:visited{color:#000}
		input{height:.4rem}
		body{background-color:#f4f4f4;padding-bottom:.8rem;}
		.deposit .content{margin:0 auto;position:relative;margin-top: 0.88rem;}
		.deposit .content .cephalosome{position:fixed;width:100%;top:0;background-color:#fff;box-shadow:0 .03rem .05rem #ececec}
		.deposit .content .cephalosome span{font-size: .32rem;margin: 0 auto;display: block;text-align: center;height: .8rem;line-height: .16rem;padding: .32rem 0;box-sizing: border-box;}
		.deposit .content .cephalosome .back{position: absolute;left: 7%;height: .8rem;padding: .25rem 0;box-sizing: border-box;}
		.deposit .content .main{margin-top:7%;background-color:#fff}
		.deposit .content .main .list{border-bottom:.011rem solid rgba(0,0,0,.05);overflow:hidden;vertical-align:bottom;padding:2% 5% 2% 7%;line-height:1.5}
		.deposit .content .main .list .headimg{width:.48rem;height:.48rem;border-radius:5rem;background-color:#00A1D6;float:right;vertical-align:middle}
		.deposit .content .main .list .title{vertical-align:bottom;display:inline-block;font-size:.28rem;width:1.5rem;text-align:right}
		.deposit .content .main .list .name{vertical-align:bottom;display:inline-block;margin-left:15%;font-size:.28rem}
		.deposit .content .main .list span{font-size:.28rem;vertical-align:bottom}
		.deposit .content .main .list input{margin-left:15%;width:45%;font-size:.28rem;vertical-align:bottom}
		.deposit .content .small{margin-top:3%}
		.deposit .content .true{padding:1% 3%;background-color:#3fd2e8;text-align:center;margin:7% 25% 0 25%;border-radius:5rem;color:#fff;font-size:.28rem}
</style>
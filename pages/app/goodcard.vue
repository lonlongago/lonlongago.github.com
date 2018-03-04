<template>
	<div v-show="displayFlag" style="display: none;" id="goodcard" class="goodcard">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
			<div class="cephalosome">
		      <img @click="backFn" class="back" src="data:image/png;base64,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" alt="" />
		      <span>好人卡</span>
		      <div class="card">
		        <div class="number">{{cardamount}}</div>
		        <p>我的好人卡（张）</p>
		      </div>
		      <div class="gift">
		        <div class="number">{{listamount}}</div>
		        <p>获得的礼物（张）</p>
		      </div>
		    </div> 
		    <a href="/app/account">
		     <div class="bill">
		        <img class="img" src="http://cdn.qcacg.com/img/app_index/goodcard_05.png" alt="" />
		        <span>账户余额</span>
		        <img class="go" src="http://cdn.qcacg.com/img/app_index/core_13.png" alt="" />
		        <span v-if="unexchangeableCashAmount >0" class="money">可用余额：{{unexchangeableCashAmount}}.00</span>
		        <span v-else class="money">账户余额：0.00</span>
		      </div>
		    </a>
		    <div class="recharge">
		      <div class="title">购买好人卡</div>
		      <ul class="list" @click="payFn(100,1)" >
		        <li class="number"> 
		          <img class="img" src="http://cdn.qcacg.com/img/app_index/goodcard_09.png" alt="" />  
		          <span>100&nbsp;张好人卡</span>
		        </li>
		        <li class="money">￥1.00</li>
		      </ul>
		      <ul class="list" @click="payFn(500,5)" >
		        <li class="number"> 
		          <img class="img" src="http://cdn.qcacg.com/img/app_index/goodcard_09.png" alt="" />  
		          <span>500&nbsp;张好人卡</span>
		        </li>
		        <li class="money">￥5.00</li>
		      </ul>
		      <ul class="list" @click="payFn(1000,10)" >
		        <li class="number"> 
		          <img class="img" src="http://cdn.qcacg.com/img/app_index/goodcard_09.png" alt="" />  
		          <span>1000&nbsp;张好人卡</span>
		        </li>
		        <li class="money">￥10.00</li>
		      </ul>
		      <ul class="list" @click="payFn(3000,30)" >
		        <li class="number"> 
		          <img class="img" src="http://cdn.qcacg.com/img/app_index/goodcard_09.png" alt="" />  
		          <span>3000&nbsp;张好人卡</span>
		        </li>
		        <li class="money">￥30.00</li>
		      </ul>
		      <ul class="list" @click="payFn(5000,50)" >
		        <li class="number"> 
		          <img class="img" src="http://cdn.qcacg.com/img/app_index/goodcard_09.png" alt="" />  
		          <span>5000&nbsp;张好人卡</span>
		        </li>
		        <li class="money">￥50.00</li>
		      </ul>
		      <ul class="list" @click="payFn(10000,100)" >
		        <li class="number"> 
		          <img class="img" src="http://cdn.qcacg.com/img/app_index/goodcard_09.png" alt="" />  
		          <span>10000&nbsp;张好人卡</span>
		        </li>
		        <li class="money">￥100.00</li>
		      </ul>
		    </div>
		    <div v-if="windowFlag" class="window">
		       <div class="popup">
		         <div class="title">购买</div>
		         <div class="info">
		           <img src="http://cdn.qcacg.com/img/app_index/goodcard_09.png" alt="" />
		           <span><b>{{numBer}}</b>好人卡</span>
		           <p>￥&nbsp;{{amount}}.00</p>
		         </div>
		         <div class="cancel" @click="windowFlagFn">取消</div>
		         <div class="true" @click="windowTrue" >确认支付</div>
		       </div>
		    </div>
		    <appBottom></appBottom>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header'
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
		'appPathList':appPathList
//		'myheader':Header,
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
		    cardamount:'',
		    listamount:'',
		    objSec:{
		      status:1,
		      pageNo:1,
		      pageSize:1,
		    },
		    unexchangeableCashAmount:'',
		    windowFlag:false,
		    numBer:'',
		    amount:'',
		    menuList: false,
		    toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
    	this.displayFlag = true;
    	k_touch("goodcard", "y");
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
	    windowFlagFn:function(){
	      this.windowFlag = false;
	    },
	    payFn:function(a,b){
	      this.numBer = a ;  
	      this.amount = b ;
	      this.windowFlag = true;
	    },
	    windowTrue:function(){
	      var data = {
	        amount : this.amount,
	      };
	      SZXJ.http(this,'get', appPathList.buyCard, data, (response) => {
  				SZXJ.http(this,'get', appPathList.amount, this.objSec, (response) => {
		          this.unexchangeableCashAmount = response.data.amount.unexchangeableCashAmount+response.data.amount.exchangeableCashAmount;
	        	});
	        	SZXJ.http(this,'post', appPathList.cardamount, {}, (response) => {
	          		this.cardamount = response.data.amount.payCardAmount + response.data.amount.welfareCardAmount;
	          		this.listamount = response.data.amount.givenWelfareCardAmount + response.data.amount.givenPayCardAmount;
	        	});
						this.windowFlag = false;
		        prompt("购买成功");
	        },(err)=>{
	        	prompt(err.data.msg);
	        });
	    },
	    getValueFn:function(){
	        SZXJ.http(this,'post', appPathList.cardamount, {}, (response) => {
	          this.cardamount = response.data.amount.payCardAmount + response.data.amount.welfareCardAmount;
	          this.listamount = response.data.amount.givenWelfareCardAmount + response.data.amount.givenPayCardAmount;
	        });
	        SZXJ.http(this,'get', appPathList.amount, this.objSec, (response) => {
	              this.unexchangeableCashAmount = response.data.amount.unexchangeableCashAmount+response.data.amount.exchangeableCashAmount;
	        });
	        this.$nextTick(function(){
	         this.displayFlag = true;
	         var  This = this;
	         if(document.getElementById("loading")){
	           setTimeout(function(){
	            document.body.removeChild(document.getElementById("loading"));
	           },300)
	         }
	       });
	    },
	},
  	head: function(){
  		return {
  			title: '好人卡-QC轻小说',
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
  		    	{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		]
  	  }
  	}
}
</script>

<style>
	
		body{background-color:#f4f4f4;padding-bottom:.8rem;}
		.goodcard .content{max-width: 7.5rem;margin:0 auto;position:relative;min-height:12rem}
		.goodcard .content .cephalosome{position:relative;background-color:#ec8f4a;height:2.5rem}
		.goodcard .content .cephalosome span {color: #FFFFFF;}
		.goodcard .content .cephalosome .card{text-align:center;display:inline-block;color:#fff;width:48%;border-right:1px solid rgba(255,255,255,.35)}
		.goodcard .content .cephalosome .card p{font-size:.24rem;color:#fff}
		.goodcard .content .cephalosome .card .number{font-size:.48rem;margin-bottom:3%;color:#fff}
		.goodcard .content .cephalosome .gift{text-align:center;display:inline-block;color:#fff;width:49%;margin-top:20px}
		.goodcard .content .cephalosome .gift p{font-size:.24rem;color:#fff}
		.goodcard .content .cephalosome .gift .number{font-size:.48rem;margin-bottom:3%;color:#fff}
		.goodcard .content .bill{margin:3.5% 0;background-color:#fff;padding:3% 8%;font-size:.28rem;overflow:hidden;border-bottom:.011rem solid rgba(0,0,0,.065);border-top:.011rem solid rgba(0,0,0,.065)}
		.goodcard .content .bill span{vertical-align:middle}
		.goodcard .content .bill .img{width:.26rem;height:.28rem;vertical-align:middle;margin-right:3%;margin-top:1%}
		.goodcard .content .bill .go{width:.12rem;height:.2rem;float:right;margin-top:1%}
		.goodcard .content .bill .money{float:right;margin-right:5%;color:rgba(0,0,0,.45);font-size:.24rem;margin-top:1%}
		.goodcard .content .recharge{background-color:#fff;padding:2% 0;border-bottom:.011rem solid rgba(0,0,0,.065);border-top:.011rem solid rgba(0,0,0,.065)}
		.goodcard .content .recharge .title{font-size:.2rem;margin-left:8%;margin-bottom:1%}
		.goodcard .content .recharge .list{overflow:hidden;border-bottom:1px solid rgba(0,0,0,.08);padding:3.5% 0 3.5% 10%;line-height: 1.5;}
		.goodcard .content .recharge .list li{float:left}
		.goodcard .content .recharge .img{margin-right:3%;width:.3rem;height:.26rem;vertical-align:middle}
		.goodcard .content .recharge .img img{width:.3rem;height:.26rem;vertical-align:middle}
		.goodcard .content .recharge .list .number{padding-top:1%;font-size:.28rem;width:3rem;height: 0.35rem;line-height: 0.35rem;}
		.goodcard .content .recharge .list .money{float:right;border:1px solid #ec6d73;border-radius:100rem;color:#ec6d73;margin-top:1%;font-size:.2rem;height: 0.35rem;line-height:.4rem;min-width: 0.5rem;padding: 0 2%;margin-right: 10%;}
		.goodcard .content .window{width:100%;height:100%;background-color:rgba(0,0,0,.2);z-index:999;position:fixed;top:0}
		.goodcard .content .window .popup{background-color:#fff;box-shadow:0 .03rem .05rem rgba(0,0,0,.15);position:absolute;top:22%;left:30%;border-radius:.1rem;min-width:3.5rem}
		.goodcard .content .window .popup .title{text-align:center;font-size:.28rem;padding:3%}
		.goodcard .content .window .popup .info{border-top:.011rem solid rgba(0,0,0,.055);border-bottom:.011rem solid rgba(0,0,0,.055);padding:7% 0;text-align:center}
		.goodcard .content .window .popup .info img{width:.3rem;height:.26rem;vertical-align:middle;margin-right:3%}
		.goodcard .content .window .popup .info span{font-size:.24rem;vertical-align:middle}
		.goodcard .content .window .popup .info b{margin-right:2%}
		.goodcard .content .window .popup .info p{margin-top:5%;font-size:.24rem;font-weight:600}
		.goodcard .content .window .popup .cancel{display:inline-block;text-align:center;width:50%;border-right:.011rem solid rgba(0,0,0,.055);padding:3% 0;color:rgba(0,0,0,.65);font-size:.2rem;float:left}
		.goodcard .content .window .popup .true{display:inline-block;text-align:center;width:48%;padding:3% 0;float:right;color:rgba(0,0,0,.65);font-size:.2rem}
</style>
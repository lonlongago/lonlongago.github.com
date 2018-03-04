<template>
	<div v-show="displayFlag" style="display: none;" id="recharge" class="recharge">
		<div id="money"></div>
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
			<div @click="popupFn" v-if="popupFlag" class="popup"></div>
			<div v-if="popupFlag" class="weixinImg"><img @click="popupFn" class="close" src="/img/app_index/shut.png" alt="" /><img class="erweima" :src=" 'data:image/png;base64,' + img " alt="" /></div>
			<myheader msg="充值"></myheader>
		    <div class="main">
		       <div class="list">
		         <span class="title">充值账号</span>
		         <span class="phone">{{userName}}</span>
		       </div>
		    </div>
		    <div class="main listSec">
		      <div class="list ">
		         <img class="coin" src="http://cdn.qcacg.com/img/app_index/recharge_03.png" alt="" />
		         <span class="title">支付方式</span>
		         <img @click="ImgFn(1)" class="coin rightimg" :class=" chooseFlag == 1 ? 'active':''" src="data:image/png;base64,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" alt="" />
		<!--         <img @click="ImgFn(2)" class="coin rightimg weixin" :class=" chooseFlag == 2 ? 'active':''" src="http://cdn.qcacg.com/img/app_index/weixinpay.png" alt="" />
		-->       </div>
		    </div>
		    <div class="main pay">
		      <ul class="purchase" @click="amountFn(1)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>1.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		      <ul class="purchase" @click="amountFn(5)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>5.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		      <ul class="purchase" @click="amountFn(10)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>10.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		      <ul class="purchase" @click="amountFn(30)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>30.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		      <ul class="purchase" @click="amountFn(50)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>50.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		      <ul class="purchase" @click="amountFn(100)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>100.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		      <ul class="purchase" @click="amountFn(300)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>300.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		      <ul class="purchase" @click="amountFn(500)" >
		        <a>
		        <li class="number">
		            <img class="img" src="http://cdn.qcacg.com/img/app_index/recharge_10.png" alt="" />      
		            <span>￥<span>500.00</span>元</span>                 
		        </li>
		        <li class="money">购买</li>
		        </a>
		      </ul>
		    </div>
		    
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
		    userName:'',
		    amount:'',
		    open:'',
		    menuList: false,
		    toWrap: false,
		    chooseFlag:1,
		    popupFlag:false,
		    img:'',
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
    	k_touch("recharge", "y");
	  	this.getValueFn();
    	this.displayFlag = true;
	  })
	},
	methods: {
	    ImgFn:function(a){
	      this.chooseFlag = a;
	    },
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
	    amountFn:function(a){
	      var v = String(a);
	      var money = document.getElementById("money");
	      var data = {
	        amount : a,
	      };
	      var dataSec = {
	        total_fee : v,
	        attach : "2101",
	        body : '商品1号',
	      };
	      if(this.chooseFlag == 1){
	        SZXJ.http(this,'get', appPathList.newRecharge, data, (response) => {
	         this.open = response.data.data;
	         console.log(response.data.data);
	         money.innerHTML= this.open;
	         document.forms[0].submit();
	        });
	      }else{
	        SZXJ.http(this,'post', appPathList.paystart, dataSec, (response) => {
	           this.img = response.data.data;
	           this.popupFlag = true;
	        });
	      }
	    },
	    popupFn:function(){
	      this.popupFlag = false;
	    },
	    getValueFn:function(){
	      SZXJ.http(this,'get', appPathList.getStatus, {}, (response) => {
	          this.userName = response.data.status.userName;
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
	    }
    },
  	head: function(){
  		return {
  			title: '充值-QC轻小说',
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
	body{padding-bottom:.8rem;background-color:#f4f4f4}
	.recharge .content{max-width: 7.5rem;margin:0 auto;position:relative;margin-top: 0.88rem;}

	.recharge .content .main{margin-top:3.5%;background-color:#fff}
	.recharge .content .listSec{margin-top:3%}
	.recharge .content .main .list{border-bottom:1px solid rgba(0,0,0,.05);overflow:hidden;vertical-align:middle;padding:3.5% 5% 3.5% 7%;font-size:.28rem}
	.recharge .content .main .list .phone{float:right}
	.recharge .content .main .list .coin{width:.48rem;height:.48rem;vertical-align:middle;margin-right:2%}
	.recharge .content .main .list .coin .title{vertical-align:middle}
	.recharge .content .main .list .rightimg{float:right}
	.recharge .content .main .list .weixin{margin-right: 10%;}
	.recharge .content .pay .purchase{border-bottom:1px solid rgba(0,0,0,.05);overflow:hidden;vertical-align:middle;padding:3% 5% 3% 12%}
	.recharge .content .pay .purchase li{float:left}
	.recharge .content .pay .purchase .img{margin-right:2%;width:.3rem;height:.3rem;vertical-align:middle}
	.recharge .content .pay .purchase .img img{width:.3rem;height:.3rem;vertical-align:middle}
	.recharge .content .pay .purchase .number{padding-top:1%;font-size:.28rem;width:3rem}
	.recharge .content .pay .purchase .number span{padding-right:2%}
	.recharge .content .pay .purchase .money{float:right;border:1px solid #ec6d73;padding:0% 2.5%;border-radius:100rem;color:#ec6d73;margin-right:10%;font-size:.24rem;height: 0.4rem;line-height: 0.4rem;}
    .active{border: 1px solid #007AFF;}
    .popup{position: fixed;width: 100%;height: 100%;top: 0;background-color: rgba(0,0,0,0.4);z-index: 99;}
    .weixinImg{position:fixed;width: 3rem;height: 3rem;text-align: center;top: 35%;left:32%;z-index: 9999;}
    .weixinImg .erweima{height: 2.5rem;height: 2.5rem;}
    .close{position: fixed;right: 20%;top: 25%;width: 0.48rem;}
</style>
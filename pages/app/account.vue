<template>
	<div id="account" v-show="displayFlag" style="display: none;" class="account">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
			<div class="cephalosome">
		      <img @click="backFn" class="back" src="data:image/png;base64,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" alt="" />
		      <span class="title">钱包</span>
		      <div style="font-size: 0;overflow: hidden;padding-bottom: .30rem;"> 
			      <div class="binding">
			        <p>绑定金额</p>
			        <div class="number"><i class="span">{{amount.unexchangeableCashAmount}}</i>&nbsp;￥</div> 
			      </div>
			      <div class="welfare">
			        <p>福利金额</p>
			        <div class="number"><i class="span">{{amount.welfareCashAmount}}</i>&nbsp;￥</div>      
			      </div>
			      <div class="binding">
			        <p>可提现余额</p>
			        <div class="number"><i class="span">{{amount.exchangeableCashAmount}}</i>&nbsp;￥</div>      
			      </div>
		      </div>
		    </div> 
		    <a href="/app/recharge">
		      <div class="bill">
		        <img class="img" src="http://cdn.qcacg.com/img/app_index/account_03.png" alt="" />
		        <span>充值</span>
		        <img class="go" src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
		      </div>
		    </a>
		    <a href="/app/withdrawals">
		      <div class="bill withdrawals">
		        <img class="img" src="http://cdn.qcacg.com/img/app_index/account_06.png" alt="" />
		        <span>提现</span>
		        <img class="go" src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
		      </div>
		    </a>
		    <a href="/app/goodcard">
		      <div class="bill goodcard">
		        <img class="img" src="http://cdn.qcacg.com/img/app_index/account_08.png" alt="" />
		        <span>好人卡</span>
		        <img class="go" src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
		      </div>
		    </a>
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
			path: appPathList,
		    amount:'',
		    displayFlag:false,
		    menuList: false,
		    toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
    	k_touch("account", "y");
	  	this.getValueFn();
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
	    getValueFn:function(){
	      SZXJ.http(this,'get', appPathList.amount, {}, (response) => {
	          this.amount = response.data.amount;
	          this.$nextTick(function(){
	           this.displayFlag = true;
	           var  This = this;
	           setTimeout(function(){
	              document.body.removeChild(document.getElementById("loading"));
	           },500)
	         });
	      });
	      this.displayFlag = true;
	    }
	  },
	head: function(){
  		return {
  			title: '钱包-QC轻小说',
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
	body{background-color:#f4f4f4;padding-bottom:.8rem}
	.account .content{margin:0 auto;position:relative;max-width: 7.5rem;overflow-x: hidden;}
	.account .content .cephalosome{position:relative;background-color:#44aef8;min-height: 2.5rem;height: auto;}
	.account .content .cephalosome .title{color: #FFFFFF;}
	.account .content .cephalosome .binding{text-align:center;display:inline-block;color:#fff!important;width:32%}
	.account .content .cephalosome .binding p{text-align:left;padding-left:25%;margin:10% 0 10% 0;font-size:.24rem;color:#fff}
	.account .content .cephalosome .welfare p{text-align:left;padding-left:25%;margin:10% 0 10% 0;font-size:.24rem;color:#fff}
	.account .content .cephalosome .binding .number{color:#fff;padding-top:5%;text-align:right;padding-right:15%;font-size:.24rem}
	.account .content .cephalosome .binding .number .span{font-size:.4rem;color:#fff;}
	.account .content .cephalosome .welfare{margin-top:3%;text-align:center;display:inline-block;color:#fff!important;width:32%}
	.account .content .cephalosome .welfare .number{color:#fff;border-left:1px solid rgba(255,255,255,.35);border-right:1px solid rgba(255,255,255,.35);padding-top:5%;text-align:right;padding-right:15%;font-size:.24rem}
	.account .content .cephalosome .welfare .number .span{font-size:.4rem;color:#fff;}
	.account .content .bill{margin-top:3%;background-color:#fff;padding:3.5% 8%;font-size:.24rem;overflow:hidden;border-top:1px solid rgba(0,0,0,.035);border-bottom:1px solid rgba(0,0,0,.035)}
	.account .content .bill .img{width:.25rem;height:.23rem;vertical-align:middle;margin-right:4%}
	.account .content .bill .go{width:.09rem;height:.17rem;float:right;margin-top:2%}
	.account .content .bill span{vertical-align:middle}
	.account .content .bill .money{float:right;margin-right:5%;color:#777}
	.account .content .withdrawals{margin-top:1%}
	.account .content .goodcard{margin-top:4%}
	.account .content .goodcard .go{margin-top:2%}
	.account .content .goodcard .img{width:.25rem;height:.17rem}
	.account .content .withdrawals .img{width:.25rem;height:.25rem}
	#slideDown{width:.6rem;height:.6rem;border-radius:1rem;background-color:#fff;box-shadow:0 0 .05rem .03rem rgba(0,0,0,.3);position:absolute;left:48%;top:.4rem;z-index:100;text-align:center}
	#slideDown img{display:inline-block;margin-top:2%;width:.54rem;height:.54rem}
</style>
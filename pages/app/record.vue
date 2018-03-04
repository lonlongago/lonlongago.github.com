<template>
	<div v-show="displayFlag" style="display: none;" id="record" class="record">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div class="content">
			<myheader msg="记录"></myheader>
		    <div class="main">
		      <ul class="title">
		        <li @click="goodmenFn()" :class=" Flag == 1 ? 'border' : ''" >好人卡</li>
		        <li @click="walletFn()" :class=" Flag == 2 ? 'border' : ''" >钱包</li>
		      </ul>
		      <ul v-if="Flag == 1" class="list" v-for="obj in goodlist" >
		        <li class="time"><p>{{appvue.getLocalDate(obj.updateTime)}}</p><p>{{appvue.getLocalDateTwo(obj.updateTime)}}</p></li>
		        <li v-if="obj.typeDescription == 2200" class="img"><img src="/img/app_index/consumption_04.png"/></li>
		        <li v-if="obj.typeDescription == 2201" class="img"><img src="/img/app_index/consumption_05.png"/></li>
		        <li v-if="obj.typeDescription == 2202" class="img"><img src="/img/app_index/consumption_01.png"/></li>
		        <li v-if="obj.typeDescription == 2203" class="img"><img src="/img/app_index/consumption_02.png"/></li>
		        <li class="entry">
		          <p>
		            <span v-if=" amount.userName == obj.paiedUserName ">+</span>
		            <span v-else>-</span>
		            <span>{{ obj.payCardAmount + obj.welfareCardAmount}}</span>
		          </p>
		          <p v-if="obj.typeDescription == 2200" class="details">每日签到</p>
		          <p v-if="obj.typeDescription == 2201" class="details">打赏好人卡</p>
		          <p v-if="obj.typeDescription == 2202" class="details">购买好人卡</p>
		          <p v-if="obj.typeDescription == 2203" class="details">好人卡提现</p>
		        </li>
		        <li class="state" v-if=" obj.orderStatus == 0" >交易进行中</li>
		        <li class="state" v-else >交易完成</li>
		      </ul>
		      <ul v-if="Flag == 2" class="list" v-for="obj in walletlist" >
		        <li class="time"><p>{{appvue.getLocalDate(obj.updateTime)}}</p><p>{{appvue.getLocalDateTwo(obj.updateTime)}}</p></li>
		        <li v-if="obj.typeDescription == 2100" class="img"><img src="/img/app_index/consumption_02.png"/></li>
		        <li v-if="obj.typeDescription == 2101" class="img"><img src="/img/app_index/consumption_03.png"/></li>
		        <li v-if="obj.typeDescription == 2102" class="img"><img src="/img/app_index/consumption_01.png"/></li>
		        <li v-if="obj.typeDescription == 2103" class="img"><img src="/img/app_index/consumption_03.png"/></li>
		        <li v-if="obj.typeDescription == 2104" class="img"><img src="/img/app_index/consumption_02.png"/></li>
		        <li v-if="obj.typeDescription == 2105" class="img"><img src="/img/app_index/consumption_03.png"/></li>
		        <li v-if="obj.typeDescription == 2107" class="img"><img src="/img/app_index/consumption_03.png"/></li>
		        <li v-if="obj.typeDescription == 2109" class="img"><img src="/img/app_index/consumption_03.png"/></li>
		        <li class="entry">
		          <p>
		            <span v-if=" amount.userName == obj.paiedUserName ">+</span>
		            <span v-else>-</span>
		            <span >{{ obj.exchangeableCashAmount + obj.unexchangeableCashAmount + obj.welfareCashAmount }}</span>
		          </p>
		          <p v-if="obj.typeDescription == 2100" class="details">提现</p>
		          <p v-if="obj.typeDescription == 2101" class="details">钱包充值</p>
		          <p v-if="obj.typeDescription == 2102" class="details">购买好人卡</p>
		          <p v-if="obj.typeDescription == 2103" class="details">画师金额转入余额</p>
		          <p v-if="obj.typeDescription == 2104" class="details">上月福利金额清零</p>
		          <p v-if="obj.typeDescription == 2105" class="details">小说作品稿费</p>
		          <p v-if="obj.typeDescription == 2107" class="details">画作作品稿费</p>
		          <p v-if="obj.typeDescription == 2109" class="details">福利补贴</p>
		        </li>
		        <li class="state" v-if=" obj.orderStatus == 0" >交易进行中</li>
		        <li class="state" v-else >交易完成</li>
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
import appvue from '~/components/vueHttp-app'
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
		    appvue:appvue,
		    szxj:SZXJ,
		    obj:{
		      pageNum:1,
		      pageSize:20,
		    },
		    goodlist:[],
		    walletlist:[],
		    Flag:1,
		    amount:[],
		    menuList: false,
		    toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
    	k_touch("record", "y");
	    this.goodmenFn();
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
	    goodmenFn:function(){
	      this.Flag = 1;
	      SZXJ.http(this,'get', appPathList.cardlist, this.obj, (response) => {
	              this.goodlist = response.data.data.list;
	         });
	      this.$nextTick(function(){
	        this.displayFlag = true;
	        var  This = this;
	        	if(document.getElementById("loading")){
		          setTimeout(function(){
		           	document.body.removeChild(document.getElementById("loading"));
		          },300);
	          }  
	      });
	    },
	    walletFn:function(){
	      this.Flag = 2;
	         SZXJ.http(this,'get', appPathList.paylist, this.obj, (response) => {
	              this.walletlist = response.data.data.list;
	         });
	    },
	    getValueFn:function(){
	      SZXJ.http(this,'get', appPathList.amount, this.obj, (response) => {
	              this.amount = response.data.amount;
	         });
	    }
    },
  	head: function(){
  		return {
  			title: '记录-QC轻小说',
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
		body{padding-bottom:.8rem;background-color:#fafafa}
		.record .content{max-width: 7.5rem;margin:0 auto;position:relative;margin-top: 0.99rem;}
		.record .content .main{background-color:#fff;margin-top:5%}
		.record .content .main .title{overflow:hidden;border-bottom:1px solid rgba(0,0,0,.08);width: 100%;}
		.record .content .main .title li{float:left;margin-left:25%;font-size:.28rem;padding:1.6% 4.6%}
		.record .content .main .title .border{border-bottom:1px solid #1296db}
		.record .content .main .list{padding:3% 0;margin-left:5%;background-color:#fff;overflow:hidden;border-bottom:1px solid rgba(0,0,0,.05)}
		.record .content .main .list li{float:left;margin-right:3%;text-align:center;vertical-align:middle}
		.record .content .main .list .time{text-align:center;vertical-align:middle;color:#777;font-size:.2rem}
		.record .content .main .list .time p{margin-top:12%}
		.record .content .main .list .img img{width:.52rem;height:.52rem;vertical-align:middle;padding-top:20%}
		.record .content .main .list .entry{width:35%;text-align:left;margin-left:2%;font-size:.28rem}
		.record .content .main .list .entry p{margin-top:3%;font-size:.24rem}
		.record .content .main .list .entry .details{color:rgba(0,0,0,.65);font-size:.24rem;margin-top:1%;padding-left:1%}
		.record .content .main .list .state{padding-top:3.5%;font-size:.24rem;margin-right:0;color:rgba(0,0,0,.65)}
</style>
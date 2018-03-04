<template>
<div id="wallet">
	<script src="/lib/resize_320.js"></script>
	<div class="alls">
		<div class="top">
			<div class="totals">
				<div class="tot">合计(元)</div>
				<div class="tot1">
					<img src="http://cdn.qcacg.com/mobile/img/money.png" alt="" />
					<span>{{Math.floor(amount.welfareCashAmount + amount.exchangeableCashAmount + cardamount.givenPayCardAmount/150 + cardamount.givenWelfareCardAmount/150 + amount.freezeCashAmount + cardamount.freezeCardAmount/150)}}</span>
				</div>
				<div class="mon">
					<div class="mon1">可提现<span>￥{{Math.floor(amount.exchangeableCashAmount + cardamount.givenPayCardAmount/150 + cardamount.givenWelfareCardAmount/150)}}</span></div>
					<div class="mon1">福利<span>￥{{amount.welfareCashAmount}}</span></div>
					<div class="mon1">提现中<span>￥{{Math.floor(amount.freezeCashAmount + cardamount.freezeCardAmount/150)}}</span></div>
				</div>
			</div>
		</div>
		<div class="bot">
			<div class="bot1 btn" @click="moneyFn">
				<span>可提现金额明细</span>
				<img src="http://cdn.qcacg.com/mobile/img/goo.png" alt="" />
			</div>
			<div class="bot1 btn" @click="welFn">
				<span>福利金额明细</span>
				<img src="http://cdn.qcacg.com/mobile/img/goo.png" alt="" />
			</div>
			<div class="bot1 btn" @click="CardFn">
				<span>好人卡明细</span>
				<img src="http://cdn.qcacg.com/mobile/img/goo.png" alt="" />
			</div>
		</div>
	</div>
</div>
</template>

<script>
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
export default{
	data: function(){
		return{
			path:appPathList,
			szxj:SZXJ,
			amount:'',
			cardamount:'',
			loginFlag:'',
			ws:{},
            wn:{},
            wl:{}
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getValueFn();
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
//			self.ws.opener().reload();  //webview重新加载
		}, false);
    },
    webviewAnimation:function(){
      this.ws.hide('slide-out-right');
    },
    moneyFn: function(){
    	if(window.plus){
	        this.wn = plus.webview.create(appPathList.netWorks+'/withdrawals','withdrawals',
	        {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#329eff','titleText':'提现',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,},
		        'statusbar':{'background':'#329eff'},
		        "backButtonAutoControl":'close'
	        });
	        this.wn.onloading= function(){
				plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
			}
			this.wn.onloaded=function(){
				plus.nativeUI.closeWaiting();
			}
	    	this.wn.show('slide-in-right');
		  }else{
		//      location.href = '/mView/withdrawals';
		  }
    },
	welFn: function(){
	  if(window.plus){
        this.wn = plus.webview.create(appPathList.netWorks+'/welfare','walltes',
        {
	        'popGesture':'close',
	        'titleNView':{'backgroundColor':'#329eff','titleText':'福利',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,},
	        'statusbar':{'background':'#329eff'},
	        "backButtonAutoControl":'close'
        });
        this.wn.onloading= function(){
			plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
		}
		this.wn.onloaded=function(){
			plus.nativeUI.closeWaiting();
		}
    	this.wn.show('slide-in-right');
	  }else{
	//      location.href = '/mView/welfare';
	  }
	},
		CardFn: function(){
		  if(window.plus){
            this.wn = plus.webview.create(appPathList.netWorks+'/goodCardDetail','walltes',
            {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#329eff','titleText':'好人卡',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,},
		        'statusbar':{'background':'#329eff'},
		        "backButtonAutoControl":'close'
	        });
	        this.wn.onloading= function(){
				plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
			}
			this.wn.onloaded=function(){
				plus.nativeUI.closeWaiting();
			}
        this.wn.show('slide-in-right');
		      }else{
		//      location.href = '/mView/goodCardDetail';
		      }
		},
		
		getValueFn: function(){
			SZXJ.http(this,'get',appPathList.amount,{},(response)=>{
				this.amount = response.data.amount;
				console.log(response);
			});
			SZXJ.http(this,'get',appPathList.cardamount,{},(response)=>{
				this.cardamount = response.data.amount;
			});
			SZXJ.http(this,'get',appPathList.getStatus,{},(response)=>{
				this.loginFlag = response.data.loginFlag;
				if(this.loginFlag == false){
					if(window.plus){
						this.wl = plus.webview.create(appPathList.netWorks+'/login','login',
						{
					        'popGesture':'close',
					        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
					        'statusbar':{'background':'#ffffff'},
					        "backButtonAutoControl":'close'
				        });
				        	        this.wn.onloading= function(){
							plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
						}
						this.wn.onloaded=function(){
							plus.nativeUI.closeWaiting();
						}
						this.wl.show("slide-in-right")
					}else{
//						location.href = "/mView/login";
					}
				}
			})
		},
	},
	head: function(){
		return{
			title:'我的钱包-QC轻小说',
			meta:[
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说我的钱包"},
		        { name: "keywords",content:"轻小说我的钱包"},
			],
			link:[],
		}
	},
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin: 0;padding: 0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;user-select: none;}
	#wallet{width: 100%;margin: 0 auto;}
	.tp{height: .171rem;width: 100%;}
	#wallet .alls{width: 100%;}
	.btn{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}
	.btn:hover{outline:0;cursor:pointer}
	.btn:focus{outline:0;cursor:pointer}
	.btn:active{-webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0);box-shadow:inset 0 0 1px rgba(0,0,0,0)}
	#wallet .alls .top{background-image: url(http://cdn.qcacg.com/mobile/img/mtops.png);width: 100%;/*height: 1.675rem;*/height:1.128rem;position: absolute;background-repeat: repeat-x;background-size: 100% 100%;}
	#wallet .alls .top .wtop{width: 100%;height: .376rem;}
	#wallet .alls .top .wtop .back{left: .128rem;width: .0683rem;height: .1365rem;top: .291rem;position: absolute;}
	#wallet .alls .top .wtop span{font-size: .154rem;font-family:"微软雅黑";height: .376rem;padding: .111rem 0;box-sizing: border-box;text-align: center;display: block;}
	#wallet .alls .top .totals{width: 100%;height: 1.124rem;}
	#wallet .alls .top .totals .tot{color: white;padding: .128rem;text-align: center;font-size: .128rem;height: .376rem;box-sizing: border-box;}
	#wallet .alls .top .totals .tot1{width: 100%;height: .376rem;}
	#wallet .alls .top .totals .tot1 img{width: .235rem;height: .235rem;padding-top: .0811rem;margin-left: 1.323rem;}
	#wallet .alls .top .totals .tot1 span{margin-left: .064rem;color: white;font-size: .171rem;font-family: "微软雅黑";position: absolute;height: .376rem;padding: .107rem 0;box-sizing: border-box;}
	#wallet .alls .top .totals .mon{height: .376rem;width: 100%;text-align: center;display: -webkit-box;}
	#wallet .alls .top .totals .mon .mon1{color: white;font-size: .1194rem;padding: .128rem 0;-webkit-box-flex: 1;}
	#wallet .alls .top .totals .mon .mon1 span{color: white;font-size: .1194rem;margin-left: .064rem;}
	#wallet .alls .bot{/*margin-top: 1.675rem;*/margin-top:1.128rem;width: 100%;position: absolute;background-color: white;}
	#wallet .alls .bot .bot1{border-bottom: .01rem solid #f4f4f4;height: .376rem;width: 100%;}
	#wallet .alls .bot .bot1 span{margin-left: .128rem;font-family: "微软雅黑";font-size: .128rem;height: .376rem;padding: .124rem 0;display: inline-block;box-sizing: border-box;}
	#wallet .alls .bot .bot1 img{float: right;width: .077rem;height: .145rem;margin-right: .141rem;margin-top: .1155rem;}
	#wallet .alls .bottom{height: .376rem;position: absolute;width: 100%;bottom: .085rem;text-align: center;}
	#wallet .alls .bottom span{font-family: "微软雅黑";font-size: .128rem;height: .376rem;padding: .124rem 0;color: #fedc6f;box-sizing: border-box;display: inline-block;}
	#wallet .alls .bottom img{width: .077rem;height: .111rem;margin-left: .111rem;position: absolute;margin-top: .129rem;}
</style>
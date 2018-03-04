// 钱包-账单
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var bill = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">Personal Wallet</div><div class="titleBlock_LG">个人账单</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li class="active" v-link="{path: \'/bill\'}"><span class="circular"></span><span class="title_name">我的钱包</span></li><li  v-link="{path: \'/wallet\'}"><span class="circular"></span><span class="title_name">我的账单</span></li><li  v-link="{path: \'/goodmen\'}"><span class="circular"></span><span class="title_name">我的好人卡</span></li></ul>'
      +'<div class="content"><div class="bookBlockList"><div class="bookBlockList_title"><span class="hr"></span><span class="title">我的钱包</span><span class="titleTwo">pay bills</span></div><div class="pay-head2">    可提现金额</div><div class="pay-b" @click="registrationFn">提现</div><div class="pay-c" @click="exchangeFn">兑换</div><div class="pay-c" @click="moneyRechargeFn">充值</div>'   
      +'<div v-if="goodmenFlag" class="exchange"><span class="exchange_span">请选择兑换数量:</span><ul class="exchange_ul"><li @click="SubmitgoodFn">×100</li><li @click="SubmitgoodFnTow">×500</li><li @click="SubmitgoodFnThr">×1000</li><li @click="SubmitgoodFnFou">×3000</li><li @click="SubmitgoodFnFix">×5000</li><li @click="SubmitgoodFnSix">×10000</li></ul><div class="exchange_divOne"><span class="exchange_div_span ">*注:每1元钱可购买100张好人卡。</span></div><div class="verification_div verification_div_pay  ">购买数量：&nbsp<span @click="downMoneyFnThr" class="verification_letf">-</span><input type="number" oninput="if(value.length>5)value=value.slice(0,7)" maxlength=7 min="0" v-model="amount" /><span @click="upMoneyFnThr" class="verification_right">+</span><span class="_span">总计：&nbsp<b>{{ amount/100 }}</b>&nbsp元 </span></div> <div class="exchange_div" style="display:none"><span>使用金额</span><input type="number" readonly="readonly"  maxlength=5 v-model="amount"  />元</div><span class="exchange_spanTow">我的余额：{{totalCashAmount}}</span><div class="exchange_divTow" @click="SubmitgoodmenFn">购买</div><div class="exchange_divTow" @click="SubmitgoodmenFnTow">取消</div></div>'
      +'<div v-if="moneyRecharge" class="moneyRecharge">  <div class="moneyRecharge_header">账户余额充值</div>  <div class="moneyRecharge_name" >昵称&nbsp:<input type="text" v-model="userName" disabled="true" /></div>   <div class="moneyRecharge_name" >账号&nbsp:<input type="text" v-model="telphone " disabled="true"  /></div>   <div class="moneyRecharge_number" >充值金额&nbsp:<input type="number" oninput="if(value.length>5)value=value.slice(0,5)" min="0" v-model="amountNumber" maxlength=5   />元</div>   <div class="moneyRecharge_pay" > <span class="moneyRecharge_choose">支付方式:</span><input type="radio" checked="checked"/><div class="moneyRecharge_img"></div></div><span class="registration_div_span registration_div_spanTow">*注意：提现完成后不予撤回，实际充值金额为&nbsp<b>{{amountNumber}}</b>&nbsp元。</span>  <div class="moneyRecharge_div moneyRecharge_div_div" @click="rechargeFn" >确认</div>  <div class="moneyRecharge_div moneyRecharge_div_div" @click="SubmitmoneyRechargeFn">取消</div> </div>'
      +'<div v-show="registration == 1" class="registration"><div class="moneyRecharge_header">提现信息登记</div>  <div class="moneyRecharge_name humanName" >真实姓名&nbsp:<input type="text" v-model="name" /></div>   <div class="moneyRecharge_name payNumber"   >支付宝账号&nbsp:<input type="text" v-model="aliAccount"  /></div>  <div class="moneyRecharge_name payNameTow" >确认支付宝账号&nbsp:<input type="text" v-model="againNumber"  /></div>     <div class="moneyRecharge_name verification" >请输入验证码&nbsp:<input type="text" v-model="inputCode" /><span class="verification_span" @click="showCaptchaObj" v-if="verifyFlag">手机验证</span><div class="verification_spanTow" v-else>{{verifyNumber}}重新发送</div><div id="popup-captcha"></div></div> <span class="registration_div_span">*注意：提现信息提交后将无法直接修改，请仔细检查个人信息，确认填写无误后再提交。</span> <div class="moneyRecharge_div" @click="isTrueOrFalseFn"  >确认</div>  <div class="moneyRecharge_div" @click="SubmitregistrationFn" >取消</div>   </div>'
      +'<div v-if="WithdrawalsFlag"  class="registration registrationTow "><div class="moneyRecharge_header">提现</div> <span class="exchange_spanTow exchange_spanTowTow">可提现金额：&nbsp{{exchangeableCashAmount}}</span>   <div class="verification_div">提取金额：&nbsp<span @click="downMoneyFn" class="verification_letf">-</span><input type="number" readonly="readonly" v-model="doubleamount" /><span @click="upMoneyFn" class="verification_right">+</span></div><span class="exchange_spanTow exchange_spanTowTow amount_span">可提现好人卡数量：&nbsp{{givenPayCardAmount}}</span>   <div class="verification_div verification_divTow">提取好人卡：&nbsp<span @click="downMoneyFnTow" class="verification_letf">-</span><input type="number" min="0"  v-model="cardAmount"  @keydown="keyupFn "/><span @click="upMoneyFnTow" class="verification_right">+</span></div><div class="verification_totel">合计：&nbsp<b>{{cardAmount/150 + doubleamount}}</b>&nbsp元</div><div class="moneyRecharge_div"  @click="WithdrawalsFn"   >确认</div>  <div class="moneyRecharge_div" @click="WithdrawalsFnTow" >取消</div>   </div>'
      +'<div v-if="isTrueOrFalse" class="isTrueShow"><div  class="isTrueOrFalse"><div class="isTrueOrFalse_div">提示</div><span class="isTrueOrFalse_span">请注意核对账号信息是否正确，一经确认，不予撤回。是否确认？</span> <div class="moneyRecharge_div isTrueOrFalseDiv" @click="registrationisFlase"  >确认</div>  <div class="moneyRecharge_div isTrueOrFalseDiv" @click="SubmitisTrueOrFalseFn" >取消</div> </div></div>'
      +'<div v-if="isTru" class="isTrueShow"><div class="isTrueOrFalse"><div class="isTrueOrFalse_div">提示</div><span class="isTrueOrFalse_span">订单已提交</span> <div class="moneyRecharge_div isTrueOrFalseDiv detailFn" @click="detailFn"  ><a target="_black" :href="openurl">网上支付</a></div>  <div class="moneyRecharge_div isTrueOrFalseDiv detailFn" @click="SubmitdetailFn" >取消订单</div> </div></div>'
      +'<div class="pay-d">￥{{exchangeableCashAmount}}</div><hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /><div class="pay-head2">    历史收入</div><div class="pay-number">    ￥{{totalIncome}}</div>  <div class="pay-check"><a :href="path.TemprootPath + \'/view/user_info.html#!/wallet\'">查看账单</a></div> <ul class="explain">    提现说明：<li>1.提现申请成功后不可以撤回</li><li>2.提现金额最低为100元（单位人民币）</li><li>3.申请成功后，工作人员会在7个工作日内将相应的金额打入指定账户</li><li>4.提现好人卡比例为150：1。 </li></ul></div>'
      +'</div></div></div>'
      ,
      data: function() {
        return {
          path: PathList,
        	showFlag: 1,
        	isTru:false,
        	WithdrawalsFlag:false,
        	goodmenFlag:false,
        	moneyRecharge:false,
        	registration:0,
        	isTrueOrFalse:false,
        	amount:0,
        	userName:'',
        	telphone:'',
        	exchangeableCashAmount:'',
        	payCardAmount:'',
        	doubleamount: 0,
        	name:'',
        	alipayAccount:'',
        	cardAmount:0,     
        	givenPayCardAmount:'',
        	verifyFlag: true,
        	verifyNumber: 60, // 验证码重置时间
        	captchaObj: {},
        	uuid: '',
        	inputCode:'',
        	againNumber:'',
        	code:'',
        	aliAccount:'',
        	logId:'',
        	totalCashAmount:'',
        	goodFnSev:'',
        	totalIncome:'',
        	amountNumber:0,
        	keynumber:100,
        	openurl:'',
        };
      },
      route: {
        data() {
          
        } 
      }, 
      methods: {
      	setShowFlagFn: function(v) {
			  this.showFlag = v;
		  }, 
		  keyupFn:function (a){
		    console.log(a.keyCode);
		    if(a.keyCode == 189 ){
		      a.returnValue = false;
		    }else{
		      if(a.keyCode == 109){
		        a.returnValue = false;
		      }
		    }
		  },
		   upMoneyFn:function(number){
		     console.log(this.doubleamount);
		     this.doubleamount = parseInt(this.doubleamount, 10) + 100 ;
	         if(this.doubleamount > this.exchangeableCashAmount){
           this.doubleamount = this.exchangeableCashAmount;
         }
		    },
		   downMoneyFn:function(number){
         console.log(this.doubleamount);
         this.doubleamount= parseInt(this.doubleamount, 10) - 100 ;
         if(this.doubleamount <0){
           this.doubleamount = 0;
         }
       },
       upMoneyFnTow:function(){
         console.log(this.cardAmount);
         this.cardAmount = parseInt(this.cardAmount, 10) + 150 ;    
         if(this.cardAmount > this.givenPayCardAmount){
           this.cardAmount = this.givenPayCardAmount;
         }
        },
       downMoneyFnTow:function(){
         console.log(this.cardAmount);
         this.cardAmount= parseInt(this.cardAmount, 10) - 150 ;
         if(this.cardAmount <0){
           this.cardAmount = 0;
         }
       },
       upMoneyFnThr:function(){
         console.log(this.amount);
         this.amount = parseInt(this.amount, 10) + parseInt(this.keynumber,10) ;       
        },
       downMoneyFnThr:function(){
         console.log(this.amount);
         this.amount= parseInt(this.amount, 10) - parseInt(this.keynumber,10) ;
         if(this.amount <0){
           this.amount = 0;
         }
       },
       WithdrawalsFn:function(){
         if(this.cardAmount %150 !==0 ){
            var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '好人卡数量必须是150的倍数'); 
                      return;
         }else{
          this.$set('WithdrawalsFlag', false);
          var _data= {};
          _data.cashAmount = this.doubleamount;
          _data.cardAmount = this.cardAmount;
          SZXJ.http(this,'get', PathList.withdrawals, _data, (response) => { 
            if(response.data.code == 200){
              var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(false, '申请成功');
                      this.amountYueFn();
                      return;
            }            
          });
         }
       },
       WithdrawalsFnTow:function(){
         this.$set('WithdrawalsFlag', false);
       },
       verificationTimeFn: function() {
          if (this.verifyNumber === 0) {
            this.$set('verifyNumber', 60);
            this.verifyFlag = true;
            return;
          } else {
            this.$set('verifyNumber', --this.verifyNumber);
            var This = this;
            setTimeout(function(){
              This.verificationTimeFn();
            }, 1000);
          }
        },
       getGeetestFn : function () { // 获取就极验验证码
          SZXJ.http(this,'get', PathList.StartCaptchaServlet, {}, (data) => {
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            window.initGeetest({
              gt: data.data.gt,
              challenge: data.data.challenge,
              product: "popup",
              // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
              offline: !data.data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            },
            this.handlerPopup);
          });
        },
         showCaptchaObj() {
          this.captchaObj.show();
        },

        handlerPopup: function(captchaObj) {
          this.captchaObj = captchaObj;
          var This = this;
          captchaObj.onReady(function() {
          captchaObj.onSuccess(function() {
              var validate = captchaObj.getValidate();
              var userEntity = {};
              userEntity.geetest_challenge = validate.geetest_challenge;
              userEntity.geetest_validate = validate.geetest_validate;
              userEntity.geetest_seccode = validate.geetest_seccode;
              SZXJ.http(This,'post', PathList.updatePasswordTelephoneCode, userEntity, (data) => {
                This.uuid =  data.data.updateVariId;               
                This.verifyFlag = false;
                This.verificationTimeFn();
                // 60秒倒计时
              },(err) => {
                if (data.err.code === 1002) {
                  This.getGeetestFn();
                }
              });
            })
          });
          // 将验证码加到id为captcha的元素里
          captchaObj.appendTo("#popup-captcha");
          // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
        },
       registrationisFlase:function(){
         this.$set('registration', 0);         
         this.$set('isTrueOrFalse',false);
           var _data={};
           _data.realName = this.name;
           _data.alipayAccount = this.aliAccount;
           _data.uuid  = this.uuid ; 
           _data.inputCode  = this.inputCode ; 
           SZXJ.http(this,'get', PathList.saveAlipay, _data, (response) => {  
                if(response.data.code == 200){
                  this.$set('WithdrawalsFlag',true);
                }
           });
          
       },
	     SubmitgoodFn:function(){
	       this.$set('amount', parseInt(this.amount, 10) + 100);
	       this.$set('keynumber', 100 );
	     },
	     SubmitgoodFnTow:function(){
         this.$set('amount', parseInt(this.amount, 10) + 500);
         this.$set('keynumber', 500 );
       },
       SubmitgoodFnThr:function(){
         this.$set('amount', parseInt(this.amount, 10) + 1000);
         this.$set('keynumber', 1000 );
       },
       SubmitgoodFnFou:function(){
         this.$set('amount', parseInt(this.amount, 10) + 3000);
         this.$set('keynumber', 3000 );
       },
       SubmitgoodFnFix:function(){
         this.$set('amount', parseInt(this.amount, 10) + 5000);
         this.$set('keynumber', 5000 );
       },
       SubmitgoodFnSix:function(){
         this.$set('amount', parseInt(this.amount, 10) + 10000);
         this.$set('keynumber', 10000 );
       },
		   isTrueOrFalseFn:function(){
             if(this.againNumber !== this.aliAccount ){
                      var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '两次支付宝账号不正确'); 
                      return;
                 } else if(this.inputCode == ''){
                   var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '验证码不能为空');
                      return;
                 }else{
                   this.$set('isTrueOrFalse', true);
          };    
		   },
		   exchangeFn:function(){
		     this.$set('goodmenFlag', true);
		   },
		   SubmitisTrueOrFalseFn:function(){
         this.$set('isTrueOrFalse', false);
       },
		   registrationFn:function(){
		     this.$set('registration', 1);
		     this.getGeetestFn();
		   },
		   SubmitregistrationFn:function(){
         this.$set('registration', 2);
       },
		   moneyRechargeFn:function(){
		      this.$set('moneyRecharge', true);
		   },
		   SubmitmoneyRechargeFn:function(){
		      this.$set('moneyRecharge', false);
		   },

		   SubmitgoodmenFn:function(){
		     if(this.amount % 100 !== 0 ){
		        var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '购买数量必须是100的倍数');
                      return;
		     }else if(this.amount <=0){
		        var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '购买数量不能为0或负数');
                      return;
		     }else{
		       this.$set('goodmenFlag', false);
           var _data={};
           _data.amount = this.amount/100;
            SZXJ.http(this,'get', PathList.buyCard, _data, (response) => { 
              if(response.data.code == 200 ){
                 var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(false, '购买成功');
                      this.amountYueFn();
                      return;
                  }
            });
		     }          
       },

       SubmitgoodmenFnTow:function(){
         this.$set('goodmenFlag', false);
       },
       detailFn:function(){
         this.$set('isTru', false);
       },
       SubmitdetailFn:function(){
         this.$set('isTru', false);
       },
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
            this.$set('bookList', response.data);
          });
          SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
            this.userName = response.data.status.userName;
            this.telphone = response.data.status.telphone;
          }); 
          
          SZXJ.http(this,'get', PathList.cardamount, {}, (response) => {
            this.payCardAmount = response.data.amount.payCardAmount;
            this.givenPayCardAmount =response.data.amount.givenPayCardAmount;
          });  
          SZXJ.http(this,'get', PathList.totalIncome, {}, (response) => {
            this.totalIncome = response.data.data;
          });  
        },
        amountYueFn:function(){
          SZXJ.http(this,'get', PathList.amount, {}, (response) => {
            this.exchangeableCashAmount = response.data.amount.exchangeableCashAmount;
            this.totalCashAmount = response.data.amount.exchangeableCashAmount +  response.data.amount.unexchangeableCashAmount + response.data.amount.welfareCashAmount;
          });
        },
       rechargeFn:function(){
          if(this.amountNumber == '' || this.amountNumber <= 0){
             var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                Utils.setMessage(true, '充值金额不能为空或小于0');
                return;
         } else{
           this.$set('moneyRecharge', false);
         }
         
         this.$set('isTru', true);
          var _data={};
          _data.amount = this.amountNumber;
          SZXJ.http(this,'get', PathList.recharge, _data, (response) => { 
            this.logId =response.data.logId;
            console.log(response);
            this.openurl = response.data.pay_url;
          });
       }
      },
      ready : function (){
      	this.getBookListFn();
      	
      	this.amountYueFn();
      },
   });
export default bill;   
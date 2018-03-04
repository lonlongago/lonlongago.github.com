<template>
	<div v-show="bodyFlag" style="display: none;">
		<script src="/lib/jquery.min.js"></script>
	    <script src="/lib/jquery-ui.min.js" ></script>
	    <script src="/lib/jquery.validate.js"></script>
		<script src="https://static.geetest.com/static/tools/gt.js"></script>   
		<alert ref="alert"></alert>
		<myheader></myheader>
		<div class="user_info_topBJ"></div>
		<div class="user_info clear"> 
		    <!-- 左边导航 --> 
			<navLeft :active = "active"></navLeft>
		    <!-- 右边内容 -->
			<div class="user_info_right">
				<div class="user_info_title">
				    <div class="titleBlock">
				     Personal Wallet
				    </div>
				    <div class="titleBlock_LG">
				           个人账单
				    </div>
				</div>
				<div class="user_info_content">
				    <div class="contribution"> 
					    <ul class="nav">
					        <li @click = "tapMove(1)" :class=" tapNumber == 1 ?'active':''"><span class="circular"></span><span class="title_name">我的钱包</span></li>
					        <li @click = "tapMove(2)" :class=" tapNumber == 2 ?'active':''"><span class="circular"></span><span class="title_name">我的账单</span></li>
					        <li @click = "tapMove(3)" :class=" tapNumber == 3 ?'active':''"><span class="circular"></span><span class="title_name">我的好人卡</span></li>
					    </ul> 
					    <div class="content">
					        <div class="bookBlockList" v-if = " tapNumber == 1 ?true:false">
							    <div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">我的钱包</span>
							        <span class="titleTwo">pay bills</span>
							    </div>
						        <div class="pay-head2">
						                     可提现金额
						        </div>
						        <div class="pay-b" @click="registrationFn">
						                   提现
						        </div>
						        <div class="pay-c" @click="exchangeFn">
						                    兑换
						        </div>
						        <div class="pay-c" @click="moneyRechargeFn">
						                     充值
						        </div> 
						        <div v-if="goodmenFlag" class="exchange">
						            <span class="exchange_span">请选择兑换数量:</span>
							        <ul class="exchange_ul">
								        <li @click="SubmitgoodFn">&times;100</li>
								        <li @click="SubmitgoodFnTow">&times;500</li>
								        <li @click="SubmitgoodFnThr">&times;1000</li>
								        <li @click="SubmitgoodFnFou">&times;3000</li>
								        <li @click="SubmitgoodFnFix">&times;5000</li>
								        <li @click="SubmitgoodFnSix">&times;10000</li>
							        </ul>
							        <div class="exchange_divOne">
							             <span class="exchange_div_span ">*注:每1元钱可购买100张好人卡。</span>
							        </div>
							        <div class="verification_div verification_div_pay  ">
							                       购买数量：&nbsp;
							            <span @click="downMoneyFnThr" class="verification_letf">-</span>
							            <input type="number" oninput="if(value.length&gt;5)value=value.slice(0,7)" maxlength="7" min="0" v-model="amount" />
							            <span @click="upMoneyFnThr" class="verification_right">+</span>
							            <span class="_span">总计：&nbsp;<b>{{ amount/100 }}</b>&nbsp;元 </span>
							        </div> 
							        <div class="exchange_div" style="display:none">
							            <span>使用金额</span>
							            <input type="number" readonly="readonly" maxlength="5" v-model="amount" />元
							        </div>
						            <span class="exchange_spanTow">我的余额：{{totalCashAmount}}</span>
							        <div class="exchange_divTow" @click="SubmitgoodmenFn">
							                       购买
							        </div>
							        <div class="exchange_divTow" @click="SubmitgoodmenFnTow">
							                        取消
							        </div>
						        </div> 
						        <div v-if="moneyRecharge" class="moneyRecharge"> 
							        <div class="moneyRecharge_header">
							                        账户余额充值
							        </div> 
							        <div class="moneyRecharge_name">
							                       昵称&nbsp;:
							            <input type="text" v-model="userName" disabled="true" />
							        </div> 
							        <div class="moneyRecharge_name">
							                          账号&nbsp;:
							            <input type="text" v-model="telphone " disabled="true" />
						            </div> 
							        <div class="moneyRecharge_number">
							                         充值金额&nbsp;:
							            <input type="number" oninput="if(value.length&gt;5)value=value.slice(0,5)" min="0" v-model="amountNumber" maxlength="5" />元
							        </div> 
							        <div class="moneyRecharge_pay"> 
							            <span class="moneyRecharge_choose">支付方式:</span>
							            <input type="radio" checked="checked" />
							            <div class="moneyRecharge_img"></div>
							        </div>
						            <span class="registration_div_span registration_div_spanTow">*注意：提现完成后不予撤回，实际充值金额为&nbsp;<b>{{amountNumber}}</b>&nbsp;元。</span> 
							        <div class="moneyRecharge_div moneyRecharge_div_div" @click="rechargeFn">
							                    确认
							        </div> 
							        <div class="moneyRecharge_div moneyRecharge_div_div" @click="SubmitmoneyRechargeFn">
							                    取消
							        </div> 
						        </div> 
						        <div v-show="registration == 1" class="registration">
							        <div class="moneyRecharge_header">
							                      提现信息登记
							        </div> 
							        <div class="moneyRecharge_name humanName">
							                       真实姓名&nbsp;:
							            <input type="text" v-model="name" />
							        </div> 
							        <div class="moneyRecharge_name payNumber">
							                        支付宝账号&nbsp;:
							            <input type="text" v-model="aliAccount" />
							        </div> 
							        <div class="moneyRecharge_name payNameTow">
							                        确认支付宝账号&nbsp;:
							            <input type="text" v-model="againNumber" />
							        </div> 
							        <div class="moneyRecharge_name verification">
							                        请输入验证码&nbsp;:
							            <input type="text" v-model="inputCode" />
							            <span class="verification_span" @click="showCaptchaObj" v-if="verifyFlag">手机验证</span>
								        <div class="verification_spanTow" v-else="">
								          {{verifyNumber}}重新发送
								        </div>
							            <div id="popup-captcha"></div>
							        </div> 
							        <span class="registration_div_span">*注意：提现信息提交后将无法直接修改，请仔细检查个人信息，确认填写无误后再提交。</span> 
							        <div class="moneyRecharge_div" @click="isTrueOrFalseFn">
							                           确认
							        </div> 
							        <div class="moneyRecharge_div" @click="SubmitregistrationFn">
							                            取消
							        </div> 
						        </div> 
						        <div v-if="WithdrawalsFlag" class="registration registrationTow ">
							        <div class="moneyRecharge_header">
							                                   提现
							        </div> 
						            <span class="exchange_spanTow exchange_spanTowTow">可提现金额：&nbsp;{{exchangeableCashAmount}}</span> 
							        <div class="verification_div">
							                                      提取金额：&nbsp;
							            <span @click="downMoneyFn" class="verification_letf">-</span>
							            <input type="number" readonly="readonly" v-model="doubleamount" />
							            <span @click="upMoneyFn" class="verification_right">+</span>
							        </div>
							        <span class="exchange_spanTow exchange_spanTowTow amount_span">可提现好人卡数量：&nbsp;{{givenPayCardAmount}}</span> 
							        <div class="verification_div verification_divTow">
								               提取好人卡：&nbsp;
								        <span @click="downMoneyFnTow" class="verification_letf">-</span>
								        <input type="number" min="0" v-model="cardAmount" @keydown="keyupFn " />
								        <span @click="upMoneyFnTow" class="verification_right">+</span>
							        </div>
							        <div class="verification_totel">
								                          合计：&nbsp;
								        <b>{{cardAmount/150 + doubleamount}}</b>&nbsp;元
							        </div>
							        <div class="moneyRecharge_div" @click="WithdrawalsFn">
							                                          确认
							        </div> 
							        <div class="moneyRecharge_div" @click="WithdrawalsFnTow">
							                                            取消
							        </div> 
						        </div> 
						        <div v-if="isTrueOrFalse" class="isTrueShow">
							        <div class="isTrueOrFalse">
								        <div class="isTrueOrFalse_div">
								                         提示
								        </div>
								        <span class="isTrueOrFalse_span">请注意核对账号信息是否正确，一经确认，不予撤回。是否确认？</span> 
								        <div class="moneyRecharge_div isTrueOrFalseDiv" @click="registrationisFlase">
								                         确认
								        </div> 
								        <div class="moneyRecharge_div isTrueOrFalseDiv" @click="SubmitisTrueOrFalseFn">
								                        取消
								        </div> 
							        </div>
						        </div> 
						        <div v-if="isTru" class="isTrueShow">
							        <div class="isTrueOrFalse">
								        <div class="isTrueOrFalse_div">
								          提示
								        </div>
							            <span class="isTrueOrFalse_span">订单已提交</span> 
								        <div class="moneyRecharge_div isTrueOrFalseDiv detailFn" @click="detailFn">
								            <a target="_black" :href="openurl">网上支付</a>
								        </div> 
								        <div class="moneyRecharge_div isTrueOrFalseDiv detailFn" @click="SubmitdetailFn">
								                        取消订单
								        </div> 
							        </div>
						        </div> 
							    <div class="pay-d">
							                              ￥{{exchangeableCashAmount}}
							    </div>
					            <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" />
							    <div class="pay-head2">
							                                历史收入
							    </div>
							    <div class="pay-number">
							                                 ￥{{totalIncome}}
							    </div> 
							    <div class="pay-check">
							        <a @click = "tapMove(2)">查看账单</a>
							    </div> 
							    <ul class="explain">
							                      提现说明：
							        <li>1.提现申请成功后不可以撤回</li>
							        <li>2.提现金额最低为100元（单位人民币）</li>
							        <li>3.申请成功后，工作人员会在7个工作日内将相应的金额打入指定账户</li>
							        <li>4.提现好人卡比例为150：1。 </li>
							    </ul>
					        </div> 
					        <div class="bookBlockList" v-if = " tapNumber == 2 ?true:false">
					            <div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">支付账单</span>
							        <span class="titleTwo">pay treasure bills</span>
							    </div>
						        <div class="pay-head">
						                        钱包明细
							        <span title="绑定金额：充值后金额为绑定金额，绑定金额不可提现，可用于购买好人卡，以及购买画作。
							        	福利金额：由活动赠送以及插画补贴，可用于购买插画,于每月清零。
							        提现金额：由好人卡提现、作品稿费获得，可进行金额提现、购买好人卡、购买画册等操作。">
							              <img :src="path.ImagePath + '/img/question.png'" />
							        </span>
						        </div>
							    <ul class="pay-income">
							        <li>绑定余额:</li>
							        <li class="money" v-if="totalAmount >= 1">￥{{ totalAmount }}</li>
							        <li class="money" v-else="">￥0.00</li>
							        <li>福利金额:</li>
							        <li class="money" v-if="welfareCashAmount >= 0">￥{{ welfareCashAmount}}</li>
							        <li class="money" v-else="">￥0.00</li>
							        <li class="goodman">提现余额:</li>
							        <li class="money" v-if="exchangeableCashAmount >=1 ">￥{{ exchangeableCashAmount }}</li>
							        <li class="money" v-else="">￥0.00</li>
							    </ul>
							    <ul class="pay-a">
							        <li>日期</li>
							        <li>收入</li>
							        <li>支出</li>
							        <li>详情</li>
							        <li>状态</li>
							    </ul>
						        <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" />
							    <div class="table-a">
							        <table border="0" cellspacing="0" cellpadding="0">
								        <tbody>
									        <tr v-for="obj in list" title="福利金额：obj.welfareCashAmount	
									        	提现金额：obj.exchangeableCashAmount 
									        	不可提现金额：obj.unexchangeableCashAmount
									        	">
									            <td>{{ szxj.getLocalTimeTwo(obj.createTime) }}</td>
									            <td v-if=" userName == obj.paiedUserName ">+{{ obj.exchangeableCashAmount + obj.unexchangeableCashAmount + obj.welfareCashAmount }}</td>
									            <td v-else>--</td>
									            <td v-if=" userName !== obj.paiedUserName ">-{{ obj.exchangeableCashAmount + obj.unexchangeableCashAmount + obj.welfareCashAmount }}</td>
									            <td v-else>--</td>
									            <td v-if="obj.typeDescription == 2100">申请提现</td>
									            <td v-if="obj.typeDescription == 2101">充值</td>
									            <td v-if="obj.typeDescription == 2102  ">购买好人卡</td>
									            <td v-if="obj.typeDescription == 2103  ">绘画作品订金 </td>
									            <td v-if="obj.typeDescription == 2104  ">上月福利金额清零</td>
									            <td v-if="obj.typeDescription == 2105">小说作品稿费</td>
									            <td v-if="obj.typeDescription == 2107">支付稿费</td>
									            <td v-if="obj.typeDescription == 2107">绘画作品稿费</td>
									            <td v-if="obj.typeDescription == 2109">每月福利金额</td>
									            <td v-if=" obj.orderStatus == 0">申请进行中</td>
									            <td v-if="obj.orderStatus == 1 && obj.typeDescription == 2100 " :title="szxj.getLocalTimeTwo(obj.updateTime)">交易完成</td>
									            <td v-if="obj.orderStatus == 1 && obj.typeDescription !== 2100 " :title="szxj.getLocalTimeTwo(obj.updateTime)">交易完成</td>
									        </tr>
								        </tbody>
							        </table>
							    </div>
						        <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /> 
							    <div id="page" class="page">
							        <ul>
								        <li class="btn" @click="setPage((pageNo - 1) >= 1 ? (pageNo - 1) : 1)"><a>上一页</a></li> 
							            <li v-if="((index + 1)&lt;= 5 && pageNo< 3 || ((index + 1) > pageNo - 3 &&  index > pageNo)) || ( ((index + 1)<= pageNo + 2  &&　(index + 1) > pageNo) || (pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" :class="objTemp == pageNo? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
							            <li class="btn" @click="setPage((pageNo + 1)<= obj.pageCount ? (pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
							            <li class="goto"><input type="text" v-model="pageNo" style="text-align: center;" /><span>{{ pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li>
							        </ul>
							    </div>
					        </div>
					        <div class="bookBlockList" v-if = " tapNumber == 3 ?true:false">
					            <div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">我的好人卡</span>
							        <span class="titleTwo">goodmen card</span>
							    </div>
						        <div class="pay-head">
						                          好人卡明细 
							        <span title="绑定好人卡：由余额购买所得好人卡为绑定好人卡，仅用于打赏站内作品。
							获得好人卡：通过站内其他用户打赏获得，可进行余额兑换，不能再次打赏。">
							                    <img :src="path.ImagePath + '/img/question.png'" />
							        </span>
						        </div>
							    <ul class="pay-incomeTow">
							        <li>绑定好人卡:</li>
							        <li class="moneyTow" v-if="payCardAmount >= 1">{{ payCardAmount }}</li>
							        <li class="moneyTow" v-else>0</li>
							        <li class="goodmanTow">获得好人卡:</li>
							        <li class="money" v-if="givenPayCardAmount >= 1">{{ givenPayCardAmount }}</li>
							        <li class="money" v-else>0</li>
							    </ul>
							    <ul class="pay-a">
							        <li>日期</li>
							        <li>收入</li>
							        <li>支出</li>
							        <li>详情</li>
							    </ul>
						        <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" />
							    <div class="table-a">
							        <table border="0" cellspacing="0" cellpadding="0">
								        <tbody>
									        <tr v-for="obj in list1">
									            <td>{{ szxj.getLocalTimeTwo(obj.createTime) }}</td>
									            <td v-if=" userName == obj.paiedUserName ">+{{ obj.payCardAmount + obj.welfareCardAmount }}</td>
									            <td v-else="">--</td>
									            <td v-if=" userName !== obj.paiedUserName ">-{{ obj.payCardAmount + obj.welfareCardAmount }}</td>
									            <td v-else="">--</td>
									            <td v-if="obj.typeDescription == 2200">每日签到</td>
									            <td v-if="obj.typeDescription == 2201">打赏好人卡</td>
									            <td v-if="obj.typeDescription == 2202">购买好人卡</td>
									            <td v-if="obj.typeDescription == 2203 &amp;&amp; obj.orderStatus == 0">申请好人卡提现中</td>
									            <td v-if="obj.typeDescription == 2203 &amp;&amp; obj.orderStatus == 1">好人卡提现完成</td>
									            <td v-if="obj.typeDescription == 2205">修改昵称</td>
									        </tr>
								        </tbody>
							        </table>
							    </div>
						        <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" /> 
							    <div id="page" class="page">
							        <ul>
							            <li class="btn" @click="setPage((pageNo1 - 1) >= 1 ? (pageNo1 - 1) : 1)"><a>上一页</a></li> 
							            <li v-if="((index + 1)&lt;= 5 && pageNo1< 3 || ((index + 1) > pageNo1 - 3 &&  index > pageNo1)) || ( ((index + 1)<= pageNo1 + 2  &&　(index + 1) > pageNo1) || (pageNo1 > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" :class="objTemp == pageNo1? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
							            <li class="btn" @click="setPage((pageNo1 + 1)<= obj.pageCount ? (pageNo1 + 1) : obj.pageCount)"><a>下一页</a></li>
							            <li class="goto"><input type="text" v-model="pageNo1" style="text-align: center;" /><span>{{ pageNo1 }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo1)">转页</a></li>
							        </ul>
							    </div> 
					        </div>
					    </div>
				    </div>
				</div>
			</div>
		</div>
		<myfooter></myfooter>
    </div>
</template>

<script>
	import vue from 'vue'
	import alert from '~/components/Alert'
	import header from '~/components/Header'
	import footer from '~/components/Footer'
	import PathList from '~/components/conf'
	import navLeft from '~/components/navLeft'
	import store from '~/components/store'
	import axios from 'axios'
	import Vuex from 'vuex'
//	import dateTime from '~/components/Date'
	import SZXJ from '~/components/vueHttp'
	export default {
        store,
		components:{
			'alert':alert,
			'myheader':header,
			'myfooter':footer,
			'navLeft':navLeft
		},
		data: function(){
			return {
				active:'wallet',
				pageNo:1,
				pageNo1:1,
                path: PathList,
		    	bookList: [], //收藏书籍
		    	szxj: SZXJ,
		    	bodyFlag: false,
		    	infoBoolean:true,
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
	        	tapNumber:1,  //tap切换参数
	        	//账单参数
	        	exchangeableCashAmount:'',
		        totalAmount:'',
		        givenPayCardAmount:'',
		        payCardAmount:'',
		        pageSize:10,
		        list:[], //账单记录
		        list1:[],//好人卡记录
		        RequestObj:{
		            pageNum: 1,
		            pageSize: 10,
		        },
		        page: [1],
		        obj: {
		            p: 1, // 页码
		            n: 10,
		            pageCount: 1,
		        },
		        welfareCashAmount:0,
		        flag: true
			}
		},
		asyncData: function(){
		},
		mounted: function(){
			this.getBookListFn();
      	    this.amountYueFn();
	    },
		methods: {
		//主页面方法
			tapMove: function(v){      //tap切换
				this.tapNumber = v;
				switch(v){
					case 1:
					    this.getBookListFn();
      	                this.amountYueFn();
					    break;
					case 2:
					    this.getPaylistFn();
					    break;
					case 3:
					    this.getCardlistFn();
					    break;
				}
			},
			
			keyupFn:function (a){
			    if(a.keyCode == 189 ){
			        a.returnValue = false;
			    }else{
				    if(a.keyCode == 109){
				        a.returnValue = false;
				    }
			    }
			},
			upMoneyFn:function(number){
			    this.doubleamount = parseInt(this.doubleamount, 10) + 100 ;
		        if(this.doubleamount > this.exchangeableCashAmount){
	                this.doubleamount = this.exchangeableCashAmount;
	            }
			},
			downMoneyFn:function(number){
	            this.doubleamount= parseInt(this.doubleamount, 10) - 100 ;
	            if(this.doubleamount <0){
	                this.doubleamount = 0;
	            }
	        },
	        upMoneyFnTow:function(){
	            this.cardAmount = parseInt(this.cardAmount, 10) + 150 ;    
	            if(this.cardAmount > this.givenPayCardAmount){
	                this.cardAmount = this.givenPayCardAmount;
	            } 
	        },
	        downMoneyFnTow:function(){
		        this.cardAmount= parseInt(this.cardAmount, 10) - 150 ;
		        if(this.cardAmount <0){
		            this.cardAmount = 0;
		        }
	        },
	        upMoneyFnThr:function(){
	            this.amount = parseInt(this.amount, 10) + parseInt(this.keynumber,10) ;       
	        },
	        downMoneyFnThr:function(){
	            this.amount= parseInt(this.amount, 10) - parseInt(this.keynumber,10) ;
	            if(this.amount <0){
	                this.amount = 0;
	            }
	        },
		    WithdrawalsFn:function(){
		        if(this.cardAmount %150 !==0 ){
		            this.$refs.alert.setMessage(true,'好人卡数量必须是150的倍数',function(){})
		            return;
		        }else{
		            this.WithdrawalsFlag = false;
		            var _data= {};
		            _data.cashAmount = this.doubleamount;
		            _data.cardAmount = this.cardAmount;
			        SZXJ.http(this,'get', PathList.withdrawals, _data, (response) => {                           // 提现
			            if(response.data.code == 200){
			                this.$refs.alert.setMessage(false,'申请成功',function(){})
			                this.amountYueFn();
			                return;
			            }            
			        },(err)=>{
			        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
			        });
		        }
		    },
		    WithdrawalsFnTow:function(){
		         this.WithdrawalsFlag = false;
		    },
		    verificationTimeFn: function() {
		        if (this.verifyNumber === 0) {
		            this.verifyNumber = 60;
		            this.verifyFlag = true;
		            return;
		        } else {
		            this.verifyNumber =this.verifyNumber -1;
		            var This = this;
		            setTimeout(function(){
		                This.verificationTimeFn();
                    }, 1000);
	            }
	        },
	        getGeetestFn : function () { // 获取就极验验证码
		        SZXJ.http(this,'get', PathList.StartCaptchaServlet, {}, (data) => {
		        	var res = JSON.parse(data.data);
		            // 使用initGeetest接口
		            // 参数1：配置参数
		            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
		            window.initGeetest({
		              gt: res.gt,
		              challenge: res.challenge,
		              product: "popup",
		              // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
		              offline: !res.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
		            },
		            this.handlerPopup);
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
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
		        this.registration = 0;         
		        this.isTrueOrFalse = false;
	            var _data={};
	            _data.realName = this.name;
	            _data.alipayAccount = this.aliAccount;
	            _data.uuid  = this.uuid ; 
	            _data.inputCode  = this.inputCode ; 
	            SZXJ.http(this,'get', PathList.saveAlipay, _data, (response) => {          // 保存提现信息登记
	                if(response.data.code == 200){
	                    this.WithdrawalsFlag = true;
	                }
	            },(err)=>{
	            	this.$refs.alert.setMessage(true,err.data.msg,function(){});
	            });
	        },
		    SubmitgoodFn:function(){
		        this.amount = parseInt(this.amount, 10) + 100;
		        this.keynumber = 100 ;
		    },
		    SubmitgoodFnTow:function(){
	            this.amount = parseInt(this.amount, 10) + 500;
	            this.keynumber = 500 ;
	        },
	        SubmitgoodFnThr:function(){
	            this.amount = parseInt(this.amount, 10) + 1000;
	            this.keynumber= 1000 ;
	        },
	        SubmitgoodFnFou:function(){
	            this.amount = parseInt(this.amount, 10) + 3000;
	            this.keynumber = 3000 ;
	        },
	        SubmitgoodFnFix:function(){
	            this.amount = parseInt(this.amount, 10) + 5000;
	            this.keynumber = 5000 ;
	        },
	        SubmitgoodFnSix:function(){
	            this.amount = parseInt(this.amount, 10) + 10000;
	            this.keynumber = 10000 ;
	        },
			isTrueOrFalseFn:function(){
	            if(this.againNumber !== this.aliAccount ){
	                this.$refs.alert.setMessage(true,'两次支付宝账号不正确',function(){})
	                return;
	            } else if(this.inputCode == ''){
	                this.$refs.alert.setMessage(true,'验证码不能为空',function(){})
	                return;
	            }else{
	                this.isTrueOrFalse = true;
	            };    
			},
			exchangeFn:function(){
			    this.goodmenFlag = true;
			},
		    SubmitisTrueOrFalseFn:function(){
	            this.isTrueOrFalse = false;
	        },
		    registrationFn:function(){
			    this.registration = 1;
			    this.getGeetestFn();
			},
			SubmitregistrationFn:function(){
	            this.registration = 2;
	        },
			moneyRechargeFn:function(){
			    this.moneyRecharge = true;
			},
			SubmitmoneyRechargeFn:function(){
			    this.moneyRecharge = false;
			},
			SubmitgoodmenFn:function(){
			    if(this.amount % 100 !== 0 ){
//			        var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
//	                Utils.setMessage(true, '购买数量必须是100的倍数');
                    this.$refs.alert.setMessage(true,'购买数量必须是100的倍数',function(){})
	                return;
	     	    }else if(this.amount <=0){
//			        var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
//	                Utils.setMessage(true, '购买数量不能为0或负数');
	                this.$refs.alert.setMessage(true,'购买数量不能为0或负数',function(){})
	                return;
			    }else{
			        this.goodmenFlag = false;
	                var _data={};
	                _data.amount = this.amount/100;
		            SZXJ.http(this,'get', PathList.buyCard, _data, (response) => {              //// 购买好人卡
		                if(response.data.code == 200 ){
//		                    var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
//		                    Utils.setMessage(false, '购买成功');
                            this.$refs.alert.setMessage(false,'购买成功',function(){})
		                    this.amountYueFn();
		                    return;
		                }
		            },(err)=>{
//		            	err.body
		            });
			    }          
	        },
		    SubmitgoodmenFnTow:function(){
		        this.goodmenFlag=false;
		    },
		    detailFn:function(){
		        this.isTru= false;
		    },
		    SubmitdetailFn:function(){
		        this.isTru= false;
		    },
	        getBookListFn: function() {
		        var _data = {};
//		        SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {    //查看用户创建作品列表 不需要传数据
//		            this.bookList = response.data;
//		        });
		        SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {     //查看是否登入
		            this.userName = response.data.status.userName;
		            this.telphone = response.data.status.telphone;
		        }); 
	            SZXJ.http(this,'get', PathList.cardamount, {}, (response) => {     // 获取好人卡
		            this.payCardAmount = response.data.amount.payCardAmount;
		            this.givenPayCardAmount =response.data.amount.givenPayCardAmount;
		        });  
		        SZXJ.http(this,'get', PathList.totalIncome, {}, (response) => {     // 历史收入
		            this.totalIncome = response.data.data;
		        });  
	        },
	        amountYueFn:function(){
		        SZXJ.http(this,'get', PathList.amount, {}, (response) => {          //  钱包余额
		            this.exchangeableCashAmount = response.data.amount.exchangeableCashAmount;
		            this.totalCashAmount = response.data.amount.exchangeableCashAmount +  response.data.amount.unexchangeableCashAmount + response.data.amount.welfareCashAmount;
		            this.welfareCashAmount = response.data.amount.welfareCashAmount;
		            if(!this.bodyFlag){
		            	this.bodyFlag = true;
		            }
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        rechargeFn:function(){
		        if(this.amountNumber == '' || this.amountNumber <= 0){
//		            var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
//		            Utils.setMessage(true, '充值金额不能为空或小于0');
                    this.$refs.alert.setMessage(true,'充值金额不能为空或小于0',function(){})
		            return;
		        } else{
		            this.moneyRecharge = false;
		        }
		        this.isTru = true;
	            var _data={};
	            _data.amount = this.amountNumber;
		        SZXJ.http(this,'get', PathList.recharge, _data, (response) => {      // 充值钱包
		            this.logId =response.data.logId;
		            this.openurl = response.data.pay_url;
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        getPaylistFn:function(){
	            var _data=this.RequestObj;
		        SZXJ.http(this,'get', PathList.paylist,this.RequestObj, (response) => {     //获取历史账单
		            this.list = response.data.data.list;
		            this.RequestObj.pageNum = response.data.data.pageNum;
		            this.setPageCount(response.data.data.pages);
		        });  
	        },
	        getCardlistFn:function(){
		        var _data=this.RequestObj;
		        SZXJ.http(this,'get', PathList.cardlist, this.RequestObj, (response) => {      //获取好人卡
		            this.list1 = response.data.data.list;
		            this.RequestObj.pageNum = response.data.data.pageNum;
		            this.setPageCount(response.data.data.pages);
		        });  
		    },
	      //切页方法
	        setPageCount: function(v) {
	            var obj = this.obj;
	            obj.pageCount =  v;
	            this.page = [];
	            for (var i = 0; i < obj.pageCount; i++) {
	                this.page.push(i+1);
	            } 
	            this.obj.pageCount = v;
	        },
	        setPage: function(v) {
	            if (!v || v > this.obj.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 ) {
	                return;
	            }
	            this.RequestObj.pageNum = v;
	           
	            if(this.tapNumber == 2){ 
	            	this.pageNo = v;
	            	this.getPaylistFn()
	            }else{
	            	this.pageNo1 = v;
	            	this.getCardlistFn(); // 请求
	            }
	            
	        }, 
		},
		head: function(){
			return{
				title: '我的钱包-QC轻小说',
		    	meta: [
				    { charset: 'UTF-8' },
				    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
				  	{ name: 'format-detection', content: 'telephone=no' },
				  	{ name: 'apple-touch-fullscreen', content: 'yes' },
				  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
				  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
				  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
				  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
				],
				link: [
			    	{ rel: 'stylesheet', href: '/css/main.css' },
			    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
			    	{ rel: 'stylesheet', href: '/css/user_info.css' },
			    	{ rel: 'stylesheet', href: '/css/Date.css' },
			    	{ rel: 'stylesheet', href: '/css/font-awesome.min.css' }
		  		]
			}
		}
	}
</script>

<style scoped>

</style>
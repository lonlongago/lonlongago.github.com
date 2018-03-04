<template>
	<div id="goodPeople">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="goodPeople">
			<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
			<div class="commonHead">
	            <a href="javascript:;" @click="back" class="back">
                    <img src="http://cdn.qcacg.com/img/app_index/classification_03.png" />
	            </a>
                <p class="head">好人榜</p>
                <div class="commentHeadRight">
                    <a href="/app/search">
                        <img class="searchBtn" src="http://cdn.qcacg.com/img/app_index/classification_05.png"/>
                    </a>
                    <a href="javascript:;" @click="showMenu">
                        <img class="menuBtn" src="http://cdn.qcacg.com/img/app_index/classification_07.png"/>
                    </a>
                </div>
                <div class="commonHeadMenu" style="display: none;" v-show="menuList">
                    <a href="/app/index" class="home">
                        <img src="http://cdn.qcacg.com/img/app_book/home.png"/>
                        <p>首页</p>
                    </a>
                    <a href="/app/classFirst" class="list">
                        <img src="http://cdn.qcacg.com/img/app_book/list.png"/>
                        <p>分类</p>
                    </a>
                    <a href="/app/rank" class="sort">
                        <img src="http://cdn.qcacg.com/img/app_book/cup.png"/>
                        <p>排行榜</p>
                    </a>
                    <a href="/app/personal" class="personal">
                        <img src="http://cdn.qcacg.com/img/app_book/personal.png"/>
                        <p>个人中心</p>
                    </a>
                </div>
	        </div>
	        <div class="goodHead">
	            <div class="options">
	                <a href="javascript:;">
	                    <div class="week" :class="selected == 'week' ? 'selected' : ''" @click="week">周</div>
	                </a>
	                <a href="javascript:;">
	                   <div class="month" :class="selected == 'month' ? 'selected' : ''" @click="month">月</div>
	                </a>
	                <a href="javascript:;">
	                   <div class="total" :class="selected == 'total' ? 'selected' : ''" @click="total">总</div>
	                </a>
	            </div>
	            <div class="topThree">
	                <div class="first" v-if="lists[0]">
	                    <a href="javascript:;">
    	                    <img class="userHead" :src="lists[0].userHead ? path.imagePath + lists[0].userHead : 'http://cdn.qcacg.com/img/app_book/userHead.png'"/>
    	                    <img class="crown" src="http://cdn.qcacg.com/img/app_book/first.png"/>
    	                    <p v-cloak>{{lists[0].userName}}</p>
	                    </a>
	                </div>
	                <div class="second" v-if="lists[1]">
	                    <a href="javascript:;">
    	                    <img class="userHead" :src="lists[1].userHead ? path.imagePath + lists[1].userHead : 'http://cdn.qcacg.com/img/app_book/userHead.png'"/>
    	                    <img class="crown" src="http://cdn.qcacg.com/img/app_book/second.png"/>
    	                    <p v-cloak>{{lists[1].userName}}</p>
	                    </a>
	                </div>
	                <div class="third" v-if="lists[2]">
	                    <a href="javascript:;">
    	                    <img class="userHead" :src="lists[2].userHead ? path.imagePath + lists[2].userHead : 'http://cdn.qcacg.com/img/app_book/userHead.png'"/>
    	                    <img class="crown" src="http://cdn.qcacg.com/img/app_book/third.png"/>
    	                    <p v-cloak>{{lists[2].userName}}</p>
	                    </a>
	                </div>
	            </div>
	        </div>
	        <div class="block"></div>
	        <ul class="goodList">
	        	<li v-for="(list, index) in lists" v-cloak>
	        	    <a href="javascript:;">
    	        	    <div class="sort" :class="top(index)">
    	        	        <p>{{index + 1}}</p>
    	        	    </div>
    	        	    <div class="goodPeopleInfo">
    	        	        <img class="userHead" :src="list.userHead ? path.imagePath + list.userHead : 'http://cdn.qcacg.com/img/app_book/userHead.png'"/>
    	        	        <p class="userName">{{list.userName}}</p>
    	        	        <p class="cardNums">{{list.cardAmount}}</p>
    	        	    </div>
	        	    </a>
	        	</li>
	        </ul>
	        <div class="sortBottom" style="display: none;" v-show="loginFlag">
        	    <img class="userHead" :src="userHead ? path.imagePath + userHead : 'http://cdn.qcacg.com/img/app_book/userHead.png'"/>
        	    <div class="userInfo">
        	        <div class="userName">我</div>
        	        <div class="userCards" v-if="myCard" v-cloak>{{myCard}}</div>
        	        <div class="userCards" v-else>0</div>
        	        
        	    </div>
        	    <div class="userSort" v-if="myRank" v-cloak>第{{myRank}}名</div>
        	    <div class="userSort" v-else>未上榜</div>
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
//		'myheader':Header,
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
	        displayFlag: false,
	        goodData: {
	            bookId: "",
	            pageNo: 1,
	            pageSize: 10,
	            status: 0
	        },
	        data: {
	            bookId: ""
	        },
	        path: appPathList,
	        weekList: [],
	        monthList: [],
	        totalList: [],
	        lists: "",
	        selected: "",
	        userHead: "",
	        menuList: false,
	        book: true,
	        loginFlag: false,
	        myWeekRank: "",
	        myMonthRank: "",
	        myTotalRank: "",
	        myWeekCard: "",
	        myMonthCard: "",
	        myTotalCard: "",
	        myRank: "",
	        myCard: "",
	        toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
		k_touch("goodPeople", "y");
	  	this.goodData.bookId = SZXJ.getQueryString('bookId');
        this.data.bookId = SZXJ.getQueryString('bookId');
        this.getList();
        this.total();
        this.displayFlag = true;
	  })
	},
	methods: {
	        getList: function() {
	            SZXJ.http(this, 'get', appPathList.queryBookRank, this.goodData, (res)=>{
	                this.weekList = res.data.weekWorBookReward != null ? res.data.weekWorBookReward : [];
	                this.monthList = res.data.monthWorBookReward != null ? res.data.monthWorBookReward : [];
	                this.totalList = res.data.totalWorBookReward != null ? res.data.totalWorBookReward : [];
	                if(!this.lists.length){
	                    this.lists = this.totalList;
	                };
	            });
	            this.$nextTick(function(){
	                   this.displayFlag = true;
	                   var  This = this;
	                   setTimeout(function(){
	                      document.body.removeChild(document.getElementById("loading"));
	                   },300)
	                });
	        },
	        week: function() {
	            this.lists = this.weekList;
	            this.selected = "week";
	            this.myRank = this.myWeekRank;
	            this.myCard = this.myWeekCard;
	        },
	        month: function() {
	            this.lists = this.monthList;
	            this.selected = "month";
	            this.myRank = this.myMonthRank;
	            this.myCard = this.myMonthCard;
	        },
	        total: function() {
	            this.lists = this.totalList;
	            this.selected = "total";
	            this.myRank = this.myTotalRank;
	            this.myCard = this.myTotalCard;
	        },
	        top: function(index) {
	            if(index == 0){
	                return "numOne";
	            };
	            if(index == 1){
	                return "numTwo";
	            };
	            if(index == 2){
	                return "numThree";
	            };
	        },
	        back: function() {
	            window.history.back();
	        },
	        showMenu: function() {
	            this.menuList = !this.menuList;
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        },
	        getMyRank: function() {
	            SZXJ.http(this, 'get', appPathList.getStatus, {}, (res)=>{
	                this.loginFlag = res.data.loginFlag;
	                this.userHead = res.data.loginFlag ? res.data.status.userImage : '';
	                if(this.loginFlag){
	                    this.getMyRank();
	                }
	            });
	            SZXJ.http(this, 'get', appPathList.moreRank, this.data, (res)=>{
	                this.myWeekRank = res.data.myWeekRank ? res.data.myWeekRank : '';
	                this.myMonthRank = res.data.myMonthRank ? res.data.myMonthRank : '';
	                this.myTotalRank = res.data.myTotalRank ? res.data.myTotalRank : '';
	                this.myWeekCard = res.data.myCardAmount.weekWorBookReward ? res.data.myCardAmount.weekWorBookReward : '';
	                this.myMonthCard = res.data.myCardAmount.monthWorBookReward ? res.data.myCardAmount.monthWorBookReward : '';
	                this.myTotalCard = res.data.myCardAmount.totalWorBookReward ? res.data.myCardAmount.totalWorBookReward : '';
	                this.myRank = this.myWeekRank;
	                this.myCard = this.myWeekCard;
	            });
	        }
        },
  	head: function(){
  		return {
  			title: '好人榜-QC轻小说',
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
  		    	{ rel: 'stylesheet', href: '/css/main.css' }
  	  		]
  	  }
  	}
}
</script>

<style>

		/*@font-face{font-family:sansSerif;src:url('../font/app-font/Microsoft Sans Serif.eot');src:url('../font/app-font/Microsoft Sans Serif.eot?#iefix') format('embedded-opentype'),url('../font/app-font/Microsoft Sans Serif.woff') format('woff'),url('../font/app-font/Microsoft Sans Serif.woff2') format('woff'),url('../font/app-font/Microsoft Sans Serif.ttf') format('truetype'),url('../font/app-font/Microsoft Sans Serif.svg#YourWebFontName') format('svg')}*/
		*{font-family:sansSerif;line-height: 1.1;}
		body{padding-bottom:.8rem;}
		[v-cloak]{display:none}
		.goodPeople .commonHead{font-size:.32rem;width:100%;color:#A4A4A4;background-color:#FFF;position:relative;z-index:10;height: .80rem;}
		.goodPeople .commonHead .back{}
		.goodPeople .commonHead .back img{position: absolute;left: 7%;height: .8rem;padding: .25rem 0;box-sizing: border-box;}
		.goodPeople .commonHead .head{display: inline-block;color: #7E7E7E;max-width: 4.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: absolute;left: 14.4%;padding: .32rem 0;font-size: .32rem;line-height: .16rem;}
		.goodPeople .commonHead .commentHeadRight {}
		.goodPeople .commonHead .commentHeadRight a{}
		.goodPeople .commonHead .commentHeadRight .searchBtn{position: absolute;right: 14.4%;top: 0;height: .8rem;padding: .25rem 0;box-sizing: border-box;}
		.goodPeople .commonHead .commentHeadRight .menuBtn{position: absolute;right: 7%;top: 0;height: .8rem;padding: .25rem 0;box-sizing: border-box;}
		.goodPeople .commonHead .goodTitle{font-size:.36rem;color:#625e5e;position:absolute;top:.17rem;left:3.55rem}
		.goodPeople .commonHead .commonHeadMenu{text-align:center;padding-top:.3rem;padding-bottom:.37rem;width:100%;background-color:#FFF;position:absolute;top:.7rem;z-index:10}
		.goodPeople .commonHead .commonHeadMenu a{display:inline-block;margin:0 6%}
		.goodPeople .commonHead .commonHeadMenu a img{display:block;width:.26rem;height:.26rem;margin:0 auto}
		.goodPeople .commonHead .commonHeadMenu a p{margin-top:.08rem;font-size:.22rem;color:#232323}
		.goodPeople .goodHead{margin-top:.2rem}
		.goodPeople .goodHead .options{text-align:center;border-bottom:.02rem solid #EFEFEF}
		.goodPeople .goodHead .options a{display:inline-block;margin:0 .44rem}
		.goodPeople .goodHead .options .month,.goodPeople .goodHead .options .total,.goodPeople .goodHead .options .week{display:inline-block;width:1.01rem;padding-bottom:.05rem;text-align:center;font-size:.32rem;color:#625e5e;position:relative;top:.02rem}
		.goodPeople .goodHead .options .selected{color:#69c5f0;border-bottom:.02rem solid #69C5F0}
		.goodPeople .goodHead .topThree{margin-top:.12rem;padding-bottom:.08rem;border-bottom:.01rem solid #DBDBDB}
		.goodPeople .goodHead .topThree>div{display:inline-block;text-align:center}
		.goodPeople .goodHead .topThree div a{display:inline-block;width:.8rem;position:relative}
		.goodPeople .goodHead .topThree .first{margin-left:1.4rem}
		.goodPeople .goodHead .topThree .second{margin-left:1.15rem}
		.goodPeople .goodHead .topThree .third{margin-left:1.12rem}
		.goodPeople .goodHead .topThree div .userHead{width:.52rem;height:.52rem;border-radius:.26rem;margin-bottom:.07rem}
		.goodPeople .goodHead .topThree div .crown{width:.17rem;position:absolute;top:-.05rem;right:.08rem}
		.goodPeople .goodHead .topThree div p{font-size:.24rem;color:#625e5e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
		.goodPeople .block{height:.2rem;background-color:#EFEFEF}
		.goodPeople .goodList{margin-bottom:1.6rem}
		.goodPeople .goodList li{font-size:.24rem;position:relative}
		.goodPeople .goodList li a{display:block}
		.goodPeople .goodList li .sort{display:inline-block;width:.7rem;height:.77rem;float:left;text-align:center;font-size:.30rem;color:#C8C8C8;vertical-align:top}
		.goodPeople .goodList li .sort p{margin-top:.35rem}
		.goodPeople .goodList li .numOne p,.goodPeople .goodList li .numThree p,.goodPeople .goodList li .numTwo p{margin-top:.36rem}
		.goodPeople .goodList li .numOne{background:url(http://cdn.qcacg.com/img/app_book/one.png) center center no-repeat}
		.goodPeople .goodList li .numTwo{background:url(http://cdn.qcacg.com/img/app_book/two.png) center center no-repeat}
		.goodPeople .goodList li .numThree{background:url(http://cdn.qcacg.com/img/app_book/three.png) center center no-repeat}
		.goodPeople .goodList li .numOne,.goodPeople .goodList li .numThree,.goodPeople .goodList li .numTwo{font-size:.24rem;color:#FFF;background-size:.26rem .38rem;background-position-y:.31rem}
		.goodPeople .goodList li .goodPeopleInfo{font-size:.30rem;padding-top:.18rem;padding-bottom:.1rem;height:100%;margin-left:.7rem;border-bottom:.01rem solid #EFEFEF}
		.goodPeople .goodList li .goodPeopleInfo .userHead{width:.5rem;height:.5rem;border-radius:.25rem}
		.goodPeople .goodList li .goodPeopleInfo .userName{display:inline-block;vertical-align:top;color:#625e5e;margin-left:.24rem;margin-top:.1rem}
		.goodPeople .goodList li .goodPeopleInfo .cardNums{float:right;vertical-align:middle;color:#202020;margin-top:.1rem;margin-right:.28rem}
		.goodPeople .sortBottom{padding-top:.18rem;padding-bottom:.2rem;background-color:#333232;position:fixed;width:100%;bottom:.612rem}
		.goodPeople .sortBottom .userHead{width:.5rem;height:.5rem;border-radius:.25rem;margin-left:1.32rem}
		.goodPeople .sortBottom .userInfo{display:inline-block;margin-left:.21rem;font-size:.26rem;color:#FFF;vertical-align:top;margin-top:.07rem}
		.goodPeople .sortBottom .userInfo .userName{margin-bottom:.12rem}
		.goodPeople .sortBottom .userSort{display:inline-block;float:right;font-size:.30rem;color:#FFF;margin-right:1.06rem;vertical-align:middle;margin-top:.18rem}
    	.goodPeople .blackWrap{background-color:#000;opacity:.4;width:100%;height:100%;position:fixed;left:0;top:0;z-index:10}
</style>
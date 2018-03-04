<template>
	<div id="allpai">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div v-show="displayFlag" style="display: none;" id="rank" class="rank">
			<div id="pull"></div>
			<div class="content">
				<div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
				<myheader msgfromfa="排行榜"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
			    <div class="option">
			      <div v-if="backgroundId" @click="backgroundIdFn" class="background"></div>
			      <ul class="threeRank">
			        <li class="ranklist good" @click="rankNumFn(0)" :class="RequestObj.rankList == 0? 'active':''" >好人榜</li>
			        <li class="ranklist number" @click="rankNumFn(1)" :class="RequestObj.rankList == 1? 'active':''" >字数榜</li>
			        <li class="ranklist" @click="rankNumFn(2)" :class="RequestObj.rankList == 2? 'active':''" >点击榜</li>
			      </ul>
			      <ul class="choose">
			        <li @click="typelistFn()" class="class">
			          <span>分类&nbsp;:&nbsp;</span>
			          <span v-if="bookType == ''">全部&nbsp;&nbsp;</span>
			          <span v-else>{{bookType}}&nbsp;&nbsp;</span>
			          <img src="http://cdn.qcacg.com/img/app_index/rank_01_01.png" alt="" /></li>
			        <li @click="timelistFn()" class="time">
			          <span>时间&nbsp;:&nbsp;</span>
			          <span v-if="RequestObj.timeRank == 2" >不限&nbsp;&nbsp;</span>
			          <span v-if="RequestObj.timeRank == 0" >一周内&nbsp;&nbsp;</span>
			          <span v-if="RequestObj.timeRank == 1" >一月内&nbsp;&nbsp;</span>
			          <img src="http://cdn.qcacg.com/img/app_index/rank_01.png" alt="" /></li>
			        <li v-if="timeFlag" class="timelist">
			          <div @click="timeRankFn(2)">不限</div>
			          <div @click="timeRankFn(0)">一周内</div>
			          <div @click="timeRankFn(1)">一月内</div>
			        </li>
			        <li v-if="typeFlag" class="typelist">
			          <div @click="typeRankFn('','')">全部</div>
			          <div v-for="obj in typeName" @click="typeRankFn(obj.bookTypeId,obj.bookTypeName)">{{obj.bookTypeName}}</div>
			        </li>
			      </ul>
			    </div>
			    <div class="section" v-for="(obj,index) in result">
			    	<a :href="path.TemprootPath + '/app/book/' + obj.bookId">
			    	<div class="contentSec">
			    		<img class="cover" :src="path.imagePath +obj.bookCoverImage" alt="" />
			    		<div class="ranknumber" v-if="index < 3">
				            <img v-if="index == 0" class="theRank" src="http://cdn.qcacg.com/img/app_index/rank_11.png" alt="" />
				            <img v-if="index == 1" class="theRank" src="http://cdn.qcacg.com/img/app_index/rank_13.png" alt="" />
				            <img v-if="index == 2" class="theRank" src="http://cdn.qcacg.com/img/app_index/rank_15.png" alt="" />
				            <span v-if="index == 0" >1</span>
				            <span v-if="index == 1" >2</span>
				            <span v-if="index == 2" >3</span>
				        </div>
				        <ul class="attribute">
				        	<li class="bookname">{{obj.bookName}}</li>
				            <li class="list">
				              <ul class="alllist">
				                <li v-for="sos in obj.bookTypeList">{{sos.bookTypeName}}</li>
				              </ul>
				            </li>
				            <li class="info">
				              <div class="display">
				                <img src="http://cdn.qcacg.com/img/app_index/rank_03.png" alt="" /><span>{{obj.author}}</span>
				              </div>
				            </li>
          				</ul>
          				<div class="right">
				            <p class="number" v-if="RequestObj.rankList == 0 && RequestObj.timeRank == 0" >{{obj.everyWeekCopperCoins}}<p> 
				            <p class="number" v-if="RequestObj.rankList == 0 && RequestObj.timeRank == 1" >{{obj.everyMonthCopperCoins}}<p> 
				            <p class="number" v-if="RequestObj.rankList == 0 && RequestObj.timeRank == 2" >{{obj.bookCopperCoins}}<p> 
				            <p class="number" v-if="RequestObj.rankList == 1 && RequestObj.timeRank == 0">{{obj.everyWeekWordCount}}<p>
				            <p class="number" v-if="RequestObj.rankList == 1 && RequestObj.timeRank == 1">{{obj.everyMonthWordCount}}<p>
				            <p class="number" v-if="RequestObj.rankList == 1 && RequestObj.timeRank == 2">{{obj.bookWordCount}}<p>
				            <p class="number" v-if="RequestObj.rankList == 2 && RequestObj.timeRank == 0">{{obj.everyWeekHit}}<p>
				            <p class="number" v-if="RequestObj.rankList == 2 && RequestObj.timeRank == 1">{{obj.everyMonthHit}}<p>
				            <p class="number" v-if="RequestObj.rankList == 2 && RequestObj.timeRank == 2">{{obj.bookHit}}<p>
				            <p v-if="RequestObj.rankList == 0" >好人卡</p>
				            <p v-if="RequestObj.rankList == 1" >字数</p>
				            <p v-if="RequestObj.rankList == 2" >点击</p>
				        </div>
			    	</div>
			    	<div class="hr"></div>
      				</a>
			    </div>
			    <appBottom></appBottom>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Headerapp'
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
	asyncData:function(context){
		var obj={};
	    obj.id = context.params.id;
		    console.log(context);
		    console.log(obj.id);
		return obj;
	},
	data : function() {
		return {
			displayFlag:false,
		    path: appPathList,
		    typeName:[],
		    szxj:SZXJ,    
		    bookTypeId:'',
		    bookType:'',
		    timeFlag:false,
		    typeFlag:false,
		    menuList: false,
		    toWrap: false,
		    backgroundId:false,
		    RequestObj: {
		          rankList: 0, // 好人 字数 点击
		          timeRank: 2, // 周 月 总
		          date: 1, // 0 近期 1远期 砍掉
		          bookTypeId:'',
		          pageNo: 1,
		          pageSize: 12,
		        },
		    result:[],
		    resultSec:[],
		    numBer:'',
		    bookTypeList:[],
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
	    this.rankValueFn();
	    window.addEventListener('scroll', this.onscrollFn);
	    this.displayFlag = true;
    	k_touch("rank", "y");
	  })
	},
	methods: {
		showMenu: function() {
            this.menuList = !this.menuList;
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
	    timeRankFn:function(num){
	      this.RequestObj.timeRank = num;
	      this.timeFlag = false;
	      this.backgroundId = false;
	      SZXJ.http(this,'get', appPathList.getRankingList, this.RequestObj, (response)=>{
	            this.result = response.data.result;
	         });
	    },
	    typeRankFn:function(id,v){
	      this.RequestObj.bookTypeId = id;
	      this.bookType = v;
	      this.typeFlag = false;
	      this.backgroundId = false;
	      SZXJ.http(this,'get', appPathList.getRankingList, this.RequestObj, (response)=>{
	            this.result = response.data.result;
	         });
	    },
	    backgroundIdFn:function(){
	      this.timeFlag = false;
	      this.typeFlag = false;
	      this.backgroundId = false;
	    },
	    timelistFn:function(){
	      this.timeFlag = true;
	      this.backgroundId =true;
	    },
	    typelistFn:function(){
	      this.typeFlag = true;
	      this.backgroundId =true;
	    },
	    rankNumFn:function(num){
	      this.RequestObj.rankList = num;  
	      this.rankValueFn();
	    },
	    rankValueFn:function(){
	      SZXJ.http(this,'get', appPathList.getRankingList, this.RequestObj, (response)=>{
	            this.result = response.data.result;
	         });
	      this.$nextTick(function(){
	          this.displayFlag = true;
	          var  This = this;
	          setTimeout(function(){
	          document.body.removeChild(document.getElementById("loading"));
	         },300)
	      });
	    },
	    onscrollFn:function(){    
	        this.offsetHeight = document.documentElement.offsetHeight;   // 页面总高度
	        this.clientHeight = document.documentElement.clientHeight;   // 可视区高度
	        this.srcollTop  = document.documentElement.scrollTop || document.body.scrollTop;   //滚动条的高度 
	        this.srcollH  = document.body.scrollHeight;
	        if ( this.offsetHeight - this.clientHeight  ==  this.srcollTop ) {
								this.loopFn();
	        };
	    },
	    loopFn:function(){
	    	this.RequestObj.pageNo += 1;
	    	SZXJ.http(this,'get', appPathList.getRankingList, this.RequestObj, (response)=>{
							this.numBer = response.data.result.length;
	    		for( var i =0 ; i < this.numBer ; i++ ){
	    			this.result.push(response.data.result[i]);
	    		}  
	     });
	    },
	    getValueFn:function(){
	       var data = {};
	       SZXJ.http(this,'get', appPathList.queryBookType, data, (response)=>{
	                this.typeName = response.data;
	                this.bookTypeId = response.data.bookTypeId;
	        });  
	    },
	},
  	head: function(){
  		return {
  			title: '排行榜-QC轻小说',
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
<style scoped>

		#allpai{background-color:#f4f4f4}
		.rank{max-width: 7.5rem;margin: 0 auto;overflow-x: hidden;}
		.rank .content{max-width:7.5rem;overflow-x:hidden;margin:0 auto;position:relative;margin-top: 0.88rem;}
		.rank .content .option{padding:2% 1.5%;background-color:#fff;font-size:.4rem;margin-bottom:.05rem;position:relative;height:.2rem}
		.rank .content .option .background{height:100%;background-color:rgba(0,0,0,0);z-index:5;position:fixed;top:0;left:0;width:100%}
		.rank .content .option ul{display:inline-block}
		.rank .content .option .choose{width:50%;float:left}
		.rank .content .option .threeRank{width:48%;float:right}
		.rank .content .option ul li{float:left;margin-left:3%;vertical-align:middle;font-size:.24rem}
		.rank .content .option ul li img{width:.1rem;height:.06rem;vertical-align:middle}
		.rank .content .option ul li span{vertical-align:top}
		.rank .content .option .ranklist{width:.78rem;margin:0;padding-left:.1rem;padding-right:.1rem;text-align:center}
		.rank .content .option .active{color:#169BD5}
		.rank .content .option .good{margin-left:7%}
		.rank .content .option .number{border-left:1px rgba(0,0,0,.35) solid;border-right:1px rgba(0,0,0,.35) solid}
		.rank .content .option .timelist{position:absolute;background-color:#fff;box-shadow:.01rem 0 .1rem rgba(0,0,0,.065);text-align:center;font-size:.24rem;top:70%;left:30%;z-index:9;width:1rem}
		.rank .content .option .typelist{position:absolute;background-color:#fff;box-shadow:.01rem 0 .1rem rgba(0,0,0,.065);text-align:center;font-size:.24rem;top:70%;left:8%;z-index:9}
		.rank .content .option .timelist div{border-bottom:1px solid rgba(0,0,0,.065);padding:10% 10%}
		.rank .content .option .typelist div{border-bottom:1px solid rgba(0,0,0,.065);padding:10% 10%}
		.rank .content .section{background-color:#fff;position:relative}
		.rank .content .section .right{display:inline-block;text-align:center;position:absolute;top:55%;right:7%}
		.rank .content .section .right p{font-size:.24rem}
		.rank .content .section .right .number{font-size:.24rem}
		.rank .content .section .contentSec{overflow:hidden;padding-top:3%;padding-left:5%;position:relative}
		.rank .content .section .contentSec .ranknumber{display:inline-block}
		.rank .content .section .contentSec .ranknumber span{position:absolute;top:24.5%;left:5%;color:#fff;font-size:.2rem}
		.rank .content .section .contentSec .ranknumber p{font-size:.24rem}
		.rank .content .section .contentSec .cover{float:left;width:1.8rem;height:2.52rem;border-radius:.04rem}
		.rank .content .section .contentSec .theRank{position:absolute;top:22%;left:3.2%;width:.35rem;height:.46rem}
		.rank .content .section .contentSec .attribute{float:left;margin-left:3%;width:70%}
		.rank .content .section .contentSec .attribute .bookname{font-size:.28rem;line-height: .36rem;font-weight:600;width:75%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
		.rank .content .section .contentSec .attribute .list{margin-top:.15rem}
		.rank .content .section .contentSec .attribute .list .alllist{overflow:hidden}
		.rank .content .section .contentSec .attribute .list .alllist li{float:left;font-size:.2rem;padding:.05rem .10rem;border:1px solid #00A4FF;border-radius:4px;margin-right:2%;color:#00A1D6}
		.rank .content .section .contentSec .attribute .info{margin-top:25%;font-size:.24rem;vertical-align:middle}
		.rank .content .section .contentSec .attribute .info img{margin-right:5%;vertical-align:middle;width:.24rem;height:.24rem}
		.rank .content .section .contentSec .attribute .info .display{display:inline-block;width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle}
		.rank .content .section .contentSec .attribute .info .none{display:none}
		.rank .content .section .contentSec .attribute .info span{display:inline-block;vertical-align:middle;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}
		.rank .content .section .hr{background-color:#ECECEC;width:80%;height:1px;margin-left:20%;margin-top:2%}
		@media (min-width:320px) and (max-width:350px){.rank .content .option .choose{display:block;width:100%;text-align:center;float:none;padding:.15rem 0;overflow:visible}
		.rank .content .option .choose .typelist{width:1.2rem;top:90%;left:18%}
		.rank .content .option .choose .timelist{width:1.2rem;top:90%;left:63%}
		.rank .content .option .choose li{width:45%;margin:0}
		.rank .content .option .threeRank{display:block;width:100%;overflow:hidden;text-align:center;border-bottom:.011rem solid rgba(0,0,0,.08);float:none;padding-bottom:.15rem}
		.rank .content .option .threeRank .ranklist{padding:0;width:33%}
		.rank .content .option .good{margin:0}
		.rank .content .option{height:1.1rem;padding:2% 0;overflow:visible}
		}
</style>
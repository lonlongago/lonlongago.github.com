<template>
	<div>
		<alert ref="alert"></alert>
		<myheader></myheader>
		<div id="background"></div>
		<div id="Title">
		  	<ul>
		  		<li :class="RequestObj.rankList === 0?'active':''" @click="setRankList(0)"><a class="Title_a" href="javascript:;">好人榜</a></li>
		  		<li :class="RequestObj.rankList === 1?'active':''" @click="setRankList(1)"><a class="Title_a" href="javascript:;">字数榜</a></li>
		  		<li :class="RequestObj.rankList === 2?'active':''" @click="setRankList(2)"><a class="Title_a" href="javascript:;">点击榜</a></li>
		  	</ul>
		</div>
		<div id="content">
		  	<div class="content_Label">
			  	<ul>
			  	    <li :class="RequestObj.bookTypeId == '' ? 'active': ''" @click="setbookTypeId('')">全部</li>
			  		<li  @click="setbookTypeId(obj.bookTypeId)" :class="RequestObj.bookTypeId == obj.bookTypeId ? 'active': ''"  
			  		  v-for="obj in bookInfo">{{ obj.bookTypeName }}</li>
			  	</ul>
		  	</div>
		  	
		  	<div class="content_List">
		  		<ul>
		  			<img :src="path.ImagePath + '/img/arrow1.png'"/>
		  			<li v-if="RequestObj.timeRank == 0">周排行</li>
		  			<li v-if="RequestObj.timeRank == 1">月排行</li>
		  			<li v-if="RequestObj.timeRank == 2">总排行</li>
		  			<li class="List_li" @click="setTimeRank(0)">周排行</li>
		  			<li class="List_li" @click="setTimeRank(1)">月排行</li>
		  			<li class="List_li" @click="setTimeRank(2)">总排行</li>
		  		</ul>
		  	</div>
		  	<div class="content_ranking active" v-for="(obj,index) in result">	  	  
		  		<h1>{{ (index + 1) + ((RequestObj.pageNo - 1) * 12) }}</h1>
		  		<a href="javascript:;">
		  		    <img class="img" :src="path.ImagePath + '/img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" @click="gotoBook(obj.bookId)"/>
		  		    <div v-if="obj.bookIsSign ==1 " class="updateOne"><img  :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></div>
		  		</a>
		  		
		  		<ul>
		  			<li><a href="javascript:;" class="content_a" :title="obj.bookName"><span @click="gotoBook(obj.bookId)">{{obj.bookName}}</span></a></li>
		  			<li style="padding-top: 6px;">作者：{{obj.author}}</li>
		  			<li><!-- 占位符 --></li>
		  			
		  			<li class="hit" v-if="RequestObj.timeRank === 0">点击：{{obj.everyWeekHit}}</li>
		  			<li class="hit" v-if="RequestObj.timeRank === 1">点击：{{obj.everyMonthHit}}</li>
		  			<li class="hit" v-if="RequestObj.timeRank === 2">点击：{{obj.bookHit}}</li>
		  			
		  			<li class="hit" v-if="RequestObj.timeRank === 0">好人卡：{{obj.everyWeekCopperCoins}}</li>
	                <li class="hit" v-if="RequestObj.timeRank === 1">好人卡：{{obj.everyMonthCopperCoins}}</li>
	                <li class="hit" v-if="RequestObj.timeRank === 2">好人卡：{{obj.bookCopperCoins}}</li>
	          
	                <li class="hit" v-if="RequestObj.timeRank === 0">字数：{{obj.everyWeekWordCount}}</li>
		  			<li class="hit" v-if="RequestObj.timeRank === 1">字数：{{obj.everyMonthWordCount}}</li>
		  			<li class="hit" v-if="RequestObj.timeRank === 2">字数：{{obj.bookWordCount}}</li>
		  			
		  		</ul>
		  		<a @click="setCollect(obj.bookId)" v-if="obj.collect" class="ranking_Collection " href="javascript:;">取消收藏</a>
		  		<a @click="setCollect(obj.bookId)" v-else class="ranking_AddToCollection " href="javascript:;">添加收藏</a>
		  	</div>
	
		</div>
		<div id="page" class="page">
		    <ul>
			    <li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li>
			    <li :id="RequestObj.pageNo"
			    	v-if="( (index + 1)<= 5 && RequestObj.pageNo< 3 || ((index + 1) > RequestObj.pageNo - 3 &&  index< RequestObj.pageNo) ) || ( ((index + 1)<= RequestObj.pageNo + 2 &&　(index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )"
	 				:class="objTemp == RequestObj.pageNo ? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
			    <li class="btn" @click="setPage((RequestObj.pageNo + 1) <= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
			    <li class="goto">
			      	<input type="text" v-model="pageNo" style="text-align: center;"/>
			      	<span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span>
			      	<a class="btn" @click="setPage(pageNo)">转页</a>
			    </li>
		    </ul>
	    </div>
		<myfooter></myfooter>
	</div>
</template>

<script>
	import SZXJ from '~/components/vueHttp'
	import PathList from '~/components/conf'
	import Alert from '~/components/Alert'
	import myHeader from '~/components/Header'
  import myFooter from '~/components/Footer'
  import axios from 'axios'
	export default{
		data: function(){
			return {
				pageNo: '',
				szxj: SZXJ,
			    bodyFlag: false,
			    path: PathList,
			    result: [],  
			    bookInfo: [],
			    RequestObj : {
			        rankList: 0, // 好人 字数 点击
			        timeRank: 0, // 周 月 总
			        date: 1, // 0 近期 1远期 砍掉
			        bookTypeId: '',
			        pageNo: 1,
			        pageSize: 12,
			    },
			    // 分页
			    page: [1],
			    obj: {
				        p: 1, // 页码
				        n: 12,
				        pageCount: 1,
			    },
			        // 分页
			    totalPage:''    
			}
			
		},
		asyncData:function(context){
			var RequestObj = {
        rankList: 0, // 好人 字数 点击
        timeRank: 0, // 周 月 总
        date: 1, // 0 近期 1远期 砍掉
        bookTypeId: '',
        pageNo: 1,
        pageSize: 10,
			};
			//对传过来的参数进行处理
			if(context.params.id){
//				console.log(context.params);
				RequestObj.rankList = context.params.id-1;
			}else{
				
			}
			var obj ={};
			return axios.all([
				axios.get(PathList.getRankingList,{data:RequestObj}),
				axios.get(PathList.queryBookType)
			]).then(axios.spread(function (acct, perms) {
        // 两个请求现在都执行完成
        obj.RequestObj = RequestObj;
				obj.result = acct.data.result;
				obj.totalPage = acct.data.totalPage;
				obj.bookInfo = perms.data;
				return obj
      }))
		},
		components:{
			'alert': Alert,
		    'myheader': myHeader,
		    'myfooter': myFooter
		},
		mounted:function(){
			this.$nextTick(function () {
				this.setPageCount(this.totalPage);
				this.bodyFlag = true;
      })
		},
		methods:{
			setCollect: function(v) {
	            SZXJ.http(this,'post', PathList.saveOrDeleteBookCollect, { bookId: v },(response) => {
	               this.getValueFn();
	            },(err)=>{
	            	this.$refs.alert.setMessage(true,err.body.msg,function(){
//	            		this.$router.push({name:'login'});
                        location.href = "/login"
	            	})
	            });
	        },
	        setDate:function(v) {
	            this.RequestObj.data = v;
	            this.getValueFn(); // 请求
	        },
	        setbookTypeId: function(v) {
	            this.RequestObj.bookTypeId = v;
	            this.getValueFn(); // 请求
	        },
	        setRankList: function(v) {
//	        	location.href = this.path.TemprootPath + '/ranking/' + (v+1);
	            this.RequestObj.rankList = v;
	            this.getValueFn(); // 请求
	        },
	        setTimeRank: function(v) {
                this.RequestObj.timeRank = v;
	            this.getValueFn(); // 请求
	        },
	        gotoBook: function(id) {
	            location.href = this.path.TemprootPath + '/catalog/' + id;
	        },
	        setPageCount: function(v) {
	        	this.obj.pageCount = v;
	            this.page = [];
                for (var i = 0; i < this.obj.pageCount; i++) {
                    this.page.push(i+1);
                }
            },
	        setPage: function(v) {
	            if (!v || v > this.obj.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 ) {
	                return;
	            }
	           
	            this.RequestObj.pageNo = parseInt(v, 10);
	            this.getValueFn(); // 请求
	             
	        },
	        getValueFn: function() {
	            this.result = [];
	            SZXJ.http(this,'get', PathList.getRankingList, this.RequestObj, (response) => {
		            this.result = response.data.result;
		            this.setPageCount(response.data.totalPage);
	            });
	        }
		},
		head: function(){
			return{
				title: '排行榜-轻小说投稿',
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
			    	{ rel: 'stylesheet', href: '/css/ranking.css' },
			    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
			    	{ rel: 'stylesheet', href: '/css/LOgin.css' },
			    	{ rel: 'stylesheet', href: '/css/jquery-ui.min.css'},
		  		],
		  		script:[
		  	   		{src:"/lib/browserRedirect.js"}
		  		]
		  	}
		}
	}
</script>

<style>

</style>
<template>
    <div v-show="bodyFlag" style="display: none;">
		<alert ref="alert"></alert>
		  <!--<confirm v-ref:vue-confirm></confirm>-->
		<myheader ></myheader>
		<div class="user_info_topBJ"></div>
		<div class="user_info clear"> 
		    <!-- 左边导航 --> 
			<navLeft :active = "active"></navLeft>
		    <!-- 右边内容 -->
			<div class="user_info_right">
				<div class="user_info_title">
				    <div class="titleBlock">
				     bookshelf
				    </div>
				    <div class="titleBlock_LG">
				     个人书架
				    </div>
				</div>
				<div class="user_info_content ">
				    <div class="contribution"> 
					    <ul class="nav">
					        <li :class="infoBoolean?'active':'one'" @click="tapTrue"><span class="circular"></span><span class="title_name">我的收藏</span></li>
					        <li :class="infoBoolean?'one':'active'" @click="tapFalse"><span class="circular"></span><span class="title_name">浏览记录</span></li>
					    </ul> 
					    <div class="content">
						    <div class="bookBlockList" v-if="infoBoolean">
							    <div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">我的收藏</span>
							        <span class="titleTwo">collect</span>
							    </div> 
							    <div style="min-height:500px;width:100%;"> 
							        <div class="book-navAI" v-for="obj in bookList">
								        <div v-for="temp in obj" class="book-navAI_bookid">
									        <a :href="path.TemprootPath + '/catalog/' + temp.bookId"><img :title="temp.bookName" class="book-img" :src="path.ImagePath + '/img/z-imgBj.jpg'" @load="szxj.loadImg(temp.bookCoverImage ? path.ImageBookPath + temp.bookCoverImage: '', $event)" /></a>
									        <div class="book-name" :title=" temp.bookName ">
									            <a :href="path.TemprootPath + '/catalog/' + temp.bookId">{{ temp.bookName }}</a>
									        </div>
								        </div> 
							        </div>
							    </div>
					        </div>
					        <div class="bookBlockList" v-else>
					        	<div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">浏览记录</span>
							        <span class="titleTwo">browsing history</span>
							    </div> 
							    <div style="min-height:500px;width:100%;"> 
								    <div v-for="obj in lelList" class="book-navAI">
								        <div v-for="temp in obj" class="book-navAI_bookid">
									        <a :href="path.TemprootPath + '/catalog/' + temp.bookId"><img :title="temp.bookName" class="book-img" :src="path.ImagePath + '/img/z-imgBj.jpg'" @load="szxj.loadImg(temp.bookCoverImage ? path.ImageBookPath + temp.bookCoverImage: '', $event)" /></a>
									        <div class="book-name" :title="temp.bookName">
									            <a :href="path.TemprootPath + '/catalog/' + temp.bookId">{{ temp.bookName.length &gt; 12? temp.bookName.substring(0, 12).concat('...'):temp.bookName }}</a>
									        </div>
								        </div> 
								    </div>
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
	import axios from 'axios'
	import SZXJ from '~/components/vueHttp'
	export default {
		components:{
			'alert':alert,
			'myheader':header,
			'myfooter':footer,
			'navLeft':navLeft
		},
		data: function(){
			return {
                path: PathList,
		    	bookList: [], //收藏书籍
		    	lelList:[],   //浏览书籍
		    	szxj: SZXJ,
		    	bodyFlag: true,
		    	loginObj:{},
		    	infoBoolean:true,
		    	active:'bookshelf'
			}
		},
		asyncData: function(){
//			var _data = { 'JSESSIONID': store.state.count };
////			console.log(_data);
//			return axios.get(PathList.getStatus,{ headers: _data})
//			.then(function(res3){
//				console.log(res3.data);
//				var obj = {};
//		    	obj.loginObj = {};
//		    	if (res3.data.loginFlag) {
//			        obj.loginObj.loginImg = 'background-image: url('+ PathList.ImageBookPath + res3.data.status.userImage +')';
//			        obj.loginObj.loginFlag = res3.data.status.flag;
//			        obj.loginObj.userName = res3.data.status.userName;
//			        obj.loginObj.book = res3.data.book;
//			        obj.loginObj.official = res3.data.official;
//			        obj.loginObj.reply = res3.data.reply;
//			        obj.loginObj.system = res3.data.system;
//			        obj.loginObj.number1 = res3.data.system + res3.data.reply + res3.data.official + res3.data.book;
//			    } else {
//			    	obj.loginObj.loginFlag = false;
//			    }
//			    return obj;
//			})
		},
		mounted: function(){
			this.$nextTick(function(){
				
				this.getBookListTwoFn();
			})
		},
		methods: {
			getBookListTwoFn: function() { // 获取我的收藏的数据
		        var _data = {};
		        this.bookList= [];
		        SZXJ.http(this,'get', PathList.findBookCollectByUser, {}, (response) => {
		        	this.bookList=response.data;
		        	var arr = [];
		        	var list = [];
		            if (this.bookList.length % 4 === 0) {
			            for (var i = 1; i <= this.bookList.length; i++) {
			                arr.push(this.bookList[i - 1]);
			                if (i % 4 === 0) {
			                    list.push(arr);
			                    arr = [];
			                }
			            }
		            } else {
			            for (var i = 1; i <= this.bookList.length;i++) {
			                arr.push(this.bookList[i - 1]);
			                if (i % 4 === 0) {
			                    list.push(arr);
			                    arr = [];
			                }
			                if (i === this.bookList.length) {
			                    list.push(arr);
			                }
			            }
		            }
		            this.bookList = list;
		            setTimeout(function(){
		            	if(!this.bodyFlag){
			            	this.bodyFlag = true;
			            }
		            },500)
		            
	            });
	        },
	        getLelListTwoFn: function() { // 获取我的浏览记录
		        var _data = {};
		        this.lelList=[];
		        SZXJ.http(this,'get', PathList.findBookHitByUser, {}, (response) => {
		            this.lelList=response.data;
		            var arr = [];
		            var list = [];
		            if (this.lelList.length % 4 === 0) {
		              for (var i = 1; i <= this.lelList.length; i++) {
		                arr.push(this.lelList[i - 1]);
		                if (i % 4 === 0) {
		                  list.push(arr);
		                  arr = [];
		                }
		              }
		            } else {
		              for (var i = 1; i <= this.lelList.length;i++) {
		                arr.push(this.lelList[i - 1]);
		                if (i % 4 === 0) {
		                  list.push(arr);
		                  arr = [];
		                }
		                if (i === this.lelList.length) {
		                  list.push(arr);
		                }
		              }
		            }
		            this.lelList = list;
		        });
	        },
	         ///切换
	        tapFalse:function(){
	          this.bookList = [];
            this.lelList = [];
	        	this.infoBoolean=false;
	        	this.getLelListTwoFn();
	        },
	        tapTrue:function(){
	          this.bookList = [];
	        	this.lelList = [];
	        	this.infoBoolean=true;
	        	this.getBookListTwoFn();
	        }
		},
		head: function(){
			return{
				title: '个人书架-QC轻小说',
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
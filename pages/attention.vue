<template>
    <div v-show="bodyFlag" style="display: none;">
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
				     Personal attention
				    </div>
				    <div class="titleBlock_LG">
				        个人关注
				    </div>
				</div>
				<div class="user_info_content">
				    <div class="contribution"> 
					    <ul class="nav">
					        <li :class="infoBoolean?'active':'one'" @click="tapTrue"><span class="circular"></span><span class="title_name">我关注的</span></li>
					        <li :class="infoBoolean?'one':'active'" @click="tapFalse"><span class="circular"></span><span class="title_name">关注我的</span></li>
					    </ul> 
					    <div class="content">
						    <div class="bookBlockList" v-if="infoBoolean">
							    <div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">我的关注</span>
							        <span class="titleTwo">attention</span>
							    </div> 
							    <div style="height:535px"> 
							        <div v-for="obj in bookList.attention">
								        <div class="img-attention">
								            <img class="img-attention-head" :src="path.ImageBookPath + obj.userHead" />
								            <span v-if="obj.sex == '男生'" class="attention-name-sex"><img :src="path.ImagePath + '/img/sex_001.png'" alt="" /></span>
								            <span v-if="obj.sex == '女生'" class="attention-name-sex"><img :src="path.ImagePath + '/img/sex_002.png'" alt="" /></span>
								        </div>
								        <div class="attention-name">
									        <span>{{ obj.userName }}</span>
									        <div @click="setAttention(obj.userId)" class="wordAI ">
									           取消关注
									        </div>
								        </div>
								        <span class="wordAI-two" v-if="obj.information">{{ obj.information }}</span>
								        <span class="wordAI-two" v-else="">这个人很赖,没有留下简介</span>
								        <hr style="border: 1px solid #E1E1E1; margin:20px 0 0 5%; opacity:0.4; " width="90%" /> 
							        </div>
							        <div id="page" class="page" v-if="setPageCount &gt; 1">
								        <ul>
								            <li class="btn" @click="setPage((RequestObj.pageNo - 1) &gt;= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li> 
								            <li v-if="((index + 1)&lt;= 5 &amp;&amp; RequestObj.pageNo&lt; 3 || ((index + 1) &gt; RequestObj.pageNo - 3 &amp;&amp;  index&lt; RequestObj.pageNo)) || ( ((index + 1)&lt;= RequestObj.pageNo + 2 &amp;&amp;　(index + 1) &gt; RequestObj.pageNo) || (RequestObj.pageNo &gt; obj.pageCount - 3 &amp;&amp; (index + 6) &gt; obj.pageCount) )" :class="objTemp == RequestObj.pageNo? 'active':''" v-for="objTemp in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
								            <li class="btn" @click="setPage((RequestObj.pageNo + 1)&lt;= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
								            <li class="goto"><input type="text" v-model="pageNo" style="text-align: center;" /><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li>
								        </ul>
							        </div> 
								</div>
					        </div>
					        <div class="bookBlockList" v-else>
					        	<div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">关注我的</span>
							        <span class="titleTwo">attention</span>
							    </div> 
							    <div style="min-height:500px;width:100%;"> 
								    <div style="height:535px"> 
								        <div v-for="obj in bookList1.attention">
									        <div class="img-attention">
										        <img class="img-attention-head" :src="path.ImageBookPath + obj.userHead" />
										        <span v-if="obj.sex == '男生'" class="attention-name-sex"><img :src="path.ImagePath + '/img/sex_001.png'" alt="" /></span>
										        <span v-if="obj.sex == '女生'" class="attention-name-sex"><img :src="path.ImagePath + '/img/sex_002.png'" alt="" /></span>
										    </div>
									        <div class="attention-name">
									            <span>{{ obj.userName }}</span>
									            <div @click="setAttention(obj.userId)" v-if="!obj.attention" class="wordAI2 ">
									                 +关注
									            </div>
										        <div @click="setAttention(obj.userId)" v-else="" class="wordAI2 ">
										                         已关注
										        </div>
									        </div>
								            <span class="wordAI-two" v-if="obj.information">{{ obj.information }}</span>
								            <span class="wordAI-two" v-else="">这个人很赖,没有留下简介</span>
								            <hr style="border: 1px solid #E1E1E1; margin:20px 0 0 5%; opacity:0.4;" width="90%" /> 
								        </div>
								    </div> 
								    <div id="page" class="page" v-if="setPageCount > 1">
								        <ul>
								            <li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li> 
								            <li v-if="((index + 1)&lt;= 5 && RequestObj.pageNo&lt; 3 || ((index + 1) > RequestObj.pageNo - 3 &&  index > RequestObj.pageNo)) || ( ((index + 1)<= RequestObj.pageNo + 2  &&　(index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
								            <li class="btn" @click="setPage((RequestObj.pageNo + 1)&lt;= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
								            <li class="goto"><input type="text" v-model="pageNo" style="text-align: center;" /><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li>
								        </ul>
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
	import store from '~/components/store'
	import axios from 'axios'
	import Vuex from 'vuex'
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
                path: PathList,
                active:'attention',
		    	bookList: [], 
		    	bookList1: [],  
		    	szxj: SZXJ,
		    	bodyFlag: true,
		    	loginObj:{
		    		loginImg:'',
		    		loginFlag:'',
		    		userName:'',
		    		book:'',
		    		official:'',
		    		reply:'',
		    		system:'',
		    		number1:''
		    	},
		    	infoBoolean:true,
		    	RequestObj: {
		        	status: 0,
		        	pageNo: 1,
		        	pageSize: 5,
		        },
		        attention: true,
		        userId: '',
	        	valueList: [],
	        	page: [],
	        	obj: {
		            p: 1, // 页码
		            n: 5,
		            pageCount: 0,
		        }
			}
		},
		asyncData: function(){
			var _data = { 'JSESSIONID': store.state.count };
			return axios.get(PathList.getStatus,{ headers: _data})
			.then(function(res3){
				var obj = {};
		    	obj.loginObj = {};
		    	if (res3.data.loginFlag) {
			        obj.loginObj.loginImg = 'background-image: url('+ PathList.ImageBookPath + res3.data.status.userImage +')';
			        obj.loginObj.loginFlag = res3.data.status.flag;
			        obj.loginObj.userName = res3.data.status.userName;
			        obj.loginObj.book = res3.data.book;
			        obj.loginObj.official = res3.data.official;
			        obj.loginObj.reply = res3.data.reply;
			        obj.loginObj.system = res3.data.system;
			        obj.loginObj.number1 = res3.data.system + res3.data.reply + res3.data.official + res3.data.book;
			    } else {
			    	obj.loginObj.loginFlag = false;
			    }
			    return obj;
			})
		},
		mounted: function(){
			this.$nextTick(function(){
				this.getValueFn();
			})
		},
		methods: {
		    setPageCount: function(v) {
		        var obj = this.obj;
		        obj.pageCount =  v;
		        this.page = [];
		        for (var i = 0; i < obj.pageCount; i++) {
		            this.page.push(i+1);
		        }
	//	          this.$set('obj', obj);
		        this.obj.pageCount = v 
	        },
	        setPage: function(v) {
		        if (!v || v > this.obj.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 ) {
		            return;
		        }
	            var obj = this.RequestObj;
	            obj.pageNo = v;
//	            this.$set('RequestObj', obj);
                this.RequestObj.pageNo = v;
	            this.getValueFn(); // 请求
	        },
	        setAttention: function(v){
	            SZXJ.http(this,'post', PathList.saveOrCancelAttention, { receiveId: v }, (response) => {
	              this.getValueFn();
	            });
	            
	        },
	        getValueFn: function() {
	          this.RequestObj.status = 0;
		        SZXJ.http(this,'get', PathList.myCareOrCareMe, this.RequestObj, (response) => {
		            this.bookList=response.data
		            this.setPageCount(response.data.totalPage);
		            if(!this.bodyFlag){
		            	this.bodyFlag = true;
		            }
		        });
	        },
	        getValueFn1: function() {
	          this.RequestObj.status = 1;
		        SZXJ.http(this,'get', PathList.myCareOrCareMe, this.RequestObj, (response) => {
		            if (!response.data) {
		                return;
		            }
		            this.bookList1 = response.data;
		            this.userId = response.data.attention.userId;
		            this.attention = response.data.attention.attention;
		            this.setPageCount(response.data.totalPage);
		        });
	        },
	         ///切换
	        tapFalse:function(){
	        	this.infoBoolean=false;
	        	this.getValueFn1();
	        },
	        tapTrue:function(){
	        	this.infoBoolean=true;
	        	this.getValueFn();
	        }
		},
		head: function(){
			return{
				title: '个人关注-QC轻小说',
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
<template>
	<div>
		<alert ref="alert"></alert>
		<myheader></myheader>
		<div class="user_info_topBJ"></div>
		<div class="user_info clear"> 
		    <!-- 左边导航 --> 
			<navLeft :active="active"></navLeft>
		    <!-- 右边内容 -->
			<div class="user_info_right">
				<div class="user_info_title">
				    <div class="titleBlock">
				     Personal message
				    </div>
				    <div class="titleBlock_LG">
				     个人消息
				    </div>
				</div>
				<div class="user_info_content">
				    <div class="contribution"> 
					    <ul class="nav">
						    <li @click = "tapMove(1)" :class=" tapNumber == 1 ?'active':''"> 
						        <div class="mag_number1" v-if="reply > 0">
						        {{reply}}
						        </div>
						        <span class="circular"></span>
						        <span @click="setreplyFn" class="title_name">我的回复</span>
						    </li>
						    <li @click = "tapMove(2)" :class=" tapNumber == 2 ?'active':''"> 
						        <div class="mag_number1" style="display:none;"></div>
						        <span class="circular"></span>
						        <span class="title_name">@我的</span>
						    </li>
						    <li @click = "tapMove(3)" :class=" tapNumber == 3 ?'active':''"> 
						        <div class="mag_number1" v-if="book > 0">
						        {{book}}
						        </div>
						        <span class="circular"></span>
						        <span @click="setbookFn" class="title_name">作品相关</span>
						    </li>
						    <li @click = "tapMove(4)" :class=" tapNumber == 4 ?'active':''"> 
						        <div class="mag_number1" v-if="system > 0">
						        {{system}}
						        </div>
						        <span class="circular"></span>
						        <span @click="setsystemFn" class="title_name">系统消息</span>
						    </li>
						    <li @click = "tapMove(5)" :class=" tapNumber == 5 ?'active':''"> 
						        <div class="mag_number1" v-if="official > 0">
						        {{official}}
						        </div>
						        <span class="circular"></span>
						        <span @click="setofficialFn" class="title_name">官方公共</span>
						    </li>
					    </ul> 
					    <div class="content">
					        <div class="bookBlockList" v-if = " tapNumber == 1 ?true:false">
							    <div class="bookBlockList_title">
							        <span class="hr"></span>
							        <span class="title">回复我的</span> 
							        <span class="titleTwo">essential information</span>
							    </div> 
							    <div style="min-height:500px"> 
							        <div v-for="obj in bookList">
								        <div class="img-attention-headTow">
									        <img :src="path.ImageBookPath + obj.userHead " />
									        <span v-if="obj.sex == '男生'" class="attention-name-sex-Tow"><img :src="path.ImagePath + '/img/sex_001.png'" alt="" /></span>
									        <span v-if="obj.sex == '女生'" class="attention-name-sex-Tow"><img :src="path.ImagePath + '/img/sex_002.png'" alt="" /></span>
								        </div>
								        <ul class="attention_AI_words">
								            <li class="attention_AI_time">{{ szxj.getLocalTimeTwo(obj.replyDate) }} </li>
								            <!--<li class="attention_AI_detailed"><a :href="obj.activeId == 1? path.TemprootPath + '/collect.html' : path.TemprootPath + '/catalog/' + obj.bookId">查看详情</a></li>--> 
								            <li class="attention_AI_detailed"><a :href="path.TemprootPath + '/catalog/' + obj.bookId">查看详情</a></li> 
								         </ul>
								        <div class="attention_AI_name">
								            <span>{{obj.userName}}</span>回复了你:{{obj.replyContent}}
								        </div>
								        <div class="attention_AI_comment">
								            <span v-if="obj.commentContent== '' || obj.repliedContent !== null ">“{{obj.repliedContent}}”</span>
								            <span v-else="">“{{obj.commentContent}}”</span>
								        </div> 
								        <hr style="border: 1px solid #f9f9f9; margin:0 0 0 5%;  " width="90% " />
							        </div> 
							    </div> 
							    <div id="page" class="page">
							        <ul>
							            <li class="btn" @click="setPage((RequestObj.pageNo - 1) &gt;= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li>
							            <li v-if="((index + 1)<= 5 && RequestObj.pageNo < 3 || ((index + 1) > RequestObj.pageNo - 3 &amp;&amp;  index < RequestObj.pageNo)) || ( ((index + 1) <= RequestObj.pageNo + 2 &&　(index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
							            <li class="btn" @click="setPage((RequestObj.pageNo + 1)<= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
							            <li class="goto"><input type="text" v-model="pageNo" style="text-align: center;" /><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage( pageNo)">转页</a></li>
							        </ul>
							    </div> 
				           </div> 
				            <div class="bookBlockList" v-if = " tapNumber == 2 ?true:false">
				            	<!--<div class="bookBlockList">-->
      								    <div class="bookBlockList_title">
      								        <span class="hr"></span>
      								        <span class="title">@我的</span>
      								        <span class="titleTwo">work related</span>
      								    </div> 
      								    <div style="min-height:500px">
      								        <p>此功能暂未开放</p>
      								    </div> 
      								<!--</div>--> 
      				            </div>
      				            <div class="bookBlockList" v-if = " tapNumber == 3 ?true:false">
      				                <div class="bookBlockList_title">
          								    <span class="hr"></span>
          								    <span class="title">作品相关</span>
          								    <span class="titleTwo">work related</span>
          								</div> 
          								<div style="min-height:500px"> 
          								    <div v-for="obj in bookList.info">
          								        <div class="img-attention-word">
          								            <span class="attention-word1">{{obj.messageTitle}}</span>
          								            <span class="attention-word2">{{ szxj.getLocalTimeTwo(obj.messageCreateDate) }}</span>
          								        </div>
          								        <p>{{obj.message}}</p>
          								        <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" />
          								    </div> 
          								</div> 
        							    <div id="page" class="page">
        								    <ul>
        								          <li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li> 
        							            <li v-if="((index + 1)&lt;= 5 && RequestObj.pageNo&lt; 3 || ((index + 1) > RequestObj.pageNo - 3 &&  index > RequestObj.pageNo)) || ( ((index + 1)<= RequestObj.pageNo + 2  &&　(index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
        							            <li class="btn" @click="setPage((RequestObj.pageNo + 1)&lt;= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
        							            <li class="goto"><input type="text" v-model="pageNo" style="text-align: center;" /><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li>
        								    </ul>
        							    </div>
				            </div>
				            <div class="bookBlockList" v-if = " tapNumber == 4 ?true:false">
				            	<div class="bookBlockList_title">
      								    <span class="hr"></span>
      								    <span class="title">系统消息</span>
      								    <span class="titleTwo">system</span>
      								</div> 
				              <div style="min-height:500px"> 
        									<div v-for="obj in bookList.info">
        									    <div class="img-attention-word">
        									        <span class="attention-word1">{{obj.messageTitle}}</span>
        									        <span class="attention-word2">{{szxj.getLocalTimeTwo(obj.messageCreateDate)}}</span>
        									    </div>
        									    <p>{{obj.message}}</p>
        									    <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" />
        									</div> 
							        </div>
      							  <div id="page" class="page">
      								    <ul>
      								        <li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li> 
      							            <li v-if="((index + 1)<= 5 && RequestObj.pageNo< 3 || ((index + 1) > RequestObj.pageNo - 3 &&  index > RequestObj.pageNo)) || ( ((index + 1)<= RequestObj.pageNo + 2  &&　(index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
      							            <li class="btn" @click="setPage((RequestObj.pageNo + 1)&lt;= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
      							            <li class="goto"><input type="text" v-model="pageNo" style="text-align: center;" /><span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span><a class="btn" @click="setPage(pageNo)">转页</a></li>
      								    </ul>
      								</div>
				            </div>
				            <div class="bookBlockList" v-if = " tapNumber == 5 ?true:false">
				                  <div class="bookBlockList_title">
        									   <span class="hr"></span>
        								   	<span class="title">官方公共</span>
        									   <span class="titleTwo">official public</span>
        							    </div> 
        						      <div style="min-height:500px !important"> 
          									<div v-for="obj in bookList.info">
          									    <div class="img-attention-word">
          									        <span class="attention-word1">{{obj.messageTitle}}</span>
          									        <span class="attention-word2">{{szxj.getLocalTimeTwo(obj.messageCreateDate)}}</span>
          									    </div>
          									    <p>{{obj.message}}</p>
          									    <hr style="border: 1px solid #E1E1E1; margin:0 0 0 5%;" width="90%" />
          									</div>
        							   	</div> 
        							    <div id="page" class="page">
        								    <ul>
        								        <li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li> 
        							            <li v-if="((index + 1)<= 5 && RequestObj.pageNo< 3 || ((index + 1) > RequestObj.pageNo - 3 &&  index > RequestObj.pageNo)) || ( ((index + 1)<= RequestObj.pageNo + 2  &&　(index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" :class="objTemp == RequestObj.pageNo? 'active':''" v-for="(objTemp,index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
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
//	import dateTime from '~/components/Date'
	import SZXJ from '~/components/vueHttp'
	export default{
		components:{
			'alert':alert,
			'myheader':header,
			'myfooter':footer,
			'navLeft':navLeft
		},
		data: function(){
			return {
				szxj: SZXJ,
		        bodyFlag: false,
		        path: PathList,
		        RequestObj:{
		        	type:0,
		            pageNo: 1,
		            pageSize: 10,
		        },
		        page: [1],
		        obj: {
		            p: 1, // 页码
		            n: 10,
		            pageCount: 1,
		        },
		        active: 'message',
		        loginImgFlag: true,
		        pageNo:'',
		        number1: '',
		        book:'',
		        official:'',
		        reply:'',
		        system:'',
		        bookList:{},
		        tapNumber:1,    // 切换参数
		        showFlag: 1
		    }
		},
		asyncData: function(){
//			return axios({
//			  		method:'post',
//			  		url:PathList.queryUser,
//			  		data:{},
//			  		headers:{'JSESSIONID':store.state.count}
//			  }).then(function(res3,res2){
//				var obj = {};
//		    	obj.sex= res2.data.sex;
//	          	obj.userInfoList = res2.data;
//	          	obj.userName = res2.data.userName;
//	          	obj.loginImg = 'background-image: url('+ PathList.ImageBookPath + res2.data.userHead +')';
//		    	console.log(res3.data.loginFlag);
//				return obj;
//			})
//	        .catch(function(error){
////	        	console.log(916);
////	        	console.log(error.request._headers);
////				if(error.response){
////					console.log(error.response.data);
////				    console.log(error.response.status);
////				} else {
////					console.log('Error',error.message);
////				}
////				console.log(error.config);
//			})
		},
		mounted: function (){
		   
//		    this.getBookListFn();
            var _data = this.RequestObj;
		    SZXJ.http(this,'get', PathList.findCommentAndReplyByReplyUserId, _data , (response) => { 
		        this.bookList = response.data.info;
		        this.setPageCount(response.data.totalPage); 
		        this.bodyFlag = true;
		    });
		},    
		methods: {
			tapMove: function(v){
			  this.bookList = {};
				this.tapNumber = v;
				this.pageNo = 0;
				this.RequestObj.pageNo = 1;
				switch(this.tapNumber){
					case 1:
					    this.getStatusValueFn();
					    this.getReplyValueFn();
					    break;
				    case 2:
				        this.getStatusValueFn();
					    break;
					case 3:
					    this.getStatusValueFn();
					    this.getRelevantValueFn();
					    break;
					case 4:
					    this.getStatusValueFn();
					    this.getSystemValueFn();
					    break;
					case 5:
					    this.getStatusValueFn();
					    this.getOfficalValueFn();
					    break;
					default:    
					    break;
				}
			},
			setbookFn: function(){
	            this.book=0;
	        },
	        setofficialFn: function(){
	            this.official=0;
	        },
	        setreplyFn: function(){
	            this.reply=0;
	        },
	        setsystemFn: function(){
	            this.system=0;
	        },
	        setPageCount: function(v) {
		        var obj = this.obj;
		        obj.pageCount =  v;
		        this.page = [];
		        for (var i = 0; i < obj.pageCount; i++) {
		            this.page.push(i+1);
		        } 
		        this.obj.pagaCount = v;
	        },
	        setPage: function(v) {
		        if (!v || v > this.obj.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 ) {
		            return;
		        }
		        var obj = this.RequestObj;
		        obj.pageNo = v;
		        this.RequestObj.pageNo = v;
//		        this.getValueFn(); // 请求
            switch(this.tapNumber){
    					case 1:
    					    this.getStatusValueFn();
    					    this.getReplyValueFn();
    					    break;
    					case 2:
    					    this.getStatusValueFn();
    					    break;
    					case 3:
    					    this.getStatusValueFn();
    					    this.getRelevantValueFn();
    					    break;
    					case 4:
    					    this.getStatusValueFn();
    					    this.getSystemValueFn();
    					    break;
    					case 5:
    					    this.getStatusValueFn();
    					    this.getOfficalValueFn();
    					    break;
    					default:    
    					    break;
    				};
	        },
	        setFlag: function() {
		        var url = this.path.TemprootPath + '/view/user_info.html';
		        this.$parent.setMessage(false,'此功能暂未开放！',function() {
		            location.href = url;
		        });
	        },
	        getBookListFn: function() {
		        var _data = {};
		        SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
		            this.bookList = response.data;
		        });
	        },
	        getStatusValueFn: function(){
	        	 SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
		        	if(response.data.loginFlag){
		        		this.userName = response.data.status.userName;
			            this.book = response.data.book;
			            this.official = response.data.official;
			            this.reply = response.data.reply;
			            this.system = response.data.system;
			            this.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
		        	}else{
		        		this.$refs.alert.setMessage(true,"你还未登录或登录超时",function(){
		        			this.$router.push({name : 'login'})
		        		})
		        	}
		        });
	        },
	        getReplyValueFn: function() {
		        var _data = this.RequestObj;
		        SZXJ.http(this,'get', PathList.findCommentAndReplyByReplyUserId, _data , (response) => { 
		            this.bookList = response.data.info;
		            this.setPageCount(response.data.totalPage);
		        });
	        },
	        getRelevantValueFn: function() {
	        	this.RequestObj.type = 0;
	        	var _data = this.RequestObj;
		        SZXJ.http(this,'get', PathList.queryMsg, _data , (response) => {
		            this.bookList = response.data;
		            this.setPageCount(response.data.totalPage);
		        });
	        },
	        getSystemValueFn: function(){
	        	this.RequestObj.type = 1;
	        	var _data = this.RequestObj;
		        SZXJ.http(this,'get', PathList.queryMsg, _data , (response) => {
		            this.bookList = response.data;
		            this.setPageCount(response.data.totalPage);
		        });
	        },
	        getOfficalValueFn: function(){
	        	this.RequestObj.type = 2;
	        	var _data = this.RequestObj;
		        SZXJ.http(this,'get', PathList.queryMsg, _data , (response) => {
		            this.bookList = response.data;
		            this.setPageCount(response.data.totalPage);
		        });
	        }
		},
		head: function(){
			return {
				title: '我的消息-QC轻小说',
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
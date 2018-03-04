<template>
	<div>
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div style="display: none;" v-show="displayFlag" class="classSec" id="classSec">
			<div id="pull"></div>
			<div class="content">
				<img v-if="topFlag"  @click="clickTopFn"  class="top"  src="http://cdn.qcacg.com/img/app_index/top_01.png" alt="" />
				<div class="cephalosome">
		          <img @click="backFn" class="back" src="http://cdn.qcacg.com/img/app_index/classification_03.png" alt="" />
		          <span v-if="keyFlag && RequestObj.Keyword != '' " >{{RequestObj.Keyword}}</span><!--v-if=" RequestObj.Keyword != '' "-->
		          <div v-else >
		            <span v-if=" RequestObj.bookTypeId - 1 >= 0 ">{{typeName[ RequestObj.bookTypeId - 1 ].bookTypeName}}</span>
		            <span v-else >全部</span>
		          </div>
		          <img @click="windowFlagFn()" class="catalog" src="http://cdn.qcacg.com/img/app_index/class_04.png" alt="" />
		        </div>
		        <div v-if=" bookInfo == null " style="margin-top: 10%;text-align: center;min-height:8rem;">真可惜，没有找到相关书籍<p>(╥╯﹏╰╥)ง</p></div>
		        <div v-else class="booklist" v-for="obj in bookInfo">
		          <a :href="path.TemprootPath + '/app/book/' + obj.bookId" style="display:block;height: 2.52rem;">
		             <img class="bookimg" :src="path.imagePath +obj.bookCoverImage" alt="" />
		             <ul class="attribute">
		               <li class="bookname">{{ obj.bookName }}</li>
		               <li class="authorImg">
		                 	<img src="http://cdn.qcacg.com/img/app_index/index_36_01.png" alt="" />
		                 	<span class="authorName">{{obj.author}}</span>
		               </li>
		               <li class="briefSec">{{obj.bookIntroduction}}</li>
		               <li class="white"></li>
		               <li class="author ">
		                  
		                  <div class="authorBox">
		                    <img src="data:image/png;base64,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" alt="" />
		                    <span class="booknameSec">{{obj.bookWordCount|formatData}}</span>
		                  </div>
		                	<div class="authorBox">
		                    <img src="data:image/png;base64,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" alt="" />
		                    <span class="booknameSec">{{obj.bookCopperCoins|formatData}}</span>
		               		</div>
		               		<div class="authorBox">
		                    <img src="data:image/png;base64,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" alt="" />
		                    <span class="booknameSec">{{obj.bookHit|formatData}}</span>
		                 	</div>
		               </li>
		             </ul>
		          </a>
		          <div class="hr"></div>
		        </div>  
		        <div v-if="windowFlag" class="window">
		          <div @click="windowFn()" class="windowbackground"></div>
		            <div class="windowcentent">
		                <div class="windowtitle">筛选</div>
		                <div class="choose">
		                  <div class="choosecentent">  
		                    <h5 class="choosetitle">排序</h5>
		                    <div class="frame"> 
		                      <span v-for="sos in obj.newBook" @click="chooseFn(sos.id)" :class="RequestObj.sort == sos.id? 'active':''">{{sos.name}}</span>
		                    </div>
		                    <div class="hr"></div>
		                  </div>  
		                  <div class="choosecentent">
		                    <h5 class="choosetitle">字数</h5>
		                    <div class="frame"> 
		                      <span v-for="sos in obj.fontsize" @click="fontsizeFn(sos.id,sos.min,sos.max)" :class="fontNumId == sos.id? 'active':''">{{sos.name}}</span>
		                    </div>
		                    <div class="hr"></div>
		                  </div>  
		                  <div class="choosecentent">
		                    <h5 class="choosetitle">签约</h5>
		                    <div class="frame"> 
		                      <span v-for="sos in obj.works" @click="worksFn(sos.id)" :class="RequestObj.isSign == sos.id? 'active':''">{{sos.name}}</span>
		                    </div>
		                    <div class="hr"></div>
		                  </div>  
		                  <div class="choosecentent">
		                    <h5 class="choosetitle">分类</h5>
		                    <div class="frame"> 
		                      <span v-for="sos in obj.sort" @click="sortFn(sos.bookTypeId)" :class="RequestObj.bookTypeId == sos.bookTypeId? 'active':''">{{sos.bookTypeName}}</span>
		                      <span @click="sortFn('')" :class="RequestObj.bookTypeId == ''? 'active':''">全部</span>
		                    </div>    
		                  </div>  
		                  <div style="height: 0.8rem;"></div>
		                </div>
		                <div class="trueBlock">
		                	<div @click="getValueFn()" class="true">确认</div>
		                </div>
		            </div>
		        </div>
		        <appBottom></appBottom>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList
//		'myheader':Header,
//		'myfooter':Footer
	},
	asyncData:function(context){
		var obj={};
	    obj.id = context.params.id;
//		    console.log(context);
//		    console.log(obj.id);
		return obj;
	},
	filters:{
	  	formatData:function(value){
					var indexNum = '';
					if(value<=9999){
						return value;
					}
					else{
						indexNum = parseInt(value/10000).toString();
						return indexNum + 'w';
					}
	  	}
 	},
	data : function() {
		return {
		    path: appPathList,
		    typeName:[],
		    szxj:SZXJ,    
		    fontNumId:'', 
		    bookInfo:[],
		    typeId:'',
		    windowFlag:false,
		    totalPage:'',
		    menuList: false,
		    toWrap: false,
		    numBer:'',
		    keyFlag:false,
		    displayFlag:false,
		    ispeed:'',
		    topFlag:false,
		    isTop:true,
		    timer:'',
		    RequestObj: {
		          sort: 0, // 排序 ： id
		          bookTypeId: '', // 分类 id
		          wordMin: 0,
		          wordMax: '',
		          isSign: 0,
		          Keyword: '', // 搜索的书名
		          pageNo: 1, // 页码
		          pageSize:12,
		        },
		    obj:{
		          newBook: [{name: '最新', id: 0} ,{name: '最热', id: 1} ],
		          sort:[], // 分类
		          fontsize:[
		          {name: '全部', min: 0, max: '' , id : 0 }
		          ,{name: '10万字以下', min: 0, max: 100000 , id : 1 }
		          ,{name: '10-30万字', min: 100000, max: 300000 , id : 2 }
		          ,{name: '50-100万字', min:500000, max: 1000000  , id : 3 }
		          ,{name: '一百万字以上', min: 1000000, max: ""  , id : 4 }
		          ], // 字数
		          works:[{name: '精品作品', id: 0},{name: '签约作品', id: 1}], // 签约 
		          value: '', // 搜索的书名
		          p: 1, // 页码
		          n: 12,
		          pageCount: 0,
		        },
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	console.log(this.id);
	  	if(this.id >=0){
	  	  this.RequestObj.bookTypeId = this.id;
	  	}else{
	  	  this.RequestObj.bookTypeId=="";
	  	}
		  k_touch("classSec", "y");
	      if(SZXJ.getQueryString('keyword')){
	        this.RequestObj.Keyword = SZXJ.getQueryString('keyword');
	        console.log(this.RequestObj.Keyword);
	        this.keyFlag = true;
	      }
	        console.log(this.keyFlag);
	      this.getValueFn();
				window.addEventListener('scroll', this.onscrollFn);
				this.displayFlag = true;
	  })
	},
	methods: {
	    clickTopFn:function(){
	      var This = this;
	      this.timer = setInterval(function(){
	      //获取滚动条距离顶部高度
	          var ispeed = Math.floor(-This.srcollTop / 7);
	           document.documentElement.scrollTop = document.body.scrollTop = ispeed + This.srcollTop;
	          //到达顶部，清除定时器
	          if (This.srcollTop == 0) {
	            clearInterval(This.timer);
	          };
	          This.isTop = true;  
	        },30);
	    },
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
	    chooseFn:function(id){
	      this.RequestObj.sort = id;
	
	    },
	    fontsizeFn:function(id,min,max){
	      this.fontNumId = id;
	      this.RequestObj.wordMin = min;
	      this.RequestObj.wordMax = max;
	    },
	    worksFn:function(id){
	      this.RequestObj.isSign = id;
	    },
	    sortFn:function(id){
	       this.RequestObj.bookTypeId = id;
	       this.RequestObj.Keyword = '';
	    },
	    windowFn:function(){
	      this.windowFlag = false;
	    },
	    windowFlagFn:function(){
	      this.windowFlag = true;
	    },
	    onscrollFn:function(){    
	      this.offsetHeight = document.documentElement.offsetHeight;   // 页面总高度
	      this.clientHeight = document.documentElement.clientHeight;   // 可视区高度
	      this.srcollTop  = document.documentElement.scrollTop || document.body.scrollTop;   //滚动条的高度 
	      this.srcollH  = document.body.scrollHeight;
	      console.log(this.srcollH);
	        if ( this.offsetHeight - this.clientHeight  ==  this.srcollTop ) {
								this.loopFn();
	        };
	        if( this.srcollTop >= this.clientHeight ){
	           this.topFlag = true;
	        }else{
	          this.topFlag = false;
	        };
	        if(!this.isTop){
	          clearInterval(this.timer);
	        } 
	        this.isTop = false;
	    },
	    loopFn:function(){
	    	var section = document.getElementById('section');
	    	this.RequestObj.pageNo += 1;
	    	SZXJ.http(this,'get', appPathList.queryBookClass, this.RequestObj, (response)=>{
	    		if( response.data.bookInfo !== null ){
	    			this.numBer = response.data.bookInfo.length;
	    			console.log(this.numBer);
	    		}		
	    		for( var i =0 ; i < this.numBer ; i++ ){
	    			this.bookInfo.push(response.data.bookInfo[i]);
	    		}  
	     	});
	    },
	    getValueFn:function(){
	       var data = {};
	       SZXJ.http(this,'get', appPathList.queryBookType, data, (response)=>{
	                this.typeName = response.data;
	                this.obj.sort = response.data;
	        });
	       SZXJ.http(this,'get', appPathList.queryBookClass, this.RequestObj, (response)=>{
	                this.bookInfo = response.data.bookInfo;
	                this.totalPage =response.data.totalPage;
	       });
	       this.windowFlag = false;
	       this.$nextTick(function(){
	         this.displayFlag = true;
	         var  This = this;
	         if(document.getElementById("loading")){
		         setTimeout(function(){
		            document.body.removeChild(document.getElementById("loading"));
		         },300)
		      }
	       });
	    },
	},
  	head: function(){
  		return {
  			title: '二级分类-QC轻小说',
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
	
	body{background-color:#f4f4f4}
	.classSec .content{max-width: 7.5rem;overflow-x: hidden;margin:0 auto;margin-top: 0.88rem;}
	.classSec .content .booklist{padding: .20rem 0 0 .36rem;background-color:#fff}
	.classSec .content .booklist .bookimg{width:1.8rem;height:2.52rem;background-color:#adff2f;display:inline-block;margin-right:.14rem;vertical-align:top}
	.classSec .content .booklist .attribute{display:inline-block;width:5rem;height:2.52rem;position:relative}
	.classSec .content .booklist .attribute .bookname{font-size:25px;margin-bottom:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}
	.classSec .content .booklist .attribute .authorImg{font-size:0}
	.classSec .content .booklist .attribute .authorImg img{vertical-align:TOP;margin-right:5px;width:20px;height:20px}
	.classSec .content .booklist .attribute .authorImg span{font-size:16px;line-height:20px;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:40%}
	.classSec .content .booklist .attribute .briefSec{font-size:20px;color:rgba(0,0,0,.4);margin-bottom:.1rem;line-height:1.5;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;margin-top:.1rem}
	.classSec .content .booklist .attribute .author{position:absolute;bottom:2px;width:100%}
	.classSec .content .booklist .attribute .author .info{width:1rem;display:inline-block}
	.classSec .content .booklist .attribute .author img{margin-right:.1rem;vertical-align:middle;width:.2rem;height:.2rem}
	.classSec .content .booklist .attribute .author span{font-size:.28rem;vertical-align:middle;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;margin-right:1%}
	.classSec .content .booklist .attribute .author .authorBox{width:25%;display:inline-block;vertical-align:middle;overflow:hidden;text-overflow:ellipsis}
	.classSec .content .booklist .attribute .author .booknameSec{font-size:.28rem;vertical-align:middle;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:.8rem;display:inline-block;margin-right:1%;line-height:.32rem}
	.classSec .content .booklist .hr{background-color:#ECECEC;width:80%;height:1px;margin-left:20%;margin-top:.2rem}
	.classSec .content .window{width:100%;height:100%;z-index:9}
	.classSec .content .window .windowbackground{background-color:rgba(0,0,0,.2);z-index:15;position:fixed;top:0;left:0;width:100%;height:100%}
	.classSec .content .window .windowcentent{position:absolute;right:0;top:0;height:100%;box-shadow:-.05rem 0 .05rem rgba(0,0,0,.1);background-color:#fff;width:60%;z-index:99999}
	.classSec .content .window .windowcentent .windowtitle{position:fixed;right:0;top:0;padding:15px 0;background-color:#4cbbe9;text-align:center;font-size:24px;width:60%;color:#fff;box-shadow:none!important}
	.classSec .content .window .windowcentent .choose{background-color:#fff;box-shadow:none!important;position:fixed;top:54px;bottom:59px;overflow:auto}
	.classSec .content .window .windowcentent .choose .choosecentent{padding:10px 5% 0 5%;box-shadow:none!important}
	.classSec .content .window .windowcentent .choose .choosecentent .choosetitle{font-size:14px;font-weight:400;padding-left:3%;box-shadow:none!important}
	.classSec .content .window .windowcentent .choose .choosecentent .frame{padding-left:5px;padding-top:5px;box-shadow:none!important}
	.classSec .content .window .windowcentent .choose .choosecentent span{font-size:20px;padding:2px 5px;border-radius:4px;border:1px solid rgba(0,0,0,.35);display:inline-block;color:#777;margin-right:5px;margin-top:5px;box-shadow:none!important}
	.classSec .content .window .windowcentent .choose .choosecentent .active{color:#4cbbe9;border:1px solid #4cbbe9}
	.classSec .content .window .windowcentent .choose .choosecentent .hr{border:1px solid rgba(0,0,0,.055);width:80%;margin-top:5%;margin-left:20%}
	.classSec .content .window .windowcentent .trueBlock{position:fixed;width:60%;bottom:0;background-color:#FFF}
	.classSec .content .window .windowcentent .trueBlock .true{margin:10px auto;margin-bottom: 20px;background-color:#4cbbe9;padding:5px 10px;border-radius:2rem;text-align:center;color:#fff;width:60%;font-size:19px;box-shadow:none!important}
	.classSec .content .top{width:.8rem;box-shadow:0 0 .03rem .03rem rgba(0,0,0,.1);position:fixed;right:10%;bottom:20%;border-radius:100rem;z-index:9999}
	@media (min-width:320px) and (max-width:359px){
	.classSec .content .window .windowcentent .windowtitle{padding:10px 0;font-size:18px}
	.classSec .content .window .windowcentent .choose{top:38px;bottom:54px}
	.classSec .content .window .windowcentent .trueBlock .true{font-size:14px;}
	.classSec .content .booklist .attribute .bookname{font-size:14px}
	.classSec .content .booklist .attribute .authorImg{font-size:0}
	.classSec .content .booklist .attribute .authorImg span{font-size:12px;line-height:14px}
	.classSec .content .booklist .attribute .authorImg img{height:13px;width:13px}
	.classSec .content .booklist .attribute .briefSec{font-size:12px}
	.classSec .content .window .windowcentent .choose .choosecentent span{font-size:12px}
	.classSec .content .window .windowcentent .choose .true{font-size:12px}
	}
	@media (min-width:360px) and (max-width:598px){
	.classSec .content .window .windowcentent .windowtitle{padding:10px 0;font-size:18px}
	.classSec .content .window .windowcentent .choose{top:38px;bottom:54px}
	.classSec .content .window .windowcentent .trueBlock .true{font-size:14px;}
	.classSec .content .booklist .attribute .bookname{font-size:16px}
	.classSec .content .booklist .attribute .authorImg{font-size:0}
	.classSec .content .booklist .attribute .authorImg span{font-size:14px;line-height:16px}
	.classSec .content .booklist .attribute .authorImg img{height:15px;width:15px}
	.classSec .content .booklist .attribute .briefSec{font-size:14px}
	.classSec .content .window .windowcentent .choose .choosecentent span{font-size:14px}
	}
</style>
<template>
	<div class="class-body">
	    <alert ref="alert"></alert>
	    <myheader></myheader>
	    <div class="class-content" style="min-height: 700px;">
			<div class="class-title">
				<div class="class-title-line">
				  <label class="class-label">排序:</label>
				  <div class="pull-left">
				<span @click="newbookFn(obj.id)" :class="RequestObj.sort == obj.id ? 'active':''" v-for="obj in obj.newBook">{{obj.name}}</span>
				  </div>
				  <ol class="pull-right vertical-transverse">
				<li v-if="hengshuId == 2" @click="setHengshu(1)"><img :src="path.ImagePath + '/img/class1-1.png'" /></li>
				<li v-if="hengshuId == 2" ><img :src="path.ImagePath + '/img/class2-2.png'" /></li>
				<li v-if="hengshuId == 1" ><img :src="path.ImagePath + '/img/class1-2.png'" /></li>  
				<li v-if="hengshuId == 1" @click="setHengshu(2)"><img :src="path.ImagePath + '/img/class2-1.png'" /></li>
				  </ol>
				</div>
				<div class="class-title-line">
				  <label class="class-label" >分类:</label>
				  <ul class="class-label-ul">
			     	<li :class="RequestObj.bookTypeId == obj.bookTypeId ? 'active':''" @click="sortFn(obj.bookTypeId)" v-for="obj in obj.sort">{{obj.bookTypeName}}</li>
				  </ul>
				</div>
				<div class="class-title-line">
				  <label class="class-label">字数:</label>
				  <ul class="class-label-ul">
				<li @click="fontsizeFn(obj.min, obj.max, obj.id)" :class="fontsizeId == obj.id ? 'active':''"  v-for="obj in obj.fontsize">{{obj.name}}</li>
				  </ul>
				</div>
				<div class="class-title-line">
				  <label class="class-label" >签约:</label>
				  <div class="pull-left">
				<span @click="qianyueFn(obj.id)" :class="RequestObj.isSign === obj.id ? 'active': ''"  v-for="obj in obj.qianyue">{{obj.name}}</span>
				  </div>
				  <div class="pull-right relative">
				<input type="text" class="class-btn-search-input" v-model="RequestObj.Keyword" />
				<i class="class-search-img"></i><a class="btn class-btn-search" @click="getValueFn">搜索</a>
				  </div>
				</div>
			</div>
	      	<div v-if="bookInfo.length === 0" style="height: 420px;text-align: center;margin-top: 30px;padding-top: 50px;border-top: 1px solid #999999;" >没有内容</div>
	      	<ul id="transverse" v-if="hengshuId === 2" >
		      	<li class="line active" v-for="(obj, index) in bookInfo">
		          <img class="line-img pull-left" 	v-if="obj.bookCoverImage" 
		          	:src="path.ImagePath + '/img/z-imgBj.jpg'" @load="szxj.loadImg( obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)"          	
		          	 @click="gotoBook(obj.bookId)">          	 
		          <img @click="gotoBook(obj.bookId)" v-else class="line-img pull-left">
		          <span v-if="obj.bookIsSign == 1 " class="update"><img :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></span>
		          <div class="pull-left line-content">
		            <p class="p" :title="obj.bookName" @click="gotoBook(obj.bookId)">{{ obj.bookName }}&nbsp;</p>
		            <div class="div">
		              <span class="span" :title="obj.author"><label>作者:</label>{{obj.author}}</span>
		              <span class="span" :title="obj.bookCoverImage"><label>画师:</label></span>
		              <span class="span" :title="obj.bookWordCount"><label>字数:</label>{{ obj.bookWordCount }}</span>
		              <span class="span" :title="obj.bookHit"><label>人气:</label>{{ obj.bookHit }}</span>
		            </div>
		            <p class="p-2" ::title="obj.bookIntroduction">
		              <label>简介:</label>{{obj.bookIntroduction }}&nbsp;</p>
		            <div class="div">
		              <span class="span_new" :title="'最新卷:'+obj.volumeEntity.volumeName"><label>最新卷:</label>{{obj.volumeEntity.volumeName}}</span>
		              <span class="span" :title="'最新更新:'+szxj.getLocalTime(obj.bookUpdate / 1000)" style="width: 240px;">
		              	<label>最新更新:</label>{{szxj.getLocalTime(obj.bookUpdate / 1000)}}
		              </span>
		            </div>
		          </div>
		        </li>
	      	</ul>
	      	<ul id="vertical" v-if="hengshuId === 1">
		        <li class="line-vertical" v-for="(obj, index) in verticalBoookInfo" v-model="verticalBoookInfo[index]">
		        	<ul>
		        		<li v-for="temp in obj">
		        			<div class="vertical-img" @click="gotoBook(temp.bookId)">
		        				<img :src="path.ImagePath + '/img/z-imgBj.jpg'" @load="szxj.loadImg(temp.bookCoverImage ? path.ImageBookPath + temp.bookCoverImage: '', $event)"  class="cover" />
		        				<div v-if="temp.bookIsSign == 1 " class="update_Tow"><img :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></div>
		        				<div class="vertical-img-line">
		        					<img :src="path.ImagePath + temp.userHeadImg " />
		        					<div class="vertical-Author-name vertical-hover">{{temp.author}}</div>
		        					<div class="vertical-font-size vertical-hover"><label>字数:</label>{{ temp.bookWordCount }}</div>
		        					<div class="vertical-click-size vertical-hover"><label>点击:</label>{{ temp.bookHit }}</div>
		        					<div class="vertical-collection-size vertical-hover"><label>收藏:</label>{{ temp.bookCollect}}</div>
		        					<div class="vertical-a-reward vertical-hover"><label>打赏:</label>{{ temp.bookCopperCoins}}</div>
		        				</div>
		        			</div>
		        			<div class="vertical-title" :title="temp.bookName" @click="gotoBook(temp.bookId)">{{ temp.bookName }}</div>
		        		</li>
		        	</ul>	
		        </li>
	        </ul>
	      	<div id="page" class="page">
		      	<ul>
		      		<li class="btn" @click="setPage((RequestObj.pageNo - 1) >= 1 ? (RequestObj.pageNo - 1) : 1)"><a>上一页</a></li>
		      		<li v-if="((index + 1) <= 5 && RequestObj.pageNo < 3 || ((index + 1) > RequestObj.pageNo - 3 &&  index < RequestObj.pageNo)) || ( ((index + 1) <= RequestObj.pageNo + 2 &&　(index + 1) > RequestObj.pageNo) || (RequestObj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" 
		      		  :class="objTemp == RequestObj.pageNo? 'active':''" v-for="(objTemp, index) in page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
		      		<li class="btn" @click="setPage((RequestObj.pageNo + 1) <= obj.pageCount ? (RequestObj.pageNo + 1) : obj.pageCount)"><a>下一页</a></li>
		      		<li class="goto">
		      			<input type="text" v-model="pageNo" style="text-align: center;"/>
		      			<span>{{ RequestObj.pageNo }}/{{ obj.pageCount }}</span>
		      			<a class="btn" @click="setPage(pageNo)">转页</a>
		      		</li>
		      	</ul>
	      	</div>
	    </div>
  	<myfooter></myfooter>
</div>
</template>
<script>
import Header from '~/components/Header'	
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
export default {
	components:{
		'alert': Alert,
		'myheader':Header,
		'myfooter':Footer
	},
	data : function() {
		return {
			bodyFlag: false,
	        pageNo: '',
	        szxj: SZXJ,
	        path: PathList,
	        hengshuId: 2, // 横竖显示
	        fontsizeId: 0,
	        bookTypeClass:[],
	        verticalBoookInfo: [],
	        page: [],
	        bookInfo:[],
	        RequestObj: {
		        sort: 0, // 排序 ： id
		        bookTypeId: '', // 分类 id
		        wordMin: 0,
		        wordMax: '',
		        isSign: 0,
		        Keyword: '', // 搜索的书名
		        pageNo: 1, // 页码
		        pageSize: 10,
	        },
        	obj: {}
		}
	},
	asyncData:function(){
		return axios.get(PathList.queryBookType).then(function(res){
			var obj={
			    newBook: [{name: '最新', id: 0} ,{name: '最热', id: 1} ],
			    sort:[], // 分类
			    fontsize:[
			     {name: '全部', min: 0, max: '' , id : 0 }
			    ,{name: '10万字以下', min: 0, max: 100000 , id : 1 }
			    ,{name: '10-30万字', min: 100000, max: 300000 , id : 2 }
			    ,{name: '50-100万字', min:500000, max: 1000000  , id : 3 }
			    ,{name: '一百万字以上', min: 1000000, max: ""  , id : 4 }
			    ], // 字数
			    qianyue:[{name: '精品作品', id: 0},{name: '签约作品', id: 1}], // 签约 
			    hengshu:[{name: '横', id: 1},{name: '竖', id: 2}], // 横竖
			    value: '', // 搜索的书名
			    p: 1, // 页码
			    n: 12,
			    pageCount: 0,
		    };
			var temp = {}; 
			obj.sort = res.data;
			temp.bookTypeName = '全部'
      temp.bookTypeId = '';
      temp.bookTypeDescription = '';
      obj.sort.unshift(temp);
      return {
      	'obj':obj
      }
		})
	},
    mounted: function () { // ready -->
	    this.$nextTick(function () {
	  		this.bodyFlag = true;
	  		
	        if (localStorage.getItem('hengshuId')) {
	          this.hengshuId = parseInt(localStorage.getItem('hengshuId'), 10);
	        } else {
	          this.hengshuId = 2;
	        }
	        if (SZXJ.getQueryString('id')) {
	          this.RequestObj.bookTypeId = SZXJ.getQueryString('id');
	        }
//	        SZXJ.http(this,'get', PathList.queryBookType, {}, (response) => {
//	          this.obj.sort = response.data;
//	          var temp = {};          
//	          temp.bookTypeName = '全部'
//	          temp.bookTypeId = '';
//	          temp.bookTypeDescription = '';
//	          this.obj.sort.unshift(temp);
//	        });
//          console.log(this.obj);
	        this.getValueFn(); 
	  })
	},
	methods: {
		gotoBook: function(id) {
            location.href = this.path.TemprootPath + '/catalog/' + id;
        },
        setPageCount: function(v) {
	        this.obj.pageCount =  v;
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
        setHengshu: function(v) { // 横竖切换显示
            localStorage.setItem('hengshuId', v);
            this.hengshuId = v;
        },
        getValueFn: function() {
          this.verticalBoookInfo = [];
          this.bookInfo = [];
        	SZXJ.http(this,'get', PathList.queryBookClass, this.RequestObj, (response) => {
	          	this.bookInfo = response.data.bookInfo;
	            if (!response.data.bookInfo) {
              		this.bookInfo=[];
	                this.verticalBoookInfo=[];
	                this.setPageCount(1);
	                return;
	            }
	            var arr = [];
	            if (response.data.bookInfo.length % 4 === 0) {
		            for (var i = 1; i <= response.data.bookInfo.length;i++) {
		                arr.push(response.data.bookInfo[i - 1]);
		                if (i % 4 === 0) {
		                    this.verticalBoookInfo.push(arr);
		                    arr = [];
		                }
		            }
	            } else {
	            	arr.push(response.data.bookInfo[i - 1]);
		            for (var i = 1; i <= response.data.bookInfo.length;i++) {
		                if (i % 4 === 0) {
		                    this.verticalBoookInfo.push(arr);
		                    arr = [];
		                }
		                if (i === response.data.bookInfo.length) {
		                    this.verticalBoookInfo.push(arr);
		                }
		            }
	            }
	            this.setPageCount(response.data.totalPage);
	        });
        },
        sortFn: function(id) {
          this.RequestObj.bookTypeId = id;
          this.getValueFn(); // 请求
        },
        newbookFn: function(id) { // 排序方法
          this.RequestObj.sort = id;
          this.getValueFn();
        },
        fontsizeFn: function (min, max, id) { // 请求字数区间的
          this.fontsizeId = id;
          this.RequestObj.wordMin = min;
          this.RequestObj.wordMax = max;
          this.getValueFn();
        },
        qianyueFn: function(id) { // 签约与否的
          this.RequestObj.isSign= id;
          this.getValueFn();
        }
	},
	head: function(){
		return {
			title: '分类页-QC轻小说',
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
		    	{ rel: 'stylesheet', href: '/css/jquery-ui.min.css' },
		    	{ rel: 'stylesheet', href: '/css/LOgin.css' }
	  		],
	  		script:[
		  	    {src:"/lib/browserRedirect.js"}
		  	]
	  	}
  	}
}
</script>

<style scoped>
	
	
</style>


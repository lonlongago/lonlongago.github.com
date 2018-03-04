<template>
<div id="cla">
	<script src="/lib/resize_320.js"></script>
	<div class="choice">
		<div class="updat" @click="tranFn(0)">
			<span :class="allBol ? 'upthree' : 'upchotwo'">更新时间</span>
		</div>
		<div class="updat" @click="tranFn(1)">
			<span :class="alltBol ? 'upthree' : 'upchotwo'">点击数量</span>
		</div>
		<div class="updat" @click="tranFn(2)">
			<span :class="allthBol ? 'upthree' : 'upchotwo'">收藏数量</span>
		</div>
	</div>
	<div class="opti">
		<div class="optwo" @click="boktyFn">
			<span :class="selBol1 ? 'tit' : 'tit2'">分类</span>
		</div>
		<div class="opone" @click="wordFn">
			<span>字数</span>
		</div>
		<div class="opone" @click="signFn">
			<span>签约</span>
		</div>
		<div class="opone" @click="screenFn">
			<span>筛选</span>
		</div>
	</div>
	<div style="position: absolute; left: 0; right: 0; top: 0.635rem; bottom: 0;-webkit-overflow-scrolling: touch;">
	    <div id="pullrefresh" class="allbook mui-content mui-scroll-wrapper" v-if="bookflag" ref="allbooks">
			<div class="mui-scroll">
			    <div class="cov mui-table-view mui-table-view-chevron">
					<div class="books btn" v-for="obj in bookList" @tap="gotoFn(obj.bookId,obj.bookName)">
						<div class="bokimg">
							<img :src="path.imagePath + obj.bookCoverImage" alt="" />
						</div>
						<div class="conte">
							<div class="bokname">{{obj.bookName}}</div>
							<div style="height: .4rem; display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: -webkit-box;display: flex;-webkit-box-align: center;-moz-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;-webkit-box-pack: center;-moz-box-pack: center;-ms-flex-pack: center;">
	           					<div class="bookcont">{{obj.bookIntroduction}}</div>
							</div>
							<div class="allbok">
								<div class="part_icon">
				                  <img src="http://cdn.qcacg.com/mobile/img/app_ranking/my.png" />
				                </div>
								<div class="nam">{{obj.author}}</div>
								<div class="boktype">
									<span v-for="(temp,index) in obj.bookTypeEntitys" v-if="index < 3">{{temp.bookTypeName}}</span>
								</div>
							</div>
						</div>
					</div>
			    </div>
			</div>
		</div>
		<div id="pullrefresh" class="openbook mui-content mui-scroll-wrapper" v-else ref="allbooks">
		<div class="cov mui-scroll">
			<div class="albok mui-table-view mui-table-view-chevron">
				<div class="bokone" v-for="obj in bookList" @tap="gotoFn(obj.bookId,obj.bookName)">
					<div class="imgbk">
						<img :src="path.imagePath + obj.bookCoverImage" alt="" />
					</div>
					<div class="bknam">
						<span>{{obj.bookName}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
    <div class="cls" v-if="boktype">
		<span class="bkall" @click="bTyFn('')"><span :class="RequestObj.bookTypeId == '' ? 'primary' : 'default'">全部</span></span>
		<span class="bkall" v-for="(obj,index) in Robj.sort" @click="bTyFn(obj.bookTypeId)"><span :class="RequestObj.bookTypeId == obj.bookTypeId ? 'primary' : 'default'">{{obj.bookTypeName}}</span></span>
	</div>
	<div class="word" v-if="wNumflag">
		<span v-for="obj in Robj.fontsize" @click="wNuFn(obj.id,obj.min,obj.max)" :class="fontNumId == obj.id ? 'primaryui' : 'defaultui'">{{obj.name}}</span>
	</div>
	<div class="sig" v-if="sigflag">
		<span v-for="obj in Robj.works" @click="sigFn(obj.id)" :class="RequestObj.isSign == obj.id ? 'primarytwo' : 'defaulttwo'">{{obj.name}}</span>
	</div>
	<div class="screen" v-if="scrflag">
		<div class="scr">
			<h4>筛选</h4>
		</div>
		<div class="scrclass">
			<div class="scrc">
				<span>分类:</span>
			</div>
			<div class="scrtwo">
				<span :class="RequestObj.bookTypeId == '' ? 'primaryone' : 'defaultone'" @click="bTyoneFn('')">全部</span>
				<span :class="RequestObj.bookTypeId == obj.bookTypeId ? 'primaryone' : 'defaultone'" v-for="obj in Robj.sort" @click="bTyoneFn(obj.bookTypeId)">{{obj.bookTypeName}}</span>
			</div>
		</div>
		<div class="scrwor">
			<div class="scrwonum">
				<span>字数:</span>
			</div>
			<div class="scrthree">
				<span v-for="obj in Robj.fontsize" @click="wNuoneFn(obj.id,obj.min,obj.max)" :class="fontNumId == obj.id ? 'primaryone' : 'defaultone'">{{obj.name}}</span>
			</div>
		</div>
		<div class="scrstate">
			<div class="scrsta">
				<span>状态:</span>
			</div>
			<div class="scrfour">
				<span v-for="obj in Robj.works" @click="sigoneFn(obj.id)" :class="RequestObj.isSign == obj.id ? 'primaryone' : 'defaultone'">{{obj.name}}</span>
			</div>
		</div>
		<div class="scrbut">
			<div class="cleanbtn" @click="cleFn">清除</div>
			<div class="okbtn" @click="okFn(RequestObj.bookTypeId,fontNumId,RequestObj.isSign)">确定</div>
		</div>
	</div>
	<transition name="fade">
		<div class="shadow" v-if="shadowBol" @click="closeAll"></div>
	</transition>
	<div class="shad" v-if="shadBol" @click="closeaFn(1)"></div>
	<div class="shad" v-if="shadBol" @click="closeaFn(2)"></div>
</div>
</template>

<script>
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
export default{
	asyncData: function(context){
		var obj = {};
		obj.id = context.params.id;
		return obj;
	},
	data: function(){
		return{
			path:appPathList,
			szxj:SZXJ,
			selBol1:false,
			lisBol:false,
			allBol:false,
			alltBol:true,
			allthBol:true,
			shadowBol:false,
			bookList:[],
			boktype:false,
			wNumflag:false,
			fontNumId:'',
			sigflag:false,
			scrflag:false,
			shadBol:false,
			bookflag:true,
			RequestObj: {
		        sort: 0, // 排序 ： id
		        bookTypeId: '', // 分类 id
		        wordMin: 0,
		        wordMax: '',
		        isSign: 0,
		        Keyword: '', // 搜索的书名
		        pageNo: 1, // 页码
		        pageSize: 12,
	        },
//	        WObj: {
//	        	sort:1,
//				bookTypeId:'',
//				wordMin:0,
//				wordMax:'',
//				isSign:0,
//				Keyword:'',
//				pageNo:1,
//				pageSize:10,
//	        },
	        Robj:{
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
		        scrollHeight:0,
		        clientHeight:0,
		        scrollTop:0,
		        ctrollBol:true,
		        totalPage:50,
		        numBer:0,
		        ws:{},
		        wn:{},
		        view:{},
		        imgIcon:'_www/img/lists.png',
		        mWidth:0
		}
	},
	mounted: function(){
		var self = this;
		if(localStorage.getItem('bookTypeId')){
			self.RequestObj.bookTypeId = localStorage.getItem('bookTypeId');
		}
		if(localStorage.getItem('Keyword')){
			self.RequestObj.Keyword = localStorage.getItem('Keyword');
		}
		if(localStorage.getItem('fontNumId')){
			self.fontNumId = localStorage.getItem('fontNumId');
		}
		if(localStorage.getItem('wordMin')){
			self.RequestObj.wordMin = localStorage.getItem('wordMin');
		}
		if(localStorage.getItem('wordMax')){
			self.RequestObj.wordMax = localStorage.getItem('wordMax');
		}
		if(localStorage.getItem('isSign')){
			self.RequestObj.isSign = localStorage.getItem('isSign');
		}
		this.$nextTick(function(){
			console.log(this.id);
			this.mWidth = window.innerWidth;
			if(19 > this.id > 0){
				this.RequestObj.bookTypeId = this.id;
				this.selBol1 = true;
			}else if(this.id == 19){
				this.RequestObj.bookTypeId=="";
			}else if(this.id == 20){
				this.RequestObj.isSign = 1;
			}
			this.getvalue();
//			this.$refs.allbooks.addEventListener('scroll',this.onScrollFn);
			if(SZXJ.getQueryString('keyword')){
				this.RequestObj.Keyword = SZXJ.getQueryString('keyword');
			}
			if(window.plus){
		        this.plusReady();
		    }else{
		        document.addEventListener('plusready', this.plusReady, false);
		    }
		    var u = navigator.userAgent;
	        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	        var iosOrAndriod = null;
	        if(isAndroid){
	          iosOrAndriod = true;
	          console.log("是安卓手机")
	        }
	        if(isiOS){
	          iosOrAndriod = false;
	          console.log("是苹果手机")
	        }
	        console.log(iosOrAndriod?'circle':'none');
		    mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						style:iosOrAndriod?'circle':'none',//单webview模式的下拉刷新
						callback: pulldownRefresh
				    },
					up: {
						height:50,
						contentremore:'没有更多数据',
						callback: pullupRefresh
					}
				}
			});
			var count = 0;
			/**
			 * 下拉刷新具体业务实现
			 */
			var self = this;
			function pulldownRefresh() {
				setTimeout(function() {
                    count = 0;
                    console.log(count);
                    self.getvalue();
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
				}, 1500);
			}
			/**
			 * 上拉加载具体业务实现
			 */
			function pullupRefresh() {
				setTimeout(function() {
					self.RequestObj.pageNo = self.RequestObj.pageNo + 1;
//					console.log(self.RequestObj.pageNo);
					SZXJ.http(this,'get',appPathList.queryBookClass + '?sort=' + self.RequestObj.sort + '&bookTypeId=' + self.RequestObj.bookTypeId + '&wordMin=' + self.RequestObj.wordMin + '&wordMax=' + self.RequestObj.wordMax + '&isSign=' + self.RequestObj.isSign + '&Keyword=' + self.RequestObj.Keyword + '&pageNo=' + self.RequestObj.pageNo + '&pageSize='+self.RequestObj.pageSize,{},(res)=>{
						var list = res.data.bookInfo;
			            for(var i=0;i<list.length;i++){
			              self.bookList.push(list[i]);
			            }
			            self.totalPage = res.data.totalPage;
			        },function(err){ 
			        })
					console.log(count);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > self.totalPage)); //参数为true代表没有更多数据了。
				}, 100);
			}
		})
	},
	methods:{
		backFn:function(){
	      if(window.plus){
	        this.webviewAnimation();
	      }else{
	        history.back()
	      }
	    },
	    plusReady:function(){
	        var self = this;
	        this.ws = plus.webview.currentWebview();
	        this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
		        console.log('reject url: '+e.url);
		    });
	        this.view = this.ws.getTitleNView();
	        this.ws.setStyle({mask:'none'});
	        this.view.drawBitmap('_www/img/list.png',{top:'0px',left:'0px',width:'100%',height:'100%'}, {top:'10px',left:(self.mWidth-43).toString()+'px',width:'24px',height:'22px'});
//			this.view.setTouchEventRect({top:'0px',left:(self.mWidth-53).toString()+'px',width:'44px',height:'44px'});
			this.view.interceptTouchEvent(true);  //阻止事件透传
			this.view.addEventListener("click", self.lisFn, false);
			plus.key.addEventListener('backbutton', function(){
				self.ws.close("slide-out-right");
//				self.ws.opener().reload();  //webview重新加载
			}, false);
	    },
	    webviewAnimation:function(){
	      this.ws.hide('slide-out-right');
	    },
//		
		lisFn: function(e){
			if(e.clientX<this.mWidth-53){
				return
			}
			var self = this;
			if(this.lisBol){
				this.lisBol = false;
				this.bookflag = true;
                this.imgIcon = '_www/img/list.png'
			}else{
				this.lisBol = true;
				this.bookflag = false;
				this.imgIcon = '_www/img/lists.png'
			}
			this.view.reset();
			this.view.drawBitmap(self.imgIcon,{top:'0px',left:'0px',width:'100%',height:'100%'},{top:'10px',left:(self.mWidth-43).toString()+'px',width:'24px',height:'22px'});
			
		},
		tranFn: function(r){
			if(r == 0){
				this.ctrollBol = true;
				this.RequestObj.sort = r;
				this.getvalue();
				this.allBol = false;
				this.alltBol = true;
				this.allthBol = true;
			}else if(r == 1){
				this.ctrollBol = true;
				this.RequestObj.sort = r;
				this.getvalue();
				this.allBol = true;
				this.alltBol = false;
				this.allthBol = true;
			}else if(r == 2){
				this.ctrollBol = true;
				this.RequestObj.sort = r;
				this.getvalue();
				this.allBol = true;
				this.alltBol = true;
				this.allthBol = false;
			}
		},
		closeaFn: function(w){
			if(w == 1){
				this.boktype = false;
				this.wNumflag = false;
				this.sigflag = false;
				this.shadowBol = false;
			}else if(w == 2){
				this.scrflag = false;
				this.boktype = false;
				this.shadowBol = false;
				this.wNumflag = false;
				this.sigflag = false;
				this.shadBol = false;
			}
		},
		closeAll: function(){
			this.shadowBol = false;
			this.boktype = false;
			this.wNumflag = false;
			this.sigflag = false;
			this.scrflag = false;
		},
		bTyFn: function(num){
			console.log(num);
			if(num == ''){
				this.selBol1 = false;
			}
			this.RequestObj.bookTypeId = num;
			this.RequestObj.Keyword = '';
			localStorage.setItem('bookTypeId',this.RequestObj.bookTypeId);
			localStorage.setItem('Keyword',this.RequestObj.Keyword);
			console.log(localStorage.getItem('bookTypeId'));
			console.log(localStorage.getItem('Keyword'));
			this.ctrollBol = true;
			this.getvalue();
			this.closeAll();
		},
		bTyoneFn: function(num){
			console.log(num);
			if(num == ''){
				this.selBol1 = false;
			}else if(num != ''){
				this.selBol1 = true;
			}
			this.RequestObj.bookTypeId = num;
			this.RequestObj.Keyword = '';
			this.ctrollBol = true;
			this.closeaFn(1);
		},
		wNuFn: function(id,min,max){
			this.fontNumId = id;
			this.RequestObj.wordMin = min;
			this.RequestObj.wordMax = max;
			localStorage.setItem('fontNumId',this.fontNumId);
			localStorage.setItem('wordMin',this.RequestObj.wordMin);
			localStorage.setItem('wordMax',this.RequestObj.wordMax);
			console.log(localStorage.getItem('fontNumId'));
			console.log(localStorage.getItem('wordMin'));
			console.log(localStorage.getItem('wordMax'));
			this.ctrollBol = true;
			this.getvalue();
			this.closeAll();
		},
		wNuoneFn: function(id,min,max){
			this.fontNumId = id;
			this.RequestObj.wordMin = min;
			this.RequestObj.wordMax = max;
			this.ctrollBol = true;
			this.closeaFn(1);
		},
		sigFn: function(id){
			this.RequestObj.isSign = id;
			localStorage.setItem('isSign',this.RequestObj.isSign);
			console.log(localStorage.getItem('isSign'));
			this.ctrollBol = true;
			this.getvalue();
			this.closeAll();
		},
		sigoneFn: function(id){
			this.RequestObj.isSign = id;
			this.ctrollBol = true;
			this.closeaFn(1);
		},
		screenFn: function(){
//			if(this.scrflag){
//				this.scrflag = false;
//				this.shadBol = false;
//				this.closeaFn(2);
//			}else{
//				this.scrflag = true;
//				this.shadowBol = false;
//				this.shadBol = true;
//				this.boktype = false;
//				this.wNumflag = false;
//				this.sigflag = false;
//			}
			if(window.plus){
				this.ws.setStyle({mask:'rgba(0,0,0,0.5)'});
				var self = this;
				this.ws.addEventListener('maskClick', function(){
					console.log("点击遮罩层")
					self.ws.setStyle({mask:'none'});
					self.wn.hide("slide-out-right");
				},false);
				console.log("显示遮罩层");
				this.wn = plus.webview.create(appPathList.netWorks+'/screen','screen',
	            {
			      'popGesture':'close',
			      'titleNView':{'backgroundColor':'#ffffff','titleText':"筛选",'titleColor':'#000000','autoBackButton':false,titleOverflow:'ellipsis',splitLine:{color:'#C3C3C3'}},
			      'statusbar':{'background':'#ffffff'},
			      'left':'12%'
		        });
		        this.wn.onloading= function(){
					plus.nativeUI.showWaiting();
				}
				this.wn.onloaded=function(){
					plus.nativeUI.closeWaiting();
				}
		        this.wn.show('slide-in-right');
			}
		},
		signFn: function(){
			if(this.sigflag){
				this.closeAll();
			}else{
				this.sigflag = true;
				this.shadowBol = true;
				this.boktype = false;
				this.wNumflag = false;
				this.scrflag = false;
			}
		},
		wordFn: function(){
			if(this.wNumflag){
				this.closeAll();
			}else{
				this.wNumflag = true;
				this.shadowBol = true;
				this.boktype = false;
				this.sigflag = false;
				this.scrflag = false;
			}
		},
		boktyFn: function(){
			if(this.boktype){
				this.closeAll();
			}else{
				this.boktype = true;
				this.selBol1 = true;
				this.shadowBol = true;
				this.wNumflag = false;
				this.sigflag = false;
				this.scrflag = false;
			}
		},
		okFn: function(a,b,c){
			console.log(a);
			console.log(b);
			console.log(c);
			this.scrflag = false;
			this.shadBol = false;
			this.ctrollBol = true;
			this.getvalue();
		},
		cleFn: function(){
			this.RequestObj.bookTypeId = '';
			this.RequestObj.wordMin = 0;
			this.RequestObj.wordMax = '';
			this.fontNumId = 0;
			this.RequestObj.isSign = 0;
			this.scrflag = false;
			this.shadBol = false;
			this.ctrollBol = true;
			this.selBol1 = false;
			this.getvalue();
			console.log(this.RequestObj.bookTypeId);
			console.log(this.fontNumId);
			console.log(this.RequestObj.isSign);
		},
		gotoFn: function(a,bookName){
		  if(window.plus){
	        if(plus.webview.getWebviewById('book')){
	          this.wn = plus.webview.getWebviewById('book');
	          this.wn.loadURL(appPathList.netWorks+'/book/'+a);
	        }else{
	          this.wn = plus.webview.create(appPathList.netWorks+'/book/'+a,'book',
	          {
			      'popGesture':'close',
			      'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,'titleColor':'#000000','autoBackButton':true,titleOverflow:'ellipsis',splitLine:{color:'#C3C3C3'}},
			      'statusbar':{'background':'#ffffff'},
			      "backButtonAutoControl":'close'
		        });
	        }
	        this.wn.onloading= function(){
				plus.nativeUI.showWaiting();
			}
			this.wn.onloaded=function(){
				plus.nativeUI.closeWaiting();
			}
	        this.wn.show('slide-in-right');
	      }else{
//	        location.href = "/mView/book/" + a;
	      }
		},
//		uptimFn: function(){
//			SZXJ.http(this,'get',appPathList.queryBookClass,this.WObj,(response)=>{
//				self.bookList = response.data.bookInfo;
//				self.totalPage = response.data.totalPage;
//				console.log(this.totalPage);
//				console.log(this.bookList);
//			});
//		},
		getvalue: function(){
			var self = this;
			self.RequestObj.pageNo = 1;
			SZXJ.http(this,'get',appPathList.queryBookClass,this.RequestObj,(response)=>{
				self.bookList = response.data.bookInfo;
				self.totalPage = response.data.totalPage;
				console.log(this.totalPage);
				console.log(this.bookList);
			});
			SZXJ.http(this,'get',appPathList.queryBookType,{},(response)=>{
				self.Robj.sort = response.data;
			})
		},
	},
	head: function(){
		return{
			title:'分类-QC轻小说',
			meta:[
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说分类"},
		        { name: "keywords",content:"轻小说分类"},
			],
			link: [
		        { rel: 'stylesheet', href: '/css/main_app.css' },
		        { rel: 'stylesheet', href: '/css/mui.min.css'}
		    ],
		    script:[
		        {src:"/lib/resize_320.js"},
		        {src:"/js/mui.min.js"}
		    ]
		}
	},
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin: 0;padding: 0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;}
	#cla{position: absolute; left: 0; right: 0; top: 0; bottom: 0;}
	.mui-table-view {background-color: #f2f2f2 !important;}
	.bkall{text-align:center;width:25%;display: inline-block;}
	.tp{height: .171rem;background: white;z-index: 99;position: fixed;width: 100%;}
	.btn{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}
	.btn:hover{outline:0;cursor:pointer}
	.btn:focus{outline:0;cursor:pointer}
	.btn:active{-webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0);box-shadow:inset 0 0 1px rgba(0,0,0,0)}
	.tit{color: #FEDC6F;font-size: .12rem;height: .316rem;line-height: .316rem;padding-right: .1rem;background-image: url(http://cdn.qcacg.com/mobile/img/yellowto.png);background-repeat: no-repeat;background-size: 0.101rem 0.064rem;background-position: right center;}
	.tit2{font-size: .12rem;height: .316rem;line-height: .316rem;padding-right: .1rem;background-image: url(http://cdn.qcacg.com/mobile/img/downto.png);background-repeat: no-repeat;background-size: 0.101rem 0.064rem;background-position: right center;color: #656565;}
	.optwo{width: 25%;height: 100%;text-align: center;display: inline-block;}
	#cla .top{width: 100%;height: .376rem;position: fixed;background: white;z-index: 99;top: .171rem;}
	.top:after{height: .0072rem;left: 0;right: 0;position: absolute;content: '';bottom: 0;background: #C3C3C3;}
	#cla .top .back{left: .128rem;width: .085rem;height: .137rem;top: .12rem;position: absolute;}
	#cla .top span{font-size: .154rem;font-family:"微软雅黑";height: .376rem;padding: .111rem 0;box-sizing: border-box;text-align: center;display: block;}
	#cla .top .listone{background-image: url(http://cdn.qcacg.com/mobile/img/lists.png);background-repeat: no-repeat;background-size: 0.171rem 0.1536rem;background-position: center;width: 0.171rem;height: 0.1536rem;position: absolute;right: .128rem;top: .1112rem;}
	#cla .top .listtwo{background-image: url(http://cdn.qcacg.com/mobile/img/list.png);background-repeat: no-repeat;background-size: 0.171rem 0.1536rem;background-position: center;width: 0.171rem;height: 0.1536rem;position: absolute;right: .128rem;top: .1112rem;}
	#cla .choice{height: .316rem;width: 100%;border-bottom: .01rem solid #C3C3C3;position: fixed;z-index: 99;top:0;background: #fafafa;display: -webkit-box;}
	#cla .choice .updat{height: 100%;text-align: center;-webkit-box-flex: 1;}
	#cla .choice .updat span{font-size: .12rem;height: .316rem;line-height: .316rem;padding-right: .1rem;}
	#cla .choice .updat .upchotwo{background-image: url(http://cdn.qcacg.com/mobile/img/order.png);background-position: right center;background-size: 0.077rem 0.12rem;background-repeat: no-repeat;color: #fedc6f;}
	#cla .choice .updat .upthree{color: #656565;}
	#cla .opti{height: .316rem;width: 100%;background: #fafafa;box-shadow: 0 0.01707rem 0.01707rem #c3c3c3;position: fixed;z-index: 99;top: .316rem;}
	#cla .opti .opone{width: 25%;height: 100%;text-align: center;display: inline-block;}
	#cla .opti .opone span{color:#656565;font-size: .12rem;height: .316rem;line-height: .316rem;padding-right: .1rem;background-image: url(http://cdn.qcacg.com/mobile/img/downto.png);background-repeat: no-repeat;background-size: 0.101rem 0.064rem;background-position: right center;}
	#cla .allbook{}
	.cov{}
	#cla .allbook .books{height: 1.13rem;width: 100%;padding: .12125rem;box-sizing: border-box;background: white;margin-top: 1px;}
	#cla .allbook .books .bokimg{width: 23%;height: .8875rem;display: inline-block;margin-right: .128rem;vertical-align: top;}
	#cla .allbook .books .bokimg img{width: .6485rem;height: .8875rem;border-radius: .03413rem;background: wheat;border: 1px solid #F2F2F2;}
	#cla .allbook .books .conte{height: .8875rem;width: 72%;display: inline-block;vertical-align: top;}
	#cla .allbook .books .conte .bokname{color:#656565;line-height:1.2;font-size: 0.128rem;margin-bottom: 0.11rem;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;}
	#cla .allbook .books .conte .bookcont{color:#989898;line-height: 1.8;font-size: 0.1109rem;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	#cla .allbook .books .conte .allbok{margin-top: 0.1024rem;}
	#cla .allbook .books .conte .allbok .nam{display: inline-block;width: 40%;font-size: 0.1109rem;box-sizing: border-box;vertical-align: bottom;height: 0.128rem;padding-top: 0.02rem;color: #989898;text-overflow: ellipsis;overflow: hidden;white-space: pre;}
	#cla .allbook .books .conte .allbok .boktype{display: inline-block;width: 50%;vertical-align: bottom;text-align: right;height: 0.128rem;}
	#cla .allbook .books .conte .allbok .boktype span{font-size: 0.1024rem;padding: 0.0048rem 0.0156rem 0.0034rem;border: 1px solid #c3c3c3;border-radius: 2px;margin-left: 0.019rem;color: #989898;display: inline-block;}
	#cla .openbook{padding: .03rem;}
	#cla .openbook .albok{width: 100%;margin-bottom: .1rem;padding-top: .128rem;}
	#cla .openbook .albok .bokone{width: 32.8%;height: 1.57rem;box-sizing: border-box;display: inline-block;text-align: -webkit-center;vertical-align: top;}
	#cla .openbook .albok .bokone .imgbk{width: .896rem; height: 1.254rem;}
	#cla .openbook .albok .bokone .imgbk img{width: .896rem; height: 1.254rem;border-radius: .064rem;background: wheat;}
	#cla .openbook .albok .bokone .bknam{width: .896rem;/*height: .136rem;*/text-align: center;height: .17rem;}
	#cla .openbook .albok .bokone .bknam span{font-family:"微软雅黑";font-size:.111rem;box-sizing:border-box;padding: .0597rem 0 0 0;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;line-height: 1.1;height: .171rem;}
	#cla .cls{position: fixed;top:.635rem;background-color: #fff;width: 100%;z-index: 22;}
	#cla .word{position: fixed;top:.635rem;background-color: #fff;width: 100%;z-index: 22;}
	#cla .sig{position: fixed;top:.635rem;background-color: #fff;width: 100%;z-index: 22;}
	#cla .screen{position: fixed;width: 88%;right: 0;height: 100%;background: white;z-index: 110;bottom: 0;top: 0;}
	#cla .screen .scr{height: .38rem;border-bottom: .01rem solid #F2F2F2;font-size: .128rem;padding: .124rem .128rem;box-sizing: border-box;}
	#cla .screen .scrclass{height: 1.7rem;width: 100%;border-bottom: .01rem solid #F2F2F2;}
	#cla .screen .scrclass .scrc{height: .325rem;padding: .112rem .128rem;box-sizing: border-box;}
	#cla .screen .scrclass .scrc span{font-size: .101rem;color: silver;}
	#cla .screen .scrclass .scrtwo{height: 1.375rem;}
	.defaultone{margin: .111rem .128rem;display: inline-block;font-family: "微软雅黑";color:rgba(0,0,0,.45);font-size: .111rem;}
	.primaryone{margin: .111rem .128rem;display: inline-block;font-family: "微软雅黑";color:#FFC200;font-size: .111rem;}
	#cla .screen .scrwor{height: .9472rem;width: 100%;border-bottom: .01rem solid #F2F2F2;}
	#cla .screen .scrwor .scrwonum{height: .325rem;padding: .112rem .128rem;box-sizing: border-box;}
	#cla .screen .scrwor .scrwonum span{font-size: .101rem;color: silver;}
	#cla .screen .scrwor .scrthree{height: .6222rem;}
	#cla .screen .scrstate{height: .6315rem;width: 100%;border-bottom: .01rem solid #f2f2f2;}
	#cla .screen .scrstate .scrsta{height: .325rem;padding: .112rem .128rem;box-sizing: border-box;}
	#cla .screen .scrstate .scrsta span{font-size: .101rem;color: silver;}
	#cla .screen .scrstate .scrfour{height: .3065rem;}
	#cla .screen .scrbut{position: absolute;/*bottom: .299rem;*/bottom: .128rem;}
	#cla .screen .scrbut .cleanbtn{font-size:.128rem;height: .2645rem;line-height: .2645rem;border-radius: .05rem;color:white;background:#ffc200;font-family:"微软雅黑";text-align: center;display: inline-block;width: 1.17rem;margin-left: .128rem;}
	#cla .screen .scrbut .okbtn{font-size:.128rem;height: .2645rem;line-height: .2645rem;border-radius: .05rem;color:white;background:#ffc200;font-family:"微软雅黑";text-align: center;display: inline-block;width: 1.17rem;margin-left: .128rem;}
	.default{width:71.4%;text-align:center;color:rgba(0,0,0,.45);font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.0803rem;display: inline-block;}
	.primary{width:71.4%;text-align:center;color:white;background:#ffc200;font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.0803rem;display: inline-block;border-radius: 2rem;}
	.defaultui{text-align:center;color:rgba(0,0,0,.45);font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.1803rem;display: inline-block;}
	.primaryui{text-align:center;color:white;background:#ffc200;font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.1803rem;display: inline-block;border-radius: 2rem;}
	.defaulttwo{color:rgba(0,0,0,.45);font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.45rem;display: inline-block;}
	.primarytwo{color:white;background:#ffc200;font-family:"微软雅黑";padding: 0.0427rem 0.1067rem;font-size: 0.1195rem;margin: 0.1024rem 0.45rem;display: inline-block;border-radius: 2rem;}
	.shadow{position: fixed;top:.635rem;width:100%;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 20;}
	.shad{position: absolute;width:100%;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 100;top: 0;}
	.part_icon{width: 10%;height: 0.128rem;display: inline-block;vertical-align: bottom;}
	.part_icon img{width: 0.1195rem;}
	.more{color:#777;font-size:.128rem;text-align:center;padding:2% 0; position: absolute; bottom: 0.256rem; left: 0; right: 0; background-color: #fff;}
    .more span{display:inline-block;color:#777;margin:0 3%}
    .more .left{width:.25rem;border:.012rem solid #777;display:inline-block;vertical-align:middle}
	.fade-enter-active, .fade-leave-active {
    	transition: opacity .5s;
	}
    .fade-enter, .fade-leave-to {
	    opacity: 0;
	}
</style>
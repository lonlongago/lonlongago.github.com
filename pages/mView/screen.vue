<template>
<div id="screen">
	<script src="/lib/resize_320.js"></script>
	<div class="scralls">
		<div class="scls">
			<div class="clsone">
				<span>分类:</span>
			</div>
			<div class="clstwo">
				<span :class="bookTypeId == '' ? 'primaryone' : 'defaultone'" @click="bTyoneFn('')">全部</span>
				<span :class="bookTypeId == obj.bookTypeId ? 'primaryone' : 'defaultone'" v-for="obj in Robj.sort" @click="bTyoneFn(obj.bookTypeId)">{{obj.bookTypeName}}</span>
			</div>
		</div>
		<div class="scrwor">
			<div class="scrwonum">
				<span>字数:</span>
			</div>
			<div class="scrthree">
				<span v-for="obj in Robj.fontsize" :class="fontNumId == obj.id ? 'primaryone' : 'defaultone'" @click="wNuoneFn(obj.id,obj.min,obj.max)">{{obj.name}}</span>
			</div>
		</div>
		<div class="scrstate">
			<div class="scrsta">
				<span>状态:</span>
			</div>
			<div class="scrfour">
				<span v-for="obj in Robj.works" :class="isSign == obj.id ? 'primaryone' : 'defaultone'" @click="sigoneFn(obj.id)">{{obj.name}}</span>
			</div>
		</div>
		<div class="scrbut">
			<div class="cleanbtn" @click="cleanFn">清除</div>
			<div class="okbtn" @click="sureFn">确定</div>
		</div>
	</div>
</div>
</template>

<script>
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
export default{
	components:{
		
	},
	data : function(){
		return{
			path:appPathList,
			szxj:SZXJ,
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
			ws:{},
			bookTypeId:'',
			Keyword:'',
			fontNumId:'',
			wordMin:0,
			wordMax:'',
			isSign:0,
		}
	},
	mounted: function(){  //ready -->
		var self = this;
		if(localStorage.getItem('bookTypeId')){
			self.bookTypeId = localStorage.getItem('bookTypeId');
		}
		if(localStorage.getItem('Keyword')){
			self.Keyword = localStorage.getItem('Keyword');
		}
		if(localStorage.getItem('fontNumId')){
			self.fontNumId = localStorage.getItem('fontNumId');
		}
		if(localStorage.getItem('wordMin')){
			self.wordMin = localStorage.getItem('wordMin');
		}
		if(localStorage.getItem('wordMax')){
			self.wordMax = localStorage.getItem('wordMax');
		}
		if(localStorage.getItem('isSign')){
			self.isSign = localStorage.getItem('isSign');
		}
		this.$nextTick(function(){
			var self = this;
//			self.bookTypeId = localStorage.getItem('bookTypeId');
//			self.Keyword = localStorage.getItem('Keyword');
//			self.fontNumId = localStorage.getItem('fontNumId');
//			self.wordMin = localStorage.getItem('wordMin');
//			self.wordMax = localStorage.getItem('wordMax');
//			self.isSign = localStorage.getItem('isSign');
//			console.log(self.bookTypeId);
			this.getValueFn();
		    if(window.plus){
		        this.plusReady();
		    }else{
		        document.addEventListener('plusready', this.plusReady, false);
		    }
		})
	},
	methods: {
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
	      plus.key.addEventListener('backbutton', function(){
				self.ws.close("slide-out-right");
//				self.ws.opener().reload();  //webview重新加载
			}, false);
	    },
	    webviewAnimation:function(){
	      this.ws.hide('slide-out-right');
	    },
        bTyoneFn: function(num){
			this.bookTypeId = num;
			this.Keyword = '';
			localStorage.setItem('bookTypeId',this.bookTypeId);
			localStorage.setItem('Keyword',this.Keyword);
		},
		wNuoneFn: function(id,min,max){
			this.fontNumId = id;
			this.wordMin = min;
			this.wordMax = max;
			localStorage.setItem('fontNumId',this.fontNumId);
			localStorage.setItem('wordMin',this.wordMin);
			localStorage.setItem('wordMax',this.wordMax);
		},
		sigoneFn: function(id){
			this.isSign = id;
			localStorage.setItem('isSign',this.isSign);
		},
		cleanFn: function(){
			localStorage.clear();
			this.bookTypeId = '';
			this.fontNumId = 0;
			this.isSign = 0;
			localStorage.setItem('bookTypeId',this.bookTypeId);
			localStorage.setItem('fontNumId',this.fontNumId);
			localStorage.setItem('isSign',this.isSign);
		},
		getValueFn: function(){
			SZXJ.http(this,'get',appPathList.queryBookType,{},(response)=>{
				this.Robj.sort = response.data;
			})
		},
		sureFn:function(){
			if(window.plus){
				this.ws.opener().setStyle({mask:'none'})
				this.ws.opener().reload();
				this.ws.close("slide-out-right");
			}
		}
	},
	head: function(){
		return{
			title:'筛选-QC轻小说',
			meta:[
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说筛选"},
		        { name: "keywords",content:"轻小说筛选"},
			],
			link:[
				
			],
		}
	},
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;user-select:none;}
	#screen{width: 100%;height: 100%;}
	#screen .scralls{position: fixed;width: 88%;left: 0;background: white;z-index: 110;bottom: 0;top: 0;}
	#screen .scralls .sscr{height: .38rem;border-bottom: .01rem solid #F2F2F2;font-size: .128rem;padding: .124rem .128rem;box-sizing: border-box;}
	#screen .scralls .scls{height: 1.7rem;width: 100%;border-bottom: .01rem solid #F2F2F2;}
	#screen .scralls .scls .clsone{height: .325rem;padding: .112rem .128rem;box-sizing: border-box;}
	#screen .scralls .scls .clsone span{font-size: .101rem;color: #F2F2F2;}
	#screen .scralls .scls .clstwo{height: 1.375rem;}
	.defaultone{margin: .111rem .128rem;display: inline-block;font-family: "微软雅黑";color:rgba(0,0,0,.45);font-size: .111rem;}
	.primaryone{margin: .111rem .128rem;display: inline-block;font-family: "微软雅黑";color:#FFC200;font-size: .111rem;}
	#screen .scralls .scrwor{height: .9472rem;width: 100%;border-bottom: .01rem solid #F2F2F2;}
	#screen .scralls .scrwor .scrwonum{height: .325rem;padding: .112rem .128rem;box-sizing: border-box;}
	#screen .scralls .scrwor .scrwonum span{font-size: .101rem;color: #F2F2F2;}
	#screen .scralls .scrwor .scrthree{height: .6222rem;}
	#screen .scralls .scrstate{height: .6315rem;width: 100%;border-bottom: .01rem solid #f2f2f2;}
	#screen .scralls .scrsta{height: .325rem;padding: .112rem .128rem;box-sizing: border-box;}
	#screen .scralls .scrsta span{font-size: .101rem;color: #F2F2F2;}
	#screen .scralls .scrfour{height: .3065rem;}
	#screen .scralls .scrbut{position: absolute;/*bottom: .299rem;*/bottom: .128rem;}
	#screen .scralls .scrbut .cleanbtn{font-size:.128rem;height: .2645rem;line-height: .2645rem;border-radius: .05rem;color:white;background:#ffc200;font-family:"微软雅黑";text-align: center;display: inline-block;width: 1.17rem;margin-left: .128rem;}
	#screen .scralls .scrbut .okbtn{font-size:.128rem;height: .2645rem;line-height: .2645rem;border-radius: .05rem;color:white;background:#ffc200;font-family:"微软雅黑";text-align: center;display: inline-block;width: 1.17rem;margin-left: .128rem;}
</style>
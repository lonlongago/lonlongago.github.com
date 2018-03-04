<template>
<div id="hisall">
	<script src="/lib/resize_320.js"></script>
	<div class="cont" v-if="bookBol==1">
		<div class="consec" v-for="obj in bookList">
			<a href="javascript:;" @click="joinBook(obj.bookId,obj.bookName)">
				<div class="Contain">
					<span class="txts">{{obj.bookName}}</span>
					<span class="times">{{szxj.getLocalTimeTwo(obj.bookHitDate)}}</span>
				</div>
			</a>
		</div>
	</div>
	<div class="cont" v-if="bookBol==2">
		<span class="pro">暂无浏览记录</span>
	</div>
	<div class="cont" v-if="bookBol==0">
		<!--<span class="pro">暂无浏览记录</span>-->
	</div>
</div>
</template>

<script>
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
export default{
	data : function(){
		return{
			szxj:SZXJ,
			path:appPathList,
			bookList:[],
			bookBol:0,
			hitFlag:false,
			loginFlag:'',
			ws:{},
			wn:{},
			mWidth:{},
		}
	},
	mounted : function(){ //ready -->
		this.$nextTick(function(){
			this.getStatusFn();
			this.mWidth = window.innerWidth;
			if(window.plus){
		        this.plusReady();
		      }else{
		        document.addEventListener('plusready',this.plusReady,false);
		      }
		    if(window.plus){
		        this.plusReady();
		    }else{
		        document.addEventListener('plusready', this.plusReady, false);
		    }
		})
	},
	methods:{
		 goBack:function(){
	      if(window.plus){
	        this.webviewAnimation();
	      }else{
	        history.back();
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
			}, false);
	      var view = this.ws.getTitleNView();
	      view.drawText('清空', {top:'0px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'44px'}, {size:'14px',color:'#FF0000'});
          view.interceptTouchEvent(true)
	      view.addEventListener("click", self.cle, false);
	    },
	    webviewAnimation:function(){
	      this.ws.hide('slide-out-right');
	    },
		getStatusFn: function(){
			SZXJ.http(this,"get",appPathList.findBookHitByUser,{},(response)=>{
				this.bookList=response.data;
				if(this.bookList){
					this.bookBol = 1;
				}else{
					this.bookBol = 2;
				}
			});
		},
		cle: function(e){
			if(e.clientX<this.mWidth-65){
				return
			}
			if(this.bookList.length > 0){
				this.removeFn();
			}
		},
		removeFn: function(){
				var book='';
				var bookList = this.bookList;
				for(var i = 0;i < bookList.length ;i++){
					if(i==0){
						book=bookList[i].bookId;
					}else{
						book = book+','+bookList[i].bookId;
					}
				}
				var self = this;
				if(window.plus){
		        	plus.nativeUI.confirm( "确定清空浏览历史吗?", function(e){
		        		if(e.index == 0){
			        		SZXJ.http(this,'get',appPathList.removeBookHits+'?bookId='+book,{},(response) => {
                                self.bookList = [];
								plus.nativeUI.toast( "已清空");
				          })
		        		}else if(e.index == 1){
		        			plus.nativeUI.toast( "已取消");
		        		}
					});
			    }
		},
		joinBook:function(bookId,bookName){
			console.log("addsads616546")
	      	if(window.plus){
	      		this.wn = plus.webview.create(appPathList.netWorks+"/book/"+bookId,'book',
	      		{
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
		        });
		        this.wn.onloading= function(){
					plus.nativeUI.showWaiting();
				}
				this.wn.onloaded=function(){
					plus.nativeUI.closeWaiting();
				}
	      		this.wn.show('slide-in-right')
	      	}else{
//	      		location.href = "/mView/book/"+bookId;
	      	}
	    }
	},
	head : function(){
		return {
			title:'浏览历史-QC轻小说',
			meta : [
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说历史"},
		        { name: "keywords",content:"轻小说历史"},
		    ],
		    link: [
//		        { rel: 'stylesheet', href: '/css/main_app.css' }
		    ],
		}
	}
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;}

	.tp{height: .171rem;background: white;position: fixed;width: 100%;top: 0;z-index: 99;}
	#hisall .top{position:fixed;width:100%;height: 0.376rem;margin: 0 auto;background: white;z-index: 99;top: .171rem;}
	.top:after{height: .0072rem;background: #C3C3C3;position: absolute;left: 0;right: 0;content: '';bottom: 0;}
	#hisall .top .back{position: absolute;width: .086rem;height: .1536rem;top: 0.111rem;left: 0.128rem;box-sizing: border-box;}
	#hisall .top .his{text-align:center;font-size: .1366rem;height: .376rem;padding: .1194rem 0;display: block;box-sizing: border-box;}
	#hisall .top .emphis{position: absolute;font-size: .128rem;right: .128rem;display: block;top: .1236rem;color: red;}
	#hisall .cont{width: 100%;position: absolute;/*top: .549rem;*/top: 0;}
	#hisall .cont .pro{text-align: center;margin-top: 20%;display: block;font-size: .128rem;}
	#hisall .cont .consec{width: 100%;height: .376rem;background-color: white;margin-top: 1px;}
	#hisall .cont .consec a{width: 100%;height: 100%;}
	#hisall .cont .consec a .Contain{width: 100%;height: 100%;}
	#hisall .cont .consec a .txts{font-size: .1152rem;margin-top: .128rem;margin-left:.162rem;position: absolute;}
	#hisall .cont .consec a .times{margin-right: .128rem;font-size: .1024rem;color: silver;float: right;margin-top: .1366rem;}
	#hisall .cover{position: absolute;width: 100%;top: 0;left: 0;height: 100%;background-color: rgba(0,0,0,0.5);}
	#hisall .cover .remin{width: 2.185rem;height: 1.148rem;position: fixed;box-shadow:0 0 20px silver;border-radius:3px;margin:0 auto;top: 50%;left: 50%;margin-left: -1.0925rem;margin-top: -0.574rem;background: white;-webkit-transform:translate3d(0px,0,0px);-moz-transform:translate3d(0px,0,0px);transform:translate3d(0px,0,0px);transition:all 0.3s;}
	#hisall .cover .remin .ti{height: .226rem;line-height: .226rem;text-align: center;width: 100%;font-size: .15rem;font-family: "微软雅黑";display: inline-block;margin-top: .1rem;color: red;}
	#hisall .cover .remin .clean{height: .4523rem;line-height: .4523rem;display:inline-block;text-align:center;width: 100%;font-size: .1365rem;font-family: "微软雅黑";}
	#hisall .cover .remin .butt{height: .2176rem;width: 2rem;text-align: center;margin-left: .1195rem;display: inline-flex;}
	#hisall .cover .remin .butt .btn1{height: 100%;width: .9173rem;background-color:#fedc6f;border-radius: 3px;color: white;font-size: .1365rem;line-height: .2176rem;margin-right: .0939rem;}
	#hisall .cover .remin .butt .btn2{height: 100%;width: .9173rem;background-color:#989898;border-radius: 3px;line-height: .2176rem;color: white;font-size: .1365rem;}
</style>
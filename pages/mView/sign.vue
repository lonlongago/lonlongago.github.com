<template>
	<div id="sign">
		<div class="content">
			<div class="conone" @click="nameFn">
				<span class="name">姓名</span>
				<img src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
			</div>
			<div class="conone" @click="wayFn">
				<span class="name">联系方式</span>
				<img src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
			</div>
			<div class="conone" @click="updataFn">
				<span class="name">更新方式</span>
				<img src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
			</div>
			<div class="contwo" @click="booktxtFn">
				<span class="bookall">小说大纲</span>
				<img src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
			</div>
		</div>
		<div class="waybox" v-if="wayFlag">
			<div class="callway">联系方式</div>
			<div class="txt">
				<input type="text" class="txtname" placeholder="QQ" maxlength="10" v-model="qqname"  />
			</div>
			<div class="txt">
				<input type="text" class="txtname" placeholder="邮箱" v-model="email"  />
			</div>
			<div class="txt">
				<input type="text" class="txtname" placeholder="手机" maxlength="11" v-model="mobile"  />
			</div>
			<div class="txt">
				<input type="text" class="txtname" placeholder="住址" v-model="addvice"  />
			</div>
			<div class="bttn">
				<div class="sure" @click="okFn">确定</div>
				<div class="no" @click="noFn">取消</div>
			</div>
		</div>
		<div class="namebox" v-if="nameFlag">
			<div class="nametit">姓名</div>
			<div class="nametxt">
				<input type="text" class="txtname" placeholder="此处填写姓名" v-model="username"  />
			</div>
			<div class="bttn">
					<div class="sure" @click="okFn">确定</div>
					<div class="no" @click="noFn">取消</div>
			</div>
		</div>
		<div class="updatebox" v-if="updateFlag">
			<div class="updattit">更新方式</div>
			<div class="upcontent">
				<a href="javascript:;" class="dayup" @click="setMove(1)">
					<span :style="active == 1 ? 'color:#ffc200':'color:#323232'">日更</span>
					<img :src="active == 1 ?'http://cdn.qcacg.com/mobile/img/duise.png' : 'http://cdn.qcacg.com/mobile/img/kong.png'"/>
				</a>
				<a href="javascript:;" class="monup" @click="setMove(2)">
					<span :style="active == 2 ? 'color:#ffc200':'color:#323232'">月更</span>
					<img :src="active == 2 ?'http://cdn.qcacg.com/mobile/img/duise.png' : 'http://cdn.qcacg.com/mobile/img/kong.png'"/>
				</a>
			</div>
			<div class="bttn">
					<div class="sure" @click="okFn">确定</div>
					<div class="no" @click="noFn">取消</div>
			</div>
		</div>
		<!--<button @click="signbtnFn">yuyuy</button>-->
		<!--<div class="bookbox" v-if="booktxtFlag">
			<div class="booktit">小说大纲</div>
			<div class="bookcontent">
				<textarea class="booktxt" placeholder="此处填写小说大纲" v-model="boktxt"></textarea>
			</div>
			<div class="bttn">
					<div class="sure" @click="okFn">确定</div>
					<div class="no" @click="noFn">取消</div>
			</div>
		</div>-->
		<div class="shadow" v-if="shaBol" @click="close"></div>
	</div>
</template>

<script>
import axios from 'axios'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
export default{
	asyncData: function(context){
		var obj = {};
		obj.bookId = context.params.id;
		console.log(obj.bookId)
		return obj;
	},
	data: function(){
		return{
			ws:{},
			path:appPathList,
			szxj:SZXJ,
			wayFlag:false,
			nameFlag:false,
			updateFlag:false,
			booktxtFlag:false,
			shaBol:false,
			username:'',
			qqname:'',
			email:'',
			mobile:'',
			addvice:'',
			boktxt:'',
			active:1,
			updateCycle:1,
			view:{},
			bookId:'',
			bookList:[],
			message:'',
			mWidth:0,
			wvs:[],
		}
	},
	mounted: function(){
		var self = this;
		if(localStorage.getItem('username')){
			self.username = localStorage.getItem('username');
		}
		if(localStorage.getItem('qqname')){
			self.qqname = localStorage.getItem('qqname');
		}
		if(localStorage.getItem('email')){
			self.email = localStorage.getItem('email');
		}
		if(localStorage.getItem('mobile')){
			self.mobile = localStorage.getItem('mobile');
		}
		if(localStorage.getItem('updateCycle')){
			self.updateCycle = localStorage.getItem('updateCycle');
			if(self.updateCycle==1){
				self.active = 1;
			}else if(self.updateCycle==2){
				self.active = 2;
			}
		}
		if(localStorage.getItem('addvice')){
			self.addvice = localStorage.getItem('addvice');
		}
		if(localStorage.getItem('message')){
			self.message = localStorage.getItem('message');
		}
		this.$nextTick(function(){
			self.bookId = self.bookId;
//			console.log(self.bookId);
			localStorage.setItem('message',this.message);
			this.mWidth = window.innerWidth;
			if(window.plus){
				this.plusReady();
			}else{
				document.addEventListener('plusready',this.plusReady,false);
			}
		})
	},
	methods: {
		backFn: function(){
			if(window.plus){
				this.ws.close('slide-out-right')
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
			this.wvs = plus.webview.all();
//			this.view = this.ws.getTitleNView();
			plus.key.addEventListener('backbutton',function(){
	      	   self.ws.close("slide-out-right");
//	      	   self.ws.opener().reload();  //webview重新加载
	        },false)
			var view = this.ws.getTitleNView();
			view.drawRect({color:'#2ec0ff',radius:'2px'}, {top:'8px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'28px'});
	        view.drawText('提交 ',{top:'0px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'44px'}, {size:'14px',color:'#fff'});
	//	      view.setTouchEventRect({top:'0px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'44px'});
	        view.addEventListener("click", self.signbtnFn, false);
	        view.interceptTouchEvent(true)
//			this.view.interceptTouchEvent(true)
		},
		nameFn: function(){
			this.nameFlag = true;
			this.shaBol = true;
		},
		wayFn: function(){
				this.wayFlag = true;
				this.shaBol = true;
		},
		updataFn: function(){
			this.updateFlag = true;
			this.shaBol = true;
		},
		booktxtFn: function(){
			if(window.plus){
	        	this.wn = plus.webview.create(appPathList.netWorks+"/outline/",'outline',{
        			  'popGesture':'close',
				      'titleNView':{'backgroundColor':'#ffffff','titleText':'小说大纲','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				      'statusbar':{'background':'#ffffff'},
				      "backButtonAutoControl":'close'
	        	})
	        	this.wn.onloading= function(){
							plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
						}
						this.wn.onloaded=function(){
							plus.nativeUI.closeWaiting();
						}
	          this.wn.show('slide-in-right');
	        }
//			this.booktxtFlag = true;
//			this.shaBol = true;
		},
		signbtnFn: function(){
//			String qq = this.qqname;
//			String regex = "[1-9][0-9]{4,14}";
//			boolean flag = (this.qqname).matches([1-9][0-9]{4,14}); 
			if(this.username == ''){
				if(window.plus){
	    			plus.nativeUI.toast('姓名不能为空');
	    			return
	    		}
			}else if(!(( /^[1-9][0-9]{4,}$/).test(this.qqname))){
		    	if(window.plus){
		    			plus.nativeUI.toast('QQ号错误');
		    			return
		    	}
			}else if(!((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(this.email))){
				if(window.plus){
	    			plus.nativeUI.toast('邮箱输入有误');
	    			return
	    		}
			}else if(!((/^1[3|4|5|8][0-9]\d{8}$/).test(this.mobile))){
				if(window.plus){
	    			plus.nativeUI.toast('手机号输入有误');
	    			return
	    		}
			}else if(this.addvice == ''){
				if(window.plus){
	    			plus.nativeUI.toast('地址不允许为空');
	    			return
	    		}
			}
			var _data = {};
			_data.bookId = parseInt(this.bookId, 10);
			_data.uname = this.username;
			_data.updateType = this.updateCycle;
			_data.qq = this.qqname;
			_data.email = this.email;
			_data.phone = this.mobile;
			_data.address = this.addvice;
			_data.message = this.message;
			console.log(_data.bookId)
			SZXJ.http(this,'post',appPathList.userUpdateBookSign,_data,(response)=>{
				if(window.plus){
	    			plus.nativeUI.toast('已成功提交');
	    		}
//				console.log(response);
			},(err)=>{
				if(window.plus){
	    			plus.nativeUI.toast(err.data.msg);
	    		}
//				console.log(err.data.msg);
			})
		},
		setMove: function(a){
			if(a==1){
				this.updateCycle = 1;
				this.active = 1;
			}else if(a==2){
				this.updateCycle = 2;
				this.active = 2;
			}
			console.log(this.updateCycle);
		},
		close: function(){
			this.shaBol = false;
			this.wayFlag = false;
			this.nameFlag = false;
			this.updateFlag = false;
			this.booktxtFlag = false;
			localStorage.setItem('username',this.username);
			localStorage.setItem('updateCycle',this.updateCycle);
			localStorage.setItem('qqname',this.qqname);
			localStorage.setItem('email',this.email);
			localStorage.setItem('mobile',this.mobile);
			localStorage.setItem('addvice',this.addvice);
//			console.log(localStorage.getItem('addvice'));
		},
		okFn: function(){
			this.close();
		},
		noFn: function(){
			this.close();
		},
//		getBookListFn: function() {
//      var _data = {};
//      SZXJ.http(this,'get', appPathList.findBookByUser, {}, (response) => {            
//          this.bookList = response.data;
////          this.bookId = response.data.bookId;
////          console.log(this.bookId);
//      },(err)=>{
//      	if(window.plus){
//		    			plus.nativeUI.toast(err.data.msg);
//		    		}
////      	console.log(err.data.msg);
//      });
//  },
		btnFn:function(){
			this.ws.opener().evalJS("asd()")
		}
	},
	head: function(){
  		return {
  			title: '签约-QC轻小说',
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
//				{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		],
  	  		script: [
  	  			{src:"/lib/resize_320.js"}
  	  		],
  	  }
  	}
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;user-select:none;}
	.shadow{position: absolute;top:0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.5);z-index: 20;}
	#sign{
		width: 100%;
		height: 100%;
	}
	#sign .content{
		width: 100%;
		margin: 0 auto;
	}
	#sign .content .conone{
		height: .376rem;
		width: 100%;
		margin-bottom: 1px;
		background-color: white;
	}
	#sign .content .conone .name{
		font-family: "微软雅黑";
		font-size: .1195rem;
		line-height: .376rem;
		padding-left: .128rem;
	}
	#sign .content .conone img{
		height: .128rem;
		width: .0683rem;
		float: right;
		padding-top: .124rem;
		padding-right: .128rem;
	}
	#sign .content .contwo{
		height: .376rem;
		width: 100%;
		background-color: white;
		margin-top: .0853rem;
	}
	#sign .content .contwo .bookall{
		font-family: "微软雅黑";
		font-size: .1195rem;
		line-height: .376rem;
		padding-left: .128rem;
	}
	#sign .content .contwo img{
		height: .128rem;
		width: .0683rem;
		float: right;
		padding-top: .124rem;
		padding-right: .128rem;
	}
	.waybox{
		height: 2.261rem;
		width: 2.176rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -1.1305rem;
		margin-left: -1.088rem;
		background-color: white;
		z-index: 25;
    border-radius: 3px;
    transform: translateZ(0);
    -webkit-transition: all .3s;
    transition: all .3s;
	}
	.waybox .callway{
		text-align: center;
		font-family: "微软雅黑";
		font-size: .128rem;
		height: .376rem;
		width: 100%;
		line-height: .376rem;
	}
	.waybox .txt{
		/*height: .376rem;*/
		padding: .0853rem;
	}
	.waybox .txt .txtname{
		background-color: #F2F2F2;
		border: 0;
    height: .213rem;
    width: 100%;
    border-radius: 4px;
    padding-left: .02rem;
    font-family: "微软雅黑";
    font-size: .1194rem;
	}
	.waybox .bttn{
		margin-top: .06rem;
		width: 100%;
		font-family: "微软雅黑";
    font-size: .1194rem;
	}
	.waybox .bttn .sure{
		height: .213rem;
		width: .9173rem;
		background-color: #fedc6f;
		margin-right: .1707rem;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    margin-left: .0853rem;
    color: white;
	}
	.waybox .bttn .no{
		height: .213rem;
		width: .9173rem;
		background-color: #989898;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    color: white;
	}
	.namebox{
		width: 2.176rem;
		height: 1.131rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.5655rem;
		margin-left: -1.088rem;
		background-color: white;
		z-index: 25;
    border-radius: 3px;
    transform: translateZ(0);
    -webkit-transition: all .3s;
    transition: all .3s;
	}
	.namebox .nametit{
		height: .376rem;
		width: 100%;
		text-align: center;
		line-height: .376rem;
		font-family: "微软雅黑";
		font-size: .128rem;
	}
	.namebox .nametxt{
		padding: .0853rem;
	}
	.namebox .nametxt .txtname{
		background-color: #F2F2F2;
		border: 0;
    height: .213rem;
    width: 100%;
    border-radius: 4px;
    padding-left: .02rem;
    font-family: "微软雅黑";
    font-size: .1194rem;
	}
	.namebox .bttn{
		margin-top: .06rem;
		width: 100%;
		font-family: "微软雅黑";
    font-size: .1194rem;
	}
	.namebox .bttn .sure{
		height: .213rem;
		width: .9173rem;
		background-color: #fedc6f;
		margin-right: .1707rem;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    margin-left: .0853rem;
    color: white;
	}
	.namebox .bttn .no{
		height: .213rem;
		width: .9173rem;
		background-color: #989898;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    color: white;
	}
	.updatebox{
		width: 2.176rem;
		height: 1.5147rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.75735rem;
		margin-left: -1.088rem;
		background-color: white;
		z-index: 25;
    border-radius: 3px;
    transform: translateZ(0);
    -webkit-transition: all .3s;
    transition: all .3s;
	}
	.updatebox .updattit{
		height: .376rem;
		width: 100%;
		text-align: center;
		line-height: .376rem;
		font-family: "微软雅黑";
		font-size: .128rem;
	}
	.updatebox .upcontent{
		padding-left: .0853rem;
	}
	.updatebox .upcontent .dayup{
		height: .376rem;
		line-height: .376rem;
		width: 100%;
		border-bottom: 1px solid #F2F2F2;
		display: block;
	}
	.updatebox .upcontent .monup{
		height: .376rem;
		line-height: .376rem;
		width: 100%;
		border-bottom: 1px solid #F2F2F2;
		display: block;
	}
	.updatebox .upcontent .dayup span{
		font-family: "微软雅黑";
		font-size: .11093rem;
	}
	.updatebox .upcontent .dayup img{
		float: right;
		height: .1195rem;
		width: .16213rem;
		padding: .12825rem .128rem .12825rem 0;
	}
	.updatebox .upcontent .monup span{
		font-family: "微软雅黑";
		font-size: .11093rem;
	}
	.updatebox .upcontent .monup img{
		float: right;
		height: .1195rem;
		width: .16213rem;
		padding: .12825rem .128rem .12825rem 0;
	}
	.updatebox .bttn{
		margin-top: .06rem;
		width: 100%;
		font-family: "微软雅黑";
    font-size: .1194rem;
	}
	.updatebox .bttn .sure{
		height: .213rem;
		width: .9173rem;
		background-color: #fedc6f;
		margin-right: .1707rem;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    margin-left: .0853rem;
    color: white;
	}
	.updatebox .bttn .no{
		height: .213rem;
		width: .9173rem;
		background-color: #989898;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    color: white;
	}
	.bookbox{
		width: 2.176rem;
		height: 1.5147rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.75735rem;
		margin-left: -1.088rem;
		background-color: white;
		z-index: 25;
    border-radius: 3px;
    transform: translateZ(0);
    -webkit-transition: all .3s;
    transition: all .3s;
	}
	.bookbox .booktit{
		height: .376rem;
		width: 100%;
		text-align: center;
		line-height: .376rem;
		font-family: "微软雅黑";
		font-size: .128rem;
	}
	.bookbox .bookcontent{
    padding-left: .0853rem;
    padding-right: .18rem;
	}
	.bookbox .bookcontent .booktxt{
		height: .752rem;
		width: 100%;
		resize: none;
		font-family: "微软雅黑";
		font-size: .1194rem;
		border-radius: 4px;
    padding-left: .05rem;
    padding-right: .03rem;
    line-height: 1.3;
	}
	.bookbox .bttn{
		margin-top: .06rem;
		width: 100%;
		font-family: "微软雅黑";
    font-size: .1194rem;
	}
	.bookbox .bttn .sure{
		height: .213rem;
		width: .9173rem;
		background-color: #fedc6f;
		margin-right: .1707rem;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    margin-left: .0853rem;
    color: white;
	}
	.bookbox .bttn .no{
		height: .213rem;
		width: .9173rem;
		background-color: #989898;
		display: inline-block;
    text-align: center;
    line-height: .213rem;
    border-radius: 4px;
    color: white;
	}
</style>
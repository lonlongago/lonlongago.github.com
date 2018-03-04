<template>
<div id="fol">
	<script src="/lib/resize_320.js"></script>
	<!--<div class="tp"></div>-->
	<div class="alls">
		<!--<div class="top">
			<img @click="backFn" class="back" src="/img/back.png" alt="" />
			<span>我的关注</span>
		</div>-->
		<div class="cont">
			<div @click="myfol" class="first btn">
				<img class="mf" src="http://cdn.qcacg.com/mobile/img/myfol.png" alt="" />
				<span>我关注的</span>
				<img class="togo" src="http://cdn.qcacg.com/mobile/img/goo.png" alt="" />
			</div>
			<div @click="folme" class="first btn">
				<img class="mf" src="http://cdn.qcacg.com/mobile/img/folme.png" alt="" />
				<span>关注我的</span>
				<img class="togo" src="http://cdn.qcacg.com/mobile/img/goo.png" alt="" />
			</div>
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
	data: function(){
		return{
			ws:{},
			wn:{},
			wc:{},
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			if(window.plus){
        this.plusReady();
      }else{
        document.addEventListener('plusready', this.plusReady, false);
      }
		})
	},
	methods:{
		backFn:function(){
      if(window.plus){
        this.ws.hide('slide-out-right')
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
      this.wn = plus.webview.getLaunchWebview();
      plus.key.addEventListener('backbutton', function(){
			self.ws.close("slide-out-right");
//			self.ws.opener().reload();  //webview重新加载
		}, false);
    },
		myfol: function(){
			if(window.plus){
			    this.wc = plus.webview.create(appPathList.netWorks+'/myfol','view3',
		        {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'我的关注',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
		        });
		        this.wc.onloading= function(){
					plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
				}
				this.wc.onloaded=function(){
					plus.nativeUI.closeWaiting();
				}
			    this.wc.show('slide-in-right');
			}else{
//			    location.href = '/mView/myfol';
			}
		},
		folme: function(){
			if(window.plus){
		        this.wc = plus.webview.create(appPathList.netWorks+'/folme','view3',
		        {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'关注我的',titleOverflow:'ellipsis','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
		        });
		        this.wc.onloading= function(){
					plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
				}
				this.wc.onloaded=function(){
					plus.nativeUI.closeWaiting();
				}
	            this.wc.show('slide-in-right');
		    }else{
//		        location.href = '/mView/folme';
		    }
		},
	},
	head: function(){
		return{
			title:'我的关注-QC轻小说',
			meta:[
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说我的关注"},
		        { name: "keywords",content:"轻小说我的关注"},
			],
			link:[],
		}
	},
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;}
	.tp{height: .171rem;background: white;width: 100%;}
	#fol{width: 100%;margin: 0 auto;}
	.btn{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}
	.btn:hover{outline:0;cursor:pointer}
	.btn:focus{outline:0;cursor:pointer}
	.btn:active{-webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0);box-shadow:inset 0 0 1px rgba(0,0,0,0)}
	#fol .alls{width: 100%;margin: 0 auto;}
	#fol .alls .top{background-color: white;height: .376rem;width: 100%;position: fixed;z-index: 999;}
	#fol .alls .top:after{height: 2px;position: absolute;left: 0;right: 0;bottom: 0;content: '';background: #ffc200;}
	#fol .alls .top .back{left: .128rem;width: .085rem;height: .1536rem;top: .1109rem;position: absolute;}
	#fol .alls .top span{font-family: "微软雅黑";font-size: .145rem;height: .376rem;padding: .116rem 0;text-align: center;box-sizing: border-box;display: block;}
	#fol .alls .cont{width: 100%;/*top: .6323rem;*/top:0.0853rem;position: absolute;}
	#fol .alls .cont .first{width: 100%;height: .376rem;background-color: white;margin-top: 1px;}
	#fol .alls .cont .first .mf{width: .235rem;height: .235rem;margin-left: .128rem;margin-top: .077rem;}
	#fol .alls .cont .first span{display: block;font-family: "微软雅黑";font-size: .128rem;position: absolute;margin-top: .124rem;margin-left: .085rem;display: inline-block;}
	#fol .alls .cont .first .togo{float: right;margin-right: .128rem;width: .077rem;height: .145rem;margin-top: .1152rem;}
</style>
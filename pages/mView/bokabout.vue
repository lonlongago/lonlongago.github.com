<template>
<div id="bokab">
	<div class="alls">
		<div class="conte"></div>
		<div class="abouts mui-content mui-scroll-wrapper" id="pullrefresh">
			<div class="mui-scroll">
				<div class="mui-table-view mui-table-view-chevron">
					<div class="con" v-for="obj in about">
						<div class="connow">
							<span class="title">{{obj.messageTitle}}</span>
							<span class="abtime">{{szxj.getLocalTimeTwo(obj.messageCreateDate)}}</span>
						</div>
						<div class="abcon">{{obj.message}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="abouttwo" v-if="about.length==0">暂无作品相关信息</div>
	</div>
</div>
</template>

<script>
import appPathList from "~/components/conf-app"
import SZXJ from "~/components/vueHttp-app"
export default{
	data: function(){
		return{
			path:appPathList,
			szxj:SZXJ,
			obj:{
		      type:0,
		      pageNo:1,
		      pageSize:20, 
		    },
			about:[],
			ws:{},
			wn:{},
			view:{},
			commentCount:0
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getValueFn();
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
						style:iosOrAndriod?'circle':'none',
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
                    self.getValueFn();
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
				}, 1500);
			}
			/**
			 * 上拉加载具体业务实现
			 */
			function pullupRefresh() {
				setTimeout(function() {
					self.obj.pageNo = self.obj.pageNo + 1;
					SZXJ.http(this,'get',appPathList.queryMsg + '?type='+ self.obj.type + '&pageNo=' + self.obj.pageNo + '&pageSize=' +self.obj.pageSize,{},(response)=>{
		                var list =response.data.info;
	                    for(var i=0;i<list.length;i++){
	                       self.about.push(list[i]);
	                    }
	                    self.commentCount = response.data.totalPage;;
	                },function(err){ 
	                })
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= self.commentCount)); //参数为true代表没有更多数据了。
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
	      plus.key.addEventListener('backbutton',function(){
	      	self.ws.close("slide-out-right");
//	      	self.ws.opener().reload();  //webview重新加载
	      })
		  this.view.interceptTouchEvent(true)
	    },
	    webviewAnimation:function(){
	      this.ws.hide('slide-out-right');
	    },
		getValueFn: function(){
			this.obj.pageNo = 1;
			SZXJ.http(this,'get',appPathList.queryMsg + '?type='+ this.obj.type + '&pageNo=' + this.obj.pageNo + '&pageSize=' +this.obj.pageSize,{},(response)=>{
				this.about = response.data.info;
				console.log(this.about.length);
			})
		},
	},
	head:{
		title:'作品相关-QC轻小说',
		meta:[
		  { charset: 'UTF-8' },
          { name: 'apple-touch-fullscreen', content: 'yes' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: "apple-mobile-web-app-capable",content:"yes"},
          { name: "apple-mobile-web-app-status-bar-style",content:"default"},
          { name: "description",content:"轻小说作品相关"},
          { name: "keywords",content:"轻小说作品相关"},
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
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;}
	.abouttwo{
		text-align: center;
		font-size: .128rem;
		margin-top: 50%;
	}
	.mui-table-view{
		background-color: #F2F2F2!important;
	}
	#bokab{
		width: 100%;
		margin: 0 auto;
	}
	.tp{
		height: .171rem;
		left: 0;
		right: 0;
		top: 0;
		background: white;
		z-index: 25;
    	position: fixed;
	}
	#bokab .alls .top{
		width: 100%;
		height: .376rem;
		background: white;
		position: fixed;
		top: .171rem;
		left: 0;
		right: 0;
		z-index: 25;
	}
	#bokab .alls .top:after{
		height: 2px;
		background-color: #ffc200;
		width: 100%;
		left: 0;
		bottom: 0;
		position: absolute;
		content: "";
	}
	#bokab .alls .top .back{
		position: absolute;
		width: .086rem;
		height: .1536rem;
		top: 0.111rem;
		left: 0.128rem;
		box-sizing: border-box;
	}
	#bokab .alls .top .his{
		text-align:center;
		font-size: .1366rem;
		height: .376rem;
		padding: .1194rem 0;
		display: block;
		box-sizing: border-box;
	}
	.conte{
		position: fixed;
		height: .0853rem;
		left: 0;
		right: 0;
		/*top: .548rem;*/
		top: 0;
		background: #F4F4F4;
		z-index: 20;
		content: '';
	}
	#bokab .alls .abouts{
		position: absolute;
		left: 0;
		right: 0;
		/*top: .6333rem;*/
		top: .0853rem;
	}
	#bokab .alls .abouts .con{
		background: white;
		width: 100%;
		height: .5205rem;
		margin-top: 1px;
	}
	#bokab .alls .abouts .con .connow{
		padding: .128rem .128rem .0853rem .128rem;
	}
	#bokab .alls .abouts .con .connow .title{
		font-family: "微软雅黑";
		font-size: .1194rem;
		color: #282828;
	}
	#bokab .alls .abouts .con .connow .abtime{
		font-family: "微软雅黑";
		font-size: .0853rem;
		color: #8e8e8e;
		float: right;
	}
	#bokab .alls .abouts .con .abcon{
		color: #656565;
		font-size: .1024rem;
		font-family: "微软雅黑";
		padding-left: .128rem;
	}
</style>
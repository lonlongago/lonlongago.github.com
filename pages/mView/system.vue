<template>
  <div style="font-size: 12px; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: #f2f2f2;-webkit-overflow-scrolling: touch;">
  	<!--<div class="tp"></div>
    <div class="header_comment">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_Text"><span>系统消息</span></div>
    </div>-->
    <div class="conte"></div>
    <div v-show="this.msgList.length != 0" class="content mui-content mui-scroll-wrapper" id="pullrefresh">
			<div class="mui-scroll">
				<div class="content_list mui-table-view mui-table-view-chevron">
	        <div class="content_part" v-for="(obj,index) in msgList">
	          <div class="part_title">
	            <span class="title_name">{{obj.messageTitle}}</span>
	            <span class="title_time">{{obj.messageCreateDate | getLocalTimeTwo}}</span>
	          </div>
	          <div class="part_content">
	            {{obj.message}}
	          </div>
	        </div>
	      </div>
      </div>
    </div>
    <div class="sycon" v-show="this.msgList.length == 0">暂无消息信息</div>
  </div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  export default{
    data:function(){
      return {
        msgList:[],
        RequestObj:{
          type:1,
          pageNo: 1,
          pageSize: 10,
        },
        commentCount:0,
        ws:{},
        wn:{},
      }
    },
    filters:{
      getLocalTimeTwo:function(val){
        var time = new Date(val);
        return time.Format("yyyy-MM-dd hh:mm");
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getMsgFn();
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
	                    self.getMsgFn();
						mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
					}, 1500);
				}
				/**
				 * 上拉加载具体业务实现
				 */
				function pullupRefresh() {
					setTimeout(function() {
						self.RequestObj.pageNo = self.RequestObj.pageNo + 1;
						var _data = self.RequestObj;
						SZXJ.http(this,'get', appPathList.queryMsg+'?type='+_data.type+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize, {} , (response) => {
                 var list = response.data.info;
                for(var i=0;i<list.length;i++){
                   self.msgList.push(list[i]);
                }
            },function(err){ 
            })
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >= self.commentCount)); //参数为true代表没有更多数据了。
					}, 100);
				}
      })
    },
    methods:{
      goBack:function(){
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
//					self.ws.opener().reload();  //webview重新加载
				}, false);
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      getMsgFn:function(){
        this.RequestObj.pageNo =1;
        var _data = this.RequestObj;
        SZXJ.http(this,'get', appPathList.queryMsg+'?type='+_data.type+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize, {} , (response) => {
          this.msgList = response.data.info;
          this.commentCount = response.data.totalPage;
        });
      }
    },
    head:{
      title: '书籍页-QC轻小说',
      meta: [
          { charset: 'UTF-8' },
          { name: 'apple-touch-fullscreen', content: 'yes' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: "apple-mobile-web-app-capable",content:"yes"},
          { name: "apple-mobile-web-app-status-bar-style",content:"default"},
          { name: "description",content:"轻小说章节"},
          { name: "keywords",content:"轻小说章节"},
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
	.tp{
		height: .171rem;
		background: white;
		width: 100%;
		position: fixed;
		z-index: 99;
		}
	.sycon{
		text-align: center;
		font-size: .128rem;
		margin-top: 50%;
	}
	.mui-table-view{
		background-color: #F2F2F2!important;
	}
  .header_comment{
    height: 0.3854rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 25;
  }
  .header_comment:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_comment .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_comment .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_comment .header_Text{
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    width: 77.5%;
  }
  .header_comment .header_Text span{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    float: right;
    text-overflow: ellipsis;
    text-align: center;
    padding-top: 0.0768rem;
    padding-bottom: 0.0768rem;
    font-size: 0.1365rem;
    line-height: .2048rem;
  }
  .conte{
  	position: fixed;
  	height: .0853rem;
  	/*top: .5294rem;*/
  	top: 0;
  	left: 0;
  	right: 0;
  	content: '';
  	background: #F4F4F4;
  	z-index: 20;
  }
  .content{
    /*margin-top: 0.6147rem;*/
   margin-top: .0853rem;
  }
  .content .content_list{
    
  }
  .content .content_list .content_part{
    padding: 0.1195rem 0.128rem 0 0.128rem;
    background-color: #fff;
    margin-top: 1px;
  }
  .content .content_list .content_part .part_title{
    margin-bottom: 0.0939rem;
  }
  .content .content_list .content_part .part_title span{
    display: inline-block;
  }
  .content .content_list .content_part .part_title .title_name{
    font-size: 0.1195rem;
    color: #282828;
    vertical-align: bottom;
  }
  .content .content_list .content_part .part_title .title_time{
    font-size: 0.0853rem;
    color: #8e8e8e;
    float: right;
    vertical-align: bottom;
  }
  .content .content_list .content_part .part_content{
    color: #656565;
    padding-bottom: 0.0939rem;
    font-size: 0.1024rem;
    width: 100%;
    overflow: hidden;
    word-break: break-all;
  }
  .marginTop1{
    margin-top: 1px solid #c3c3c3;
  }
</style>
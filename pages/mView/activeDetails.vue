<template>
	<div style="font-size: 12px; position: fixed;right: 0; left: 0; top: 0; bottom: 0;">
		<div class="header">
			<div class="tap">
			    <div class="tap_part" @click="tapMove(1)">
			    	<a href="javascript:;">活动奖励</a>
			    	<span v-show="active==1"></span>
			    </div>	
			    <div class="tap_part" @click="tapMove(2)">
			    	<a href="javascript:;">活动要求</a>
			    	<span v-show="active==2"></span>
			    </div>	
			    <div class="tap_part" @click="tapMove(3)">
			    	<a href="javascript:;">活动时间</a>
			    	<span v-show="active==3"></span>
			    </div>	
			    <div class="tap_part" @click="tapMove(4)">
			    	<a href="javascript:;">作品展示</a>
			    	<span v-show="active==4"></span>
			    </div>	
			</div>
		</div>
		<div class="content">
			<div class="content_container" v-if="active==1">
				<h3>活动奖励</h3>
				<p class="p_text" style="margin-top: 0.128rem;">第一名（1名）：7000元奖金、出版推荐机会、漫画推荐机会、免试进入LV3的资格、金奖徽章</p>
			    <p class="p_text">第二名（1名）：3000元奖金、出版推荐机会、漫画推荐机会、免试进入LV2的资格、银奖徽章</p>
			    <p class="p_text">第三名（8名）：800元奖金、免试进入LV1的资格、铜奖徽章</p>
			    <p class="p_text" style="margin-bottom: 0.256rem;">征文参加奖（不限）：总金额10万元，参加征文的作品，满足8万字，即可联系编辑获得300-500的插画补贴（活动期间即可领取，每人限领一次）</p>
			    <div class="qq_message">
			    	<p>活动Q群号：562697313</p>
			    </div>
			</div>
			<div class="content_container" v-if="active==2">
				<h3>活动要求</h3>
				<p class="p_text" style="margin-top: 0.128rem;text-indent:2em">只面向原创长篇轻小说，9W字以上，可完结，可连载。可以在第一天发布出小说只有并与截稿日期前完成9W。且一个账号只能投2稿。9万字作为基本要求，但并非凑够九万字就可以入围，字数超过九万但无"结本性完结",仍不能进入评审。</p>
			    <p class="p_text">①：有违国家相关法律的文章一概不收。</p>
			    <p class="p_text">②：接受包含"卖肉""血腥""变态心理"等不和谐要素的文章，但不接受尺度过大的文章，比如正面详细描绘色情并将其作为卖点，等等。</p>
			    <p class="p_text">③：接受含有"腐"要素的原创小说。</p>
			    <p class="p_text" style="margin-bottom: 0.256rem;">④：支持它站作品投稿，但需无签约，并删除原有作品，请勿一稿多投，参加本次比赛的作品被视为QC自动拥有其网络传播权。</p>
			    <div class="qq_message">
			    	<p>活动Q群号：562697313</p>
			    </div>
			</div>
			<div class="content_container" v-if="active==3">
				<h3>活动时间</h3>
				<p class="p_text" style="margin-top: 0.328rem;text-align: center;">
					<span>征稿时间：2017/10/01-</span><span style="color: #ff2727;">2018/04/15</span></p>
			    <p class="p_text" style="text-align: center; margin: 0.0512rem 0;">
			    	<span>初审时间：2017/10/01-</span><span style="color: #ff2727;">2018/05/01</span></p>
			    <p class="p_text" style="margin-bottom: 0.356rem;text-align: center;">
			    	<span>发布时间：2017/10/01-</span><span style="color: #ff2727;">2018/05/15</span></p>
			    <div class="qq_message">
			    	<p>活动Q群号：562697313</p>
			    </div>
			</div>
			<div class="content_container" v-if="active==4">
				<h3>作品展示</h3>
				<div class="book_list">
					<div class="book_part" v-for="(obj,index) in bookList">
						<img :src=path.imagePath+obj.bookCoverImage />
						<p class="book_name">{{obj.bookName}}</p>
					</div>
				</div>
			    <div class="reload" @click="reloadFn">刷新</div>
			</div>
		</div>
		<div class="comment" @click="commentFn">
			<img src="http://cdn.qcacg.com/mobile/img/app_book/comment1.png" style="width: 100%;"/>
			<p style="font-size: 0.1024rem; color: #ffc71d; text-align: center; margin-top: 0.0256rem;">评论</p>
		</div>
	</div>
</template>

<script>
	import SZXJ from "~/components/vueHttp-app"
    import Path from "~/components/conf-app"
	export default{
		data:function(){
			return{
				path:Path,
				active:1,
				collectData: {
		            activeId: 2,
		            pageNum: 1,
		            pageSize: 8,
		            sort: 0
		        },
		        bookList:[],
		        bookPageTotal:0,
		        ws:{},
		        wn:{},
		        view:{},
		        mWidth:0,
		        
			}
		},
		mounted:function(){
			this.$nextTick(function(){
				this.mWidth = window.innerWidth;
				this.getDataFn()
				if(window.plus){
					this.plusReady();
				}else{
					document.addEventListener('plusready',this.plusReady,false);
				}
			})
		},
		methods:{
			plusReady:function(){
				var self = this;
				this.ws = plus.webview.currentWebview();
				this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
			        console.log('reject url: '+e.url);
			    });
				this.view = this.ws.getTitleNView();
//				this.view.drawText('活动详情', {top:'0px',left:((this.mWidth-100)/2).toString()+'px',width:'100px',height:'44px'}, {size:'17px',color:'#323232'});
				plus.key.addEventListener('backbutton',function(){
		      	   self.ws.close("slide-out-right");
	//	      	   self.ws.opener().reload();  //webview重新加载
		        })
				this.view.interceptTouchEvent(true)
            },
			tapMove:function(a){
				this.active = a;
			},
			commentFn:function(){
				if(window.plus){
					this.wn = plus.webview.create(Path.netWorks+'/commentFirst','commentFirst',
		        	{
				        'popGesture':'close',
				        'titleNView':{'backgroundColor':'#ffffff','titleText':'评论列表','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
				        'statusbar':{'background':'#ffffff'},
				        "backButtonAutoControl":'close'
			        });
			        this.wn.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
		        	this.wn.show('slide-in-right');
				}
			},
			reloadFn:function(){
				this.getDataFn();
			},
			getDataFn:function(){
				SZXJ.http(this, 'get', Path.collectArticle+'?activeId='+this.collectData.activeId+'&pageNum='+this.collectData.pageNum+'&pageSize='+this.collectData.pageSize+'&sort='+this.collectData.sort, this.collectData, (response) => {
                  this.bookList = response.data.data.list;
                  this.bookPageTotal = response.data.data.navigateLastPage
                   this.collectData.pageNum++;
                  if(this.collectData.pageNum > this.bookPageTotal){
                      this.collectData.pageNum = 1;
                  };
				})
			}
		},
		head:{
			title: '活动详情',
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
		          { rel: 'stylesheet', href: '/css/main_app.css' }
		    ],
		    script:[
		          {src:"/lib/resize_320.js"},
		    ]
		}
	}
</script>

<style>
	*{user-select: none;}
	.header{
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/bg_active.png');
	    background-size: 100% 100%;
	    background-repeat: no-repeat;
	    height: 2.1845rem;
    }
    .header .tap{
    	position: absolute;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	height: 0.3755rem;
    	background-color: rgba(255,255,255,0.2);
    	display: flex;
    }
    .header .tap .tap_part{
    	flex: 1;
    	position: relative;
    	line-height: 0.3755rem;
    	text-align: -webkit-center;
    }
    .header .tap .tap_part a{
    	font-size: 0.128rem;
    	color: #ffc71d;
    }
    .header .tap .tap_part span{
    	display: inline-block;
	    position: absolute;
	    bottom: 0;
	    left: 14%;
	    right: 14%;
	    height: 0.0216rem;
	    background-color: #77d0ff;
	    border-radius: 0.0216rem;
    }
    .content{
    	position: absolute;
    	left: 0;
    	right: 0;
    	bottom: 0;
    	top: 2.1845rem;
    	background-image: url('http://cdn.qcacg.com/mobile/img/app_read/bg_active1.png');
    	background-size: 100% auto;
    	background-repeat: no-repeat;
    	background-color: #f2f2f2;
    	padding: 0.128rem;
    }
    .content .content_container{
    	background-color: rgba(234,219,188,0.4);
	    width: 100%;
	    min-height: 1.5rem;
	    border: 0.0215rem #ffc39e solid;
	    border-radius: 0.04rem;
	    padding-bottom: 0.128rem;
	    box-sizing: border-box;
	    position: relative;
    }
    .content .content_container .reload{
        position: absolute;
	    top: 0.130rem;
	    right: 0.1024rem;
	    font-size: 0.1024rem;
	    color: #989898;
	    
    }
    .content .content_container h3{
    	text-align: center;
	    padding-top: 0.128rem;
	    color: #ffc71d;
    }
   .content .content_container .qq_message{
   	    position: absolute;
   	    right: 0.128rem;
   	    bottom: 0.128rem;
   }
	 .content .content_container .qq_message  p{
	   	   color: #ffcb3d;
	   	   font-size: 0.1024rem;
	   }
	  .content .content_container .book_list{
	  	width: 100%;
	  	margin-top: 0.128rem;
	  }  
	 .content .content_container .p_text{
	 	padding: 0 0.128rem;
	    line-height: 1.3;
	    color: #ff4e4e;
	    font-size: 0.1024rem;
    }
	  .content .content_container .book_list .book_part{
	  	width: 25%;
	  	display: inline-block;
	  	text-align: -webkit-center;
	  	vertical-align: top;
	  } 
	  .content .content_container .book_list .book_part img{
	  	width: 80%;
	  	height: 0.8448rem;
	  }
	  .content .content_container .book_list .book_part .book_name{
	  	width: 80%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    font-size: 1.638px;
	    font-size: 0.1024rem;
	    line-height: 1.2;
	    margin-top: 0.04rem;
	  }
	  .comment{
	  	    position: fixed;
		    right: 0.128rem;
		    bottom: 0.2rem;
		    width: 0.256rem;
		    height: 0.384rem;
	  }
</style>
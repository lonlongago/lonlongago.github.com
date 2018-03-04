<template>
<div id="ind">	
  <div>
    <div class="tp"></div>
  	<div class="top">
  		<div class="imtpo">
  			<img @click="updatFn(3)" v-if="loginFlag" class="log" :src="path.rootPath + userImage" alt="" />
  			<div @click="updatFn(4)" v-else class="logoo"></div>
  		</div>
  		<div class="sea" @click="updatFn(5)">
  			<input type="text" class="seacon" placeholder="点击此处进行搜索" disabled="disabled"/>
  		</div>
  	</div>
  </div>
  <div style="-webkit-overflow-scrolling: touch; overflow-y:scroll ; position: absolute; top: 0.547rem; bottom: 0; left: 0; right: 0;">
    <div>     
      <div class="swiper-container">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide" @click="activ"><img src="http://cdn.qcacg.com//img/Illustration/11_01.jpg"></div>
    			<div class="swiper-slide" @click="activ"><img src="http://cdn.qcacg.com//img/Illustration/11_02.jpg"></div>
    			<div class="swiper-slide" @click="imggoFn(71,'战姬少女不是人类？')"><img src="http://cdn.qcacg.com//img/Illustration/11_03.jpg"></div>
    		</div>
    		<div class="swiper-pagination swiprRem"></div>
    	</div>
    	<div class="choice">
    		<a class="but" href="javascript:;" @click="goClassFn()">
    			<img src="http://cdn.qcacg.com/mobile/img/clses.png" alt="" />
    			<p class="tit">分类</p>
    		</a>
    		<a class="but" href="javascript:;" @click="goRangFn()">
    			<img src="http://cdn.qcacg.com/mobile/img/ranks.png" alt="" />
    			<p class="tit">排行榜</p>
    		</a>
    		<a class="but" href="javascript:;" @click="goActiveFn()">
    			<img src="http://cdn.qcacg.com/mobile/img/activity.png" alt="" />
    			<p class="tit">活动</p>
    		</a>
    	</div>
    	<div class="recommend">
    		<div>
    			<div class="edic">
    				<img class="icon" src="http://cdn.qcacg.com/mobile/img/tranicon.png" alt="" />
    				<span>小编推荐</span>
    				<img class="trans" src="http://cdn.qcacg.com/mobile/img/updt.png" alt="" @click="updatFn(0)" />
    			</div>
    			<div class="edcon">
    				<a href="javascript:;" @click="gooFn(obj.bookId,obj.bookName)" class="edone" v-for="obj in translist">
    					<div class="bkimg">
    						<img :src="path.imagePath + obj.bookCoverImage" alt="" />
    					</div>
    					<div class="conte">
    						<div class="bkna">{{obj.bookName}}</div>
    						<div class="bkcon">{{obj.bookIntroduction}}</div>
    						<div class="boktype">
    							<span v-for="(temp,index) in obj.bookTypeList" v-if="index < 2">{{temp.bookTypeName}}</span>
    						</div>
    					</div>
    				</a>
    			</div>
    		</div>
    		<div class="edtwo">
    			<div class="edicone">
    				<span class="goodpe">好人榜</span>
    				<a href="javascript:;" @click="goRangFn()" class="tomor">更多</a>
    			</div>
    			<div class="edcyu">
	    			<div class="edconone">
	    			  <div style="height: 100%;min-width: 6.741rem;">
	    					<a href="javascript:;" @click="gooFn(obj.bookId,obj.bookName)" class="edgodpe" v-for="(obj,index) in rankinglist">
	    						<div class="peoimg">
	    							<img :src="path.imagePath + obj.bookCoverImage" alt="" />
	    							<!--<div class="ranknumber" v-if="index < 6">
	    					            <img v-if="index == 0" class="theRank" src="/img/icone.png" alt="" />
	    					            <img v-if="index == 1" class="theRank" src="/img/icone.png" alt="" />
	    					            <img v-if="index == 2" class="theRank" src="/img/icone.png" alt="" />
	    					            <img v-if="index == 3" class="theRank" src="/img/ictwo.png" alt="" />
	    					            <img v-if="index == 4" class="theRank" src="/img/ictwo.png" alt="" />
	    					            <img v-if="index == 5" class="theRank" src="/img/ictwo.png" alt="" />
	    					            <span v-if="index == 0" >1</span>
	    					            <span v-if="index == 1" >2</span>
	    					            <span v-if="index == 2" >3</span>
	    					            <span v-if="index == 3" >4</span>
	    					            <span v-if="index == 4" >5</span>
	    					            <span v-if="index == 5" >6</span>
	    					       </div>-->
	    						</div>
	    						<div class="edbkna">{{obj.bookName}}</div>
	    					</a>
	    				</div>	
	    			</div>
    			</div>
    		</div>
    		<div class="edtwo">
    			<div class="edicone">
    				<span class="goodpe">点击榜</span>
    				<a href="javascript:;" @click="goRangFn()" class="tomor">更多</a>
    			</div>
    			<div class="edcyu">
	    			<div class="edconone">
	    			  <div style="height: 100%;min-width: 6.741rem;">
	    			    <a href="javascript:;" @click="gooFn(obj.bookId,obj.bookName)" class="edgodpe" v-for="obj in clilist">
	    						<div class="peoimg">
	    							<img :src="path.imagePath + obj.bookCoverImage" alt="" />
	    						</div>
	    						<div class="edbkna">{{obj.bookName}}</div>
	    					</a>
	    			  </div>
	    			</div>
	    		</div>
    		</div>
    		<div class="edtwo">
    			<div class="edictot">
    				<img class="icon" src="http://cdn.qcacg.com/mobile/img/totrecom.png" alt="" />
    				<span>全站推荐</span>
    				<img class="trans" src="http://cdn.qcacg.com/mobile/img/updt.png" alt="" @click="updatFn(1)" />
    			</div>
    			<div class="totalls btn" @click="gooFn(obj.bookId,obj.bookName)" v-for="obj in totallist">
    				<div class="totone">
    					<div class="totimg">
    						<img :src="path.imagePath + obj.bookCoverImage" alt="" />
    					</div>
    					<div class="totcon">
    						<div class="bokname">{{obj.bookName}}</div>
    						<div style="height: .4rem; display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: -webkit-box;display: flex;-webkit-box-align: center;-moz-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;-webkit-box-pack: center;-moz-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;">
    							<div class="bookcont">{{obj.bookIntroduction}}</div>
    						</div>
    						<div class="allbok">
    							<div class="nam">{{obj.author}}</div>
    							<div class="bktype">
    								<span v-for="(temp,bj) in obj.bookTypeList" v-if="bj < 3">{{temp.bookTypeName}}</span>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div class="edtwo">
    			<div class="edicone">
    				<span class="goodpe">字数榜</span>
    				<a href="javascript:;" @click="goRangFn()" class="tomor">更多</a>
    			</div>
    			<div class="edcyu">
	    			<div class="edconone">
	    			  <div style="height: 100%; min-width: 6.741rem;">
	    					<a href="javascript:;" @click="gooFn(obj.bookId,obj.bookName)" class="edgodpe" v-for="obj in numberlist">
	    						<div class="peoimg">
	    							<img :src="path.imagePath + obj.bookCoverImage" alt="" />
	    						</div>
	    						<div class="edbkna">{{obj.bookName}}</div>
	    					</a>
	    				</div>	
	    			</div>
	    		</div>
    		</div>
    		<div class="edtwo">
    			<div class="edictot">
    				<img class="icon" src="http://cdn.qcacg.com/mobile/img/newbk.png" alt="" />
    				<span>新书推荐</span>
    				<img class="trans" src="http://cdn.qcacg.com/mobile/img/updt.png" alt="" @click="updatFn(2)" />
    			</div>
    			<div class="totalls btn" @click="gooFn(obj.bookId,obj.bookName)" v-for="obj in newbooklist">
    				<div class="totone">
    					<div class="totimg">
    						<img :src="path.imagePath + obj.bookCoverImage" alt="" />
    					</div>
    					<div class="totcon">
    						<div class="bokname">{{obj.bookName}}</div>
    						<div style="height: .4rem; display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: -webkit-box;display: flex;-webkit-box-align: center;-moz-box-align: center;-ms-flex-align: center;-webkit-align-items: center;align-items: center;-webkit-box-pack: center;-moz-box-pack: center;-ms-flex-pack: center;-webkit-justify-content: center;justify-content: center;">
                	<div class="bookcont">{{obj.bookIntroduction}}</div>
    						</div>
    						<div class="allbok">
    							<div class="nam">{{obj.author}}</div>
    							<div class="bktype">
    								<span v-for="(temp,bj) in obj.bookTypeList" v-if="bj < 3">{{temp.bookTypeName}}</span>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div class="edtwo">
    			<div class="edicone">
    				<span class="goodpe">最新更新</span>
    				<a href="javascript:;" @click="goClassFn()" class="tomor">更多</a>
    			</div>
    			<div class="edcyu">
	    			<div class="edcontwo">
	    			  <div style="height: 100%;min-width: 6.741rem;">
	    			    <a href="javascript:;" @click="gooFn(obj.bookId,obj.bookName)" class="edgodpe" v-for="obj in updatalist">
	    						<div class="peoimg">
	    							<img :src="path.imagePath + obj.bookCoverImage" alt="" />
	    						</div>
	    						<div class="edbkna">{{obj.bookName}}</div>
	    					</a>
	    			  </div>
	    			</div>
	    		</div>
    		</div>
    	</div>
    </div>
  </div>
	<script src="/lib/resize_320.js"></script>
	<script src="/lib/swiper.js"></script>


</div>
</template>

<script>
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
export default{
	data:function(){
		return{
			path:appPathList,
			szxj:SZXJ,
			translist:[],
			totallist:[],
			newbooklist:[],
			RequestObj:{
				rankList:0,
				timeRank:0,
				date:1,
				bookTypeId:'',
				pageNo:1,
				pageSize:10,
			},
			Fobj:{
				rankList:1,
				timeRank:0,
				date:1,
				bookTypeId:'',
				pageNo:1,
				pageSize:10,
			},
			Robj:{
				rankList:2,
				timeRank:0,
				date:1,
				bookTypeId:'',
				pageNo:1,
				pageSize:10,
			},
			rankinglist:[],
			numberlist:[],
			clilist:[],
			updatalist:[],
			loginFlag:'',
			userImage:'',
			ws:{},
			wn:{},
			wc:{},
			mHeight:0,
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getValueFn();
			this.mHeight = window.innerWidth;
			window.addEventListener('scroll', this.onscrollFn);
			var mySwiper = new Swiper(".swiper-container",{  
		        direction:"horizontal",/*横向滑动*/  
		        loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/  
		        pagination:".swiper-pagination",/*分页器*/  
		        autoplay:3000/*每隔3秒自动播放*/  
		    })
			if(window.plus){
			  this.plusReady();
			}else{
			  document.addEventListener('plusready', this.plusReady, false);
			}
		})
	},
	methods:{
	  plusReady:function(){
	    this.ws=plus.webview.currentWebview();
	  },
	  openView:function(){
	    
	  },
	  goActiveFn:function(){
	     if(window.plus){
//		    if(plus.webview.getWebviewById('book')){
//		      this.wn = plus.webview.getWebviewById('book');
//		      this.wn.loadURL('https://ex.qcacg.com/mView/book/'+b);
//		    }else{
		      this.wn=plus.webview.create(appPathList.netWorks+'/activity','activity',
		      {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':'活动','titleColor':'#000000','autoBackButton':true,'titleOverflow':'ellipsis','splitLine':{color:'#C3C3C3'}},
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
      }else{
//      location.href = "/mView/book/" + b;
      }
	  },
	  activ: function(){
	  	if(window.plus){
				this.wn=plus.webview.create(appPathList.netWorks+'/activeDetails','activeDetails',
	            {
			        'popGesture':'close',
			        'titleNView':{
			        	'autoBackButton':true,
			        	'type':'transparent'
			        },
			        'backButtonAutoControl':'close',
			        'statusbar': {
			            'background': '#fff'
			        },
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
	  imggoFn: function(b,bookName){
	  	if(window.plus){
		      this.wn=plus.webview.create(appPathList.netWorks+'/book/'+b,'book',
		      {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,'titleColor':'#000000','autoBackButton':true,titleOverflow:'ellipsis',splitLine:{color:'#C3C3C3'}},
		        'statusbar':{'background':'#ffffff'},
		        "backButtonAutoControl":'close'
	       });
	        this.wn.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
//		    }
        this.wn.show('slide-in-right');
      }
	  },
		gooFn: function(b,bookName){
		  if(window.plus){
//		    if(plus.webview.getWebviewById('book')){
//		      this.wn = plus.webview.getWebviewById('book');
//		      this.wn.loadURL('https://ex.qcacg.com/mView/book/'+b);
//		    }else{
		      this.wn=plus.webview.create(appPathList.netWorks+'/book/'+b,'book',
		      {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':bookName,'titleColor':'#000000','autoBackButton':true,titleOverflow:'ellipsis',splitLine:{color:'#C3C3C3'}},
		        'statusbar':{'background':'#ffffff'},
		        "backButtonAutoControl":'close'
	       });
	        this.wn.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
//		    }
        this.wn.show('slide-in-right');
      }else{
//      location.href = "/mView/book/" + b;
      }
		},
		goClassFn:function(){
			if(window.plus){
        this.wn = plus.webview.create(appPathList.netWorks+'/classes','classes',
        {
        'popGesture':'close',
        'titleNView':{'backgroundColor':'#ffffff','titleText':'分类','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
      }else{
//      location.href = '/mView/classes';
      }
		},
		goRangFn:function(){
		  if(window.plus){
        this.wn = plus.webview.create(appPathList.netWorks+'/Ranking','Ranking',
        {
        'popGesture':'close',
        'titleNView':{'backgroundColor':'#ffffff','titleText':'排行榜','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
      }else{
//      location.href = '/mView/Ranking';
      }
		},
		updatFn: function(a){
			if(a == 0){
				SZXJ.http(this,'get',appPathList.mobileEditorRecommendedData,{},(response)=>{
					this.translist = response.data.data;
				})
			}else if(a == 1){
				SZXJ.http(this,'get',appPathList.mobileAllRecommendedData,{},(response)=>{
					this.totallist = response.data.data;
				})
			}else if(a == 2){
				SZXJ.http(this,'get',appPathList.mobileNewRecommendedData,{},(response)=>{
					this.newbooklist = response.data.data;
				})
			}else if(a == 3){
					if(window.plus){
			        this.webBook = plus.webview.create(appPathList.netWorks+'/userInfoMsg','userInfoMsg',
			        {
			        'popGesture':'close',
			        'titleNView':{'backgroundColor':'#ffffff','titleText':'个人信息','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			        'statusbar':{'background':'#ffffff'},
			        "backButtonAutoControl":'close'
			        });
			        this.webBook.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.webBook.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
			        this.webBook.show('slide-in-right');
			      }
//				location.href = '/mView/userInfo';
			}else if(a == 4){
		      if(window.plus){
		        this.webBook = plus.webview.create(appPathList.netWorks+'/login','login',
		        {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':'登录','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
		        'statusbar':{'background':'#ffffff'},
		        "backButtonAutoControl":'close'
		        });
		        this.webBook.onloading= function(){
							plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
						}
						this.webBook.onloaded=function(){
							plus.nativeUI.closeWaiting();
						}
		        this.webBook.show('slide-in-right');
		      }else{
//		        location.href = "/mView/login";
		      }
			}else if(a == 5){
			  if(window.plus){
			    this.wn = plus.webview.create(appPathList.netWorks+'/search','search',
			    {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':'','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
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
			  }else{
//			    location.href = '/mView/search';
			  }
			}
		},
		getValueFn: function(){
			var self = this;
			SZXJ.http(this,'get',appPathList.mobileIndexData,{},(response)=>{
				this.translist = response.data.data.editorRecommended;
				this.totallist = response.data.data.allRecommended;
				this.newbooklist = response.data.data.newRecommended;
			});
			SZXJ.http(this,'get',appPathList.getRankingList,this.RequestObj,(response)=>{  //好人榜
				this.rankinglist = response.data.result;
			});
			SZXJ.http(this,'get',appPathList.getRankingList,this.Fobj,(response)=>{  //字数榜
				this.numberlist = response.data.result;
			});
			SZXJ.http(this,'get',appPathList.getRankingList,this.Robj,(response)=>{   //点击榜
				this.clilist = response.data.result;
			});
			SZXJ.http(this,'get',appPathList.lastUpdate + '?pageNo=' + this.RequestObj.pageNo + '&pageSize=' + this.RequestObj.pageSize,{},(response)=>{
				this.updatalist = response.data.data;
			});
			SZXJ.http(this,'get',appPathList.getStatus,{},(response)=>{
				this.loginFlag = response.data.loginFlag;
				if(this.loginFlag){
	                	this.userImage = response.data.status.userImage;
	              } 
			})
		},
	}
}
</script>

<style>
	body{background-color: #f4f4f4;}
	*{margin: 0;padding: 0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;user-select: none;}
	#ind{ height: 100%; width: 100%; position: relative;}
	.tp{background: #ffca35;height: .171rem;}
	.edcyu{height: 100%;background: white;padding:.0853rem .128rem;margin-top: 1px;}
	.trans:hover{transform: rotate(120deg);}
	.btn{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}
	.btn:hover{outline:0;cursor:pointer}
	.btn:focus{outline:0;cursor:pointer}
	.btn:active{-webkit-box-shadow:inset 0 0 1px rgba(0,0,0,.7);box-shadow:inset 0 0 1px rgba(0,0,0,.7)}
	.imtpo{border-radius: 2rem;height: .2875rem;width: .3rem;box-sizing: border-box;background-color: white; display: inline-block; margin-left: 0.128rem; margin-top: 0.0445rem; vertical-align: top;}
	#ind .top{background: #ffca35;width: 100%;height: .376rem;}
	#ind .top .log{border-radius: 2rem;height: .235rem;width: .2475rem;margin-left: .02625rem;margin-top: .02625rem;box-sizing: border-box;}
	#ind .top .logoo{border-radius: 2rem;height: .235rem;width: .2475rem;margin-left: .02625rem;margin-top: .02625rem;background-color: #4F4F4F;}
	#ind .top .sea{margin-top: .0815rem;width: 80%; display: inline-block; vertical-align: top;}
	#ind .top .sea .seacon{margin-left: 0.0854rem;height: .213rem;width: 100%;border-radius: 1rem;background-image: url(http://cdn.qcacg.com/mobile/img/app_ranking/search.png);background-repeat: no-repeat;background-position: .0815rem center;background-size: .128rem;border: 0;font-family: "微软雅黑";font-size: .1152rem;padding-left: .273rem;box-sizing: border-box;padding-top: .03rem;}
	#ind  .swiper-container{height: 1.35rem;}
	#ind  .swiper-container .swiper-slide img{height: 1.35rem;width: 100%;}
	.swiper-pagination{bottom:.1rem!important;width: 100%;}
	.swiper-pagination-bullet{margin-right: .1rem;}
	#ind  .choice{height: .708rem;background-color: white;width: 100%;text-align: center;padding: .128rem 0;box-sizing: border-box;}
	#ind  .choice .but{width: 32%;display: inline-block;text-align: center;}
	#ind  .choice .but img{height: .2475rem;width: .2475rem;}
	#ind  .choice .but .tit{font-family: "微软雅黑";font-size: .1152rem;padding-top: .0853rem;}
	#ind  .recommend{width: 100%; margin-top:0.128rem}
	#ind  .recommend .edic{height: .376rem;width: 100%;background-color: white;margin-bottom: 1px;}
	#ind  .recommend .edic .icon{width: .222rem;height: .222rem;padding: .077rem .064rem .077rem .128rem;}
	#ind  .recommend .edic span{font-size: .128rem;position: absolute;padding: .124rem 0;}
	#ind  .recommend .edic .trans{width: .145rem;height: .128rem;float: right;margin-right: .128rem;margin-top: .124rem;}
	#ind  .recommend .edcon{width: 100%;}
	#ind  .recommend .edcon .edone{background-color: white;width: 49.8%;height: 1.01rem;padding: .0853rem .0853rem .0853rem .128rem;box-sizing: border-box;display: inline-block;margin-right: 0.2%;margin-bottom: 0.2%;}
	#ind  .recommend .edcon .edone .bkimg{width: 42%;height: .8363rem;display: inline-block;margin-right: .0853rem;vertical-align: top;}
	#ind  .recommend .edcon .edone .bkimg img{width: .5888rem;height: .8363rem;background-color: wheat;border-radius: 4px;}
	#ind  .recommend .edcon .edone .conte{display: inline-block;vertical-align: top;height: .8363rem;width: 51%;}
	#ind  .recommend .edcon .edone .conte .bkna{height: .28rem;font-family: "微软雅黑";font-size: .1152rem;line-height:1.3;margin-bottom: .0512rem;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	#ind  .recommend .edcon .edone .conte .bkcon{width:107%;font-family: "微软雅黑";font-size: .1024rem;color: #989898;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 1.45;margin-bottom: .1024rem;height: .28rem;}
	#ind  .recommend .edcon .edone .conte .boktype{text-align: right;display: inline-block;vertical-align: bottom;}
	#ind  .recommend .edcon .edone .conte .boktype span{font-size: 0.1024rem;padding: 0 0.0256rem;border: 1px solid #989898;color: #989898;margin-right: .02rem;border-radius: 2px;}
	#ind  .recommend .edtwo{margin-top: .0853rem;width: 100%;}
	#ind  .recommend .edtwo .edicone{height: .376rem;width: 100%;padding: .124rem .128rem;box-sizing: border-box;position: relative;background-color: white;}
	/*.edicone:after{height: .009rem;left: 0;right: 0;bottom: 0;background: #C3C3C3;content: '';position: absolute;}*/
	#ind  .recommend .edtwo .edicone .goodpe{color: #fedc6f;font-family: "微软雅黑";font-size: .128rem;}
	#ind  .recommend .edtwo .edicone .tomor{color:#989898;font-family: "微软雅黑";font-size: .128rem;float: right;background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/right.png);background-size: .0753rem .1166rem;background-position: right;background-repeat: no-repeat;padding-right: .128rem;padding-top: .013rem;}
	#ind  .recommend .edtwo .edconone{width: 100%;box-sizing: border-box;overflow-x: scroll;background-color: white;}
	#ind  .recommend .edtwo .edconone::-webkit-scrollbar {/*隐藏滚轮*/
	  display: none;
	}
	#ind  .recommend .edtwo .edconone .edgodpe{width: .5888rem;height: 1.1524rem;margin-right: .0853rem; display: inline-block; vertical-align: top;}
	#ind  .recommend .edtwo .edconone .peoimg{width: .5888rem;height: .828rem;}
	#ind  .recommend .edtwo .edconone .peoimg img{width: .5888rem;height: .828rem;background-color: wheat;border-radius: 4px;}
	#ind  .recommend .edtwo .edictot{height: .376rem;width: 100%;background-color: white;position: relative;}
	/*.edictot:after{height: .0088rem;left: 0;right: 0;bottom: 0;background: #C3C3C3;content: '';position: absolute;}*/
	#ind  .recommend .edtwo .edictot .icon{width: .222rem;height: .222rem;padding: .077rem .064rem .077rem .128rem;}
	#ind  .recommend .edtwo .edictot span{font-size: .128rem;position: absolute;padding: .124rem 0;}
	#ind  .recommend .edtwo .edictot .trans{width: .145rem;height: .128rem;float: right;margin-right: .128rem;margin-top: .124rem;}
	#ind  .recommend .edtwo .totalls{height: 1.135rem;width: 100%;padding: .1195rem .128rem;box-sizing: border-box;background-color: white;margin-top: 1px;}
	#ind  .recommend .edtwo .totalls .totone{height: .896rem;width: 100%;}
	#ind  .recommend .edtwo .totalls .totone .totimg{height: .896rem;width: 22%;margin-right: .1408rem;display: inline-block;vertical-align: top;}
	#ind  .recommend .edtwo .totalls .totone .totimg img{height: .896rem;width: .64rem;background-color: wheat;border-radius: 4px;}
	#ind  .recommend .edtwo .totalls .totone .totcon{height: .896rem;width: 73%;display: inline-block;vertical-align: top; background-color: #fff;}
	#ind  .recommend .edtwo .totalls .totone .totcon .bokname{line-height:1.1;font-size: 0.128rem;margin-bottom: 0.128rem;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;}
	#ind  .recommend .edtwo .totalls .totone .totcon .bookcont{width:100%;color:#989898;line-height: 1.8;font-size: 0.1109rem;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
	#ind  .recommend .edtwo .totalls .totone .totcon .allbok{margin-top: 0.1rem;}
	#ind  .recommend .edtwo .totalls .totone .totcon .allbok .nam{line-height:1.2;color:#989898;display: inline-block;width: 55%;overflow: hidden;font-size: 0.111rem;height:.128rem;padding-left: 0.2048rem;background-image: url(http://cdn.qcacg.com/mobile/img/app_ranking/my.png);background-repeat: no-repeat;background-size: 0.1195rem .128rem;background-position: left center;box-sizing: border-box;vertical-align: bottom;}
	#ind  .recommend .edtwo .totalls .totone .totcon .allbok .bktype{display: inline-block;width: 45%;vertical-align: bottom;text-align: right;}
	#ind  .recommend .edtwo .totalls .totone .totcon .allbok .bktype span{font-size: 0.1024rem;padding: 0 0.0256rem;border: 1px solid #989898;color: #989898;margin-right: .02rem;border-radius: 2px;}
	/*#ind  .recommend .edtwo .edconone .peoimg .ranknumber{display: inline-block;}
	#ind  .recommend .edtwo .edconone .peoimg .ranknumber .theRank{width:.137rem;height:.137rem}
	#ind  .recommend .edtwo .edconone .peoimg .ranknumber span{font-size:.11rem}*/
	#ind  .recommend .edtwo .edconone .edbkna{font-family: "微软雅黑";font-size: .1152rem;text-align: center;padding-top: .02rem;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: .15rem;}
	#ind  .recommend .edtwo .edcontwo{width: 100%;box-sizing: border-box;overflow-x: scroll;background-color: white;}
	#ind  .recommend .edtwo .edcontwo .edgodpe{width: .5888rem;height: 1.1524rem;margin-right: .0853rem; display: inline-block; vertical-align: top;}
	#ind  .recommend .edtwo .edcontwo .peoimg{width: .5888rem;height: .828rem;}
	#ind  .recommend .edtwo .edcontwo .peoimg img{width: .5888rem;height: .828rem;background-color: wheat;border-radius: 4px;}
	#ind  .recommend .edtwo .edcontwo .edbkna{font-family: "微软雅黑";font-size: .1152rem;text-align: center;padding-top: .02rem;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: .15rem;}
</style>
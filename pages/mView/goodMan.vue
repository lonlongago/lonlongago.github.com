<template>
  <div id="list">
  	<!--<div class="tp"></div>-->
    <!--<div class="header">
      <a href="javascript:;" class="jump" @click="goBack"><img class="arrow" src="/img/app_goodMan/goodman01.png" alt=""/></a>
      <a href="javascript:;" class="time" @click="tapMove(1)">
        <div>周</div>
        <span :class="active==1?'active hr':'hr'"></span>
      </a>
      <a href="javascript:;" class="time" @click="tapMove(2)">
        <div>月</div>
        <span :class="active==2?'active hr':'hr'"></span>
      </a>
      <a href="javascript:;" class="time" @click="tapMove(3)">
        <div>总</div>
        <span :class="active==3?'active hr':'hr'"></span>
      </a>
    </div>-->
    <div class="bgh"></div>
    <div class="wrap">
    	
      <li v-for="(obj,index) in rewardList" v-if="index<=2">
        <img  class="listOne" src="http://cdn.qcacg.com/mobile/img/app_goodMan/first.png" v-if="index==0" />
        <img  class="listOne" src="http://cdn.qcacg.com/mobile/img/app_goodMan/second.png" v-if="index==1"/>
        <img  class="listOne" src="http://cdn.qcacg.com/mobile/img/app_goodMan/three.png" v-if="index==2"/>
        <a class="con" href="#"><img class="firstHead" :src="Path.imagePath + obj.userHead" style="border-radius: 100%;" onerror="javascript:this.src='http://cdn.qcacg.com/mobile/img/user_info_touxiang.jpg'" alt="" /></a>
        <span class="num">{{obj.userName}}</span>
        <span class="rightnum">{{obj.cardAmount}}</span>
      </li>
      <li v-for="(obj,index) in rewardList" v-if="index>2">
        <span  class="listOther">{{index+1}}</span>
        <a class="con" href="#"><img class="otherHead" :src="Path.imagePath + obj.userHead" style="border-radius: 100%;" onerror="javascript:this.src='http://cdn.qcacg.com/mobile/img/user_info_touxiang.jpg'" alt="" /></a>
        <span class="num">{{obj.userName}}</span>
        <span class="rightnum">{{obj.cardAmount}}</span>
      </li>
    </div>
    
  </div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  export default{
    data:function(){
      return {
        Path:appPathList,
        active:1,
        rewardList:[],
        monthWorBookReward:[],
        totalWorBookReward:[],
        weekWorBookReward:[],
        ws:{},
        view:{},
        mWidth:0
      }
    },
    asyncData(context){
      console.log(context);
      var obj = {};
      obj.bookId = context.params.bookId;
      console.log(obj.bookId);
      return axios.get(appPathList.queryBookRank+"?bookId="+obj.bookId).then(function(res){
        obj.weekWorBookReward = res.data.weekWorBookReward;
        obj.monthWorBookReward = res.data.monthWorBookReward;
        obj.totalWorBookReward = res.data.totalWorBookReward;
        return obj
      }).catch(function(err){
      })
    },
    mounted:function(){
      this.$nextTick(function(){
        this.rewardList = this.weekWorBookReward;
        this.mWidth = window.innerWidth
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready',this.plusReady,false);
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
        this.view = this.ws.getTitleNView()
        this.view.drawText('周',{top:'0px',left:'16%',width:'16%',height:'44px'},{size:'16px',color:'#fff'})
		    this.view.drawText('月',{top:'0px',left:'42%',width:'16%',height:'44px'},{size:'16px',color:'#fff'})
		    this.view.drawText('总',{top:'0px',left:'68%',width:'16%',height:'44px'},{size:'16px',color:'#fff'})
		    this.view.drawRect({color:'#fff',radius:'2px'},{top:'36px',left:'16%',width:'16%',height:'2px'},'goodMans')
//		   	this.view.setTouchEventRect({top:'0px',left:'16%',width:'68%',height:'44px'});
		   	this.view.interceptTouchEvent(true)
		   	plus.key.addEventListener('backbutton',function(){
	      	self.ws.close("slide-out-right");
	      })
		   	this.view.addEventListener("touchend", self.tapMove, false);
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      tapMove:function(e){
//      this.active = a;
//      if( a == 1){
//        this.rewardList = this.weekWorBookReward;
//      }else if(a == 2){
//        this.rewardList = this.monthWorBookReward;
//      }else if(a == 3){
//        this.rewardList = this.totalWorBookReward;
//      }
			  if(e.clientX<this.mWidth*0.32 && e.clientX>this.mWidth*0.16){
					console.log('周')
					this.view.drawRect({color:'#fff',radius:'2px'},{top:'36px',left:'16%',width:'16%',height:'2px'},'goodMans');
					this.rewardList = this.weekWorBookReward;
				}
				if(e.clientX<this.mWidth*0.58 && e.clientX>this.mWidth*0.42){
					console.log('月')
					this.view.drawRect({color:'#fff',radius:'2px'},{top:'36px',left:'42%',width:'16%',height:'2px'},'goodMans')
					this.rewardList = this.monthWorBookReward;
				}
				if(e.clientX<this.mWidth*0.84 && e.clientX>this.mWidth*0.68){
					console.log('总')
					this.view.drawRect({color:'#fff',radius:'2px'},{top:'36px',left:'68%',width:'16%',height:'2px'},'goodMans')
					this.rewardList = this.totalWorBookReward;
				}
      },
     
    },
    head:{
      title: '好人榜-QC轻小说',
      meta: [
        { charset: 'UTF-8' },
        { name: 'apple-touch-fullscreen', content: 'yes' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: "apple-mobile-web-app-capable",content:"yes"},
        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
        { name: "description",content:"轻小说章节"},
        { hid: "1",content:"no-cache", "http-equiv": "pragma"},
        { hid: "3",content:"no-cache", "http-equiv": "cache-control"},
        { hid: "2",content:"0", "http-equiv":"expires"}
      ],
      link: [
        { rel: 'stylesheet', href: '/css/main_app.css' }
      ],
      script:[
        { src: "/lib/resize_320.js"}
      ]
    }
  }
</script>

<style scoped>
	.tp{background: #ffd700;height: .171rem;position: fixed;width: 100%;}
  #list{font-size: 12px;background-color: #f2f2f2;overflow-x: hidden;position: fixed; top: 0; left: 0; right: 0; bottom: 0; }
  #list .header{width: 100%;height: 0.3584rem;margin: 0 auto;background-color: #ffd700;}
  #list .header .jump{}
  #list .header .jump .arrow{display: inline-block;width:auto;height: 0.1280rem;vertical-align: middle;margin-left: 4%;}
  #list .header .time{position:relative;display: inline-block;width: 16%;vertical-align: middle;line-height: 0.2475rem;text-align: center;font-size: 0.128rem;color: #fff;margin-left: 0.3157rem; padding: 0.1152rem 0;}
  #list .header .time .hr{display:inline-block;position: absolute;bottom:0.0512rem;left:0;width: 100%;}
  #list .active{border-bottom: 0.0213rem solid #fff;border-radius: 3px;}
  #list .wrap{background-color: #f2f2f2;border-top: 1px solid #f4fdfa;border-radius: .0597rem;z-index: 9999;  position: absolute; top: 0; bottom: 0; left: 0; right: 0; right: 0; z-index: 5;}
  #list .wrap li .listOne{display: inline-block;height: .1749rem;margin-left: .1195rem;vertical-align: middle;}
  #list .wrap li .con{display: inline-block;vertical-align: middle;width: .3669rem;height: .3669rem;margin:.1152rem .0554rem;}
  #list .wrap li .con .firstHead{display: inline-block;width: auto;height: .3669rem;}
  #list .wrap li .con .otherHead{display: inline-block;width: .2816rem;margin: .0426rem;}
  #list .wrap li .num{display: inline-block;font-size: .0896rem;color: #656565;width: 0.8533rem;text-overflow:ellipsis;overflow: hidden;vertical-align: middle;margin-left: .0513rem;white-space: nowrap; font-size: 0.1024rem;}
  #list .wrap li .rightnum{display: inline-block;font-size: .0853rem;color:#ffd700;vertical-align: middle;max-width: .5376rem;text-align: center;text-overflow:ellipsis;overflow: hidden;margin-left: 0.9387rem;white-space: nowrap;}
  #list .wrap li .listOther{display:inline-block;width: .2219rem;line-height:.1749rem;color: #ff616f;font-size: .0853rem;text-align: center;margin-left: .1195rem;vertical-align: middle;}
  #list .wrap li .con .pic{display: inline-block;width: .256rem;height: .256rem;border:4px solid #fff;border-radius: 50%;background-color: #272636;box-shadow: 0 0 6px #fff;margin-left:.01rem;}
  #list .bgh{
  	position: absolute;
  	top: 0;
  	left: 0;
  	right: 0;
  	height: 0.0597rem;
  	content: '';
  	background-color:#ffd700;
  	z-index: 2;
  }
</style>

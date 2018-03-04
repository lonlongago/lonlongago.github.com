<template>
	<div v-show="displayFlag" style="display: none;" id="modify" class="modify">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<script src="/lib/jquery.js"></script>
		<script src="/lib/mobiscroll.js"></script>
		<div id="pull"></div>
		<div class="content">
			<myheader msg="个人信息"></myheader> 
		    <div class="main">
		      <div class="list">
		        <div class="title">头像</div>
		          <img class="headimg" :src="path.imagePath + userHead" alt=""  />
		      </div>
		      <div class="list">
		        <div class="title">昵称</div>
		        <div class="right">
		          <input type="" name="" id="" placeholder="请输入昵称" v-model="userName"/>
		          <img class="pen" src="http://cdn.qcacg.com/img/app_index/modify_03.png" alt=""  />
		        </div>
		      </div>
		      <div class="list">
		        <div class="title">简介</div>
		        <div class="right">
		          <input type="" name="" id="" value="" placeholder="我们大佬都不需要简介" v-model="information"/>
		          <img class="pen" src="http://cdn.qcacg.com/img/app_index/modify_03.png" alt=""  />
		        </div>
		      </div>
		      <div class="list" @click="windowFn()" >
		        <div class="title">性别</div>
		        <div class="right">
		          <span v-if="sex == '男生'" class="sex">男</span>
		          <span v-else class="sex">女</span>
		          <img class="go" src="http://cdn.qcacg.com/img/app_index/core_13.png" alt=""  />
		        </div>
		      </div>
		      <div class="list">
		        <div class="title">生日</div>
		        <div class="right">
		          <div class="item item-buydate input-group">
		            <input class="txt-input txt-buydate no-border-left text-right" id="myText" type="text" v-model="birthday" readonly>
		          </div>
		          <img class="go" src="http://cdn.qcacg.com/img/app_index/core_13.png" alt=""  />
		        </div>
		      </div>
		      <div class="list">
		        <div class="title">手机号码</div>
		        <div class="right">
		          <span class="phone">{{queryUser.telephone}}</span>
		          <img class="go" src="http://cdn.qcacg.com/img/app_index/core_13.png" alt=""  />
		        </div>
		      </div>
		    </div>
		    <a href="/app/password">
		      <div class="main">
		        <div class="list">
		          <div class="title">修改密码</div>
		          <img class="goSec" src="http://cdn.qcacg.com/img/app_index/core_13.png" alt=""  />
		        </div>
		      </div>
		    </a>
		    <div class="remark">注： 修改名称需要600张好人卡</div>
		    <div @click="modifyFn()" class="true">确认修改</div>
		    <div v-if="windowFlag" class="window">
		      <div class="details" @click="sexFn(1)" >男</div>
		      <div class="details replySec" @click="sexFn(2)">女</div>
		      <div class="details cancel" @click="windowFlagFn()" >取消</div>
		    </div>
		    <appBottom></appBottom>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Headerapt'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList,
		'myheader':Header
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			displayFlag:false,
		    path: appPathList,
		    szxj:SZXJ,
		    queryUser:'',
		    windowFlag:false,
		    userName:'',
		    information:'',
		    sex:'男生',
		    birthday:'',
		    menuList: false,
		    toWrap: false,
		    userHead:'',
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
    	this.displayFlag = true;
    	$('.item-buydate').mdater();
    	k_touch("modify", "y");
	  })
	},
	methods: {
	    showMenu: function() {
		    this.menuList = !this.menuList
		    this.toWrap = !this.toWrap;
		    if(this.menuList){
		        document.body.style.overflow = "hidden";
		    }else{
		        document.body.style.overflow = "auto";
		    };
			},
	    windowFlagFn:function(){
	      this.windowFlag = false;
	    },
	    windowFn:function(){
	      this.windowFlag = true;
	    },
	    sexFn(s){
	      if( s == 1 ){
	        this.sex = '男生';        
	      }else{
	        this.sex = '女生';  
	      }
	      this.windowFlag = false;
	    },
	    modifyFn:function(){
	    	if (SZXJ.trimToStr(this.userName.toString()).length == 0) {
	      	prompt("昵称不允许为空");
	      	return;
	      }
	      if (SZXJ.trimToStr(this.userName.toString()).length > 10) {
	      	prompt("昵称长度不能超过10个字符");
	      	return;
	      }
	      if (SZXJ.trimToStr(this.information.toString()).length > 30){
	      	prompt("简介长度不能超过30个字符");
	      	return;
	      }
	      
	      var _data = {}
	      _data.userName = SZXJ.trimToStr(this.userName.toString());
	      _data.information = SZXJ.trimToStr(this.information.toString());
	      _data.sex = this.sex;
	      _data.birthday = document.getElementById("myText").value; 
	  	 	
	  	 	SZXJ.http(this,'post', appPathList.updateUser, _data, (response) => {
	        if (response.data.msg === 'success') {
	          prompt("修改成功");
	          this.getValueFn();
	        }
	      },(err)=>{
	      	prompt(err.data.msg);
	      });
	    },
	    getValueFn:function(){
	      SZXJ.http(this,'post', appPathList.queryUser, {}, (response) => {
	          this.queryUser = response.data;
	          this.userHead = response.data.userHead;
	          this.userName = response.data.userName;
	          this.birthday = response.data.birthday;
	          this.information = response.data.information;
	          this.sex = response.data.sex;
	      });
	      this.$nextTick(function(){
		      this.displayFlag = true;
		      var  This = this;
		      setTimeout(function(){
		        document.body.removeChild(document.getElementById("loading"));
		      },300)
		    });
	    },
	},
  	head: function(){
  		return {
  			title: '个人信息-QC轻小说',
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
  		    	{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		]
  	  }
  	}
}
</script>

<style>
		
	body *{border: 0;}
    input{height:.4rem}
    body{padding-bottom:.8rem;background-color:#f4f4f4}
    .modify .content{max-width: 7.5rem;margin:0 auto;position:relative;min-height:12rem;margin-top: 0.88rem;}
    
    .modify .content .main{background-color:#fff;border-bottom:.011rem solid rgba(0,0,0,.15);margin-top:3% ;}
    .modify .content .main .list{border-bottom:1px solid rgba(0,0,0,.05);overflow:hidden;vertical-align:middle;padding:2% 3% 2% 5%;height:.55rem;line-height:1.5}
    .modify .content .main .list .headimg{width:.42rem;height:.42rem;border-radius:5rem;float:right;vertical-align:middle;margin-top:1%}
    .modify .content .main .list .title{vertical-align:middle;display:inline-block;float:left;padding-top:1%;font-size:.28rem;text-align:center;color:rgba(0,0,0,.8)}
    .modify .content .main .list .pen{width:.2rem;height:.25rem;position:absolute;right:0;top:25%}
    .modify .content .main .list .right{display:inline-block;float:right;padding-top:.5%;width:5rem;text-align:right;font-size:.32rem;position:relative}
    .modify .content .main .list .right span{font-size:.28rem;margin-right:6%}
    .modify .content .main .list input{text-align:right;font-size:.28rem;margin-right:6%;width:84%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .modify .content .small{margin-top:5%;margin-bottom:2%}
    .modify .content .main .list .go{height:.2rem;right:0;top:35%;position:absolute}
    .modify .content .main .list .goSec{height:.2rem;margin-left:2%;float:right;padding-top:3%}
    .modify .content .true{padding:1% 2.5%;background-color:#3fd2e8;text-align:center;margin:5% 20% 0 20%;border-radius:5rem;color:#fff;font-size:.28rem}
    .modify .content .window{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.3);height:100%}
    .modify .content .window .details{background-color:rgba(255,255,255,.9);padding:1% 0;font-size:.32rem;text-align:center;position:absolute;bottom:10%;width:100%}
    .modify .content .window .replySec{bottom:5%}
    .modify .content .window .cancel{bottom:0}
    a{-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}
    .md_mask{width:100%;height:100%;-moz-transition:opacity .5s linear 0s;-webkit-transition:opacity .5s linear 0s;-o-transition:opacity .5s linear 0s;-ms-transition:opacity .5s linear 0s;transition:opacity .5s linear 0s;position:absolute;top:0;left:0;display:block;visibility:hidden;background:#000;opacity:0;z-index:1000}
    .md_mask.show{visibility:visible;opacity:.25}
    .md_panel{-moz-transition:-moz-transform .3s ease-in-out 0s;-ms-transition:-ms-transform .3s ease-in-out 0s;-webkit-transition:-webkit-transform .3s ease-in-out 0s;-o-transition:-o-transform .3s ease-in-out 0s;transition:transform .3s ease-in-out 0s;-ms-transform:translate3d(0,100%,0);-moz-transform:translate3d(0,100%,0);-webkit-transform:translate3d(0,100%,0);-o-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);position:fixed;bottom:0;left:0;width:100%;height:auto;z-index:1100;background-color:#F7F7F7;font-family:Tahoma,arial,verdana,sans-serif;-webkit-user-select:none}
    .md_panel.show{-ms-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}
    .md_panel a{text-decoration:none;}
    .md_panel a img{height:.14rem!important}
    .md_selectarea{display:inline-block;width:50%;position:relative}
    .md_head{height:.8rem;line-height:.8rem}
    .md_body{position:relative;height:4rem}
    .md_headtext{display:inline-block;width:100%;text-align:center;font-size:.32rem;color:#333}
    .md_next,.md_prev{position:absolute;top:0;font-family:arial;font-size:1.6em;display:inline-block;width:.4rem;height:.4rem;text-align:center}
    .md_prev{left:0}
    .md_next{right:0}
    .md_weekarea{margin:0;padding:0;list-style-type:none;overflow:hidden}
    .md_datearea li,.md_weekarea li{display:inline-block;float:left;width:14.2857%;font-size:.2rem;font-weight:400;text-align:center;line-height:3}
    .md_next,.md_prev,.md_weekarea li{color:#5b5b5b}
    .md_datearea{position:absolute;width:100%;list-style-type:none;margin:0;padding:0;overflow:hidden;-webkit-transition:-webkit-transform .2s ease-in;-webkit-transform:translate3d(0,0,0)}
    .md_datearea li.current{background-color:#872F9F;color:#FFF;border-radius:.04rem}
    .md_datearea li span{display:inline-block;width:100%;height:100%}
    .md_datearea li span.current{background-color:#872F9F;color:#FFF}
    .md_foot{margin-bottom:.5rem;text-align:center;font-size:.24rem;margin-top:.32rem}
    .md_cancel,.md_ok{display:-moz-inline-stack;display:inline-block;width:1.5rem;height:.5rem;line-height:2.2;border-radius:.04rem}
    .md_ok{color:#fff;background-color:#872F9F}
    .md_cancel{color:#fff;margin-left:.3rem;background-color:#C6C6C6}
    .out_left{-webkit-transform:translate3d(-100%,0,0)}
    .out_right{-webkit-transform:translate3d(100%,0,0)}
    .nextdate,.prevdate{color:#999}
    .disabled{color:#C6C6C6}
    .modify .commonBottom{background-color:#FFF;width:100%;position:fixed;bottom:0;z-index:10;border-top:.01rem solid #F3F3F3}
    .modify .commonBottom ul{font-size:0;padding-top:.15rem;padding-bottom:.13rem;text-align:center;overflow:hidden}
    .modify .commonBottom ul li{display:inline-block;font-size:.2rem;margin:0 .78rem;text-align:center}
    .modify .commonBottom ul .book img{width:.19rem;height:.21rem}
    .modify .commonBottom ul .bookshelf img{width:.24rem;height:.2rem}
    .modify .commonBottom ul .message img{width:.28rem;height:.23rem}
    .modify .commonBottom ul .personal img{width:.23rem;height:.23rem}
    .modify .commonBottom ul li p{margin-top:.05rem;color:#999}
    .modify .blackWrap{background-color:#000;opacity:.4;width:100%;height:100%;position:fixed;left:0;top:0;z-index:10}
    .remark{
				color:#AAA;
				padding:0.2rem 0 0.2rem 0.2rem;
				font-size:0.24rem;
    }
    @media (min-width: 320px) and (max-width: 360px) {
       .md_body{
         height: 5rem;
       }
    }
</style>
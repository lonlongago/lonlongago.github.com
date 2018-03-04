<template>
	<div>
		<div class="qcacg-header-parent" id="qcacg-header-parent" style="position:relative">
		    <div class="qcacg-header">
		        <a href="/index.html"><div class="logo">轻创文学网</div></a>   
			    <ul class="nav-left">
				    <li class="active"><a href="/">首页</a></li>
				    <li><a href="/class">分类</a></li>
				    <li><a href="/ranking">排行榜</a></li>
				    <li><a href="/painter/spaceIndex">画师</a></li>
				    <li class="none"><a href="javascript:;">周边</a></li>
				    <li><a href="/welfare">福利<div></div></a></li>
				    <li class="client">下载客户端 
				    	<div class="clientBox">
				    		<img class="qrCode"  src="../static/img/erweima_and_01.png" alt="" />
				    	    <div class="android">Android</div>
				        </div>
				    </li>
			    </ul>
			    <div> 
				    <ul class="nav-right"> 
					    <li v-if="loginObj.loginFlag" class="liBlock" :style="loginObj.loginImg !== '' ? loginObj.loginImg: '' "> 
						    <div class="headers_display"> 
						        <span class="display_user"> <a :href="path.TemprootPath + '/userInfo'"> {{ loginObj.userName }} </a> </span> 
						        <span class="out"> <a href="javascript:;" @click="backLoginFn"> 退出 </a> </span> 
						        <div class="header_more"> 
						             <a :href="path.TemprootPath + '/userInfo'"> 查看更多 </a> 
						        </div> 
						    </div> 
					    </li> 
					    <li v-else class="li_login"> <a href="javascript:;" @click="flagFn"> 登录/注册 </a> </li> 
					    <li v-if="loginObj.loginFlag" class="ul_msg" style="position: relative;"> 
						    <div class="mag_number" v-if="loginObj.book+loginObj.official+loginObj.reply+loginObj.system &gt; 0" style="right:60px">
						       {{ loginObj.book+loginObj.official+loginObj.reply+loginObj.system }} 
						    </div>
						    <a class="msgBox" :href="path.TemprootPath + '/message'"> 消息 </a> 
						    <ul class="li_msg_ul" style="position: absolute; top: 50px;"> 
						        <li @click="setreplyFn" class="li_msg_li"> 
						        	<a :href="path.TemprootPath + '/message'"> 回复我的 </a> 
							        <div class="mag_number_small" v-if="loginObj.reply &gt; 0">
							           {{ loginObj.reply }} 
							        </div>
						        </li> 
						        <li @click="setbookFn" class="li_msg_li">
						        	<a :href="path.TemprootPath + '/message'"> 作品相关 </a> 
							        <div class="mag_number_small" v-if="loginObj.book &gt; 0">
							         {{ loginObj.book }} 
							        </div>
						        </li> 
						        <li @click="setsystemFn" class="li_msg_li"> 
						        	<a :href="path.TemprootPath + '/system'"> 系统消息 </a> 
							        <div class="mag_number_small" v-if="loginObj.system &gt; 0">
							         {{ loginObj.system }} 
							        </div>
						        </li> 
							    <li @click="setofficialFn" class="li_msg_li">
							    	<a :href="path.TemprootPath + '/official'"> 官方公共 </a> 
							        <div class="mag_number_small" v-if="loginObj.official &gt; 0">
							         {{ loginObj.official }} 
							        </div> 
							    </li> 
						     </ul>
					    </li>
					    <li class="publication"> 
					    	<a v-if="loginObj.loginFlag" :href="path.TemprootPath + '/works'" style="color:#FFFFFF">投&nbsp;稿 </a>
					    	<a v-else @click="setHref(path.TemprootPath + '/login')" style="color:#FFFFFF"> 投&nbsp;稿 </a>
					    </li>
				    </ul>
				</div> 
			    <h3 style="text-indent: -9999px;">登陆/注册</h3>
			    <h3 style="text-indent: -9999px;">投稿</h3>
		    </div>
		</div>
	</div>
</template>

<script>
import PathList from '~/components/conf'
import SZXJ from '~/components/vueHttp'
import store from '~/components/store'
import axios from 'axios'
import Vuex from 'vuex'
export default {
	store,
	data:function(){
	    return {
	        path: PathList,
	        active:'',
	        loginFlag:false,
	        loginObj:{
	        	loginImg:"",
    			loginFlag:false,
    			userName:"",
    			book:"",
    			official:"",
    			reply:"",
    			system:"",
    			number1:""
	        }
	    }
    },
    methods: {
	    setbookFn: function(){
	        this.$set('loginObj.book', 0);
	    },
	    setofficialFn: function(){
	        this.$set('loginObj.official', 0);
	    },
	    setreplyFn: function(){
	        this.$set('loginObj.reply', 0);
	    },
	    setsystemFn: function(){
	        this.$set('loginObj.system', 0);
	    },
	    backLoginFn: function() {
		    this.loginObj.loginFlag = false;
		    window.location.reload();
		    var _data = {};
		    this.delCookie('JSESSIONID'); 
		    SZXJ.http(this,'get', PathList.logout, _data, (response) => {    ///登出接口
//		      	console.log(response);
//              this.$router.push({name:"login"});
                location.href ='/login';
		    });
	    },
	    setHref(v) {
		    location.href = v;
		    const href = window.location.href;
		    const str = href.substring(href.lastIndexOf('#!/') + 3, href.length);
		    this.$set('active', str);
	    },
	    getBookListFn: function() {
	        var _data = {};
	        SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
	          this.$set('bookList', response.data);
	        });
	    },
	    flagFn:function() {
	        location.href = PathList.TemprootPath + '/login';
	    },
	    delCookie:function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=this.getCookie(name);
			if(cval!=null)
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		},
		getCookie:function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
			    return unescape(arr[2]);
			else
			    return null;
		}
    },
	mounted: function() {
		this.$nextTick(function(){
//			console.log(this.loginFlag.loginFlag);
//			console.log(localStorage.getItem('JSESSIONID'));
			SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
//	            this.loginObj = response.data;
//              console.log(response.data);
                if(response.body.loginFlag){
		            this.loginObj.loginImg = 'background-image: url('+ PathList.ImageBookPath + response.data.status.userImage +')';
			        this.loginObj.loginFlag = response.data.status.flag;
			        this.loginObj.userName = response.data.status.userName;
			        this.loginObj.book = response.data.book;
			        this.loginObj.official = response.data.official;
			        this.loginObj.reply = response.data.reply;
			        this.loginObj.system = response.data.system;
			        this.loginObj.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
	            }
            });
		});	   
	}
//,
//route: { data() {} }
}
</script>

<style>
</style>
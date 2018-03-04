<template>
	<div>
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div v-show="displayFlag" style="display: none;" class="classFirst" id="classFirst">
			<div id="pull"></div>
			<div class="content">
			    <div class="blackWrap" style="display: none;" v-show="toWrap" @click="showMenu"></div>
			    <myheader msgfromfa="分类"
				    	ref="topapp" 
				    	:toWrap="toWrap" 
				    	@update:toWrap = "val => toWrap = val"
				    	:menuList="menuList"
				    	@update:menuList = "val => menuList = val"
				    	></myheader>
			    <!--<myheader msgfromfa="分类"></myheader>-->
			    <div class="subject">
			        <a class="son" @click="gotoFn('')" >
			          <img class="block"  :src="path.rootPath + '/img/booktype/' + 0 + '.jpg' " >
			          <div class="book_name">全部</div>
			        </a>     
			        <a class="son" @click="gotoFn(obj.bookTypeId)" v-for="obj in typeName" >
			          <img class="block"  :src="path.rootPath + '/img/booktype/' + obj.bookTypeId + '.jpg' " >
			          <div class="book_name">{{obj.bookTypeName}}</div>
			        </a>         
			    </div>
			    <appBottom></appBottom>
			</div>     
		</div>
	</div>
</template>

<script>
import Header from '~/components/Headerapp'
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
	asyncData:function(context){
		var obj={};
	    obj.id = context.params.id;
		    console.log(context);
		    console.log(obj.id);
		return obj;
	},
	data : function() {
		return {
			path: appPathList,
		    typeName:[],
		    menuList: false,
		    toWrap: false,
		    displayFlag:false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
    	k_touch("classFirst", "y");
	  	this.getValueFn();
    	this.displayFlag = true;
    	var self=this;
//  	console.log(this.$refs);
//  	this.$refs.topapp.showFn(function(){
//	    	this.$emit('update:toWrap', this.toWrap);
//	    	console.log(this.toWrap);
//	    	this.$emit('update:menuList', this.menuList);
//  		self.showMenu();
//		});
//              console.log(this.toWrap);
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
	    backFn:function(){
	      history.go(-1);
	    },
	    gotoFn:function(id){
	       location.href = this.path.TemprootPath + '/app/classSec/' + id;
	    },
	    getValueFn:function(){
	       var data = {};
	       SZXJ.http(this,'get', appPathList.queryBookType, data, (response)=>{
	                this.typeName = response.data;
	          });
	       this.$nextTick(function(){
	         this.displayFlag = true;
	         var  This = this;
	         setTimeout(function(){
	            document.body.removeChild(document.getElementById("loading"));
	         },300)
	       });
	    }
	},
  	head: function(){
  		return {
  			title: '一级分类-QC轻小说',
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
<style scoped>
		.classFirst{max-width: 7.5rem; margin: 0 auto;overflow-x: hidden;}
		.classFirst .content{max-width: 7.5rem;overflow-x: hidden;margin:0 auto;margin-top: 0.88rem;}
		.classFirst .content .subject .block{background-color:#1BBC9B;width:1.2rem;height:1.2rem;border-radius:.05rem;display:block}
		.classFirst .content .subject .book_name{display:inline-block;width:1.2rem;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:.09rem;font-size:.32rem;line-height:.35rem;}
		.classFirst .content .subject .son{margin-left:.52rem;display:inline-block;margin-top:.2rem}
	
</style>
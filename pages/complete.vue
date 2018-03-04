<template>
	<div class="Success">
	       <p id="show"></p>  
	       <p class="Success_p">如果怕你的浏览器没反应，那你就手动关闭....</p>
	  </div>
</template>

<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
//import Alert from '~/components/alert.vue'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'myheader':Header,
		'myfooter':Footer
	},
	asyncData:function(){
	},
	data : function() {
		return {
		}
	},
    mounted: function () { // ready -->
      	var _this = this;
	 		_this.$nextTick(function () {
	  			var time=5;
				window.setInterval(function(){
					if(time>0){
			            document.getElementById("show").innerHTML="充值成功!将于 <b>"+time+"</b> 秒后关闭 ";   
			            time--;   
			        }   
			        else{   
			        	_this.$router.push({ name: 'index'})
			        }
			        
				},1000);  //设置的时间函数
        
	  })
	},
	methods: {},
  	head: function(){
		return {
			title: '充值成功-QC轻小说',
	    	meta: [
			    { charset: 'UTF-8' },
			    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
			  	{ name: 'format-detection', content: 'telephone=no' },
			  	{ name: 'apple-touch-fullscreen', content: 'yes' },
			  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
			  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
			  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
			  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
			],
	  	}
  	}
}
</script>
<style>
	.Success{
		  position: fixed;
		  width: 1200px;
		  height: 180px;
		  border: 1px solid #C7C7C7;
		  top: 30%;
		  left: 20%;
		  
		}
		.Success p{
		  text-align: center;
		  margin-top: 60px;
		}
		.Success_p{
		  margin-top: 30px !important;
		  color: #92C202;
		}

</style>
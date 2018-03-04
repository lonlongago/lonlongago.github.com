<template>
	<div id="app">
		<myheader></myheader>
		<div class="wrap">
			<table class="welfare" id="__01" cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td>
							<img :src="path.ImagePath + '/img/welfare/welfare8_01.jpg'"  alt="" />
						</td>
					</tr>
					<tr>
						<td>
							<img :src="path.ImagePath + '/img/welfare/welfare8_02.jpg'"  alt="" />
						</td>
					</tr>
					<tr>
						<td>
							<img :src="path.ImagePath + '/img/welfare/welfare8_03.jpg'"  alt="" />
						</td>
					</tr>
					<tr>
						<td>
							<img :src="path.ImagePath + '/img/welfare/welfare8_04.jpg'"  alt="" />
						</td>
					</tr>
					<tr>
						<td>
							<img :src="path.ImagePath + '/img/welfare/welfare8_05.jpg'"  alt="" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import axios from 'axios'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'myheader':Header
		
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			path: PathList,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  })
	},
	methods: {},
  	head: function(){
		return {
			title: '福利-QC轻小说',
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
			link: [
		    	{ rel: 'stylesheet', href: '/css/main.css' },
		    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
	  		]
	  	}
  	}
}
</script>
<style scoped>
	#app .wrap{width: 1200px;margin: 0 auto;}
	#app .wrap .welfare{width: 1200px;margin: 0 auto;}
  	#app .wrap .welfare img {display:block;max-width: 100%;}
</style>
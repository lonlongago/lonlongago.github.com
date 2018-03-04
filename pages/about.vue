<template>
	<div class="aboutContainer">
			<div class="wrap">
		        <myheader></myheader>
		        <div class="wrap_div">
		            <div class="list">
		                <ul>
		                    <li>
		                        <a name="about" href="/about" class="active">关于我们</a>
		                        <div class="list_li_div activeTow"></div>
		                    </li>
		                    <li>
		                        <a name="statement" href="/statement">免责声明</a>
		                        <div class="list_li_div"></div>
		                    </li>
		                    <li>
		                        <a name="Sign" href="/system">签约流程</a>
		                        <div class="list_li_div"></div>
		                    </li>
		                    <li>
		                        <a name="system" href="/sign">签约制度</a>
		                        <div class="list_li_div"></div>
		                    </li>
		                    <li>
		                        <a name="Submission" href="/submission">投稿须知</a>
		                        <div class="list_li_div"></div>
		                    </li>
		                    <li>
		                        <a name="welfare" href="/aboutWelfare">作者福利</a>
		                        <div class="list_li_div"></div>
		                    </li>
		                    <li>
		                        <a name="welfare" href="/welfare1">交易须知</a>
		                        <div class="list_li_div"></div>
		                    </li>
		                </ul>
		            </div>
		            <div class="contextWrap">
		                <div class="contextTitle">
		                    <div>关于我们</div>
		                </div>
		                <div class="context">
		                    <div id="about">
		                        <h3>关于我们</h3>
		                        <p>杭州轻悦网络科技有限公司旗下轻小说平台QC轻小说诞生了。在这个套路烂大街的网络文学时代，QC轻小说将文学的创新作为发展路线，致力于为广大轻小说爱好者打造高品质轻小说。</p>
		                        <p>为作者提供贴心的服务与丰厚的收入，包括后期作品的各种改编漫画、动画的机会我们都会提供全方面的帮助。</p>
		                        <p class="group"><b>QC轻小说官方讨论群：</b>562697313</p>
		                        <p><b>客服QQ：</b>1806574820</p>
		                        <p><b>反馈邮箱：</b>hangzhouqcacg@163.com</p>
		                        <p><b>商务合作：</b>18979361605</p>
		                        <p><b>官方微博：</b><a href="http://weibo.com/5872021446/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1" title="官方微博" target="_blank">http://weibo.com/5872021446/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1</a></p>
		                        <p><b>联系电话：</b>18979361605</p>
		                        <p><b>地址：</b>浙江省 杭州市 西湖区 西园八路 银江软件园 F栋2楼</p>
		                    </div>
		                </div>
		            </div>
		        </div>
		    <myfooter></myfooter>
		</div>
	</div>

</template>
<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'myheader':Header,
		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  })
	},
	methods: {},
  	head: function(){
  		return {
  			title: '关于我们-QC轻小说',
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
  		    	{ rel: 'stylesheet', href: '/css/about.css' }
  	  		]
  	  }
  	}
}
</script>
<style scoped>

	
</style>
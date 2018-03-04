<template>
	<div class="aboutContainer">
		<div class="wrap">
		    <myheader></myheader>
		    <div class="wrap_div">
		        <div class="list">
		            <ul>
		                <li>
	                        <a name="about" href="/about">关于我们</a>
	                        <div class="list_li_div"></div>
	                    </li>
	                    <li>
	                        <a name="statement" href="/statement" class="active">免责声明</a>
	                        <div class="list_li_div activeTow"></div>
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
		                <div>免责声明</div>
		            </div>
		            <div class="context">
		                <div id="disclaimer">
		                    <h3>免责声明</h3>
		                    <p>本网站提供的所有资料，均为网友私人收藏性质，未经原版权作者许可，任何人不得擅作它用！请在下载24小时内删除！为尊重作者版权，请购买原版作品,支持你喜欢的作者，谢谢！</p>
		                    <p>本应用收录的各类资料，均为网友从网上搜集分享而来，其版权均归原作者及其网站所有，本应用虽力求保存原有的版权信息，但因很多资料经过多次转摘，已无法确定其真实来源，或者已将原有信息丢失，所以敬请原作者原谅。如果您对本站所载作品版权的归属存有异议，请立即通知我们（公司邮箱），我们将在第一时间予以删除，同时向你表示歉意！</p>
		                    <p>本应用仅转载网上已存在的资料，很难对这些资料的可用性，准确性或可靠性作出任何承诺与保证。不论何种情形，本应用都不对任何由于使用或无法使用本站提供的资料所造成的直接的和间接的损失负任何责任。</p>
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
export default {
	components:{
		'alert': Alert,
		'myheader':Header,
		'myfooter':Footer
	},
	asyncData:function(){
	},
	data : function() {
		return {}
	},
  mounted: function () { // ready -->
	  this.$nextTick(function () {})
	},
	methods: {},
	head: function(){
		return{
			title: '免费声明-QC轻小说',
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
		    	{ rel: 'stylesheet', href: '/css/about.css' },
	  		]
	  	}
	}
}
</script>

<style scoped>
	
	
</style>

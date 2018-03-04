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
	                        <a name="statement" href="/statement">免责声明</a>
	                        <div class="list_li_div"></div>
	                    </li>
	                    <li>
	                        <a name="Sign" href="/system">签约流程</a>
	                        <div class="list_li_div"></div>
	                    </li>
	                    <li>
	                        <a name="system" href="/sign" >签约制度</a>
	                        <div class="list_li_div"></div>
	                    </li>
	                    <li>
	                        <a name="Submission" href="/submission">投稿须知</a>
	                        <div class="list_li_div"></div>
	                    </li>
	                    <li>
	                        <a name="welfare" href="/aboutWelfare" class="active">作者福利</a>
	                        <div class="list_li_div activeTow"></div>
	                    </li>
	                    <li>
                            <a name="welfare" href="/welfare1">交易须知</a>
                            <div class="list_li_div"></div>
                      </li>
	                </ul>
	            </div>
	            <div class="contextWrap">
	                <div class="contextTitle">
	                    <div>作者福利</div>
	                </div>
	                <div class="context">
	                    <div id="author">
			                <h3>QC轻小说作者福利</h3>
			                <ul>
			                    <li>
			                        <h4 style="font-size: 16px;">一、保底奖励</h4>
			                        <ul>
			                            <li>LV1：保底奖励300元</li>
			                            <li>LV2：保底奖励1500元</li>
			                            <li>LV3：保底奖励3000元</li>
			                            <li>LV4：保底奖励6000元</li>
			                            <li>LV5：保底奖励12000元</li>
			                        </ul>
			                        <p>注：所有的保底奖励是在签约的制度之下，并且作者完成了相应的网站的要求，才能享受保底奖励。</p>
			                    </li>
			                    <li>
			                        <h4 style="font-size: 16px;">二、插画补贴</h4>
			                        <ul>
			                            <li>LV1：保底奖励150元</li>
			                            <li>LV2：保底奖励300元</li>
			                            <li>LV3：保底奖励500元</li>
			                            <li>LV4：保底奖励800元</li>
			                            <li>LV5：保底奖励1200元</li>
			                        </ul>
			                        <p>注：所有的保底奖励是在签约的制度之下，并且作者完成了相应的网站的要求，才能享受保底奖励。</p>
			                    </li>
			                    <li>
			                        <h4 style="font-size: 16px;">三、流量奖励</h4>
			                        <p>越好的作品将会获得更好的福利，对于签约的作品，我们会根据作品的总和数据（收藏，点击，好人卡）的情况，进行复杂的数据换算，所得金额打入作者的钱包。</p>
			                        <p>每月初七八号进行结算一次。</p>
			                    </li>
			                    <li>
			                        <h4 style="font-size: 16px;">四、打赏好人卡</h4>
			                        <p>读者对你作品的喜爱，将会发给你好人卡，好人卡的打赏机制中，作者将会得到相应的收益。</p>
			                    </li>
			                    <li>
			                        <h4 style="font-size: 16px;">五、改编，出版分成</h4>
			                        <ol>
			                            <li>作者可获得签约简、繁体中文纸质图书出版发行权利产生收益的70%。</li>
			                            <li>作者可获得签约作品衍生物的漫画、动漫、游戏版权收益的50%。</li>
			                        </ol>
			                    </li>
			                </ul>
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
			title: '作者福利-QC轻小说',
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
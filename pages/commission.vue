<template>
	<div class="commissionContainer">
	    <myHeader></myHeader>
	    <div class="commission">
	        <img :src="path.ImagePath + '/img/commission/head.png'" class="header"/>
	        <img :src="path.ImagePath + '/img/commission/solicit.png'" class="solicit"/>
	        <div class="signWelfare">
    	        <img :src="path.ImagePath + '/img/commission/signWelfare.png'" class="welfare"/>
    	        <a href="/aboutWelfare" class="welfareButton">
  	                <img :src="path.ImagePath + '/img/commission/welfareButton.png'" class="welfareButtonPic"/>
    	        </a>
	        </div>
	        <div class="signStandard">
    	        <img :src="path.ImagePath + '/img/commission/signStandard.png'" class="standard"/>
    	        <a href="/sign" class="standardButton">
  	                <img :src="path.ImagePath + '/img/commission/standardButton.png'" class="standardButtonPic"/>
    	        </a>
	        </div>
	        <div class="foot">
                <img :src="path.ImagePath + '/img/commission/foot.png'" class="footer"/>
                <div class="link">
                    <a href="http://www.qcacg.com/"></a> 
                </div>
            </div>
	    </div>
	</div>
</template>

<script>
	import PathList from '~/components/conf.js'
  import SZXJ from '~/components/vueHttp.js'
  import header from '~/components/Header'  
	export default{
	  components:{
		    "myHeader":header
		  },
		data:function(){
		  
			return {
				path: PathList,
				szxj:SZXJ
			}
		},
	    head: function(){
	    	return{
	    		title:"约稿函-QC轻小说",
	    		meta:[
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
	    		link:[
	    		    { rel: 'stylesheet', href: '/css/main.css' },
			    	{ rel: 'stylesheet', href: '/css/commission.css' },
			    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' }
	    		]
	    	}
	    }
	}
</script>

<style>
</style>
<template>
<div id="cover">
	<div class="top"></div>
	<div class="ntalls">
		<div class="covup">网络链接超时，请检查网络~~“喵喵”</div>
		<img src="/img/appcov.png" alt="" />
		<button class="upda btn">重试</button>
	</div>
</div>
</template>

<script>
export default{
	asyncData: function(){
		
	},
	data: function(){
		return{
			
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			
		})
	},
	methods: {
		
	},
	head : function(){
		return{
			title:'无网络-QC轻小说',
			meta:[
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说无网络"},
		        { name: "keywords",content:"轻小说无网络"},
			],
			link: [],
	        script:[
	          {src:"/lib/resize_320.js"},
	        ]
		}
	},
}
</script>

<style>
	body{background-color: #F2F2F2;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;}
	#cover{width: 100%;margin: 0 auto;}
	#cover .top{background-color: white;height: .376rem;width: 100%;}
	#cover .ntalls{margin-top: 1rem;transform: translateZ(0);transition: all .3s;width: 100%;}
	#cover .ntalls .covup{text-align: center;font-size: .1194rem;color: #ffcd6d;}
	#cover .ntalls img{height: .7253rem;width: 1.5147rem;position: absolute;top: 100%;left: 25%;}
	#cover .ntalls .upda{background-color: #ffcd6d;color: #fff;border-radius: .2rem;height: .256rem;width: .768rem;border: 0;position: relative;top: 1.2rem;left: 38%;font-size: .1194rem;}
	.btn{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}
	.btn:hover{outline:0;cursor:pointer}
	.btn:focus{outline:0;cursor:pointer}
	.btn:active{-webkit-box-shadow:inset 0 0 1px rgba(0,0,0,0);box-shadow:inset 0 0 1px rgba(0,0,0,0)}
</style>
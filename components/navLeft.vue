<template>
	<div class="user_info_left"> 
	    <div class="user_info_touxiang" :style="loginObj.loginImg"></div> 
	    <div class="user_info_account">
	        {{ loginObj.userName }}
	    </div> 
	    <div class="user_info_btn_qiandaoY "  v-if="sign" >已签到</div> 
	    <div class="user_info_btn_qiandao " @click="signFn" v-else>签到</div> 
	    <div class="user_info_nva clear"> 
		    <ul> 
			    <li :class="active === 'info'?'active':''">
			      	<a href="/userInfo">
			      		<i class="icon_personal_information" :class="active === 'info'?'active':''"></i>我的信息
			      	</a>
			    </li> 
			      
			    <li :class="active === 'bookshelf'?'active':''">
			      	<a href="/userBookSelf">
			        	<i class="icon_personal_bookshelf"></i>我的书架
			      	</a>
			    </li> 
			      	
			    <li  :class="active === 'attention'?'active':''">
			      	<a href="/attention">
			      	    <i class="icon_personal_follow"></i>我的关注
			      	</a>
			    </li> 	
			    <li  :class="active === 'message'?'active':''">
			      	<a href="/message">
			      	    <i class="icon_personal_message"></i>我的消息 
			      	</a>
			    </li>  	
			    <li :class="active === 'wallet'?'active':''">
			      	<a href="/bill">
			      	    <i class="icon_personal_wallet"></i>我的钱包
			      	</a>
			    </li>   	
			    <li :class="active === 'bookBlockList'?'active':''">
			    	<a href="/works">
			      		<i class="icon_personal_contributes" :class="active === 'bookBlockList'?'active':''"></i>我的投稿
			      	</a>
			    </li>
			      
			    <li :class="active === 'imgBlockList'?'active':''">
			      	<a href="/imgPaintingList">
			      		<i class="icon_img_blockList" :class="active === 'imgBlockList'?'active':''"></i>我的绘画
			      	</a>
			    </li>
		      
		    </ul> 
	    </div> 
	    <div class="user_info_nva_title"> 
		    <div class="dotted">
		      ....................................................................................
		    </div>   
		    <h2><a style="display: block;" :href="'/painter/space/'+userId">个人空间</a></h2> 
	    </div> 
	</div> 
</template>

<script>
	import PathList from '~/components/conf'
	import SZXJ from '~/components/vueHttp'
	export default{
		props:{
			active: String
		},
		data:function(){
			return {
				path: PathList,
        sign:false,
        loginObj:{
	        loginImg:"",
    			loginFlag:false,
    			userName:"",
    			book:"",
    			official:"",
    			reply:"",
    			system:"",
    			number1:""
				},
				userId:''
			}
		},
		mounted:function(){
			this.$nextTick(function(){
				this.getStatusFn();
			})
		},
		methods:{
			signFn: function() {  
		    var _data = {};
		    SZXJ.http(this,'get', PathList.cardsign, {}, (response) => {
//			    	this.sign=true;
//		            this.$refs.alert.setMessage(false,'签到成功，获得10张好人卡',function(){})
            this.getStatusFn();
		    });
	    },
	    getStatusFn:function(){
	    	SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {              //获取服务器登入信息
//		            console.log(response);
            if(response.body.loginFlag){
            	this.loginObj.loginImg = 'background-image: url('+ PathList.ImageBookPath + response.data.status.userImage +')';
		          this.loginObj.loginFlag = response.data.status.flag;
		          this.loginObj.userName = response.data.status.userName;
		          this.loginObj.book = response.data.book;
		          this.loginObj.official = response.data.official;
		          this.loginObj.reply = response.data.reply;
		          this.loginObj.system = response.data.system;
		          this.loginObj.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
              this.userId = response.data.status.userId;
              this.sign = response.data.status.sign;
            }else{
            	location.href = "/login";
            }
        });
	    }
		}
	}
</script>

<style>
</style>
<template>
	<div id="topapp">
		<div class="cephalosome">
	      <img @click="backFn" class="back" src="http://cdn.qcacg.com/img/app_index/classification_03.png" alt="" />
	      <span>{{ msgfromfa }}</span>
	      <a href="/app/search"><img class="searchSec" src="http://cdn.qcacg.com/img/app_index/classification_05.png" alt="" /></a>
	      <img class="catalog" @click="showMenu" src="http://cdn.qcacg.com/img/app_index/classification_07.png" alt="" />
	      <div class="commonHeadMenu" style="display: none;" v-show="menuList">
	          <a href="/app" class="home">
	              <img src="http://cdn.qcacg.com/img/app_book/home.png"/>
	              <p>首页</p>
	          </a>
	          <a href="/app/classFirst" class="list">
	              <img src="http://cdn.qcacg.com/img/app_book/list.png"/>
	              <p>分类</p>
	          </a>
	          <a href="/app/rank" class="sort">
	              <img src="http://cdn.qcacg.com/img/app_book/cup.png"/>
	              <p>排行榜</p>
	          </a>
	          <a href="/app/personal" class="personal">
	              <img src="http://cdn.qcacg.com/img/app_book/personal.png"/>
	              <p>个人中心</p>
	          </a>
	      </div>
	    </div>
	</div>
</template>

<script>
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import axios from 'axios'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	props: ['msgfromfa'],
	data : function() {
		return {
			menuList: false,
			toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
//	  	this.$emit('update:toWrap', this.toWrap);
//	  	this.$emit('update:menuList', this.menuList);
	  })
	},
	methods: {
		backFn:function(){
	      history.go(-1);
	    },
	    showMenu: function() {
            this.menuList = !this.menuList
            this.toWrap = !this.toWrap;
            if(this.menuList){
                document.body.style.overflow = "hidden";
//              console.log(this.toWrap);
            }else{
                document.body.style.overflow = "auto";
//              console.log(this.toWrap);
            };
            this.$emit('update:toWrap', this.toWrap);
	  		this.$emit('update:menuList', this.menuList);
        },
//      showFn: function(toWrap,menuList) {
//      	this.toWrap=toWrap;
//      	this.menuList=menuList;
//      }
	},
}
</script>
<style scoped>
	
</style>
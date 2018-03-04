<template>
	<div>
		<div class="cephalosome">
          <img @click="backFn" class="back" src="http://cdn.qcacg.com/img/app_index/classification_03.png" alt="" />
          <div class="title">
            <i @click="recordFn(2)"  :class="recordId == 2 ? 'shelf' : 'record'" style="border-radius: .04rem 0 0 .04rem;border:1px solid #1CC8ED;width:.85rem;">历史</i>
            <i @click="recordFn(1)"  :class="recordId == 1 ? 'shelf' : 'record'" style="border-radius: 0 .04rem .04rem 0;border:1px  solid #1CC8ED;width:.85rem;">书架</i>
          </div>
          <a href="./search.html"><img class="searchSec" src="http://cdn.qcacg.com/img/app_index/classification_05.png" alt="" /></a>
          <img @click="showMenu" class="catalog" src="http://cdn.qcacg.com/img/app_index/classification_07.png" alt="" />
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
		'appPathList':appPathList
//		'myheader':Header,
//		'myfooter':Footer
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
		    path: appPathList,
		    szxj:SZXJ,
		    bookList:[],
		    recordId:1,
		    recordFlag:1,
		    listbookList:[],
		    bookshelf: true,
		    menuList: false,
		    toWrap: false,
		    displayFlag:false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	this.getValueFn();
    	this.displayFlag = true;
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
	    recordFn:function(d){
	      this.recordId = d;
	      if(this.recordId == 1){
	        this.recordFlag = 1;
	      }else{
	        this.recordFlag = 2;
	      }
	      this.getValueFn();
	    },
	    getValueFn:function(){
	      if(this.recordId == 1){
	        SZXJ.http(this,'get', appPathList.findBookCollectByUser,{} , (response) => {
	          this.listbookList = response.data;
	          });
	      }else{
	        SZXJ.http(this,'get', appPathList.findBookHitByUser,{} , (response) => {
	          this.bookList = response.data;
	          });
	      }
//	      this.$nextTick(function(){
//	         this.displayFlag = true;
//	         var  This = this;
//	         setTimeout(function(){
//	            document.body.removeChild(document.getElementById("loading"));
//	         },300)
//	       });
	    },
	},
}
</script>

<style>
</style>
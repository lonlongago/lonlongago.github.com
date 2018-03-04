<template>
<div id="catalls">
	<script src="/lib/resize_320.js"></script>
	<div class="read_menu">
          <div class="menu_content" id="readMenu">
            <!--<div class="menu_head">
              <div style="position: absolute;left: 0.128rem;top: 0.0512rem;background-image: url(http://cdn.qcacg.com/mobile/img/app_read/header_back.png);background-repeat: no-repeat; background-size: contain;width: .2048rem;height: .2048rem; background-position: -0.06rem;" @click="delBookMenu()"></div>
                         目录
            </div>-->
            <div class="menu_count">共{{allLength}}章</div>
            <div class="menu_list">
              <div class="menu_ccc" v-for ="(obj,index) in volumeList">
                <div class="menu_part" style="background-color: #f2f2f2;">{{obj.volumeName}}</div>
                <div class="menu_part" v-for="temp in obj.contentEntityList" @click = "readContent(temp.contentId,bookId)">
                	{{temp.contentTitle}}
                	<p v-if="lastContent.contentId==temp.contentId" style="color: #555; margin: 0.08rem 0;">{{updateTime}} 更新</p>
                </div>
              </div>
            </div>
          </div>
        </div>
</div>
</template>

<script>
import appPathList from "~/components/conf-app"
import SZXJ from "~/components/vueHttp-app"
export default{
	asyncData: function(context){
		var obj = {};
		obj.bookId = context.params.id;
		console.log(obj.bookId);
		return obj;
	},
	data: function(){
		return{
			szxj:SZXJ,
			path:appPathList,
			allLength:0,
			volumeList:[],
			lastContent:[],
			updateTime:'',
			webBook:{},
			ws:{},
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getvalue();
			if(window.plus){
	          this.plusReady();
	        }else{
	          document.addEventListener('plusready',this.plusReady,false);
	        }
//			console.log(this.bookId);
		})
	},
	methods:{
		readContent: function(a,b){
			if(window.plus){
	           this.webBook = plus.webview.create(appPathList.netWorks+'/readBook/'+a+"&"+b,'readBook',{'popGesture':'close'});
	           this.webBook.onloading= function(){
					plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
				}
				this.webBook.onloaded=function(){
					plus.nativeUI.closeWaiting();
				}
	          this.webBook.show('slide-in-right');
	        }
		},
		plusReady:function(){
	        var self = this;
	        this.ws = plus.webview.currentWebview();
	        plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right");
//					self.ws.opener().reload();  //webview重新加载
				}, false);
        },
		getvalue: function(){
			var self = this;
			SZXJ.http(this,'get',appPathList.queryBookDirectory + "?bookId=" + this.bookId,{},function(response){
				self.volumeList = response.data.bookCustom.volumeCustomList;
				self.lastContent = response.data.bookCustom.lastContent;
				self.updateTime = SZXJ.getLocalTimeTwo(response.data.bookCustom.bookUpdate);
				if(self.volumeList!=null){
		            for(var i = 0; i<self.volumeList.length;i++){
		              console.log(1111);
		              self.allLength = self.allLength + self.volumeList[i].contentEntityList.length;
		            }
		        }
			})
		},
	},
	head : function(){
		return {
			title:'目录页-QC轻小说',
			meta : [
				{charset:'UTF-8'},
				{ name: 'apple-touch-fullscreen', content: 'yes' },
		        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
		        { name: 'format-detection', content: 'telephone=no' },
		        { name: "apple-mobile-web-app-capable",content:"yes"},
		        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
		        { name: "description",content:"轻小说目录页"},
		        { name: "keywords",content:"轻小说目录页"},
		    ],
		    link: [
//		        { rel: 'stylesheet', href: '/css/main_app.css' }
		    ],
		}
	},
}
</script>

<style>
  body{background-color: #f4f4f4;}
  *{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;user-select:none;}
  .read_menu{
    /*position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 40;
    background-color: #FFF2E2;*/
  }
  .read_menu .menu_content{
    width: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
    min-height: 6rem;
  }
  /*.read_menu .menu_content .menu_head{
    width: 100%;
    font-size: 0.121rem;
    text-align: center;
    padding: 0.1192rem 0;
    position: fixed;
    top: 0;
    background-color: #fff;
  }
  .read_menu .menu_content .menu_head:after{
    content: '';
    position: absolute;
    bottom: 1px;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: #0090ff;
  }*/
  .read_menu .menu_content .menu_list{
    overflow: hidden;
    margin-top: 0.3717rem;
    min-height: 3rem;
  }
  .read_menu .menu_content .menu_count{
    font-size: 0.120rem;
    padding: 0.1493rem 0 0.1024rem 0.1280rem;
    position: fixed;
    /*top: 0.3585rem;*/
    width: 100%;
    background-color: #fff;
    font-weight: 800;
    box-shadow: 0 0.01707rem 0.01707rem #c3c3c3;
  }
  .read_menu .menu_content .menu_list .menu_ccc{
  }
  .read_menu .menu_content .menu_list .menu_ccc .menu_part{
    font-size: 0.1024rem;
    padding: 0.0939rem 0 0.0683rem 0.1280rem;
  }
</style>
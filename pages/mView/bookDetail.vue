<template>
  <div style="position: fixed;left: 0;right: 0;top: 0;bottom: 0;font-size: 12px;background-color: rgb(242, 242, 242);">
    <!--<div class="tp"></div>-->
    <!--头部-->
    <!--<div class="header_ReadBook">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_Text"><span>{{bookName}}</span></div>
    </div>-->
    <!--内容-->
    <div class="content">
    	<div>
    		<div class="volume_part" v-for="(temp,index) in volumeList" :style="index==volumeList.length-1?'margin-bottom:0.384rem':''">
    			<div class="volume_contain">
            <div class="volume_btn">
		    	    <span class="btnZqs" v-if="index==0" style="color: #f2f2f2; background-color: #c3c3c3;">前移</span>
		          <span class="btnZqs btn" v-else @click="volumeChange(volumeList[index - 1].volumeId, volumeList[index].volumeId)" style="color: #f2f2f2;background-color: #ffc200;">前移</span>
		          <span class="btnZqs btn" @click="volumeDelete(temp.volumeId)" style="background-color: orangered; color: #fff;">删除</span>
		          <span class="btnZqs" v-if="index==volumeList.length-1" style="color: #f2f2f2;background-color: #c3c3c3;">后移</span>
		          <span class="btnZqs btn" v-else @click="volumeChange(temp.volumeId, volumeList[index + 1].volumeId)" style="color: #f2f2f2;background-color: #ffc200;">后移</span>
		        </div>
		        <div :class="temp.animation?'volume_title transitionStart transitionHome':'volume_title transitionEnd transitionHome'" @click="openOrCloseVolume(index)" :style="temp.flag?'background-color: #c3c3c3;':'background-color: #fff;'" @touchstart="recordFn($event,index,temp)" @touchend="openOrCloseBtn($event,index,temp,1)">
		          <div class="volume_name">{{temp.volumeName}}</div>
		          <div :class="temp.flag?'volume_icon top':'volume_icon bottom'"></div>
		        </div>
	        </div>
	        <transition name="fade">
	          <div class="chapter_all" v-show="temp.flag">
	            <div class="chapter_num">
	              <div class="chapter_num_all">
	                <span style="font-size: 0.128rem; color: #ff8383;">共{{temp.contentEntityList.length}}章</span>
	                <span style="font-size: 0.0853rem; color: #989898;">({{temp.volumeWordCount }})</span>
	              </div>
	              <div class="order" @click="setOrder(index)">
	                <span v-if="temp.orderBol">正序</span>
	                <span v-else>倒序</span>
	                <span class="order_icon"></span>
	              </div>
	            </div>
	            <div class="chapter_part" v-for="(obj,ind) in temp.contentEntityList" :style="ind==temp.contentEntityList.length-1?'border-bottom: none;':''" >
	              <div class="chapter_contain"> 
	                <div class="chapter_btn">
	                  <span class="btnC" v-if="ind==0" style="color: #f2f2f2;background-color: #c3c3c3;">前移</span>
	                  <span class="btnC btn" v-else @click="chapterChange(temp.contentEntityList[ind - 1].contentId, temp.contentEntityList[ind].contentId)" style="color: #f2f2f2;background-color: #ffc200;">前移</span>
	                  <span class="btnC btn" @click="chapterDelete(obj.contentId)" style="background-color: orangered; color: #fff;">删除</span>
	                  <span class="btnC" v-if="ind==temp.contentEntityList.length-1" style="color: #f2f2f2;background-color: #c3c3c3;">后移</span>
	                  <span class="btnC btn" v-else @click="chapterChange(obj.contentId, temp.contentEntityList[ind + 1].contentId)" style="color: #f2f2f2;background-color: #ffc200;">后移</span>             
	                </div>
	                <div :class="obj.animation?'transitionStart transitionHome':'transitionEnd transitionHome'" style="background-color: #fff;" @click="createOrUpdateChapter('',obj.contentId)" @touchstart="recordFn($event,ind,obj,2)" @touchend="openOrCloseBtn($event,index,obj,2)">
	                  <div class="chapter_name">
	                    <div style="font-size: 0.1024rem; padding-top: 0.0426rem;">{{obj.contentTitle}}</div>
	                    <div style="font-size: 0.0853rem; color: #989898; padding: 0.02rem 0;">更新：{{obj.contentUpdate | getLocalTimeTwo}}</div>
	                  </div>
	                  <div class="chapter_right">
	                    <span class="dirRight"></span>
	                    <span v-if="obj.contentStatus==2" class="chapter_status" style="color: #ff8383;">草稿</span>
	                    <span v-if="obj.contentStatus==0" class="chapter_status" style="color: #fedc6f;">已发布</span>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </transition>
	      </div>
    	</div>
    </div>
    
    <!--阴影-->
    <transition name="fade">
      <div class="shadow" v-if="shadowBol" @click.stop="closeVolumeOrChapter()"></div>
    </transition>
    <div class="newBtn">
    	<div class="btn_container">
    		<div class="new_volume" @click="openVolume()">创建卷</div>
    	</div>
    	<div class="btn_container">
    		<div class="new_chapter" @click="openChapter()">创建章</div>
    	</div>
    </div>
    <!--功能菜单-->
    <div class="actions">
      <div class="moreActions">
        <transition name="fade">
          <div class="volumeOrChapter" v-if="actionBol">
            <div class="volume_action" @click="examine()">
              <div class="volume_icon"></div>
              <div class="volume_title">审核</div>
            </div>
            <div class="chapter_action" @click="signFn()">
              <div class="chapter_icon"></div>
              <div class="chapter_title">签约</div>
            </div>
          </div>
        </transition>
        <div :class="actionBol?'closeBtn':'openBtn'" @click="openOrCloseAction()"></div>
      </div>
    </div>
    <!--创建卷-->
    <transition name="fade">
      <div class="volume_form" v-if="volumeBol2">
        <div class="form_title">创建卷</div>
        <div style="margin: 0.0853rem 0 0.1621rem 0;"><input v-model="volumeName" style="border: none;background-color: #f2f2f2;height: 0.2048rem; width: 100%;border-radius: 3px;"/></div>
        <div class="form_btn">
          <div class="btn_part btn yellow" @click="createNewVolume()">确认</div>
          <div class="btn_part btn hui" @click="closeVolume()">取消</div>
        </div>
      </div>
    </transition>
    <!--创建章节-->
    <transition>
      <div class="chapter_form" v-if="chapterBol">
        <div class="chapter_title">创建章</div>
        <div class="chapter_volumeList">
          <div class="chapter_volumeList_title">
            <span style="float: left; width: 0.1195rem; height: 0.1109rem; margin-left: 0.0853rem;"></span>
            <span style="padding: 0.130rem 0 0.126rem 0;height: auto;">选择卷</span>
            <span class="right_order" @click = "setVolumeOrder()"></span>
          </div>
          <div class="volumeList_content">
            <div class="volumeList_part" v-for="(obj,index) in volumeList1" @click="createOrUpdateChapter(obj.volumeId,'')">
              {{obj.volumeName}}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  export default{
    data:function(){
      return {
        SZXJ:SZXJ,
        Path:appPathList,
        bookId:0,
        bookName:'',
        volumeList:[],
        volumeList1:[],
        volumeListBol:[],
        orderBol:false,
        actionBol:false,
        shadowBol:false,
        volumeBol2:false,
        volumeName:'',
        chapterBol:false,
        pageX:0,
        ws:{},
        wn:{},
        mWidth:0,
        bookReviewStatus:'',
        bookWordCount:0
      }
    },
    filters:{
      reverseFn:function(value){
        var num = value/10000;
        if(num<1){
          return value
        }else{
          return Math.floor(num)+'万字'  
        }
      },
      getLocalTimeTwo:function(nS) {
        var time = new Date(nS);
        return time.Format("yyyy-MM-dd hh:mm");
      }
    },
    asyncData:function(context){
      var obj = {};
      obj.bookId = context.params.bookId
      return obj
    },
    mounted:function(){
      this.$nextTick(function(){
      	this.mWidth = window.innerWidth;
        this.getBookDetail();
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
        }
      })
    },
    methods:{
      goBack:function(){
        if(window.plus){
          this.webviewAnimation();
        }else{
          history.back()
        }
      },
      webviewAnimation:function(){
        this.ws.hide('slide-out-right');
      },
      plusReady:function(){
        var self = this;
        this.ws = plus.webview.currentWebview();
        this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
		        console.log('reject url: '+e.url);
		    });
        var view = this.ws.getTitleNView();
        view.drawBitmap('_www/img/write.png',{top:'0px',left:'0px',width:'100%',height:'100%'}, {top:'12px',left:(self.mWidth-45).toString()+'px',width:'20px',height:'20px'})
        plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right");
//					self.ws.opener().reload();  //webview重新加载
				}, false);
				view.addEventListener("touchend", self.showOutlineFn, false);
				view.interceptTouchEvent(true)
      },
      showOutlineFn:function(e){
      	var self = this;
      	console.log(JSON.stringify(e))
      	if(e.clientX>self.mWidth-45){
      		console.log("作品大纲")
      		if(window.plus){
		      	this.wn = plus.webview.create(appPathList.netWorks+"/newbook/"+this.bookId,'newbook',{
		      		'popGesture':'close',
					      'titleNView':{'backgroundColor':'#ffffff','titleText':'修改书籍','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
					      'statusbar':{'background':'#ffffff'},
					      "backButtonAutoControl":'close'
		      	})
		      	this.wn.onloading= function(){
								plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
							}
							this.wn.onloaded=function(){
								plus.nativeUI.closeWaiting();
							}
		        this.wn.show('slide-in-right');
      		}
      	}
      },
      recordFn:function(e,index,obj){
        this.pageX = e.changedTouches[0].clientX;
      },
      timelyMove:function(e){
//      console.log(e );
      },
      /*
       * @methods : 控制按钮的开启和关闭
       * @params : 1,e代表事件对象；2，index代表卷下标；3，obj，代表dom对象；4，a==1表示操作卷一行，a==2表示操作章节一行
       */
      openOrCloseBtn:function(e,index,obj,a){
        if(a==1){
          if(this.volumeList[index]){
            if(this.volumeList[index].flag==true){
              return
            }
          }
          var list = this.volumeList;
          for(var i=0;i<list.length;i++){
            list[i].animation = false;
            list.splice(i,1,this.volumeList[i]);
          }
        }
        if(a==2){
          var list = this.volumeList[index].contentEntityList;
          for(i=0;i<list.length;i++){
            list[i].animation = false;
            list.splice(i,1,list[i]);
          }
        }
        if(this.pageX > e.changedTouches[0].clientX+10){
          obj.animation = true;
        }
        if(this.pageX < e.changedTouches[0].clientX-10){
          obj.animation = false;
        }
      },
      examine:function(){
      	console.log("审核");
      	var _data = {};
        _data.bookId = parseInt(this.bookId, 10);
        _data.message = '';
        SZXJ.http(this,'post', appPathList.userUpdateBookStatus, _data, (response) => {      
            if(response.data.code==203){
//          	console.log(response.data.msg);
            	plus.nativeUI.toast(response.data.msg)
            }else{
//          	console.log(response.data.msg);
            	plus.nativeUI.toast('提交成功')
            }
        },(err)=>{
            plus.nativeUI.toast(err.data.msg)
        });
      },
      signFn:function(){
//    	if(this.bookWordCount<80000){
//    		plus.nativeUI.toast("字数未达8万字，请加油！")
//    		return
//    	}
      	if(this.bookReviewStatus!='已审核'){
      		plus.nativeUI.toast("此作品未审核，不可签约")
      		return
      	}
      	
        if(window.plus){
        	this.wn = plus.webview.create(appPathList.netWorks+"/sign/"+this.bookId,'sign',{
        		'popGesture':'close',
			      'titleNView':{'backgroundColor':'#ffffff','titleText':'签约详情','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
			      'statusbar':{'background':'#ffffff'},
			      "backButtonAutoControl":'close'
        	})
        	this.wn.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
          this.wn.show('slide-in-right');
        }
      },
      /* 
       *@method: 反序 
      */
      setVolumeOrder:function(){
        this.volumeList1.reverse();
      },
      createOrUpdateChapter:function(volumeId,contentId){
        if(window.plus){
          this.wn = plus.webview.create(appPathList.netWorks+'/editorChapter/'+volumeId +'&'+contentId,'chapter')
          this.wn.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					this.wn.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
          this.wn.show('slide-in-right');
        }else{
//        location.href = "/mView/editorChapter/"+volumeId +'&'+contentId;
        }
      },
      createNewVolume:function(){
        this.submitVolumeFn();
      },
      openChapter:function(){
        this.chapterBol = true;
        this.actionBol = false;
        this.volumeBol2 = false;
        this.shadowBol = true;
      },
      openVolume:function(){
        this.volumeBol2 = true;
        this.actionBol = false;
        this.chapterBol = false;
        this.shadowBol = true;
      },
      closeVolume:function(){
        this.shadowBol = false;
        this.volumeBol2 = false;
      },
      closeVolumeOrChapter:function(){
        this.volumeBol2 = false;
        this.chapterBol = false;
        this.shadowBol = false;
        this.actionBol = false;
      },
      openOrCloseAction:function(){
        if(this.actionBol){
          this.actionBol = false;
          this.shadowBol = false;
        }else{
          this.shadowBol = true;
          this.actionBol = true;
        }
      },
      submitVolumeFn: function() {
        if(this.volumeName==''){
        	if(window.plus){
		    			plus.nativeUI.toast( "请输入卷名");
		    		}
//        this.$refs.appAlert.setMessage('请输入卷名')
          return
        }
        var _data = {};
        _data.bookId = this.bookId;
        _data.volumeName = this.volumeName;
        _data.volumeId = '';
        SZXJ.http(this,'get', appPathList.saveOrUpdateVolume+'?bookId='+this.bookId+'&volumeName='+this.volumeName+'&voumeId=', _data, 
          (response) => {
          	if(window.plus){
		    			plus.nativeUI.toast( "新卷创建成功");
		    		}
//          this.$refs.appAlert.setMessage('新卷创建成功');
            this.getBookDetail();
            this.volumeBol2 = false;
            this.shadowBol = false;
            this.volumeName = '';
        });
      },
      setOrder:function(a){
        this.volumeList[a].contentEntityList.reverse();
        if(this.volumeList[a].orderBol){
          this.volumeList[a].orderBol = false;
        }else{
          this.volumeList[a].orderBol = true;
        }
      },
      openOrCloseVolume:function(a){
        if(this.volumeList[a].contentEntityList.length==0){
        	if(window.plus){
		    			plus.nativeUI.toast( "快去创建新章节吧！！！");
		    		}
//        this.$refs.appAlert.setMessage('快去创建新章节吧！！！')
          return
        }
        if(this.volumeList[a].animation==true){
          return
        }
        if(this.volumeList[a].flag){
          this.volumeList[a].flag = false;
        }else{
          this.volumeList[a].flag = true;
        }
      },
      getBookDetail:function(){
        var self = this;
        SZXJ.http(this,'get',appPathList.queryBook+'?bookId='+this.bookId,{},function(res){
          var voulumeList = res.data.bookCustom.volumeCustomList;
          for(var i=0; i<voulumeList.length;i++){
            voulumeList[i].flag = false;
            voulumeList[i].orderBol = false;
            voulumeList[i].animation = false;
            for(var j=0; j<voulumeList[i].contentEntityList.length;j++){
              voulumeList[i].contentEntityList[j].animation = false;
            }
          }
          self.bookReviewStatus = res.data.bookCustom.bookReviewStatus;
          self.bookWordCount = res.data.bookCustom.bookWordCount;
          self.bookName = res.data.bookCustom.bookName;
          self.volumeList = voulumeList;
          self.volumeList1 = JSON.parse(JSON.stringify(voulumeList));
          console.log(voulumeList);
        })
      },
      chapterDelete:function(contentId){
        var This = this;
        if(window.plus){
        	plus.nativeUI.confirm( "确定删除此章节?", function(e){
        		if(e.index==0){
	        		SZXJ.http(this,'get', appPathList.removeContent+'?contentId='+contentId, {},(response) => {
	        			plus.nativeUI.toast( "删除成功!");
								console.log("Close confirm: "+e.index);
								This.getBookDetail();
	        		})
	        	}else if(e.index==1){
        			plus.nativeUI.toast("已取消");
        		}
					});
        }
//        SZXJ.http(This,'get', appPathList.removeContent+'?contentId='+contentId, {},(response) => {
//        	if(window.plus){
//		    			plus.nativeUI.toast( "删除成功！");
//		    			return
//		    		}
////          This.$refs.appAlert.setMessage('删除成功！');
//          This.getBookDetail();
//        });
        
      },
      chapterChange:function(contentUpId,contentDownId){
        console.log(contentUpId+'&'+contentDownId)
        var This = this;
        SZXJ.http(this,'get', appPathList.contentChange+'?contentUpId='+contentUpId+'&'+'contentDownId='+contentDownId, {},(response) => {
          This.getBookDetail();
        });
      },
      volumeDelete:function(volumeId) {
        var This = this;     
        if(window.plus){
        	plus.nativeUI.confirm( "确定删除此卷?", function(e){
        		if(e.index==0){
        			SZXJ.http(this,'get', appPathList.removeVolume+'?volumeId='+volumeId, {},(response) => {
	        			plus.nativeUI.toast( "删除成功!");
								console.log("Close confirm: "+e.index);
								This.getBookDetail();
	        		})
        		}else if(e.index==1){
        			plus.nativeUI.toast("已取消");
        		}
        		
					});
        }
//      this.$refs.appConfirm.setMessage(true,'确定删除此卷？',function(){
//        SZXJ.http(This,'get', appPathList.removeVolume+'?volumeId='+volumeId, {}, (response) => {
//        	if(window.plus){
//		    			plus.nativeUI.toast( "删除成功！");
//		    			return
//		    		}
////          This.$refs.appAlert.setMessage('删除成功！');
//          This.getBookDetail();
//        });
//      })
      },
      volumeChange:function(volumeUpId, volumeDownId) {
        var This = this;
        SZXJ.http(this,'get', appPathList.volumeChange+'?volumeUpId='+volumeUpId+'&'+'volumeDownId='+volumeDownId, {}, (response) => {
          This.getBookDetail();
        });
    },
    },
    head:{
      title: '书籍创建页-QC轻小说',
      meta: [
          { charset: 'UTF-8' },
          { name: 'apple-touch-fullscreen', content: 'yes' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: "apple-mobile-web-app-capable",content:"yes"},
          { name: "apple-mobile-web-app-status-bar-style",content:"default"},
          { name: "description",content:"轻小说章节"},
          { name: "keywords",content:"轻小说章节"},
      ],
      link: [
          { rel: 'stylesheet', href: '/css/main_app.css' }
      ],
      script:[
          {src:"/lib/resize_320.js"},
      ]
    }
  }
</script>

<style>
	*{user-select: none;}
	.tp{
		background: white;
		height: .171rem;
		position: fixed;
    top: 0;
    z-index: 20;
    left: 0;
    right: 0;
	}
	.newBtn{
		position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.3854rem;
    padding: 0 0.128rem;
    border-top: 1px #c3c3c3 solid;
	}
	.newBtn .btn_container{
		width: 50%;
    display: inline-block;
    height: 100%;
    box-sizing: border-box;
    padding: 0.0853rem 0;
    vertical-align: top;
	}
	.newBtn .btn_container .new_volume{
		color: #fff;
    background-color: #ff8383;
    border-radius: 4px;
    height: 100%;
    text-align: center;
    line-height: 0.2146rem;
    width: 90%;
    margin-right: 10%;
    font-size: 0.1024rem;
	}
  .newBtn .btn_container .new_chapter{
  	color: #fff;
    background-color: #2EC0FF;
    border-radius: 4px;
    height: 100%;
    text-align: center;
    line-height: 0.2146rem;
    width: 90%;
    margin-left: 10%;
    font-size: 0.1024rem;
  }
  .header_ReadBook {
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 20;
    /*z-index: 30;*/
  }
  .header_ReadBook:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_ReadBook .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_ReadBook .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_ReadBook .header_Text {
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    /*text-align: center;*/
    width: 68.125%;
  }
  .header_ReadBook .header_Text span{
    display: inline-block;
    width: 86.238%;
    overflow: hidden;
    white-space: nowrap;
    float: right;
    text-overflow: ellipsis;
    text-align: center;
    padding-top: 0.0768rem;
    padding-bottom: 0.0768rem;
    font-size: 0.1365rem;
    line-height: .2048rem;
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    /*top: 0.5294rem;*/
    top: 0;
    bottom: 0.3854rem;
    overflow-y: scroll;
    background-color: #f2f2f2;
    box-sizing: border-box;
    padding: 0.128rem;
  }
  .content .volume_part{
    margin-bottom: 0.128rem;
  }
  .content .volume_part .volume_contain{
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .content .volume_part .volume_contain .volume_title{
    padding: 0.128rem 0.0853rem;
    font-size: 0.128rem;
    background-color: #fff;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
  }
  .content .volume_part .volume_contain .volume_title .volume_name{
    display: inline-block;
  }
  .content .volume_part .volume_contain .volume_title .volume_icon{
    float: right;
    width: 0.1621rem;
    height: 0.128rem;
  }
  .content .volume_part .volume_contain .volume_btn{
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    height: 0.384rem;
    width: 1.152rem;
  }
  .bottom{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/yellowBottom.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .top{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/yellowTop.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .content .chapter_all{
    background-color: #fff;
    padding: 0 0.0853rem;
  }
  .content .chapter_all .chapter_num{
    padding: 0.128rem 0;
    border-bottom: 1px solid #ff8383;
  }
  .content .chapter_all .chapter_num .chapter_num_all{
    display: inline-block;
  }
  .content .chapter_all .chapter_num .order{
    float: right;
  }
  .content .chapter_all .chapter_num .order span{
    display: inline-block;
    height: 0.128rem;
    color: #ff8383;
    font-size: 0.128rem;
    vertical-align: top;
  }
  .content .chapter_all .chapter_num .order .order_icon{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/overthrow.png);
    background-repeat: no-repeat;
    background-size: 0.1024rem 0.1024rem;
    background-position: center 0.0128rem;
    width: 0.1621rem;
  }
  .content .chapter_all .chapter_part .chapter_contain{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .content .chapter_all .chapter_part{
    width: 100%;    
    min-height: 0.256rem;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
    background-color: #fff;
  }
  .content .chapter_all .chapter_part .chapter_contain .chapter_name{
    display: inline-block;
    width: 60%;
    min-height: 0.256rem;
  }
  .content .chapter_all .chapter_part .chapter_contain .chapter_right{
    /*float: right;*/
    /*padding: 0.0683rem 0;*/
    /*height: 100%;*/
    min-width: 0.5035rem;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .content .chapter_all .chapter_part .chapter_contain .chapter_right .chapter_status{
    float: right;
    height: 0.1195rem;
    vertical-align: top;
    padding-top: 0.005rem; 
    font-size: 0.1195rem;
  }
  .content .chapter_all .chapter_part .chapter_contain .chapter_btn{
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1.152rem;
  }
  .content .chapter_all .chapter_part .chapter_contain .chapter_right .dirRight{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/right.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 0.06rem;
    height: 0.1195rem;
    float: right;
    vertical-align: top;
    margin-left: 0.0853rem;
  }
  .shadow{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0.3854rem;
    background-color: rgba(169,169,169,0.7);
  }
  .actions{
    position: fixed;
    right:0.128rem ;
    bottom: 0.5646rem;
    width: 0.384rem;
  }
  .actions .openBtn{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/add.png);
    background-repeat: no-repeat;
    background-size: 0.384rem 0.384rem;
    background-position: center;
    width: 0.384rem;
    height: 0.384rem;
  }
  .actions .moreActions{
  }
  .actions .moreActions .volumeOrChapter{
  }
  .actions .moreActions .volumeOrChapter .volume_action{
    margin-bottom: 0.1365rem;
  }
  .actions .moreActions .volumeOrChapter .volume_action .volume_icon{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/volume.png);
    background-repeat: no-repeat;
    background-size: 0.384rem 0.384rem;
    background-position: center;
    width: 0.384rem;
    height: 0.384rem;
  }
  .actions .moreActions .volumeOrChapter .volume_action .volume_title{
    width: 0.384rem;
    font-size: 0.1024rem;
    color: #fff;
    background-color: #2ec0ff;
    padding: 0.0427rem 0;
    text-align: center;
    border-radius: 0.0939rem;
    margin-top: 0.0427rem;
  }
  .actions .moreActions .volumeOrChapter .chapter_action{
    margin-bottom: 0.1365rem;
  }
  .actions .moreActions .volumeOrChapter .chapter_action .chapter_icon{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/chapter.png);
    background-repeat: no-repeat;
    background-size: 0.384rem 0.384rem;
    background-position: center;
    width: 0.384rem;
    height: 0.384rem;
  }
  .actions .moreActions .volumeOrChapter .chapter_action .chapter_title{
    width: 0.384rem;
    font-size: 0.1024rem;
    color: #fff;
    background-color: #2ec0ff;
    padding: 0.0427rem 0;
    text-align: center;
    border-radius: 0.0939rem;
    margin-top: 0.0427rem;
  }
  .actions .moreActions .closeBtn{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/close.png);
    background-repeat: no-repeat;
    background-size: 0.384rem 0.384rem;
    background-position: center;
    width: 0.384rem;
    height: 0.384rem;
  }
  .volume_form{
    width: 2.1845rem;
    min-height: 1.1264rem;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    position: fixed;
    padding: 0.0853rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .volume_form .form_title{
    width: 100%;
    /*height: ;*/
   font-size: 0.128rem;
   text-align: center;
   padding: 0.128rem 0;
   box-sizing: border-box;
  }
  .volume_form .form_btn{
  }
  .volume_form .form_btn .btn_part{
    width: 0.9173rem;
    padding: 0.0427rem 0;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    display: inline-block;
    font-size: 0.128rem;
  }
  .yellow{
    background-color: #fedc6f;
  }
  .hui{
    background-color: #989898;
    float: right;
  }
  .chapter_form{
    width: 2.176rem;
    height: 3.0037rem;
    background-color: #fff;
    border-radius: 5px;
    padding: 0.0853rem;
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .chapter_form .chapter_title{
    padding: 0.0853rem 0 0.1195rem 0;
    text-align: center;
    font-size: 0.1365rem;
  }
  .chapter_form .chapter_volumeList{
    position: absolute;
    top: 0.4266rem;
    left: 0.0853rem;
    right: 0.0853rem;
    bottom: 0.0853rem;
    border-radius: 4px;
    background-color: #f2f2f2;
    overflow: scroll;
  }
  .chapter_form .chapter_volumeList .chapter_volumeList_title{
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #fedc6f;
    text-align: center;
    position: fixed;
    left: 0.0853rem;
    right: 0.0853rem;
    top:  0.4266rem;
  }
  .chapter_form .chapter_volumeList .chapter_volumeList_title span{
    display: inline-block;
    font-size: 0.1109rem;
    color: #fff;
    /*height: 0.1109rem;*/
    padding: 0.128rem 0;
    /*box-sizing: border-box;*/
  }
  .chapter_form .chapter_volumeList .chapter_volumeList_title .right_order{
    float: right;
    display: inline-block;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/overthrow.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 0.1195rem;
    height: 0.1109rem;
    margin-right: 0.0853rem;
    padding: 0.1834rem 0;
  }
  .chapter_form .chapter_volumeList .volumeList_content{
    min-height: 2.5rem;
    margin-top: 0.47rem;
  }
  .chapter_form .chapter_volumeList .volumeList_content .volumeList_part{
    font-size: 0.128rem;
    padding: 0.128rem 0.0853rem;
    border-bottom: 1px solid #c3c3c3;
    color: #c3c3c3;
  }
  .transitionHome{
    transition: transform .5s;
  }
  .transitionStart{
    transform: translateX(-1.152rem);
  }
  .transitionEnd{
    transform: translateX(-0rem);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .btnZqs{
    padding: 0.128rem 0;
    font-size: 0.128rem;
    width: 0.384rem;
    text-align: center;
    display: inline-block;
    font-size: 0.128rem;
    height: 0.384rem;
    height: 100%;
    box-sizing: border-box;
  }
  .btnC{
    width: 0.384rem;
    text-align: center;
    line-height: 100%;
    display: inline-block;
    font-size: 0.1195rem;
    padding: 0.085rem 0 0.0725rem 0;
    height: 100%;
    box-sizing: border-box;
  }
</style>
<template>
  <div style="font-size: 12px; position: fixed; left: 0; right: 0; top: 0; bottom: 0; background-color: #f2f2f2;">
    <!--头部-->
    <div class="classAll_tp"></div>
    <div class="classAll_header">
      <!--<div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>-->
      <div class="header_title">
        <span>分类</span>
      </div>
    </div>
    <div class="classAll_content">
    	<div class="contentsc">
	      <div class="content_header">
	        <div style="width: 50%; height: 0.4181rem; display: inline-block; text-align: left;">
	          <a href="javascript:;" @click="gotoFn(19)" class="all_class">查看全部</a>
	        </div>
	        <div style="width: 50%; height: 0.4181rem; display: inline-block; text-align: right;">
	          <a href="javascript:;" @click="gotoFn(20)" class="bookSign">签约作品</a>
	        </div>
		    </div>
		    <div class="content_list">
	        <div class="content_contain">
	          <div class="content_part" @click="gotoFn(1)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/fight.png" />
	            </div>
	            <div class="book_name">战斗</div>
	          </div>
	          <div class="content_part" @click="gotoFn(2)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/9345d688d43f87949aa1f793da1b0ef41bd53a34.png" />
	            </div>
	            <div class="book_name">幻想</div>
	          </div>
	          <div class="content_part"  @click="gotoFn(3)">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(2).png" />
	            </div>
	            <div class="book_name">恋爱</div>
	          </div>
	          <div class="content_part" @click="gotoFn(4)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(3).png" />
	            </div>
	            <div class="book_name">异界</div>
	          </div>
	          <div class="content_part" @click="gotoFn(5)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(4).png" />
	            </div>
	            <div class="book_name">搞笑</div>
	          </div>
	          <div class="content_part" @click="gotoFn(18)">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(7).png" />
	            </div>
	            <div class="book_name">网游</div>
	          </div>
	          <div class="content_part" @click="gotoFn(7)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(8).png" />
	            </div>
	            <div class="book_name">校园</div>
	          </div>
	          <div class="content_part" @click="gotoFn(8)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/20150119154419_iF5sC.thumb.png" />
	            </div>
	            <div class="book_name">后宫</div>
	          </div>
	          <div class="content_part" @click="gotoFn(9)">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(10).png" />
	            </div>
	            <div class="book_name">推理</div>
	          </div>
	          <div class="content_part" @click="gotoFn(10)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(13).png" />
	            </div>
	            <div class="book_name">科幻</div>
	          </div>
	          <div class="content_part" @click="gotoFn(16)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/756b392ea7ffb40c468cb1d86adaa389.png" />
	            </div>
	            <div class="book_name">同人</div>
	          </div>
	          <div class="content_part" @click="gotoFn(12)">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(14).png" />
	            </div>
	            <div class="book_name">超能力</div>
	          </div>
	          <div class="content_part" @click="gotoFn(13)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/f6d6bb02738da977e9ed9be3b751f8198418e384.png" />
	            </div>
	            <div class="book_name">恐怖</div>
	          </div>
	          <div class="content_part" @click="gotoFn(14)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/54194.png" />
	            </div>
	            <div class="book_name">伪娘</div>
	          </div>
	          <div class="content_part" @click="gotoFn(6)">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/cdad470fc56c41989c6a09b2f5ba3032_th.png" />
	            </div>
	            <div class="book_name">日常</div>
	          </div>
	          <div class="content_part" @click="gotoFn(11)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/a2mtc64518943888542.png" />
	            </div>
	            <div class="book_name">治愈</div>
	          </div>
	          <div class="content_part" @click="gotoFn(17)" style="margin-right: 0.128rem;">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/u=2557950098,1954929013&fm=214&gp=0.png" />
	            </div>
	            <div class="book_name">悬疑</div>
	          </div>
	          <div class="content_part" @click="gotoFn(15)">
	            <div class="book_img">
	              <img src="http://cdn.qcacg.com/mobile/img/app_classAll/timg-(15).png" />
	            </div>
	            <div class="book_name">乙女</div>
	          </div>
	        </div>
	      </div>
    	</div>
    </div>
  </div>
</template>

<script>
  import SZXJ from "~/components/vueHttp-app"
  import Path from "~/components/conf-app"
  export default{
    data:function(){
      return {
        ws:{}
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
        }
      })
    },
    methods:{
//    goBack:function(){
//      history.back();
//    },
      plusReady:function(){
      },
      gotoFn: function(id){
        if(window.plus){
          this.ws=plus.webview.create(Path.netWorks+'/classes/'+id,'class',
          {
		        'popGesture':'close',
		        'titleNView':{'backgroundColor':'#ffffff','titleText':'分类','titleColor':'#000000','autoBackButton':true,splitLine:{color:'#C3C3C3'}},
		        'statusbar':{'background':'#ffffff'},
		        "backButtonAutoControl":'close'
	        });
	        this.ws.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					this.ws.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
          this.ws.show('slide-in-right');
        }else{
          console.log(111);
//        location.href = '/mView/classes/' + id;
        }
      }
    }
  }
</script>

<style>
	*{user-select: none;}
	.classAll_tp{
		background-color: #FFFFFF;
		z-index: 25;
		height: .171rem;
	}
	.contentsc{
    position: absolute;
    top: 0.128rem;
    left: 0;
    right: 0;
	}
  .classAll_header{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    z-index: 25;
  }
  .classAll_header:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: .0072rem;
    width: 100%;
    background-color: #c3c3c3;
  }
  .classAll_header .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .classAll_header .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .classAll_header .header_title{
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    width: 100%;
  }
  .classAll_header .header_title span{
    display: inline-block;
    width: 100%;
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
  .classAll_content{
    position: absolute;
    left: 0.128rem;
    right: 0.128rem;
    top: .5294rem;
    bottom: 0.4181rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .classAll_content .content_header{
    width: 100%;
  }
  .classAll_content .content_header .all_class{
    width: 90%;
    height: 100%;
    border-radius: .03413rem;
    background-color: #ff96ac;
    display: block;
    padding: 0.0768rem 0.128rem;
    box-sizing: border-box;
    color: #fff;
    font-size: 0.1536rem;
    text-align: right;
    line-height: 0.256rem;
    background-repeat: no-repeat;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_classAll/classAll.png);
    background-size: 0.256rem;
    background-position: 0.128rem center;
  }
  .classAll_content .content_header .bookSign{
    width: 90%;
    height: 100%;
    border-radius: .03413rem;
    background-color: #fbbc72;
    display: inline-block;
    padding: 0.0768rem 0.128rem;
    box-sizing: border-box;
    color: #fff;
    font-size: 0.1536rem;
    text-align: right;
    line-height: 0.256rem;
    background-repeat: no-repeat;
    background-image: url(http://cdn.qcacg.com/mobile/img/app_classAll/sign.png);
    background-size: 0.256rem;
    background-position: 0.128rem center;
  }
  .classAll_content .content_list{
    margin-top: 0.0853rem;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .classAll_content .content_list .content_part{
    display: inline-block;
    width: 0.896rem;
  }
  .classAll_content .content_list .content_part .book_img{
    
  }
  .classAll_content .content_list .content_part .book_img img{
    width: 100%;
    border-radius: .04267rem;
  }
  .classAll_content .content_list .content_part .book_name{
    text-align: center;
    padding: 0.0682rem;
    font-size: 0.1195rem;
  }
</style>
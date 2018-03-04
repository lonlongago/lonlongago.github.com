<template>
<div :style="'font-size: 12px; position: fixed; left: 0; right: 0; top: 0;height:'+mHeight+'px; background-color: #f2f2f2;'">
  <appAlert ref="appAlert"></appAlert>
  <div class="tp"></div>
  <div class="header">
    <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
    </div>
    <div class="wordCount">
      <span style="font-size: 0.1024rem; color: #ff8383; ">{{content1|RegExpFn}}</span>
      <span style="font-size: 0.1024rem; color: #ff8383; ">字</span>
    </div>
    <div class="otherAction">
      <div class="action_part" @click="FormatFn()">
        <div class="part_icon makeup"></div>
        <div class="part_title">排版</div>
      </div>
      <div class="action_part" @click="saveDraft()">
        <div class="part_icon draft"></div>
        <div class="part_title">发布</div>
      </div>
      <div class="action_part" style="position: relative;">
        <div class="part_icon pic"></div>
        <div class="part_title">图片</div>
        <input class="input-file" id="imageUpload" type="file" name="fileInput" accept="image/*" style="position:absolute;left:0;opacity:0;width:100%;">
      </div>
    </div>
  </div>
  <div class="content">
    <div class="content_title">
      <input placeholder="输入章节标题（1-18字）" v-model = "contentTitle"/>
    </div>
    <div class="content_contain">
      <div class="content_text" id="content" ref="content" v-html='content' @keyup="changeFn()"></div>
    </div>
    
  </div>
  <div class="save btn" @click="publishContent()">
    保存草稿
  </div>
</div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  import appAlert from "~/components/AppAlert"
  import appConfirm from "~/components/AppConfirm"
  export default{
    components:{
      'appAlert':appAlert,
      'appConfirm':appConfirm
    },
    data:function(){
      return {
        contentTitle:'',
        fontsize:0,
        volumeId:'',
        contentId:'',
        content:'',
        mHeight:0,
        content1:'',
        ws:{},
        view:{},
        mWidth:0
      }
    },
    filters:{
      RegExpFn:function(value){
        return value.replace(/<[^>]+>/g,"").split('').length
      }
    },
    created:function(){
    },
    asyncData:function(context){
      var obj = {};
      console.log(context.params);
      var volumeId = context.params.Id.split('&')[0];
      var contentId = context.params.Id.split('&')[1];
      if(volumeId!=''){
        obj.volumeId = volumeId;
      }
      if(contentId!=''){
        obj.contentId = contentId;
      }
      return obj
    },
    mounted:function(){
      this.mHeight = window.innerHeight;
      this.mWidth = window.innerWidth;
      console.log(this.mHeight);
      this.$nextTick(function(){
        if(this.contentId!=''){
          this.getContentFn();
        }
        $('#content').artEditor({
            imgTar: '#imageUpload',
            limitSize: 3,   // 兆
            showServer: true,
            uploadUrl: appPathList.rootPath +　'/content/upload.shtml',
            data: {},
            uploadField: 'file',
            breaks: false,
            placeholader: '请输入文章正文内容',
            validHtml: ["br"],
//          formInputId: 'target',
            uploadSuccess: function (res) {
                // 这里是处理返回数据业务逻辑的地方
                // `res`为服务器返回`status==200`的`response`
                // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
                // 如果发现`res`不符合业务逻辑
                // 比如后台告诉你这张图片不对劲
                // 麻烦返回 `false`
                // 当然如果`showServer==false`
                // 无所谓咯
//              var result = JSON.parse(res)
//              var result = {};
//              result.data.url = res;
//              if (result['code'] == '100') {
                    return res;
//              } else {
//                  switch (result['code']) {
//                      case '101': {
//                      }
//                  }
//              }
                return false;
            },
            uploadError: function (status, error) {
                //这里做上传失败的操作
                //也就是http返回码非200的时候
                console.log(21222)
                if(window.plus){
				    			plus.nativeUI.toast( "网络异常" + status);
				    		}
            }
        });
        if(window.plus){
          this.plusReady();
        }else{
          document.addEventListener('plusready', this.plusReady, false);
        }
      })
    },
    methods:{
      goBack:function(){
      	var self = this;
      	if(window.plus){
      		plus.nativeUI.confirm('是否保存草稿',function(e){
	      		if(e.index == 0){
			  			SZXJ.http(this,'post', appPathList.saveOrUpdateContent, _data, (response) => {
	//		        	  if(window.plus){
					    			plus.nativeUI.toast( "草稿已保存");
//					    			self.webviewAnimation();
	//				    		}
	//		        	  setTimeout(function(){
	//		        	  	if(window.plus){
	//					          self.webviewAnimation();
	//					        }else{
	//					          history.back()
	//					        }
	//		        	  },500)
			        },(err)=>{
			        	  plus.nativeUI.toast(err.data.msg);
			        });
//			        this.webviewAnimation();
			      }else if(e.index == 1){
			      	plus.nativeUI.toast( "已取消");
//			      	self.webviewAnimation();
			      }
			      self.webviewAnimation();
		  	})
      	}
      },
      webviewAnimation:function(){
      	plus.webview.getWebviewById("bookDetail").reload();
        this.ws.hide('slide-out-right');
      },
      plusReady:function(){
        var self = this;
        this.ws = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right");
//					self.ws.opener().reload();  //webview重新加载
				}, false);
      },
      changeFn:function(){
        this.content1 = this.$refs.content.innerHTML;
      },
      publishContent:function(){
        var content = this.$refs.content.innerHTML;
        if(this.contentTitle==''){
        	if(window.plus){
		    			plus.nativeUI.toast( "章节名不能为空");
		    		}
//        this.$refs.appAlert.setMessage('章节名不能为空')
          return
        }
        if(this.contentTitle.split('').length >18){
        	if(window.plus){
		    			plus.nativeUI.toast( "章节名不能大于18个字符");
		    		}
//        this.$refs.appAlert.setMessage('章节名不能大于18个字符')
          return
        }
        if(content==''){
        	if(window.plus){
		    			plus.nativeUI.toast( "请输入内容");
		    		}
//        this.$refs.appAlert.setMessage('请输入内容')
          return
        }
//      console.log(content);
        this.content = content;
//      this.FormatFn();
        var _data = {
            formatText: this.content,      //文本格式化内容
            content: this.$refs.content.innerHTML,      //文本html内容
            contentTitle: this.contentTitle,    // 内容名称
            volumeId: this.volumeId, // 卷id
            contentId: this.contentId,
            contentStatus: 2,
        };
        var self = this;
        plus.nativeUI.confirm('是否保存草稿',function(e){
        	if(e.index == 0){
			  			SZXJ.http(self,'post', appPathList.saveOrUpdateContent, _data, (response) => {
			        	  if(window.plus){
					    			plus.nativeUI.toast( "草稿已保存");
					    			self.webviewAnimation();
					    		}
			        	  setTimeout(function(){
			        	  	if(window.plus){
						          self.webviewAnimation();
						        }else{
						          history.back()
						        }
			        	  },500)
			        });
	        }else if(e.index == 1){
	        	plus.nativeUI.toast( "已取消");
	        	self.webviewAnimation();
	        }
	  		},(err)=>{
        	  plus.nativeUI.toast(err.data.msg);
        });
      },
      saveDraft:function(){
      	var self = this;
      	var _data = {
            formatText: this.content,      //文本格式化内容
            content: this.$refs.content.innerHTML,      //文本html内容
            contentTitle: this.contentTitle,    // 内容名称
            volumeId: this.volumeId, // 卷id
            contentId: this.contentId,
            contentStatus: 0,    //发布
        };
      	if(window.plus){
      		plus.nativeUI.confirm('是否发布',function(){
			        SZXJ.http(self,'post', appPathList.saveOrUpdateContent, _data, (response) => {
			        	  if(window.plus){
					    			plus.nativeUI.toast( "发表成功");
					    		}
			        });
      		})
      	}
      },
      getContentFn: function() {
        SZXJ.http(this,'get', appPathList.ContentfindContent+'?contentId='+this.contentId, {}, (response) => {
          console.log(response);
          this.content = response.data.content;
          this.contentTitle = response.data.contentTitle;
          this.volumeId = response.data.volumeId;
          this.content1 = response.data.content;
        });
      },
      FormatFn:function(){
        var content = this.$refs.content.innerHTML;
        var JUHAO = /\./g;
        var GANTANHAO = /\!/g;
        var DOUHAO = /\,/g;
        var MAOHAO = /\:/g;
        var FENHAO = /\;/g;
        var WENHAO = /\?/g;
        var QIANYINHAO = /\"/g;
        var HOUYINHAO = /\"/g;
        var QIANKUOHAO = /\(/g;
        var HOUKUOHAO = /\)/g;
        var BOLANG = /\~/g;
        var IMG = /<img+\s/;
        var IMGALL = /<img.*?(?:>|\/>)/gi;
        var imgList = [];
//      var content1 = content.split('>');
//      var count =0;
//      for(var i = 0 ; i<content1.length; i++){
//        if(content1[i].search(IMG)==1){
//          var imgttt = content1[i]
//          imgttt = imgttt + '>';
//          imgList[count] = imgttt.match(IMGALL);
//          content1[i] = content1[i].replace(IMGALL,'<'+count);
//          count++;
//        }
//      }
//      content = content.join('>');
        content = content.replace(/&emsp;/g,"&emsp；");
        content = content.replace(/&nbsp;/g,"&nbsp；");
        content = content.replace(/<div>/g,"<p>");
        content = content.replace('/</div>/g',"</p>");
        
        content = content.replace(JUHAO,'。');
        content = content.replace(GANTANHAO,'！');
//      content = content.replace(DOUHAO,'，');
//      content = content.replace(MAOHAO,'：');
//      content = content.replace(FENHAO,'；');
        content = content.replace(WENHAO,'？');
//      content = content.replace(QIANYINHAO,'“');
//      content = content.replace(HOUYINHAO,'”');
        content = content.replace(QIANKUOHAO,'（');
        content = content.replace(HOUKUOHAO,'）');
        content = content.replace(BOLANG,'~');
        
//      for(var i = 0 ; i<content1.length; i++){
//        if(content1[i].search(IMG)==1){
//          var imgttt = content1[i]
//          imgttt = imgttt + '>';
//          imgList[count] = imgttt.match(IMGALL);
//          content1[i] = content1[i].replace(IMGALL,'<'+count);
//          count++;
//        }
//      }
        this.content = content;
        console.log(this.content);
      },
      saveContentFn:function(_data){
        var self = this;
        SZXJ.http(this,'post', appPathList.saveOrUpdateContent, _data, (response) => {
        	if(window.plus){
		    			plus.nativeUI.toast( "发表成功");
		    		}
        });
      }
    },
    head:{
      title: '章节编辑页-QC轻小说',
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
          {src:"/lib/jquery-1.11.0.js"},
          {src:"/lib/artEditor.js"}
      ]
    }
  }
</script>

<style>
	*{user-select: none;}
	.tp{
		background: white;
		height: .171rem;width: 100%;
	}
  .header{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
  }
  .header .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('http://cdn.qcacg.com/mobile/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header .wordCount{
    float: left;
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    min-width: .2048rem;
    padding: 0.0514rem 0 0.51rem 0;
  }
  .header .otherAction{
    float: right;
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    margin-right: 0.128rem;
    height: 0.2048rem;
    min-width: 0.2048rem;
  }
  .header .otherAction .action_part{
    height: 100%;
    display: inline-block;
  }
  .header .otherAction .action_part .part_icon{
    width: 0.1536rem;
    height: 0.1536rem;
    padding: 0.0256rem 0;
    display: inline-block;
    vertical-align: top;
    margin-left: 0.128rem;
  }
  .header .otherAction .action_part .part_title{
    display: inline-block;
    font-size: 0.128rem;
    padding: 0.0388rem 0 0.0380rem 0;
    color: #ff8383;
    vertical-align: top;
    margin-left: 0.0853rem;
  }
  .makeup{
    background-image: url(http://cdn.qcacg.com/mobile/static/img/app_userInfo/makeup.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .draft{
    background-image: url(http://cdn.qcacg.com/mobile/static/img/app_userInfo/draft.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .pic{
    background-image: url(http://cdn.qcacg.com/mobile/static/img/app_userInfo/pic.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .content{
    padding: 0 0.128rem 0 0.128rem;
    box-sizing: border-box;
    position: absolute;
    top: 0.5294rem;
    bottom: 0.4352rem;
    left: 0;
    right: 0;
    border-bottom: 01px solid #c3c3c3;
  }
  .content .content_title{
    height: 0.3755rem;
    background-color: #07C3F9;
    position: fixed;
    left: 0.128rem;
    right: 0.128rem;
    top: 0.5294rem;
  }
  .content .content_title:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #c3c3c3;
  }
  .content .content_title input{
    width: 100%;
    display: inline-block;
    border: none;
    background-color: #f2f2f2;
    padding: 0.128rem 0 0.1195rem 0;
    font-size: 0.128rem;
    color: #989898;
  }
  .content .content_contain{
    /*height: 4.5rem;
    padding-top: 0.5035rem;
    width: 100%;
    overflow: scroll;*/
    overflow: scroll;
     /*padding-top: 0.5035rem;*/
    position: fixed;
    left: 0.128rem;
    top: 0.9rem;
    right: 0.128rem;
    bottom: 0.5rem;
  }
  .content .content_contain .content_text{
    line-height: 1.2; 
    width: 100%;
  }
  .content .content_contain *{
    color: #989898;
    font-size: 0.128rem !important;
    line-height: 1.2;
    word-wrap: break-word;
  }
  .save{
    position: absolute;
    left: 0.128rem;
    right: 0.128rem;
    bottom: 0.0853rem;
    background-color: #fedc6f;
    text-align: center;
    color: #fff;
    font-size: 0.128rem;
    padding: 0.0683rem 0;
  }
</style>
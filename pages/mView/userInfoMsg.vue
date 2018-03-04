<template>
  <div :style="'font-size: 12px; position: fixed; left: 0; right: 0; top: 0;height:'+mHeight+'px; background-color: #f2f2f2;'">
    <script src="/lib/js/jquery.min.js" type="text/javascript"></script>
    <script>window.jQuery || document.write('<script src="/lib/js/jquery-2.1.1.min.js"><\/script>')</script>
    <script src="/lib/js/iscroll-zoom.js"></script>
    <script src="/lib/js/hammer.js"></script>
    <script src="/lib/js/jquery.photoClip.js"></script>
    <!--<div class="tp"></div>-->
    <!--头部-->
    <!--<div class="header_ReadBook">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_Text"><span>个人信息</span></div>
    </div>-->
    <div class="userInfo">
      <div class="headPortrait">
        <div class="headPortrait_title">头像</div>
        <div class="headPortrait_right" id="logoBox">
          <div class="headPortrait_img">
            <img :src="Path.imagePath+userHead"/>
          </div>
          <div class="right_icon"></div>
        </div>
      </div>
      <div class="htmleaf-container">
        <div id="clipArea"></div>
        <div id="view"></div>
      </div>
      <div class="name" @click="openName">
        <div class="name_title">昵称</div>
        <div class="name_right">
          <div class="user_name">{{userName}}</div>
          <div class="right_icon"></div>
        </div>
      </div>
      <div class="name" @click="openAutograph">
        <div class="name_title">我的签名</div>
        <div class="name_right">
          <div class="user_name">{{information}}</div>
          <div class="right_icon"></div>
        </div>
      </div>
      <div class="name" @click="open">
        <div class="name_title">性别</div>
        <div class="name_right">
          <div class="user_name">{{sex}}</div>
          <div class="right_icon"></div>
        </div>
      </div>
      <div class="name">
        <div class="name_title">生日</div>
        <div class="name_right">
          <div class="right_icon"></div>
        </div>
        <div class="datePicter_qcacg" @click="selectDate()">
          <!--<mu-date-picker :underlineShow='false' overlayColor="#fff"  @change="dev($event)" :value="birthday"/>-->
          <div>{{birthday}}</div>
        </div>
      </div>
      <a class="name" style="margin-top: 0.128rem;" href="javascript:;" @click="goUpdata()">
        <div class="name_title">修改密码</div>
        <div class="name_right">
          <div class="right_icon"></div>
        </div>
      </a>
      <div class="issure">
        <span class="btn" @click="Exit()">退出登录</span>
      </div>
    </div>
    <div class="shadow" v-if="shadowBol" @click="closeAll()"></div>
    <transition name="fade">
      <div class="volume_form" v-if="autographBol">
        <div class="form_title">修改签名</div>
        <div style="margin: 0.0853rem 0 0.1621rem 0;"><input v-model="information" style="border: none;background-color: #f2f2f2;height: 0.2048rem; width: 100%;border-radius: 3px; padding-left: 0.064rem;"/></div>
        <div class="form_btn">
          <div class="btn_part btn yellow" @click="updateData()">确认</div>
          <div class="btn_part btn hui" @click="closeFn()">取消</div>
          <!--<mu-raised-button label="确认" class="demo-raised-button yellow" primary @click="updateData()"/>
          <mu-raised-button label="取消" class="demo-raised-button hui" @click="closeFn()"/>-->
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="volume_form" v-if="nameBol">
        <div class="form_title">修改昵称</div>
        <div style="margin: 0.0853rem 0 0 0; "><input v-model="userName" style="border: none;background-color: #f2f2f2;height: 0.2048rem; width: 100%;border-radius: 3px; padding-left: 0.064rem;"/></div>
        <p style="color: #fc4545 ; margin: 0.064rem 0;">注：修改昵称需消耗600好人卡</p>
        <div class="form_btn">
          <div class="btn_part btn yellow" @click="updateData1()">确认</div>
          <div class="btn_part btn hui" @click="closeFn1()">取消</div>
          <!--<mu-raised-button label="确认" class="demo-raised-button yellow" primary @click="updateData1()"/>
          <mu-raised-button label="取消" class="demo-raised-button hui" @click="closeFn1()"/>-->
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="volume_form" v-if="sexBol">
        <div class="form_title">修改性别</div>
        <div style="margin: 0.0853rem 0 0.1621rem 0;">
          <div style="font-size: 0.1195rem; padding: 0.1195rem 0; border-top: 1px solid #c3c3c3; border-bottom: 1px solid #c3c3c3;" @click="setSex('男生')">
            <!--<mu-radio label="男生" name="group" nativeValue="男生" v-model="sex" class="demo-radio" @close="close"/>-->
            <span style="padding-right: 0.256rem; background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/man.png); background-repeat: no-repeat; background-position: right;background-size: 0.1195rem;color: #4593fc;">男</span><span v-if="sex=='男生'" style="float: right;height: 0.1195rem;width: 0.1621rem;background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/yellow_right.png);background-size: contain;background-repeat: no-repeat;"></span>
          </div>
          <div style="font-size: 0.1195rem; padding: 0.1195rem 0;  border-bottom: 1px solid #c3c3c3;" @click="setSex('女生')">
            <!--<mu-radio label="女生" name="group" nativeValue="女生" v-model="sex"  class="demo-radio" @close="close"/>--> 
            <span style="padding-right: 0.246rem; background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/wumen.png); background-repeat: no-repeat; background-position: right;background-size: 0.0999rem 0.1195rem;color: #fc4545;">女</span><span v-if="sex=='女生'" style="float: right;height: 0.1195rem;width: 0.1621rem;background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/yellow_right.png);background-size: contain;background-repeat: no-repeat;"></span>
          </div>
          
        </div>
        <div class="form_btn">
          <div class="btn_part btn yellow" @click="updateData2()">确认</div>
          <div class="btn_part btn hui" @click="closeFn2()">取消</div>
          <!--<mu-raised-button label="确认" class="demo-raised-button yellow" primary @click="updateData2()"/>
          <mu-raised-button label="取消" class="demo-raised-button hui" @click="closeFn2()"/>-->
        </div>
      </div>
    </transition>
    <div id="dpage">
      <a href="javascript:void(0);">
        <input type="button" name="file" class="button" value="选取照片">
        <input id="file" type="file" onchange="javascript:setImagePreview();" accept="image/*" multiple  />
      </a>
      <a href="javascript:void(0);" class="qx"><button id="clipBtn">截取图片</button></a>
      <a href="javascript:void(0);" class="qx" @click="quxiao"><button id="clipBtn">取消</button></a>
    </div>
  </div>
</template>

<script>
  import SZXJ from '~/components/vueHttp-app'
  import appPathList from '~/components/conf-app'
  export default{
    data:function() {
      return {
        Path:appPathList,
        mHeight:0,
        dialog: false,
        sex: '',
        birthday:0,
        dialog1:false,
        userInfoList:'',
        userName:'',
        shadowBol:false,
        autographBol:false,
        information:'',
        nameBol:false,
        userNameBackups:'',
        informationBackups:'',
        sexBol:false,
        sexBackups:'',
        userHead:'',
        imgurl:'',
        ws:{},
        wn:{},
      };
    },
    mounted:function(){
      this.mHeight = window.innerHeight;
      this.$nextTick(function(){
        SZXJ.http(this,'post',appPathList.queryUser,{},(response)=>{
          this.sex = response.data.sex;
          this.userInfoList = response.data;
          this.userName = response.data.userName;
          this.information = response.data.information;
          this.birthday =  response.data.birthday;
          this.loginImg = 'background-image: url('+ appPathList.ImageBookPath + response.data.userHead +')';
          this.userHead = response.data.userHead;
          console.log(response);
        });
        var self = this;
        $("#clipArea").photoClip({
          width: 243,
          height: 243,
          file: "#file",
          view: "#view",
          ok: "#clipBtn",
          loadStart: function() {
            console.log("照片读取中");
          },
          loadComplete: function() {
            console.log("照片读取完成");
          },
          clipFinish: function(dataURL) {
            console.log(dataURL);
            self.funUploadFile(dataURL);
          }
        });
        var self = this;
        $(function(){
          $("#logoBox").click(function(){
            $(".htmleaf-container").fadeIn(300);
            $("#dpage").addClass("show");
          })
          $("#clipBtn").click(function(){
//          $("#logoBox").empty();
//          $('#logoBox').append('<img src="' + imgsource + '" id="im" align="absmiddle" style=" width:100%;">');
            self.userHead = imgsource;
            $(".photo").hide();
            $(".htmleaf-container").hide();
            $("#dpage").removeClass("show");
          })
        });
        function setImagePreview() {
          var preview, img_txt, localImag, file_head = document.getElementById("file_head"),
              picture = file_head.value;
          if (!picture.match(/.jpg|.gif|.png|.bmp/i)){ 
	          	if(window.plus){
				    			plus.nativeUI.toast( "您上传的图片格式不正确，请重新选择!");
				    		}
              !1;
          }
          if (preview = document.getElementById("preview"), file_head.files && file_head.files[0]) preview.style.display = "block",
              preview.style.width = "1.7rem",
              preview.style.height = "1.7rem",
              preview.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);
          else {
            file_head.select(),
                file_head.blur(),
                img_txt = document.selection.createRange().text,
                localImag = document.getElementById("localImag"),
                localImag.style.width = "1.7rem",
                localImag.style.height = "1.7rem";
            try {
              localImag.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",
                  localImag.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img_txt
            } catch(f) {
            	if(window.plus){
			    			plus.nativeUI.toast( "您上传的图片格式不正确，请重新选择!");
			    		}
                  !1
            }
            preview.style.display = "none",
                document.selection.empty()
          }
          return document.getElementById("DivUp").style.display = "block",
              !0
        }
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
//        this.webviewAnimation();
          this.ws.hide('slide-out-right')
        }else{
          history.back()
        }
      },
      plusReady:function(){
        var self = this;
        this.ws = plus.webview.currentWebview();
        this.ws.overrideUrlLoading({mode:'reject'}, function(e){ //拦截跳往其他url
	        console.log('reject url: '+e.url);
	    });
        plus.key.addEventListener('backbutton', function(){
					self.ws.close("slide-out-right");
//					self.ws.opener().reload();  //webview重新加载
				}, false);
      },
//    webviewAnimation:function(){
//      plus.webview.startAnimation({view:this.ws,styles:{fromLeft:'0%',toLeft:'100%'},action:'none'},{view:this.wn,styles:{fromLeft:'-100%',toLeft:'0%'},action:'none'},function(e){
//        console.log(JSON.stringify(e))
//        console.log('操作成功')
//      });
//    },
      setSex:function(str){
        this.sex = str;
      },
      selectDate:function(){
      	var self =this;
      	if(window.plus){
      		plus.nativeUI.pickDate(function(e){
      			var d = e.date;
      			self.birthday = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      			var data = {};
	          data.birthday = self.birthday;
	          console.log(self.birthday);
	          self.updataUser(data);
      		},function(e){
      			
      		})
      	}
      },
      Exit:function(){
      	var self = this;
         SZXJ.http(this,'get',appPathList.logout,{},(response)=>{
         	if(window.plus){
		    			plus.nativeUI.toast( "注销成功");
		    			plus.navigator.removeCookie(appPathList.netWorks+'/indexContainer');
	         		self.ws.opener().reload();
	         		plus.nativeUI.showWaiting();
	         		setTimeout(function(){
	         			plus.nativeUI.closeWaiting();
	         			self.ws.close("slide-out-right")
	         		},1200)
		    	}
        })
      },
      goUpdata:function(){
      	if(window.plus){
      		var newView = plus.webview.create(appPathList.netWorks+"/password","password",{
      			"popGesture":"close",
      			"titleNView":{"autoBackButton":"true",backgroundColor:"#fff",titleText:"修改密码",splitLine:{color:'#c3c3c3'}},
      			"backButtonAutoControl":'close',
      			"statusbar":{background:'#fff'}
      		});
      		newView.onloading= function(){
						plus.nativeUI.showWaiting('',{'background':'rgba(0,0,0,0.2)'});
					}
					newView.onloaded=function(){
						plus.nativeUI.closeWaiting();
					}
      		newView.show("slide-in-right");
      	}
      },
      dev:function(a){
        console.log(a);
        var data = {};
        data.birthday = a;
        this.updataUser(data);
      },
      dev1:function(a){
        this.birthday = a ;
        console.log(a);
      },
      open:function () {
        this.sexBol = true;
        this.shadowBol = true;
        this.sexBackups = this.sex;
      },
      close:function () {
        this.sexBol = false;
        var data = {};
        data.sex = this.sex;
        this.updataUser(data);
      },
      closeAll:function(){
        this.autographBol = false;
        this.shadowBol = false;
        this.nameBol = false;
        this.sexBol = false;
      },
      openAutograph:function(){
        this.autographBol = true;
        this.shadowBol = true;
        this.informationBackups = this.information;
      },
      openName:function(){
        this.nameBol = true;
        this.shadowBol = true;
        this.userNameBackups = this.userName;
      },
      updateData:function(){
        var data = {};
        data.information = this.information;
        this.updataUser(data);
      },
      closeFn:function(){
        this.information = this.informationBackups ;
        this.autographBol = false;
        this.shadowBol = false;
      },
      updateData1:function(){
        var data = {};
        data.userName = this.userName;
        this.updataUser(data);
      },
      closeFn1:function(){
        this.userName = this.userNameBackups;
        this.nameBol = false;
        this.shadowBol = false;
      },
      updateData2:function(){
        var data = {};
        data.sex = this.sex;
        this.updataUser(data);
      },
      closeFn2:function(){
        this.sex = this.sexBackups;
        this.sexBol = false;
        this.shadowBol = false;
      },
      updataUser:function(data){
        var self = this;
        SZXJ.http(this,'post',appPathList.updateUser,data,(response)=>{
          self.closeAll();
          if(window.plus){
		    			plus.nativeUI.toast( "修改成功");
		    		}
//        self.$refs.appAlert.setMessage('修改成功')
        },(err)=>{
        	if(window.plus){
		    			plus.nativeUI.toast(err.data.msg);
		    		}
//      	console.log(err.data.msg)
        })
      },
      quxiao: function(){
        $(".htmleaf-container").hide();
        $("#dpage").removeClass("show");
      },
      convertBase64UrlToBlob: function(urlData){
          //去掉url的头，并转换为byte
          var bytes=window.atob(urlData.split(',')[1]);        
          
          //处理异常,将ascii码小于0的转换为大于0
          var ab = new ArrayBuffer(bytes.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
          }
          // 此处type注意与photoClip初始化中的outputType类型保持一致
          return new Blob( [ab] , {type : 'image/jpeg'});
      },
      funUploadFile: function(base64Codes){
          var self = this;
          var formData = new FormData();
          //convertBase64UrlToBlob函数是将base64编码转换为Blob
          //append函数的第一个参数是后台获取数据的参数名,在php中用$FILES['imageName']接收，
          formData.append("Image",self.convertBase64UrlToBlob(base64Codes));  
          //ajax 提交form
          $.ajax({
              // 你后台的接收地址
              url : appPathList.bookUpload, 
                type : "POST",
                data : formData,
                processData : false,         // 告诉jQuery不要去处理发送的数据
                contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
                
              success:function(data){
                  console.log('上传成功');
                  self.userHead=data.msg;
                  console.log(data.msg);
                  var data1 = {};
                  data1.userHead = self.userHead;
                  self.updataUser(data1);
              },
          });
      },
    },
    head:{
      title: '个人信息页-QC轻小说',
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
          {src:"/lib/resize_320.js"}
      ]
    }
  }
</script>

<style>
	*{user-select: none;}
	.tp{
		background: white;
		height: .171rem;
		width: 100%;
	}
  .header_ReadBook {
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: .171rem; left: 0;right: 0;
    /*z-index: 30;*/
  }
  .header_ReadBook:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: .0072rem;
    width: 100%;
    background-color: #c3c3c3;
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
  .userInfo{
    width: 100%;
    min-height: 3rem;
    /*margin-top: 0.3584rem;*/
   margin-top: 0;
    box-sizing: border-box;
  }
  .userInfo .headPortrait{
    min-height: 0.512rem;
    padding: 0.128rem;
    background-color: #fff;
  }
  .userInfo .headPortrait .headPortrait_title{
    font-size: 0.128rem;
    display: inline-block;
    padding: 0.193rem 0 0.191rem 0;
  }
  .userInfo .headPortrait .headPortrait_right{
    float: right;
    height: 0.512rem;
  }
  .userInfo .headPortrait .headPortrait_right .headPortrait_img{
    width: 0.512rem;
    height: 0.512rem;
    display: inline-block;
  }
  .userInfo .headPortrait .headPortrait_right .headPortrait_img img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  .userInfo .headPortrait .headPortrait_right .right_icon{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/right.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.0683rem;
    height: 100%;
    background-position: center;
    display: inline-block;
    padding: 0.192rem 0;
    margin-left: 0.0683rem;
    box-sizing: border-box;
  }
  .userInfo .name{
    margin-top: 1px;
    padding: 0 0.128rem;
    background-color: #fff;
    box-sizing: border-box;
    width: 100%;
    display: block;
    height: 0.384rem;
  }
  .userInfo .name .name_title{
    display: inline-block;
    font-size: 0.128rem;
    padding: 0.128rem 0;
  }
  .userInfo .name .name_right{
    float: right;
    padding: 0.128rem 0;
    text-align: right;
  }
  .userInfo .name .name_right .user_name{
    display: inline-block;
    vertical-align: top;
    font-size: 0.128rem;
    padding-top: 0.01rem;
    color: #656565;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 2rem;
  }
  .userInfo .name .name_right .right_icon{
    background-image: url(http://cdn.qcacg.com/mobile/img/app_userInfo/right.png);
    background-repeat: no-repeat;
    background-size: contain;
    width: 0.0683rem;
    height: 0.128rem;
    background-position: center;
    display: inline-block;
    margin-left: 0.0683rem;
    vertical-align: top;
  }
  .datePicter_qcacg{
    float: right;
    width: 0.6912rem;
    padding: 0.130rem 0 0.126rem 0;
  }
  .datePicter_qcacg *{
    font-size: 0.128rem;
    color: #656565;
    margin: 0;
    padding: 0;
  }
  .datePicter_qcacg input{
    padding: 0.192rem 0
  }
  .updata_autograph{
    width: 75%;
    height: 1.024rem;
    position: absolute;
    box-sizing: border-box;
    padding: 0 0.0853rem;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0 0 5px #000000;
    border-radius: 5px;
  }
  .updata_autograph .autograph_title{
    font-size: 0.128rem;
    padding: 0.128rem 0;
  }
  .shadow{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .issure{
    text-align: center;
    margin-top: 0.256rem;
  }
  .issure span{
    display: inline-block;
    font-size: 0.1195rem;
    background-color: #ff8991;
    width: 60%;
    padding: 0.0853rem 0;
    color: #fff;
    border-radius: 0.01707rem;
  }
  #dpage {background:#ebebeb; height:1.141rem; width:100%; position:fixed;left:0;bottom:-1.3141rem;visibility:hidden;z-index:999;-webkit-transform:translate3d(0px,0,0px);-moz-transform:translate3d(0px,0,0px);transform:translate3d(0px,0,0px);transition:all 0.3s; } 
  #dpage.show {visibility:visible;-webkit-transform:translate3d(0px,-1.3141rem,0px);-moz-transform:translate3d(0px,-1.3141rem,0px);transform:translate3d(0px,-1.3141rem,0px);}
  #dpage a { display:block; width:100%; text-align:center; height:0.256rem; background:#fff; color:#333; line-height:0.256rem; border-bottom:1px solid #ebebeb; font-size:0.128rem; position:relative;  }
  #dpage a:nth-child(2) { margin-top:0.128rem; margin-bottom:0.128rem; background:none;  }
  #dpage a:nth-child(3) { margin-top:0.128rem; margin-bottom:0.128rem; background:none;  }
  .clearfix:before,
  .clearfix:after{content: " ";display: table;}
  .clearfix:after{clear: both;}
  .htmleaf-container{margin: 0 auto;text-align: center;overflow: hidden;width: 100%;height: 100%;position: fixed;top: 0;background: #383838;display: none;z-index:996;}
  .htmleaf-content{font-size:150%;padding: 1em 0;}
  .htmleaf-content h2{margin: 0 0 2em;opacity: 0.1;}
  .htmleaf-content p{margin: 1em 0;padding: 5em 0 0 0;font-size: 0.65em;}
  
  /* Header*/.htmleaf-header{padding: 1em 190px 1em;letter-spacing: -1px;text-align: center;background: #66677c;}
  .htmleaf-header h1{color: #D5D6E2;font-weight: 600;font-size: 2em;line-height: 1;margin-bottom: 0;font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;}
  .htmleaf-header h1 span{font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;display: block;font-size: 60%;font-weight: 400;padding: 0.8em 0 0.5em 0;color: #c3c8cd;}
  /*nav*/.htmleaf-demo a{color: #1d7db1;text-decoration: none;}
  .htmleaf-demo{width: 100%;padding-bottom: 1.2em;}
  .htmleaf-demo a{display: inline-block;margin: 0.5em;padding: 0.6em 1em;border: 3px solid #1d7db1;font-weight: 700;}
  .htmleaf-demo a:hover{opacity: 0.6;}
  .htmleaf-demo a.current{background:#1d7db1;color: #fff;}
  /* Top Navigation Style*/.htmleaf-links{position: relative;display: inline-block;white-space: nowrap;font-size: 1.5em;text-align: center;}
  .htmleaf-links::after{position: absolute;top: 0;left: 50%;margin-left: -1px;width: 2px;height: 100%;background: #dbdbdb;content: '';-webkit-transform: rotate3d(0,0,1,22.5deg);transform: rotate3d(0,0,1,22.5deg);}
  .htmleaf-icon{display: inline-block;margin: 0.5em;padding: 0em 0;width: 1.5em;text-decoration: none;}
  .htmleaf-icon span{display: none;}
  .htmleaf-icon:before{margin: 0 5px;text-transform: none;font-weight: normal;font-style: normal;font-variant: normal;font-family: 'icomoon';line-height: 1;speak: none;-webkit-font-smoothing: antialiased;}
  /* footer*/.htmleaf-footer{width: 100%;padding-top: 10px;}
  .htmleaf-small{font-size: 0.8em;}
  .center{text-align: center;}
  .related{color: #fff;background: #494A5F;text-align: center;font-size: 1.25em;padding: 0.5em 0;overflow: hidden;}
  .related > a{vertical-align: top;width: calc(100% - 20px);max-width: 340px;display: inline-block;text-align: center;margin: 20px 10px;padding: 25px;font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;}
  .related a{display: inline-block;text-align: left;margin: 20px auto;padding: 10px 20px;opacity: 0.8;-webkit-transition: opacity 0.3s;transition: opacity 0.3s;-webkit-backface-visibility: hidden;}
  .related a:hover,
  .related a:active{opacity: 1;}
  .related a img{max-width: 100%;opacity: 0.8;border-radius: 4px;}
  .related a:hover img,
  .related a:active img{opacity: 1;}
  .related h3{font-family: "Microsoft YaHei", sans-serif;}
  .related a h3{font-weight: 300;margin-top: 0.15em;color: #fff;}
  /* icomoon*/.icon-htmleaf-home-outline:before{content: "\e5000";}
  .icon-htmleaf-arrow-forward-outline:before{content: "\e5001";}
  @media screen and (max-width: 50em){.htmleaf-header{padding: 3em 10% 4em;}
  .htmleaf-header h1{font-size:2em;}}
  @media screen and (max-width: 40em){.htmleaf-header h1{font-size: 1.5em;}}
  @media screen and (max-width: 30em){.htmleaf-header h1{font-size:1.2em;}}
  article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary{display: block;}
  audio, canvas, video{display: inline-block;}
  audio:not([controls]){display: none;height: 0;}
  a:focus{outline: thin dotted;}
  a:active, a:hover{outline: 0;}
  h1{font-size: 2em;margin: 0.67em 0;}
  abbr[title]{border-bottom: 1px dotted;}
  b, strong{font-weight: bold;}
  dfn{font-style: italic;}
  hr{-moz-box-sizing: content-box;box-sizing: content-box;height: 0;}
  mark{background: #ff0;color: #000;}
  code, kbd, pre, samp{font-family: monospace, serif;font-size: 1em;}
  pre{white-space: pre-wrap;}
  q{quotes: "\201C" "\201D" "\2018" "\2019";}
  small{font-size: 80%;}
  sub, sup{font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}
  sup{top: -0.5em;}
  sub{bottom: -0.25em;}
  img{border: 0;}
  svg:not(:root){overflow: hidden;}
  figure{margin: 0;}
  fieldset{border: 1px solid #c0c0c0;margin: 0 2px;padding: 0.35em 0.625em 0.75em;}
  legend{border: 0;padding: 0;}
  button, input, select, textarea{font-family: inherit;font-size: 100%;margin: 0;}
  button, input{line-height: normal;}
  button, select{text-transform: none;}
  button, html input[type="button"], input[type="reset"], input[type="submit"]{-webkit-appearance: button;cursor: pointer;}
  button[disabled], html input[disabled]{cursor: default;}
  input[type="checkbox"], input[type="radio"]{box-sizing: border-box;padding: 0;}
  input[type="search"]{-webkit-appearance: textfield;-moz-box-sizing: content-box;-webkit-box-sizing: content-box;box-sizing: content-box;}
  input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration{-webkit-appearance: none;}
  button::-moz-focus-inner, input::-moz-focus-inner{border: 0;padding: 0;}
  textarea{overflow: auto;vertical-align: top;}
  table{border-collapse: collapse;border-spacing: 0;}
  #clipArea{height: 90%;}
  #logoBox{}
  .filename{position: absolute;outline: 0 none;line-height: 1.5rem;font-size: 1.5rem;color: #999;width: 100%;margin: 0;overflow: hidden;cursor: default;text-overflow: ellipsis;white-space: nowrap;border: 0;top: 9.2rem;text-align: center;}
  .button{float: left;height: 100%;display: inline-block;outline: 0 none;margin: 0;cursor: pointer;border: 0;width:100%; background:#fff; }
  #im{height: 100%;width: 100%;}
  #file{float: left;height: 100%;}
  #clipBtn{height: 100%; width:96%; background: #009bdb; border-radius:5px;  border: 0;outline: none; color: #fff; font-size: 16px;  z-index: 999;}
  .filename{position: absolute;outline: 0 none;line-height: 1.5rem;font-size: 1.5rem;color: #999;width: 100%;margin: 0;overflow: hidden;cursor: default;text-overflow: ellipsis;white-space: nowrap;border: 0;top: 9.2rem;text-align: center;}
  .button{float: left;height: 100%;display: inline-block;outline: 0 none;margin: 0;cursor: pointer;border: 0;width:100%; background:#fff; }
  #dpage a input[type=file]{position: absolute;top: 0;left: 0;bottom: 0;border: 0;padding: 0;margin: 0; height:100%; width: 100%; cursor: pointer; border: solid 1px #ddd;opacity: 0;}
  input[type=button]::-moz-focus-inner{padding: 0;border: 0 none;-moz-box-sizing: content-box;}
  input[type=button]::-webkit-focus-inner{padding: 0;border: 0 none;-webkit-box-sizing: content-box;}
  input[type=text]::-moz-focus-inner{padding: 0;border: 0 none;-moz-box-sizing: content-box;}
  input[type=text]::-webkit-focus-inner{padding: 0;border: 0 none;-webkit-box-sizing: content-box;}
  .blue .button{color: #fff;background: #18b4ed;height:100%;}
</style>
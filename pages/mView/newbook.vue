<template>
	<div id="newboks">
		<script src="/lib/resize.js"></script>
		<script src="/lib/js/jquery.min.js" type="text/javascript"></script>
		<script>window.jQuery || document.write('<script src="/lib/js/jquery-2.1.1.min.js"><\/script>')</script>
		<script src="/lib/js/iscroll-zoom.js"></script>
		<script src="/lib/js/hammer.js"></script>
		<script src="/lib/js/jquery.photoClip.js"></script>
		<!--<div class="tp"></div>-->
		<div class="all">
			<!--<div class="top">
				<img @click="backFn" class="back" src="/img/back.png" alt="" />
				<span>创建书籍</span>
				<div class="btn" @click="submitFn1"><a>确定</a></div>
			</div>-->
			<div id="xiagu">
				<div class="newmid">
					<div class="bg">
						<span class="covers">添加封面</span><br />
						<span class="prop">图片宽高比1:1.4</span>
						<div id="logoBox">
							<img class="photo" id="" src="http://cdn.qcacg.com/mobile/img/jia.png" /> 
						</div>
					</div>
				    <div class="htmleaf-container">
					<div id="clipArea"></div>
					<div id="view"></div>
					</div>
					<!--<input type="file" ref="file" style="display: none;" v-on:change="fileUpload" />-->
					<div class="txts">
						<textarea maxlength="65" placeholder="在此处输入简介(最多可输入65字)" v-model="textarea" class="txt"></textarea>
					</div>
					<!--<div class="txts">
						<text class="txt">html怎么设置上一行跟下一行之间的距离html怎么设置上一行跟下一行之间的距离html怎么设置上一行跟下一行之间的距离html怎么设置上一行跟下一行之间的距离html怎么设置上一行跟下一行之间的距离html怎么设置上一行跟下一行之间的距离html怎么设置上一行跟下一行之间的距离html怎么设置上一行跟下一行之间的距离</text>
					</div>-->
					<!--<div class="title top">添加封面</div>
					<img class="exhibition" v-if="displayImg" :src=" displayImg " />
					<div class="upload" @click="clickFileActiveFn">点击上传</div>-->
				</div>
				<div class="below">
					<div class="bokna" @click="clzuo">
						<span class="shang">作品名(必填)</span>
						<span v-if="worksName != ''" class="xian">{{worksName}}</span>
						<span v-else class="xian">啦啦啦</span>
						<img class="goto" src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
					</div>
					<div class="bokna" @click="painter">
						<span class="shang">画师(选填)</span>
						<span v-if="paint != ''" class="xian">{{paint}}</span>
						<span v-else class="xian">落叶飘雪</span>
						<img class="goto" src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
					</div>
					<div class="bokna" @click="newway">
						<span class="shang">更新方式(必填)</span>
						<span v-if="dayfl" class="xian">日更</span>
						<span v-else class="xian">月更</span>
						<img class="goto" src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
					</div>
					<div class="bokna" @click="flei">
						<span class="shang">分类(必填)</span>
						<span class="xian">{{classList}}</span>
						<img class="goto" src="http://cdn.qcacg.com/img/app_index/classification_010.png" alt="" />
					</div>
				</div>
			</div>
			<div class="cover" v-if="painterFlag">
				<div class="painters">
			      	<span>画师</span>
			      	<input type="text" class="txtname" placeholder="此处填写画师名" maxlength="18" v-model="paint"/>
			      	<div class="anniu">
				      	<div class="confirm" @click="painterFlagFn(1)" >确认</div>
				      	<div class="cancel" @click="painterFlagFn(2)" >取消</div>
			      	</div>
			    </div>
			</div>
			<div class="cover" v-if="zuoFlag">
			    <div class="painters">
			      	<span>作品名</span>
			      	<input type="text" class="txtname" placeholder="此处填写作品名" maxlength="18" v-model="worksName"  />
			      	<div class="anniu">
				      	<div class="confirm" @click="painterFlagFn(1)" >确认</div>
				      	<div class="cancel" @click="painterFlagFn(2)" >取消</div>
				    </div>
			    </div>
			</div>
			<div class="cover" v-if="gxFlag">
			    <div class="gxway">
			      	<span class="xc">更新方式</span>
			      		<a href="javascript:;" @click="setMove(1)">
				      		<div style="width: 100%;" @click="reverseMessage(1)">
						      <p :style = "active==1?'color:#ffc200':'color:#323232'" >日更</p>
						      <img :src="active == 1?'http://cdn.qcacg.com/mobile/img/duise.png':'http://cdn.qcacg.com/mobile/img/kong.png'"/>
				      		</div>
					    </a>
					    <a href="javascript:;" @click="setMove(2)">
						    <div style="width: 100%;" @click="reverseMessage(2)">
						      <p :style = "active==2?'color:#ffc200':'color:#323232'">月更</p>
						      <img :src="active == 2?'http://cdn.qcacg.com/mobile/img/duise.png':'http://cdn.qcacg.com/mobile/img/kong.png'"/>
						    </div>
					    </a>
			      	<div class="anniu">
				      	<div class="confirm" @click="painterFlagFn(1)" >确认</div>
				      	<div class="cancel" @click="painterFlagFn(2)" >取消</div>
				    </div>
			    </div>
			</div>
			<div class="cover" v-if="flFlag">
			    <div class="fle">
					<div class="fsha">
				    	<span>选择分类</span>
				    	<a class="que" @click="queFn">确定</a>
			    	</div>
			    	<div class="fxia">
						<a v-for="(obj,index) in classArr" v-on:click="clickClassFn(obj,index)" :class="obj.flag == true?'primary':'default'" >{{obj.bookTypeName}}</a>
					</div>
				</div>
			</div>
		    <!--<div v-if="flFlag" class="fle">
		    	<div class="fsha">
			    	<span>选择分类</span>
			    	<a class="que" @click="queFn">确定</a>
		    	</div>-->
		    	<!--<div class="fxia">
		    		<span @click="setMove(1)">恋爱</span>
		    		<span @click="setMove(2)">后宫</span>
		    		<span @click="setMove(3)">搞笑</span>
		    		<span @click="setMove(4)">网游</span>
		    		<span @click="setMove(5)">超能力</span>
		    		<span @click="setMove(6)">幻想</span>
		    		<span @click="setMove(7)">异界</span>
		    		<span @click="setMove(8)">治愈</span>
		    		<span @click="setMove(9)">校园</span>
		    		<span @click="setMove(10)">战斗</span>
		    		<span @click="setMove(11)">推理</span>
		    		<span @click="setMove(12)">恐怖</span>
		    		<span @click="setMove(13)">伪娘</span>
		    		<span @click="setMove(14)">日常</span>
		    		<span @click="setMove(15)">科幻</span>
		    		<span @click="setMove(16)">乙女</span>
		    		<span @click="setMove(17)">同人</span>
		    		<span @click="setMove(18)">悬疑</span>
		    	</div>-->
		    </div>
		    <div id="dpage">
			 <a href="javascript:void(0);">
			 	<input type="button" name="file" class="button" value="选取照片">
				  <input id="file" type="file" onchange="javascript:setImagePreview();" accept="image/*" multiple  />
			 </a>
			 <a href="javascript:void(0);" class="qx"><button id="clipBtn">截取图片</button></a>
			 <a href="javascript:void(0);" class="qx" @click="quxiao"><button id="clipBtn">取消</button></a>
			</div>
		</div>
	</div>
</template>

<script>
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import axios from 'axios'
export default {
	asyncData: function(context){
		var obj = {};
		obj.bookId = context.params.id;
		return obj;
	},
	data : function() {
		return {
			flagVueObject:false,
			path:appPathList,
			bookId:'',
			displayImg: '',
			painterFlag:false,
			objUrl:'',
			subUrl:'',
			active:1,
			zuoFlag:false,
			gxFlag:false,
			flFlag:false,
			szxj:SZXJ,
			worksName:'',
			paint:'',
			dayfl:true,
			classList:'',
			classArr:[],
			trueClass:0,
			textarea:'',
			dataURL:'',
			updateCycle:1,
			imgurl:'',
			ws:{},
			mWidth:{},
			wvs:[]
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	var self = this;
	  	this.mWidth = window.innerWidth;
	  	self.getStatuFn();
	  	$("#clipArea").photoClip({
			width: 173,
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
			}, 
			success: function(data){
                This.imgUrl = data.msg;
                console.log(data);
//              console.log(this.imgUrl);
//              console.log(this.Imgbase64);
//              This.clearImgFn();
            }
		});
		$(function(){
			$("#logoBox").click(function(){
			$(".htmleaf-container").fadeIn(300);
			$("#dpage").addClass("show");
			})
				$("#clipBtn").click(function(){
					$("#logoBox").empty();
					$('#logoBox').append('<img src="' + imgsource + '" id="im" align="absmiddle" style=" width:100%;">');
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
//					!1;
			if (preview = document.getElementById("preview"), file_head.files && file_head.files[0]) preview.style.display = "block",
					preview.style.width = "1.7rem",
					preview.style.height = "2.43rem",
					preview.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);
			else {
				file_head.select(),
						file_head.blur(),
						img_txt = document.selection.createRange().text,
						localImag = document.getElementById("localImag"),
						localImag.style.width = "1.7rem",
						localImag.style.height = "2.43rem";
				try {
					localImag.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",
							localImag.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img_txt
				} catch(f) {
					if(window.plus){
		    			plus.nativeUI.toast( "您上传的图片格式不正确，请重新选择!");
//		    			!1
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
	methods: {
		backFn:function(){
	      if(window.plus){
	        this.webviewAnimation();
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
	      this.wvs = plus.webview.all();
	      plus.key.addEventListener('backbutton', function(){
			self.ws.close("slide-out-right");
//				self.ws.opener().reload();  //webview重新加载
		  }, false);
	      var view = this.ws.getTitleNView();
	      view.drawRect({color:'#2ec0ff',radius:'2px'}, {top:'8px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'28px'});
	      view.drawText('确定 ',{top:'0px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'44px'}, {size:'14px',color:'#fff'});
//	      view.setTouchEventRect({top:'0px',left:(this.mWidth-65).toString()+'px',width:'50px',height:'44px'});
	      view.addEventListener("click", self.submitFn1, false);
	      view.interceptTouchEvent(true)
	    },
	    webviewAnimation:function(){
	      plus.webview.getWebviewById("contribute").reload();
	      this.ws.hide('slide-out-right');
	    },
		quxiao: function(){
			$(".htmleaf-container").hide();
			$("#dpage").removeClass("show");
		},
		submitFn1:function(e) {
			if(e.clientX<this.mWidth-65){
				return
			}
			    if (this.worksName == '') { // 作品名称
//			        return;
			        if(window.plus){
		    			plus.nativeUI.toast( "请填写作品名称");
		    			return
		    		}
			    }
			    if (this.textarea =='') {
//			        return;
			        if(window.plus){
		    			plus.nativeUI.toast( "简介不能为空");
		    			return
		    		}
			    }
			    const arrTemp = [];
			    for (var i = 0; i < this.classArr.length; i++) {
			        if (this.classArr[i].flag) {
			            arrTemp.push(this.classArr[i].bookTypeId);
			        }
			    }
			    if (arrTemp.length === 0) { // arrTemp 作品分
//			        return;
			        if(window.plus){
		    			plus.nativeUI.toast( "请选择作品分类");
		    			return
		    		}
			    }
			    if (this.imgurl == '') {
//			        return;
			        if(window.plus){
		    			plus.nativeUI.toast( "请上传作品封面图");
		    			return
		    		}
			    }
		    	var _data = new Object();
			    _data.bookId = '';
			    _data.bookName = this.worksName;
			    _data.bookIntroduction = this.textarea;
			    _data.bookCoverImage = this.imgurl;
			    console.log(this.imgurl);
			    _data.sort = "少年";
			    _data.bookTypeList = arrTemp;
			    _data.updateCycle = this.updateCycle;
			    	//============================================
			    SZXJ.http(this,'post', appPathList.saveOrUpdateBook, _data, (response) => {
			    	plus.nativeUI.alert("亲，书籍创建成功！")
                    this.ws.opener().reload();  //webview重新加载
//                  this.ws.close('slide-out-right');
			    });
		    },
		painter: function(){
			this.painterFlag=true;
		},
		setMove: function(a){
			this.active =a;
		},
		queFn: function(){
			var arrTemp = [];
	        for (var i = 0; i < this.classArr.length; i++) {
		        if (this.classArr[i].flag) {
		            arrTemp.push(this.classArr[i].bookTypeName);
		        }
	        }
	        this.classList = arrTemp.join('/');
			this.flFlag=false;
		},
		clickClassFn: function(obj,v) {
			console.log(v);
	        if (obj.flag) {
	        	obj.flag = false;
	        	this.classArr.splice(v, 1, obj)
	        	this.trueClass = this.trueClass - 1;
	        } else {
		        if (this.trueClass < 5) {
		        	obj.flag = true;
		        	this.classArr.splice(v, 1, obj);
		            this.trueClass = this.trueClass + 1;
		        }
	        }
	    },
		painterFlagFn: function(a){
			if(a==1){
				var _data = new Object();
				_data.worksName=this.worksName;
				_data.paint=this.paint;
	  			this.reverseMessage();
				this.zuoFlag=false;
				this.painterFlag=false;
				this.gxFlag=false;
			}else if(a==2){
				this.painterFlag=false;
				this.zuoFlag=false;
				this.gxFlag=false;
			}
		},
		reverseMessage: function(d){
			if(d==1){
				console.log(d);
				this.dayfl = true;
				return this.updateCycle = 1;
			}else if(d==2){
				console.log(d);
				this.dayfl = false;
				return this.updateCycle = 2;
			}
			console.log(this.updateCycle);
			console.log(this.dayfl==2);
		},
		clzuo: function(){
			this.zuoFlag = true;
		},
		newway: function(){
			this.gxFlag = true;
		},
		getStatuFn: function(){
			var self = this;
			SZXJ.http(this,'get',appPathList.queryBook + '?bookId=' + this.bookId,{},(response)=>{
				self.bookId = response.data.bookCustom.bookId;
				self.worksName = response.data.bookCustom.bookName;
				self.updateCycle = response.data.bookCustom.updateCycle;
				if(self.updateCycle == 1){
					self.dayfl = true;
					self.setMove(1);
				}else if(self.updateCycle == 2){
					this.dayfl = false;
					self.setMove(2);
				}
				self.textarea = response.data.bookCustom.bookIntroduction;
				self.imgsource = response.data.bookCustom.bookCoverImage;
//				self.$refs.img1.src = appPathList.ImagePath + response.data.bookCustom.bookCoverImage;
				self.sort = response.data.bookCustom.sort;
				self.classArr = response.data.bookCustom.bookTypeEntityList;
				self.trueClass = self.classArr.length;
				var arrTemp = [];
			    for (var i = 0; i < self.classArr.length; i++) {
	                self.classArr[i].flag = true;
	                arrTemp.push(self.classArr[i].bookTypeName);
	      	    }
			    self.classList = arrTemp.join('/');
			    if(self.imgsource != ''){
			    	$("#logoBox").empty();
					$('#logoBox').append('<img src="' + imgsource + '" id="im" align="absmiddle" style=" width:100%;">');
			    }
//				self.classList = response.data.bookCustom.bookTypeList;
//				console.log(self.imgsource);
//				console.log(self.classList);
			})
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
                    self.imgurl=data.msg;
                    console.log(data.msg);
                },
            });
        },
//		imgsub: function(){
////			var self = this;
////          var formData = new FormData();
////          //convertBase64UrlToBlob函数是将base64编码转换为Blob
////          //append函数的第一个参数是后台获取数据的参数名,在php中用$FILES['imageName']接收，
////          formData.append("Image",self.convertBase64UrlToBlob(base64Codes));  
////          //ajax 提交form
////          $.ajax({
////              // 你后台的接收地址
////              url : appPathList.bookUpload, 
////              type : "POST",
////              data : formData,
////              processData : false,         // 告诉jQuery不要去处理发送的数据
////              contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
////              
////              success:function(data){
////                  console.log('上传成功');
////              },
////          });
////			var This = this;
////		        var data = $('#logoBox').jquery.photoClip('photoClip');
////		        var canvas = $('#logoBox').cropper('getCroppedCanvas', { width: 320, height: 448 });
////		        var file = this.dataURLtoBlob(canvas.toDataURL('image/png'));
////		        this.$refs.img0.src = canvas.toDataURL('image/png');
////		        console.log(this.$refs.img0.src);
////		        this.$refs.img1.src = canvas.toDataURL('image/png');
////		        var formData = new FormData();
////		        formData.append("Image", outputType);
////		        $.ajax({
////		            type: 'POST',
////		            processData: false,  // 告诉jQuery不要去处理发送的数据
////		            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
////		            url: appPathList.bookUpload,
////		            data: formData, 
////		            beforeSend: function(request) {
////		                request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
////		            },
////		            success: function(data){
////		                This.imgUrl = data.msg;
////		                console.log(data);
////		                console.log(this.imgUrl);
////		                console.log(this.Imgbase64);
////		                This.clearImgFn();
////		            },
////		        });
////			SZXJ.http(this,'post',appPathList.bookUpload,{},(response)=>{
////				console.log(response);
////				console.log(repose.data);
////				history.back();
////			})
//		},
		flei: function(){
			SZXJ.http(this,'get',appPathList.queryBookType,{},(response)=>{
				this.flFlag = true;
				this.classArr=response.data;
				console.log(this.classArr);
				console.log(response);
                if (this.classList !='') {
	                this.arrTemp = this.classList.split("/");  
	                for (var i = 0; i < this.classArr.length; i++) {
	                    for (var j = 0; j < this.arrTemp.length; j++) {
	                        if (this.arrTemp[j] == this.classArr[i].bookTypeName) {
	                            this.classArr[i].flag = true;
	                        }
	                    }
                    }
	                this.classArr = this.classArr;
	                this.trueClass = this.arrTemp.length;
			                console.log(this.trueClass);
                }else{
                	for (var i = 0; i < this.classArr.length; i++) {
	                    this.classArr[i].flag = false;
                    }
                	this.classArr = this.classArr;
                    this.trueClass = 0;
                }
			})
//			this.flFlag = true;
		},
//		clickFileActiveFn: function() { // 模拟点击效果
//			const ie = navigator.appName === 'Microsoft Internet Explorer' ? 'true' : 'false';
//			const file = this.$refs.file;
//			if(ie === 'true') {
//				file.click();
//			} else {
//				const a = document.createEvent('MouseEvents'); // FF的处理
//				a.initEvent('click', true, true);
//				file.dispatchEvent(a);
//			}
//		},
//		fileUpload(e) { // 文件上传
//			var This = this;
//			var file = e.target.files[0];
//			var formData = new FormData();
//			formData.append("file", file);
//			$.ajax({
//				type: 'POST',
//				processData: false, // 告诉jQuery不要去处理发送的数据
//				contentType: false, // 告诉jQuery不要去设置Content-Type请求头
//				url: PathList.caseFileUpload,
//				data: formData,
//				beforeSend: function(request) {
//					request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
//				},
//				success: function(data) {
//					This.imgUrl = data.data.filePath;
//					This.displayImg = PathList.ImagePath + This.imgUrl;
//					This.obj.imageCaseList.push(This.imgUrl);
//				},
//				error: function(data) {}
//			});
//		},
	},
  	head: function(){
  		return {
  			title: '创建书籍-QC轻小说',
  	    meta: [
  			    { charset: 'UTF-8' },
  			    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no' },
  			  	{ name: 'format-detection', content: 'telephone=no' },
  			  	{ name: 'apple-touch-fullscreen', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  			  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
  			  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
  			  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
  			],
  			link: [
//		    	{ rel: 'stylesheet', href: '/css/main_app.css' }
  	  		]
  	  }
  	}
}
</script>

<style>
	*{user-select: none;}
	body{background-color: #f4f4f4;}
	*{margin:0;padding:0;font-family:sansSerif;list-style:none;outline: none;color:#000;text-decoration:none;line-height: 1;}
	#xiagu{margin-top: .9rem;}
	.default{color:rgba(0,0,0,.45);font-family:"微软雅黑";margin: .22rem .3rem .21rem .35rem;width: 1.2rem;height: .42rem;line-height: .42rem;display: inline-block;text-align: center;font-size: .3rem;border-radius: 3px;}
	.primary{color:white;background:#ffc200;font-family:"微软雅黑";margin: .22rem .3rem .21rem .35rem;width: 1.2rem;height: .42rem;line-height: .42rem;display: inline-block;text-align: center;font-size: .3rem;border-radius: 3px;}
	#newboks{width: 100%;margin: 0 auto;}
	.tp{height: .4rem;background: white;right: 0;left: 0;position: fixed;z-index: 30;}
	#newboks .all{background-color: white;margin: 0 auto;overflow: hidden;}
	#newboks .all .cover{position: absolute;right: 0;top: 0;left: 0;bottom:0;background-color: rgba(0,0,0,0.5);z-index: 50;}
	#newboks .all .top{position: fixed;height: .88rem;background-color: white;width: 100%;z-index: 30;border-bottom: .01rem solid silver;top: .4rem;}
	#newboks .all .top .back{left: 0.31rem;box-sizing: border-box;height: .8rem;padding:0.25rem 0;position: absolute;}
	#newboks .all .top span{font-size:0.33rem;margin:0 auto;display:block;text-align:center;height:.8rem;padding-top: 0.25rem;padding-bottom:0.25rem;box-sizing:border-box}
	#newboks .all .top .btn{right:0.2rem;top:.17rem;position: absolute;height: .43rem;line-height: .43rem;padding: 0 0.3rem;background: #02bafa;border: 1px #26bbdb solid;border-radius: 3px;font-size: .28rem;}
	#newboks .all .top .btn a{color: white;}
	#newboks .all .newmid{position: absolute;/*top:1.3rem;*/top:0;width:100%;height: 5.5rem;margin: 0 auto;background-color: white;}
	#newboks .all .newmid .bg{width: 100%;height: 3.52rem;background-color:#DBDBDB;margin-top: 0px;}
	#newboks .all .newmid .covers{font-size: 0.32rem;color:#000000;margin-top: 0.65rem;position: absolute;/*margin-left: 3.07rem;*/margin-left: 42.5%;}
	#newboks .all .newmid .prop{font-size: 0.32rem;color: silver;margin-top:0.88rem;position: absolute;/*margin-left: 2.55rem;*/margin-left: 35%;}
	#newboks .all .newmid .photo{height: 0.92rem;width: 0.92rem;margin-top:1.5rem;position: absolute;margin-left: 0.3rem;display:block;}
	#newboks .all .newmid .txts{height:1.78rem;margin-top:0.1rem;font-size: 0.32rem;margin-left: 0.38rem;margin-right: 0.42rem;}
	#newboks .all .newmid .txt{border:0px;outline:none;resize:none;/*width:6.71rem;*/width:100%;height:1.7rem;padding-left:1px;word-break: normal;word-break:break-all;line-height: 0.5rem;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;color: rgba(0,0,0,.55);}
	#newboks .all .below{overflow:hidden;position: absolute;/*top: 7rem;*/top:5.7rem;background-color: white;width: 100%;}
	#newboks .all .below .bokna{margin-left: .32rem;width: 100%;height:.6rem;line-height:.6rem;padding:1.5% 2%;background-color:#fff;margin-top:1%;border-bottom:1px rgba(0,0,0,.08) solid;position:relative;height: .6rem;}
	#newboks .all .below .bokna img{box-sizing:border-box;height:.85rem;width:auto;position:absolute;display:block;top:0;left:7%;padding:0.28rem 0;}
	#newboks .all .below .bokna .goto{padding:0.3rem 0;left:88%;}
	#newboks .all .painters{box-shadow:0 0 20px silver;border-radius:3px;margin:0 auto;width: 5.12rem;height: 2.69rem;position: fixed;top: 50%;left: 50%;margin-left:-2.56rem;margin-top:-1.345rem;background: white;-webkit-transform:translate3d(0px,0,0px);-moz-transform:translate3d(0px,0,0px);transform:translate3d(0px,0,0px);transition:all 0.3s;}
	#newboks .all .painters.show{-webkit-transform:translate3d(0px,-2.69rem,0px);-moz-transform:translate3d(0px,-2.69rem,0px);transform:translate3d(0px,-2.69rem,0px);}
	#newboks .all .painters span{height: 1.06rem;line-height:1.06rem;display:inline-block;text-align:center;width: 100%;font-size: .32rem;font-family: "微软雅黑";}
	#newboks .all .painters .txtname{height: .47rem;font-size: .23rem;width: 4.7rem;margin-left: .16rem;background-color: antiquewhite;padding-left: .1rem;border: 0px;border-radius: 3px;}
	#newboks .all .painters .anniu{height: .51rem;margin-top: .37rem;width: 4.7rem;text-align: center;margin-left: .28rem;display: inline-flex;}
	#newboks .all .painters .anniu .confirm{height: 100%;width: 2.15rem;background-color:#fedc6f;border-radius: 3px;color: white;font-size: .32rem;line-height: .51rem;margin-right: .22rem;}
	#newboks .all .painters .anniu .cancel{height: 100%;width: 2.15rem;background-color:#989898;border-radius: 3px;line-height: .51rem;color: white;font-size: .32rem;}
	#newboks .all .gxway{box-shadow:0 0 20px silver;border-radius:3px;margin:0 auto;width: 5.13rem;height: 3.68rem;position: fixed;top: 50%;left:50%;margin-left:-2.565rem;margin-top:-1.84rem;background: white;-webkit-transform:translate3d(0px,0,0px);-moz-transform:translate3d(0px,0,0px);transform:translate3d(0px,0,0px);transition:all 0.3s;}
	#newboks .all .gxway .xc{height: .92rem;line-height:.92rem;display:inline-block;text-align:center;width: 100%;font-size: .32rem;font-family: "微软雅黑";}
	#newboks .all .gxway a{border-bottom:1px rgba(0,0,0,.08) solid;display: block;margin-left:.23rem;}
	#newboks .all .gxway a p{height: .88rem;width: 4.92rem;line-height: .88rem;font-size:.3rem;font-family:"微软雅黑";display: inline;}
	#newboks .all .gxway a img{width: .37rem;height: .3rem;float: right;margin-right: .22rem;margin-top: .3rem;}
	#newboks .all .gxway .anniu{height: .51rem;margin-top: .2rem;width: 4.7rem;text-align: center;margin-left: .28rem;display: inline-flex;}
	#newboks .all .gxway .anniu .confirm{height: 100%;width: 2.15rem;background-color:#fedc6f;border-radius: 3px;color: white;font-size: .32rem;line-height: .51rem;margin-right: .22rem;}
	#newboks .all .gxway .anniu .cancel{height: 100%;width: 2.15rem;background-color:#989898;border-radius: 3px;line-height: .51rem;color: white;font-size: .32rem;}
	#newboks .all .fle{box-shadow:0 -1px silver;position: fixed;margin: 0 auto;width: 100%;height: 5.28rem;z-index: 3;bottom: 0px;background: white;-webkit-transform:translate3d(0px,0,0px);-moz-transform:translate3d(0px,0,0px);transform:translate3d(0px,0,0px);transition:all 0.3s;}
	#newboks .all .fle .fsha{height: .9rem;width: 100%;border-bottom:1px rgba(0,0,0,.08) solid;text-align: center;}
	#newboks .all .fle .fsha span{font-size: .3rem;height: .9rem;line-height: .9rem;}
	#newboks .all .fle .fsha .que{height: .5rem;width: 1.2rem;background: #02bafa;border-radius: 3px;font-size: .28rem;color: white;position: absolute;top: .2rem;right: .32rem;line-height: .5rem;}
	#newboks .all .fle .fxia{width: 100%;}
	/*#newboks .all .fle .fxia span{}*/
	#newboks .all .below .bokna .shang{font-size: .32rem;}
	#newboks .all .below .bokna .xian{margin-right: .68rem;color: rgba(0,0,0,.45);font-size: .28rem;float: right;margin-right: 1.2rem;margin-top: .16rem;}
	#dpage {background:#ebebeb; height:3.08rem; width:100%; position:fixed;left:0;bottom:-3.08rem;visibility:hidden;z-index:999;-webkit-transform:translate3d(0px,0,0px);-moz-transform:translate3d(0px,0,0px);transform:translate3d(0px,0,0px);transition:all 0.3s; } 
 	#dpage.show {visibility:visible;-webkit-transform:translate3d(0px,-3.08rem,0px);-moz-transform:translate3d(0px,-3.08rem,0px);transform:translate3d(0px,-3.08rem,0px);}
	#dpage a { display:block; width:100%; text-align:center; height:0.8rem; background:#fff; color:#333; line-height:0.8rem; border-bottom:1px solid #ebebeb; font-size:0.32rem; position:relative;  }
	#dpage a:nth-child(2) { margin-top:0.2rem; margin-bottom:0.2rem; background:none;  }
	#dpage a:nth-child(3) { margin-top:0.2rem; margin-bottom:0.2rem; background:none;  }
 	/*图片裁剪-触屏设备*/
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
	
	/*上传图标*/
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
	#logoBox{width: 1.7rem;height: 2.43rem;top: 0.43rem;/*left: 2.9rem;*/left:39.3%;position: absolute;}
	#im{height: 100%;width: 100%;}
	/*#clipBtn{margin-top: 3rem;margin-bottom: 2rem;text-align: center}
	#clipBtn button{width: 90%;outline: none;border: none; background: #009bdb;color: #fff; height:40px; display: inline-block;border-radius: 0.4rem; font-size:16px; }*/
</style>
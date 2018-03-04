<template>
    <div>
    	<!--<script src="/lib/jquery.min.js"></script>
	    <script src="/lib/jquery-ui.min.js" ></script>
	    <script src="/lib/jquery.validate.js"></script>
        <link rel="stylesheet" href="../css/cropper.min.css" />
		<script type="text/javascript" src="../lib/cropper.min.js"></script>
		<script src="https://static.geetest.com/static/tools/gt.js"></script>
		<script type="text/javascript" src="../lib/require.js"></script>-->
		<alert ref="alert"></alert>
		<myheader></myheader>
		<div class="user_info_topBJ"></div>
		<div class="user_info clear"> 
		    <!-- 左边导航 --> 
			<navLeft :active = "active"></navLeft>
		    <!-- 右边内容 -->
			<div class="user_info_right">
				<div class="user_info_title">
				    <div class="titleBlock">
				     contribute
				    </div>
				    <div class="titleBlock_LG">
				     个人投稿
				    </div>
				</div>
				<div class="user_info_content">
				    <div class="contribution relative"> 
					    <ul class="nav">
					        <li @click="tapTrue" :class="infoBoolean?'active':'one'"><span class="circular"></span><span class="title_name">我的信息</span></li>
					        <li @click="tapFalse" :class="infoBoolean?'one':'active'"><span class="circular"></span><span class="title_name">修改密码</span></li>
					    </ul> 
					    <div class="content">
					    	<div v-show="infoBoolean">
							    <div class="bookBlockList">
								    <div class="bookBlockList_title">
								        <span class="hr"></span>
								        <span class="title">基本信息</span>
								        <span class="titleTwo">essential information</span>
								    </div>
								    <div class="portrait relative;" :style="loginImg">
								        <span v-if="sex == '男生'" class="attention-name-sex attention-name-sexTow"><img :src="path.ImagePath + '/img/sex_003.png'" alt="" /></span>
								        <span v-if="sex == '女生'" class="attention-name-sex attention-name-sexTow"><img :src="path.ImagePath + '..//img/sex_004.png'" alt="" /></span> 
								        <div v-show="imgFlag" style="top: 100px;left:400px;z-index:99999;background-color: #FFFFFF;width: 335px;height: 360px;box-shadow: 1px 1px 15px rgba(0,0,0,0.3);padding: 50px 50px 40px 70px;position: absolute;">
									        <input type="file" ref="file" style="display: none;" v-on:change="fileUpload" />
									        <div style="position: absolute;top: 50px;width: 232px;height: 232px;">
									            <img id="cropper-img" :src="Imgbase64 != '' ? Imgbase64 : '../static/img/232x232.jpg'" style="width: 100%;height: 100%;border: 1px solid #989898;background-color: #e5e5e5;display: block;margin-left: -116px;" />
									        </div>
									        <div style="position: absolute;top: 15px;right:195px;width:84px;font-size: 12px;text-align: center;line-height: 26px;height: 26px;">当前图片</div>
									        <div style="position: absolute;right: 85px;top: 15px;width: 84px;height: 26px;border-radius: 6px;">
										        <div style="border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" @click="clickFileActiveFn">
										           重新选择
										        </div>
									        </div>
									        <div style="position: absolute;right: 85px;top:300px;width: 84px;height: 26px;border-radius: 6px;">
									            <div style="border-radius: 6px;width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" @click="clearImgFn">
									                                取消上传
									            </div> 
									        </div>
									        <div style="position: absolute;right: 180px;top:300px;width: 84px;height: 26px;border-radius: 6px;">
									            <img :src="path.ImagePath + '/img/gou.png'" style="position: absolute;top: 5px;left: 5px;" />
									            <div style="padding-left: 10px;border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" @click="activeImgFn">
									                                确认上传
									            </div>
									        </div>
									        <div style="position: absolute;width:100%;bottom:10px;left: 0px;font-size: 14px;text-align: center;">
									                         支持JPG,PNG等格式,图片需小于2M
									        </div>
								        </div> 
								    </div>
								    <div class="messageAI">
								        <div class="up clear">
								            <span class="up-name ">{{ userInfoList.userName }}</span>
									        <ul>
									           <li class="up-word">关注：<a v-if="attention.length !== 0">{{attention.length}}</a><a v-else="">0</a></li>
									           <li class="up-word">粉丝：<a v-if="attentionTow.length !== 0">{{attentionTow.length}}</a><a v-else="">0</a></li>
									           <li style="display:none;" class="up-word">好人卡：0</li>
									        </ul>
								        </div>
								        <div class="centreAI">
									        <img class="imgAI1" :src="path.ImagePath + '/img/info_09.gif'" />
									        <span class="font">注册于{{ szxj.getLocalDate(userInfoList.createDate) }}</span>
									        <span>uid:&nbsp;{{ userInfoList.userId }}</span>
								        </div>
								        <div class="downAI">
									        <span>签名：</span> 
									        <input type="text" v-model="userInfoList.information" v-if="inputFlag" placeholder="最多保存30个字符" style="width:440PX;margin-right:20px;padding-left:10px" /> 
									        <input type="text" v-model="userInfoList.information" v-else="" placeholder="请输入个人简介" style="width:440PX;margin-right:20px;padding-left:10px;border: 2px solid rgba(0,0,0,0);" readonly="readonly" /> 
									        <img :src="path.ImagePath + '/img/info_14.jpg'" style="cursor:pointer" @click="setInputFlag" />
								        </div>
								    </div>
							        <hr style="border: 1px dotted #E1E1E1; margin:0 0 0 5%;" width="90%" />
								    <div class="change " @click="clickFileActiveFn">
								        更换头像
								    </div>
							    </div> 
							    <div class="bookBlockList relative">
							        <div v-if="infoFlag" style="position: absolute;top: 0px;left: 0px;bottom:0px;right: 0px;width: 100%;height: 230px;z-index: 999;"></div>
								    <div class="bookBlockList_title">
								        <span class="hr"></span>
								        <span class="title">详细信息</span>
								        <span class="titleTwo">detailed information</span>
								    </div> 
								    <div class="nameAI">
								        <span class="name1">昵称：</span>
								        <input :style="infoFlag ? 'border: 0px;padding-left: 5px;':'padding-left: 5px;'" type="text" v-model="userName" />
								        <span class="remarkAI">注： 修改名称需要600张好人卡</span>
								    </div>
								    <div class="sexAI">
								        <span class="name1">性别：</span>
								        <label class="butt"><input type="radio" name="sex" v-model="userInfoList.sex" value="男生" />男</label>
								        <label class="butt"><input type="radio" name="sex" value="女生" v-model="userInfoList.sex" />女</label>
								    </div> 
								    <div class="birthday"> 
								        <span class="name1">生日：</span>
								        <input :style="infoFlag ? 'border: 0px;padding-left: 5px;':'padding-left: 5px;'" type="text" placeholder="请选择生日时间" v-model="userInfoList.birthday" index="0" readonly="readonly" style="cursor: pointer;" @click="showDate" /> 
								        <date1 :type="Datetype" :show="showA" :value="userInfoList.birthday"
								        	@update:Datetype="val => Datetype = val"
								        	@update:show="val => showA = val"
								        	@update:value="val => userInfoList.birthday = val"
								        	 :x="x" :y="y" :begin="begin" :end="end" :range="range"></date1> 
								        <!--<date-time :type="Datetype" :show="showA" :value="userInfoList.birthday" :x="x" :y="y" :begin="begin" :end="end" :range="range"></date-time>--> 
								    </div>
								    <div class="numberAI">
								        <span class="name1">手机号码：</span>
								        <input type="text" v-model="userInfoList.telephone" style="border: none;" />
								        <span class="remarkAI">注： 手机号码暂不支持修改</span>
								    </div>
							        <hr style="width:90%;border: 1px dotted #E1E1E1 ; margin:20px 0 0 5%;" /> 
								    <div class="change2 " v-if="infoFlag" @click="setInfoFlag">
								        修改
								    </div>
								    <div class="change2 " v-else="" @click="submitInfoFlag">
								                保存
								    </div>
							    </div> 
							</div>
							<div v-show="!infoBoolean">
                                <div class="bookBlockList">
								    <div class="bookBlockList_title">
								        <span class="hr"></span>
								        <span class="title">修改密码</span>
								        <span class="titleTwo">essential information</span>
								    </div> 
								    <div class="numberAItwo1">
								        <span class="name1">旧密码：</span>
								        <input type="" name="" id="" value="" />
								    </div> 
								    <div class="numberAItwo2">
								        <span class="name1">新密码：</span>
								        <input type="password" v-model="passWord" />
								        <span class="remark1">密码由6-16个字符组成，区分大小写（不能包含空格）</span>
								    </div> 
								    <div class="numberAItwo3">
								        <span class="name1">确认新密码：</span>
								        <input type="password" v-model="passWordConfirm" />
								        <span class="remark1">密码强度：</span>
								    </div> 
								    <div class="numberAItwo4">
								        <span class="name1">手机验证：</span>
								        <input type="text" v-model="telephoneCode" /> 
								        <div class="verify" v-if="verifyFlag" @click="showCaptchaObj">
								                    发送验证码
								        </div> 
									    <div class="verify_no" v-else="">
									         {{verifyNumber}}重新发送
									    </div> 
								        <div id="popup-captcha"></div> 
								    </div>
								    <hr style="border: 1px dotted #E1E1E1; margin:0 0 0 5%;" width="90%" />
								    <div class="btn change" @click="submitFn">
								                确认
								    </div>
								</div>
							</div> 
					    </div>
				    </div>
				</div>
			</div>
		</div>
		<myfooter></myfooter>
    </div>
</template>

<script>
//	import vue from 'vue'
	import alert from '~/components/Alert'
	import header from '~/components/Header'
	import footer from '~/components/Footer'
	import PathList from '~/components/conf'
	import navLeft from '~/components/navLeft'
	import store from '~/components/store'
//	import axios from 'axios'
//	import Vuex from 'vuex'
	import dateTime from '~/components/date'
	import SZXJ from '~/components/vueHttp'
	export default{
//      store,
		components:{
			'alert':alert,
			'myheader':header,
			'myfooter':footer,
			'navLeft':navLeft,
			'date1': dateTime
		},
		data: function(){
			return {
		        bodyFlag: false,
		        path: PathList,
		        active: 'info',
		        loginImgFlag: true,
		        status:[],
	        	showFlag: 1,
	        	inputFlag: false,
	        	infoFlag: true, // 个人信息修改哪里的遮罩层
	        	userInfoList: {},
	        	szxj: SZXJ,
	        	userName: '',
	        	imgFlag: false,
		        Imgbase64: '',
		        imgUrl: '',
		        loginImg: '',
		        attention:[],
		        attentionTow:[],
		        sex:'男生',
		        RequestObj: {
		            status: 0,
		            pageNo: 1,
		            pageSize: 5,
		        },
		        RequestObjTow: {
		            status: 1,
		            pageNo: 1,
		            pageSize: 5,
		        },
			     // 时间控件
		        showA: false,
		        showB: false,
		        Datetype: 'date', // date datetime datetime24
		        begin: '',
		        end: '',
		        x: 0,
		        y: 0,
		        range: false,
		        // 时间控件结束
		        infoBoolean:true,
		        showFlag: 1,
	        	captchaObj: {},
	        	verifyFlag: true, // 验证码定时器判断
	        	verifyNumber: 60, // 验证码重置时间
	        	passWord: '',
	        	telephoneCode: '',
	        	uuid: '',
	        	passWordConfirm: ''
			}
		},
		asyncData: function(){
//			return axios({
//			  		method:'post',
//			  		url:PathList.queryUser,
//			  		data:{},
//			  		headers:{'JSESSIONID':store.state.count}
//			}).then(function(res2){
//				var obj = {};
//		    	obj.loginObj = {};
//		    	obj.sex= res2.data.sex;
//	          	obj.userInfoList = res2.data;
//	          	obj.userName = res2.data.userName;
//	          	obj.loginImg = 'background-image: url('+ PathList.ImageBookPath + res2.data.userHead +')';
//				return obj;
//			})
//	        .catch(function(error){
////	        	console.log(916);
////	        	console.log(error.request._headers);
////				if(error.response){
////					console.log(error.response.data);
////				    console.log(error.response.status);
////				} else {
////					console.log('Error',error.message);
////				}
////				console.log(error.config);
//			})
	},
		mounted: function (){
	        this.$nextTick(function(){
		        SZXJ.http(this,'post',PathList.queryUser,{},(response)=>{
		        	this.sex = response.data.sex;
		        	this.userInfoList = response.data;
		        	this.userName = response.data.userName;
		        	this.loginImg = 'background-image: url('+ PathList.ImageBookPath + response.data.userHead +')';
		        	//剪裁插件
//		        	setTimeout(function(){
		        		$('#cropper-img').cropper({
						    center:true,
						    aspectRatio:1 / 1,
						      // zoomable: false,
						    viewMode:2,
						    minContainerHeight: 136,
						    minCropBoxWidth:136,
						    preview: ".img-preview",
						    build: function (e) {
						            //console.log(e.type);
						    },
						    built: function (e) {
						            //console.log(e.type);
						    },
						    cropstart: function (e) {
						            //console.log(e.type);
						    },
						    cropmove: function (e) {
						            //console.log(e.type);
						    },
						    cropend: function (e) {
						            //console.log(e.type);
						    },
						    crop: function(e) {
						        $('#dataX').val(Math.round(e.x));
						        $('#dataY').val(Math.round(e.y));
						        $('#dataHeight').val(Math.round(e.height));
						        $('#dataWidth').val(Math.round(e.width));
						        $('#dataRotate').val(Math.round(e.rtate));
						        $('#dataScaleX').val(Math.round(e.scaleX));
						        $('#dataScaleY').val(Math.round(e.scaleY));
					        }
					    });
				    	$('#cropper-img').cropper('setDragMode', 'move');
//		        	},3000)
		        });
	        });
	        this.bodyFlag = true;
		},
		methods: {
		    setMessage(flag,message,Fn) {
			    this.$refs.alert.setMessage(flag,message,Fn);
			},
			showDate(e) {
		        e.stopPropagation();
		        const that = this;
		        that.showA = false;
		        that.showB = false;
		        
		        if (e.target.getAttribute('index') === '0') {
		            that.showA = true;
		        } else if (e.target.getAttribute('index') === '1') {
		            that.showB = true;
		        }
		        that.x = e.target.offsetLeft;
		        that.y = e.target.offsetTop + e.target.offsetHeight + 8;
		        const bindHide = (_event) => {
		            _event.stopPropagation();
		            if (e.target.getAttribute('index') === '0') {
		                that.showA = false;
		            } else if (e.target.getAttribute('index') === '1') {
		                that.showB = false;
		            }
		            document.removeEventListener('click', bindHide, false);
		        };
		        setTimeout(() => {
		            document.addEventListener('click', bindHide, false);
		        }, 500);
		        return false;
	        },
//	      	// 图片上传 start
		    dataURLtoBlob: function(dataurl) {
			    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			    while(n--){
			    	u8arr[n] = bstr.charCodeAt(n);
				}
			    return new Blob([u8arr], {type:mime});
		    },
	     	convertCanvasToImage: function(canvas) {
	    		var image = new Image();
			    image.src = canvas.toDataURL("image/png");
				return image;
		    },
		    clearImgFn: function(){
		        this.imgFlag=false;
		        this.Imgbase64='';
		    },
		    activeImgFn: function() {
		        var This = this;
		        var data = $('#cropper-img').cropper('getImageData');
		        var canvas = $('#cropper-img').cropper('getCroppedCanvas', { width: 136, height: 136 });
		        var file = this.dataURLtoBlob(canvas.toDataURL('image/png'));
		        var formData = new FormData();
		        formData.append("Image", file);
		        $.ajax({
		            type: 'POST',
		            processData: false,  // 告诉jQuery不要去处理发送的数据
		            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
		            url: PathList.userUpload,     //// 头像上传
                    data: formData, 
	                beforeSend: function(request) {
		                request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
	                },
	                success: function(data){
	                	This.$refs.alert.setMessage(false,"上传成功了",function(){
	                		This.imgUrl = data.msg;
		                    This.clearImgFn();
		                    var imgD = canvas.toDataURL('image/png');
		                    This.loginImg = 'background-image: url('+PathList.ImageBookPath+''+ imgD +')';
		                    This.$parent.loginImg = 'background-image: url('+PathList.ImageBookPath+''+ imgD +')';
	                	})
		            },
		            error: function(data) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
		            }
		        });
		    },
	      	clickFileActiveFn: function() {
		        const ie = navigator.appName === 'Microsoft Internet Explorer' ? 'true' : 'false';
		        const file = this.$refs.file;
		        if (ie === 'true') {
			        file.click();
		        } else {
			        const a = document.createEvent('MouseEvents'); // FF的处理
			        a.initEvent('click', true, true);
			        file.dispatchEvent(a);
			    }
	      	},
	      	fileUpload:function(e) {
	      		this.imgFlag=true;
	            var file = e.target.files[0];
	            var reader = new FileReader();
	            if (file.type.indexOf('jpeg') !== -1 || file.type.indexOf('png') !== -1) {
	                reader.readAsDataURL(file);
	                reader.onload = () => {
	                    this.Imgbase64 = URL.createObjectURL(file);
	                    $('#cropper-img').cropper('reset').cropper('replace', this.Imgbase64);
	                    this.$refs.file.value = null;
	                };
	            } else {
//	                var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
//	                Utils.setMessage(true, '只支持jpg与png格式');
	                this.$refs.alert.setMessage(true,'只支持jpg与png格式',function(){
	                	
	                })
	            }
	        },
//	      	// 图片上传 end
	      	setInfoFlag: function(v) {
	      		this.infoFlag = false;
	      	},
	      	submitInfoFlag: function(v) {
	      		var _data = {};
	      		_data.userName = this.userName;
	      		_data.birthday = this.userInfoList.birthday;
	      		if (this.userInfoList.sex === '男生') {
	      			_data.sex = 2;
	      		} else {
	      			_data.sex = 1;
	      		}
	      		// _data.Information = this.userInfoList.information;
	      		SZXJ.http(this,'post', PathList.updateUser, _data, (response) => {
		            if (response.data.msg === 'success') {
		            	this.infoFlag = true;
		            	this.getBookListFn();
		            }
		        });
	      	},
	      	setInputFlag: function(v) {
	      		if (this.inputFlag) {
	      			this.setInformation();      			
	      		} else {
	      			this.inputFlag = true;
	      		}
	      	},
	      	setInformation: function(v) {
	      		var _data = {};
	      		if(this.userInfoList.information) {
	      		    _data.information = this.userInfoList.information;  
	      		} else {
	      		    this.inputFlag = false;
	      		    return;
	      		}
	      		SZXJ.http(this,'post', PathList.updateUser, _data, (response) => {
		          	if (response.data.msg === 'success') {
		            	this.inputFlag = false;
		            	this.getBookListFn();
		            }
		        });
	      	},
	      	setShowFlagFn: function(v) {
				this.showFlag = v;
			},
	        getBookListFn: function() {
	            var _data = {};
	         
		        SZXJ.http(this,'get', PathList.queryUser, {}, (response) => {   ///获取个人信息
		            this.sex= response.data.sex;
		          	this.userInfoList = response.data;
		          	this.userName = this.userInfoList.userName;
		          	this.loginImg = 'background-image: url('+ PathList.ImageBookPath + this.userInfoList.userHead +')';
		        });
	        
		        SZXJ.http(this,'get', PathList.myCareOrCareMe, this.RequestObj, (response) => {  //获取关注我的 和 我的关注  0表示我关注的人，status 1表示关注我的人  pageNo 当前页码数 pageSize 每页显示的数据量
		            this.attention = response.data.attention;
		        });
	            
		        SZXJ.http(this,'get', PathList.myCareOrCareMe, this.RequestObjTow, (response) => {
		            this.attentionTow = response.data.attention;
		        });
	        },
	        ///切换
	        tapFalse:function(){
	        	this.infoBoolean=false;
	        	this.getGeetestFn();
	        },
	        tapTrue:function(){
	        	this.infoBoolean=true;
	        },
	        //修改密码
	        submitFn: function() {
	            var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
	            var _data = {};
		        if (this.passWord === '' || this.passWord.length < 6) {
		            this.$refs.alert.setMessage(true,'新密码不允许为空并且长度大于6位',function(){});
		            return;
		        }
		        if (this.passWordConfirm === '' || this.passWordConfirm.length < 6) {
		            this.$refs.alert.setMessage(true,'确认新密码不允许为空并且长度大于6位',function(){});
		            return;
		        }
		        if (this.telephoneCode === '') {
		            this.$refs.alert.setMessage(true,'手机验证码不允许为空',function(){});
		            return;
		        }
	            _data.uuid = this.uuid;
	            _data.passWord = this.passWord;
	            _data.passWordConfirm = this.passWordConfirm;
	            _data.telephoneCode = this.telephoneCode;
		        SZXJ.http(this,'post', PathList.updatePassword, _data, (data) => {    //更改密码
		            this.$refs.alert.setMessage(false,data.data.msg,function(){});
		        });
	        },
	        verificationTimeFn: function() {
		        if (this.verifyNumber === 0) {
		            this.verifyNumber= 60;
		            this.verifyFlag = true;
		            return;
		        } else {
		        	--this.verifyNumber;
//		            this.$set('verifyNumber', --this.verifyNumber)
		            var This = this;
		            setTimeout(function(){
		                This.verificationTimeFn();
		            }, 1000);
		        }
	        },
	        getGeetestFn : function () { // 获取就极验验证码
		        SZXJ.http(this,'get', PathList.StartCaptchaServlet, {}, (data) => {
		        	var res = JSON.parse(data.data);
		            // 使用initGeetest接口
		            // 参数1：配置参数
		            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
		            window.initGeetest({
		               gt: res.gt,
		               challenge: res.challenge,
		               product: "popup",
		               // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
		               offline: !res.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
		            },
		            this.handlerPopup);
		        });
	        },
	        //发送验证码
	        showCaptchaObj() {
	            this.captchaObj.show();
	        },
	        handlerPopup: function(captchaObj) {
		        this.captchaObj = captchaObj;
		        var This = this;
		        captchaObj.onReady(function() {
			        captchaObj.onSuccess(function() {
			            var validate = captchaObj.getValidate();
			            var userEntity = {};
	                    userEntity.geetest_challenge = validate.geetest_challenge;
		                userEntity.geetest_validate = validate.geetest_validate;
		                userEntity.geetest_seccode = validate.geetest_seccode;
		                SZXJ.http(This,'post', PathList.updatePasswordTelephoneCode, userEntity, (data) => {
			                This.uuid =  data.data.updateVariId;
			                This.verifyFlag = false;
			                This.verificationTimeFn();
			                // 60秒倒计时
		                },(err) => {
			                if (err.code === 1002) {
			                   This.getGeetestFn();
			                }
		                });
		            })
		        });
	            // 将验证码加到id为captcha的元素里
	            captchaObj.appendTo("#popup-captcha");
	            // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
	        },
	        setShowFlagFn: function(v) {
	  			this.showFlag = v;
	  		},
	        getBookListFn: function() {
	            var _data = {};
		        SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
		            this.booklist=response.data;
		        });
	        },
		},
		head: function(){
			return {
				title: '个人中心-QC轻小说',
		    	meta: [
				    { charset: 'UTF-8' },
				    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
				  	{ name: 'format-detection', content: 'telephone=no' },
				  	{ name: 'apple-touch-fullscreen', content: 'yes' },
				  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
				  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
				  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
				  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
				],
				link: [
			    	{ rel: 'stylesheet', href: '/css/main.css' },
			    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
			    	{ rel: 'stylesheet', href: '/css/user_info.css' },
			    	{ rel: 'stylesheet', href: '/css/Date.css' },
			    	{ rel: 'stylesheet', href: '/css/font-awesome.min.css' },
			    	{ rel: 'stylesheet', href: '../css/cropper.min.css' },
		  		],
		  		script:[
		  		    { type: 'text/javascript', src: '/lib/jquery.min.js'},
		  		    { type: 'text/javascript', src: '/lib/jquery-ui.min.js'},
		  		    { type: 'text/javascript', src: '/lib/jquery.validate.js'},
		  		    { type: 'text/javascript', src: '../lib/cropper.min.js'},
		  		    { type: 'text/javascript', src: '../lib/require.js'},
		  		    { type: 'text/javascript', src: 'https://static.geetest.com/static/tools/gt.js'},
		  		    {src:"/lib/browserRedirect.js"}
		  		]
		  		 
		  	}
	  	}
	}
</script>

<style scoped>
	.cropper-container { margin-left: -116px !important; }
</style>
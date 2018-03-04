// 投稿-第一页 显示作者作品
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
var bookBlockList = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人画集</div></div><div class="user_info_content"><div class="contribution">'
      
      +'<ul class="nav"><li class="active" v-link="{path: \'/imgPaintingList\'}"><span class="circular"></span><span class="title_name">绘画</span></li><li v-link="{path: \'/imgPaintingCreate\'}"><span class="circular"></span><span class="title_name">创建作品</span></li></ul>'
      
      +'<div class="content"><div class="bookBlockList">'
      +'<div class="bookBlockList_title" v-if="!imgIconOneFlag">'+'<span class="hr"></span><span class="title">画作详情</span><span class="titleTwo">light novel</span>'
	      +'<div class="imgIconThree" @click="checkAlbum"><span>提交审核</span></div>'
				+'<div class="imgIconOne" @click="imgIconOneFn"><span>批量操作</span></div>'
				+'<div class="imgIconTwo" @click="gotoHtml"><span>查看详情</span></div>'
			+'</div>'
			+'<div class="bookBlockList_delete" v-else>'
				+'<div class="imgPaintingList_devlete" @click="ajaxDeleteFn">删除</div>'
				+'<div class="imgPaintingList_back" @click="clearFn">返回</div>'
			+'</div>'
      +'<div style="min-height:500px">'
      +'<ul class="list clear">'
      +'<li>'
	      +'<div class="vertical-img-painting">'
		      +'<a v-link="{path: \'/imgPaintingCreate\'}">'
		      	+'<img :src="path.ImagePath + \'/img/90x126.png\'" class="cover"/>'
		      +'</a>'
		    +'</div>'
	      +'<div class="vertical-title"></div>'
      +'</li>'
      +'<li v-for="obj in bookList">'
	      +'<div class="vertical-img-painting" :style=" checkSign == 2 ? \' pointer-events: none;\':\'\' " @click="submitFn" >'
	      
	      +'<div class="imgPaintingShow" v-if="imgIconOneFlag && (checkSign == 0 || checkSign == 3)" @click="deleteFn($index)">'
					+'<div :class="imgIconOneList[$index] ? \'imgPaintingDeleteFlagTrue\' : \'imgPaintingDeleteFlagFalse\'"></div>'
				+'</div>'
	      
	      
	      
		      +'<div class="state_one" v-if=" checkSign == 2 ">审核中</div>'
		      +'<div class="state_tow">连载中</div>'
		      +'<img :src="obj.picturePath + \'&imageView2/1/w/140/h/154/interlace/1/q/100|imageslim\'" class="cover"  v-link="{path: \'/imgPaintingUpdate/\' + obj.pictureId}"  />'
	      +'</div>'
	      +'<div class="vertical-title" :style=" checkSign == 2 ? \' pointer-events: none;\':\'\' " title="{{obj.pictureName}}">{{obj.pictureName}}</div>'
      +'</li>'
      
      +'</ul></div></div>'
      +'</div>'
      +'</div></div></div>'
      ,data: function() {
        return {
	        bookList: [],
	        path: PathList,
	        imgIconOneFlag: false,
	        imgIconOneList: [],
	        albumId: '',
	        checkSign: '',
        };
      }
      ,route: { 
        data() {
        	var href = window.location.href;
        	this.$set('albumId', href.substring(href.lastIndexOf('/') + 1, href.length));
          // 列表页面的默认方法 一进入页面后立刻请执行此方法
          this.getBookListFn();
        } 
      }
      ,methods: {
      	gotoHtml:function(){
      		var hostname = location.hostname.toString().indexOf('http://') == -1 ? 'http://' + location.hostname : location.hostname;
      		if (location.port == 80) {
      			
      		} else {
      			hostname += ':'+location.port;
      		}
      		window.open(hostname + '/painter/worksDetails.html?id=' + this.albumId);
      	},
        submitFn:function(){          
        },
       	checkAlbum:function(){
       		
       		var This = this;
          this.$parent.$refs.vueConfirm.setConfirm('是否申请审核',function(){
            SZXJ.http(this,'get', PathList.checkAlbum, { albumId:This.albumId }, (response) => { 
          		history.back();
          	});
          });
       		
       		
        	SZXJ.http(this,'get', PathList.checkAlbum, _data, (response) => { 
          	history.back();
          });
        },
        imgIconOneFn:function(){
        	if (this.imgIconOneFlag){
        		this.imgIconOneFlag = false;
        	} else {
        		this.imgIconOneFlag = true;
        	}
        },
        deleteFn:function(index){
        	var arr = this.imgIconOneList;
        	if (arr[index]) {
        		arr[index] = false;
        	} else {
        		arr[index] = true;
        	}
        	this.$set('imgIconOneList', []);
        	this.$set('imgIconOneList', arr);
        },
        clearFn:function(){
        	var arr = this.imgIconOneList;
        	for (var i = 0; i < arr.length;i++) {
        		arr[i] = false;
        	}
        	this.$set('imgIconOneFlag', false);
        	this.$set('imgIconOneList', []);
        	this.$set('imgIconOneList', arr);
        },
        ajaxDeleteFn: function(){
        	var arr = [];
        	for (var i = 0; i < this.imgIconOneList.length;i++) {
        		if (this.imgIconOneList[i]) {
        			arr.push(this.bookList[i].pictureId);
        		}
        	}
        	if (arr.length == 0) {
        		var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
	          Utils.setMessage(true, '请选择要删除的内容');
		        return;
        	}
        	var _data = {};
        	_data.pictureIds = arr.join(',');
          SZXJ.http(this,'get', PathList.removePictures, _data, (response) => { 
          	this.clearFn();
            this.getBookListFn();
          });
        },
        getBookListFn: function() {
          var _data = {};
          SZXJ.http(this,'get', PathList.albumDetail, { "albumId": this.albumId }, (response) => { 
            this.$set('bookList', response.data.data.pictureList);
            this.$set("checkSign", response.data.data.album.checkSign);
            this.imgIconOneList.length = this.bookList.length;
          });
        },
      },
   });
export default bookBlockList;      
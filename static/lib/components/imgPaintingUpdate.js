// 投稿-第二页 修改作品
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';


var imgPaintingCreate = Vue.extend({
      template: 
	
	'<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人绘画</div></div><div class="user_info_content"><div class="contribution"><ul class="nav"><li v-link="{path: \'/imgPaintingList\'}"><span class="circular"></span><span class="title_name">绘画</span></li><li class="active v-link-active"><span class="circular"></span><span class="title_name">修改作品</span></li></ul><div class="content"><div class="works" style="height: 830px;"><div class="works_title"><ul><li class="works_sign" class="active" v-link="{path: \'/imgPaintingCreate\'}"></li><li>修改作品</li><li class="works_sont">create a work</li></ul></div><div class="works_line"></div><div class="painterUpload"><div style="width: 580px;margin-left: 40px;">'
	
	
	+'<div class="painterLine"><span style="display: inline-block;text-indent: 2em;">标题：</span><input v-model="albumList.pictureName" class="inputText" type="text" placeholder="64字符以内" /></div>'
	+'<div class="painterLine"><div><span style="display: inline-block;text-indent: 2em;">类型：</span>'
	+'<span class="selectActive" v-if="albumList.classType == \'\'">选择</span>'
	+'<span class="selectActiveY" v-else>{{albumList.className}}</span>'
	+'</div>'
	+'<div style="padding-left: 5em;margin-top: 15px;">---推荐标签---</div>'
	
	+'<ul style="margin-left: 5em;overflow: hidden;width: 445px;">'
		+'<li v-for="obj in classTypeList" class="Imgtype" @click="setClassType(obj.pId,obj.typeName)">{{obj.typeName}}</li>'
	+'</ul></div>'
	+'<div class="painterLine"><div><span style="display: inline-block;text-indent: 2em;">风格：</span>'
	+'<span class="selectActive" v-if="albumList.styleType == \'\'">选择</span>'
	+'<span class="selectActiveY" v-else>{{albumList.styleName}}</span>'
	
	+'</div><div style="padding-left: 5em;margin-top: 15px;">---推荐标签---</div>'
	
	+'<ul style="margin-left: 5em;overflow: hidden;width: 445px;">'
		+'<li v-for="obj in styleTypeList" class="Imgtype" @click="setStyleType(obj.pId,obj.typeName)">{{obj.typeName}}</li>'
	+'</ul></div>'
	
	+'<div class="painterLine"><span>设为封面：</span><div style="display: inline-block;position: relative;top: 3px;">'
	+'<div class="works_img2" v-if="albumList.isCover != 1" @click="setIsCover(1)"></div>'
	+'<div class="works_img" v-else  @click="setIsCover(0)"></div>'
	
	+'</div></div><div class="painterLine"><span style="display: inline-block;text-indent: 2em;vertical-align: top;">简介：</span><textarea v-model="albumList.pictureDescription" placeholder="0/300字" style="border-color: #d7d7d7;margin-left: 20px;width: 302px;height: 206px;resize: none;"></textarea></div><div class="btn works_Deposit" @click="submitFn">保存</div></div>'
	+'<div style="height: 273px;width: 220px;position: absolute;right: 40px;top: 32px;display: table;">'
	+'<div style="height: 239px;text-align: center;border: 1px solid #ebebeb;border-radius: 3px;display: table-cell;vertical-align: middle;box-sizing: border-box;">'
	+'<img v-if="imgBase64 != \'\'" :src="imgBase64 + \'&imageView2/1/w/220/h/240/interlace/1/q/100|imageslim\'" style="width:100%;height:100%"/>'
	+'<img v-else src="data:image/png;base64,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" /></div><div style="display: table-footer-group;height: 33px;line-height: 33px;text-align: center;color: #333333;">图片详情</div></div>'
	
	+'<div v-show="paintingList.show" style="display:none;position: fixed;top: 0;left: 0;bottom: 0;right: 0;background-color: rgba(0,0,0,0.5);z-index: 99999999;">'
	+'<div style="z-index: 999999;box-sizing: border-box;position: absolute;top: 50%;left: 50%;width: 453px;height: 340px;">'
	+'<div style="margin: 0 auto;position: relative;width: 100%;height: 100%;top: -50%;left: -50%;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);background-color: #FFFFFF;border-radius: 4px;"><div style="color: #7e7e7e;font-size: 16px;position: absolute;top: 22px;left: 19px">创建画集</div><img @click="hidePaintingList" style="cursor: pointer;display: block;width: 20px;height: 20px;position: absolute;top: 13px;right: 22px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQ2NTZCNUY4MUJBMTFFNzlDMUM4MEI1QUFGQUVDQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ2NTZCNjA4MUJBMTFFNzlDMUM4MEI1QUFGQUVDQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNDY1NkI1RDgxQkExMUU3OUMxQzgwQjVBQUZBRUNBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNDY1NkI1RTgxQkExMUU3OUMxQzgwQjVBQUZBRUNBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psq/r+gAAAPsSURBVHja7FrhddowEDa8/o9H8AZxJsCwAO4ENRMEJghMgDsBMEHIAoFMUDJByQZ0AnrXfm4PVZIlWyYv71Xv6QGOfb7v7vTd6ZTe+XyOPvLoRx98fJI/er1eEKHPz88DfI1JZkpe3kP+23A4PIZ4RxU5PRlCTQHsdruUPr7QzGimDo9saTKop6aAWgMgpWP6uKc5ZUu3MCYDWRCQ/dUAkPJs7TnNRBH6g2SwddmqJ5qHKpQqz9A9Gd0zaAukEQBSnBV+lGECpdf0dU0vP3h4L8ccK38uSc4sOADE+a4KFyhe4oWnpvFDcjOSNVe8wl74bJPrBYBeUtDHSjz8QvcWoRhFANmS3BtcYm9OTF51BqAqT+MrCZ12wekcogBxi0tsoDudJyq9+w70uBSXJl0pz4M9SsozFT/hUrXm/DMxFtqjoMgZvWDddWaFtQuy8CsuZaTLqkkpsRI0uSHB5bXKAwZBnsiZKHCp4DXiDAA354i1VySrqw4RTtVY+njgQSzsaRuabAmCGWiDnykIxQ4A1s8quvRN8R2Muc6wNg8Uwvpzn4IOmdqpWgVJOIWS8EKirgUdgDGs/+ZqfRLKa+Qbze86Nyv3rsgwe9ybONpHEkhuBADej2H9rUdlKIWuTCBAh4Uo8HLXtSAYaWDzQK7U7E4DxVxkA6EoH0Ehn3dsxWJOtAC41BWo9x5swQAmJhA65ZkiPWspqU9ipVHhrigAiJ1B+YPnK461AJRKMAoEIgugvDqMHkhbCjaBCKH84ZptlYFmEd60NFBcC4Azb4Ca/mLB1rFTk7Cp9YBh0+2tPMhgERDEP+GkLuKTsh9opTxifm6jWI8hw+9k8sBexx4Oypc2qrRQbOIBIKv1gJIZc1fJpHBaxzYGELkHgLGokPUe4MzIRZx8wDHNl6w4P2ujSgkCG6W1o4dzTUmh70ogHO7FJr7zfbADgJ0IoTsUd0YWKm0biHdQXt1gHaw0qtlAFO+M4cG2wTJl4rko6JaebBHS+oUInSddhdy3dARKkcIfffNCoNCR/aCpVy3ECUiUFqmprdGR8mpHbmLaO/Rr6DEXtFrYOmQBlb/ogke/e7FGJnRp7v4641L2CsMuekXg+1X0t4X/MhqNMkPydCunmbY4OQlPpOgo5AEVj2k+RJe92A1HQG0S9TjgiOGJW6V2WjRtflnO2WZ1vdjGZ2RKppbF1RZUd6hTmt45gHVzqTjqKD44qe1WtD3kS5Cxx4bN91GpbmNRDmeG7abXcVWQc2Jw9RQnjze+IYTibx01OGcLetAtGCRDaZ3qAIEIjqgot23O2P7ozV+q2QEtxuD14KPSuff/v1XeefwUYABYG6P4+Pc8TAAAAABJRU5ErkJggg==" />'
	+'<div style="color: #7e7e7e;font-size: 13px;position: absolute;top: 73px;left: 40px;">画集名称：</div><input v-model="paintingList.albumName" class="InputText_Name" style="position: absolute;top: 65px;left: 130px;padding: 0 10px;height: 30px;width: 252px;background-color: #e9e9e9;border: 0;border-radius: 3px;" type="text" />'
	+'<div style="color: #7e7e7e;font-size: 13px;position: absolute;top: 117px;left: 40px;">画集简介：</div><textarea v-model="paintingList.description" placeholder="0/150字" style="position: absolute;top: 117px;left: 130px;padding: 2px 5px;resize: none;width: 252px;height: 150px;border: 1px solid #3fcbe4;border-radius: 3px;"></textarea>'
	+'<input class="btn" style="position: absolute;bottom: 20px;left: 151.5px;background-color: #56d2f5;width: 150px;height: 30px;border: 0;border-radius: 3px;color: #FFFFFF;" type="button" @click="addPaintingList" value="确定" /></div></div></div></div></div></div></div></div></div>'
      
  ,data: function() {
    return {
      	paintingList: { // 画集
      		albumName: '',
      		description:'',
      		show: false,
      	}, 
      	albumList: {
      		albumId: '',
      		albumIdName: '',
      		pictureName: '',
      		picturePath: '',
      		styleType: '',
      		styleName: '',
      		classType: '',
      		className: '',
      		isCover: 0,
      		pictureDescription: '',
      	},
      	classTypeList: [],
      	styleTypeList: [],
      	paintingArrayList: [],
      	imgBase64: '',
        path: PathList,
      }
    },
  ready: function() {
    // 3个请求，两个类型，一个下拉获取画集
 		 	SZXJ.http(this,'get', PathList.listAlbumForUploadPicture, {}, (response) => {
      	this.$set("paintingArrayList", response.data.data);
    	});
      SZXJ.http(this,'get', PathList.typeList, { typeType: 1 }, (response) => {
      	this.$set("classTypeList", response.data.data);
    	});
     	SZXJ.http(this,'get', PathList.typeList, { typeType: 2 }, (response) => { 
     		this.$set("styleTypeList", response.data.data);
    	});
    	var albumId = location.href.toString();
    	albumId = albumId.substr(albumId.lastIndexOf('/'), albumId.length);
    	SZXJ.http(this,'get', PathList.getPictureDetail, { pictureId: albumId }, (response) => { 
     		this.$set("albumList", response.data.data);
     		this.$set('imgBase64', response.data.data.picturePath);
    	});
    	this.albumList.albumId = albumId;
    },
  methods: {
      setStyleType:function(styleType,Name){
      	var obj = this.albumList;
      	obj.styleType = styleType;
      	obj.styleName = Name;
      	this.$set("albumList", obj);
      },
      setClassType:function(classType,Name){
      	var obj = this.albumList;
      	obj.classType = classType;
      	obj.className = Name;
      	this.$set("albumList", obj);
      },
      setAlbumId:function(o){
      	 var obj = this.albumList;
      	 obj.albumId = o.albumId;
      	 obj.albumIdName = o.albumName;
      	 this.$set("albumList", obj);
      },
      addImgPainting:function(){
			},
      showPaintingList:function(){
      	var obj = this.paintingList;
      	obj.show = true;
      	this.$set('paintingList', obj);
      },
      hidePaintingList:function(){
      	var obj = this.paintingList;
      	obj.show = false;
      	this.$set('paintingList', obj);
      },
      addPaintingList:function(){
      	var obj = this.paintingList;
      	if (!obj.albumName) {
      		obj.show = false;
	      	obj.albumName = '';
	      	obj.description = '';
	      	this.$set('paintingList', obj);
      		var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
	        Utils.setMessage(true, '画集名称不能为空');
      		return;
      	}
      	SZXJ.http(this,'get', PathList.createAlbum, this.paintingList, (response) => { 
     			SZXJ.http(this,'get', PathList.listAlbumForUploadPicture, {}, (res) => {
      			this.$set("paintingArrayList", res.data.data);
    			});
    		});
      	obj.show = false;
      	obj.albumName = '';
      	obj.description = '';
      	this.$set('paintingList', obj);
      },
      setIsCover:function(cover){
      	var obj = this.albumList;
      	obj.isCover = cover;
      	this.$set("albumList", obj);
      },
      submitFn: function() {
      	
      	if (!this.albumList.pictureName) {
      		var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
	        Utils.setMessage(true, '请输入标题');
      		return;
      	}
       	
       	if (!this.albumList.styleType) {
      		var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
	        Utils.setMessage(true, '请选择风格');
      		return;
      	}
       	
      	if (!this.albumList.classType) {
      		var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
	        Utils.setMessage(true, '请选择类型');
      		return;
      	}
      	
      	var oData = new FormData();
      	
      	oData.append("pictureId", this.albumList.albumId); 
      	oData.append("pictureName", this.albumList.pictureName);
      	// oData.append("picturePath", this.albumList.picturePath);
      	oData.append("styleType", this.albumList.styleType);
      	oData.append("classType", this.albumList.classType);
      	oData.append("pictureDescription", this.albumList.pictureDescription);
      	oData.append("isCover", this.albumList.isCover);

      	
      	
      	SZXJ.http(this,'post', PathList.updatePictureDetail, oData, (response) => { 
      		var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
	        Utils.setMessage(false, '修改画作成功');
     			history.back();
    		});
      	
      	
      	
      },
  },
  });
export default imgPaintingCreate; 
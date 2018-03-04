// // 投稿-第三页 显示作者作品目录页
import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';
//import VueAlert from '../../lib/apis/alert.js';
//import VueConfirm from '../../lib/apis/confirm.js';
   var catalogue = Vue.extend({
      template: 
      '<div class="user_info_right"><div class="user_info_title"><div class="titleBlock">contribute</div><div class="titleBlock_LG">个人投稿</div></div><div class="user_info_content"><div class="contribution">'
      +'<ul class="nav"><li v-link="{path: \'/bookBlockList\'}"><span class="circular"></span><span class="title_name">轻小说</span></li><li v-if="showFlag === 999"><span class="circular"></span><span class="title_name">画集</span></li><li v-link="{path: \'/works_update/\' + id}"><span class="circular"></span><span class="title_name">修改信息</span></li></ul>'
      +'<div class="content"><div class="catalogue">'
      +'<div class="catalogue_header"><span>作品目录</span><span>catalogue</span></div>'
      +'<div class="appointment" v-on:click="signingFn" title="签约申请，需要字数至少达到八万字才可提交，\n详细要求请联系编辑。" ><img v-if="bookReviewStatus == \'已审核\' && bookIsSign == \'1\'" :src="path.ImagePath + \'/img/sign_15.png\'" alt="" /><img v-else :src="path.ImagePath + \'/img/sign_015.png\'" alt="" /></div>'
      +'<div class="upup" title="签约等级提升，签约作品才能操作，并且每个月只能申请一次，\n将会在一到五个工作日进行答复。" v-on:click="signingUpFn" v-if="bookReviewStatus == \'已审核\' && bookIsSign == \'1\'"><img :src="path.ImagePath + \'/img/upup.png\'" alt="" /></div>'
      +'<div class="upup" title="签约等级提升，签约作品才能操作，并且每个月只能申请一次，\n将会在一到五个工作日进行答复。" v-else><img :src="path.ImagePath + \'/img/up_01.png\'" alt="" /></div>'
      +'<div class="newBookChapter" v-if="newBookChapter"><div class="clearX" v-on:click="newBookChapterClearFn">x</div><h4 class="newBookTitle">请输入卷的标题</h4><div><input type="text" class="inputText" placeholder="第一卷" v-model="volume" /></div><div class="hr"></div><a href="javascript:;" class="btn-addBookChapter" v-on:click="submitVolumeFn">提交</a></div>'
      +'<div  class="SubmitAudit" v-if="SubmitAudit"><div class="clearX" v-on:click="SubmitAuditClearFn">x</div><h4 class="newBookTitle">提交审核</h4><div><textarea type="text"  class="inputTextTow" placeholder="我想对编辑说(选填)" v-model="SubmitAuditvolume" /></textarea></div><div class="hr"></div><a class="btn-addBookChapter" v-on:click="SetSubmitAudit">提交</a></div>'
     
      +'<div class="newBookChapter" v-if="updateBookChapter"><div class="clearX" v-on:click="updateVolumeFn">x</div><h4 class="newBookTitle">修改卷的标题</h4><div><input type="text" class="inputText" placeholder="修改卷名称" v-model="updateBookChapterName" /></div><div class="hr"></div><a href="javascript:;" class="btn-addBookChapter" v-on:click="updateVolumeNameFn">提交</a></div>'
      
      +'<div class="newBookChapter" v-if="updateBookContentChapter"><div class="clearX" v-on:click="updateContentFnTow">x</div><h4 class="newBookTitle">修改章节的名称</h4><div><input type="text" class="inputText" placeholder="修改章节名称" v-model="updateBookContentChapterName" /></div><div class="hr"></div><a href="javascript:;" class="btn-addBookChapter" v-on:click="updateContentNameFn">提交</a></div>'
      +'<div class="sign-Block" v-if="SigNing" ><div class="sign_parent"><div class="sign_sub"><p class="sign_title">我要签约</p><p class="sign_headers"><span class="sign_sign"></span>姓名</p><input type="text" class="sign_input" v-model="uname" /><p class="sign_headers"><span class="sign_sign"></span>更新方式</p><form class="sign_form"><label class="sign_label" @click="signbuttomFn" ><input name="sign" type="radio" value="" checked="checked"  />日更</label><label class="sign_label"  @click="SubmitsignbuttomFn" ><input name="sign" type="radio" value="" />月更</label><p class="sign_pp" v-if=" updateType==2 ">*在一个月内，更新一次或者更新多次，所更新的字数的总和要至少达到8万字</p><p class="sign_pp" v-if=" updateType==1 ">*一个月内，必须每日更新，每日更新至少更新2000字，一个月更新字数总和达到6万字</p></form><p class="sign_headers"><span class="sign_sign"></span>联系方式</p><div class="sign_div">      QQ&nbsp;:<input type="text" class="sign_contact" v-model="qq" /></div><div class="sign_div">E-meil&nbsp;:<input type="text" class="sign_contact" v-model="email" /></div><div class="sign_div">手机&nbsp;:<input type="text" class="sign_contact" v-model="phone" /></div><div class="sign_div">住址&nbsp;:<input type="text" class="sign_contact" v-model="address" /></div><div style="clear: both;"></div><p class="sign_headers TowHeadrs"><span class="sign_sign"></span>小说大纲</p><textarea type="text" class="sign_Biginput" v-model="message" /></textarea><div class="sign_btn" @click="isTrueOrFalseFn" >提交申请</div><div class="sign_btnTow" @click="SigNingDownFn" >取消</div><img style="display:none;" :src="path.ImagePath + \'/img/logo_11.png\'" class="sign_img" /></div></div></div>'
      +'<div v-if="isTrueOrFalse" class="isTrueOrFalse isTrueOrFalseTow"><div class="isTrueOrFalse_div">提示</div><span class="isTrueOrFalse_span">请注意认真审核信息是否填写正确，签约后平台将会以此信息为标准，联系作者，如需修改，请联系工作人员。 （*注：如此次申请失败，下次申请时，作品需在原基础上提高2万字数方可再次申请提交）。</span> <div class="moneyRecharge_div isTrueOrFalseDiv"  @click="SigNingUpFn" >确认</div>  <div class="moneyRecharge_div isTrueOrFalseDiv" @click="SubmitisTrueOrFalseFn" >取消</div> </div>'

      +'<div style="min-height:400px;"><div class="content_bookTitle"><a :href="path.TemprootPath + \'/view/catalog.html?bookId=\' + bookCustom.bookId"><span><b>{{bookCustom.bookName}}</b>&nbsp;&nbsp;<span style="font-size:14px;">Lv.{{signLevel}}</span></span></a>'
      +'</div>'
      +'<div class="catalogue_list" v-for="obj in volumeCustomList"><div class="list_title"><h4 class="listBlock">{{obj.volumeName}}<span style="font-size:12px; padding-left:5px; font-weight:normal;  ">({{obj.volumeWordCount}})</span></h4>'
      +'<div class="list_action">'
      +'<a v-if="$index !== 0" @click="volumeChange(volumeCustomList[$index - 1].volumeId, volumeCustomList[$index].volumeId)" href="javascript:;">前移</a>'
      +'<a v-else style="color:#cccccc;cursor: not-allowed;" href="javascript:;">前移</a>'
      +'<a v-if="$index !== volumeCustomList.length - 1" @click="volumeChange(volumeCustomList[$index].volumeId, volumeCustomList[$index + 1].volumeId)" href="javascript:;">后移</a>'
      +'<a v-else style="color:#cccccc;cursor: not-allowed;" href="javascript:;">后移</a>'
      +'<a href="javascript:;" @click="volumeDelete(volumeCustomList[$index].volumeId)">删除</a>'
      +'<a href="javascript:;" @click="updateVolumeFn(volumeCustomList[$index].volumeId)">重命名</a>'
      +'</div></div>'
      +'<div class="create_chapter"><div class="chapter_header clear"><div class="line" v-for="bookObj in obj.contentEntityList"> <div class="lineIcon"><img :src="path.ImagePath + \'/img/chapter_icon.jpg\'" /> <div class="handle_left">'
      +'<p @click="contentChange(obj.contentEntityList[$index - 1].contentId, obj.contentEntityList[$index].contentId)" v-if="$index !==0"><img :src="path.ImagePath + \'/img/to_right.jpg\'" /> 章节前移</p>'
      +'<p v-else style="color:#cccccc;cursor: not-allowed;"><img :src="path.ImagePath + \'/img/to_right.jpg\'" /> 章节前移</p>'
      +'<p @click="contentChange(obj.contentEntityList[$index].contentId, obj.contentEntityList[$index + 1].contentId)"  v-if="$index !== obj.contentEntityList.length - 1"><img :src="path.ImagePath + \'/img/to_right.jpg\'" /> 章节后移</p>'
      +'<p v-else style="color:#cccccc;cursor: not-allowed;"><img :src="path.ImagePath + \'/img/to_right.jpg\'" /> 章节后移</p>'
      +'<p @click="contentDelete(bookObj.contentId)"><img :src="path.ImagePath + \'/img/to_right.jpg\'"/> 删除章节</p>'
      +'<p @click="updateContentFn(bookObj.contentId,bookObj.volumeId)"><img :src="path.ImagePath + /img/to_right.jpg\'" /> 重命名</p>'
      +'</div></div><span class="span" uid="{{bookObj.volumeId}}"  uid2="{{bookObj.contentId}}" v-link="{path: \'/chapter_edit/\' + bookObj.volumeId + \'_\' +  bookObj.contentId }">{{bookObj.contentTitle}}</span></div><div class="line"><div class="lineIcon"><img :src="path.ImagePath + \'/img/create_icon.jpg\'" />              </div>              <span class="span" uid="{{obj.volumeId}}" v-link="{ path: \'/chapter/\' + obj.volumeId }">创建新章节</span></div></div></div></div></div><div class="chapter_handle"><div class="handle_right"><div><span  v-on:click="newBookChapterFn">新增卷</span>'
      +'<span v-if="bookReviewStatus == \'未审核\'"   v-on:click="SubmitAuditFn">提交审核</span>'
      +'<a :href="path.TemprootPath + \'/view/user_info.html#!/bookBlockList\'"><span>返回</span></a>'
      +'</div></div></div></div></div>'
      +'</div></div></div>'	
    ,data: function() {
        return {
        isTrueOrFalse:false,
        volumeCustomList: [],
        newBookChapter:false,
        SubmitAudit:false,
        SigNing:false,
        updateBookChapter:false,
        updateBookChapterId: '',
        updateBookChapterName: '',
        SubmitAuditvolume:'',
        //
        updateBookContentChapter: false,
        updateBookContentChapterId: '',
        updateBookContentChapterVolumeId: '',
        updateBookContentChapterName: '',
        //
        id:'',
        volume: '',
        status:1,
        userId:'',
        path: PathList,
        
        updateType:1,
        uname:'',
        qq:'',
        email:'',
        phone:'',
        address:'',
        message:'',
        bookReviewStatus:'',
        code:'',
        bookIsSign:'',
        signLevel:0,
        };
      }
    ,route: {
      data() {
        var href = window.location.href;
        this.id = href.substring(href.lastIndexOf('/') + 1, href.length);
        this.getBookListFn();
      } 
    }
      ,methods: {
        contentChange(contentUpId, contentDownId) {
          var _data = {};
          _data.contentUpId = contentUpId;
          _data.contentDownId = contentDownId;
          SZXJ.http(this,'get', PathList.contentChange, _data, 
          (response) => {
            this.getBookListFn();
          });
        },
        contentDelete(contentId) {
          var This = this;
          this.$parent.$refs.vueConfirm.setConfirm('是否删除此章节',function(){
            var _data = {};
            _data.contentId = contentId;
            SZXJ.http(this,'get', PathList.removeContent, _data, 
            (response) => {
              This.getBookListFn();
            });
          });
        },
        updateContentFn(volumeId, updateBookContentChapterVolumeId) {
          if (this.updateBookChapter) {
            this.$set('updateBookContentChapter', false);
            this.$set('updateBookContentChapterId', '');
            this.$set('updateBookContentChapterName', '');
            this.$set('updateBookContentChapterVolumeId', '');
          } else {
            this.$set('updateBookContentChapter', true);
            this.$set('updateBookContentChapterId', volumeId);
            this.$set('updateBookContentChapterVolumeId', updateBookContentChapterVolumeId);
          }
        },
        updateContentFnTow:function(){
          this.$set('updateBookContentChapter', false);
        },
        updateContentNameFn() {
          var _data = {
            contentTitle: this.updateBookContentChapterName, // 标题
            contentId: this.updateBookContentChapterId, // 卷 id
          };
          SZXJ.http(this,'post', PathList.saveOrUpdateContent, _data, 
            (response) => {
              this.$set('updateBookContentChapter', false);
              this.$set('updateBookContentChapterId', '');
              this.$set('updateBookContentChapterVolumeId', '');
              this.$set('updateBookContentChapterName', '');
              this.getBookListFn();
            });
        },
        volumeChange(volumeUpId, volumeDownId) {
          var _data = {};
          _data.volumeUpId = volumeUpId;
          _data.volumeDownId = volumeDownId;
          SZXJ.http(this,'get', PathList.volumeChange, _data, (response) => {
            this.getBookListFn();
          });
        },
        volumeDelete(volumeId) {
          var This = this;
          this.$parent.$refs.vueConfirm.setConfirm('是否删除卷',function(){        
            var _data ={};
            _data.volumeId = volumeId;
            SZXJ.http(this,'get', PathList.removeVolume, _data, (response) => {
              This.getBookListFn();
            });
          });
        },
        updateVolumeFn(volumeId) {
          if (this.updateBookChapter) {
            this.$set('updateBookChapter', false);
            this.$set('updateBookChapterId', '');
            this.$set('updateBookChapterName', '');
          } else {
            this.$set('updateBookChapter', true);
            this.$set('updateBookChapterId', volumeId);
          }
        },
        signbuttomFn(){
          this.$set('updateType', 1);
        },
        SubmitsignbuttomFn(){
          this.$set('updateType', 2);
        },
        signingFn(){
          if(this.bookIsSign == '1'){
              var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
              Utils.setMessage(true , '您已签约，请勿重复提交');
              return;
            } else{
              if(this.bookReviewStatus == '已审核'){
                if(this.bookIsSign !== '1'){
                  this.$set('SigNing', true);
                } else{
                  this.$set('SigNing', false);
                  if(this.bookIsSign == '2' && this.bookReviewStatus == '已下架'){
                    var _data = {};
                  _data.bookId = parseInt(this.id, 10);
                  SZXJ.http(this,'post', PathList.userRegainBookSign, _data, (response) => {
                  });
                  }
                }
              }
            }
         },
        signingUpFn(){
          if (this.signLevel == 1) {
            var This = this;
            var Utils = This.$refs.vueAlert ? This.$refs.vueAlert : This.$parent.$refs.vueAlert;
            this.$parent.$refs.vueConfirm.setConfirm('是否申请签约等级提升',function(Utils){
              var _data = {};
              _data.bookId = parseInt(This.id, 10);
              SZXJ.http(this,'get', PathList.userSignLevelUp, _data, (response) => {
                console.log(response.data.code);
                if(response.data.code == 200){
                  Utils.setMessage(false, '提交成功');
                  return;
                }
              });
            });
          }
        },
        SigNingDownFn(){
          this.$set('SigNing', false);
        },
        SigNingUpFn(){
          this.$set('SigNing', false);
          this.$set('isTrueOrFalse', false);
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          _data.uname = this.uname;
          _data.updateType = this.updateType;
          _data.qq = this.qq;
          _data.email = this.email;
          _data.phone = this.phone;
          _data.address = this.address;
          _data.message = this.message;
          SZXJ.http(this,'post', PathList.userUpdateBookSign, _data, (response) => {
              if(response.data.code == 200){
              var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(false, '申请成功');
                      window.location.href = PathList.TemprootPath + '/view/user_info.html#!/bookBlockList'; 
                      return;
            }  
          });
        },
        isTrueOrFalseFn:function(){
          var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
          var _data = {};
          if (this.uname === '' ) {
            Utils.setMessage(true, '填选项不允许为空');
          } else if( this.qq === '' ){
            Utils.setMessage(true, 'qq号不允许为空');
          }else if( this.email === '' ){
            Utils.setMessage(true, '邮箱不允许为空');
          }else if( this.address === '' ){
            Utils.setMessage(true, '地址不允许为空');
          }else if( this.phone === '' ){
            Utils.setMessage(true, '电话不允许为空');
          }else{
            this.$set('isTrueOrFalse', true);
          } 
       },
       SubmitisTrueOrFalseFn:function(){
         this.$set('isTrueOrFalse', false);
       },
        updateVolumeNameFn() {
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          _data.volumeName = this.updateBookChapterName;
          _data.volumeId = this.updateBookChapterId;
          SZXJ.http(this,'get', PathList.saveOrUpdateVolume, _data, 
            (response) => {
              this.$set('updateBookChapter', false);
              this.$set('updateBookChapterId', '');
              this.$set('updateBookChapterName', '');
              this.getBookListFn();
            });
        },
        getBookListFn: function() {
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          SZXJ.http(this,'get', PathList.queryBook, _data, 
          (response) => {
          	console.log(response);
          	this.signLevel = response.data.bookCustom.signLevel;
          	this.bookIsSign = response.data.bookCustom.bookIsSign;
          	this.bookReviewStatus = response.data.bookCustom.bookReviewStatus;
          	this.$set('bookCustom', response.data.bookCustom);
            this.$set('volumeCustomList', response.data.bookCustom.volumeCustomList);
          });
        },
        newBookChapterFn: function() {
          this.$set('newBookChapter', true);
        },
         SubmitAuditFn: function() {
          this.$set('SubmitAudit', true);
        },
        
        newBookChapterClearFn: function() {
          this.$set('newBookChapter', false);
        },
        SubmitAuditClearFn: function() {
          this.$set('SubmitAudit', false);
          
        },
        submitVolumeFn: function() {
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          _data.volumeName = this.volume;
          _data.volumeId = '';
          SZXJ.http(this,'get', PathList.saveOrUpdateVolume, _data, 
            (response) => {
              this.$set('newBookChapter', false);
              this.volume = '';
              this.getBookListFn();
            });
        },
        SetSubmitAudit: function() {
          var _data = {};
          _data.bookId = parseInt(this.id, 10);
          _data.message = this.SubmitAuditvolume;
          SZXJ.http(this,'post', PathList.userUpdateBookStatus, _data, (response) => {
              this.$set('SubmitAudit', false);             
              this.getBookListFn();
              if(response.data.code != '200' ){
                 var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
                      Utils.setMessage(true, '提交失败');
                      return;
                  }else{
                    window.location.href = PathList.TemprootPath + '/view/user_info.html#!/bookBlockList';
                  }
            });
        },
      }
   });
export default catalogue;   
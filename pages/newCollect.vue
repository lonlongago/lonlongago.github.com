<template>
    <div class="collectArticle"  v-show="bodyFlag" style="display: none;background: url('/img/collect/background.jpg') no-repeat center bottom; background-size: 100% auto;">
        <link rel="stylesheet" href="../css/wangEditor.min.css" />
        <script src="../lib/jquery.min.js"></script>
        <script src="../lib/wangEditor.min.js"></script>
        <alert ref="alert"></alert>
        <myHeader></myHeader>
        <!--<div class="wrap" :style="pageFlag ? visibility: '': 'hidden';" >-->
         
        <div class="wrap" >
            <div style="position: relative;">
                <img class="header" :src="path.ImagePath + '/img/collect/head.jpg'"/>
                <div style="position: absolute; width: 9.0625%; height: 34.5926%; top: 58.5957%; left: 35.2083%;" @click="moveLogin"></div>
            </div>
            <!--<img class="reward" :src= "path.ImagePath  + '/img/collect/content.jpg'" style="margin-top: -2px; margin-bottom: 0;"/>
            <img class="time" :src= "path.ImagePath  + '/img/collect/time.jpg'" style="margin-top: -2px;"/>
            <img class="timeline" :src= "path.ImagePath  + '/img/collect/timeLine.jpg'" style="margin-top: -2px; margin-bottom: 0;"/>-->
            <img class="reward" src="/img/collect/contop.jpg" style="margin-top: -2px; margin-bottom: 0;"/>
            <img class="time" src="/img/collect/condy.jpg" style="margin-top: -2px;"/>
            <img class="timeline" src="/img/collect/constart.jpg" style="margin-top: -2px; margin-bottom: 0;"/>
            <div class="article">
                <div style="position: relative;">
                  <img :src="path.ImagePath  + '/img/collect/long.jpg'" style="margin-top: -2px;"/>
                  <a class="change" href="javascript:;" @click="getBook" style="position: absolute; top: 50%;">
                        <img :src="path.ImagePath + '/img/collect/change.png'"/>
                        <p>换一批作品</p>
                    </a>
                </div>
                <ul class="articleList" style="padding: 2% 0;">
                    <li v-for="book in bookList" style="float: left; width: 25%; text-align: center; margin: 7% 0;">
                        <a :title="book.bookName" :href="book.bookId ? '/catalog/' + book.bookId : 'javascript:;'" :style="book.bookId ? '':'cursor:default'">
                            <img :src="book.bookCoverImage ? path.ImageBookPath + book.bookCoverImage: '/img/collect/book.png'"/>
                            <p style="background-color: #ff8d70;">{{book.bookName}}</p>
                        </a>
                    </li>
                </ul>
                <!--<a class="change" href="javascript:;" @click="getBook">
                    <img :src="path.ImagePath + '/img/collect/change.png'"/>
                    <p>换一批作品</p>
                </a>-->
                <!--<img :src="path.ImagePath + '/img/collect/articleBottom.png'"/>-->
                <div style=" text-align: center;">
                    <img :src = "path.ImagePath  + '/img/collect/bottom.jpg'" style="width: 72%;" />
                </div>
            </div>
            <div class="comment">
                <div class="commentHead">
                    <div class="commentNums" v-if="commentTotal !== 0 ">{{commentTotal}}</div>
                    <div>评论</div>
                </div>
                <div class="text_input">
                    <ul class="clearr">      
                        <li class="user_head">
                            <a href="javascript:;" v-if="loginFlag" >  
                                <img :src="path.ImageBookPath + userImage " @load="szxj.loadImg(loginImg ? path.ImageBookPath + loginImg: '', $event)"/>
                            </a>
                            <img v-else :src="path.ImagePath + '/img/sss888.png'" @load="szxj.loadImg(loginImg ? path.ImageBookPath + loginImg: '', $event)"/>
                        </li>
                        <li class="user_msg" v-show="loginFlag" >
                            <editor 
                              :id="'editor_'" 
                              :obj="editor" 
                              @update:obj = "val => editor = val"></editor>  
                        </li>
                        <li class="user_msgTow" v-show="!loginFlag" ><a :href="path.TemprootPath + '/login'">登录</a>后才可以进行操作 </li>
                        <li class="MessageBtn" @click="saveComment"><span>发表评论</span></li>
                    </ul>
                    <div class="text_sort active">
                        <ul class="text_sort_ul">
                            <li class="text_sort_li" :class="sort === 1 ?'active':''" @click="setComment(1)">默认排序</li>
                            <li class="text_sort_li" :class="sort === 0 ?'active':''" @click="setComment(0)">按回复数</li>
                            <ul class="text_page_up clear">
                                <li class="page_up" @click="setPage(commentPageNum - 1, 1)" :style="commentPageNum > 1 ? 'display:block':'display:none'">上一页</li>
                                <li class="page_number" :style="objTemp == commentPageNum? 'font-weight:bold;color:#00a1d6;':''" v-for="(objTemp,index) in commentPageTotal" @click="setPage(objTemp+1)"><a>{{ objTemp }}</a></li>
                                <li v-show="commentPageNum !== commentPageTotal" class="page_next" @click="setPage(commentPageNum + 1,commentPageTotal)">下一页</li>
                                <li>共<b>{{commentPageTotal}}</b>页</li>
                            </ul>
                        </ul>
                    </div>   
                </div>
                <div class="CommentArea"  v-for="(obj,index) in commentList">
                        <div class="text_user clear">
                            <a href="javascript:;"><img class="text_user_img" :src="path.ImagePath + '/img/sss8.jpg'" @load="szxj.loadImg(obj.userHead ? path.ImageBookPath + obj.userHead: '', $event)" /></a>
                            <ul class="mes_head">
                              <li class="mes_head_user" >
                                <a href="javascript:;" class="user_a" title="">{{obj.userName}}</a>
                                <a v-if="index === 0 && obj.strickie != '0'" href="javascript:;" class="user_Top">置顶</a>
                                <a v-if="commentList.auth && obj.strickie == '0'" @click="strickieFn(obj.commentId)" href="javascript:;" class="user_Top_a">置顶</a>
                              </li>
                              <li><span class="user_comment" v-html="obj.commentContent" >{{ obj.commentContent }}</span></li>  
                              <li>
                                <ul class="updata_mes">
                                    <li class="mess1">{{ szxj.getLocalTime(obj.commentDate / 1000) }}</li>
                                    <li class="mess2" @click="messageShow(obj.commentId, 0, obj.replyUserName, obj.userId)">回复</li>
                                    <li class="mess3"  @click="reportShow(obj.commentId)">举报</li>
                                </ul>
                              </li>
                            </ul>
                        </div>
                        <div class="text_userTow clear"  v-for="temp in obj.replyEntityList" :style=" obj.replyEntityList.length == obj.replyEntityList[index+1] ?'border-bottom: 1px solid rgba(0,0,0,0.06);':''  ">
                            <a href="javascript:;">
                              <img class="text_userTow_img" :src="path.ImagePath + '/img/smallHead.png'" @load="szxj.loadImg(temp.userHead ? path.ImageBookPath + temp.userHead: '', $event)" />
                                 <!--<span v-if="temp.sex == '男生'" class="attention-name-sex-thr"><img :src="path.ImagePath + '..//img/sex_001.png'" alt="" /></span><span v-if="temp.sex == '女生'" class="attention-name-sex-thr"><img :src="path.ImagePath + '..//img/sex_002.png'" alt="" /></span> -->
                            </a>
                            <ul class="mes_head">
                                <li class="mes_head_user" >
                                    <span class="user_comment"  title="" >
                                      <a href="javascript:;" class="user_a" title="">{{ temp.userName }}</a>
                                      <label v-if="temp.replyStatus==1" >
                                                                                               回复<span class="aite_user" >@{{ temp.replyUserName }} </span>
                                      </label>
                                      <span v-html="temp.replyContent">{{ temp.replyContent }}</span>
                                    </span>
                                </li>
                                <li></li> 
                                <li>
                                    <ul class="updata_mes">
                                        <li class="mess1">{{ szxj.getLocalTime(temp.replyDate / 1000) }}</li>
                                        <li class="mess2" @click="messageShow(temp.commentId, 1, temp.userName, temp.userId,temp.replyId)">回复</li>
                                        <li class="mess3" @click="reportShowFn(temp.replyId)">举报</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <ul class="Publish" :style="commentId === obj.commentId ? 'visibility: ;':'display: none;'" v-show = "commentId ===obj.commentId">
                        <!--<ul class="Publish" v-show = "commentId ===obj.commentId">-->
                            <li class="user_head"><a href="javascript:;"><img :src="path.ImagePath + '/img/sss8.jpg'" @load="szxj.loadImg(obj.userHead ? path.ImageBookPath + obj.userHead: '', $event)"/></a></li>
                            <li class="replyBox" style="position: relative; float: left;min-height: 60px;">
                                <editor :id="'editor_' + obj.commentId" 
                                  :obj="obj.editor"
                                  @update:obj = "val => obj.editor = val"
                                  ></editor>
                            </li>
                            <li class="MessageBtn" @click="saveReply(obj.commentId)"><span style="line-height: 26px;">回复</span></li>
                        </ul>
                        <!--<ul class="text_page clear" :style="obj.totalCount > 10 ? 'display:block ;':'display: none;'">
                            <li>共<b>{{obj.totalCount/10}}</b>页</li>
                            <li class="page_up" @click="setPage1(commentPageNum - 1, $index)" :style="commentPageNum > 1 ? 'display:block':'display:none'">上一页</li>
                            <li class="page_number" v-if="(($index + 1) <= 5 && commentPageNum < 3 || (($index + 1) > commentPageNum - 3 &&  $index < commentPageNum)) || ( (($index + 1) <= commentPageNum + 2 &&　($index + 1) > commentPageNum) || (commentPageNum > commentPageTotalCount - 3 && ($index + 6) > commentPageTotalCount) )" 
                                :style="objTemp == commentPageNum ? 'font-weight:bold;color:#00a1d6;':''" 
                                v-for="objTemp in commentPageTotal" 
                                @click="setPage1(objTemp, $index)"><a>{{ objTemp }}</a></li>
                            <li v-show="commentPageNum !== commentPageTotal" class="page_next" @click="setPage1(commentPageNum + 1, $index)">下一页</li>
                        </ul>-->
                        <div class="hr"></div>  
                    </div>
                <div id="page" class="page">
                        <ul>
                            <li class="btn" @click="setPage(commentPageNum - 1, 1)"><a>上一页</a></li>
                            <li v-if="((index + 1) <= 5 && commentPageNum < 3 || ((index + 1) > commentPageNum - 3 &&  index < commentPageNum)) || ( ((index + 1) <= commentPageNum + 2 &&　(index + 1) > commentPageNum) || (commentPageNum > commentPageTotal - 3 && (index + 6) > commentPageTotal) )" :class="objTemp == commentPageNum? 'active':''" v-for="(objTemp,index) in commentPageTotal" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
                            <li class="btn next" @click="setPage(commentPageNum + 1, commentPageTotal)"><a>下一页</a></li>
                            <li class="goto">
                                <input type="text" v-model="jumpNum" style="text-align: center;"/>
                                <span>{{ commentPageNum }}/{{ commentPageTotal }}</span>
                                <a class="btn" @click="setPage(commentPageNum, commentPageTotal)">转页</a>
                            </li>
                        </ul>
                    </div>
                    <div style="height: 300px;"></div>
                <div class="Report" v-if="report" :style="report?'display:block;':'display:none'">
                       <img :src="path.ImagePath + '/img/false.png'" @click="rewardShowTowFn"/>
                        <form action="" method="get">请输入举报理由
                            <br /><br /> 
                            <ul>
                                <li><label><input name="Fruit" type="radio" value="" @click="oneFn" />&nbsp;广告 </label></li>
                                <li><label><input name="Fruit" type="radio" value="" @click="towFn"/>&nbsp;刷屏 </label></li>
                                <li><label><input name="Fruit" type="radio" value="" @click="thrFn"/>&nbsp;剧透 </label></li>
                                <li><label><input name="Fruit" type="radio" value="" @click="fouFn"/>&nbsp;引战</label></li>
                                <li><label><input name="Fruit" type="radio" value="" @click="fifFn"/>&nbsp;政治</label></li>
                                <li><label><input name="Fruit" type="radio" value="" @click="sixFn"/>&nbsp;内容不相关</label></li>
                                <li><label><input name="Fruit" type="radio" value="" @click="sveFn"/>&nbsp;人身攻击</label></li>
                                <li><label><input name="Fruit" type="radio" value="" @click="nigFn"/>&nbsp;其他</label></li>
                            </ul>
                        </form> 
                        <div class="true" @click="reportDown">确定</div>
                    </div>
            </div>
        
        </div>
      </div>

</template>

<script>
  import Header from "~/components/Header"
  import editor from "~/components/Editor"
  import PathList from "~/components/conf"
  import SZXJ from "~/components/vueHttp"
  import alert from "~/components/Alert"
  export default{
      components:{
          myHeader:Header,
          editor:editor,
          alert:alert
      },
      data:function(){
        return{
          path: PathList,
          bookList: [],
          btn: '/img/collect/send.png',
          loginFlag: false,
          loginImg: '',
          userImage:'',
          userHead: '',
          szxj: SZXJ,
          commentList: [],
          commentTotal: '',
          commentId: '',
          replyStatus: 0,
          replyUserId: 0,
          contentEntityList:[],
          Report:0,
          report: false,
          commentAndReplyTotalCount:'',
          replyId:'',
          report:false,
          reportTypeId:'',
          reportContent:'',   
          reportFlag:false,
          collectData: {
              activeId: 2,
              pageNum: 1,
              pageSize: 8,
              sort: 0
          },
          bookTotal: 0,
          bookPageTotal: 0,
          commentPageTotal: 1,
          commentPageNum: 1,
          jumpNum: '',
          sort: 1,
          reportcommentId: 0,
          pageFlag: false,
          replyPageTotal: 1,
          replyTotal: 0,
          replyList: {},
          bodyFlag:true,
          editor:{}
        }
      },
      mounted:function(){
          var _data = {};
          _data.activeId = 2;
          _data.pageNum = 1;
          _data.pageSize = 10;
          _data.sort = this.sort;
          SZXJ.http(this,'get', PathList.getStatus, _data, (response) => {
              if(response.data.loginFlag) {
                  this.loginFlag = response.data.status.flag;
                  this.userImage = response.data.status.userImage;
              }
          });
          var _data = {};
          _data.activeId = 2;
          _data.pageNum = 1;
          _data.pageSize = 10;
          _data.sort = this.sort;
          this.getComment(_data);
          this.getBook();
          this.pageFlag = true;
      },
      methods:{
          moveLogin:function(){
            if(!this.loginFlag){
              location.href = "/login";
            }else{
              location.href = "/works";
            }
          },
          setreplyFn: function (replyId){
              this.replyId = replyId;
          },
          strickieFn: function(commentId) {
              SZXJ.http(this,'post', PathList.top, { activeId: 2, commentType: 0,commentId: commentId }, (response) => {
                  this.setComment(this.sort);
              });
          },
          messageShow: function(commentId, v, name, id,replyId) {
              if(!this.loginFlag){
                  window.location.href = "/login";
              };
              if(this.loginFlag){
                  this.commentId = commentId;
              }; 
              var editor = {};
              var index = 0;
//            console.log(v);
              for (var i = 0; i < this.commentList.length; i++) {
                  if (this.commentList[i].commentId === commentId) {
                      console.log(this.commentList[i]);
                      editor = this.commentList[i].editor;
                      index = 0;
                      break;
                  };
              };
              this.replyUserId = id;
              this.replyId= replyId;
              console.log(editor);
              if (v === 1) {
                  editor.$txt.html('<span style="color:#00A1D6;" contenteditable="false">回复@'+name+'</span><span style="font-size:12px !important;color:#555 !important;">:</span>');
                  this.replyStatus = 1;
              } else {
                  this.replyStatus = 0;
              };
          },
          setPage1: function(v, commentId) { // 获取回复的
              if (!v || v > this.commentPageTotal || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 || parseInt(v) === parseInt(this.commentPageNum) ) {
                  return;
              }
              var index = 0;
              for (var i = 0; i < this.commentList.length; i++) {
                  if (this.commentList[i].commentId === commentId) {
                      index = i;
                      break;
                  }
              }
              var replyData = {
                  commentPageNum: v,
                  pageSize : 10,
                  commentId: this.commentList[index].commentId,
              }
              var obj = this.commentList;
              SZXJ.http(this,'get', PathList.collectGetReply, replyData, (response) => {
                  this.replyList = response.data;
              });
          },
          setPage: function(v) {
              if (!v || v > this.commentPageTotal || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 || parseInt(v) === parseInt(this.commentPageNum) ) {
                  return;
              }
              this.commentPageNum = this.jumpNum;
              this.jumpNum = '';
              var _data = {};
              _data.activeId = 2;
              _data.pageNum = v;
              _data.pageSize = 10;
              _data.sort = this.sort;
              this.getComment(_data); // 请求
          },
          setComment: function(v) {
              this.sort = v;
              var _data = {};
              _data.activeId = 2;
              _data.pageNum = 1;
              _data.pageSize = 10;
              _data.sort = this.sort;
              this.getComment(_data); // 请求
          },
          reportShow: function(commentId){
              this.commentId = '';
              this.replyId = '';
              this.report = true;
              this.reportcommentId = commentId;
          },
          reportShowFn: function(replyId){
              this.commentId = '';
              this.replyId = '';
              this.report = true; 
              this.replyId = replyId;
          },
          oneFn:function(){
              this.reportTypeId=1;
          },
          towFn:function(){
              this.reportTypeId=2;
          },
          thrFn:function(){
              this.reportTypeId=3;
          },
          fouFn:function(){
              this.reportTypeId=4;
          },
          fifFn:function(){
              this.reportTypeId=5;
          },
          sixFn:function(){
              this.reportTypeId=6;
          },
          sveFn:function(){
              this.reportTypeId=7;
          },
          nigFn:function(){
              this.reportTypeId=8;
          },   
          reportDown: function(){
              this.report = false;
              var _data={
                  reporterId:this.userId, // 被举报人的id
                  reportTypeId:this.reportTypeId, // 举报类型
              }; 
              if (this.reportcommentId === '') {
                  _data.replyId = this.replyId;
              } else {
                  _data.commentId = this.reportcommentId;
              }
              SZXJ.http(this,'post', PathList.report, _data, (response) => {
                  this.$refs.alert.setMessage(false,'举报成功',function(){})
              });
          },
          rewardShowTowFn:function(){
              this.report = false;
          },
          getComment: function(_data) {
              
              SZXJ.http(this,'get', PathList.collectGetComment, _data, (response) => {
                  this.commentList = response.data.data.list;
                  this.commentTotal = response.data.data.total;
                  this.commentPageTotal = response.data.data.pages;
                  this.commentPageNum = response.data.data.pageNum;
              // 计算评论的总页数
                  /*console.log(this.commentList.totalCount / _data.pageSize);
                  if (this.commentList.totalCount / _data.pageSize <= 1) {
                      this.commentPageTotal = 1;
                  } else {
                      if (this.commentList.totalCount % _data.pageSize === 0) {
                          this.commentPageTotal = this.commentList.totalCount / _data.pageSize;
                      } else {
                          this.commentPageTotal = parseInt((this.commentList.totalCount / _data.pageSize), 10) + 1;
                      }
                  }*/
                  /*for (var i = 0; i < this.commentPageTotal;i++) {
                      this.commentList.page.push(i+1);
                  }
                  for (var i = 0; i < this.commentListlength;i++) {*/
                // 评论楼中楼
                      /*this.commentList[i].editor = {};
                      this.commentList[i].page = [];
                      this.commentList[i].pageNo = 1;*/
                // 计算评论楼中楼回复的总页数
                      /*if (this.commentList[i].totalCount / _data.pageSize <= 1) {
                          this.commentList[i].pageCount = 1;
                      } else {
                          if (this.commentList[i].totalCount % _data.pageSize === 0) {
                              this.commentList[i].pageCount = this.commentList[i].totalCount / _data.pageSize;
                          } else {
                              this.commentList[i].pageCount = parseInt((this.commentList[i].totalCount / _data.pageSize), 10) + 1;
                          }
                      }
                      for (var j = 1; j <= this.commentList[i].pageCount;j++) {
                          this.commentList[i].page.push(j);
                      }
                  }*/
              });
          },
          saveComment: function() {
              if(!this.loginFlag){
                  window.location.href = "/login";
              };
              var _data = {
                  commentContent: this.editor.$txt.html(), //文本html内容
                  commentType: 0, 
                  activeId: 2
              };
              SZXJ.http(this,'post', PathList.collectSetComment, _data, (response) => {
                  this.editor.$txt.html('');
                  this.refresh();
              },(err)=>{
                  this.$refs.alert.setMessage(true,err.body.msg,function(){})
              });
          },
          saveReply: function(commentId) { // 回复
              if(!this.loginFlag){
                  window.location.href = "/login";
              }
              var editor = {};
              var index = 0;
              for (var i = 0; i < this.commentList.length; i++) {
                  if (this.commentList[i].commentId == commentId) {
                      editor = this.commentList[i].editor;
                      index = i;
                      break;
                  }
              }
              var _data = {
                  replyStatus: this.replyStatus,
                  commentId: this.commentId,
                  replyUserId: this.replyUserId, 
                  repliedId : this.replyId,
                  replyContent: editor.$txt.html(), //文本html内容
              };
              SZXJ.http(this,'post', PathList.saveReply, _data, (response) => {
                  editor.$txt.html('');
                  var _data = {};
                  _data.activeId = 2;
                  _data.pageNum = 1;
                  _data.pageSize = 10;
                  _data.sort = this.sort;
                  location.href = "newCollect";
                  var This = this;
                  setTimeout(function(){
                      This.getComment(_data);
                      This.setPage1(This.commentList[index].pageCount,This.commentId);
                      This.commentId = -1;   
                  },300);
              },(err)=>{
                  this.$refs.alert.setMessage(true,err.body.msg,function(){})
              });
          },
          btnOver: function(){
              this.btn = '/img/collect/sendPress.png';
          },
          btnOut: function() {
              this.btn = '/img/collect/send.png';
          },
          getBook: function(){
              SZXJ.http(this, 'get', PathList.collectArticle, this.collectData, (response) => {
                  this.bookList = response.data.data.list;
                  this.bookTotal = response.data.data.total;
                  this.bookPageTotal = response.data.data.pages;
                  if(this.bookList.length < 8){
                      var i = 8 - this.bookList.length;
                      for(var j=0;j<i;j++){
                          this.bookList.push({
                              bookCoverImage: "",
                              bookName: "秋季征文"
                          })
                      }
                  };
                  this.collectData.pageNum++;
                  if(this.collectData.pageNum > this.bookPageTotal){
                      this.collectData.pageNum = 1;
                  };
              });
          },
          setHref: function(v) {
              location.href = v;
              const href = window.location.href;
              const str = href.substring(href.lastIndexOf('#!/') + 3, href.length);
              this.$set('active', str);
          },
          refresh: function() {
              var _data = {};
              _data.activeId = 2;
              _data.pageNum = 1;
              _data.pageSize = 10;
              _data.sort = this.sort;
              this.getComment(_data);
          },
      },
      head: function(){
        return{
          title: '秋季征文-轻小说投稿',
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
              { rel: 'stylesheet', href: '/css/collect.css' },
              { rel: 'stylesheet', href: '/css/headerOrFooter.css' },
              { rel: 'stylesheet', href: '/css/jquery-ui.min.css'},
            ]
        }
    }   
  }
</script>

<style>
</style>
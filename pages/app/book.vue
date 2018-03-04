<template>
  <div style="font-size: 12px; position: relative;">
    <appConfirm ref="appConfirm"></appConfirm>
    <!--<appAlert ref="appAlert"></appAlert>-->
    <!--头部-->
    <div class="header_book">
      <div class="header_C1" @click = "goBack()">
        <div class="header_back"></div>
      </div>
      <div class="header_title">
        <span>{{bookName}}</span>
      </div>
      <div class="header_share" @click="showShare()">
        <div class="header_share_tu"></div>
      </div>
    </div>
    <!--书籍封面和简介-->
    <div class="book_details">
      <img :src="path.imagePath + bookCoverImage" style="position: absolute;left: 0;margin: 0;z-index: -2;width: 100%;-webkit-filter:blur(40px);-moz-filter: blur(40px);-ms-filter: blur(40px);-o-filter: blur(40px);filter: blur(40px);"/>
      <!--<img :src="path.imagePath + bookCoverImage" style="position: absolute;left: 0;margin: 0;z-index: -2;width: 100%;-webkit-filter:blur(30px);-moz-filter: blur(30px);-ms-filter: blur(30px);-o-filter: blur(30px);filter: blur(30px);"/>-->
      <div class="book_cover">
        <img :src="path.imagePath + bookCoverImage" style="width: 100%; height: 100%;"/>
      </div>
      <div class="book_information">
        <div class="book_part book_author">
          <span class="book_span" style="background-image: url(/img/app_newBook/touxiang.png);"></span>
          <span class="book_title">作者：</span>
          <span>{{author}}</span>
        </div>
        <div class="book_part book_type">
          <span class="book_span" style="background-image: url(/img/app_newBook/type.png);"></span>
          <span class="book_title">分类：</span>
          <span>{{type}}</span>
        </div>
        <div class="book_part book_num">
          <span class="book_span" style="background-image: url(/img/app_newBook/num.png);"></span>
          <span class="book_title">字数：</span>
          <span>{{num}}</span>
        </div>
        <div class="book_part book_click">
          <span class="book_span" style="background-image: url(/img/app_newBook/click.png);"></span>
          <span class="book_title">点击：</span>
          <span>{{clickNum}}</span>
        </div>
        <div class="book_part book_updatetime">
          <span class="book_span" style="background-image: url(/img/app_newBook/time.png);"></span>
          <span class="book_title">更新时间：</span>
          <span>{{updateTime}}</span>
        </div>
        <div class="book_part book_model">
          <span class="book_span" style="background-image: url(/img/app_newBook/model.png);"></span>
          <span class="book_title">更新方式：</span>
          <span v-if="updateModel==1">日更/连载中</span>
          <span v-if="updateModel==2">月更/连载中</span>
        </div>
      </div>
    </div>
    <!--分享和打赏-->
    <div class="book_share">
      <div class="book_left_reward" @click="showReward()">
        <span class="qiu_reward"></span>          
        <span class="text_book">打赏</span>         
      </div>
      <div class="book_right_share" @click="showShare()">
        <span class="qiu_share"></span>      
        <span class="text_book">分享</span>
      </div>
    </div>
    <div class="book_line"></div>
    <div class="menuAndIntroduction">
      <div class="menu">
        <div class="menu_name">
          <div>目录</div>
        </div>
        <div class="menu_time" @click="showBookMenu()">
          <div style="color: #989898;"><span style="color: #989898;">最近更新:</span>{{updateTime1 | reverse}}</div>
          <div style="color: #989898;"></div> 
        </div>
      </div>
      <div class="introduction">
        <div class="head_introduction">简介</div>
        <div :class="objHeight?'introduction_content sheild':'introduction_content'">{{bookIntroduction}}</div>
        <div class="introduction_control" @click="openIntroduction()" :style="objHeight?'background-image: url(/img/app_newBook/bottom.png);':'background-image: url(/img/app_newBook/top.png);'"></div>
      </div>
    </div>
    <div class="book_line"></div>
    <div class="author_msg">
      <div class="author_img">
        <img :src="path.imagePath + userHeader" style="width: 100%; height: 100%; border-radius: 100%;" onerror="javascript:this.src='/img/user_info_touxiang.jpg'" />
      </div>
      <div class="author_info">
        <div class="author_name">
          <span>{{author}}</span>
          <span class="author_red">作者</span>
        </div>
        <div class="author_introduction">{{userEntity.information}}</div>
      </div>
      <div class="author_attention btn" @click = "updateAttention()">
        <span v-if="sign" class="attention" style="font-size: 0.1152rem;"><img src="/img/app_newBook/xin.png" style="width: 0.1152rem; height: 0.1152rem; vertical-align: text-top;"><span style="font-size: 0.1152rem; vertical-align: top;">已关注</span></span>
        <span v-else style="font-size: 0.1152rem;">关注</span>
      </div>
    </div>
    <div class="book_line" style="height:0.0512rem;"></div>
    <div class="goodManList">
      <div class="good_menu">
        <div class="menu_name">
          <div>好人榜</div>
        </div>
        <div class="menu_time">
          <a :href="'/app/goodMan/'+bookId" style="color: #989898; background-image: url(/img/app_newBook/right.png); background-repeat: no-repeat; padding-top:0.02rem;background-size: 0.065rem 0.11rem; background-position: center right; padding-right: 0.085rem;float: right;font-size: 0.1195rem;">{{cardAmount}}</a>
        </div>
      </div>
      <div class="good_menuList">
        <div class="good_menuList_brand">
          <div v-for="(obj,index) in totalWorBookReward" class="good_part" v-if="index < 3">
            <div class="good_header" style="background-image: url(/img/app_newBook/first.png);" v-if="index==0"></div>
            <div class="good_header" style="background-image: url(/img/app_newBook/second.png);" v-if="index==2"></div>
            <div class="good_header" style="background-image: url(/img/app_newBook/thired.png);" v-if="index==1"></div>
            <div class="good_portrait">
              <img :src="path.imagePath + obj.userHead" style="width: 0.3584rem; height: 0.3584rem; border-radius: 100%;" onerror="javascript:this.src='/img/user_info_touxiang.jpg';" alt="" />
            </div>
            <div class="good_name">{{obj.userName}}</div>
          </div>
        </div>
        <div class="good_menuList_first" v-if="loginFlag" key="1">
          <div class="good_portrait">
            <img src="/img/app_newBook/people.png" style="width: 0.3584rem; height: 0.3584rem;"/>
          </div>
          <div class="good_name">{{loginObj.status.userName}}</div>
        </div>
        <div class="good_menuList_first"  style="line-height: 0.7467rem;" v-else key="2">
          <a href="/app/login">您还未登录</a>
        </div>
      </div>
    </div>
    <div class="book_line" style="height:0.0512rem;"></div>
    <div class="book_comment">
      <div class="comment_header">
        <div class="header_title">评论</div>
        <a :href="'/app/commentFirst/'+bookId"  style="color: #989898; background-image: url(/img/app_newBook/right.png); background-repeat: no-repeat; padding-top:0.02rem;background-size: 0.065rem 0.11rem; background-position: center right; padding-right: 0.085rem;float: right;font-size: 0.1195rem;">{{commentCount}}条</a>
      </div>
      <div class="comment_list">
        <div class="comment_part" v-for="(temp,index) in comment" v-if="index<=1">
          <div class="comment_user">
            <!--<img :src="path.imagePath + temp.userHead" style="border-radius: 100%;"/>-->
            <img :src="path.imagePath + temp.userHead" style="border-radius: 100%;" onerror="javascript:this.src='/img/user_info_touxiang.jpg'" alt="" />
          </div>
          <div class="comment_content">
            <div class="comment_content_header">
              <span class="comment_user_name">{{temp.userName}}</span>
              <span class="comment_user_time">{{temp.commentDate | reverse}}</span>
            </div>
            <div class="comment_user_reply" v-html="temp.commentContent">{{temp.commentContent}}</div>
            <div class="comment_other_reply" v-if="temp.replyEntityList.length!=0">
              <div class="comment_reply_part" >
                <div class="user_comment" >
                  <div class="user_comment" v-for="(obj,index) in temp.replyEntityList">
                    <div v-if="obj.replyStatus==0" style="padding: 0.0256rem 0;">
                      <span>
                        <span style="color: #989898;font-size: 0.1024rem;">{{obj.userName}}</span>:
                      </span>
                      <span style="white-space: normal; width: 100%;word-wrap:break-word; overflow:hidden; color: #282828;font-size: 0.1024rem;display: -webkit-box;" v-html="obj.replyContent">{{ obj.replyContent }}</span>
                    </div>
                    <div v-if="obj.replyStatus==1" style="padding: 0.0256rem 0;">
                      <span class="aite_user" >
                        <span style="color: #989898;font-size: 0.1024rem; display: inline-block;">{{obj.userName}}</span>
                        <span style="color: lightskyblue;display: inline-block;">@</span>
                        <span style="color: #989898;font-size: 0.1024rem;display: inline-block;">{{obj.replyUserName}}</span>:
                      </span>
                      <span style="white-space: normal;width: 100%;word-wrap:break-word; overflow:hidden; color: #282828;font-size: 0.1024rem; display: -webkit-box;" v-html="obj.replyContent">{{ obj.replyContent }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <a :href="'/app/commentDetails/'+temp.commentId+'&'+bookId" class="comment_reply_count" style="font-size: 0.1024rem;">共{{temp.replyEntityList.length}}条回复</a>
            </div>
          </div>
        </div>
        <a :href="'/app/commentFirst/'+bookId"  class="comment_move" >查看全部评论</a>
      </div>
    </div>
    <div class="book_footer">
      <div class="footer_left" @click="setCollect()">
        <img src="/img/app_newBook/xingxing.png" style="width: 0.1536rem; height: 0.1536rem;"/>
        <p style="font-size: 0.1024rem">
         <span v-if="!collect">收藏</span> 
         <span v-else>已收藏{{Collection}}</span>
        </p>
      </div>
      <div class="footer_center btn" @click="readBookFn()">开始阅读</div>
      <div class="footer_right" @click = "commentFn(bookId)">
        <!--<span></span>-->
        <img src="/img/app_newBook/shuxie.png" style="width: 0.1707rem; height: 0.1536rem;"/>
        <p style="font-size: 0.1024rem;">评论</p>
      </div>
    </div>
    <transition name="fade">
      <div class="shadow" v-if="shadowBol" @click="closeRewardAndShare()"></div>
    </transition>
    <transition name="fade">
      <div class="share_bottom" v-show="shareBol">
        <div class="share_header">分享到</div>
        <div class="share_dirction">
          <a href="javascript:;" class="share_part" title="分享到新浪微博" @click="shareAction(shares[3])">
            <img src="/img/app_newBook/xinlang.png">
            <p>新浪微博</p>
          </a>
          <a href="javascript:;" class="share_part" @click="shareAction(shares[2])">
            <img src="/img/app_newBook/weixin.png">
            <p>微信好友</p>
          </a>
          <a href="javascript:;" class="share_part" title="分享到微信"  @click="shareAction(shares[2])">
            <img src="/img/app_newBook/friend.png">
            <p>微信朋友圈</p>
          </a>
          <a href="javascript:;" class="share_part" title="分享到QQ好友" @click="shareAction(shares[0])">
            <img src="/img/app_newBook/qq.png">
            <p>QQ好友</p>
          </a>
          <a href="javascript:;" class="share_part" @click="shareAction(shares[0])">
            <img src="/img/app_newBook/qqkone.png">
            <p>QQ空间</p>
          </a>
          <a href="javascript:;" class="share_part">
            <img src="/img/app_newBook/copy.png">
            <p>复制链接</p>
          </a>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="reward_bottom" v-if="rewardBol">
        <div class="reward_title">
          <div class="header_title">打赏</div>
          <a :href="'/app/goodMan/'+bookId">好人榜</a>
        </div>
        <div class="reward_list">
          <div class="reward_part marginRight" :style="backBol==1?'background-color: #ffdfcc;':''" @click="rewardMount(1,100)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem; margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">100张</p>
          </div>
          <div class="reward_part marginRight" :style="backBol==2?'background-color: #ffdfcc;':''" @click="rewardMount(2,500)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">500张</p>
          </div>
          <div class="reward_part marginRight" :style="backBol==3?'background-color: #ffdfcc;':''" @click="rewardMount(3,1000)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">1000张</p>
          </div>
          <div class="reward_part" :style="backBol==4?'background-color: #ffdfcc;':''" @click="rewardMount(4,3000)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">3000张</p>
          </div>
          <div class="reward_part marginRight" :style="backBol==5?'background-color: #ffdfcc;':''" @click="rewardMount(5,5000)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">5000张</p>
          </div>
          <div class="reward_part marginRight" :style="backBol==6?'background-color: #ffdfcc;':''" @click="rewardMount(6,10000)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">10000张</p>
          </div>
          <div class="reward_part marginRight" :style="backBol==7?'background-color: #ffdfcc;':''" @click="rewardMount(7,30000)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">30000张</p>
          </div>
          <div class="reward_part" :style="backBol==8?'background-color: #ffdfcc;':''" @click="rewardMount(8,50000)">
            <img src="/img/app_newBook/goodMan.png" style="width: 0.3243rem; height: 0.3243rem;  margin: 0.0768rem 0.1493rem 0 0.1493rem;"/>
            <p style="width: 100%; text-align: center; font-size: 0.1024rem; line-height: 1.4;">50000张</p>
          </div>
        </div>
        <div class="reward_card_count">
          <span>好人卡：</span><span style="color: #ff616f;">{{payCardAmount}}</span>
        </div>
        <div class="reward_btn">
          <div class="Recharge btn" @click="recharge()">充值</div>
          <div class="Feeding btn" @click="feed()">投喂</div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="read_menu" v-show="bookMenu" >
          <div class="menu_content" id="readMenu">
            <div class="menu_head">
              <div style="position: absolute;left: 0.128rem;top: 0.0512rem;background-image: url(/img/app_read/header_back.png);background-repeat: no-repeat; background-size: contain;width: .2048rem;height: .2048rem; background-position: -0.06rem;" @click="delBookMenu()"></div>
                         目录
            </div>
            <div class="menu_count">共{{allLength}}章</div>
            <div class="menu_list">
              <div class="menu_ccc" v-for ="(obj,index) in volumeCustomList">
                <div class="menu_part" style="background-color: #f2f2f2;">{{obj.volumeName}}</div>
                <div v-for="(temp,index) in obj.contentEntityList" class="menu_part" @click = "readContent(temp.contentId,bookId)" >
                  {{temp.contentTitle}}
                  <p v-if="lastContent.contentId==temp.contentId" style="color: #555; margin: 0.08rem 0;">{{updateTime}} 更新</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>

<script>
  import axios from "axios"
  import appPathList from "~/components/conf-app"
  import SZXJ from "~/components/vueHttp-app"
  import appConfirm from "~/components/AppConfirm"
  import appAlert from "~/components/AppAlert"
  export default{
    components:{
      'appConfirm':appConfirm,
      'appAlert':appAlert
    },
    data:function(){
      return{
        path:appPathList,
        bookName:'',
        author:'',
        type:'',
        num:'',
        clickNum:'',
        updateTime:'',
        updateModel:'',
        bookId:30,
        bookCoverImage:'',
        bookIntroduction:'',
        objHeight:true,
        userHeader:'',
        userEntity:{},
        sign:false,
        comment:[],
        commentCount:0,
        monthWorBookReward:[],
        totalWorBookReward:[],
        weekWorBookReward:[],
        shareBol:false,
        shadowBol:false,
        rewardBol:false,
        backBol:1,
        rewardNum:0,
        cardAmount:0,
        updateTime1:0,
        bdshellJs:'',
        payCardAmount:0,
        amount:100,
        Collection:0,
        collect:false,
        lastContent:{},
        shares:[],
        bookMenu:false,
        lastContent:{},
        allLength:0,
        volumeCustomList:[],
        loginFlag:false,
      }
    },
    filters:{
      reverse:function(value){
        var currentTime = new Date();
        let time = currentTime.getTime() - value;
        if(Math.floor(time/31536000000) > 0){
            return Math.floor(time/31536000000) + "年前";
        };
        if(Math.floor(time/2592000000) > 0){
            return Math.floor(time/2592000000) + "月前";
        };
        if(Math.floor(time/604800000) > 0){
            return Math.floor(time/604800000) + "周前";
        };
        if(Math.floor(time/86400000) > 0){
            return Math.floor(time/86400000) + "天前";
        };
        if(Math.floor(time/3600000) > 0){
            return Math.floor(time/3600000) + "小时前";
        };
        if(Math.floor(time/60000) > 0){
            return Math.floor(time/60000) + "分钟前";
        }
        if(Math.floor(time/1000) > 0){
            return Math.floor(time/1000) + "秒前";
        }else{
            return "0秒前";
        }
      },
    },
    asyncData:function(context){
      var obj = {};
      var JSESSIONID;
      obj.bookId = context.params.bookId;
      var strObj = context.params;
      if (context.req) {
          let CookiesAAA = 0;
          CookiesAAA = {};
          context.req.headers.cookie && context.req.headers.cookie.split(';').forEach(function( Cookie ) {
              var parts = Cookie.split('=');
              CookiesAAA[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
          });
          if (CookiesAAA.JSESSIONID) {
            JSESSIONID = CookiesAAA.JSESSIONID;
          } else {
            JSESSIONID = null;
          }
      }
      var data1 ={};
      data1.pageNo = 1;
      data1.pageSize = 10;
      data1.status = 0;
      obj.allLength = 0;
      return axios.all([
        axios.get(appPathList.getStatus,{ headers:{'JSESSIONID': JSESSIONID }}),
        axios({
          url:appPathList.queryBookDirectory,
          params:strObj,
          headers:{'JSESSIONID': JSESSIONID }
        }),
//      axios.get(PathList.findUserOtherBook, { params:strObj},{ headers:{'JSESSIONID': JSESSIONID }}),   //作者其他作品的
        axios.get(appPathList.queryBookRank,{ params:strObj,data:data1},{ headers:{'JSESSIONID': JSESSIONID }})      //小说目录页的打赏排行榜
      ]).then(axios.spread(function(acct,perms,res1){
          obj.loginFlag = acct.data.loginFlag;
          obj.loginObj = acct.data;
          obj.bookName = perms.data.bookCustom.bookName;
          obj.author = perms.data.bookCustom.userEntity.userName;
          var type = perms.data.bookCustom.bookTypeEntityList;
          for(var i = 0; i<type.length ; i++){
            if(i==0){
              obj.type = type[i].bookTypeName;
            }else{
              obj.type = obj.type + '/' + type[i].bookTypeName;
            }
          }
          
          obj.num = perms.data.bookCustom.bookWordCount;
          obj.volumeCustomList = perms.data.bookCustom.volumeCustomList;
          obj.clickNum = perms.data.bookCustom.bookHit;
          obj.updateTime = SZXJ.getLocalTimeTwo(perms.data.bookCustom.bookUpdate);
          obj.updateTime1 = perms.data.bookCustom.bookUpdate
          obj.updateModel = perms.data.bookCustom.updateCycle;
          obj.bookCoverImage = perms.data.bookCustom.bookCoverImage;
          obj.bookIntroduction = perms.data.bookCustom.bookIntroduction;
          obj.userHeader = perms.data.bookCustom.userEntity.userHead;
          obj.userEntity = perms.data.bookCustom.userEntity;
          obj.sign = perms.data.bookCustom.userEntity.attention;
          obj.Collection =perms.data.bookCustom.bookCollect;
          obj.collect = perms.data.bookCustom.collect;
          obj.contentId = perms.data.bookHit ? perms.data.bookHit.contentId :　perms.data.bookCustom.volumeCustomList[0].contentEntityList[0].contentId;
          obj.lastContent = perms.data.bookCustom.lastContent;
          obj.totalWorBookReward = res1.data.totalWorBookReward;
          return obj
      })).catch(function(err){
        console.log(err);
      })
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getStatusFn();
        var self = this;
        if(this.volumeCustomList!=null){
            for(var i = 0; i<this.volumeCustomList.length;i++){
              console.log(1111);
              this.allLength = this.allLength + this.volumeCustomList[i].contentEntityList.length;
            }
          }
        
        // 监听plusready事件  
        document.addEventListener( "plusready", function(){
          if(typeof(plus)!="undefined"){
            // 扩展API加载完毕，现在可以正常调用扩展API
            plus.share.getServices( function(s){
              var shares = s;
              self.shares = shares;
              console.log(self.shares[0]);
              console.log(self.shares[1]);
              console.log(self.shares[2]);
              console.log(self.shares[3]);
            }, function(e){
              alert( "获取分享服务列表失败："+e.message );
            } );
          }else{
            console.log('plus不存在');
          }
        }, false);
        if(this.loginFlag){
          this.getGoodCard();
        }
        var data1 = {};
        data1.bookId = this.bookId;
        data1.pageNo = 1;
        data1.pageSize = 10;
        data1.status = 0;
        this.getComment(data1);
      })
    },
    methods:{
      shareAction:function(s) {
        var self = this;
        if ( !s ) {
          return;
        }
        if ( s.authenticated ) {
          self.shareMessage( s );
        } else {
          s.authorize( self.shareMessage, function(e){
            alert( "未进行认证" );
          });
        }
      },
      shareMessage:function(s){
        var self = this;
        s.send( {content:self.bookName,title:self.bookName,href:self.path.imagePath + self.bookCoverImage}, function(){
          alert( "分享成功！" );
        }, function(e){
          alert( "分享失败："+e.message );
        } );
      },
      recharge:function(){
        if(this.loginFlag){
          location.href = '/app/recharge';
        }else{
          location.href = "/app/login";
        }
      },
      delBookMenu:function(){
        this.bookMenu = false;
      },
      showBookMenu:function(){
        this.bookMenu = true;
      },
      readContent:function(a,b){
        location.href = "/app/readBook/"+a+"&"+b;
      },
      goBack:function(){
        history.back();
      },
      feed:function(){
        if(this.loginFlag){
          if(this.amount<this.payCardAmount && this.payCardAmount>0){
            this.getRewardFn();
          }else{
            this.$refs.appConfirm.setMessage('余额不足，请充值');
          }
        }else{
          location.href = "/app/login";
        }
      },
      showReward:function(){
        this.rewardBol = true;
        this.shadowBol = true;
      },
      rewardMount:function(a,b){
        this.backBol = a;
        this.amount = b;
        if(b>this.payCardAmount){
          this.$refs.appConfirm.setMessage('余额不足，请充值');
        }
      },
      showShare:function(){
        if(this.shareBol){
          this.shareBol = false;
          this.shadowBol = false;
        }else{
          this.shareBol = true;
          this.shadowBol = true;
        }
      },
      getStatusFn:function(){
        var self = this;
        SZXJ.http(this,'get',appPathList.getStatus,{},function(res){
          self.loginFlag = res.data.loginFlag;
          self.loginObj = res.data;
//        console.log(self.loginFlag);
          if(self.loginFlag){
            self.getGoodCard();
          }
        })
      },
      readBookFn:function(){
        location.href = "/app/readBook/"+this.contentId+"&"+this.bookId;
      },
      setCollect: function() {
          var self = this
          var _data = {};
          _data.bookId = this.bookId;
          SZXJ.http(this,'get', appPathList.getStatus, _data, (response) => {
              if(response.data.loginFlag) {
                  self.loginFlag = response.data.status.flag;
                  self.userImage = response.data.status.userImage;
                  SZXJ.http(self,'post', appPathList.saveOrDeleteBookCollect, _data, (response) => {         //保存或者取消收藏
                      if (self.collect) {
                        this.$refs.appConfirm.setMessage('已取消收藏');
                        self.collect = false;
                      } else {
//                      console.log('已收藏');
                        this.$refs.appConfirm.setMessage('已收藏');
                        self.collect = true;
                      }
                  },(err)=>{});
              }else{
                  this.$refs.appConfirm.setMessage('你还未登录或登录已超时');
//                location.href = "/login";
              }
          });
      },
      getBookInfoFn:function(){
        var self = this;
        SZXJ.http(this,'get',appPathList.queryBookDirectory+"?bookId="+this.bookId,{},function(res){
          self.bookName = res.data.bookCustom.bookName;
          self.author = res.data.bookCustom.userEntity.userName;
          var type = res.body.bookCustom.bookTypeEntityList;
          for(var i = 0; i<type.length ; i++){
            if(i==0){
              self.type = type[i].bookTypeName;
            }else{
              self.type = self.type + '/' + type[i].bookTypeName;
            }
          }
          self.num = res.data.bookCustom.bookWordCount;
          self.clickNum = res.data.bookCustom.bookHit;
          self.updateTime = SZXJ.getLocalTimeTwo(res.data.bookCustom.bookUpdate);
          self.updateTime1 = res.data.bookCustom.bookUpdate
          self.updateModel = res.data.bookCustom.updateCycle;
          self.bookCoverImage = res.data.bookCustom.bookCoverImage;
          self.bookIntroduction = res.data.bookCustom.bookIntroduction;
          self.userHeader = res.data.bookCustom.userEntity.userHead;
          self.userEntity = res.data.bookCustom.userEntity;
          self.sign = res.data.bookCustom.userEntity.attention;
          self.Collection =res.data.bookCustom.bookCollect;
          self.collect = res.data.bookCustom.collect;
          console.log(res.data);
          self.contentId = res.data.bookHit ? res.data.bookHit.contentId :　res.data.bookCustom.volumeCustomList[0].contentEntityList[0].contentId;
          self.lastContent = res.data.bookCustom.lastContent;
        })
      },
      closeRewardAndShare:function(){
        this.rewardBol = false;
        this.shareBol = false;
        this.shadowBol = false;
      },
      getBookRankFn:function(){
        var self = this;
        var data1 ={};
        data1.bookId = this.bookId;
        SZXJ.http(this,'get',appPathList.queryBookRank+'?bookId='+this.bookId,{},function(res){
          self.totalWorBookReward = res.data.totalWorBookReward;
          if(self.totalWorBookReward.length!=0){
            self.cardAmount = self.totalWorBookReward[0].cardAmount;
          }
        })
      },
      getRewardFn:function(){
        var _data={};
        var self = this;
        _data.amount = this.amount;
        _data.bookId = this.bookId;
        SZXJ.http(this,'get', appPathList.cardgive+"?amount="+this.amount+"&bookId="+this.bookId,{}, (response) => {
            if(response.data.code == 200){
              this.$refs.appConfirm.setMessage("打赏成功");
              self.getGoodCard();
              self.getBookRankFn();
              self.closeRewardAndShare();
            }
        }); 
      },
      getComment:function(_data){
        var self = this;
        SZXJ.http(this,'get', appPathList.findCommentAndReply+'?bookId='+this.bookId+'&pageNo='+_data.pageNo+'&pageSize='+_data.pageSize+'&status='+_data.status, {}, (res) => {
          self.comment = res.body.comment;
          self.commentCount = res.body.commentAndReplyTotalCount;
        })
      },    
      getGoodCard:function(){
        var self = this;
        var _data={};
        _data.bookId = this.bookId;
        SZXJ.http(self,'get', appPathList.cardamount, _data, (response) => {                    // 获取好人卡
          self.payCardAmount =response.data.amount.payCardAmount + response.data.amount.welfareCardAmount;
        });
      },
      openIntroduction:function(){
        if(this.objHeight){
          this.objHeight = false;
        }else{
          this.objHeight = true;
        }
      },
      updateAttention:function(){
        var _data = {};
        _data.receiveId = this.userEntity.userId;
        SZXJ.http(this,'post', appPathList.saveOrCancelAttention, _data, () => {     //保存或者取消关注
            if (this.sign) {
              this.$refs.appConfirm.setMessage('已取消关注');
                this.sign = false;
            } else {
              this.$refs.appConfirm.setMessage('已关注');
                this.sign = true;
            }
        },(err)=>{
            location.href = "/app/login"
        });
      },
      commentFn:function(a){
        console.log(a);
        SZXJ.http(this,'get', appPathList.getStatus, {}, (res) => {
          if(res.data.loginFlag){
            location.href = '/app/comment/'+a;
          }else{
            location.href = '/app/login';
          }
        })
      }
    },
    head:{
      title: '书籍页-QC轻小说',
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
  .header_book{
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: 0; left: 0;right: 0;
    z-index: 25;
  }
  .header_book:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_book .header_C1 {
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_book .header_C1 .header_back {
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_book .header_title{
    float: left;
    display: block;
    min-width: 1.88rem;
    padding-left: 0rem;
    box-sizing: border-box;
    height: 100%; 
    width: 77.5%;
  }
  .header_book .header_title span{
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
  .header_book .header_share{
    float: left;
    min-width: 0.36rem;
    width: 11.25%;
    height: 100%; 
    text-align: center;
    overflow: hidden;
  }
  .header_book .header_share .header_share_tu{
    margin-top: 0.0768rem;
    margin-bottom: 0.0768rem;
    display: inline-block;
    width: .2048rem;
    height: .2048rem;
    background-image: url('/img/app_newBook/share.png');
    background-repeat: no-repeat;
    background-size: contain;
    /*background-color: #000000;*/
  }
  .book_details{
    height: 1.4933rem;
    width: 100%;
    /*background: -webkit-linear-gradient(top,from(#9fd6d9),to(#d6ebde));
    background: -o-linear-gradient(top,from(#9fd6d9),to(#d6ebde));
    background: -moz-linear-gradient(top,from(#9fd6d9),to(#d6ebde));
    background: linear-gradient(top,from(#9fd6d9),to(#d6ebde));
    background-color: #d6ebde;*/
    position: relative;
    margin-top: 0.3584rem;
  }
  .book_details .book_cover{
    border: 4px solid #fff;
    width: 0.7211rem;
    height: 1.024rem;
    margin: 0.1152rem 0.1067rem 0 0.2091rem;
    /*background-color: #000000;*/
    border-radius: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .book_details .book_information{
    display: inline-block;
    /*background-color: red;*/
    margin-top: 0.12rem;
    height: 1.024rem;
    width: 1.9029rem;
    vertical-align: top;
  }
  .book_details .book_information .book_span{
    /*background-image: url(/img/app_newBook/menu_07.gif);*/ 
    background-repeat: no-repeat;
    background-position: center;
    width: 0.128rem; 
    height: 0.128rem;
    display: inline-block;
    background-size: contain;
  }
  .book_details .book_information .book_part{
    padding: 0.0271rem 0;
  }
  .book_details .book_information span{
    vertical-align: bottom;
    display: inline-block;
    font-size: 0.1024rem;
    color: #f2f2f2;
  }
  .book_details .book_information .book_title{
    padding: 0.0078rem 0;
    margin-left: 0.0427rem;
  }
  .book_share{
    min-height: 0.3755rem;
    background-color: #fff;
  }
  .book_share .book_left_reward{
    width: 50%;
    display: inline-block;
    font-size: 0.0939rem;
    text-align: center;
    padding: 0.0853rem 0;
  }
  .book_share .book_left_reward .qiu_reward{
    width: 0.2048rem;
    height: 0.2048rem;
    border-radius: 100%;
    background-image: url(/img/app_newBook/reward.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    margin-right: 0.0427rem;
  }
  .book_share .book_right_share{
    width: 50%;
    display: inline-block;
    font-size: 0.0939rem;
    text-align: center;
    padding: 0.0853rem 0;
    position: relative;
  }
  .book_share .book_right_share:after{
    content: '';
    width: 0.0128rem;
    height: 0.128rem;
    background-color: #ccc;
    position: absolute;
    left: -0.0064rem;
    top: 0.1237rem;
  }
  .book_share .book_right_share .qiu_share{
    width: 0.2048rem;
    height: 0.2048rem;
    border-radius: 100%;
    display: inline-block;
    margin-right: 0.0427rem;
    background-image: url(/img/app_newBook/share1.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .book_share .text_book{
    display: inline-block;
    /*height: 0.2048rem;*/
    font-size: 0.0940rem;
    padding: 0.056rem 0 0.054rem;
  }
  .book_share span{
    vertical-align: bottom;
  }
  .book_line{
    width: 100%;
    height: 0.0768rem;
    background-color: #f2f2f2;
  }
  .menuAndIntroduction{
    padding: 0 0.128rem;
    background-color: #fff;
  }
  .menuAndIntroduction .menu{
    position: relative;
    min-height: 0.128rem;
    padding: 0.128rem 0;
  }
  .menuAndIntroduction .menu:after{
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #ccc;
  }
  .menuAndIntroduction .menu .menu_name{
    float: left;
    font-size: 0.1195rem;
    font-weight: 900;
  }
  .menuAndIntroduction .menu .menu_time{
    float: right;
    font-size: 0.1195rem;
    color: #989898;
  }
  .menuAndIntroduction .introduction{
    background-color: #fff;
  }
  .menuAndIntroduction .introduction .head_introduction{
    font-size: 0.1195rem;
    font-weight: 900;
    padding: 0.128rem 0;
  }
  .menuAndIntroduction .introduction .introduction_content{
    font-size: 0.12rem;
    line-height: 1.2;
    color: #656565;
  }
  .sheild{
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .marginTop{
    margin-top: 1.19rem;
  }
  .menuAndIntroduction .introduction .introduction_control{
    width: 100%;
    height: 0.182rem;
    background-image: url(/static/img/app_newBook/top.png);
    background-position: center right;
    background-repeat: no-repeat;
    background-size: 0.1200rem 0.0650rem;
  }
  .author_msg{
    width: 100%;
    min-height: 0.7424rem;
    background-color: #ffffff;
  }
  .author_msg .author_img{
    display: inline-block;
    width: 0.512rem;
    height: 0.512rem;
    border-radius: 100%;
    margin-left: 0.128rem;
    margin-right: 0.128rem;
    margin-top: 0.1152rem  ;
    /*background-color: orangered;*/
    vertical-align: top;
  }
  .author_msg .author_info{
    display: inline-block;
    height: 0.512rem;
    width: 1.7323rem;
    margin-top: 0.1152rem;
    /*background-color: skyblue;*/
    vertical-align: top;
  }
  .author_msg .author_info .author_name{
    padding: 0.0853rem 0;
    position: relative;
  }
  .author_msg .author_info .author_introduction{
    font-size: 0.1024rem;
    color: #656565;
  }
  .author_msg .author_info .author_name *{
    display: inline-block;
    font-size: 0.1109rem;
  }
  .author_msg .author_info .author_name .author_red{
    border: 1px solid #fe6a6a;
    font-size: 0.1024rem;
    padding: 0.0043rem;
    border-radius: 2px;
    color: #fe6a6a;
    margin-left: 0.1024rem;
    /*position: absolute;
    top: 0.0853rem;
    right: 0;*/
  }
  .author_msg .author_attention{
    display: inline-block;
    height: 0.1152rem;
    min-width: 0.46rem;
    padding: 0.0427rem;
    border:2px solid #ff616f;
    border-radius: 4px;
    text-align: center;
    margin-top: 0.256rem;
    padding-top: 0.0450rem
  }
  .author_msg .author_attention .attention{
    display: inline-block;
    height: 0.1152rem;
  }
  .author_msg .author_attention span{
    display: inline-block;
    font-size: 0.0683rem;
  }
  .goodManList{
    min-height: 1.1051rem;
    width: 100%;
    background-color: #fff;
  }
  .goodManList .good_menu{
    position: relative;
    min-height: 0.128rem;
    padding: 0.128rem;
  }
  .goodManList .good_menu:after{
    content: '';
    position: absolute;
    left: 0.128rem;
    right: 0.128rem;
    bottom: 0;
    height: 1px;
    background-color: #f2f2f2;
  }
  .goodManList .good_menu .menu_name{
    float: left;
    font-size: 0.1195rem;
    font-weight: 900;
  }
  .goodManList .good_menu .menu_time{
    float: right;
    font-size: 0.1195rem;
    color: #989898;
  }
  .goodManList .good_menuList{
    height: 0.7467rem;
    /*width: 100%;*/
    /*background-color: #00B5FE;*/
    padding: 0 0.128rem;
  }
  .goodManList .good_menuList .good_menuList_brand{
    /*display: inline-block;*/
    display: flex;
    width: 72%;
    height: 0.7467rem;
    float: left;
    border-right: 1px solid #f2f2f2;
    box-sizing:border-box;
  }
  .goodManList .good_menuList .good_menuList_brand .good_part{
    flex: 1;
    padding-top: 0.0512rem;
    text-align: center;
  }
  .goodManList .good_menuList .good_menuList_brand .good_part .good_header{
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0.0768rem;
    height: 0.0768rem;
  }
  .goodManList .good_menuList .good_menuList_brand .good_part .good_portrait{
    width: 100%;
    padding-bottom: 0.06827rem;
  }
  .goodManList .good_menuList .good_menuList_brand .good_part .good_name{
    width: 100%;
    font-size: 0.1024rem;
    /*height: 0.0768rem;*/
  }
  .goodManList .good_menuList .good_menuList_first{
    /*display: inline-block;*/
    width: 28%;
    height: 0.7467rem;
    float: left;
    text-align: center;
    font-size: 0.1024rem;
  }
  .goodManList .good_menuList .good_menuList_first .good_portrait{
    padding-bottom: 0.06827rem;
    padding-top: 0.1380rem;
  }
  .book_footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.4181rem;
    display: flex;
    border-top: 1px solid #ccc;
    background-color: #fff;
    color: #000000;
  }
  .book_footer img{
    
  }
  .book_footer .footer_left{
    flex: 1;
    text-align: center;
    padding-top: 0.06827rem;
  }
  .book_footer .footer_center{
    flex: 1;
    background-color: #fedc6f;
    text-align: center;
    color: #fff;
    font-size: 0.1195rem;
    padding: 0.1493rem 0;
  }
  .book_footer .footer_right{
    flex: 1;
    text-align: center;
    padding-top: 0.06827rem;
  }
  .book_comment{
    width: 100%;
    /*background-color: #ccc;*/
  }
  .book_comment .comment_header{
    position: relative;
    min-height: 0.128rem;
    padding: 0.128rem;
  }
  .book_comment .comment_header:after{
    content: '';
    position: absolute;
    left: 0.128rem;
    right: 0.128rem;
    bottom: 0;
    height: 1px;
    background-color: #f2f2f2;
  }
  .book_comment .comment_header .header_title{
    float: left;
    font-size: 0.1195rem;
    font-weight: 900;
  }
  .book_comment .comment_list{
    box-sizing: border-box;
    padding: 0 0.128rem;
  }
  .book_comment .comment_list .comment_move{
    color: red; 
    font-size: 0.128rem;
    text-align: center; 
    display: block; 
    width: 100%; 
    padding: 0.2085rem 0 0.2005rem 0; 
    background-image:url(/img/app_newBook/red_right.png); 
    background-repeat: no-repeat; 
    background-size: 0.0725rem 0.128rem; 
    line-height: 0.11rem; 
    background-position: 1.932rem center; 
    vertical-align: bottom; 
    text-align: center; 
    margin-bottom: 0.42rem;
  }
  .book_comment .comment_list .comment_part{
    padding: 0.1024rem 0;
    position: relative;
  }
  .book_comment .comment_list .comment_part:after{
    content: '';
    position: absolute;
    left: 0rem;
    right: 0rem;
    bottom: 0;
    height: 1px;
    background-color: #f2f2f2;
  }
  .book_comment .comment_list .comment_part .comment_user{
    display: inline-block;
    width: 12%;
    /*height: 0.2731rem;*/
    /*margin-right: 0.0512rem;*/
    padding-right: 3%;
    vertical-align: top;
  }
  .book_comment .comment_list .comment_part .comment_user img{
    width: 100%;
    height: 100%;
  }
  .book_comment .comment_list .comment_part .comment_content{
    display: inline-block;
    width: 85%;
    /*min-height: 0.5rem;*/
    /*background-color: #92C202;*/
    vertical-align: top;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_content_header{
    height: 0.1024rem;
    width: 100%;
    font-size: 0.1024rem;
    padding-bottom: 0.0256rem;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_content_header .comment_user_name{
    font-size: 0.1024rem;
    float: left;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_content_header .comment_user_time{
    font-size: 0.1024rem;
    float: right;
    color: #989898;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_user_reply{
    font-size: 0.1195rem;
    padding-bottom: 0.0512rem;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_other_reply{
    /*min-height: 0.8rem;*/
    background-color: #f2f2f2;
    padding: 0.0853rem;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_part{
    padding: 0.0256rem 0;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_part span{
    font-size: 0.0853rem;
  }
  .book_comment .comment_list .comment_part .comment_content .comment_other_reply .comment_reply_count{
    color: #c5eef3;
  }
  .share_bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5019rem;
    background-color: #fff;
    z-index: 32;
  }
  .share_bottom .share_header{
    font-size: 0.128rem;
    text-align: center;
    padding-top: 0.1195rem;
  }
  .share_bottom .share_dirction{
    /*padding: 0.128rem;*/
  }
  .share_bottom .share_dirction .share_part{
    width: 33%;   
    display: inline-block;
    text-align: center;
  }
  .share_bottom .share_dirction .share_part img{
    width: 0.3499rem;
    height: 0.3499rem;
    padding: 0.0512rem;
  }
  .share_bottom .share_dirction .share_part p{
    font-size: 0.1024rem;
  }
  .shadow{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 30;
  }
  .reward_bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    /*min-height: 2.9440rem;*/
    background-color: #fff;
    z-index: 32;
  }
  .reward_bottom .reward_title{
    height: 0.3755rem;
    padding: 0 0.128rem;
    position: relative;
  }
  .reward_bottom .reward_title:after{
    content: '';
    position: absolute;
    left: 0.128rem;
    right: 0.128rem;
    bottom: 0;
    height: 1px;
    background-color: #f2f2f2;
  }
  .reward_bottom .reward_title .header_title{
    width: 100%;
    height: 0.3755rem;
    text-align: center;
    line-height: 0.3755rem;
    color: #ff616f;
    font-size: 0.1536rem;
  }
  .reward_bottom .reward_title a{
    color: #ff616f;
    background-image: url(/img/app_newBook/red_right2.png);
    background-repeat: no-repeat; 
    background-size: 0.065rem 0.13rem; 
    background-position: center right;
    padding-right: 0.075rem;
    font-size: 0.1195rem;
    position: absolute;
    right: 0.14rem;
    top: 0.1280rem;
    bottom: 0.1280rem;
  }
  .reward_bottom .reward_list{
    /*height: 1.3579rem;*/
    width: 100%;
    padding: 0.3243rem 0.128rem 0.2304rem 0.128rem;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  .reward_bottom .reward_list .reward_part{
    display: inline-block;
    width: 0.6657rem;
    border: 2px solid #fec359;
    border-radius: 3px;
    margin-bottom: 0.0939rem;
    vertical-align: top;
    box-sizing: border-box;
  }
  .reward_bottom .reward_card_count{
    padding: 0.1109rem 0.128rem 0.1024rem 0.128rem;
  }
  .reward_bottom .reward_card_count span{
    font-size: 0.128rem;
    display: inline-block;
  }
  .reward_bottom .reward_btn{
    height: 0.4267rem;
    background-color: #ccc;
  }
  .reward_bottom .reward_btn .Recharge{
    width: 1.3653rem;
    /*height: 0.2645rem;*/
    padding: 0.06825rem 0;
    background-color: #fedc6f;
    font-size: 0.128rem;
    text-align: center;
    border-radius: 0.0256rem;
    color: #fff;
    margin: 0.0768rem 0.2005rem 0 0.1365rem;
    display: inline-block;
  }
  .reward_bottom .reward_btn .Feeding{
    display: inline-block;
     width: 1.3653rem;
    color: #fff;
    padding: 0.06825rem 0;
    background-color: #fedc6f;
    font-size: 0.128rem;
    text-align: center;
    border-radius: 0.0256rem;
  }
  .read_menu{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 40;
    background-color: #FFF2E2;
  }
  .read_menu .menu_content{
    width: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
    min-height: 6rem;
  }
  .read_menu .menu_content .menu_head{
    width: 100%;
    font-size: 0.121rem;
    text-align: center;
    padding: 0.1192rem 0;
    position: fixed;
    top: 0;
    background-color: #fff;
  }
  .read_menu .menu_content .menu_head:after{
    content: '';
    position: absolute;
    bottom: 1px;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: #0090ff;
  }
  .read_menu .menu_content .menu_list{
    overflow: hidden;
    margin-top: 0.3717rem;
    min-height: 3rem;
  }
  .read_menu .menu_content .menu_count{
    font-size: 0.120rem;
    padding: 0.1493rem 0 0.1024rem 0.1280rem;
    position: fixed;
    top: 0.3585rem;
    width: 100%;
    background-color: #fff;
    font-weight: 800;
  }
  .read_menu .menu_content .menu_list .menu_ccc{
  }
  .read_menu .menu_content .menu_list .menu_ccc .menu_part{
    font-size: 0.1024rem;
    padding: 0.0939rem 0 0.0683rem 0.1280rem;
  }
  .marginRight{
    margin-right: 0.0939rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
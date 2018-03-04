<template>
	<div style="font-size: 12px;">
	    
      <div :style="level?'position: fixed;top: 0;bottom: 0;left: 0;right: 0;':''">
        <!--主内容-->
        <div :class="level?'content fontStyle':'content1 fontStyle'" :style="obj" ref="main" id="main">
          <div class="title">{{title}}</div>            
          <div class="content_container">
              <div v-html="content" :style="'transform: translateX('+wid_pic+'px);'" :class="[{ transitionEnd: styBol }, mainContent]" ref="content" id="mainTouch">{{content}}</div>
              <div class="goNext" @click = "nextCon()" v-show="!level" style="margin: 0 auto;text-align: center; padding: 0.25rem 0; z-index: 23; position: relative;">
                <a href="javascript:;" >点击进入下一章</a>
              </div>
          </div>
          <div class="content_page" style="position: fixed; left:15px; bottom: 0.15rem; color: #989898 !important;font-size: 0.1024rem !important;" v-if="level">{{page}}/{{pages}}</div>
        </div>
      </div>
      <!--底部-->
      <appConfirm ref="appConfirm"></appConfirm>
      <transition name="fade">
        <div class="read_bottom" v-if = "readBottom">
          <div class="directory" @click="showMenu()">
            <a href="javascript:;" >
              <img src="/img/app_read/menu.png"/>
              <p>目录</p>
            </a>
          </div>
          <div class="night" @click="showReset()">
            <a href="javascript:;" >
              <img src="/img/app_read/size.png"/>
              <p>设置</p>
            </a>
          </div>
          <div class="font" @click="updataModel()">
            <a href="javascript:;" v-if="model" key="night">
              <img src="/img/app_read/Moon.png"/>
              <p>夜间</p>
            </a>
            <a href="javascript:;" v-else key="daytime">
              <img src="/img/app_read/sunlight.png"/>
              <p>日间</p>
            </a>
          </div>
          <div class="comment" @click="showComment(bookId)">
            <a href="javascript:;" >
              <img src="/img/app_read/com.png"/>
              <p>评论</p>
            </a>
          </div>
        </div>
      </transition>
      <!--上下章节切换-->
      <transition name="fade">
        <div class="section" v-if = "section">
          <a href="javascript:;" class="preContent" @click="preContent()">上一章</a>
          <a href="javascript:;" class="nextContent" @click="nextCon()">下一章</a>
        </div>
      </transition>
      <!--设置部分-->
      <transition name="fade">
        <div class="size" v-if="setBol"> 
            <div class="typeface">
              <div class="setFontSize">
                <span><img src="/img/app_read/36573c0fa183d35.png" @click="reduce()" /></span>
                <div class="sizeRange">
                   <div class="qiu" v-if="qiuNumber==1" style="left:-0.0640rem"></div>
                   <div class="qiu" v-if="qiuNumber==2" style="left:0.1109rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==3" style="left:0.2858rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==4" style="left:0.4607rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==5" style="left:0.6356rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==6" style="left:0.8105rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==7" style="left:0.9854rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==8" style="left:1.1603rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==9" style="left:1.3352rem ;"></div>
                   <div class="qiu" v-if="qiuNumber==10" style="left:1.5101rem ;"></div>
                   <div class="line_4"></div>
                </div>
                <span><img src="/img/app_read/b6d116ed94491e05e4177ccfd02b1d07.png" @click="increase()" /></span>
              </div>
              <div class="fontFamily btn" @click="showFamily()">默认字体</div>
            </div>
            <div class="setBackColor">
              <span>背景</span>
              <div class="onePart" :style="active1==1?'background-color: rgb(234,234,239); box-shadow: 0 0 5px #000;':'background-color: rgb(234,234,239)'" @click="setBackColor('rgb(234,234,239)',1)"></div>
              <div class="onePart" :style="active1==2?'background-color: rgb(250,249,222); box-shadow: 0 0 5px #000;':'background-color: rgb(250,249,222)'"  @click="setBackColor('rgb(250,249,222)',2)"></div>
              <div class="onePart" :style="active1==3?'background-color: #FFF2E2; box-shadow: 0 0 5px #000;':'background-color:#FFF2E2'"  @click="setBackColor('#FFF2E2',3)"></div>
              <div class="onePart" :style="active1==4?'background-color: rgb(253,230,224); box-shadow: 0 0 5px #000;':'background-color: rgb(253,230,224)'"  @click="setBackColor('rgb(253,230,224)',4)"></div>
              <div class="onePart" :style="active1==5?'background-color: rgb(227,237,205); box-shadow: 0 0 5px #000;':'background-color: rgb(227,237,205)'"  @click="setBackColor('rgb(227,237,205)',5)"></div>
              <div class="onePart" :style="active1==6?'background-color: rgb(220,246,221); box-shadow: 0 0 5px #000;':'background-color: rgb(220,246,221)'"  @click="setBackColor('rgb(220,246,221)',6)"></div>
              <div class="onePart" :style="active1==7?'background-color: rgb(233,235,254); box-shadow: 0 0 5px #000;':'background-color: rgb(233,235,254)'"  @click="setBackColor('rgb(233,235,254)',7)"></div>
            </div>
            <div class="readModel">
              <span class="span1">阅读模式</span>
              <span :class="level?'span2 btn active':'span2 btn'" @click = "flip(1)">左右翻页</span>
              <span :class="level?'span2 btn':'span2 btn active'" @click = "flip(2)">上下翻页</span>
            </div>
        </div>
      </transition>
      <!--字体设置-->
      <transition name="fade">
        <div class="theFamily" v-show="family">
          <div v-for="(obj,index) in temps" class="f_one" @click="setFontFamily(obj.num)" :style="index==2?'border-bottom: none;':''">
            <span v-if="obj.status==1" :style="obj.use==1?'color:red':''">默认字体</span>
            <span :style="obj.use==1?'color:red':''" v-else>{{obj.name}}</span>
            <span class="span_yes" v-if="obj.use"></span>
            <!--<span class="span_btn btn" v-else @click.stop = "downFamily()">下载</span>-->
          </div>
        </div>
      </transition>
      <!--头部-->
      <transition name="fade">
        <div class="header_ReadBook" v-show="readNav">
          <div class="header_C1" @click = "goBack()">
            <div class="header_back"></div>
          </div>
          <div class="header_Text"><span>{{bookName}}</span></div>
          <div class="header_C">
            <transition name="fade">
              <div class="addCollect btn" v-if="!sign" @click="joinCollect()">加入收藏</div>
              <div class="unCollect btn"  v-else @click="joinCollect()">已收藏</div>
            </transition>
          </div> 
        </div>
      </transition>
     	<!--点击区域-->
      <!--左右-->
      <!--<div class="verticalTap" v-if ="verTap" >
        <div class="left" @click="prePage()"></div>
        <div class="right" @click="nextPage()">
             <div class="center" @click.stop="openMenu()"></div>
        </div>
      </div>-->
      
      <!--<div class="showMenu" @click = "openMenu()" v-if = "showMenu1"></div>-->
      <div class="transfer" v-show="transfer" @click="closeNav"></div>
      <div id="touch" class="touch" v-show="touch"></div>
      <!--侧边目录部分-->
  	  <transition name="fade">
        <div class="read_menu" v-show="bookMenu" >
          <div class="shadow" @click.stop="delMenu()"></div>
          <div class="menu_content" id="readMenu">
            <div class="menu_head">目录</div>
            <div class="menu_count">共{{allLength}}章</div>
            <div class="menu_list">
              <div class="menu_ccc" v-for ="(obj,index) in volumeCustomList">
                <div class="menu_part" style="background-color: #f2f2f2;">{{obj.volumeName}}</div>
                <div v-for="(temp,index) in obj.contentEntityList" class="menu_part" @click = "readContent(temp.contentId,bookId)" :style="temp.contentId==contentId?'color:red':''">
                  {{temp.contentTitle}}
                  <p v-if="lastContent.contentId==temp.contentId" style="color: #555; margin: 0.08rem 0;">{{updateTime}} 更新</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!--上下-->
      <!--<div class="transverseTap" v-if ="tranTap" id="tran">-->
      <!--</div>-->
  </div>
</template>

<script>
import axios from "axios"
import appPathList from "~/components/conf-app"
import SZXJ from "~/components/vueHttp-app"
import appConfirm from "~/components/AppConfirm"
export default{
  components:{
    'appConfirm':appConfirm
  },
  data:function(){
      return{
          szxj:SZXJ,
          Path:appPathList,
          bookId:'',
          contentId:'',
          title:"",
          content:'',
          b_color1:'',
          f_color1:'',
          font_size:16,
          obj:{
            color:'#282828',
            fontSize:'16px',
            backgroundColor:'rgb(234,234,239)',
            fontFamily:'微软雅黑',
          },
          readNav:false,
          sign:false,
          readBottom:false,
          model:true,
          bookMenu:false,
          setBol:false,
          qiuNumber:1,
          active1:1,
          f_family:'',
          f_family_params:1,
          level:true,
          temps:[],
          family:false,
          transfer:false,
//        verTap:false,       //水平翻页
          tranTap:true,         //上下翻页
//        tranTap_backups:false,     //上下翻页备份
//        verTap_backups:false,         //水平翻页备份
          wid_pic:0,
          hei_pic:0,
          bookName:'',
          previousContent:{},
          nextContent:{},
          contentEntityList:[],
          loginFlag:false,
          page:1,
          section:false,
          startpageX:0,
          startpageY:0,
          endpageX:0,
          endpageY:0,
          pages:1,
          offsetWidth:0,
          touch:true,
//        showMenu1:false,
          styBol:true,
          transitionEnd:'transitionEnd',
          mainContent:'mainContent',
          volumeCustomList:[],
          fullWidth:0,
          record:'',
          lastContent:{},
          allLength:0,
          nextContentId:0,
          preContentId:0,
          readContentList:[],
          devWidth:0,
      }
  },
  asyncData:function(context){
    var obj = {};
    obj.temps =[
      {
        font_family:"sansSerif",
        name:"微软雅黑",
        status:1,
        down:true,
        use:1,
        num:1
      },{
        font_family:"Song_Ti",
        name:"宋体",
        status:0,
        down:false,
        use:0,
        num:2
      },{
        font_family:"Kai_Ti",
        name:"楷体",
        status:0,
        down:false,
        use:0,
        num:3
      }
    ];
    obj.obj={
            color:'#282828',
            fontSize:'0.1024',
            backgroundColor:'rgb(234,234,239)',
            fontFamily:'微软雅黑',
    }
    if(context.req.headers.cookie){
      //检查cookie是否有tamps
      if(SZXJ.getCookie(context.req.headers,'tamps')){
        obj.obj = JSON.parse(SZXJ.getCookie(context.req.headers,'tamps'));
        var b = 0;
        for(var i=0; i<obj.temps.length;i++){
          if(obj.obj.fontFamily == obj.temps[i].font_family){
            obj.temps[i].use = 1;
            b = 1;
          }else{
            obj.temps[i].use = 0;
          }
        }
        if(b==0){
          obj.temps[0].use = 1;
        }
        obj.font_size = parseFloat(obj.obj.fontSize.split('rem')[0]);
      }
      //检查cookie是否有model
      if(SZXJ.getCookie(context.req.headers,'model')){
        obj.model = eval(SZXJ.getCookie(context.req.headers,'model'));
        if(obj.model){
        }else{
          obj.b_color1 = obj.obj.backgroundColor;
          obj.obj.backgroundColor = "#282828";
          obj.obj.color = "#c3c3c3";
        }
      }
      //检查cookie是否有level
      if(SZXJ.getCookie(context.req.headers,'level')){
        obj.level = eval(SZXJ.getCookie(context.req.headers,'level'));
        if(!obj.level){
          obj.touch = false;
//        obj.showMenu1 = true;
        }else{
          obj.touch = true;
        }
      }
      //检查cookie是否有qiuNumber
      if(SZXJ.getCookie(context.req.headers,'qiuNumber')){
        obj.qiuNumber = SZXJ.getCookie(context.req.headers,'qiuNumber')
      }
      //检查cookie是否有active1
      if(SZXJ.getCookie(context.req.headers,'active1')){
        obj.active1 = SZXJ.getCookie(context.req.headers,'active1')
      }
      //检查cookie是否有contentId
      if(SZXJ.getCookie(context.req.headers,'contentId')){
        obj.contentId = SZXJ.getCookie(context.req.headers,'contentId')
      }
      //检查cookie是否有bookId
      if(SZXJ.getCookie(context.req.headers,'bookId')){
        obj.contentId = SZXJ.getCookie(context.req.headers,'bookId')
      }
      //
//    if(SZXJ.getCookie(context.req.headers,'tranTap')){
//      obj.contentId = SZXJ.getCookie(context.req.headers,'bookId')
//    }
    }
    obj.contentId = context.params.id.split("&")[0];
    obj.bookId = context.params.id.split("&")[1];
    return axios.get(appPathList.findContent+'?contentId='+obj.contentId +'&bookId='+obj.bookId).then(function(res){
      obj.title = res.data.content.contentTitle;
      obj.content = res.data.content.content;
      obj.bookName = res.data.content.bookName;
      obj.previousContent = res.data.previousContent;
      obj.nextContent = res.data.nextContent;
      return obj
    }).catch(function(err){
      console.log(err); 
    })
  },
  mounted:function(){
    
    this.$nextTick(function(){
      this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
      this.getCache();
      this.offsetWidth = this.$refs.content.clientWidth + 16;
      this.offsetHeight = window.screen.availHeight;
      this.fullWidth = this.$refs.main.clientWidth;
      var self = this;
      document.getElementById('touch').addEventListener('touchstart', function(e){
        self.touchstartFn(e);
        if(self.level){
          self.$set(self,'styBol',false);
          self.wid_picFlag = self.wid_pic;
          e.preventDefault();
        }else{
          e.preventDefault();
        }
        e.preventDefault();
      },false);
      document.getElementById('touch').addEventListener('touchmove', function(e){
        if(self.level){
          var flag = self.startpageX - e.touches[0].pageX; // 如果大于0 --> 小于0 <--
          if(flag <= self.offsetWidth && flag >= (0-self.offsetWidth) ){
            self.wid_pic = self.wid_picFlag - flag;
          }else if(flag > self.offsetWidth){
            self.wid_pic = -self.offsetWidth;
          }else if(flag < (0-self.offsetWidth)){
            self.wid_pic = self.offsetWidth;
          }
          e.preventDefault();
        }else{
        }
      },false);
      document.getElementById('touch').addEventListener('touchend', function(e){
        var flagX = self.startpageX - e.changedTouches[0].clientX;
        if(self.level){
          var flagX = self.startpageX - e.changedTouches[0].clientX; // 如果大于0 --> 小于0 <--
          self.$set(self,'styBol',true);
          var pageX = e.changedTouches[0].clientX;
          if(flagX<= self.offsetWidth && flagX >= (0-self.offsetWidth) ){
            if(flagX >0){
              self.nextPage(e);
            }else if(flagX ==0 ){
              if(pageX>=0 && pageX<self.fullWidth/3){
                self.prePage(e);
              }else if(pageX>=(self.fullWidth/3) && pageX<((self.fullWidth/3)*2)){
                self.openMenu();
              }else if(pageX>((self.fullWidth/3)*2)){
                self.nextPage(e);
              }
            }else{
              self.prePage(e);
            }
          }else if(flagX > self.offsetWidth){
            self.nextPage(e);
          }else if(flagX < (0-self.offsetWidth)){
            self.prePage(e)
          }
          e.preventDefault();
        }
      },false)
      document.getElementById('mainTouch').addEventListener('touchstart',function(e){
        self.touchstartFn(e);
      },false);
      document.getElementById('mainTouch').addEventListener('touchmove', function(e){
      },false);
      document.getElementById('mainTouch').addEventListener('touchend',function(e){
        var flagY = self.startpageY - e.changedTouches[0].clientY;
        if(!self.level){
          if(flagY==0){
            if(self.startpageY <= (self.offsetHeight*0.4)){
              self.prePageFn();
            }else if(self.startpageY >= (self.offsetHeight*0.6)){
              self.nextPageFn();
            }else{
              if(self.startpageX < self.fullWidth/3){
                self.prePageFn();
              }else if(self.startpageX >= self.fullWidth/3 && self.startpageX <= ((self.fullWidth/3)*2)){
                self.openMenu();
              }else{
                self.nextPageFn();
              }
            }
          }
        }
      },false)
    });
  },
  methods:{
    goBack:function(){
        history.back();
    },
    //下一页
    nextPage:function(){
      if(this.page < this.pages){
      	this.page = this.page+1;
      	this.wid_pic = 0 - this.offsetWidth*(this.page -1);
      }else{
      	if(this.nextContent){
      	  this.styBol = false;
          this.title = this.nextTitleCache;
          this.$set(this,'content', this.nextContentCache);
          this.previousContent = this.nextPreviousContentCache;
          this.nextContent = this.nextNextContentCache;
          this.contentId = this.nextContentId;
          this.wid_pic = 0;
          this.page = 1;
          this.$nextTick(function(){
            this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
            this.page = 1;
            this.wid_pic = 0;
            if(!this.level){
              window.scrollTo(0,0);
            }
            this.getCache();
          });
        }else{
          this.wid_pic = -this.offsetWidth*(this.pages -1);
          this.$refs.appConfirm.setMessage("没有下一章节了");
        }
      }
    },
    //上下翻页点击进入下一页
    nextPageFn:function(){
      this.recurseFn(30,1);
    },
    //递归
    recurseFn:function(count,b){
      if(b>0){
        if (count > 0) {
          // 执行部分
          count = count - 1;
          var self = this;
  //      var offsetHeight  
          setTimeout(function(){
            var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            var height = self.offsetHeight;
            document.body.scrollTop = top + height/30;
            self.recurseFn(count,b);
          },10)
        }
      }else{
        if (count > 0) {
          // 执行部分
          count = count - 1;
          var self = this;
          setTimeout(function(){
            var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            var height = self.offsetHeight;
            document.body.scrollTop = top - height/30;
            self.recurseFn(count,b);
          },10)
        }
      }
      
    },
    //展示导航栏和设置栏
    openMenu:function(){
      if(!this.readNav){
        this.readNav = true;
        this.readBottom = true;  
        this.section = true;
        this.$set(this,'readNav',true);
        this.$set(this,'readBottom',true);
        this.$set(this,'section',true);
        this.$set(this,'touch',false);
        var self = this;
        setTimeout(function(){
          self.$set(self,'transfer',true);
        },500)
      }else{
        this.closeNav();
      }
    },
    //上一页
    prePage:function(){
    	if(this.page <= 1){
    		if(this.previousContent){
          this.title = this.preTitleCache;
          this.content = this.preContentCache;
          this.previousContent = this.prePreviousContentCache;
          this.nextContent = this.preNextContentCache;
          this.contentId = this.preContentId;
          this.styBol = false;
          this.$nextTick(function(){
            this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
            this.page = this.pages;
            this.wid_pic = 0 - this.offsetWidth*(this.page -1);
            if(!this.level){
              window.scrollTo(0,0);
            }
            this.getCache();
          });
        }else{
          this.wid_pic = 0;
          this.$refs.appConfirm.setMessage("没有上一章了");
        }
    	}else{
    		this.page = this.page - 1;
    		this.wid_pic =0 - this.offsetWidth*(this.page -1);
    	}
    },
    //上下翻页的前一页
    prePageFn:function(){
      this.recurseFn(30,0);
    },
    
    //  前一章
    preContent:function(){
      console.log(this.previousContent);
      if(this.previousContent){
        this.title = this.preTitleCache;
        this.content = this.preContentCache;
        this.previousContent = this.prePreviousContentCache;
        this.nextContent = this.preNextContentCache;
        this.contentId = this.preContentId;
        this.styBol = false;
        this.$nextTick(function(){
          this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
          this.page = 1;
          this.wid_pic = 0 - this.offsetWidth*(this.page -1);
          if(!this.level){
            window.scrollTo(0,0);
          }
          this.getCache();
        });
      }else{
        console.log(1231242);
        console.log(this.$refs)
        this.$refs.appConfirm.setMessage("没有上一章了");
      }
    },
    //后一章
    nextCon:function(){
      if(this.nextContent){
        this.title = this.nextTitleCache;
        this.content = this.nextContentCache;
        this.previousContent = this.nextPreviousContentCache;
        this.nextContent = this.nextNextContentCache;
        this.contentId = this.nextContentId;
        this.ttt = false;
        this.$nextTick(function(){
            this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
            this.page = 1;
            this.wid_pic = 0;
            if(!this.level){
              window.scrollTo(0,0);
            }
            this.getCache();
        });
      }else{
        this.$refs.appConfirm.setMessage("没有下一章节了");
      }
    },
    //设置字体
    setFontFamily:function(a){
//  	this.family = false;
    	for(var i = 0;i<this.temps.length;i++){
    		if(this.temps[i].num == a){
    			this.temps[i].use = 1;
    			this.obj.fontFamily = this.temps[i].font_family;
    		}else{
    			this.temps[i].use = 0;
    		}
    	}
    	this.page = 1;
    	SZXJ.setCookie('tamps',JSON.stringify(this.obj));
    	SZXJ.setCookie('qiuNumber',this.qiuNumber);
    },
    //加入收藏
    joinCollect:function(){
        var _data = {};
        _data.bookId = this.bookId;
        SZXJ.http(this,'get', appPathList.getStatus, {}, (response) => {
            if(response.data.loginFlag) {
                this.loginFlag = response.data.status.flag;
                SZXJ.http(this,'post', appPathList.saveOrDeleteBookCollect, _data, (response) => {         //保存或者取消收藏
                    if (this.sign) {
                      this.sign = false;
                    } else {
                      this.sign = true;
                    }
                },(err)=>{});
            }else{
              var con = confirm("你还未登录！！！是否需要前往登录页面");
              if(con){
                location.href = '/app/login';
              }else{
                
              }
            }
        });
    },
    //模式变更，日间和夜间
    updataModel:function(){
        if(this.model){
          this.model = false;
          this.b_color1 = this.obj.backgroundColor;
          this.obj.backgroundColor = "#282828";
          this.obj.color = "#c3c3c3";
        }else{
          this.model = true;
          this.obj.backgroundColor = this.b_color1;
          this.obj.color = "#282828";
        }
        SZXJ.setCookie('model',JSON.stringify(this.model));
    },
    //展示目录部分
    showMenu:function(){
        this.getMenuFn();
        this.bookMenu = true;
        this.setBol = false;
        this.touch = false;
        if(this.level == false){
          this.level = true;
          this.record = true;
        }
        this.family = false;
    },
    delMenu:function(){
        this.bookMenu = false;
        if(this.record){
          this.level = false;
        }else{
          this.level = true;
        }
        
    },
    //展示设置栏
    showReset:function(){
      this.section = false;
      this.family = false;
      if(this.setBol){
        this.setBol = false;
      }else{
        this.setBol = true;
      }
    },
    //减少字体
    reduce:function() {
      if(this.qiuNumber<2){
        this.font_size = 16;
        this.qiuNumber = 1;
      }else{
        this.font_size = this.font_size - 2;
        this.qiuNumber = this.qiuNumber - 1;
      }
      this.obj.fontSize = this.font_size.toString()+"px";
      this.$nextTick(function(){
        this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
        this.page = 1;
      })
      SZXJ.setCookie('tamps',JSON.stringify(this.obj));
      SZXJ.setCookie('qiuNumber',this.qiuNumber);
    },
    //增大字体
    increase:function(){
      if(this.qiuNumber>9){
        this.font_size = 36;
        this.qiuNumber = 10;
      }else{
        this.font_size =this.font_size + 2;
        this.qiuNumber = this.qiuNumber + 1;
      }
      this.obj.fontSize = this.font_size.toString()+"px";
      this.$nextTick(function(){
        this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
        this.page = 1;
      })
      SZXJ.setCookie('tamps',JSON.stringify(this.obj));
      SZXJ.setCookie('qiuNumber',this.qiuNumber);
    },
    //设置背景颜色
    setBackColor:function(a,b){
        this.obj.backgroundColor = a;
        this.active1 = b;
        SZXJ.setCookie('tamps',JSON.stringify(this.obj));
        SZXJ.setCookie('active1',this.active1);
        if(this.model==false){
          this.model = true;
          this.obj.color = "#282828";
          SZXJ.setCookie('model',JSON.stringify(this.model));
        }
    },
    //展示字体设置
    showFamily:function(){
        this.family = true;
        this.setBol = false;
    },
    //评论跳转
    showComment:function(a){
      location.href="/app/commentFirst/"+a;
    },
    //关闭导航栏和设置栏
    closeNav:function(e){
      this.readNav = false;
      this.readBottom = false;
      this.transfer = false;
      this.setBol = false;
      this.section = false;
      this.family = false;
      var self = this;
      setTimeout(function(){
        if(self.level){
          self.touch = true;
        }else{
          self.touch = false;
        }
      },300)
    },
    //左右翻页和上下翻页切换
    flip:function(a){
      if(a==1){
        this.offsetWidth = this.$refs.content.clientWidth + 16;
        this.level = true;
        this.record = false;
        this.tranTap = false;
        this.touch = true;
        this.$nextTick(function(){
          this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
        })
      }
      if(a==2){
        this.wid_pic = 0;
        this.level = false;
        this.record = false;
        this.tranTap = true;
        this.touch = false;
      }
      SZXJ.setCookie('level',JSON.stringify(this.level));
    },
    //目录部分点击章节变更内容
    readContent:function(c,b){
      this.getContentFn(b,c);
      this.page = 1;
    },
    //字体下载
    downFamily:function(){
      
    },
    //记录初始触摸区域
    touchstartFn:function(e){
      this.startpageX = e.touches[0].clientX;
      this.startpageY = e.touches[0].clientY;
    },
    //缓存函数
    getCache:function(){
      if(this.previousContent){
        this.getPreContent(this.previousContent.contentId,this.bookId);
      }
      if(this.nextContent){
        this.getNextContent(this.nextContent.contentId,this.bookId);
      }
    },
    //.........
    //请求函数
    //.........
    //获取书籍目录
    getMenuFn:function(){
      var data = {
        bookId:this.bookId
      }
      SZXJ.http(this,'get',appPathList.queryBookDirectory+"?bookId="+this.bookId,{},(res)=>{
        this.volumeCustomList = res.data.bookCustom.volumeCustomList;
 
        this.lastContent = res.data.bookCustom.lastContent;
        for(var i = 0; i<this.volumeCustomList.length;i++){
          this.allLength = this.allLength + this.volumeCustomList[i].contentEntityList.length;
        }
        this.updateTime = SZXJ.getLocalTimeTwo(res.data.bookCustom.bookUpdate);
      },(err)=>{
      })
    },
    //获取章节内容
    getContentFn:function(a,b){
      SZXJ.http(this,'get',appPathList.findContent+'?contentId='+b +'&bookId='+a,{},(res)=>{
          this.title = res.data.content.contentTitle;
          this.content = res.data.content.content;
          this.contentId = res.data.content.contentId;
          this.bookName = res.data.content.bookName;
          this.previousContent = res.data.previousContent;
          this.nextContent = res.data.nextContent;
          this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
          this.offsetWidth = this.$refs.content.clientWidth + 16;
          var self = this;
          this.bookMenu = false;
          this.$nextTick(function(){
            this.pages = Math.ceil(this.$refs.content.scrollWidth/(this.$refs.content.clientWidth+16));
          })
          self.getCache();
      },(err)=>{
      })
    },
    //获取下一章节内容
    getNextContent:function(c,d){
      SZXJ.http(this,'get',appPathList.findContent+'?contentId='+c +'&bookId='+d,{},(res)=>{
          this.nextTitleCache = res.data.content.contentTitle;
          this.nextContentCache = res.data.content.content;
          this.nextPreviousContentCache = res.data.previousContent;
          this.nextNextContentCache = res.data.nextContent;
          this.nextContentId = res.data.content.contentId
      },(err)=>{
      })
    },
    //获取上一章节内容
    getPreContent:function(c,d){
      SZXJ.http(this,'get',appPathList.findContent+'?contentId='+c +'&bookId='+d,{},(res)=>{
          this.preTitleCache = res.data.content.contentTitle;
          this.preContentCache = res.data.content.content;
          this.prePreviousContentCache = res.data.previousContent;
          this.preNextContentCache = res.data.nextContent;
          this.preContentId = res.data.content.contentId
      },(err)=>{
      })
    }
  },
  head:{
      title: '阅读页-QC轻小说',
      meta: [
        { charset: 'UTF-8' },
        { name: 'apple-touch-fullscreen', content: 'yes' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: "apple-mobile-web-app-capable",content:"yes"},
        { name: "apple-mobile-web-app-status-bar-style",content:"default"},
        { name: "description",content:"轻小说章节"},
        { hid: "1",content:"no-cache", "http-equiv": "pragma"},
        { hid: "3",content:"no-cache", "http-equiv": "cache-control"},
        { hid: "2",content:"0", "http-equiv":"expires"}
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
	.fontStyle * {
		color: inherit !important;
		font-family: inherit !important;
		font-size: inherit !important; 
	}
  .header_ReadBook {
    height: 0.3584rem;
    background-color: #FFFFFF;
    position: fixed; top: 0; left: 0;right: 0;
    z-index: 30;
  }
  .header_ReadBook:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #ffc200;
  }
  .header_ReadBook .header_C {
    float: left;
    min-width: 0.66rem;
    height: 100%; 
    text-align: center;
    overflow: hidden;
    width: 20.625%;
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
    background-image: url('/img/app_read/header_back.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .header_ReadBook .header_C .addCollect {
    background-color: #6BC1E4;
    display: inline-block;
    /*height: 0.1962rem;*/
    width: 0.5034rem;
    border-radius: 3px;
    color: #FFFFFF;
    margin-top: 0.0792rem;
    margin-bottom: 0.0792rem;
    padding-top: 0.04rem;
    padding-bottom: 0.04rem;
    line-height: 0.12rem;
    font-size: 0.08106rem;
  }
  .header_ReadBook .header_C .unCollect {
    background-color: #000000;
    display: inline-block;
    /*height: 0.1962rem;*/
    width: 0.5034rem;
    border-radius: 3px;
    color: #FFFFFF;
    margin-top: 0.0792rem;
    margin-bottom: 0.0792rem;
    padding-top: 0.04rem;
    padding-bottom: 0.04rem;
    line-height: 0.12rem;
    font-size: 0.08106rem;
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
  .content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .content1{ 
  }
  .content .title{
    font-size: 0.1024rem !important;
    padding: 0.064rem 0.120rem;
    color: #989898 !important;
  }
  .content1 .title{
    font-size: 0.1024rem !important;
    padding: 0.064rem 0.120rem;
    color: #989898 !important;
  }
  .content .content_container{
    position: absolute;
    left: 0;
    top: 0.256rem;
    bottom: 0.264rem;
    overflow: hidden;
    margin: 0 15px;
    text-align: justify;
  }
  .content1 .content_container{
    overflow: hidden;
    margin: 0 15px 0 15px;
    text-align: justify;
  }
  .content .content_container .mainContent{
    /*overflow: visible;*/
    height: 100%;
    -webkit-columns: calc(100vw - 30px) 1;
    -webkit-column-gap: 16px;
    columns: calc(100vw - 30px) 1;
    column-gap: 16px;
    color: #282828;
  }
  .content .content_container .mainContent * {
    backface-visibility: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .content1 .content_container .mainContent *{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .content .content_container .goNext{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .content1 .content_container .mainContent{
    color: #282828;
  }
  .content .content_container .mainContent p{
  	margin: 0.05rem 0 !important;
  	line-height: 1.5
  }
  .content1 .content_container .mainContent p{
    margin: 0.05rem 0 !important;
    line-height: 1.5
  }
  .read_bottom{
    height: 0.3755rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #FFFFFF;
    text-align: center;
    z-index: 30;
  }
  .read_bottom:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: #c3c3c3;
  }
  .read_bottom a img{
    display: block;
    height: 0.1877rem;
    width: 0.1877rem;
    margin:0.01rem ;
    /*margin-top: 0.0427rem;*/
  }
  .read_bottom a{
    display: inline-block;
    /*height: 100%;*/
    padding: 0.0262rem 0;
  }
  .read_bottom a p{
    display: block;
  	font-size: 0.0853rem;
  }
  .read_bottom .directory{
    flex: 1;
  }
  .read_bottom .font{
    flex: 1;
  }
  .read_bottom .night{
    flex: 1;
  }
  .read_bottom .comment{
    flex: 1;
  }
  .read_menu{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 40;
  }
  .read_menu .shadow{
    width: 10.67%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    bottom:0;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }
  .read_menu .menu_content{
    width: 89.33%;
    height: auto;
    background-color: #FFFFFF;
    overflow: hidden;
    float: right;
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
    margin-top: 0.7311rem;
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
  .size{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0.3755rem;
    min-height: 1.0496rem;
    background-color: rgba(255,255,255,0.7);
    border-top: 1px solid #c3c3c3;
    padding: 0 0.128rem;
    z-index: 30;
  }
  .size .typeface{
    height: 0.3413rem;
    width: auto;
    border-bottom: 1px solid #C3C3C3;
    position: relative;
  }
  .size .typeface .setFontSize{
    padding: 0.1365rem 0 0 0;
  }
  .size .typeface .setFontSize span{
    display: inline-block;
  }
  .size .typeface .setFontSize img{
    height: 0.1621rem;
  }
  .size .typeface .setFontSize .sizeRange{
    width: 1.5744rem;
    height: 0.1621rem;
    display: inline-block;
    margin: 0 0.1451rem;
    position: relative;
  }
  .size .typeface .setFontSize .sizeRange .qiu{
    width: 0.1280rem;
    height: 0.1280rem;
    background-color: #00b5fe;
    border-radius: 100%;
    margin: 2px 0;
    position: absolute;
    left: -0.0640rem;
  }
  .size .typeface .setFontSize .sizeRange .line_4{
    height: 2px;
    width: 100%;
    position: absolute;
    top: 0.0640rem;
    background-color: #00b5fe;
  }
  .size .typeface .fontFamily{
    position: absolute;
    right: 0;
    top: 0;
    width: 0.6144rem;
    /*height: 0.1580rem;*/
    margin-top: 0.1165rem;
    border: 1px solid #000;
    border-radius: 5px;
    text-align: center;
    font-size: 0.0853rem;
    padding-top: 0.0363rem;
    padding-bottom: 0.0363rem;
    padding-right: 0.023rem;
    background-image: url(/static/img/app_read/up.png);
    background-repeat: no-repeat;
    background-position: 90% center ;
    background-size: 20%;
  }
  .size .setBackColor{
    height: 0.3584rem;
    border-bottom: 1px solid #c3c3c3;
  }
  .size .setBackColor span{
    display: inline-block;
    font-size: 0.0853rem;
    padding: 0.128rem 0;
    vertical-align: top;
    width: 12.5%;
  } 
  .size .setBackColor .onePart{
    width: 12.5%;
    display: inline-block;
    width: 0.2730rem;
    height: 0.2730rem;
    border-radius: 100%;
    margin: 0.0469rem;
    text-align: center;
    line-height: 0.2730rem;
    vertical-align: top;
  }
  .size .readModel{
    /*height: 0.3499rem;*/
    width: 100%;
  }
  .size .readModel .span1{
    display: inline-block;
    /*width: 0.3413rem;*/
    height: 0.0853rem;
    font-size: 0.0853rem;
  }
  .size .readModel .span2{
    display: inline-block;
    width: 0.5598rem;
    height: 0.2133;
    font-size: 0.0853rem;
    padding:  0.060rem 0.1067rem;
    text-align: center;
    border: 1px solid #757575;
    border-radius: 4px;
    margin: 0.0353rem 0.064rem 0.0353rem 0.064rem;
  }
  .size .readModel .active{
    display: inline-block;
    width: 0.5598rem;
    height: 0.2133;
    font-size: 0.0853rem;
    padding:  0.064rem 0.1067rem;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 4px;
    background-color: #fedc6f;
    margin: 0.0353rem 0.064rem 0.0353rem 0.064rem;
  }
  .theFamily{
    height: 0.7595rem;
    background-color: #fff;
    position: fixed;
    bottom: 0.3755rem;
    left: 0;
    right: 0;
    padding-left: 0.120rem;
    z-index: 35;
  }
  .theFamily .f_one{
    font-size: 0.1024rem;
    padding: 0.0768rem 0.128rem 0.0768rem 0;
    border-bottom: 1px solid #c3c3c3;
    position: relative;
    line-height: 0.1024rem;
  }
  .theFamily .f_one .span_yes{
    position: absolute;
    right: 0.1877rem;
    top: 0.0256rem;
    bottom: 0.0256rem;
    display: inline-block;
    width: 0.2048rem;
    height: 0.2048rem;
    background-image: url(/static/img/app_read/right.png);
    background-repeat: no-repeat;
    background-origin: border-box;
    background-size: contain;
  }
  .theFamily .f_one .span_btn{
    position: absolute;
    right: 0.1877rem;
    top: 0.0450rem;
    border: 1px solid #989898;
    padding: 0.0107rem 0.0298rem 0.0085rem 0.0298rem;
    border-radius: 0.0170rem;
  }
  .verticalTap{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }
  .verticalTap .left{
    flex: 1;
  }
  .verticalTap .right{
    flex: 2;
  }
  .verticalTap .right .center{
    width: 50%;
    height: 75%;
  }
  .transverseTap{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: skyblue;
    opacity: 0.5;
  }
  .transverseTap .top{
    height: 35%;
    width: 100%;
  }
  .transverseTap .center{
    height: 30%;
    width: 100%;
  }
  .transverseTap .center .left{
    height: 100%;
    width: 15%;
    display: inline-block;
  }
  .transverseTap .center .right{
    height: 100%;
    width: 15%;
    display: inline-block;
  }
  .transverseTap .center .centerMenu{
    height: 100%;
    width: 70%;
    display: inline-block;
  }
  .transverseTap .bottom{
    height: 35%;
    width: 100%;
  }
  .transfer{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    z-index: 22;
  }
  .section{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0.3755rem;
    height: 0.256rem;
    background-color: rgba(255,255,255,0.7);
    z-index: 25;
  }
  .section .preContent{
    font-size: 0.1195rem;
    padding: 0.0682rem 0 0.0682rem 0.3456rem;
    display: inline-block;
    float: left;
    background-image: url(/img/app_read/left.png);
    background-repeat: no-repeat;
    background-position: 0.1237rem center;
    background-size: 0.1770rem 0.2000rem;
  }
  .section .nextContent{
    font-size: 0.1195rem;
    padding: 0.0682rem 0.3456rem 0.0682rem 0;
    display: inline-block;
    float: right;
    background-image: url(/img/app_read/right__.png);
    background-repeat: no-repeat;
    background-position: 0.4221rem center;
    background-size: 0.1770rem 0.2000rem;
  }
  .touch{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;  
    z-index: 20;    
  }
  .showMenu{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0rem;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    z-index: 22;
    /*z-index: ;*/
  }
  .transitionEnd{
    transition: transform .5s;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
import Vue from '../../lib/vue.min.js';
import PathList from '../../lib/apis/conf.js';
import SZXJ from '../../lib/apis/vueHttp.js';
var login = Vue.extend({
  template:'<login>    <ul class="nav-right">  <li v-if="loginFlag" class="liBlock" :style="loginImg !== \'\' ? loginImg:\'\'">    <div class="headers_display">   <span class="display_user"> <a :href="path.TemprootPath + \'/view/user_info.html\'">                                    {{ userName }}  </a>    </span> <span class="out">  <a  href="javascript:;" @click="backLoginFn">                                   退出  </a>    </span> <div class="header_more">   <a :href="path.TemprootPath + \'/view/user_info.html\'">                                    查看更多    </a>    </div>  </div>  </li>   <li v-else class="li_login">    <a href="javascript:;" @click="flagFn">                            登录/注册   </a>    </li>   <li v-if="loginFlag" class="ul_msg" >   <div class="mag_number" v-if="book+official+reply+system > 0" >                         {{ book+official+reply+system }}    </div>  <a class="msgBox" :href="path.TemprootPath + \'/view/user_info.html#!/message\'">                          消息  </a>    <ul class="li_msg_ul" > <li @click="setreplyFn" class="li_msg_li">  <a :href="path.TemprootPath + \'/view/user_info.html#!/message\'">                                  回复我的    </a>    <div class="mag_number_small" v-if="reply > 0"  >                                   {{ reply }} </div>  </li>   <li @click="setbookFn" class="li_msg_li">   <a :href="path.TemprootPath + \'/view/user_info.html#!/relevant\'">                                 作品相关    </a>    <div class="mag_number_small" v-if="book > 0" >                                 {{ book }}  </div>  </li>   <li @click="setsystemFn" class="li_msg_li"> <a :href="path.TemprootPath + \'/view/user_info.html#!/system\'">                                   系统消息    </a>    <div class="mag_number_small" v-if="system > 0" >                                   {{ system }}    </div>  </li>   <li @click="setofficialFn" class="li_msg_li">   <a :href="path.TemprootPath + \'/view/user_info.html#!/official\'">                                 官方公共    </a>    <div class="mag_number_small" v-if="official > 0" >                                 {{ official }}  </div>  </li>   </ul>   </li><li class="publication">   <a v-if="loginFlag" @click="setHref(path.TemprootPath + \'/view/user_info.html#!/bookBlockList\')" style="color:#FFFFFF">  投&nbsp;稿    </a><a v-else :href="path.TemprootPath + \'/view/login.html\'" style="color:#FFFFFF">投&nbsp;稿    </a></li></ul></login>            ',
  components: {},
  props: {
    userName: {
      type: String,
    },
    loginImg: {
      type: String,
    },
    active: {
      type: String,
    },
  },
  data:function(){
    return {
        path: PathList,
        loginFlag: false,
        number1: '',
        book:'',
        official:'',
        reply:'',
        system:'',
    }
  },
  methods: {
    setbookFn: function(){
      this.$set('book', 0);
    },
    setofficialFn: function(){
      this.$set('official', 0);
    },
    setreplyFn: function(){
      this.$set('reply', 0);
    },
    setsystemFn: function(){
      this.$set('system', 0);
    },
    backLoginFn: function() {
      this.loginFlag = false;
      window.location.reload();
      var _data = {};
      SZXJ.http(this,'get', PathList.logout, {}, (response) => {
      });
      localStorage.removeItem('JSESSIONID');
      window.location.href = this.path.TemprootPath + '/index.html';
    },
    setHref(v) {
      location.href = v;
      const href = window.location.href;
      const str = href.substring(href.lastIndexOf('#!/') + 3, href.length);
      this.$set('active', str);
    },
    getBookListFn: function() {
      var _data = {};
        SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {
          this.$set('bookList', response.data);
        });
      },
  
    flagFn:function() {
      location.href = PathList.TemprootPath + '/view/login.html';
  //    sessionStorage.setItem('JSESSIONIDFLAG', '1');
  //    SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
  //      if (response.data.loginFlag) {
  //        this.loginImg = 'background-image: url('+ this.path.ImageBookPath + response.data.status.userImage +')';
  //        this.loginFlag = response.data.status.flag;
  //        this.userName = response.data.status.userName;
  //        this.book = response.data.book;
  //        this.official = response.data.official;
  //        this.reply = response.data.reply;
  //        this.system = response.data.system;
  //        this.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
  //        sessionStorage.setItem('JSESSIONIDFLAG', '1');
  //      } else {
  //        sessionStorage.setItem('JSESSIONIDFLAG', '0');
  //        location.href = PathList.TemprootPath + '/view/login.html';
  //      }
  //  });
    }, 
  },
  ready: function() {
    SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
      if (response.data.loginFlag) {
        this.loginImg = 'background-image: url('+ this.path.ImageBookPath + response.data.status.userImage +')';
        this.loginFlag = response.data.status.flag;
        this.userName = response.data.status.userName;
        this.book = response.data.book;
        this.official = response.data.official;
        this.reply = response.data.reply;
        this.system = response.data.system;
        this.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
      }
    });
  },
  route: { data() {} }
});
export default login;






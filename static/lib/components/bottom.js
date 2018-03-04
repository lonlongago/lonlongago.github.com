import Vue from '../../lib/vue.min.js';
import SZXJ from '../../lib/apis/vueHttp.js';
import PathList from '../../lib/apis/conf.js';

var bottom = Vue.extend({
    template: `
    <style>
    .commonBottom {
      background-color: #fff;
      width: 100%;
      position: fixed;
      bottom: 0;
      z-index: 10;
      border-top: .01rem solid #f3f3f3
    }
    
    .commonBottom ul {
      font-size: 0;
      padding-top: .15rem;
      padding-bottom: .13rem;
      text-align: center;
      overflow: hidden
    }
    
    .commonBottom ul li {
      display: inline-block;
      font-size: .1rem;
      margin: 0 9%;
      text-align: center
    }
    
    .commonBottom ul .book img {
      width: .19rem;
      height: .21rem
    }
    
    .commonBottom ul .bookshelf img {
      width: .24rem;
      height: .2rem
    }
    
    .commonBottom ul .message img {
      width: .28rem;
      height: .23rem
    }
    
    .commonBottom ul .personal img {
      width: .23rem;
      height: .23rem
    }
    
    .commonBottom ul li p {
      margin-top: .05rem;
      color: #999
    }
    
    .blackWrap {
      background-color: #000;
      opacity: .4;
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10
    }

    </style>
    
    <div class="commonBottom">
                <ul>
                    <a href="./index.html">
                        <li class="book">
                            <img src="../img/app_book/book.png" style="display: none;" v-show="book"/>
                            <img src="../img/app_book/book_none.png" v-else/>
                            <p>书籍</p>
                        </li>
                    </a>
                    <a href="./bookshelf.html">
                        <li class="bookshelf">
                            <img src="../img/app_book/bookshelf.png" style="display: none;" v-show="bookshelf"/>
                            <img src="../img/app_book/bookshelf_none.png" v-else/>
                            <p>书架</p>
                        </li>
                    </a>
                    <a href="./message.html">
                        <li class="message">
                            <img src="../img/app_book/message.png" style="display: none;" v-show="message"/>
                            <img src="../img/app_book/message_none.png" v-else/>
                            <p>消息</p>
                        </li>
                    </a>
                    <a href="./personal.html">
                        <li class="personal">
                            <img src="../img/app_book/personal.png" style="display: none;" v-show="personal"/>
                            <img src="../img/app_book/personal_none.png" v-else/>
                            <p>我的</p>
                        </li>
                    </a>
                </ul>
            </div>`,
});

export default bottom; 
<template>
	<div>
		<!--<script src="/lib/jquery.min.js"></script>-->
		<script src="/js/main/carousel.js"></script>
		<alert ref="alert"></alert>
		<myheader></myheader>
		<!-- 头部背景 -->
		<div style="width: 100%;height: 495px;background-image: url(img/header1.jpg); margin-top: -250px;min-width: 1200px;"></div>
		<!-- 主内容 -->
		<div class="index"> 
			<!-- 轮播图 -->
			<div class="carousel">
				<div class="carouselWrap">
				    <div class="bottomNav">
				        <div class="bottomBtnOff" v-show="carousel.btnFlag" v-for="pic in carousel.picture" :ttt="pic.index"></div>
				    </div>
				    <div class="leftOrRight">
				        <div class="left"></div>
					    <div class="contentBox">
					        <div class="content" v-for="pic in carousel.picture" :id="'content'+pic.index" :ttt="pic.index" >
					            <a class="info_controller" :href="pic.link ? pic.link : 'javascript:;'">
					                <img :src="path.ImagePath + pic.picture"/>
					                <div class="shadow"></div>
					                <div class="info">{{pic.introduce}}</div>
					            </a>
					        </div>
					        <div class="content" v-show="carousel.picture.length<=3" v-for="pic in carousel.picture" :id="'content'+(pic.index+3)" :ttt="pic.index" >
					            <a class="info_controller" :href="pic.link ? pic.link : 'javascript:;'">
					                <img :src="path.ImagePath + pic.picture"/>
					                <div class="shadow"></div>
					                <div class="info">{{pic.introduce}}</div>
					            </a>
					        </div>
					        <div class="right"></div>
					    </div>
				    </div>
				</div>
			</div>
			<!-- 小编推荐 -->
			<div class="edit"> 
				<div class="edit_Small"> 
				    <span>小编推荐</span> 
				    <img :src="path.ImagePath + '/img/index/icon-1.jpg'" /> 
				</div> 
				<div class="edit_change"> 
				    <img :src="path.ImagePath + '/img/index/icon-2.jpg'" /> 
				    <span><a href="javascript:;" @click="changeFn(1)">换一批</a></span> 
				</div> 
				<div class="edit_More"> 
			    	<a :href="path.TemprootPath + '/class'">更多&gt;</a> 
				</div> 
				<div class="details"> 
					<figure v-for="obj in theHotList"> 
						<div class="display"> 
						    <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId"> 
						       <img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="details_img bookImg_L" />
						       <div v-if="obj.bookIsSign ==1 " class="updateTow"><img :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></div>
						    </a> 
						    <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId"> 
							    <div class="hide"> 
								    <img :src="obj.userHead ? path.ImageBookPath + obj.userHead:''" class="imgHeadPortrait" /> 
								    <label>{{ obj.author }}</label> 
								    <ul class="hide_ul"> 
									    <li>字数：{{ obj.bookWordCount }}</li> 
									    <li>点击：{{ obj.bookHit }}</li> 
									    <li>收藏：{{ obj.bookCollect }}</li> 
									    <li>打赏：{{ obj.bookCopperCoins }}</li> 
								    </ul> 
							    </div> 
						    </a> 
						</div> 
						<figcaption> 
						    <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId" :title="obj.bookName">{{ obj.bookName }}</a>
						</figcaption> 
					</figure> 
				</div> 
			</div> 
		    <!-- 全站推荐 -->
		    <div class="main"> 
			    <div class="main_title"> 
				    <div class="main_recomm"> 
					    <img :src="path.ImagePath + '/img/index/icon-3.jpg'" /> 
					    <span>全站推荐</span> 
					    <div class="main_More">
					        <a :href="path.TemprootPath + '/class'">更多&gt;</a>
					    </div> 
				    </div> 
			        <div> 
					    <div class="main_picture"> 
					        <figure v-for="(obj, index) in indexList.allBook" v-if="index < 4" @mouseover="setMouseOut(index, $event)">
					            <a class="display" target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId"> 
						            <img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="details_img bookImg_S" /> 
						            <div v-if="obj.bookIsSign ==1 " class="updateTow"><img :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></div>
						            <div class="Small"> 
						                <img :src="obj.userHead ? path.ImageBookPath + obj.userHead:''" class="imgHeadPortrait" /> 
						                <label>{{ obj.author }}</label> 
						                <ul class="Small_ul"> 
						                    <li>字数：{{ obj.bookWordCount }}</li> 
						                    <li>点击：{{ obj.bookHit }}</li> 
						                    <li>收藏：{{ obj.bookCollect }}</li> 
						                    <li>打赏：{{ obj.bookCopperCoins }}</li> 
						                </ul> 
						            </div> 
					            </a>
					            <figcaption>
					                <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId" :title=" obj.bookName ">{{ obj.bookName }}</a> 
					            </figcaption> 
					        </figure> 
					    </div>
			            <img :src="path.ImagePath + '/img/index/icon-4.jpg'" style="float: right;margin:  20px -24px 0 0;" />
					    <div class="main_pictu"> 
					        <figure v-for="(obj, index) in indexList.allBook" v-if="index >= 4"  @mouseover="setMouseOut(index, $event)"> 
					            <div class="display"> 
							        <a href="javascript:;">
							        	<img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="details_img bookImg_S" /></a> 
							            <div v-if="obj.bookIsSign == 1 " class="updateTow"><img :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></div>
							            <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId"> 
							            <div class="Small"> 
									        <img :src="obj.userHead ? path.ImageBookPath + obj.userHead:''" class="imgHeadPortrait" /> 
									        <label>{{ obj.author }}</label> 
									        <ul class="Small_ul"> 
									            <li>字数：{{ obj.bookWordCount }}</li> 
									            <li>点击：{{ obj.bookHit }}</li> 
									            <li>收藏：{{ obj.bookCollect }}</li> 
									            <li>打赏：{{ obj.bookCopperCoins }}</li> 
									        </ul> 
							            </div> 
							        </a>
					            </div> 
					            <figcaption>
					                <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId" :title="obj.bookName">{{ obj.bookName }}</a> 
					            </figcaption> 
					        </figure> 
					    </div>
					    <a v-if="indexList.allBook && indexList.allBook.length > 0" :href="path.TemprootPath + '/catalog/' + indexList.allBook[newBookimg].bookId">
					        <img :src="indexList.allBook[newBookimg].bookCoverImage ? path.ImageBookPath + indexList.allBook[newBookimg].bookCoverImage : ''"  class="main_img bookImg_X" />
					    </a>
					    <p v-if="indexList.allBook && indexList.allBook.length > 0" class="main_p" :title="indexList.allBook[newBookimg].bookName">
					        <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.allBook[newBookimg].bookId">
					          {{ indexList.allBook[newBookimg].bookName }}
					        </a>  
					    </p>
			        </div> 
			    </div> 
				<div class="sidebar"> 
				    <div class="sidebar_Title"> 
						<ul> 
						    <label>好人榜</label> 
						    <li :class="rankingList.copperCoins === 2 ? 'Title_li' : ''" @click="setCopperCoins(2)">总</li> 
						    <li :class="rankingList.copperCoins === 1 ? 'Title_li' : ''" @click="setCopperCoins(1)">月</li> 
						    <li :class="rankingList.copperCoins === 0 ? 'Title_li' : ''" @click="setCopperCoins(0)">周</li> 
						</ul> 
				    </div> 
					<div class="sidebar_content"> 
					    <div class="sidebar_con" v-for="(obj, index) in indexList.weekBookByBookCopperCoins" v-if="index < 3"> 
						    <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.weekBookByBookCopperCoins[index].bookId">
						        <img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="bookImg_Sl" />
						    </a> 
						    <img :src="path.ImagePath + 'img/sss' + (25 + index) + '.png'" class="sidebar_img" />
						    <ul> 
						        <li class="sidebar_name" :title="indexList.weekBookByBookCopperCoins[index].bookName">
							        <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.weekBookByBookCopperCoins[index].bookId">
							          {{ indexList.weekBookByBookCopperCoins[index].bookName }}
							        </a>
						        </li> 
						        <li class="sidebar_card">
						           <img :src="path.ImagePath + '/img/index/icon-1.png'" />好人卡</li> 
							    <li class="sidebar_num">
							        <span v-if="rankingList.copperCoins === 0">{{indexList.weekBookByBookCopperCoins[index].everyWeekCopperCoins}}</span>
							        <span v-if="rankingList.copperCoins === 1">{{indexList.weekBookByBookCopperCoins[index].everyMonthCopperCoins}}</span>
							        <span v-if="rankingList.copperCoins === 2">{{indexList.weekBookByBookCopperCoins[index].bookCopperCoins}}</span>
							    </li>
						    </ul>
					    </div>
					    <div class="white_sidebar">
							<div class="sidebar_cont" v-for="(obj,index) in indexList.weekBookByBookCopperCoins" v-if="index >= 3"> 
							    <ul> 
							        <li><span class="span">{{ index + 1 }}</span></li> 
							        <li class="sidebar_tit" :title="obj.bookName" >
							           <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId">{{ obj.bookName }}</a>
							        
							        </li>
							        <li class="sidebar_li">
								        <span v-if="rankingList.copperCoins === 0">{{ obj.everyWeekCopperCoins }}</span>
								        <span v-if="rankingList.copperCoins === 1">{{ obj.everyMonthCopperCoins }}</span>
								        <span v-if="rankingList.copperCoins === 2">{{ obj.bookCopperCoins }}</span>
							        </li> 
							    </ul> 
							</div> 
					    </div>
					    <p style="margin: 0px;">
					        <a :href="path.TemprootPath + '/ranking/1'">查看更多</a>
					    </p> 
					</div> 
				</div> 
            </div> 
		    <!-- 新书推荐 -->
		    <div class="secon"> 
			    <div class="secon_title"> 
				    <div class="secon_recomm"> 
				        <img :src="path.ImagePath + '/img/index/icon-6.jpg'" /> 
				        <span>新书推荐</span> 
				        <div class="secon_More">
				            <a :href="path.TemprootPath + '/class'">更多&gt;</a>
				        </div> 
				    </div> 
				    <div> 
					    <div class="secon_picture"> 
					        <figure v-for="(obj, index) in indexList.newBookRecom" v-if="index < 4" @mouseover="setMouseOutTwo(index, $event)"> 
						        <div class="display"> 
							        <a href="javascript:;"><img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="details_img bookImg_S" /></a> 
							        <div v-if="obj.bookIsSign ==1 " class="updateTow"><img :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></div>
							        <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId"> 
							            <div class="Small"> 
								            <img :src="obj.userHead ? path.ImageBookPath + obj.userHead:''" class="imgHeadPortrait" /> 
								            <label>{{ obj.author }}</label> 
								            <ul class="Small_ul"> 
									            <li>字数：{{ obj.bookWordCount }}</li> 
									            <li>点击：{{ obj.bookHit }}</li> 
									            <li>收藏：{{ obj.bookCollect }}</li> 
									            <li>打赏：{{ obj.bookCopperCoins }}</li> 
								            </ul> 
								        </div> 
								    </a>
						        </div> 
						        <figcaption>
						            <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId">{{ obj.bookName }}</a> 
						        </figcaption> 
					        </figure> 
					    </div> 
				        <img :src="path.ImagePath + '/img/index/icon-4.jpg'" style="float: right;margin:  20px -24px 0 0;" /> 
					    <div class="secon_pictu"> 
					        <figure v-for="(obj,index)  in indexList.newBookRecom" v-if="index >= 4" @mouseover="setMouseOutTwo(index, $event)"> 
						        <div class="display"> 
						            <a href="javascript:;"><img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="details_img bookImg_S" /></a> 
						            <div v-if="obj.bookIsSign ==1 " class="updateTow"><img :src="path.ImagePath + '/img/sign01_03.png'" alt="" /></div>
						            <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId"> 
								        <div class="Small"> 
									        <img :src="obj.userHead ? path.ImageBookPath + obj.userHead:''" class="imgHeadPortrait" /> 
									        <label>{{ obj.author }}</label> 
									        <ul class="Small_ul"> 
									            <li>字数：{{ obj.bookWordCount }}</li> 
									            <li>点击：{{ obj.bookHit }}</li> 
									            <li>收藏：{{ obj.bookCollect }}</li> 
									            <li>打赏：{{ obj.bookCopperCoins }}</li> 
									        </ul> 
								        </div> 
						            </a>
						        </div> 
						        <figcaption>
						            <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId">{{ obj.bookName }}</a> 
						        </figcaption> 
					        </figure>
					    </div> 
					    <a v-if="indexList.newBookRecom && indexList.newBookRecom.length > 0" :href="path.TemprootPath + '/catalog/' + indexList.newBookRecom[newBookimg1].bookId">
					        <img :src="indexList.newBookRecom[newBookimg1].bookCoverImage ? path.ImageBookPath + indexList.newBookRecom[newBookimg1].bookCoverImage:''" class="secon_img bookImg_X" />
					    </a>
					    <p v-if="indexList.newBookRecom && indexList.newBookRecom.length > 0" class="secon_p" :title="indexList.newBookRecom[newBookimg1].bookName">
					        <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.newBookRecom[newBookimg1].bookId">
					          {{ indexList.newBookRecom[newBookimg1].bookName }}
					        </a>  
					    </p>
				    </div> 
			    </div>
		        <div class="Side"> 
					<div class="Side_Title"> 
					    <ul> 
						    <label>点击榜</label> 
						    <li :class="rankingList.clickSize === 2 ? 'Title_li' : ''" @click="setClickSize(2)">总</li> 
						    <li :class="rankingList.clickSize === 1 ? 'Title_li' : ''" @click="setClickSize(1)">月</li> 
						    <li :class="rankingList.clickSize === 0 ? 'Title_li' : ''" @click="setClickSize(0)">周</li> 
					    </ul> 
					</div> 
					<div class="Side_content"> 
					    <div class="Side_con" v-for="(obj, index) in indexList.weekBookByBookHit" v-if="index < 3"> 
					        <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.weekBookByBookHit[index].bookId">
						        <img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="bookImg_Sl"/>
						        <img :src="path.ImagePath + 'img/sss' + (25 + index) + '.png'" class="sidebar_img" />
					        </a> 
					        <ul> 
						        <li class="Side_name" :title="indexList.weekBookByBookHit[index].bookName">
							        <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.weekBookByBookHit[index].bookId">
							            {{ indexList.weekBookByBookHit[index].bookName }}
							        </a>
						        </li> 
					       		<li class="Side_surname"></li> 
					            <li class="Side_card"><a href="javascript:;">
						        <img :src="path.ImagePath + 'img/Side_card_03.png'" />{{ indexList.weekBookByBookHit[index].author }}</a></li> 
						        <ul class="Side_Percen" style="color: #3781E7;">
							        <li v-if="rankingList.clickSize === 0" class="Side_Percen_Side" :title="indexList.weekBookByBookHit[index].everyWeekHit">{{indexList.weekBookByBookHit[index].everyWeekHit}}</li>
							        <li v-if="rankingList.clickSize === 1" class="Side_Percen_Side" :title="indexList.weekBookByBookHit[index].everyWeekHit">{{indexList.weekBookByBookHit[index].everyMonthHit}}</li>
							        <li v-if="rankingList.clickSize === 2" class="Side_Percen_Side" :title="indexList.weekBookByBookHit[index].everyWeekHit">{{indexList.weekBookByBookHit[index].bookHit}}</li>
							    </ul>
					        </ul> 
					    </div> 
					    <div class="white clear">
						    <div class="Side_cont1" v-for="(obj,index) in indexList.weekBookByBookHit" v-if="index >= 3"> 
							    <div class="Side_cont_block">
							       {{index + 1}}
							    </div> 
							    <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId">{{ obj.bookName}}</a>
							    <div style="width: 120px;float: right;text-align: end;padding-right: 23px;">
							        <li v-if="rankingList.clickSize === 0">{{obj.everyWeekHit}}</li>
							        <li v-if="rankingList.clickSize === 1">{{obj.everyMonthHit}}</li>
							        <li v-if="rankingList.clickSize === 2">{{obj.bookHit}}</li>
							    </div>
						    </div>  
					    </div>
					    <p style="margin: 0px;">
					        <a :href="path.TemprootPath + '/ranking/2'">查看更多</a>
					    </p>
				    </div> 
				</div>
		    </div> 
		    <!-- 更新列表 -->
			<div class="New">
				<div class="New_title"> 
				    <div class="New_recomm"> 
					    <img :src="path.ImagePath + '/img/index/icon-9.jpg'" /> 
					    <span>最新小说更新列表</span> 
					    <div class="New_More">
					       <a :href="path.TemprootPath + '/class'">更多&gt;</a> 
					    </div> 
				    </div> 
				    <div class="New_update"> 
					    <ul class="update_title"> 
					       <li>类别/书名</li> 
					       <li class="update_time">更新时间</li> 
					       <li class="update_author">作者</li> 
					    </ul> 
					    <div class="New_content"> 
					        <ul v-for="obj in indexList.lastUpdate"> 
						        <li class="content_classi">[精品作品]</li> 
						        <li class="content_classi_li">
						            <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId" :title="obj.bookName +':'+ obj.contentTitle">
						            &nbsp;&nbsp;<span class="content_classi_span" >{{ obj.bookName }}</span>&nbsp;
						            <span class="content_classi_NewSpan">最新章节:{{ obj.contentTitle }}</span>
						            </a>
						        </li> 
						        <li class="content_time"> {{ szxj.getLocalTime(obj.bookUpdate / 1000) }}</li> 
						        <li class="content_name"><a href="javascipt:;">{{ obj.author }}</a></li> 
					        </ul> 
					    </div> 
				    </div> 
				</div> 
				    
				<div class="Word"> 
					<div class="Word_Title"> 
					    <ul> 
						    <label>字数榜</label> 
						    <li :class="rankingList.fontSize === 2 ? 'Title_li' : ''" @click="setFontSize(2)">总</li> 
						    <li :class="rankingList.fontSize === 1 ? 'Title_li' : ''" @click="setFontSize(1)">月</li> 
						    <li :class="rankingList.fontSize === 0 ? 'Title_li' : ''" @click="setFontSize(0)">周</li> 
					    </ul> 
					</div> 
				    <div class="Word_content">
					    <div class="Word_con" v-for="(obj,index) in indexList.weekBookByBookWordCount" v-if="index < 3"> 
						    <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.weekBookByBookWordCount[index].bookId">
						        <img :src="path.ImagePath + 'img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" class="bookImg_Sl"/>
						        <img :src="path.ImagePath + 'img/sss' + (25 + index) + '.png'" class="sidebar_img" />
						    </a> 
						    <ul> 
						        <li class="Word_name" :title="indexList.weekBookByBookWordCount[index].bookName">
							        <a target="_blank" :href="path.TemprootPath + '/catalog/' + indexList.weekBookByBookWordCount[index].bookId">
							            {{ indexList.weekBookByBookWordCount[index].bookName }}
							        </a>
						        </li>
						        <li class="Word_surname"></li> 
						        <li class="Word_card"><a href="javascript:;"><img :src="path.ImagePath + 'img/Side_card_03.png'" />{{ indexList.weekBookByBookWordCount[index].author }}</a></li> 
						        <li class="Word_Percen" >
						            <span v-if="rankingList.fontSize === 0">{{indexList.weekBookByBookWordCount[index].everyWeekWordCount}}字</span>
						            <span v-if="rankingList.fontSize === 1">{{indexList.weekBookByBookWordCount[index].everyMonthWordCount}}字</span>
						            <span v-if="rankingList.fontSize === 2">{{indexList.weekBookByBookWordCount[index].bookWordCount}}字</span>
						        </li> 
						    </ul> 
					    </div>
					    <div class="white"> 
						    <div class="Word_cont" v-for="(obj,index) in indexList.weekBookByBookWordCount" v-if="index >= 3"> 
						        <div class="Word_cont_block">
						        {{ index + 1 }}
						        </div> 
						        <a target="_blank" :href="path.TemprootPath + '/catalog/' + obj.bookId">{{obj.bookName}}</a>
						        <div style="width: 120px;float: right;color: black;text-align: end;padding-right: 45px;">
						            <span v-if="rankingList.fontSize === 0">{{indexList.weekBookByBookWordCount[index].everyWeekWordCount}}字</span>
						            <span v-if="rankingList.fontSize === 1">{{indexList.weekBookByBookWordCount[index].everyMonthWordCount}}字</span>
						            <span v-if="rankingList.fontSize === 2">{{indexList.weekBookByBookWordCount[index].bookWordCount}}字</span>
						        </div>
						    </div> 
					    </div>
					    <p style="margin: 0px;">
					        <a :href="path.TemprootPath + '/ranking/3'">查看更多</a>
					    </p> 
				    </div> 
				</div>
			</div>
		</div>
		<myfooter></myfooter>
	</div>
</template>

<script>
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import myHeader from '~/components/Header'
import myFooter from '~/components/Footer'
import store from '~/components/store'
import axios from 'axios'
export default {
	components:{
		'alert': Alert,
		'myheader': myHeader,
		'myfooter': myFooter
	},
	asyncData:function(context){
		var JSESSIONID;
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
    };
    var _data = { 'JSESSIONID': JSESSIONID };
		return axios.get('http://www.qcacg.com/data.json', { headers: {'JSESSIONID': JSESSIONID }})
	    .then((res1) => {
	    	return axios.get(PathList.getIndexData,_data)  //主页信息端口
		    .then((res2) => {
		    	var obj = {};
			    obj.carousel = res1.data;
			    obj.indexList = res2.data;
			    obj.theHotList = res2.data.theHot;
			    var dateTime = new Date();
			    obj.imgFlag = dateTime.getTime();
				  return obj;
		    });
	    }).catch(function (error) {
  			console.log(error)
		});
  	},
	data : function() {
		return {
//			obj:{
//		      pageNo:1,
//		      pageSize:6,
//		      totalCount:'',
//			  totalPage:''
//		    },
		    imgFlag: 0,
		    carousel: {},
		    bodyFlag: false,
		    path: PathList,
		    szxj: SZXJ, // 公共方法
		    indexList: {}, // 首页默认渲染数据
		    theHotList: [], // 小编推荐
		    pageNo: 1,
		    newBookimg: 0, // 全站推荐的切换下标
		    newBookimg1: 0, // 新书推荐的切换下标
		    RequestObj: {
		        rankList: 0, // 好人 字数 点击
		        timeRank: 0, // 周 月 总
		        date: 1, // 0 近期 1远期
		        bookTypeId: '',
		        pageNo: 1,
		        pageSize: 7,
		        bookIsSign:'',
		    },
		    rankingList: {
		        copperCoinsList: [],
		        copperCoins: 0,
		        clickSizeList: [],
		        clickSize: 0,
		        fontSizeList: [],
		        fontSize: 0,
			    },
			    carouselJS: "",
			    swiperArr: [],
			    Url:'',
	    }
	  },
	mounted: function () {
		  this.$nextTick(function () {
		  	this.getValueFn();
		  	console.log(this.totalPage);
	    })
	},
	methods: {
	    nextImg: function() {
		    var tempArr = this.swiperArr;
		    this.swiperArr = [];
		    var temp = tempArr[0];
		    for (var i = 0; i < tempArr.length - 1; i++) {
		        tempArr[i] = tempArr[i + 1];
		    }
		    tempArr[tempArr.length - 1] = temp;
		    this.swiperArr = tempArr;
	    },
	    previousImg: function() {
		    var tempArr = this.swiperArr;
		    this.swiperArr = [];
		    var temp = tempArr[tempArr.length - 1];
		    for (var i = tempArr.length - 1; i > 0; i--) {
		        tempArr[i] = tempArr[i - 1];
		    }
		    tempArr[0] = temp;
		    this.swiperArr = tempArr;
	    },
	    setTimeImg: function(v) {
		    if (this.imgFlag !== v) {
		        return;
		    }
	        var tempArr = this.swiperArr;
	        this.swiperArr = [];
	        var temp = tempArr[0];
		    for (var i = 0; i < tempArr.length - 1; i++) {
		        tempArr[i] = tempArr[i + 1];
		    }
	        tempArr[tempArr.length - 1] = temp;
	        this.swiperArr = tempArr;
	        var This = this;
	        var dateTime = new Date();
	        this.imgFlag = dateTime.getTime();
		    setTimeout(function() {
		        This.setTimeImg(dateTime.getTime());
		    }, 5000);
	    },
	    stop: function() {
	        this.imgFlag = -1;
	    },
	    start: function() {
		    var dateTime = new Date();
		    this.imgFlag = dateTime.getTime();
		    var This = this;
		    setTimeout(function() {
		        This.setTimeImg(dateTime.getTime());
		    }, 5000);
	    },
	    setCopperCoins: function(v) {
	        this.rankingList.copperCoins = v
	        this.RequestObj.rankList = 0;
	        this.RequestObj.timeRank = v;
	        this.getReOrderFn();
	    },
	    setFontSize: function(v) {
            this.rankingList.fontSize = v
	        this.RequestObj.rankList = 1;
	        this.RequestObj.timeRank = v;
	        this.getReOrderFn();
	    },
	    setClickSize: function(v) {
	        this.rankingList.clickSize = v;
	        this.RequestObj.rankList = 2;
	        this.RequestObj.timeRank = v;
	        this.getReOrderFn();
	    },
	    getReOrderFn: function() {
	       switch (this.RequestObj.rankList){
              case 0:
                  this.indexList.weekBookByBookCopperCoins = [];
                  break;
              case 1:
                  this.indexList.weekBookByBookWordCount = [];
                  break;
              case 2:
                  this.indexList.weekBookByBookHit = [];
                  break;
              default:
                  break;
        }
		    SZXJ.http(this,'get', PathList.getRankingList, this.RequestObj, (response) => {
		        
		        switch (this.RequestObj.rankList){
			        case 0:
			            this.indexList.weekBookByBookCopperCoins = response.data.result;
			            break;
			        case 1:
			            this.indexList.weekBookByBookWordCount = response.data.result;
			            break;
			        case 2:
			            this.indexList.weekBookByBookHit = response.data.result;
			            break;
			        default:
			            break;
		        }
		    });
	    },
	    setMouseOut: function(v, e) {
	        this.newBookimg = v;
	    },
	    setMouseOutTwo: function(v, e) {
	        this.newBookimg1 = v;
	    },
	    getValueFn: function() {
		    var _data = {};
		    SZXJ.http(this,'get', PathList.getIndexData, _data, (response) => {
		        this.indexList = response.data;
		        this.theHotList = response.data.theHot;
		        var dateTime = new Date();
		        this.imgFlag = dateTime.getTime();
		    });
	    },
	    changeFn: function(a) {
		          SZXJ.http(this,'get',  PathList.nextBatch,{pageNo : this.pageNo}, (response) => { 
		             this.theHotList = response.data.theHot;
		             if( a == 1 && this.pageNo < response.body.totalPage ){
 						this.pageNo += 1;
 						return this.pageNo;
		             }else if(this.pageNo == response.body.totalPage){
		             	this.pageNo = 1;
		         		return this.pageNo;
		             }
		          });
//		    SZXJ.http(this,'get', PathList.nextBatch, {pageNo : this.pageNo}, (response) => {
//		        this.theHotList = response.data.theHot;
//		       
//		    	console.log(response.body.totalPage);
//		    });
	    },
  	},
  	head: function(){
		return{
			title: '【QC轻小说】原创轻小说-轻小说投稿',
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
		    	{ rel: 'stylesheet', href: '/css/index.css' },
		    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
	  		],
	  		script: [
	  		    { type: 'text/javascript', src: '/lib/jquery.min.js'},
	  		    { type: 'text/javascript', src: '/js/main/carousel.js'},
	  		    {src:"/lib/browserRedirect.js"}
	  		]
	  	}
  	}
}
</script>

<style scoped>

</style>
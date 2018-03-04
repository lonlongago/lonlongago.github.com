<template>
<div id="mask" v-show="bodyFlag" style="display:none;" v-bind:style="popup===true?'overflow:hidden':''">
	<link rel="stylesheet" href="../css/wangEditor.min.css" />
    <script src="../lib/jquery.min.js"></script>
    <script src="../lib/wangEditor.min.js"></script>
    <script type="text/javascript" id="bdshare_js" data="type=tools&mini=1" ></script> 
    <script type="text/javascript" id="bdshell_js"></script>
    <alert ref="alert"></alert>
    <div class="alert_one">操作成功</div>
    <myheader></myheader>
	<div id="search"></div>
	<div class="index" >  
		<div class="index_Line"></div>
		<img v-for="obj in bookCustom" id="obj.bookCoverImage"  class="picture" :src="path.ImagePath + '/img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" />
		<img class="medal" v-if="collectArticle == '2017春季征文金奖' " src="../static/img/medal_01.png" alt="" title="春季征文金奖" />
		<img class="medal" v-if="collectArticle == '2017春季征文银奖' " src="../static/img/medal_02.png" alt="" title="春季征文银奖" />
		<img class="medal" v-if="collectArticle == '2017春季征文铜奖' " src="../static/img/medal_03.png" alt="" title="春季征文铜奖" />
		<div v-if="bookIsSign==1"  class="update">
			<img :src="path.ImagePath + '/img/sign01_03.png'" alt="" />
		</div>
		<div class="text">
			<img class="magic" :src="path.ImagePath + '/img/magic.png'" alt="" />
		    <div class="clear">
		        <h4>{{ title }}</h4>&nbsp;&nbsp;&nbsp;<span class="collectArticle_span" v-if="bookIsSign > 0" style="">Lv.{{bookIsSign}}</span>
		        <a class="collectArticle" v-if="collectArticle != ''" :href="path.TemprootPath + '/collect'">{{collectArticle}}</a>
		    </div>
			<ul class="text_ul">
 				<li>字数: <span style="color:#7e7e7e">&nbsp;{{words}}</span></li>
				<li>点击: <span style="color:#7e7e7e">&nbsp;{{cursor}}</span></li>
				<li style="width: 150px">
					更新状态: <span v-if=" updateCycle == 1 " style="color:#7e7e7e">&nbsp;日更</span>
					<span v-else style="color:#7e7e7e">&nbsp;月更</span>
				</li>
				<li style="width: 200px">
					更新: <span style="color:#7e7e7e;">&nbsp;{{szxj.getLocalTime(update / 1000) }}</span>
				</li>
			</ul>
		    <div class="text_brief">
		    	<div style="height: 103px;">
		    		<p class="text_brief_p" :title="introduction" style="height: auto;">
						<span>简介:</span>{{introduction}}
					</p>
		    	</div>
				<div class="text_type" >
					<ul>
						<li>分类：</li>
						<li v-for="obj in Booktype">
							<!--<a :href="path.TemprootPath + '/view/class.html?id=' + obj.bookTypeId" >-->
								<a :href="path.TemprootPath + '/class' " >
								<span class="text_span">{{ obj.bookTypeName}}</span>
							</a>
						</li>
					  	<li v-if="bookIsSign == 1">
					  		<!--<a :href="path.TemprootPath + '/view/class.html?bookIsSign=' + bookIsSign" >-->
					  			<a :href="path.TemprootPath + '/class'" >
					  			<span class="text_span" >签约</span>
					  		</a>
					  	</li>
					</ul>
				</div>
				<div class="text_reading">
					<ul>
						<li>
						    <a class="text_Read" target="_blank" v-if="bookHit" :href="path.TemprootPath + '/readBook/' + contentId  + '@'+ bookId">继续阅读</a>
							<template v-else>
								<a v-if="BookList[0] && BookList[0].contentEntityList[0]" class="text_Read" target="_blank"  :href="path.TemprootPath + '/readBook/' + BookList[0].contentEntityList[0].contentId  + '@'+ bookId" >开始阅读</a>
							    <a v-else class="text_Read" href="javascript:;" target="_blank">开始阅读</a>
							</template>
          				</li>
						<li @click="setCollect()" v-if="!collect" >
							<span>
								<img :src="path.ImagePath + '/img/zzzz.png'" class="text_Collection" />
								<p >收藏</p>
								<i style="font-style: normal;display: none;">{{Collection}}</i>
							</span>
						</li>
						<li v-else @click="setCollect()">
							<span>
								<img :src="path.ImagePath + '/img/zzzz.png'" class="text_Collection" />
							    <p>已收藏</p>
								<i style="font-style: normal;display: none;">{{Collection}}</i>
							</span>
						</li>
						<li @click="rewardFn">
							<span>
								<img :src="path.ImagePath + '/img/zzz.png'" class="text_card" />
								<p>打赏</p>
								<i style="font-style: normal;display: none;">{{bookCopperCoins}}</i>
							</span>
						</li>
						<li class="four">
						    <span>
							    <img :src="path.ImagePath + '/img/zzzzz.png'" class="text_card" />
							    <p>分享</p> 
						    </span>
				            <div class="bdsharebuttonbox bdshare_t bds_tools get-codes-bdshare" id="bdshare">
					            <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间" style="background-position: center !important ;" ></a>
					            <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博" style="background-position: center !important ;"></a>
					            <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友" style="background-position: center !important ;"></a>
				            </div>
						</li>
					</ul>
				</div>
			</div>
		</div>	
		<div class="text_Catalog">
			<div v-for="obj in BookList">
				<ul >
					<li class="text_mark"></li>
					<li ><span>{{ obj.volumeName }}</span></li>
				</ul>   
				<div class="text_chapter" >
					<div class="group" v-for="value in obj.contentEntityList">
					    <a class="book_name" target="_blank" :title="value.contentTitle" :href="path.TemprootPath + '/readBook/' + value.contentId + '@'+ obj.bookId">
					    <span class="text_sign"></span>{{ value.contentTitle }}</a>  							    							  
					</div>
					<div class="text_hr" v-if="line > 1" ></div>
				</div>
			</div>
			<div style="height: 80px;"></div>
		</div>
		<div class="text_comment">
			<ul>
				<li><span v-if="findCommentAndReply.commentAndReplyTotalCount !== 0 "  >{{findCommentAndReply.commentAndReplyTotalCount}}</span></li>
				<li>评论</li>
			</ul>
		</div>
		<div class="text_input">
			<ul class="clearr">   	 
				<li class="user_head">
					<a href="javascript:;" v-show="loginFlag" >  
					    <span v-if="!loginImg" style="height: 54px;width: 54px;border-radius: 54px;background-image: url(../img/232x232.jpg);display: inline-block;background-size: contain;"></span>
					    <span v-else :style="'height: 54px;width: 54px;border-radius: 54px;' + loginImg + ';display: inline-block;background-size: contain;'"></span>
					</a>
				    <img v-show = "!loginFlag" :src="path.ImagePath + '/img/sss888.png'" />
				</li>
		
				<li class="user_msg" v-show="loginFlag" >
				    <editor 
				    	:id="'editor_'" 
				    	:obj="editor" 
				    	@update:obj = "val => editor = val"
				    	></editor>
				</li>
				<li class="user_msgTow" v-show = "!loginFlag" >
					<a :href="path.TemprootPath + '/login'">登录</a>后才可以进行操作 
				</li>
				<li class="MessageBtn" @click="saveComment"><span>发表评论</span></li>
			</ul>
			<div class="text_sort active">
				<ul class="text_sort_ul">
					<li class="text_sort_li" :class="commentStatus === 0 ?'active':''" @click="setComment(0)">默认排序</li>
					<li class="text_sort_li" :class="commentStatus === 1 ?'active':''" @click="setComment(1)">按回复数</li>
					
		  			<ul class="text_page_up clear">
			            <li class="page_up" @click="setPage(findCommentAndReply.pageNo - 1, 1)" :style="findCommentAndReply.pageNo > 1 ? 'display:block':'display:none'">上一页</li>
			            <li class="page_number" v-if="((index + 1) <= 5 && findCommentAndReply.pageNo < 3 || ((index + 1) > findCommentAndReply.pageNo - 3 &&  index < findCommentAndReply.pageNo)) || ( ((index + 1) <= findCommentAndReply.pageNo + 2 &&　(index + 1) > findCommentAndReply.pageNo) || (findCommentAndReply.pageNo > findCommentAndReply.pageCount - 3 && (index + 6) > findCommentAndReply.pageCount) )" :style="objTemp == findCommentAndReply.pageNo? 'font-weight:bold;color:#00a1d6;':''" v-for="(objTemp,index) in findCommentAndReply.page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
			            <li v-show="findCommentAndReply.pageNo !== findCommentAndReply.pageCount" class="page_next" @click="setPage(findCommentAndReply.pageNo + 1, findCommentAndReply.pageCount)">下一页</li>
			            <li>共<b>{{ findCommentAndReply.pageCount }}</b>页</li>
		  			</ul>
		      
				</ul>
			</div>   
		</div>
		<div class="CommentArea"  v-for="(obj,index) in findCommentAndReply.comment">
		    <div class="text_user clear">
			    <a :href="path.TemprootPath +'/painter/space/'+obj.userId">
			    	<img class="text_user_img" :src="path.ImagePath + '/img/sss8.jpg'" @load="szxj.loadImg(obj.userHead ? path.ImageBookPath + obj.userHead: '', $event)" />
			    </a>
			    <ul class="mes_head">
				    <li class="mes_head_user" >
				        <a href="javascript:;" class="user_a" title="">{{obj.userName}}</a>
				        <a v-if="index === 0 && obj.strickie != '0'" href="javascript:;" class="user_Top">置顶</a>
				        <a v-if="findCommentAndReply.auth && obj.strickie == '0'" @click="strickieFn(obj.commentId)" href="javascript:;" class="user_Top_a">置顶</a>
				    </li>
				    <li>
				    	<span class="user_comment" v-html = "obj.commentContent" >{{ obj.commentContent }}</span>
				    </li>  
				    <li>
				        <ul class="updata_mes">
				            <li class="mess1">{{ szxj.getLocalTime(obj.commentDate / 1000) }}</li>
				            <li class="mess2" @click="messageShow(obj.commentId, 0, obj.replyUserName, obj.userId)">回复</li>
				            <li class="mess3" @click="reportShow(obj.commentId)">举报</li>
				        </ul>
				    </li>
			    </ul>
		    </div>
		  	<div class="text_userTow clear"  v-for="(temp,index) in obj.replyEntityList" :style=" obj.replyEntityList.length == obj.replyEntityList[index+1]? 'border-bottom: 1px solid rgba(0,0,0,0.06);':''  ">
			    <a :href="path.TemprootPath +'/painter/space/'+temp.userId">
			    	<img class="text_userTow_img" :src="path.ImagePath + '/img/smallHead.png'" @load="szxj.loadImg(temp.userHead ? path.ImagePath + 'Controller' + temp.userHead: '', $event)" />		
				</a>
			    <ul class="mes_head">
			      	<li class="mes_head_user" >
			        	<span class="user_comment"  title="">
			        		<a href="javascript:;" class="user_a" title="">{{ temp.userName }}</a>
			        		<label v-if="temp.replyStatus==1">回复
			        			<span class="aite_user">@{{ temp.replyUserName }}</span>
			        		</label>
			        		<p v-html="temp.replyContent">
			        			{{ temp.replyContent }}
			        		</p>
			        	</span>
			        </li>
			      	<li></li> 
			       	<li>
				        <ul class="updata_mes">
				            <li class="mess1">{{ szxj.getLocalTime(temp.replyDate / 1000) }}</li>
				            <li class="mess2" @click="messageShow(obj.commentId, 1, temp.userName, temp.userId,temp.replyId)">回复</li>
				            <li class="mess3" @click="reportShowFn(temp.replyId)">举报</li>
				        </ul>
				    </li>
			    </ul>
			</div>
		  
			<ul class="Publish" :style="commentId === obj.commentId ? 'visibility: ;':'display: none;'">
			    <li class="user_head">
		    	<a href="javascript:;">
		    		<span v-if="!loginImg" style="height: 54px;width: 54px;border-radius: 54px;background-image: url(../img/232x232.jpg);display: inline-block;background-size: contain;"></span>
			    	<span v-else :style="'height: 54px;width: 54px;border-radius: 54px;' + loginImg + ';display: inline-block;background-size: contain;'"></span>
			  	</a>
			    </li>
			    <li style="position: relative; float: left;width: 485px;min-height: 60px;">
			        <editor 
			        	:id="'editor_' + obj.commentId" 
			        	:obj="obj.editor"			        	
			        	@update:obj = "val => obj.editor = val"
			        	></editor>
			    </li>
			    <li class="MessageBtn" @click="saveReply(obj.commentId)"><span style="line-height: 26px;">回复</span></li>
			</ul>
			<ul class="text_page clear" :style="obj.pageCount > 1 ? 'display:block ;':'display: none;'">
			    <li>共<b>{{obj.pageCount}}</b>页</li>
			    <li class="page_up" @click="setPage1(obj.pageNo - 1, 1)" :style="obj.pageNo > 1 ? 'display:block':'display:none'">上一页</li>
			    <li class="page_number" v-if="((index + 1) <= 5 && obj.pageNo < 3 || ((index + 1) > obj.pageNo - 3 &&  index < obj.pageNo)) || ( ((index + 1) <= obj.pageNo + 2 &&　(index + 1) > obj.pageNo) || (obj.pageNo > obj.pageCount - 3 && (index + 6) > obj.pageCount) )" 
			        :style="objTemp == obj.pageNo ? 'font-weight:bold;color:#00a1d6;':''" 
			        v-for="(objTemp,index) in obj.page" 
			        @click="setPage1(objTemp, index)"><a>{{ objTemp }}</a></li>
			    <li v-show="obj.pageNo !== obj.pageCount" class="page_next" @click="setPage1(obj.pageNo + 1, obj.pageCount)">下一页</li>
			</ul>
		  	<div class="hr"></div>  
		</div>
		<div class="Report" v-if="report" >
		    <img :src="path.ImagePath + '/img/false.png'" @click="rewardShowTowFn"/>
		    <form action="" method="get">请输入举报理由
			    <br /><br /> 
			    <ul>
					  <li><label><input name="Fruit" type="radio" value="" @click="oneFn(1)"/>&nbsp;广告 </label></li>
					  <li><label><input name="Fruit" type="radio" value="" @click="oneFn(2)"/>&nbsp;刷屏 </label></li>
			      <li><label><input name="Fruit" type="radio" value="" @click="oneFn(3)"/>&nbsp;剧透 </label></li>
				    <li><label><input name="Fruit" type="radio" value="" @click="oneFn(4)"/>&nbsp;引战</label></li>
				    <li><label><input name="Fruit" type="radio" value="" @click="oneFn(5)"/>&nbsp;政治</label></li>
				    <li><label><input name="Fruit" type="radio" value="" @click="oneFn(6)"/>&nbsp;内容不相关</label></li>
				    <li><label><input name="Fruit" type="radio" value="" @click="oneFn(7)"/>&nbsp;人身攻击</label></li>
				    <li><label><input name="Fruit" type="radio" value="" @click="oneFn(8)"/>&nbsp;其他</label></li>
			    </ul>
			</form> 
			<div class="true" @click="reportDown">确定</div>
		</div>
		<div id="page" class="page">
		    <ul>
			    <li class="btn" @click="setPage((findCommentAndReply.pageNo - 1) >= 1 ? (findCommentAndReply.pageNo - 1) : 1)"><a>上一页</a></li>
			    <li v-if="((index + 1) <= 5 && findCommentAndReply.pageNo < 3 || ((index + 1) > findCommentAndReply.pageNo - 3 &&  index < findCommentAndReply.pageNo)) || ( ((index + 1) <= findCommentAndReply.pageNo + 2 &&　(index + 1) > findCommentAndReply.pageNo) || (findCommentAndReply.pageNo > findCommentAndReply.pageCount - 3 && (index + 6) > findCommentAndReply.pageCount) )" :class="objTemp == findCommentAndReply.pageNo? 'active':''" v-for="(objTemp,index) in findCommentAndReply.page" @click="setPage(objTemp)"><a>{{ objTemp }}</a></li>
			    <li class="btn" @click="setPage((findCommentAndReply.pageNo + 1) <= findCommentAndReply.pageCount ? (findCommentAndReply.pageNo + 1) : findCommentAndReply.pageCount)"><a>下一页</a></li>
			    <li class="goto">
			      <input type="text" v-model="pageNo" style="text-align: center;"/>
			      <span>{{ findCommentAndReply.pageNo }}/{{ findCommentAndReply.pageCount }}</span>
			      <a class="btn" @click="setPage(pageNo)">转页</a>
			    </li>
			</ul>
		</div>
	   	<div class="screen">
			<h3>作者相关</h3>
			<a href="javascript:;">
				<img :src="path.ImageBookPath + userHead " class="head" />
			    <span v-if="sex == '男生'" class="attention-name-sex"><img :src="path.ImagePath + '/img/sex_001.png'" alt="" /></span>
			    <span v-if="sex == '女生'" class="attention-name-sex"><img :src="path.ImagePath + '/img/sex_002.png'" alt="" /></span>
			</a>
			<ul class="author">
				<li><label>作者：</label>
					<a href="javascript:;" class="span span_author" :title="authorName">{{authorName}}</a>
					<a @click="setAttention()" v-if="!attention" class="a_author" href="javascript:;">关注</a>
					<a @click="setAttention()" v-else class="a_author_Tow" href="javascript:;" >已关注</a>
				</li>
				<li v-if=" autograph == null ">
					<p class="span_autograph" :title="autograph">
						<label style="color: black;">签名：</label>这个作者好任性，并没有签名
					</p>
				</li>	
			    <li v-else>
			    	<p class="span_autograph" :title="autograph">
			    		<label style="color: black;">签名：</label>{{autograph}}
			    	</p>
			    </li>
			</ul> 
			<div class="works">
				<h3 class="titile_tow">其他作品</h3>
				<div class="button">
					<button class="next" @click="nextWorksFn"><img :src="path.ImagePath + '/img/sss12.png'"/></button>
					<button class="Previous" @click="previousWorksFn"><img :src="path.ImagePath + '/img/sss13.png'"/></button>
				</div>
				<ul class="clear">
					<li :style="'left:' + index * 84 + 'px;' + 'transform:translateX(' + 84 * zindex +'px);'"  v-for="(obj,index) in booktTitle">
						<a :href="path.TemprootPath + '/catalog/' + obj.bookId"> <img :src="path.ImagePath + '/img/z-imgBj.jpg'" @load="szxj.loadImg(obj.bookCoverImage ? path.ImageBookPath + obj.bookCoverImage: '', $event)" /></a>
						<a class="works_a span span_author"  :href="path.TemprootPath + '/catalog/' + obj.bookId" :title="obj.bookName">{{ obj.bookName }}</a>
					</li>
				</ul>
			</div>
			<div class="list">
				<h3>好人榜</h3>
				<ul  class="list_ul">
					<li @click="DayFn(1)" :class="listnumber == 1 ? 'active' : '' " >周</li>
					<li @click="DayFn(2)" :class="listnumber == 2 ? 'active' : '' ">月</li>
					<li @click="DayFn(3)" :class="listnumber == 3 ? 'active' : '' ">总</li>
			    </ul>
				<div v-if="bookReward == '' " style="text-align: center; width: 321px;height: 230px;margin-top: 70px;">
			    	<img :src="path.ImagePath + '/img/1_12_03.png'" style="width: 100px;height: 120px;margin-bottom: 15px;"/>
					<span style="display: block;margin-bottom: 10px;font-family:inherit" >打赏作品给作者加油!</span>
			  	</div>
				<div v-if="bookReward !== '' " class="ranking">
					<div class="relative" v-for="(obj,index) in bookReward" v-if="index <= 2">
						<img :src="path.ImagePath + '/img/sss19.png'" class="ranking_Img_line"/>
						<a href="javascript:;"><img :src="path.ImagePath + 'Controller' + obj.userHead" class="ranking_head"/></a>
						<ul>
							<li><a class="works_b" href="javascript:;" :title="obj.userName">{{obj.userName}}</a></li>
							<li class="name"></li>
							<li class="num"><img :src="path.ImagePath + '/img/sss15.png'"/>好人卡</li>
							<li class="num_money"><span class="money">{{obj.cardAmount}}</span></li>
						</ul>
					</div>   
					<div class="rank">
						<ul v-for="(obj,index) in bookReward" v-if="index > 2 && index <= 9">
							<li>
								<a class="rank_a" href="javascript:;" :title="obj.userName">
									<span class="rank_span">{{index + 1}}</span>
									<span class="rank_Title">{{obj.userName}}</span>
								</a>
							</li>
							<li class="rank_num">{{obj.cardAmount}}</li>
						</ul>	
					</div>
			   </div>
			</div>
		</div>
	</div>
	<div v-if="popup" style="position:fixed;top:35%;bottom:0px;left:0px;right:0px;z-index:10;">
		<div class="reward" >
		    <span class="reward_head">这本书超赞，我要打赏它ლ(°◕‵ƹ′◕ლ)</span>
		    <img :src="path.ImagePath + '/img/false_03.png'" @click="rewardShowFn"/>
			<div class="reward_Num">
				<label>选择打赏的数量：</label>		
				<ul>	
				    <li @click="NumberFn(10)" :class=" amount == 10 ? 'reward_Num_active':'' "><a :class=" amount == 10 ? 'reward_Num_active_a':'' "></a><span>×10</span></li>
					<li @click="NumberFn(100)" :class=" amount == 100 ? 'reward_Num_active':'' "><a :class=" amount == 100 ? 'reward_Num_active_a':'' "></a><span>×100</span></li>
					<li @click="NumberFn(500)" :class=" amount == 500 ? 'reward_Num_active':'' "><a :class=" amount == 500 ? 'reward_Num_active_a':'' "></a><span>×500</span></li>
					<li @click="NumberFn(1000)" :class=" amount == 1000 ? 'reward_Num_active':'' "><a :class=" amount == 1000 ? 'reward_Num_active_a':'' "></a><span>×1000</span></li>
					<li @click="NumberFn(3000)" :class=" amount == 3000 ? 'reward_Num_active':'' "><a :class=" amount == 3000 ? 'reward_Num_active_a':'' "></a><span>×3000</span></li>
					<li @click="NumberFn(5000)" :class=" amount == 5000 ? 'reward_Num_active':'' "><a :class=" amount == 5000 ? 'reward_Num_active_a':'' "></a><span>×5000</span></li>
				    <li @click="NumberFn(10000)" :class=" amount == 10000 ? 'reward_Num_active':'' "><a :class=" amount == 10000 ? 'reward_Num_active_a':'' "></a><span>×10000</span></li>
	         		<li @click="NumberFn(30000)" :class=" amount == 30000 ? 'reward_Num_active':'' "><a :class=" amount == 30000 ? 'reward_Num_active_a':'' "></a><span>×30000</span></li>
	         		<li @click="NumberFn(50000)" :class=" amount == 50000 ? 'reward_Num_active':'' "><a :class=" amount == 50000 ? 'reward_Num_active_a':'' "></a><span>×50000</span></li>
				</ul>
			</div>	
			<a class="reward_My">我的好人卡：{{payCardAmount}}</a>
			<div class="reward_ture" @click="rewardShow">确认</div>
			<a class="reward_My balala" target="_blank" :href="path.TemprootPath+'/bill'" >>>充值</a>
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
	// this.$refs.alert.setMessage(false,'message',function(){})
	import axios from 'axios'
	import Vuex from 'vuex'
	import editor from '~/components/Editor'
	import myHeader from '~/components/Header'
	import myFooter from '~/components/Footer'
	export default{
		components:{
			'alert': Alert,
			'myheader': myHeader,
			'myfooter': myFooter,
			'editor' : editor
		},
		data:function(){
			return {
				editor:{},
				pageNo:'',
				bdshellJs: '',
			    loginFlag: false,
			    loginImg: '',
			    bodyFlag: true,
			    zindex: 0,
			    path: PathList,
			    szxj: SZXJ,
			    popup:false,
			    id: '',
			    title: '',
			    words:'',
			    cursor:'',
			    update:'',
			    introduction:'',
			    BookList: [],
			    Booktype:[{typeName:''}],
			    Collection:'',
			    bookCopperCoins:'',
			    authorName:'',
			    autograph:'',
			    booktTitle:[],
			    bookCustom:[],
			    collect: false,
			    attention: false,
			    userId: '',
			    bookId: '',
			    userHead: '',
			    findCommentAndReply: [], // 评论字段
			    authorId: '',
			    commentId: '', // 根据评论id显示 回复输入框
			    commentStatus: 0, // 按回复数 或 按时间排序显示评论
			    replyStatus: 0,
			    replyUserId: 0,
			    line:0,
			    contentEntityList:[],
			    Report:0,
			    commentAndReplyTotalCount:'',
			    replyId:'',
			    report:false,
			    reportTypeId:'',
			    reportContent:'',   
			    reportFlag:false,
			    RequestObj: {
			        status: 0,
			        pageNo: 1,
			        pageSize: 5,
			    },
			    sex:'',
			    payCardAmount:0,
			    numb:0,
			    amount:0,   
			    updateCycle:'',
			    bookIsSign:'',
			    userImage:'',
			    monthWorBookReward:[],
			    totalWorBookReward:[],
			    weekWorBookReward:[],
			    DateDay:'',
			    listnumber:3,
			    bookReward:[],
			    collectArticle: '',
			    bookHit: false,
			    contentId: '',
			    signLevel:'',
			    replyEntityList:[]
			}
		},
		
		asyncData:function(context){
			var strObj = context.params;
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
			}
			var data1 ={};
      data1.pageNo = 1;
      data1.pageSize = 10;
      data1.status = 0;
      console.log(JSESSIONID)
			return axios.all([
				axios.get(PathList.getStatus,{ headers:{'JSESSIONID': JSESSIONID }}),
				axios({
					url:PathList.queryBookDirectory,
					params:strObj,
					headers:{'JSESSIONID': JSESSIONID }
				}),
        axios.get(PathList.findUserOtherBook, { params:strObj},{ headers:{'JSESSIONID': JSESSIONID }}),   //作者其他作品的
        axios.get(PathList.queryBookRank,{ params:strObj,data:data1},{ headers:{'JSESSIONID': JSESSIONID }})      //小说目录页的打赏排行榜
			]).then(axios.spread(function(acct,perms,res1,res2){
				var bookCustom = [];
				bookCustom.push(perms.data.bookCustom);
				return {
					bookId : context.params.bookId,
					loginFlag :acct.data.loginFlag,
					loginObj : acct.data,
					bookCustom : bookCustom,
					signLevel : perms.data.bookCustom.signLevel,
	                userHead : perms.data.bookCustom.userEntity.userHead,
	                bookId : perms.data.bookCustom.bookId,
	                userId : perms.data.bookCustom.userEntity.userId,
	                collect : perms.data.bookCustom.collect,
	                attention : perms.data.bookCustom.userEntity.attention,
	                title : perms.data.bookCustom.bookName,
	                introduction : perms.data.bookCustom.bookIntroduction,
	                words : perms.data.bookCustom.bookWordCount,
	                update : perms.data.bookCustom.bookUpdate,
	                cursor : perms.data.bookCustom.bookHit,
	                BookList : perms.data.bookCustom.volumeCustomList,
	                Booktype : perms.data.bookCustom.bookTypeEntityList,
	                typeName : perms.data.bookCustom.bookTypeName,
	                Collection : perms.data.bookCustom.bookCollect,
	                bookCopperCoins : perms.data.bookCustom.bookCopperCoins,
	                authorName : perms.data.bookCustom.userEntity.userName,
	                autograph : perms.data.bookCustom.userEntity.information,
	                updateCycle : perms.data.bookCustom.updateCycle,
	                bookIsSign : perms.data.bookCustom.bookIsSign,
	                collectArticle : perms.data.bookCustom.activeStr,
	                bookHit : perms.data.bookHit,
	                contentId : perms.data.bookHit ? perms.data.bookHit.contentId :　'',	
	                bookCoverImage : perms.data.bookCustom.bookCoverImage,
	                booktTitle : res1.data.userOtherBook,
	                monthWorBookReward : res2.data.monthWorBookReward,
                    weekWorBookReward : res2.data.weekWorBookReward,
                    totalWorBookReward : res2.data.totalWorBookReward,
                    bookReward: res2.data.totalWorBookReward
				}
			}));
		},
		mounted: function () {
		    this.$nextTick(function () { 
 				if (this.bdshellJs === '') {
			        var bdPic = location.port === 80? location.hostname : location.hostname + ':' +location.port ;
			        window._bd_share_config={
			            "common":{
			              "bdSnsKey":{},
			              "bdText":this.title,
			              "bdMini":"2",
			              "bdMiniList":false,
			              "bdPic": this.bookCoverImage ? 'http://' + bdPic + this.path.ImagePath + this.bookCoverImage: '',
			              "bdStyle":"0",
			              "bdSize":"24"
			              },
			              "share":{}
			              };
			        window.bds_config = {
			            'bdText':this.title,   //'请参考自定义分享内容'  使用书名
			            'bdComment':this.introduction,  //'请参考自定义分享评论' 使用作品简介
			            'bdPic':  this.bookCoverImage ? 'http://' + bdPic + this.path.ImagePath + this.bookCoverImage: '', //'请参考自定义分享出去的图片'
			            //'searchPic':'是否自动抓取页面图片',//'0为抓取，1为不抓取，默认为0，目前只针对新浪微博'
			            //'wbUid':'您的自定义微博 ID',   //'请参考自定义微博 id'
			            //'render':false,       //'请参考自定义分享回流量统计'
			            //'review':'normal',      //'请参考自定义分享回流签名'
			            //'snsKey':{'tsina':'appkey'}   //'请参考自定义分享到平台的appkey'
			            //'bdDes':'您的自定义分享摘要',    //'请参考自定义分享摘要'
			            //'bdPopTitle':'您的自定义pop窗口标题',  //'请参考自定义pop窗口标题'
			            //'bdTop':'您的自定义侧栏高度',    //'请参考自定义侧栏高度'
			        }
			        document.getElementById('bdshell_js').src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000);
			        this.bdshellJs = '1';
			    }
		  	    var data1 = {};
		  	    data1.bookId = this.bookId;
		  	    data1.pageNo = 1;
	            data1.pageSize = 10;
	            data1.status = 0;
		  	    this.getComment(data1);
		    });
		},
		methods: {
			DayFn:function (a){
		        this.listnumber =a ;
			    if(a ==1){
			        this.bookReward = this.weekWorBookReward;
			    }else if(a ==2){
			        this.bookReward = this.monthWorBookReward
			    }else{
			        this.bookReward = this.totalWorBookReward
			    }
		    },
		    setreplyFn: function (replyId){
		        this.replyId = replyId;
		    },
		    strickieFn: function(commentId) {
			    SZXJ.http(this,'post', PathList.top, { bookId: this.bookId,commentId: commentId }, (response) => {
			        this.setComment(this.commentStatus);
			    });
		    },
		    messageShow: function(commentId, v, name, id,replyId) {
			    if(this.loginFlag){
			    	this.commentId = commentId;
			    } 
			    else{
//			    	this.$router.push({ name: 'login'})
			    	location.href = "/login"
			    }; // editor
			    var editor = {};
			    var index = 0;
			    for (var i = 0; i < this.findCommentAndReply.comment.length; i++) {
			        if (this.findCommentAndReply.comment[i].commentId === commentId) {
			            editor = this.findCommentAndReply.comment[i].editor;
			            index = 0;
			            break;
			        }
			    }
			    this.replyUserId = id;
			    this.replyId= replyId;
			    editor.$txt.html('');
			    
			    if (v === 1) {
			        editor.$txt.html('<span style="color:#00A1D6;" contenteditable="false">回复@'+name+'</span><span style="font-size:12px !important;color:#555 !important;">:</span>');
			        this.replyStatus = 1;
			    } else {
			        this.replyStatus = 0;
			    }
		    },
		    setPageCount: function(v) {
			    var obj = this.findCommentAndReply;
			    obj.pageCount =  v;
			    this.page = [];
			    for (var i = 0; i < obj.pageCount; i++) {
			        this.page.push(i+1);
			    }
			    this.findCommentAndReply.pageCount =v;
		    },
		    setPage1: function(v, commentId) { // 获取回复的
		        var index = 0;
		        for (var i = 0; i < this.findCommentAndReply.comment.length; i++) {
		            if (this.findCommentAndReply.comment[i].commentId === commentId) {
		                index = i;
		                break;
		            }
		        }
		        var _data = {
			        pageNo: v,
			        pageSize : 10,
			        commentId: this.findCommentAndReply.comment[index].commentId,
		        }
		        var obj = this.findCommentAndReply;
		        this.findCommentAndReply = {};
		        SZXJ.http(this,'get', PathList.moreReply, _data, (response) => {
			        obj.comment[index].replyEntityList = response.data;
			        obj.comment[index].pageNo = v;
			        this.findCommentAndReply = obj;
		        });
		    },
		    setPage: function(v) {
 
			    if (!v || v > this.findCommentAndReply.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 || parseInt(v) === parseInt(this.findCommentAndReply.pageNo) ) {
			        return;
			    }
//			    var obj = this.findCommentAndReply;
//			    obj.pageNo = v;
			    this.findCommentAndReply.pageNo = v;
			    var _data = {};
			    _data.bookId = this.bookId;
			    _data.pageNo = v;
			    _data.pageSize = 10;
			    _data.status = this.commentStatus;
			    this.getComment(_data); // 请求
		    },
		    setComment(v) {
		        this.commentStatus = v;
		        var _data = {};
		        _data.bookId = this.bookId;
		        _data.pageNo = this.findCommentAndReply.pageNo;
		        _data.pageSize = 10;
		        _data.status = v;
		        this.getComment(_data); // 请求
		    },
		    reportShow: function(commentId){
		        this.commentId = '';
		        this.replyId = '';
		        this.report = true;
		    },
		    reportShowFn: function(replyId){
   		        this.commentId = '';
		        this.replyId = '';
		        this.report = true; 
		        this.replyId = replyId;
		    },
		    oneFn:function(a){
		        this.reportTypeId = a ;
		    },
		    reportDown: function(){
		        this.report = false;
			    var _data={
			        reporterId:this.userId, // 被举报人的id
			        reportTypeId:this.reportTypeId, // 举报类型
			    }; 
		        if (this.commentId === '') {
		            _data.replyId = this.replyId;
		        } else {
		            _data.commentId = this.commentId;
		        }
		        SZXJ.http(this,'post', PathList.report, _data, (response) => {
//			        var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
//			        Utils.setMessage(false, '举报成功');
                    this.$refs.alert.setMessage(false, '举报成功',function(){})
			    },(err)=>{});
		    },
		    getComment(_data) {
			    SZXJ.http(this,'get', PathList.findCommentAndReply, _data, (response) => {
			        var pageNo;
			        if (this.findCommentAndReply.pageNo) {
			            pageNo = this.findCommentAndReply.pageNo
			            this.setPageCount(pageNo);
			        } else {
			            pageNo = 1;
			        }
			        
			        this.findCommentAndReply = response.data;
			        this.findCommentAndReply.page = []; 
			        this.findCommentAndReply.pageNo = pageNo;
			        // 计算评论的总页数
			        if (this.findCommentAndReply.totalCount / _data.pageSize <= 1) {
			            this.findCommentAndReply.pageCount = 1;
			        } else {
				        if (this.findCommentAndReply.totalCount % _data.pageSize === 0) {
				            this.findCommentAndReply.pageCount = this.findCommentAndReply.totalCount / _data.pageSize;
				        } else {
				            this.findCommentAndReply.pageCount = parseInt((this.findCommentAndReply.totalCount / _data.pageSize), 10) + 1;
				        }
			        }
			        for (var i = 0; i < this.findCommentAndReply.pageCount;i++) {
			            this.findCommentAndReply.page.push(i+1);
			        }
			        for (var i = 0; i < this.findCommentAndReply.comment.length;i++) {
				        // 评论楼中楼
				        this.findCommentAndReply.comment[i].editor = {};
				        this.findCommentAndReply.comment[i].page = [];
				        this.findCommentAndReply.comment[i].pageNo = 1;
				        // 计算评论楼中楼回复的总页数
				        if (this.findCommentAndReply.comment[i].totalCount / _data.pageSize <= 1) {
				            this.findCommentAndReply.comment[i].pageCount = 1;
				        } else {
				            if (this.findCommentAndReply.comment[i].totalCount % _data.pageSize === 0) {
				                this.findCommentAndReply.comment[i].pageCount = this.findCommentAndReply.comment[i].totalCount / _data.pageSize;
				            } else {
				                this.findCommentAndReply.comment[i].pageCount = parseInt((this.findCommentAndReply.comment[i].totalCount / _data.pageSize), 10) + 1;
				            }
				        }
				        for (var j = 1; j <= this.findCommentAndReply.comment[i].pageCount;j++) {
				            this.findCommentAndReply.comment[i].page.push(j);
				        }
			        }
			    });
		    },
		    saveComment: function() {
		    	
			    var _data = {
			        commentContent: this.editor.$txt.html(), //文本html内容
			        bookId: this.bookId, // 卷id
			    };
			    SZXJ.http(this,'post', PathList.saveComment, _data, (response) => {
			        this.$refs.alert.setMessage(false,response.data.msg,function(){})
			        this.editor.$txt.html('');
			        var data1 = {};
			  	    data1.bookId = this.bookId;
			  	    data1.pageNo = 1;
		            data1.pageSize = 10;
		            data1.status = 0;
			  	    this.getComment(data1);
			    },(err) => {
			      if(err.body.code==901){
			        this.$refs.alert.setMessage(true,err.body.msg,function(){
  			    		location.href = "/login"
  			    	})
			      }
			    	if(err.body.code==9001){
              this.$refs.alert.setMessage(true,err.body.msg,function(){
              })
            }
			    });
		    },
		    saveReply: function(commentId) { // 回复
			    var editor = {};
			    var index = 0;
			    for (var i = 0; i < this.findCommentAndReply.comment.length; i++) {
			        if (this.findCommentAndReply.comment[i].commentId === commentId) {
			            editor = this.findCommentAndReply.comment[i].editor;
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
			    SZXJ.http(this,'post', PathList.saveReply, _data, (response) => {     //提交回复
			        editor.$txt.html('');
			        this.getValueFn();
			        var This = this;
			        setTimeout(function(){
			            This.setPage1(This.findCommentAndReply.comment[index].pageCount,This.commentId);
			            This.commentId = -1;   
			        },300);
			    },(err)=>{});
		    },
		    setAttention: function(){
			    var _data = {};
			    _data.receiveId = this.userId;
			    SZXJ.http(this,'post', PathList.saveOrCancelAttention, _data, () => {     //保存或者取消关注
			        if (this.attention) {
			            this.$refs.alert.setMessage(false,'已取消关注',function(){
                        });
			            this.attention = false;
			        } else {
			           this.$refs.alert.setMessage(false,'已关注',function(){
                        });
			            this.attention = true;
			        }
			    },(err)=>{
			    	this.$refs.alert.setMessage(true,err.body.msg,function(){
//			    		this.$router.push({name:'login'});
			    		location.href = "/login"
			    	})
			    });
		    },
		    setCollect: function() {
			    var _data = {};
			    _data.bookId = this.bookId;
			    SZXJ.http(this,'get', PathList.getStatus, _data, (response) => {
			        if(response.data.loginFlag) {
			            this.loginFlag = response.data.status.flag;
			            this.userImage = response.data.status.userImage;
			            SZXJ.http(this,'post', PathList.saveOrDeleteBookCollect, _data, (response) => {         //保存或者取消收藏
			                if (this.collect) {
                        this.$refs.alert.setMessage(false,'已取消收藏',function(){
                        });
                        this.collect = false;
                      } else {
                        this.$refs.alert.setMessage(false,'已收藏',function(){
			                  });
			                  this.collect = true;
                      }
			            },(err)=>{});
			        }else{
			        	this.$refs.alert.setMessage(true,'你还未登录或登录已超时',function(){
//			    		   this.$router.push({name:'login'});
			    		   location.href = "/login"
			    	    })
			        }
			    });
		    },
		    nextWorksFn:function() {
			    if (this.booktTitle.length < 3) {
			        return;
			    }
			    this.zindex--;
			    if (Math.abs(this.zindex) >= (this.booktTitle.length - 3)) {
			        this.zindex = -(this.booktTitle.length - 3);
			    }
		    },
		    previousWorksFn: function() {
			    if (this.booktTitle.length < 3) {
			        return;
			    }
			    this.zindex++;
			    if (this.zindex >= 0) {
			        this.zindex = 0;
			    }
		    },
		    getValueFn: function() {
			    var _data = {};
			    _data.bookId = this.bookId;
			    SZXJ.http(this,'get', PathList.queryBookDirectory, _data, (response) => {         //获取书籍目录列表
			        // 取到数据渲染
			        this.bookCustom = response.data.bookCustom;
			        this.bookCustom = [];
			        this.signLevel = response.data.bookCustom.signLevel;
			        this.userHead = response.data.bookCustom.userEntity.userHead;
			        this.bookId = response.data.bookCustom.bookId;
			        this.userId = response.data.bookCustom.userEntity.userId;
			        this.collect= response.data.bookCustom.collect;
			        this.attention = response.data.bookCustom.userEntity.attention;
			        this.bookCustom.push(response.data.bookCustom);
			        this.title = response.data.bookCustom.bookName;
			        this.introduction =response.data.bookCustom.bookIntroduction;
			        this.words =response.data.bookCustom.bookWordCount;
			        this.update = response.data.bookCustom.bookUpdate;
			        this.cursor = response.data.bookCustom.bookHit;
			        this.BookList = response.data.bookCustom.volumeCustomList;
			        this.Booktype =response.data.bookCustom.bookTypeEntityList;
			        this.typeName =response.data.bookCustom.bookTypeName;
			        this.Collection =response.data.bookCustom.bookCollect;
			        this.bookCopperCoins =response.data.bookCustom.bookCopperCoins;
			        this.authorName =response.data.bookCustom.userEntity.userName;
			        this.autograph = response.data.bookCustom.userEntity.information;
			        this.updateCycle = response.data.bookCustom.updateCycle;
			        this.bookIsSign = response.data.bookCustom.bookIsSign;
			        this.collectArticle = response.data.bookCustom.activeStr;
			        this.bookHit = response.data.bookHit;
			        this.contentId = response.data.bookHit ? response.data.bookHit.contentId :　''
			    });
			    SZXJ.http(this,'get', PathList.findUserOtherBook, _data, (response) => {
			        // 取到数据渲染
			        this.booktTitle = response.data.userOtherBook;
			    },(err)=>{});
			    _data.pageNo = 1;
			    _data.pageSize = 10;
			    _data.status = this.commentStatus;
			    this.getComment(_data);
			    SZXJ.http(this,'get', PathList.getStatus, _data, (response) => {
			        if(response.data.loginFlag) {
			            this.loginFlag = response.data.status.flag;
			            this.userImage = response.data.status.userImage;
			        }
			    },(err)=>{});
			    SZXJ.http(this,'get', PathList.queryBookRank, _data, (response) => {
			        this.monthWorBookReward =response.data.monthWorBookReward;
			        this.weekWorBookReward =response.data.weekWorBookReward;
			        this.totalWorBookReward =response.data.totalWorBookReward;
			        this.DayFn(1);
			    },(err)=>{});
		    },
		    rewardFn: function(){
			    var _data={};
			    _data.bookId = this.bookId;
			    SZXJ.http(this,'get', PathList.getStatus, _data, (response) => {
			        if(response.data.loginFlag) {
			            this.loginFlag = response.data.status.flag;
			            this.userImage = response.data.status.userImage;
			            SZXJ.http(this,'get', PathList.cardamount, _data, (response) => {                    // 获取好人卡
					        this.popup = true;   
					        this.payCardAmount =response.data.amount.payCardAmount + response.data.amount.welfareCardAmount;
					    });
			        }else{
			        	this.$refs.alert.setMessage(true,'你还未登录或登录已超时',function(){
//			    		   this.$router.push({name:'login'})
                           location.href = "/login"
			    	    })
			        }
			    });
		    },
		    NumberFn:function(a){
		        if(this.payCardAmount<a){
		        	this.$refs.alert.setMessage(true,'你的好人卡不足，请充值',function(){
//			    	    this.$router.push({name:'login'})
 
//                      this.popup = false;
 
//                      this.rewardShowFn()
			    	  })
		        	this.popup = false;
		        }else{
		        	this.amount = a;
		            this.$set('amount',this.amount);
		        }
		    },
		    rewardShow: function(){
		        var _data={};
		        _data.amount = this.amount;
		        _data.bookId = this.bookId;
			    SZXJ.http(this,'get', PathList.cardamount, _data, (response) => {                     // 获取好人卡
			        this.payCardAmount =response.data.amount.payCardAmount + response.data.amount.welfareCardAmount;
			    });
		        this.popup = false;
		        SZXJ.http(this,'get', PathList.cardgive, _data, (response) => {
		            if(response.data.code == 200){
		                this.$refs.alert.setMessage(false,'打赏成功',function(){});
		                SZXJ.http(this,'get', PathList.queryBookRank, _data, (response) => {
		                    this.monthWorBookReward =response.data.monthWorBookReward;
		                    this.weekWorBookReward =response.data.weekWorBookReward;
		                    this.totalWorBookReward =response.data.totalWorBookReward;
		                    this.DayFn(1);
		                 });
		                return;
		            }
		        });  
		    },
		    rewardShowFn:function(){
		        this.popup = false;
		    },
		    rewardShowTowFn:function(){
		        this.report = false;
		    }
		},
		head: function(){
			return{
				title: '书籍详情-QC轻小说',
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
			    	{ rel: 'stylesheet', href: '/css/catalog.css' },
			    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
			    	{ rel: 'stylesheet', href: '/css/LOgin.css' },
			    	{ rel: 'stylesheet', href: '/css/jquery-ui.min.css' },
		  		],
		  	script:[
		  	    {src:"/lib/browserRedirect.js"}
		  	]
				
		  	}
	  	}
	}
</script>

<style scoped="scoped">
  .wangEditor-txt {
    min-height: 60px !important;
    max-height: 300px;
    margin-top: 0px !important;
    padding: 5px 10px !important;
    -webkit-user-select: text !important;
  }
  .wangEditor-container .wangEditor-txt p{
    margin: 0px !important;
    min-height: 12px !important;
    font-size: 12px !important;
    color: #555 !important;
    line-height:1.36 !important;
  }
  .wangEditor-menu-shadow{
    box-shadow: none !important;
  }
  .wangEditor-container .wangEditor-txt h1, .wangEditor-container .wangEditor-txt h2, .wangEditor-container .wangEditor-txt h3, .wangEditor-container .wangEditor-txt h4, .wangEditor-container .wangEditor-txt h5, .wangEditor-container .wangEditor-txt p {
    text-indent: 0em !important;  
  }
  .wangEditor-container, .wangEditor-container {
    border-radius: 10px;
  }
  .wangEditor-menu-container .menu-group {
    border:none !important;    
  }
  .wangEditor-menu-container {
    position: absolute;
    top: 68px;
    background: none !important;
    border: none !important;
  }
  .wangEditor-menu-container .menu-item{
    margin-right: 5px;
  }
  .wangEditor-menu-container .menu-item a{
    padding: 5px 0 0 0 !important;
    
  }
  .wangEditor-menu-container .menu-item {
    height: 20px !important;
    margin-bottom:5px !important ;
  }

</style>
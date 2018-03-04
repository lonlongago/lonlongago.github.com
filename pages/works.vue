<template>
	<div>
		<link rel="stylesheet" href="../css/wangEditor.min.css" />
		<link rel="stylesheet" href="../css/cropper.min.css" /> 
		<script src="/lib/jquery.min.js" ></script>
	    <script src="/lib/jquery-ui.min.js" ></script>
        <script src="/lib/jquery.validate.js"></script>
        <script src="../lib/wangEditor.min.js"></script>
        <script type="text/javascript" src="../lib/cropper.min.js"></script>
        <script type="text/javascript" src="../lib/require.js"></script>
		<alert ref="alert"></alert>
		<confirm ref = "confirm"></confirm>
		<myheader></myheader>
		<div v-show="bodyFlag" style="display: none;">
		    <div class="user_info_topBJ"></div>
			<div class="user_info clear"> 
			    <!-- 左边导航 --> 
				<navLeft :active = "active"></navLeft>
			    <!-- 右边内容 -->
				<div class="user_info_right">
					<div class="user_info_title">
					    <div class="titleBlock">
					     Personal Wallet
					    </div>
					    <div class="titleBlock_LG">
					           个人账单
					    </div>
					</div>
					<div class="user_info_content">
					    <div class="contribution"> 
						    <ul class="nav">
						        <li @click = "tapMove(1)" :class=" tapNumber == 1 ?'active':''"><span class="circular"></span><span class="title_name">轻小说</span></li>
						        <li @click = "tapMove(2)" :class=" tapNumber == 2 ?'active':''"><span class="circular"></span><span class="title_name">创建作品</span></li>
						        <li @click = "tapMove(3)" v-if = "updataBol" :class=" tapNumber == 3 ?'active':''"><span class="circular"></span><span class="title_name">修改作品</span></li>
						    </ul> 
						    <div class="content">
						        <div v-show = " tapNumber == 1 ?true:false">
						        	<div v-show = "detail == 1?true:false"  class="bookBlockList">
						        		<div class="bookBlockList_title">
									        <span class="hr"></span>
									        <span class="title">轻小说</span>
									        <span class="titleTwo">light novel</span>
									    </div>
									    <div class="bookBlockList" style=" box-shadow: none;">
										    <div style="min-height:500px"> 
											    <ul class="list clear">
												    <li>
													    <div class="vertical-img">
													        <a @click = "tapMove(2)">
													        	<img :src="path.ImagePath + '/img/90x126.png'" class="cover" />
													        </a>
													    </div>
												        <div class="vertical-title"></div>
												    </li>
												    <li v-for="obj in bookList">
													    <div class="vertical-img" :style=" obj.bookReviewStatus == '审核中' ? ' pointer-events: none;':''"@click = "joinDetail(obj.bookId)" >
													        <div class="state_one" v-if=" obj.bookReviewStatus == '审核中' ">
													                                           审核中
													        </div>
													        <div class="state_tow">
													                                           连载中
													        </div>
													        <img :src="path.ImageBookPath + obj.bookCoverImage" class="cover" >
													    </div>
													    <div class="vertical-title" :style=" obj.bookReviewStatus == '审核中' ? ' pointer-events: none;':'' " :title="obj.bookName">
													        {{obj.bookName}}
													    </div>
												    </li>
											    </ul>
										    </div>
										</div> 
						        	</div>
						        	<div v-show = "detail == 2?true:false" class="catalogue" >
					        			<div class="catalogue_header">
									        <span>作品目录</span>
									        <span>catalogue</span>
									    </div> 
									    <div class="appointment" v-on:click="signingFn" title="签约申请，需要字数至少达到八万字才可提交，\n详细要求请联系编辑。">
									        <img v-if="bookReviewStatus == '已审核' &amp;&amp; bookIsSign == '1'" :src="path.ImagePath + '/img/sign_15.png'" alt="" />
									        <img v-else="" :src="path.ImagePath + '/img/sign_015.png'" alt="" />
									    </div> 
									    <div class="upup" title="签约等级提升，签约作品才能操作，并且每个月只能申请一次，\n将会在一到五个工作日进行答复。" v-on:click="signingUpFn" v-if="bookReviewStatus == '已审核' &amp;&amp; bookIsSign == '1'">
									        <img :src="path.ImagePath + '/img/upup.png'" alt="" />
									    </div> 
									    <div class="upup" title="签约等级提升，签约作品才能操作，并且每个月只能申请一次，\n将会在一到五个工作日进行答复。" v-else="">
									        <img :src="path.ImagePath + '/img/up_01.png'" alt="" />
									    </div> 
									    <div class="newBookChapter" v-show="newBookChapter">
									        <div class="clearX" v-on:click="newBookChapterClearFn">
									         x
									        </div>
									        <h4 class="newBookTitle">请输入卷的标题</h4>
									        <div>
									            <input type="text" class="inputText" placeholder="第一卷" v-model="volume" />
									        </div>
									        <div class="hr"></div>
									        <a href="javascript:;" class="btn-addBookChapter" v-on:click="submitVolumeFn">提交</a>
									    </div> 
									    <div class="SubmitAudit" v-show="SubmitAudit">
									        <div class="clearX" v-on:click="SubmitAuditClearFn">
									         x
									        </div>
									        <h4 class="newBookTitle">提交审核</h4>
									        <div>
									            <textarea type="text" class="inputTextTow" placeholder="我想对编辑说(选填)" v-model="SubmitAuditvolume"></textarea>
									        </div>
									        <div class="hr"></div>
									        <a class="btn-addBookChapter" v-on:click="SetSubmitAudit">提交</a>
									    </div> 
									    <div class="newBookChapter" v-show="updateBookChapter">
									        <div class="clearX" v-on:click="updateVolumeFn">
									         x
									        </div>
									        <h4 class="newBookTitle">修改卷的标题</h4>
									        <div>
									            <input type="text" class="inputText" placeholder="修改卷名称" v-model="updateBookChapterName" />
									        </div>
									        <div class="hr"></div>
									        <a href="javascript:;" class="btn-addBookChapter" v-on:click="updateVolumeNameFn">提交</a>
									    </div> 
									    <div class="newBookChapter" v-show="updateBookContentChapter">
									        <div class="clearX" v-on:click="updateContentFnTow">
									         x
									        </div>
									        <h4 class="newBookTitle">修改章节的名称</h4>
									        <div>
									            <input type="text" class="inputText" placeholder="修改章节名称" v-model="updateBookContentChapterName" />
									        </div>
									        <div class="hr"></div>
									        <a href="javascript:;" class="btn-addBookChapter" v-on:click="updateContentNameFn">提交</a>
									    </div> 
									    <div class="sign-Block" v-show="SigNing">
									        <div class="sign_parent">
										        <div class="sign_sub">
										            <p class="sign_title">我要签约</p>
										            <p class="sign_headers"><span class="sign_sign"></span>姓名</p>
										            <input type="text" class="sign_input" v-model="uname" />
										            <p class="sign_headers"><span class="sign_sign"></span>更新方式</p>
											        <form class="sign_form">
											            <label class="sign_label" @click="signbuttomFn"><input name="sign" type="radio" value="" checked="checked" />日更</label>
											            <label class="sign_label" @click="SubmitsignbuttomFn"><input name="sign" type="radio" value="" />月更</label>
											            <p class="sign_pp" v-if=" updateType==2 ">*在一个月内，更新一次或者更新多次，所更新的字数的总和要至少达到8万字</p>
											            <p class="sign_pp" v-if=" updateType==1 ">*一个月内，必须每日更新，每日更新至少更新2000字，一个月更新字数总和达到6万字</p>
											        </form>
										            <p class="sign_headers"><span class="sign_sign"></span>联系方式</p>
											        <div class="sign_div">
											            QQ&nbsp;:
											            <input type="text" class="sign_contact" v-model="qq" />
											        </div>
											        <div class="sign_div">
											            E-meil&nbsp;:
											            <input type="text" class="sign_contact" v-model="email" />
											        </div>
											        <div class="sign_div">
											                                    手机&nbsp;:
											            <input type="text" class="sign_contact" v-model="phone" />
											        </div>
											        <div class="sign_div">
											                                   住址&nbsp;:
											            <input type="text" class="sign_contact" v-model="address" />
											        </div>
										            <div style="clear: both;"></div>
										            <p class="sign_headers TowHeadrs"><span class="sign_sign"></span>小说大纲</p>
										            <textarea type="text" class="sign_Biginput" v-model="message"></textarea>
											        <div class="sign_btn" @click="isTrueOrFalseFn">
											                                     提交申请
											        </div>
										            <div class="sign_btnTow" @click="SigNingDownFn">
										                                                 取消
								            	 	</div>
										            <img style="display:none;" :src="path.ImagePath + '/img/logo_11.png'" class="sign_img" />
										        </div>
									        </div>
									    </div> 
									    <div v-show="isTrueOrFalse" class="isTrueOrFalse isTrueOrFalseTow">
									        <div class="isTrueOrFalse_div">
									                                    提示
									        </div>
									        <span class="isTrueOrFalse_span">请注意认真审核信息是否填写正确，签约后平台将会以此信息为标准，联系作者，如需修改，请联系工作人员。 （*注：如此次申请失败，下次申请时，作品需在原基础上提高2万字数方可再次申请提交）。</span> 
									        <div class="moneyRecharge_div isTrueOrFalseDiv" @click="SigNingUpFn">
									                                   确认
									        </div> 
									        <div class="moneyRecharge_div isTrueOrFalseDiv" @click="SubmitisTrueOrFalseFn">
									                                    取消
									        </div> 
									    </div> 
									    <div style="min-height:400px;">
									        <div class="content_bookTitle">
									            <a :href="path.TemprootPath + '/catalog/' + bookCustom.bookId"><span><b>{{bookCustom.bookName}}</b>&nbsp;&nbsp;<span style="font-size:14px;">Lv.{{signLevel}}</span></span></a> 
									        </div> 
									        <div class="catalogue_list" v-for="(obj,index) in volumeCustomList">
											    <div class="list_title">
											        <h4 class="listBlock">{{obj.volumeName}}<span style="font-size:12px; padding-left:5px; font-weight:normal;  ">({{obj.volumeWordCount}})</span></h4> 
											        <div class="list_action"> 
											            <a v-if="index !== 0" @click="volumeChange(volumeCustomList[index - 1].volumeId, volumeCustomList[index].volumeId)" href="javascript:;">前移</a> 
											            <a v-else="" style="color:#cccccc;cursor: not-allowed;" href="javascript:;">前移</a> 
											            <a v-if="index !== volumeCustomList.length - 1" @click="volumeChange(obj.volumeId, volumeCustomList[index + 1].volumeId)" href="javascript:;">后移</a> 
											            <a v-else="" style="color:#cccccc;cursor: not-allowed;" href="javascript:;">后移</a> 
											            <a href="javascript:;" @click="volumeDelete(obj.volumeId)">删除</a> 
											            <a href="javascript:;" @click="updateVolumeFn(obj.volumeId)">重命名</a> 
											        </div>
											    </div> 
										        <div class="create_chapter">
												    <div class="chapter_header clear">
												        <div class="line" v-for="(bookObj,index) in obj.contentEntityList"> 
												            <div class="lineIcon">
												                <img :src="path.ImagePath + '/img/chapter_icon.jpg'" /> 
													            <div class="handle_left"> 
													                <p @click="contentChange(obj.contentEntityList[index - 1].contentId, obj.contentEntityList[index].contentId)" v-if="index !==0"><img :src="path.ImagePath + '/img/to_right.jpg'" /> 章节前移</p> 
													                <p v-else="" style="color:#cccccc;cursor: not-allowed;"><img :src="path.ImagePath + '/img/to_right.jpg'" /> 章节前移</p> 
													                <p @click="contentChange(obj.contentEntityList[index].contentId, obj.contentEntityList[index + 1].contentId)" v-if="index !== obj.contentEntityList.length - 1"><img :src="path.ImagePath + '/img/to_right.jpg'" /> 章节后移</p> 
													                <p v-else="" style="color:#cccccc;cursor: not-allowed;"><img :src="path.ImagePath + '/img/to_right.jpg'" /> 章节后移</p> 
													                <p @click="contentDelete(bookObj.contentId)"><img :src="path.ImagePath + '/img/to_right.jpg'" /> 删除章节</p> 
													                <p @click="updateContentFn(bookObj.contentId,bookObj.volumeId)"><img :src="path.ImagePath + 'img/to_right.jpg'" /> 重命名</p> 
													            </div>
												            </div>
												            <!--<span class="span" :uid="bookObj.volumeId" :uid2="bookObj.contentId" v-link="{path: '/chapter_edit/' + bookObj.volumeId + '_' +  bookObj.volumeId}">{{bookObj.contentTitle}}</span>-->
												            <span class="span" :uid="bookObj.volumeId" :uid2="bookObj.contentId" @click = "updataContent(obj.volumeId,bookObj.contentId)">{{bookObj.contentTitle}}</span>
												        </div>
											            <div class="line">
											                <div class="lineIcon">
											                    <img :src="path.ImagePath + '/img/create_icon.jpg'" /> 
											                </div> 
											                <!--<span class="span" :uid="obj.volumeId" v-link="{ path: '/chapter/' + obj.volumeId }">创建新章节</span>-->
											                <span class="span" :uid="obj.volumeId" @click = "setContent(obj.volumeId)">创建新章节</span>
											            </div>
										            </div>
										        </div>
									        </div>
									    </div>
									    <div class="chapter_handle">
									        <div class="handle_right">
										        <div>
										            <span v-on:click="newBookChapterFn">新增卷</span> 
										            <span v-if="bookReviewStatus == '未审核'" v-on:click="SubmitAuditFn">提交审核</span> 
										            <a href="JavaScript:;" @click="backHome(1)"><span>返回</span></a> 
										        </div>
									        </div>
									    </div>
								    </div>
						        	<div v-show = "detail == 3?true:false" class="chapter" >
								        <span>章节</span>
								        <span>chapter</span>
								        <div class="labelTitle clear">
								            <label class="label">标题:</label>
								            <input type="text" class="input" placeholder="请输入章节名" v-model="contentTitle" />
								        </div>
								        <div class="inputTextarea clear">
								            <textarea id="ipt-content-post" required="" spellcheck="false" placeholder="" class="form-control input-sm" style="display: none;"></textarea>
								            <div class="number_chapter">
								                        字数统计：{{ fontSize }}
									        </div>
									        <div class="chapter_handle">
										        <div class="handle_right">
										            <div>
										                <span v-on:click="submitFn">保存章节</span> 
										                <span><a href="JavaScript:;" @click="backHome(2)" style="width:100%;height:100%;display:inline-block;color:#ffffff;" >返回</a></span>
										            </div>
										        </div>
									        </div>
								        </div>
									</div>    
						        </div>
						        <div v-show = " tapNumber == 2 ?true:false">
									<div class="works"> 
									    <div v-show="imgFlag" style="top: 100px;left:400px;z-index:99999;background-color: #FFFFFF;width: 335px;height: 360px;box-shadow: 1px 1px 15px rgba(0,0,0,0.3);padding: 50px 50px 40px 70px;position: absolute;">
										    <input type="file" ref="file" style="display: none;" v-on:change="fileUpload" />
										    <div style="position: absolute;top: 50px;left: 15%;width: 232px;height: 232px;">
										        <img id="cropper-img" :src="Imgbase64 !== '' ? Imgbase64 :'../img/232x232.jpg' " style="width: 100%;height: 100%;border: 1px solid #989898;background-color: #e5e5e5;display: block;margin-left: -116px;" />
										    </div>
										    <div style="position: absolute;top: 15px;right:195px;width:84px;font-size: 12px;text-align: center;line-height: 26px;height: 26px;">
										                                 当前图片
										    </div>
										    <div style="position: absolute;right: 85px;top: 15px;width: 84px;height: 26px;border-radius: 6px;">
											    <div style="border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clickFileActiveFn">
											       重新选择
											    </div>
										    </div>
										    <div style="position: absolute;right: 85px;top:300px;width: 84px;height: 26px;border-radius: 6px;">
											    <div style="border-radius: 6px;width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clearImgFn">
											                       取消上传
											    </div>
										    </div>
										    <div style="position: absolute;right: 180px;top:300px;width: 84px;height: 26px;border-radius: 6px;">
										        <img :src="path.ImagePath + '/img/gou.png'" style="position: absolute;top: 5px;left: 5px;" />
											    <div style="padding-left: 10px;border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="activeImgFn">
											                       确认上传
											    </div>
										    </div>
										    <div style="position: absolute;width:100%;bottom:10px;left: 0px;font-size: 14px;text-align: center;">
										               支持JPG,PNG等格式,图片需小于2M
										    </div>
									    </div> 
									    <div class="works_title">
										    <ul>
											    <li class="works_sign"></li>
											    <li>创建作品</li>
											    <li class="works_sont">create a work</li>
										    </ul>
									    </div>
									    <div class="works_name"> 
										    <p class="works_titleSmall">书名：<input type="text" maxlength="18" v-model="bookName" /></p> 
										    <p class="works_titleSmall">画师：<input type="text" v-model="ulName" placeholder="没有可不填写" /></p> 
										    <p class="works_titleSmall">分类：<span id="area-cat-info" class="text-primary">{{ classList }}</span><span v-on:click="classListFn" class="span " style="padding: 2px 8px 3px 8px;">选择分类</span> </p>
										    <div class="cat-list-post" v-if="classFlag" style="display:block">
											    <div class="btn-block clear">
											        <a v-for="(obj,index) in classArr" v-on:click="clickClassFn(index)" :class="classArr[index].flag === true?'btn btn-xs btn-primary':'btn btn-xs btn-default'" data-id="obj.bookTypeId" data-name="obj.bookTypeName">{{obj.bookTypeName}}</a>
											    </div>
											    <div class="bottom-block">
											        <a data-type="submit" class="btn btn-wide btn-xs btn-primary" v-on:click="primaryFn">确定</a>
											    </div>
										    </div>
										    <form class="works_form">
											             更新：
											    <input name="sign" type="radio" value="" checked="checked" />
											    <div class="works_img" v-if="updateCycle==1" @click="SetupdateCycle"></div>
										        <div class="works_img2" v-if="updateCycle !== 1" @click="SetupdateCycle"></div>
										        <label @click="SetupdateCycle" class="works_label">日更</label>
										        <input name="sign" type="radio" value="" />
										        <div class="works_img" v-if="updateCycle==2" @click="SetupdateCycle2"></div>
										        <div class="works_img2" v-if="updateCycle !== 2" @click="SetupdateCycle2"></div>
										        <label @click="SetupdateCycle2" class="works_label">月更</label>
										    </form><p class="works_title_p" style=" margin-left: 0px;">*注意事项：一经修改，下月才会开始生效，请慎重考虑</p> 
									        <span>简介：</span>
									        <textarea placeholder="0/300字" v-model="textArea"></textarea>
										    <div style="float:left;margin:22px 45px">
										        <input style="margin-bottom:2px;vertical-align:middle;" type="checkbox" v-model="collectFlag" />
										        <a target="_blank" style="color:#FE6878;margin-left:5px;" href="/newCollect">秋季征文</a>
										    </div>
										    <div class="works_Deposit " v-on:click="submitFn1">
										                           保存
										    </div>
									    </div>
									    <div class="works_chart">
										    <img style="width:150px;height:210px" :src="path.ImagePath + '/img/user_inco.jpg'" ref="img0" />
										    <p @click="clickFileActiveFn" style="color: #fff; padding: 0px;">选择封面</p>
										    <div class="works_notes">
										        <span>注：</span>
										        <ul>
												    <li>最大上传2M</li>
												    <li>建议尺寸大小比例：</li>
												    <li>宽320px</li>
												    <li>高448px</li>
												    <li>上传前请确认比例</li>
										        </ul>
										    </div>
									    </div>
									    <div class="works_line"></div>
									    <div class="works_Remarks">
										    <label>注意事项：</label>
										    <ul>
										        <li>1.请慎重填写书名，选择作品分类，一旦提交将不可修改，书籍亦不可删除。</li>
										        <li>2.作品封面请选择大尺寸高清的ACG风格图片，本站拒绝三次元图片或与轻小说感觉严重不符的图片，请勿使用违规图片，违规者将被处罚</li>
										        <li>3.严禁盗图行为，上传插图请使用具有授权的图片！并与编辑提供授权证明。如无法提供，网站将封面撤回</li>
										        <li>4.书名与间接内容请不要填写令读者不适的内容</li>
										        <li>5.分类最多可选择五项</li>
										        <li>6.更改更新方式后，下月开始生效</li>
										        <li>7.欢迎加入轻创文学QQ群交流写作心得，作者群：562697313，加群申请请附上书籍网站后的数字。</li>
										    </ul>
									    </div>
									    <div class="Popup" style="display: none;">
										    <ul class="Popup_title">
										        <li>幻想</li>
										        <li>搞笑</li>
										        <li>后宫</li>
										        <li>科幻</li>
										        <li>恐怖</li>
										    </ul>
										    <ul class="Popup_content">
										        <li>战斗</li>
										        <li class="content_li">幻想</li>
										        <li>恋爱</li>
										        <li>异界</li>
										        <li class="content_li">搞笑</li>
										        <li>日常</li>
										        <li>校园</li>
										        <li class="content_li">后宫</li>
										        <li>推理</li>
										        <li class="content_li">科幻</li>
										        <li>治愈</li>
										        <li>超能力</li>
										        <li class="content_li">恐怖</li>
										        <li>伪娘</li>
										        <li>乙女</li>
										        <li>同人</li>
										        <li>悬疑</li>
										        <li>网游</li>
										    </ul>
									    </div>
									</div>
						        </div>
						        <div v-show = " tapNumber == 3 ?true:false">
						        	<div class="works"> 
									    <div v-show="imgFlag" style="top: 100px;left:400px;z-index:99999;background-color: #FFFFFF;width: 335px;height: 360px;box-shadow: 1px 1px 15px rgba(0,0,0,0.3);padding: 50px 50px 40px 70px;position: absolute;">
										    <input type="file" ref="file" style="display: none;" v-on:change="fileUpload" />
										    <div style="position: absolute;top: 50px;left: 15%;width: 232px;height: 232px;">
										        <img id="cropper-img" :src="Imgbase64 !== '' ? Imgbase64 :'../img/232x232.jpg' " style="width: 100%;height: 100%;border: 1px solid #989898;background-color: #e5e5e5;display: block;margin-left: -116px;" />
										    </div>
										    <div style="position: absolute;top: 15px;right:195px;width:84px;font-size: 12px;text-align: center;line-height: 26px;height: 26px;">
										                                 当前图片
										    </div>
										    <div style="position: absolute;right: 85px;top: 15px;width: 84px;height: 26px;border-radius: 6px;">
											    <div style="border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clickFileActiveFn">
											       重新选择
											    </div>
										    </div>
										    <div style="position: absolute;right: 85px;top:300px;width: 84px;height: 26px;border-radius: 6px;">
											    <div style="border-radius: 6px;width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="clearImgFn">
											                       取消上传
											    </div>
										    </div>
										    <div style="position: absolute;right: 180px;top:300px;width: 84px;height: 26px;border-radius: 6px;">
										        <img :src="path.ImagePath + '/img/gou.png'" style="position: absolute;top: 5px;left: 5px;" />
											    <div style="padding-left: 10px;border-radius: 6px;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);width:84px;font-size: 12px;height: 26px;line-height: 26px;text-align: center;cursor: pointer;" v-on:click="activeImgFn">
											                       确认上传
											    </div>
										    </div>
										    <div style="position: absolute;width:100%;bottom:10px;left: 0px;font-size: 14px;text-align: center;">
										               支持JPG,PNG等格式,图片需小于2M
										    </div>
									    </div> 
									    <div class="works_title">
										    <ul>
											    <li class="works_sign"></li>
											    <li>修改作品</li>
											    <li class="works_sont">updata the work</li>
										    </ul>
									    </div>
									    <div class="works_name"> 
										    <p class="works_titleSmall">书名：<input type="text" maxlength="18" v-model="bookName" disabled="disabled"/></p> 
										    <p class="works_titleSmall">画师：<input type="text" v-model="ulName" placeholder="没有可不填写" /></p> 
										    <p class="works_titleSmall">分类：<span id="area-cat-info" class="text-primary">{{ classList }}</span><span v-on:click="classListFn" class="span " style="padding: 2px 8px 3px 8px;">选择分类</span> </p>
										    <div class="cat-list-post" v-if="classFlag" style="display:block">
											    <div class="btn-block clear">
											        <a v-for="(obj,index) in classArr" v-on:click="clickClassFn(index)" :class="classArr[index].flag == true?'btn btn-xs btn-primary':'btn btn-xs btn-default'" data-id="obj.bookTypeId" data-name="obj.bookTypeName">{{obj.bookTypeName}}</a>
											    </div>
											    <div class="bottom-block">
											        <a data-type="submit" class="btn btn-wide btn-xs btn-primary" v-on:click="primaryFn">确定</a>
											    </div>
										    </div>
										    <form class="works_form">
											             更新：
											    <input name="sign" type="radio" value="" checked="checked" />
											    <div class="works_img" v-if="updateCycle==1" @click="SetupdateCycle"></div>
										        <div class="works_img2" v-if="updateCycle !== 1" @click="SetupdateCycle"></div>
										        <label @click="SetupdateCycle" class="works_label">日更</label>
										        <input name="sign" type="radio" value="" />
										        <div class="works_img" v-if="updateCycle==2" @click="SetupdateCycle2"></div>
										        <div class="works_img2" v-if="updateCycle !== 2" @click="SetupdateCycle2"></div>
										        <label @click="SetupdateCycle2" class="works_label">月更</label>
										    </form><p class="works_title_p" style=" margin-left: 0px;">*注意事项：一经修改，下月才会开始生效，请慎重考虑</p> 
									        <span>简介：</span>
									        <textarea placeholder="0/300字" v-model="textArea"></textarea>
										    <div style="display: none;float:left;margin:22px 45px">
										        <input style="margin-bottom:2px;vertical-align:middle;" type="checkbox" v-model="collectFlag" />
										        <a target="_blank" style="color:#FE6878;margin-left:5px;" href="/newCollect">秋季征文</a>
										    </div>
										    <div class="works_Deposit " v-on:click="submitFn2">
										                           保存
										    </div>
									    </div>
									    <div class="works_chart">
										    <img style="width:150px;height:210px" :src="path.ImagePath + '/img/user_inco.jpg'" ref="img1" />
										    <p @click="clickFileActiveFn" style="color: #fff;padding: 0px;">选择封面</p>
										    <div class="works_notes">
										        <span>注：</span>
										        <ul>
												    <li>最大上传2M</li>
												    <li>建议尺寸大小比例：</li>
												    <li>宽320px</li>
												    <li>高448px</li>
												    <li>上传前请确认比例</li>
										        </ul>
										    </div>
									    </div>
									    <div class="works_line"></div>
									    <div class="works_Remarks">
										    <label>注意事项：</label>
										    <ul>
										        <li>1.请慎重填写书名，选择作品分类，一旦提交将不可修改，书籍亦不可删除。</li>
										        <li>2.作品封面请选择大尺寸高清的ACG风格图片，本站拒绝三次元图片或与轻小说感觉严重不符的图片，请勿使用违规图片，违规者将被处罚</li>
										        <li>3.严禁盗图行为，上传插图请使用具有授权的图片！并与编辑提供授权证明。如无法提供，网站将封面撤回</li>
										        <li>4.书名与间接内容请不要填写令读者不适的内容</li>
										        <li>5.分类最多可选择五项</li>
										        <li>6.更改更新方式后，下月开始生效</li>
										        <li>7.欢迎加入轻创文学QQ群交流写作心得，作者群：562697313，加群申请请附上书籍网站后的数字。</li>
										    </ul>
									    </div>
									    <div class="Popup" style="display: none;">
										    <ul class="Popup_title">
										        <li>幻想</li>
										        <li>搞笑</li>
										        <li>后宫</li>
										        <li>科幻</li>
										        <li>恐怖</li>
										    </ul>
										    <ul class="Popup_content">
										        <li>战斗</li>
										        <li class="content_li">幻想</li>
										        <li>恋爱</li>
										        <li>异界</li>
										        <li class="content_li">搞笑</li>
										        <li>日常</li>
										        <li>校园</li>
										        <li class="content_li">后宫</li>
										        <li>推理</li>
										        <li class="content_li">科幻</li>
										        <li>治愈</li>
										        <li>超能力</li>
										        <li class="content_li">恐怖</li>
										        <li>伪娘</li>
										        <li>乙女</li>
										        <li>同人</li>
										        <li>悬疑</li>
										        <li>网游</li>
										    </ul>
									    </div>
									</div>
						        </div>
						    </div>
					    </div>
					</div>
				</div>
			</div>
	    </div>
	    <myfooter></myfooter>
	</div>
</template>

<script>
    import vue from 'vue'
	import alert from '~/components/Alert'
	import header from '~/components/Header'
	import footer from '~/components/Footer'
	import PathList from '~/components/conf'
	import navLeft from '~/components/navLeft'
	import axios from 'axios'
	import SZXJ from '~/components/vueHttp'
	import confirm from '~/components/confirm'
	export default {
		components:{
			'alert':alert,
			'myheader':header,
			'myfooter':footer,
			'navLeft':navLeft,
			'confirm':confirm
		},
		data: function(){
			return {
				detail:1,
				active:'bookBlockList',
				path: PathList,
				tapNumber:1,
				bodyFlag: true,
				szxj: SZXJ,
	        	bookList: [],
	        	classList: '',
		        classArr: [],
		        classFlag: false,
		        trueClass: 0,
		        imgFlag: false,
		        Imgbase64: '',
		        imgUrl: '',
		        ulName: '', // 画师名称
		        bookName: '',
		        textArea: '',
		        updateCycle:1,
		        collectFlag: false,  //征文
		        //作品目录更新
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
		        bookCustom:{},
		        ///修改作品
		        volumeId:-1,
		        chapter:false,
		        contentTitle: '',
	    		contentId: null,
	    		fontSize: 0,
	    		volumeTowId:'',
	    		editor:{},
	    		t:0,
	    		sort: '',
	    		updataBol:false
			}
		},
		asyncData: function(){
		},
		mounted: function(){
			this.$nextTick(function(){
//				this.detail = true;
                this.getBookListFn();
			})
	   },
	    methods: {
	    	tapMove: function(v){
	    		this.tapNumber = v;
	    		this.bookList = [];
	    		if(this.tapNumber == 1){
	    			this.detail = 1;
	    			this.updataBol = false;
	    			this.getBookListFn();
	    		};
	    		if(this.tapNumber == 2){
	    			this.bookName = '';
	    			this.textArea = '';
	    			this.sort = '';
	    			this.classArr = [];
	    			this.trueClass = 0;
	    			this.updateCycle = 1;
	    			this.bookIsSign = '';
	    			this.classList = '';
	    			this.classFlag = false;
	    			this.updataBol = false;
	    		};
	    		if(this.tapNumber == 3){
	    			var _data = {};
                    _data.bookId = parseInt(this.id, 10); 
	    			SZXJ.http(this,'get', PathList.queryBook, _data, 
				        (response) => {
//				            console.log(response);
						    this.id = response.data.bookCustom.bookId;
						    this.bookName = response.data.bookCustom.bookName;
						    this.textArea = response.data.bookCustom.bookIntroduction;
						    this.imgUrl = response.data.bookCustom.bookCoverImage;
						    this.$refs.img1.src = PathList.ImagePath + response.data.bookCustom.bookCoverImage;
						    this.sort = response.data.bookCustom.sort;
						    this.classArr = response.data.bookCustom.bookTypeEntityList;
						    this.trueClass = this.classArr.length;
						    this.updateCycle =response.data.bookCustom.updateCycle;
						    this.bookIsSign = response.data.bookCustom.bookIsSign;
						    var arrTemp = [];
						    for (var i = 0; i < this.classArr.length; i++) {
				                this.classArr[i].flag = true;
				                arrTemp.push(this.classArr[i].bookTypeName);
				      	    }
						    this.classList = arrTemp.join(',');
				    },(err)=>{
				    	this.$refs.alert.setMessage(true,err.data.msg,function(){});
				    });
	    		}
	    	},
	    	backHome:function(v){
	    		this.detail = v;
	    		if(v == 1){
	    		  this.updataBol = false;
	    			this.getBookListFn();
	    		}else if( v == 2){
	    		  
	    			this.getBookListFn1();
	    		}
	    	},
	    	joinDetail:function(v){
	    		this.id = v;
	    		this.updataBol = true;
	    		
	    		this.detail = 2
	    		this.getBookListFn1();
	    	},
	    	updataContent:function(v,t){
	    		this.volumeId = v;
	    		this.contentId = t;
	    		this.detail = 3 ;
	    		if(this.t == 0){
	    			this.editorFn();
	    			this.t = 1;
	    		}
	    		this.getContentFn();
	    	},
	    	setContent:function(v){
//	    		console.log("创建新章节");
	    		this.volumeId = v;
	    		this.contentTitle = '';
	    		this.contentId = '';
	    	    this.detail = 3 ;
                if(this.t == 0){
	    			this.editorFn();
	    			this.t = 1;
	    		}else{
	    			this.editor.$txt.html('');
	    		}
	    	},
	    	getContentFn: function() {
	        	var _data = {
	                contentId: this.contentId,
	            };
	            SZXJ.http(this,'get', PathList.ContentfindContent, _data, (response) => {
	            	this.contentTitle = response.data.contentTitle;
	            	this.volumeTowId = response.data.volumeId;
	            	this.editor.$txt.html(response.data.content);
	          	},(err)=>{
	          		this.$refs.alert.setMessage(true,err.data.msg,function(){});
	          	});
	        },
	        editorFn:function() {
	            var textarea = document.getElementById('ipt-content-post');
	            this.editor = new wangEditor(textarea);
	            this.editor.config.pasteText = true;
	            this.editor.config.uploadImgUrl = PathList.rootPath +　'/content/upload.shtml';
	            this.editor.config.uploadHeaders = {
	            	'JSESSIONID': localStorage.getItem('JSESSIONID'),
	            };
	            var This = this;
	            this.editor.onchange = function () {
	                This.fontSize = This.editor.$txt.formatText().toString().length;
//	  	            console.log(This.editor.$txt.formatText().toString().length);
		        };
	            this.editor.config.menus = ['emotion', 'img', "undo", "redo","fullscreen"];
	            this.editor.config.emotions = {
		            'default': {
		              title: '轻悦娘',
		              data: [
		                {
		                  'icon': PathList.rootPath　+　'/img/不明所以然.jpg',
		                  'value': '[不明所以然]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/伤心欲绝.jpg',
		                  'value': '[伤心欲绝]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/发呆.jpg',
		                  'value': '[发呆]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/吃惊.jpg',
		                  'value': '[吃惊]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/哭泣.jpg',
		                  'value': '[哭泣]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/害羞.jpg',
		                  'value': '[害羞]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/就是那个.jpg',
		                  'value': '[就是那个]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/微笑.jpg',
		                  'value': '[微笑]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/恼怒.jpg',
		                  'value': '[恼怒]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/悲伤.jpg',
		                  'value': '[悲伤]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/战斗力渣渣.jpg',
		                  'value': '[战斗力渣渣]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/抛媚眼.jpg',
		                  'value': '[抛媚眼]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/早就看穿一切.jpg',
		                  'value': '[早就看穿一切]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/汗.jpg',
		                  'value': '[汗]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/菜刀.jpg',
		                  'value': '[菜刀]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/那个有没有.jpg',
		                  'value': '[那个有没有]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/震惊.jpg',
		                  'value': '[震惊]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/高兴.jpg',
		                  'value': '[高兴]'
		                },
		                {
		                  'icon': PathList.rootPath　+　'/img/默默地看着.jpg',
		                  'value': '[默默地看着]'
		                }
		              ]
		            }
	            };
	            this.editor.create();
	        },
	    	submitFn:function(){  
		        var _data = {
		            formatText: this.editor.$txt.formatText(),      //文本格式化内容
		            content: this.editor.$txt.html(),      //文本html内容
		            contentTitle: this.contentTitle,    // 内容名称
		            volumeId: this.volumeId, // 卷id
		            contentId: this.contentId,
		        };
		        SZXJ.http(this,'post', PathList.saveOrUpdateContent, _data, (response) => {
		          	this.getBookListFn1();
		          	this.detail = 2;
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	       
	        getBookListFn: function() {
	            var _data = {};
		        SZXJ.http(this,'get', PathList.findBookByUser, {}, (response) => {            
		            this.bookList = response.data;
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        SetupdateCycle:function(){
		        if(this.updateCycle == 0 || this.updateCycle == 2){
		            this.updateCycle=1;
		        }
		    },
		    SetupdateCycle2:function(){
		        if(this.updateCycle == 0 || this.updateCycle == 1){
		            this.updateCycle=2;
		        }
		    },
		    submitFn1:function() {
			    if (this.bookName === '') { // 作品名称
		            this.$refs.alert.setMessage(true,'请填写作品名称',function(){})
			        return;
			    }
			    if (this.textArea.length > 300) {
		            this.$refs.alert.setMessage(true,'简介最多只能300个字',function(){})
			        return;
			    }
			    if (this.bookName.length > 18) {
		            this.$refs.alert.setMessage(true,'书名最多只能18个字',function(){})
			        return;
			    }
			    const arrTemp = [];
			    for (var i = 0; i < this.classArr.length; i++) {
			        if (this.classArr[i].flag) {
			            arrTemp.push(this.classArr[i].bookTypeId);
			        }
			    }
			    if (arrTemp.length === 0) { // arrTemp 作品分
		            this.$refs.alert.setMessage(true,'请选择作品分类',function(){})
			        return;
			    }
			    if (this.imgUrl === '') {
		            this.$refs.alert.setMessage(true,'请上传作品封面图',function(){})
			        return;
			    }
		    	var _data = new Object();
			    _data.bookId = '';
			    _data.bookName = this.bookName;
			    _data.bookIntroduction = this.textArea;
			    _data.bookCoverImage = this.imgUrl;
			    _data.sort = "少年";
			    _data.bookTypeList = arrTemp;
			    _data.updateCycle = this.updateCycle;
			    if(this.collectFlag){
			        _data.activeId = 2;
			    }
			    	//============================================
			    SZXJ.http(this,'post', PathList.saveOrUpdateBook, _data, (response) => {
			        this.$refs.alert.setMessage(false,"保存成功",function(){
			          location.href="/works";
			        });
//			        this.$router.push({ name: 'works'});
               
			    },(err)=>{
			    	   this.$refs.alert.setMessage(true,err.body.msg,function(){})
			    });
		    },
		    submitFn2:function(){
		    	if (this.bookName === '') { // 作品名称
		            this.$refs.alert.setMessage(true,'请填写作品名称',function(){})
//			        return;
			    }
			    if (this.textArea.length > 300) {
		            this.$refs.alert.setMessage(true,'简介最多只能300个字',function(){})
//			        return;
			    }
			    if (this.bookName.length > 18) {
		            this.$refs.alert.setMessage(true,'书名最多只能18个字',function(){})
//			        return;
			    }
			    const arrTemp = [];
			    for (var i = 0; i < this.classArr.length; i++) {
			        if (this.classArr[i].flag) {
			            arrTemp.push(this.classArr[i].bookTypeId);
			        }
			    }
			    if (arrTemp.length === 0) { // arrTemp 作品分
		            this.$refs.alert.setMessage(true,'请选择作品分类',function(){})
//			        return;
			    }
			    if (this.imgUrl === '') {
		            this.$refs.alert.setMessage(true,'请上传作品封面图',function(){})
//			        return;
			    }
		    	var _data = new Object();
			    _data.bookId = this.id;
			    _data.bookName = this.bookName;
			    _data.bookIntroduction = this.textArea;
			    _data.bookCoverImage = this.imgUrl;
			    _data.sort = this.sort;
			    _data.bookTypeList = arrTemp;
			    _data.updateCycle = this.updateCycle;
			    if(this.collectFlag){
			        _data.activeId = 2;
			    }
			    	//============================================
			    SZXJ.http(this,'post', PathList.saveOrUpdateBook, _data, (response) => {
			        this.$refs.alert.setMessage(false,'保存成功',function(){
			        	this.updataBol = false
			        	location.href = "/works"
			        })
			    },(err)=>{
			    	this.$refs.alert.setMessage(true,err.data.msg,function(){});
			    });
		    },
		    	//============================================
	    	dataURLtoBlob: function(dataurl) {
			    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			    while(n--){
			        u8arr[n] = bstr.charCodeAt(n);
			    }
			    return new Blob([u8arr], {type:mime});
	  		},
			convertCanvasToImage: function(canvas) {
				var image = new Image();
				image.src = canvas.toDataURL("image/png");
				return image;
			},
		    clearImgFn: function(){
		        this.imgFlag = false;
		        this.Imgbase64 = '';
		    },
		    activeImgFn: function() {
		        var This = this;
		        var data = $('#cropper-img').cropper('getImageData');
		        var canvas = $('#cropper-img').cropper('getCroppedCanvas', { width: 320, height: 448 });
		        var file = this.dataURLtoBlob(canvas.toDataURL('image/png'));
		        this.$refs.img0.src = canvas.toDataURL('image/png');
		        console.log(this.$refs.img0.src);
		        this.$refs.img1.src = canvas.toDataURL('image/png');
		        var formData = new FormData();
		        formData.append("Image", file);
		        $.ajax({
		            type: 'POST',
		            processData: false,  // 告诉jQuery不要去处理发送的数据
		            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
		            url: PathList.bookUpload,
		            data: formData, 
		            beforeSend: function(request) {
		                request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
		            },
		            success: function(data){
		                This.imgUrl = data.msg;
		                console.log(data);
		                console.log(this.imgUrl);
		                console.log(this.Imgbase64);
		                This.clearImgFn();
		            },
		            error: function(data) {
		                console.log(error);
		            }
		        });
		    },  
		    clickFileActiveFn: function() {
		        const ie = navigator.appName === 'Microsoft Internet Explorer' ? 'true' : 'false';
		        const file = this.$refs.file;
		        if (ie === 'true') {
		            // document.getElementById('android').click();
		            file.click();
		        } else {
		            const a = document.createEvent('MouseEvents'); // FF的处理
		            a.initEvent('click', true, true);
		            // document.getElementById('android').dispatchEvent(a);
		            file.dispatchEvent(a);
		        }
		    },
		    fileUpload: function(e) {
	            var file = e.target.files[0];
	            var reader = new FileReader();
	            if (file.type.indexOf('jpeg') !== -1 || file.type.indexOf('png') !== -1) {
	                reader.readAsDataURL(file);
		            reader.onload = () => {
		                this.Imgbase64 = URL.createObjectURL(file);
		                $('#cropper-img').cropper('reset').cropper('replace', this.Imgbase64);
		                this.imgFlag = true;
		                this.$refs.file.value = null;
		            };
	            } else {
	                this.$refs.alert.setMessage(true,'只支持jpg与png格式',function(){
	                })
	            }
		    },
		    classListFn: function() {
		        //============================================
		        SZXJ.http(this,'get', PathList.queryBookType, {}, 
		            (response) => {
		                this.classFlag = true;
		                var classArr = response.data;
		                if (this.classList !=='') {
			                var arrTemp = this.classList.split(",");  
			                for (var i = 0; i < classArr.length; i++) {
			                    for (var j = 0; j < arrTemp.length; j++) {
			                        if (arrTemp[j] === classArr[i].bookTypeName) {
			                            classArr[i].flag = true;
			                        }
			                    }
		                    }
			                this.classArr = classArr;
			                this.trueClass = arrTemp.length;
//			                console.log(this.classArr);
		                }else{
		                	for (var i = 0; i < classArr.length; i++) {
			                    classArr[i].flag = false;
		                    }
		                	this.classArr = classArr;
		                    this.trueClass = 0;
		                }
		                
		            }
		        );
		        //============================================
		    },
		    clickClassFn: function(v) {
//		    	console.log(this.trueClass);
		        if (this.classArr[v].flag) {
		            this.classArr[v].flag = false;
		            this.trueClass = this.trueClass - 1;
		        } else {
			        if (this.trueClass < 5) {
			            this.classArr[v].flag = true;
			            this.trueClass = this.trueClass + 1;
			        }
		        }
		    },
		    primaryFn: function() {
		        var arrTemp = [];
		        for (var i = 0; i < this.classArr.length; i++) {
			        if (this.classArr[i].flag) {
			            arrTemp.push(this.classArr[i].bookTypeName);
			        }
		        }
		        this.classList = arrTemp.join(',');
		        this.classFlag = false;
		    },
		    //、、、、、、、、、、、、、、、、、、、
		    //添加章节方法
		    //、、、、、、、、、、、、、、、、、、、
		    contentChange(contentUpId, contentDownId) {
	            var _data = {};
	            _data.contentUpId = contentUpId;
	            _data.contentDownId = contentDownId;
		        SZXJ.http(this,'get', PathList.contentChange, _data,(response) => {
		            this.getBookListFn1();
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        contentDelete(contentId) {
		        var This = this;
		        this.$refs.confirm.setConfirm('是否删除此章节',function(){
		            var _data = {};
		            _data.contentId = contentId;
		            SZXJ.http(this,'get', PathList.removeContent, _data,(response) => {
		                This.getBookListFn1();
		            },(err)=>{
		            	This.$refs.alert.setMessage(true,err.data.msg,function(){});
		            });
		        });
	        },
	        updateContentFn(volumeId, updateBookContentChapterVolumeId) {
		        if (this.updateBookChapter) {
		            this.updateBookContentChapter=false;
		            this.updateBookContentChapterId= '';
		            this.updateBookContentChapterName= '';
		            this.updateBookContentChapterVolumeId='';
		        } else {
		            this.updateBookContentChapter=true;
		            this.updateBookContentChapterId= volumeId;
		            this.updateBookContentChapterVolumeId=updateBookContentChapterVolumeId;
		        }
	        },
	        updateContentFnTow:function(){
	            this.updateBookContentChapter= false;
	        },
	        updateContentNameFn() {
		        var _data = {
		            contentTitle: this.updateBookContentChapterName, // 标题
		            contentId: this.updateBookContentChapterId, // 卷 id
		        };
		        SZXJ.http(this,'post', PathList.saveOrUpdateContent, _data, 
		            (response) => {
		              this.updateBookContentChapter= false;
		              this.updateBookContentChapterId= '';
		              this.updateBookContentChapterVolumeId= '';
		              this.updateBookContentChapterName='';
		              this.getBookListFn1();
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        volumeChange(volumeUpId, volumeDownId) {
	            var _data = {};
	            _data.volumeUpId = volumeUpId;
	            _data.volumeDownId = volumeDownId;
		        SZXJ.http(this,'get', PathList.volumeChange, _data, (response) => {
		            this.getBookListFn1();
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        volumeDelete(volumeId) {
		        var This = this;
		        this.$refs.confirm.setConfirm('是否删除卷',function(){        
		            var _data ={};
		            _data.volumeId = volumeId;
		            SZXJ.http(this,'get', PathList.removeVolume, _data, (response) => {
		                This.getBookListFn1();
		            },(err)=>{
		            	This.$refs.alert.setMessage(true,err.data.msg,function(){});
		            });
		        });
	        },
	        updateVolumeFn(volumeId) {
		        if (this.updateBookChapter) {
		            this.updateBookChapter= false;
		            this.updateBookChapterId='';
		            this.updateBookChapterName= '';
		        } else {
		            this.updateBookChapter=true;
		            this.updateBookChapterId= volumeId;
		        }
	        },
	        signbuttomFn(){
	            this.updateType= 1;
	        },
	        SubmitsignbuttomFn(){
	            this.updateType= 2;
	        },
	        signingFn(){
	            if(this.bookIsSign == '1'){
//	                var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
//	                Utils.setMessage(true , '您已签约，请勿重复提交');
	                this.$refs.alert.setMessage(true , '您已签约，请勿重复提交',function(){});
	                return;
	            } else{
		            if(this.bookReviewStatus == '已审核'){
		                if(this.bookIsSign !== '1'){
		                    this.SigNing= true;
		                } else{
		                    this.SigNing= false;
		                    if(this.bookIsSign == '2' && this.bookReviewStatus == '已下架'){
			                    var _data = {};
			                    _data.bookId = parseInt(this.id, 10);
			                    SZXJ.http(this,'post', PathList.userRegainBookSign, _data, (response) => {
			                    },(err)=>{
			                    	this.$refs.alert.setMessage(true,err.data.msg,function(){});
			                    });
		                    }
		                }
		            }
	            }
	        },
	        signingUpFn(){
		        if (this.signLevel == 1) {
		            var This = this;
//		            var Utils = This.$refs.vueAlert ? This.$refs.vueAlert : This.$parent.$refs.vueAlert;
		            this.$refs.confirm.setConfirm('是否申请签约等级提升',function(){
		                var _data = {};
		                _data.bookId = parseInt(This.id, 10);
			            SZXJ.http(this,'get', PathList.userSignLevelUp, _data, (response) => {
			                if(response.data.code == 200){
	//		                    Utils.setMessage(false, '提交成功');
	                            this.$refs.alert.setMessage(false,'提交成功',function(){})
			                    return;
			                }
			            },(err)=>{
			            	This.$refs.alert.setMessage(true,err.data.msg,function(){});
			            });
		            });
		          }
	        },
	        SigNingDownFn(){
	            this.SigNing=false;
	        },
	        SigNingUpFn(){
	            this.SigNing=false;
	            this.isTrueOrFalse= false;
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
		                this.$refs.alert.setMessage(false, '申请成功',function(){})
//		                window.location.href = PathList.TemprootPath + '/works'; 
		                this.$router.push({name:'works'})
		                return;
		            }  
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        isTrueOrFalseFn:function(){
	            var _data = {};
		        if (this.uname === '' ) {
		            this.$refs.alert.setMessage(true, '填选项不允许为空',function(){})
		        } else if( this.qq === '' ){
		            this.$refs.alert.setMessage(true, 'qq号不允许为空',function(){})
		        }else if( this.email === '' ){
		            this.$refs.alert.setMessage(true, '邮箱不允许为空',function(){})
		        }else if( this.address === '' ){
		            this.$refs.alert.setMessage(true, '地址不允许为空',function(){})
		        }else if( this.phone === '' ){
		            this.$refs.alert.setMessage(true, '电话不允许为空',function(){})
		        }else{
		            this.isTrueOrFalse = true;
		        } 
	        },
		    SubmitisTrueOrFalseFn:function(){
		        this.isTrueOrFalse = false;
		    },
	        updateVolumeNameFn() {
	            var _data = {};
	            _data.bookId = parseInt(this.id, 10);
	            _data.volumeName = this.updateBookChapterName;
	            _data.volumeId = this.updateBookChapterId;
	            SZXJ.http(this,'get', PathList.saveOrUpdateVolume, _data, 
	               (response) => {
	                this.updateBookChapter = false;
	                this.updateBookChapterId ='';
	                this.updateBookChapterName = '';
	                this.getBookListFn1();
	            },(err)=>{
	            	this.$refs.alert.setMessage(true,err.data.msg,function(){});
	            });
	        },
	        getBookListFn1: function() {
		        var _data = {};
		        _data.bookId = parseInt(this.id, 10);
		        SZXJ.http(this,'get', PathList.queryBook, _data, 
		          (response) => {
		          	this.signLevel = response.data.bookCustom.signLevel;
		          	this.bookIsSign = response.data.bookCustom.bookIsSign;
		          	this.bookReviewStatus = response.data.bookCustom.bookReviewStatus;
		          	this.bookCustom = response.data.bookCustom;
		            this.volumeCustomList = response.data.bookCustom.volumeCustomList;
		            if(this.detail ==1){
		            	this.detail = 2;
		            }
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	        newBookChapterFn: function() {
	            this.newBookChapter = true;
	        },
	        SubmitAuditFn: function() {
	            this.SubmitAudit = true;
	        },
	        newBookChapterClearFn: function() {
	            this.newBookChapter = false;
	        },
	        SubmitAuditClearFn: function() {
	            this.SubmitAudit = false;
	        },
	        submitVolumeFn: function() {
	            var _data = {};
	            _data.bookId = parseInt(this.id, 10);
	            _data.volumeName = this.volume;
	            _data.volumeId = '';
	            SZXJ.http(this,'get', PathList.saveOrUpdateVolume, _data, 
		            (response) => {
		            this.newBookChapter = false;
		            this.volume = '';
		            this.getBookListFn1();
	            },(err)=>{
	            	this.$refs.alert.setMessage(true,err.data.msg,function(){});
	            });
	        },
	        SetSubmitAudit: function() {
		        var _data = {};
		        _data.bookId = parseInt(this.id, 10);
		        _data.message = this.SubmitAuditvolume;
		        SZXJ.http(this,'post', PathList.userUpdateBookStatus, _data, (response) => {
		            this.SubmitAudit = false;             
		            this.getBookListFn1();
  	                if(response.data.code != '200' ){
		                this.$refs.alert.setMessage(true,'提交失败',function(){})      
		                return;
                    }else{
		                window.location.href = PathList.TemprootPath + '/works';
		            }
		        },(err)=>{
		        	this.$refs.alert.setMessage(true,err.data.msg,function(){});
		        });
	        },
	    },
	    head: function(){
			return{
				title: '我的投稿-QC轻小说',
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
			    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
			    	{ rel: 'stylesheet', href: '/css/user_info.css' },
			    	{ rel: 'stylesheet', href: '/css/Date.css' },
			    	{ rel: 'stylesheet', href: '/css/font-awesome.min.css' }
		  		]
			}
		}
	}
</script>

<style scoped>
	.cropper-container { margin-left: -116px !important;left: 0 !important; }
</style>
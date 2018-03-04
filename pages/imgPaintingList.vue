<template>
	<div>
	    <script type="text/javascript" src="../lib/qiniu/moxie.js" ></script>
        <script type="text/javascript" src="../lib/qiniu/plupload.dev.js" ></script>
        <script type="text/javascript" src="../lib/qiniu/qiniu.js"></script>
		<script src="/lib/jquery.min.js"></script>
		<alert ref="alert"></alert>
		<myheader></myheader>
		<confirm ref="confirm"></confirm>
		<div class="user_info_topBJ"></div>
		<div class="user_info clear"> 
		    <!-- 左边导航 --> 
			<navLeft :active = "active"></navLeft>
		    <!-- 右边内容 -->
			<div class="user_info_right">
				<div class="user_info_title">
				    <div class="titleBlock">
				        contribute
				    </div>
				    <div class="titleBlock_LG">
				                我的绘画
				    </div>
				</div>
				<div class="user_info_content">
				    <div class="contribution"> 
					    <ul class="nav">
					        <li @click = "tapMove(1)" :class=" tapNumber == 1 ?'active':''"><span class="circular"></span><span class="title_name">绘画</span></li>
					        <li @click = "tapMove(2)" :class=" tapNumber == 2 ?'active':''"><span class="circular"></span><span class="title_name">创建作品</span></li>
					        <li @click = "tapMove(3)" v-if = "updataBol" :class=" tapNumber == 3 ?'active':''"><span class="circular"></span><span class="title_name">修改作品</span></li>
					    </ul> 
					    <div class="content">
					        <div class="bookBlockList" v-show = " tapNumber == 1 ?true:false">
					        	<div v-show = "details">
					        		<div class="bookBlockList_title" v-if="!imgIconOneFlag">
									    <span class="hr"></span>
									    <span class="title">画集详情</span>
									    <span class="titleTwo">light novel</span> 
									    <div class="imgIconOne" @click="imgIconOneFn"> 
									        <span>批量操作</span> 
									    </div> 
								    </div> 
									<div class="bookBlockList_delete" v-else=""> 
									    <div class="imgPaintingList_devlete" @click="ajaxDeleteFn">
									                 删除
									    </div> 
									    <div class="imgPaintingList_back" @click="clearFn">
									                 返回
									    </div> 
									</div> 
								    <div style="min-height:500px"> 
										<ul class="list clear"> 
										    <li> 
											    <div class="vertical-img-painting"> 
											        <!--<a v-link="{path: \'/imgPaintingCreate\'}"> <img :src="path.ImagePath + \'/img/90x126.png\'" class="cover" /> </a>--> 
											         <a href="javascript:;" @click = "tapMove(2)"> <img :src="path.ImagePath + '/img/90x126.png'" class="cover" /> </a> 
											    </div>  
										        <div class="vertical-title"></div>
										    </li> 
										    <li v-for="(obj,index) in bookList" :style=" obj.checkSign == 2 ? 'cursor: no-drop;':'' "> 
											    <div class="vertical-img-painting" :style=" obj.checkSign == 2 ? 'pointer-events: none;':'' " @click="submitFn"> 
												    <div class="imgPaintingShow" v-if="imgIconOneFlag && (obj.checkSign == 0 || obj.checkSign == 3)" @click="deleteFn(index)"> 
												        <div :class="imgIconOneList[index] ? 'imgPaintingDeleteFlagTrue' : 'imgPaintingDeleteFlagFalse'"></div> 
												    </div> 
											        <div class="state_one" v-if=" obj.checkSign == 2 ">
											                         审核中
											        </div> 
											        <div class="state_tow">
											                         连载中
											        </div> 
											        <a href="javascript:;"@click="joinDetail(obj.albumId)">
											        	<img :src="obj.coverPicturePath + '&amp;imageView2/1/w/140/h/154/interlace/1/q/100|imageslim'" class="cover"  />
											        </a> 
											    </div> 
											    <div class="vertical-title" :style=" obj.checkSign == 2 ? 'pointer-events: none;':'' " :title="obj.albumName">
											        {{obj.albumName}}
											    </div> 
											</li> 
										</ul>
	                                </div>
					        	</div>
					        	<div v-show = "!details">
						            <div class="bookBlockList_title" v-if="!imgIconOneFlag">
						            	<span class="hr"></span><span class="title">画作详情</span><span class="titleTwo">light novel</span>
							            <div class="imgIconThree" @click="checkAlbum"><span>提交审核</span></div>
										      <div class="imgIconOne" @click="imgIconOneFn"><span>批量操作</span></div>
										      <div class="imgIconTwo" @click="gotoHtml"><span>查看详情</span></div>
									      </div>
									      <div class="bookBlockList_delete" v-else>
										      <div class="imgPaintingList_devlete" @click="ajaxDeleteFn1">删除</div>
									        <div class="imgPaintingList_back" @click="clearFn">返回</div>
									      </div>
									      <div style="min-height:500px">
									      <ul class="list clear">
									        <li>
										        <div class="vertical-img-painting">
  												    <a href="javascript:;" @click = "tapMove(2)">
  												      	<img :src="path.ImagePath + '/img/90x126.png'" class="cover"/>
  												    </a>
											      </div>
										        <div class="vertical-title"></div>
									        </li>
										      <li v-for="(obj,index) in bookList">
											      <div class="vertical-img-painting" :style=" checkSign == 2 ? ' pointer-events: none;':'' " @click="submitFn" >
										          <div class="imgPaintingShow" v-if="imgIconOneFlag && (checkSign == 0 || checkSign == 3)" @click="deleteFn(index)">
														    <div :class="imgIconOneList[index] ? 'imgPaintingDeleteFlagTrue' : 'imgPaintingDeleteFlagFalse'"></div>
												    	</div>
											        <div class="state_one" v-if=" checkSign == 2 ">审核中</div>
											        <div class="state_tow">连载中</div>
											        <img :src="obj.picturePath + '&imageView2/1/w/140/h/154/interlace/1/q/100|imageslim'" class="cover"  @click = "upDataPicture(obj.pictureId)"  />
											      </div>
											      <div class="vertical-title" :style=" checkSign == 2 ? ' pointer-events: none;':'' " :title="obj.pictureName">{{obj.pictureName}}</div>
										      </li>
									      </ul>
									    </div>
					        	</div>
					        </div>
					        <div class="bookBlockList" v-show = " tapNumber == 2 ?true:false">
							       <div class="works" style="height: 830px; box-shadow: none;">
  							        <div class="works_title">
  								        <ul>
  								            <li class="active"></li>
  								            <li>创建作品</li>
  								            <li class="works_sont">create a work</li>
  								        </ul>
  							        </div>
  							        <div class="works_line"></div>
  							        <div class="painterUpload">
  								        <div style="width: 580px;margin-left: 40px;">
  									        <div class="painterLine"> 
  									            <span>上传图片：</span>
  									            <input class="painterButton btn" type="button" value="添加图片" id="pickfiles" />
  									        </div>
  									        <div class="painterLine">
  									            <span>选择画集：</span>
  									            <span class="Select_C" style="box-sizing: border-box;position: relative;z-index: 999;margin-left: 20px;padding-left: 18px;padding-right: 37px;display: inline-block;line-height: 32px;height: 32px;width: 202px;border-radius: 5px;border: 1px solid #ebebeb;"> <span v-if="albumList.albumIdName == ''">无</span> <span v-else="">{{albumList.albumIdName}}</span> <span style="position: absolute;top: 5px;right: 0;height: 20px;border-left: 1px solid #eeeeee;padding-left: 9px;padding-right: 9px;"><img style="position: relative;top: -2px;height: 20px;width: 20px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADVSURBVHja7NYhDgMhEAXQmV6IA3CEvS4rSDgBCQKBRSAwWBziV7WiTbsLK9YMCW7y5wGCYQB053rQzUsAAhCAAATwFxBjhPd++bPw3iPGiGWAUorHGBRCmEaEEDDGIKUUX3oCrTX33unoJJ8313snrTUfFgM4tZ1zSCnhqC6lBOcczuaeBgAgay1yzj/Dc86w1mImcwrwQpRSvpqUUqabLwEAkDEGtdZ3s1orjDFYyVoCvBCtNbTWlpsDIL4yE+77DiKibdt4NYNlKBWAAAQggLsBzwEAP40c4XMme64AAAAASUVORK5CYII=" /></span> 
  										        <ul class="Select_Active_C" style="box-sizing: border-box;position: absolute;left: -1px;width: 202px;background-color: #f1f1f1;margin-top: -1px;border: 1px solid #ebebeb;border-top: 0;"> 
  										            <li @click="setAlbumId(obj)" class="Select_Active" style="padding-left: 18px;padding-right: 37px;color: #404040;" v-for="obj in paintingArrayList">{{obj.albumName}}</li> 
  										        </ul>
  									            </span>
  									            <input class="painterButton btn" type="button" value="新建画集" @click="showPaintingList" />
  									        </div> 
  									        <div class="painterLine">
  									            <span style="display: inline-block;text-indent: 2em;">标题：</span>
  									            <input v-model="albumList.pictureName" class="inputText" type="text" placeholder="64字符以内" />
  									        </div> 
  									        <div class="painterLine">
  										        <div>
  										            <span style="display: inline-block;text-indent: 2em;">类型：</span> 
  										            <span class="selectActive" v-if="albumList.classType == ''">选择</span> 
  										            <span class="selectActiveY" v-else>{{albumList.classTypeName}}</span> 
  										        </div> 
  										        <div style="padding-left: 5em;margin-top: 15px;">
  										           ---推荐标签---
  										        </div> 
  										        <ul style="margin-left: 5em;overflow: hidden;width: 445px;"> 
  										            <li v-for="obj in classTypeList" class="Imgtype" @click="setClassType(obj.pId,obj.typeName)">{{obj.typeName}}</li> 
  										        </ul>
  									        </div> 
  									        <div class="painterLine">
  										        <div>
  										            <span style="display: inline-block;text-indent: 2em;">风格：</span> 
  										            <span class="selectActive" v-if="albumList.styleType == ''">选择</span> 
  										            <span class="selectActiveY" v-else>{{albumList.styleTypeName}}</span> 
  										        </div>
  										        <div style="padding-left: 5em;margin-top: 15px;">
  										           ---推荐标签---
  										        </div> 
  										        <ul style="margin-left: 5em;overflow: hidden;width: 445px;"> 
  										            <li v-for="obj in styleTypeList" class="Imgtype" @click="setStyleType(obj.pId,obj.typeName)">{{obj.typeName}}</li> 
  										        </ul>
  									        </div> 
  									        <div class="painterLine">
  									            <span>设为封面：</span>
  										        <div style="display: inline-block;position: relative;top: 3px;"> 
  										            <div class="works_img2" v-if="albumList.isCover != 1" @click="setIsCover(1)"></div> 
  										            <div class="works_img" v-else @click="setIsCover(0)"></div> 
  										        </div>
  									        </div>
  									        <div class="painterLine">
  									            <span style="display: inline-block;text-indent: 2em;vertical-align: top;">简介：</span>
  									            <textarea v-model="albumList.pictureDescription" placeholder="0/300字" style="border-color: #d7d7d7;margin-left: 20px;width: 302px;height: 206px;resize: none;"></textarea>
  									        </div>
  									        <div class="btn works_Deposit" @click="submitFn1">
  									                        保存
  									        </div>
  								        </div> 
  								        <div style="height: 273px;width: 220px;position: absolute;right: 40px;top: 32px;display: table;"> 
  									        <div style="height: 239px;text-align: center;border: 1px solid #ebebeb;border-radius: 3px;display: table-cell;vertical-align: middle;box-sizing: border-box;"> 
  									            <img v-if="imgBase64 != ''" :src="imgBase64 + '&amp;imageView2/1/w/224/h/240/interlace/1/q/100|imageslim'" style="width:100%;height:100%" /> 
  									            <img v-else="" src="data:image/png;base64,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" />
  									        </div>
  									        <div style="display: table-footer-group;height: 33px;line-height: 33px;text-align: center;color: #333333;">
  									                        图片详情
  									        </div>
  									         <div style="position: absolute;width:100%;top:273px;left: 0px;font-size: 14px;text-align: center;">
                                                          支持JPG,PNG等格式,图片需小于2M
                            </div>
  								        </div> 
  								        <div v-show="paintingList.show" style="display:none;position: fixed;top: 0;left: 0;bottom: 0;right: 0;background-color: rgba(0,0,0,0.5);z-index: 99999999;"> 
  									        <div style="z-index: 999999;box-sizing: border-box;position: absolute;top: 50%;left: 50%;width: 453px;height: 340px;"> 
  										        <div style="margin: 0 auto;position: relative;width: 100%;height: 100%;top: -50%;left: -50%;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);background-color: #FFFFFF;border-radius: 4px;">
  										            <div style="color: #7e7e7e;font-size: 16px;position: absolute;top: 22px;left: 19px">
  										                               创建画集
  										            </div>
  										            <img @click="hidePaintingList" style="cursor: pointer;display: block;width: 20px;height: 20px;position: absolute;top: 13px;right: 22px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQ2NTZCNUY4MUJBMTFFNzlDMUM4MEI1QUFGQUVDQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ2NTZCNjA4MUJBMTFFNzlDMUM4MEI1QUFGQUVDQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNDY1NkI1RDgxQkExMUU3OUMxQzgwQjVBQUZBRUNBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNDY1NkI1RTgxQkExMUU3OUMxQzgwQjVBQUZBRUNBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psq/r+gAAAPsSURBVHja7FrhddowEDa8/o9H8AZxJsCwAO4ENRMEJghMgDsBMEHIAoFMUDJByQZ0AnrXfm4PVZIlWyYv71Xv6QGOfb7v7vTd6ZTe+XyOPvLoRx98fJI/er1eEKHPz88DfI1JZkpe3kP+23A4PIZ4RxU5PRlCTQHsdruUPr7QzGimDo9saTKop6aAWgMgpWP6uKc5ZUu3MCYDWRCQ/dUAkPJs7TnNRBH6g2SwddmqJ5qHKpQqz9A9Gd0zaAukEQBSnBV+lGECpdf0dU0vP3h4L8ccK38uSc4sOADE+a4KFyhe4oWnpvFDcjOSNVe8wl74bJPrBYBeUtDHSjz8QvcWoRhFANmS3BtcYm9OTF51BqAqT+MrCZ12wekcogBxi0tsoDudJyq9+w70uBSXJl0pz4M9SsozFT/hUrXm/DMxFtqjoMgZvWDddWaFtQuy8CsuZaTLqkkpsRI0uSHB5bXKAwZBnsiZKHCp4DXiDAA354i1VySrqw4RTtVY+njgQSzsaRuabAmCGWiDnykIxQ4A1s8quvRN8R2Muc6wNg8Uwvpzn4IOmdqpWgVJOIWS8EKirgUdgDGs/+ZqfRLKa+Qbze86Nyv3rsgwe9ybONpHEkhuBADej2H9rUdlKIWuTCBAh4Uo8HLXtSAYaWDzQK7U7E4DxVxkA6EoH0Ehn3dsxWJOtAC41BWo9x5swQAmJhA65ZkiPWspqU9ipVHhrigAiJ1B+YPnK461AJRKMAoEIgugvDqMHkhbCjaBCKH84ZptlYFmEd60NFBcC4Azb4Ca/mLB1rFTk7Cp9YBh0+2tPMhgERDEP+GkLuKTsh9opTxifm6jWI8hw+9k8sBexx4Oypc2qrRQbOIBIKv1gJIZc1fJpHBaxzYGELkHgLGokPUe4MzIRZx8wDHNl6w4P2ujSgkCG6W1o4dzTUmh70ogHO7FJr7zfbADgJ0IoTsUd0YWKm0biHdQXt1gHaw0qtlAFO+M4cG2wTJl4rko6JaebBHS+oUInSddhdy3dARKkcIfffNCoNCR/aCpVy3ECUiUFqmprdGR8mpHbmLaO/Rr6DEXtFrYOmQBlb/ogke/e7FGJnRp7v4641L2CsMuekXg+1X0t4X/MhqNMkPydCunmbY4OQlPpOgo5AEVj2k+RJe92A1HQG0S9TjgiOGJW6V2WjRtflnO2WZ1vdjGZ2RKppbF1RZUd6hTmt45gHVzqTjqKD44qe1WtD3kS5Cxx4bN91GpbmNRDmeG7abXcVWQc2Jw9RQnjze+IYTibx01OGcLetAtGCRDaZ3qAIEIjqgot23O2P7ozV+q2QEtxuD14KPSuff/v1XeefwUYABYG6P4+Pc8TAAAAABJRU5ErkJggg==" /> 
  										            <div style="color: #7e7e7e;font-size: 13px;position: absolute;top: 73px;left: 40px;">
  										                               画集名称：
  										            </div>
  										            <input v-model="paintingList.albumName" class="InputText_Name" style="position: absolute;top: 65px;left: 130px;padding: 0 10px;height: 30px;width: 252px;background-color: #e9e9e9;border: 0;border-radius: 3px;" type="text" /> 
  										            <div style="color: #7e7e7e;font-size: 13px;position: absolute;top: 117px;left: 40px;">
  										                                                  画集简介：
  										            </div>
  										            <textarea v-model="paintingList.description" placeholder="0/150字" style="position: absolute;top: 117px;left: 130px;padding: 2px 5px;resize: none;width: 252px;height: 150px;border: 1px solid #3fcbe4;border-radius: 3px;"></textarea> 
  										            <input class="btn" style="position: absolute;bottom: 20px;left: 151.5px;background-color: #56d2f5;width: 150px;height: 30px;border: 0;border-radius: 3px;color: #FFFFFF;" type="button" @click="addPaintingList" value="确定" />
  										        </div>
  									        </div>
  								        </div>
  								    </div>    
  							    </div>
					        </div>
					        <div class="bookBlockList" v-show = " tapNumber == 3 ?true:false">
					          <div class="works" style="height: 830px; box-shadow: none;">
					        	  <div class="works_title">
                        <ul>
                            <li class="active"></li>
                            <li>修改作品</li>
                            <li class="works_sont">updata the work</li>
                        </ul>
                      </div>
                      <div class="works_line"></div>
                      <div class="painterUpload">
                        <div style="width: 580px;margin-left: 40px;">
                          <!--<div class="painterLine"> 
                              <span>上传图片：</span>
                              <input class="painterButton btn" type="button" value="添加图片" id="pickfiles" />
                          </div>-->
                          <!--<div class="painterLine">
                              <span>选择画集：</span>
                              <span class="Select_C" style="box-sizing: border-box;position: relative;z-index: 999;margin-left: 20px;padding-left: 18px;padding-right: 37px;display: inline-block;line-height: 32px;height: 32px;width: 202px;border-radius: 5px;border: 1px solid #ebebeb;"> <span v-if="albumList.albumIdName == ''">无</span> <span v-else="">{{albumList.albumIdName}}</span> <span style="position: absolute;top: 5px;right: 0;height: 20px;border-left: 1px solid #eeeeee;padding-left: 9px;padding-right: 9px;"><img style="position: relative;top: -2px;height: 20px;width: 20px;" src="data:image/png;base64,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" /></span> 
                              <ul class="Select_Active_C" style="box-sizing: border-box;position: absolute;left: -1px;width: 202px;background-color: #f1f1f1;margin-top: -1px;border: 1px solid #ebebeb;border-top: 0;"> 
                                <li @click="setAlbumId(obj)" class="Select_Active" style="padding-left: 18px;padding-right: 37px;color: #404040;" v-for="obj in paintingArrayList">{{obj.albumName}}</li> 
                              </ul>
                              </span>
                              <input class="painterButton btn" type="button" value="新建画集" @click="showPaintingList" />
                          </div> -->
                          <div class="painterLine">
                              <span style="display: inline-block;text-indent: 2em;">标题：</span>
                              <input v-model="albumList.pictureName" class="inputText" type="text" placeholder="64字符以内" />
                          </div> 
                          <div class="painterLine">
                            <div>
                                <span style="display: inline-block;text-indent: 2em;">类型：</span> 
                                <span class="selectActive" v-if="albumList.classType == ''">选择</span> 
                                <span class="selectActiveY" v-else>{{albumList.className}}</span> 
                            </div> 
                            <div style="padding-left: 5em;margin-top: 15px;">
                               ---推荐标签---
                            </div> 
                            <ul style="margin-left: 5em;overflow: hidden;width: 445px;"> 
                                <li v-for="obj in classTypeList" class="Imgtype" @click="setClassType1(obj.pId,obj.typeName)">{{obj.typeName}}</li> 
                            </ul>
                          </div> 
                          <div class="painterLine">
                            <div>
                                <span style="display: inline-block;text-indent: 2em;">风格：</span> 
                                <span class="selectActive" v-if="albumList.styleType == ''">选择</span> 
                                <span class="selectActiveY" v-else>{{albumList.styleName}}</span> 
                            </div>
                            <div style="padding-left: 5em;margin-top: 15px;">
                               ---推荐标签---
                            </div> 
                            <ul style="margin-left: 5em;overflow: hidden;width: 445px;"> 
                                <li v-for="obj in styleTypeList" class="Imgtype" @click="setStyleType1(obj.pId,obj.typeName)">{{obj.typeName}}</li> 
                            </ul>
                          </div> 
                          <div class="painterLine">
                                <span>设为封面：</span>
                                <div style="display: inline-block;position: relative;top: 3px;"> 
                                <div class="works_img2" v-show="albumList.isCover != 1" @click="setIsCover(1)"></div> 
                                <div class="works_img" v-show="albumList.isCover == 1" @click="setIsCover(0)"></div> 
                            </div>
                          </div>
                          <div class="painterLine">
                              <span style="display: inline-block;text-indent: 2em;vertical-align: top;">简介：</span>
                              <textarea v-model="albumList.pictureDescription" placeholder="0/300字" style="border-color: #d7d7d7;margin-left: 20px;width: 302px;height: 206px;resize: none;"></textarea>
                          </div>
                          <div class="btn works_Deposit" @click="submitFn1">
                                                                     保存
                          </div>
                        </div> 
                        <div style="height: 273px;width: 220px;position: absolute;right: 40px;top: 32px;display: table;"> 
                          <div style="height: 239px;text-align: center;border: 1px solid #ebebeb;border-radius: 3px;display: table-cell;vertical-align: middle;box-sizing: border-box;"> 
                              <img v-if="imgBase64 != ''" :src="imgBase64 + '&amp;imageView2/1/w/224/h/240/interlace/1/q/100|imageslim'" style="width:100%;height:100%" /> 
                              <img v-else="" src="data:image/png;base64,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" />
                          </div>
                          <div style="display: table-footer-group;height: 33px;line-height: 33px;text-align: center;color: #333333;">
                                                              图片详情
                          </div>
                          <div style="position: absolute;width:100%;top:273px;left: 0px;font-size: 14px;text-align: center;">
                                                        支持JPG,PNG等格式,图片需小于2M
                          </div>
                        </div> 
                        <div v-show="paintingList.show" style="display:none;position: fixed;top: 0;left: 0;bottom: 0;right: 0;background-color: rgba(0,0,0,0.5);z-index: 99999999;"> 
                          <div style="z-index: 999999;box-sizing: border-box;position: absolute;top: 50%;left: 50%;width: 453px;height: 340px;"> 
                            <div style="margin: 0 auto;position: relative;width: 100%;height: 100%;top: -50%;left: -50%;box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.1);background-color: #FFFFFF;border-radius: 4px;">
                                <div style="color: #7e7e7e;font-size: 16px;position: absolute;top: 22px;left: 19px">
                                                                            创建画集
                                </div>
                                <img @click="hidePaintingList" style="cursor: pointer;display: block;width: 20px;height: 20px;position: absolute;top: 13px;right: 22px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTQ2NTZCNUY4MUJBMTFFNzlDMUM4MEI1QUFGQUVDQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTQ2NTZCNjA4MUJBMTFFNzlDMUM4MEI1QUFGQUVDQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNDY1NkI1RDgxQkExMUU3OUMxQzgwQjVBQUZBRUNBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNDY1NkI1RTgxQkExMUU3OUMxQzgwQjVBQUZBRUNBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psq/r+gAAAPsSURBVHja7FrhddowEDa8/o9H8AZxJsCwAO4ENRMEJghMgDsBMEHIAoFMUDJByQZ0AnrXfm4PVZIlWyYv71Xv6QGOfb7v7vTd6ZTe+XyOPvLoRx98fJI/er1eEKHPz88DfI1JZkpe3kP+23A4PIZ4RxU5PRlCTQHsdruUPr7QzGimDo9saTKop6aAWgMgpWP6uKc5ZUu3MCYDWRCQ/dUAkPJs7TnNRBH6g2SwddmqJ5qHKpQqz9A9Gd0zaAukEQBSnBV+lGECpdf0dU0vP3h4L8ccK38uSc4sOADE+a4KFyhe4oWnpvFDcjOSNVe8wl74bJPrBYBeUtDHSjz8QvcWoRhFANmS3BtcYm9OTF51BqAqT+MrCZ12wekcogBxi0tsoDudJyq9+w70uBSXJl0pz4M9SsozFT/hUrXm/DMxFtqjoMgZvWDddWaFtQuy8CsuZaTLqkkpsRI0uSHB5bXKAwZBnsiZKHCp4DXiDAA354i1VySrqw4RTtVY+njgQSzsaRuabAmCGWiDnykIxQ4A1s8quvRN8R2Muc6wNg8Uwvpzn4IOmdqpWgVJOIWS8EKirgUdgDGs/+ZqfRLKa+Qbze86Nyv3rsgwe9ybONpHEkhuBADej2H9rUdlKIWuTCBAh4Uo8HLXtSAYaWDzQK7U7E4DxVxkA6EoH0Ehn3dsxWJOtAC41BWo9x5swQAmJhA65ZkiPWspqU9ipVHhrigAiJ1B+YPnK461AJRKMAoEIgugvDqMHkhbCjaBCKH84ZptlYFmEd60NFBcC4Azb4Ca/mLB1rFTk7Cp9YBh0+2tPMhgERDEP+GkLuKTsh9opTxifm6jWI8hw+9k8sBexx4Oypc2qrRQbOIBIKv1gJIZc1fJpHBaxzYGELkHgLGokPUe4MzIRZx8wDHNl6w4P2ujSgkCG6W1o4dzTUmh70ogHO7FJr7zfbADgJ0IoTsUd0YWKm0biHdQXt1gHaw0qtlAFO+M4cG2wTJl4rko6JaebBHS+oUInSddhdy3dARKkcIfffNCoNCR/aCpVy3ECUiUFqmprdGR8mpHbmLaO/Rr6DEXtFrYOmQBlb/ogke/e7FGJnRp7v4641L2CsMuekXg+1X0t4X/MhqNMkPydCunmbY4OQlPpOgo5AEVj2k+RJe92A1HQG0S9TjgiOGJW6V2WjRtflnO2WZ1vdjGZ2RKppbF1RZUd6hTmt45gHVzqTjqKD44qe1WtD3kS5Cxx4bN91GpbmNRDmeG7abXcVWQc2Jw9RQnjze+IYTibx01OGcLetAtGCRDaZ3qAIEIjqgot23O2P7ozV+q2QEtxuD14KPSuff/v1XeefwUYABYG6P4+Pc8TAAAAABJRU5ErkJggg==" /> 
                                <div style="color: #7e7e7e;font-size: 13px;position: absolute;top: 73px;left: 40px;">
                                                                   画集名称：
                                </div>
                                <input v-model="paintingList.albumName" class="InputText_Name" style="position: absolute;top: 65px;left: 130px;padding: 0 10px;height: 30px;width: 252px;background-color: #e9e9e9;border: 0;border-radius: 3px;" type="text" /> 
                                <div style="color: #7e7e7e;font-size: 13px;position: absolute;top: 117px;left: 40px;">
                                                                      画集简介：
                                </div>
                                <textarea v-model="paintingList.description" placeholder="0/150字" style="position: absolute;top: 117px;left: 130px;padding: 2px 5px;resize: none;width: 252px;height: 150px;border: 1px solid #3fcbe4;border-radius: 3px;"></textarea> 
                                <input class="btn" style="position: absolute;bottom: 20px;left: 151.5px;background-color: #56d2f5;width: 150px;height: 30px;border: 0;border-radius: 3px;color: #FFFFFF;" type="button" @click="addPaintingList" value="确定" />
                            </div>
                          </div>
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
				active:'imgBlockList',
				details:true,
		    path: PathList,
				tapNumber:1,
				szxj: SZXJ,
				imgIconOneFlag: false,
        imgIconOneList: [],
        bookList: [],
        paintingList: { // 画集
      		albumName: '',
      		description:'',
      		show: false,
      	}, 
      	albumList: {
      		albumId: '',
      		albumIdName: '',
		      pictureName: '',
		  	  picturePath:'',
      		styleType: '',
      		styleTypeName: '',
      		classType: '',
      		classTypeName: '',
      		isCover: 0,
      		pictureDescription: '',
      	},
    	  classTypeList: [],
    	  styleTypeList: [],
      	paintingArrayList: [],
    	  imgBase64: '',
    	//画作详情参数
//		      	bookList: [],
//		      	imgIconOneFlag: false,
//		        imgIconOneList: [],
        albumId: '',
        checkSign: '',
        pictureId:'',
        updataBol: false,
//      paintingList: { // 画集
//        albumName: '',
//        description:'',
//        show: false,
//      }, 
//      albumList: {
//        albumId: '',
//        albumIdName: '',
//        pictureName: '',
//        picturePath: '',
//        styleType: '',
//        styleName: '',
//        classType: '',
//        className: '',
//        isCover: 0,
//        pictureDescription: '',
//      },
//      classTypeList: [],
//      styleTypeList: [],
//      paintingArrayList: [],
//      imgBase64: '',
			}
		},
		asyncData: function(){
		},
		mounted: function(){
			this.$nextTick(function(){
				this.getStatusValueFn();
				this.getBookListFn();
			})
	    },
	    methods: {
	    	tapMove: function(v){
	    		this.tapNumber = v;
	    		if(this.tapNumber == 1){
	    			this.details = true;
	    			this.imgIconOneFlag = false;
	    		  this.imgIconOneList = [];
	    		  this.bookList = [];
	    		  this.updataBol = false;
	    		  this.getBookListFn();
	    		}
	    		if(this.tapNumber == 2){
	    			this.updataBol = false;
	    			this.imgBase64 = '';
	    			this.albumList= {
              albumId: '',
              albumIdName: '',
              pictureName: '',
              picturePath:'',
              styleType: '',
              styleTypeName: '',
              classType: '',
              classTypeName: '',
              isCover: 0,
              pictureDescription: '',
            },
	    			SZXJ.http(this,'get', PathList.listAlbumForUploadPicture, {}, (response) => {         // 获取个人画集(创建使用)
				      	this.paintingArrayList = response.data.data;
				    });
				    SZXJ.http(this,'get', PathList.typeList, { typeType: 1 }, (response) => {          // 获取类型和风格列表 typeType为1时，表示获取类型
				      	this.classTypeList = response.data.data;
				    });
				    SZXJ.http(this,'get', PathList.typeList, { typeType: 2 }, (response) => {          // 获取类型和风格列表 typeType为2时，表示获取类型
				     	this.styleTypeList = response.data.data;
				    });
			    	var self = this;
			  		var uploader = Qiniu.uploader({
					    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
					    browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
					    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
					    // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
					    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
					    //uptoken : 'O5xzL_8WiWoGmI7MYp7yciX97m-vjQccfYKQpg3N:BurQwpW1U9nHZh19x44OV2e5IMk=:eyJzY29wZSI6InFjYWNnIiwiZGVhZGxpbmUiOjE1MDI1MjA1NDV9', // uptoken是上传凭证，由其他程序生成
					    // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
					    uptoken_func: function(){ // 在需要获取uptoken时，该方法会被调用
					   		var uptoken;
						    $.ajax({ 
						      	async:false,
						      	url: PathList.upLoadToken ,                                  //// 画师上传图片
						      	beforeSend:function(XMLHttpRequest){
						      		XMLHttpRequest.setRequestHeader("JSESSIONID",localStorage.getItem('JSESSIONID'))
						      	},
						      	success: function(data){
						        	uptoken = data.data;
						        },
						      	error:function(err){
						      		var errObj = JSON.parse(err.responseText);
				    				self.$refs.alert.setMessage(true,errObj.msg,function(){})
						      	}
				      	    })
					        return uptoken;
					    },
					    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
					    // downtoken_url: '/downtoken',
					    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
					    unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
					    // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
					    domain: 'http://images.qcacg.com',     // bucket域名，下载资源时用到，必需
					    //container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
					    max_file_size: '2mb',             // 最大文件体积限制
					    flash_swf_url: '../qiniu/Moxie.swf',  //引入flash，相对路径
					    max_retries: 3,                     // 上传失败最大重试次数
					    dragdrop: false,                     // 开启可拖曳上传
					    //drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
					    chunk_size: '4mb',                  // 分块上传时，每块的体积
					    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
					    //x_vars : {
					    //    查看自定义变量
					    //    'time' : function(up,file) {
					    //        var time = (new Date()).getTime();
					              // do something with 'time'
					    //        return time;
					    //    },
					    //    'size' : function(up,file) {
					    //        var size = file.size;
					              // do something with 'size'
					    //        return size;
					    //    }
					    //},
					    filters : {
						    max_file_size : '100mb',
						    prevent_duplicates: true,
						    // Specify what files to browse for
						    mime_types: [
						       // {title : "flv files", extensions : "flv"} // 限定flv后缀上传格式上传
						       // {title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
						        {title : "Image files", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
						       // {title : "Zip files", extensions : "zip"} // 限定zip后缀上传
						    ]
						},
					    init: {
					        'FilesAdded': function(up, files) {
					            plupload.each(files, function(file) {
					                // 文件添加进队列后，处理相关的事情
					            });
					        },
					        'BeforeUpload': function(up, file) {
					               // 每个文件上传前，处理相关的事情
					            if(file.size>2*1024*1024){
					              self.$refs.alert.setMessage(true,"图片不得大于2Mb",function(){
					                return
					              })
					            }
					        },
					        'UploadProgress': function(up, file) {
					               // 每个文件上传时，处理相关的事情
					        },
					        'FileUploaded': function(up, file, info) {
					        		var res = JSON.parse(info.response);
					        		self.albumList.picturePath = res.key;
					      			$.ajax({ 
								      	async:false,
								      	//contentType: "application/x-www-form-urlencoded"
								      	url: PathList.testUrl, 
								      	data: { "fileName": res.key },
								      	
								      	beforeSend:function(XMLHttpRequest){
								      		XMLHttpRequest.setRequestHeader("JSESSIONID",localStorage.getItem('JSESSIONID'))
								      	},
								      	success: function(data){
								        	self.imgBase64 = data.data;
								      	},
								      	error:function(err){
				        					var errObj = JSON.parse(err.responseText);
			    						    self.$refs.alert.setMessage(true,errObj.msg,function(){})		
								      	}
							      	});
					        			// 每个文件上传成功后，处理相关的事情
					              // 其中info是文件上传成功后，服务端返回的json，形式如：
					              // {
					              //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
					              //    "key": "gogopher.jpg"
					              //  }
					              // 查看简单反馈
												//  var domain = up.getOption('domain');
												//  var res = JSON.parse(info.response);
												//  var sourceLink = domain +"/"+ res.key; // 获取上传成功后的文件的Url
					        },
					        'Error': function(up, err, errTip) {
					               //上传出错时，处理相关的事情
					        },
					        'UploadComplete': function() {
					               //队列文件处理完毕后，处理相关的事情
					        },
					        'Key': function(up, file) {
					            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
					            // 该配置必须要在unique_names: false，save_key: false时才生效
					            var key = "";
					            // do something with key here
					            return key
					        }
					    }
					});
	    		}
	    	  if(this.tapNumber == 3){
	    	    this.imgBase64 = '';
//  	      SZXJ.http(this,'get', PathList.listAlbumForUploadPicture, {}, (response) => {
//            this.paintingArrayList = response.data.data;
//          });
//          SZXJ.http(this,'get', PathList.typeList, { typeType: 1 }, (response) => {
//            this.classTypeList = response.data.data;
//          });
//          SZXJ.http(this,'get', PathList.typeList, { typeType: 2 }, (response) => { 
//            this.styleTypeList = response.data.data;
//          });
////          var albumId = location.href.toString();
////          albumId = albumId.substr(albumId.lastIndexOf('/'), albumId.length);
//          SZXJ.http(this,'get', PathList.getPictureDetail, { pictureId: this.albumId }, (response) => { 
//            this.albumList = response.data.data;
//            this.imgBase64 = response.data.data.picturePath;
//            console.log(response.data.data);
//            console.log(this.imgBase64);
//          });
//          this.albumList.albumId = this.albumId;
	    	  }
	    	},
	    	joinDetail:function(albumId){
//	    	  console.log(albumId);
	    		this.albumId = albumId;
	    		this.details = false;
	    		this.imgIconOneFlag = false;
	    		this.imgIconOneList = [];
	    		this.BookList = [];
	    		this.getBookListFn1();
	    	},
	    	upDataPicture:function(v){
    	    this.tapNumber = 3;
    	    this.imgBase64 = '';
    	    this.updataBol = true;
    	    this.pictureId = v;
    	    SZXJ.http(this,'get', PathList.listAlbumForUploadPicture, {}, (response) => {
            this.paintingArrayList = response.data.data;
          });
          SZXJ.http(this,'get', PathList.typeList, { typeType: 1 }, (response) => {
            this.classTypeList = response.data.data;
          });
          SZXJ.http(this,'get', PathList.typeList, { typeType: 2 }, (response) => { 
            this.styleTypeList = response.data.data;
          });
//          var albumId = location.href.toString();
//          albumId = albumId.substr(albumId.lastIndexOf('/'), albumId.length);
          SZXJ.http(this,'get', PathList.getPictureDetail, { pictureId: v }, (response) => { 
            this.albumList = response.data.data;
            if(!response.data.data){
              this.albumList.isCover = 0;
            }
            this.imgBase64 = response.data.data.picturePath;
          });
          this.albumList.albumId = this.albumId;
	    	},
	    	submitFn:function(){},
	    	//复用的方法
        imgIconOneFn:function(){
        	if (this.imgIconOneFlag){
        		this.imgIconOneFlag = false;
        	} else {
        		this.imgIconOneFlag = true;
        	}
        },
        deleteFn:function(index){
        	var arr = this.imgIconOneList;
        	if (arr[index]) {
        		arr[index] = false;
        	} else {
        		arr[index] = true;
        	}
        	this.imgIconOneList = [];
        	this.imgIconOneList = arr;
        },
        //
        clearFn:function(){
        	var arr = this.imgIconOneList;
        	for (var i = 0; i < arr.length;i++) {
        		arr[i] = false;
        	}
        	this.imgIconOneFlag = false;
        	this.imgIconOneList = [];
        	this.imgIconOneList = arr;
        },
        ajaxDeleteFn: function(){
        	var arr = [];
        	for (var i = 0; i < this.imgIconOneList.length;i++) {
        		if (this.imgIconOneList[i]) {
        			arr.push(this.bookList[i].albumId);
        		}
        	}
        	if (arr.length == 0) {
	          this.$refs.alert.setMessage(true,'请选择要删除的内容',function(){})
		        return;
        	}
        	var _data = {};
        	_data.albumIds = arr.join(',');
        	this.getStatusValueFn();
	        SZXJ.http(this,'get', PathList.removeAlbums, _data, (response) => {   
	            this.clearFn();
	            this.getBookListFn();
	        },(err)=>{
	        	this.$refs.alert.setMessage(true,err.body.msg,function(){})
	        });
        },
		    ajaxDeleteFn1: function(){
        	var arr = [];
        	for (var i = 0; i < this.imgIconOneList.length;i++) {
        		if (this.imgIconOneList[i]) {
        			arr.push(this.bookList[i].pictureId);
        		}
        	}
        	if (arr.length == 0) {
	            this.$refs.alert.setMessage(true,'请选择要删除的内容',function(){})
		        return;
        	}
        	var _data = {};
        	_data.pictureIds = arr.join(',');
	        SZXJ.http(this,'get', PathList.removePictures, _data, (response) => { 
	          	this.clearFn();
	            this.getBookListFn1();
	        });
        },
        getBookListFn: function() {
          var _data = {};
	        SZXJ.http(this,'get', PathList.myselfAlbums, {}, (response) => { 
	          this.bookList = response.data.data.list;
		            this.imgIconOneList.length = this.bookList.length;
	        });
        },
        getBookListFn1: function() {
	        var _data = {};
	        SZXJ.http(this,'get', PathList.albumDetail, { "albumId": this.albumId }, (response) => { 
	            this.bookList = response.data.data.pictureList;
	            this.checkSign = response.data.data.album.checkSign;
	            this.imgIconOneList.length = this.bookList.length;
	        });
        },
        //创建作品方法
        setStyleType:function(styleType,Name){
	      	this.albumList.styleType = styleType;
	      	this.albumList.styleTypeName = Name
		    },
		    setClassType:function(classType,Name){
		      	this.albumList.classType = classType;
		      	this.albumList.classTypeName = Name;
		    },
		    setStyleType1:function(styleType,Name){
          this.$set(this.albumList,'styleType',styleType);
          this.$set(this.albumList,'styleTypeName',Name);
          this.$set(this.albumList,'styleName',Name);
        },
		    setClassType1:function(classType,Name){
         
          this.$set(this.albumList,'classType',classType);
          this.$set(this.albumList,'classTypeName',Name);
          this.$set(this.albumList,'className',Name);
          
        },
		    setAlbumId:function(o){
		      	this.albumList.albumId = o.albumId;
		      	this.albumList.albumIdName = o.albumName;
		    },
		    addImgPainting:function(){
		    },
		    showPaintingList:function(){
		      	this.paintingList.show = true;
		    },
		    hidePaintingList:function(){
		      	this.paintingList.show = false;
		    },
		    addPaintingList:function(){
	      	var obj = this.paintingList;
	      	if (!obj.albumName) {
	      		this.paintingList.show = false;
		      	this.paintingList.albumName = '';
		      	this.paintingList.description = '';
		        this.$refs.alert.setMessage(true,'画集名称不能为空',function(){})
	      		return;
	      	}
	      	SZXJ.http(this,'get', PathList.createAlbum, this.paintingList, (response) => { 
	     			SZXJ.http(this,'get', PathList.listAlbumForUploadPicture, {}, (res) => {
	      			this.paintingArrayList = res.data.data;
	    			});
	        });
	      	this.paintingList.show = false;
	      	this.paintingList.albumName = '';
	      	this.paintingList.description = '';
		    },
		    setIsCover:function(cover){
		      this.$set(this.albumList,'isCover',cover);
		    },
		    submitFn1: function() {
	      	var This = this;
	      	if(this.tapNumber ==2){
	      	  if (!this.albumList.albumId) {
              this.$refs.alert.setMessage(true,'请选择画集',function(){})
              return;
            }
            if (!this.albumList.pictureName) {
              this.$refs.alert.setMessage(true,'请输入标题',function(){})
              return;
            }
            if (!this.albumList.picturePath) {
              this.$refs.alert.setMessage(true,'图片未上传，不允许提交',function(){})
              return;
            }
            if (!this.albumList.styleType) {
              this.$refs.alert.setMessage(true,'请选择风格',function(){})
              return;
            }
            if (!this.albumList.classType) {
              this.$refs.alert.setMessage(true,'请选择类型',function(){})
              return;
            }
	      	  var oData = new FormData();
            oData.append("albumId", this.albumList.albumId);
            oData.append("pictureName", this.albumList.pictureName);
            oData.append("picturePath", this.albumList.picturePath);
            oData.append("styleType", this.albumList.styleType);
            oData.append("classType", this.albumList.classType);
            oData.append("pictureDescription", this.albumList.pictureDescription);
            oData.append("isCover", this.albumList.isCover);
	      	  SZXJ.http(this,'post', PathList.savePicture, oData, (response) => { 
			        this.$refs.alert.setMessage(false,'创建画作成功',function(){
			        	location.href = "/imgPaintingList"
			        })
		        });
	      	};
	      	if(this.tapNumber ==3){
	      	  if (!this.albumList.pictureName) {
	              this.$refs.alert.setMessage(true,'请输入标题',function(){})
	              return;
	            }
	            if (!this.albumList.styleType) {
	             this.$refs.alert.setMessage(true,'请选择风格',function(){})
	              return;
	            }
	            if (!this.albumList.classType) {
	              this.$refs.alert.setMessage(true,'请选择类型',function(){})
	              return;
	            }
	      	     var oData = new FormData();
	      	     oData.append("albumId", this.albumList.albumId);
	      	     oData.append("pictureId", this.albumList.pictureId); 
               oData.append("pictureName", this.albumList.pictureName);
               oData.append("picturePath", this.albumList.picturePath);
               oData.append("styleType", this.albumList.styleType);
               oData.append("classType", this.albumList.classType);
               oData.append("pictureDescription", this.albumList.pictureDescription);
               oData.append("isCover", this.albumList.isCover);
               var isCover = this.albumList.isCover;
               var albumId = this.albumList.albumId;
               var pictureId = this.albumList.pictureId;
	             SZXJ.http(this,'post', PathList.updatePictureDetail, oData, (response) => { 
                  if(isCover ==1){
                    SZXJ.http(this,'get', PathList.upDateAlbumCover, {albumId:albumId,pictureId:pictureId},()=>{
                      this.$refs.alert.setMessage(false,'更新画作成功',function(){
                        location.href = "/imgPaintingList";
                      })
                    })
                  }else{
                     this.$refs.alert.setMessage(false,'更新画作成功',function(){
                        location.href = "/imgPaintingList";
                      })
                  }
	            },(err)=>{
	              this.$refs.alert.setMessage(true,err.body.msg,function(){})
	            });
	      	}
		    },
		    getStatusValueFn: function(){
	        	 SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
		        	if(response.data.loginFlag){
		        		this.userName = response.data.status.userName;
			          this.book = response.data.book;
			          this.official = response.data.official;
			          this.reply = response.data.reply;
			          this.system = response.data.system;
			          this.number1 = response.data.system + response.data.reply + response.data.official + response.data.book;
		        	}else{
		        		this.$refs.alert.setMessage(true,"你还未登录或登录超时",function(){
                  location.href = "/login"
		        		})
		        	}
		        });
	        },
	        //画作详情方法
	        gotoHtml:function(){
	      		var hostname = location.hostname.toString().indexOf('http://') == -1 ? 'http://' + location.hostname : location.hostname;
	      		if (location.port == 80) {
	      			
	      		} else {
	      			hostname += ':'+location.port;
	      		}
	      		window.open(hostname + '/painter/worksDetails/' + this.albumId);
	      	},
	        checkAlbum:function(){
	       		var This = this;
		        this.$refs.confirm.setConfirm('是否申请审核',function(){
	            SZXJ.http(this,'get', PathList.checkAlbum, { albumId:This.albumId }, (response) => { 
	          		location.href = "/imgPaintingList"
	          	});
		        });
	        },
	    },
	    head: function(){
			return{
				title: '我的画作-QC轻小说',
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

</style>
<template>
	<div style="background-color: #f1f1f1;">
		<script src="/lib/jquery.min.js" ></script>
		<script src="/lib/cropper.min.js"></script>
		<div id="order">
			<alert ref="alert"></alert>
		    <div id="money"></div>
		    <myheader></myheader>
		    <div v-if=" popFlag == 3 " @click="shutPopFn" style="top:0;position: fixed;width: 100%;height: 100%;background-color: rgba(255,255,255,0);z-index: 9;"></div>
		    <!--查看画稿-->
		    <div v-if="ImgFlag" class="Img_background">
			      <div class="background_black" ></div>
			      <div @click="seeDrawFn" class="shut">
			        <img src="/img/painter/shut.png" alt="" />
			      </div>
			      <div @click="seeDrawFn" class="img_box"><img class="img" :src=" path.ImagePath  + 'Controller'+ typeList.imageAddress " alt="" /></div>
			      <div @click="trueOrnoDrawFn(1)" class="true">确认</div>
	        	  <div @click="trueOrnoDrawFn(2)" class="cancel">退稿</div>
		    </div>
		    <!--查看画稿--> 
		    <!--申诉和取消弹窗-->
		    <div class="pop_Mask" v-if=" popFlag == 5 " >
		        <div class="black_Mask"></div>
		        <div class="extended_box payment">
			          <div class="head" style="margin-bottom: 20px;">{{title}}</div>
			          <textarea  class="describe" v-model="message" placeholder="请写下在交易过程中的不愉快，我们将尽快处理您的请求"></textarea>
			          <ul class="process extended">
			            <li class="center" style="margin-top: 0px;">
			              <div v-if=" title == '拒绝企划方请求' || title == '拒绝画师请求' " @click="validationOrNotCanFn(2)" class="true">确认</div>
			              <div v-if=" title == '企划取消' " @click="cancelFn" class="true">确认</div>
			              <div v-if=" title == '企划申诉' " @click="appealFn" class="true">确认</div>
			              <div @click="shutPopFn" class="true cancel">取消</div>
			            </li>
			          </ul>
		        </div>
		      </div>
	        <!--申诉和取消弹窗 end-->
	        <!--延长截稿日期弹窗-->
		      <div class="pop_Mask" v-if=" popFlag == 4 " >
		        <div class="black_Mask"></div>
		        <div class="extended_box payment">
		          <div class="head">延长截稿日期</div>
		          <ul class="process extended">
		            <li>
		              <div class="title">当前截稿日期：</div>
		              <div class="specific"><span>{{ szxj.getLocalDate(order.deliveryTime) }}</span></div>
		            </li>
		            <li>
		              <div class="title">追加时间(天)：</div>
		              <input class="number" type="number" placeholder="输入追加天数" v-model="dayNumber" />
		            </li>
		            <li>
		              <div class="title">确认日期：</div>
		              <div class="specific"><span>{{ szxj.getLocalDate(order.deliveryTime + dayNumber*86400000) }}</span></div>
		            </li>
		            <li class="center">
		              <div @click="addTimeFn(szxj.getLocalDate(order.deliveryTime + dayNumber*86400000))" class="true">确认</div>
		              <div @click="shutPopFn" class="true cancel">取消</div>
		            </li>
		          </ul>
		        </div>
		      </div>
		      <!--延长截稿日期弹窗end-->
		      <!--追加金额  and 账户支付 弹窗-->
			    <div class="pop_Mask" v-if=" popFlag == 1 " >
			      	<div class="black_Mask"></div>
			        <div class="payment">
			          <div class="head">{{title}}</div>
			          <ul class="process">
			            <li>
			              <div class="title">账户余额：</div>
			              <div class="specific"><span><b>{{ amount.unexchangeableCashAmount + amount.exchangeableCashAmount}}</b>.00</span>&nbsp;&nbsp;&nbsp;元</div>
			            </li>
			            <li>
			              <div class="title top">选择支付方式：</div>
			              <div class="mode">
			<!--                <div class="choose"><img @click="chooseFlagFn(3)"  class="bg" :src=" chooseFlag == 3 ? '/img/bg2_03.png' : '/img/bg_03.png' "/><span>账户支付</span></div>
			-->                <div class="choose margin_bottom"><img @click="chooseFlagFn(2)" class="bg bg_top" :src=" chooseFlag == 2 ? '/img/bg2_03.png' : '/img/bg_03.png' " alt="" /><img src="/img/app_index/recharge_05.png" alt="" /></div>
			              </div>
			            </li>
			            <li>
			              <div class="title top">使用福利金额：</div>
			              <div class="mode">
			                <div class="choose"><img class="isWelfare" @click="isWelfareFn" :src=" isWelfareFlag == 1 ? '/img/bg2_03.png' : '/img/bg_03.png' " /><span class="welfare">*您有{{amount.welfareCashAmount}}元福利金额</span></div>
			              </div>
			            </li>
			            <li>
			              <div class="title middle">支付金额：</div>
			              <input class="number" type="number" v-model="actualAmount" />
			            </li>
			            <li>
			              <div class="title">实付金额：</div>
			              <div class="specific" v-if="isWelfareFlag == 1" >
			                <span class="red">
			                  <b v-if="actualAmount && actualAmount - amount.welfareCashAmount - (amount.unexchangeableCashAmount + amount.exchangeableCashAmount) > 0 ">{{ actualAmount - amount.welfareCashAmount - (amount.unexchangeableCashAmount + amount.exchangeableCashAmount) }}</b><b v-else>0</b>.00</span>&nbsp;&nbsp;&nbsp;元    
			              </div>
			              <div class="specific" v-else>
			                <span class="red"><b v-if="actualAmount - (amount.unexchangeableCashAmount + amount.exchangeableCashAmount) > 0 ">{{ actualAmount - (amount.unexchangeableCashAmount + amount.exchangeableCashAmount)}}</b><b v-else>0</b>.00</span>&nbsp;&nbsp;&nbsp;元</div>
			            </li>
			            <li class="center">
			              <div @click="appendAmount" class="true">确认</div>
			              <div @click="shutPopFn" class="true cancel">取消</div>
			            </li>
			          </ul>
			        </div>
			    </div>
			    <!--追加金额  and 账户支付 弹窗 end-->
			    <!-- 评价 弹窗-->
			     <div class="pop_evaluate"  v-if=" popFlag == 2" >
			          <div class="black_evaluate"></div>
			          <div class="evaluate">
			            <img @click="shutPopFn" class="shut" src="/img/painter/shut.png" alt="" />
			            <div class="head">{{order.demand}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="value">￥{{order.margin}}</span></div>
			            <ul class="process">
			              <li>
			                <div class="title">总评价：</div>
			                <div class="fraction"> <img src=""/>
			                  <img class="star" @click="evaluateFn(1,'总评价')" :src=" evaluateFlag >= 1 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(2,'总评价')" :src=" evaluateFlag >= 2 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(3,'总评价')" :src=" evaluateFlag >= 3 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(4,'总评价')" :src=" evaluateFlag >= 4 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(5,'总评价')" :src=" evaluateFlag == 5 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                </div>
			              </li>
			              <li>
			                <div class="title">画稿质量：</div>
			                <div class="fraction">
			                  <img class="star" @click="evaluateFn(1,'画稿质量')" :src=" qualityFlag >= 1 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(2,'画稿质量')" :src=" qualityFlag >= 2 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(3,'画稿质量')" :src=" qualityFlag >= 3 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(4,'画稿质量')" :src=" qualityFlag >= 4 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(5,'画稿质量')" :src=" qualityFlag == 5 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                </div>
			              </li>
			              <li>
			                <div class="title">专业度：</div>
			                <div class="fraction">
			                  <img class="star" @click="evaluateFn(1,'专业度')" :src=" majorFlag >= 1 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(2,'专业度')" :src=" majorFlag >= 2 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(3,'专业度')" :src=" majorFlag >= 3 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(4,'专业度')" :src=" majorFlag >= 4 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                  <img class="star" @click="evaluateFn(5,'专业度')" :src=" majorFlag == 5 ? '/img/painter/star_02.png':'/img/painter/star_01.png'" alt="" />
			                </div>
			              </li>
			              <li class="label">
			                <div class="title"><img src="/img/painter/label.png"/>：</div>
			                <div class="fraction">
			                  <div @click="addLabelFn(0)" class="add" v-if=" addFlag == 0 && labelFlag < 3 ">
			                    <div class="add_state">添加标签</div><div class="add_blue"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUFDN0Q3MzQ4RTFCMTFFN0I3Q0RERTM4MzQzQTlCNkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUFDN0Q3MzU4RTFCMTFFN0I3Q0RERTM4MzQzQTlCNkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQUM3RDczMjhFMUIxMUU3QjdDRERFMzgzNDNBOUI2QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFQUM3RDczMzhFMUIxMUU3QjdDRERFMzgzNDNBOUI2QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu1pLkwAAADOSURBVHja7JrBCcMwDEXjkns7QkdwJmhH6SZNN8oI7QTNKOkErgSGGoNzqXQwvA8fFAyyH5EMCgkppaFnHYbOBcCOovidHd120R5w8pJ+Wrz28XwDp0ZMDwAAAAAAAAAAAAAAAAAAJgrVVwkd/e5GA0gs8mzi1SCn5nmUuWoA3/nVRnr4qVVCoYeqKR/GavEmng1L6Jjjj2EJzXs9YKmn+JLjl/jKLQQAAAAAAAAAAAAAAAAA9AKwNWJTjY4AOvqdi9hnQOZnDwD+01eAAQDtyrSdVxLqxgAAAABJRU5ErkJggg==" alt="" /></div>
			                  </div>
			                  <div v-if=" addFlag == 1 " class="add add_type">
			                    <img @click="addLabelFn(1)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTU4NDM0ODk4RTFFMTFFN0E3NjVERDg0QzZDODYwMEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTU4NDM0OEE4RTFFMTFFN0E3NjVERDg0QzZDODYwMEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNTg0MzQ4NzhFMUUxMUU3QTc2NUREODRDNkM4NjAwQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNTg0MzQ4ODhFMUUxMUU3QTc2NUREODRDNkM4NjAwQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp3ZZ1kAAAK7SURBVHja7JnLahRBFEB7onGSyCRZZaEQcWGyiQtJxEAkoBhXvhBFNGDEP/BH3PgBrtwJ8REfqIgZfJvgQgUdREXRlaAhOnE0SXsKbmNZEvoxt0aDfeGsprurzqUet2oKYRgGyzmagmUeuUAukAv8JwLNDexTMc3DKxM+twHWQhec8SzQB63S5unYp81GFkMJrsEnqMBYgneyMgBn4SUswMa4d5J8dH34K+bhDRxV7ngBdsBtp63jGgItcBWq1odfK0uYzF+AmtVGGQY1BAy9cBm+Kku0wgjckCETxXM4DB1aApHEJWWJQel8FDXJ/G5YkeQbaRvsUZIwndsCF2HWEngC+9N8K0vWNCS2OxN2ER7CAWj3LVCvhJmw561FwcQ9GTap+1LPBEwrUYSdcCv8PZ7BEVjdaIG0EpvhigwXE99hEnbV0weNNTxOwmR+WDpfdZbKg/W2r7URLSVxDLZKpqP4AXdhb9Zh40NgKYm3knl7qZySzqu0q12MRRIfpbP27mrG/GPZYdv/VQFDFzywJmsU72FIuz3tE1kLrIFOU6k7vy1Aj/rpQTkjUW0za03Y0BpOL7RLcc16vl922BmntpnyUMWqC2yTKtKOaTgEfR6qWFUBk/lxmLMKM7PO7/FQxaoKFOUwctPJvNlhR6HNUymuJjAgm5S9zpedzAe+JbK81Czr+QR8yVDbqEpkERh2ahvTgftykio1+GQXZJ2wdm3zKGNtoyKRZtiMOJk38VQmbOkvnOxSCfTLmJ+3dthy1mNgQokxLYFOGTbfrMxXpKps8liKv4NNGgLdzr3NHdgnl1I+SvE5q3YajXsvye30B5iGGizCSTjn4Va6AifgFLTBKngV91Ih4d+s3XLtbYQnYcbj9XovdMA6uA6fNQQCyUq1gX9y1JI8mEYg/48sF8gFcoFc4I/4KcAA6+PY1Xk3NREAAAAASUVORK5CYII=" alt="" />
			                    <input type="text" maxlength="6" v-model="labelName" />
			                    <img @click="yesLabelFn(1)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDU2RDI4OTA4RTFFMTFFNzk1Q0FGNEU1ODc3MjM4NTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDU2RDI4OTE4RTFFMTFFNzk1Q0FGNEU1ODc3MjM4NTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NTZEMjg4RThFMUUxMUU3OTVDQUY0RTU4NzcyMzg1NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NTZEMjg4RjhFMUUxMUU3OTVDQUY0RTU4NzcyMzg1NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp2NdJAAAAFuSURBVHja7JnhDYIwEEbVOAAjuIGM4AiOwAaOoBvoBuAEjiBOoG6gE4gT4JW0piFw0NrWa3KXfD8g0rzX2rSUaV3Xk5hrNom8WIAFWIAFWMCkVpAz5ArZihvziOAzSK5dp5DnNJKVuA2v6jKLGF5USX0EMPh7MyeEANFkdX/dIEnT+THDUxXA4EsdnqIABl90PUMJfmMKT0kgt4GnImANrwusISfIvj1JKMMrgXXrwRckjQFeCZQdDfiWcAKvBIqehnxJOINXAgtIFUjCKbw+idMAEhj8wbZd/cKnBAaf/dIx7RuJ3Cy5kkh8wvctZK4kRDtXn/DYSjwkkVGAH9pKYBIYRDD4MXshU4mg8GM3c2MlgsOb7EaHJDb/gDfdTg9JBIe3eR8wkah8w4vYnAsl4kAJskR+85bnmDeKh7uVhDv+G76pH4ew6PjbhHgZ+mbu4OjvIXtcjMwuWM/LiuV0mr/QsAALsAAL+KmPAAMAHJ2k/FGjuHkAAAAASUVORK5CYII=" alt="" />
			                  </div>
			                  <div v-if=" labelFlag >= 1 " v-for="obj in labelList" class="add end">{{obj}}</div>
			                </div>
			              </li>
			            </ul>
			            <textarea v-model="evaluate" class="describe" placeholder="作品满足你的期待吗？说说画师给你的感觉，令你满意和不足的地方吧"></textarea>
			            <div @click="publicationFn" class="release">发布评价</div>
			          </div>
			      </div>
			      <!--评价 弹窗 end-->
			      <div class="painter_Header"></div>
			      <div class="order">
			  	  <div class="painter_Nav_C">
			            <div class="painter_Nav">
			              <img class="imgLogo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAABFCAYAAAA7D2iEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjAwMDMxOEM3NUVFMTFFN0EzNzg5QURGRDQwNkEyQjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjAwMDMxOEQ3NUVFMTFFN0EzNzg5QURGRDQwNkEyQjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMDAwMzE4QTc1RUUxMUU3QTM3ODlBREZENDA2QTJCNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMDAwMzE4Qjc1RUUxMUU3QTM3ODlBREZENDA2QTJCNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjcOyZEAACqFSURBVHja7H0JfFzVfe5392X2RTPaV9vybtkGY3abLVDSsJQQSEqDSUPJ0mD6GtpHF6CQvCTNCybvQbYGTGi2Nq84IRRCAJt9M7aMd8sysmWtI2n2uXP3d+71KAyKLMnBBkPmz+8w0ujeO+Nzzne+7/vfc8+hbNtGJSpRiT8s2EoVHN84J+g9rtejKAoUeT0yzL092FEWuAUrzzibA/VPFM/XqLr+ueJw4kWaogRVVZFKJouMoVoWbIuhKPdEm1yIJj8xpAyQYzKaAZ9tQaCoGX2XZwpKpYEntk+FgY5vXBKLHNPxj+96cPqDnCbiyf9YAs4CebWAixZexYgMQ9W0zF0NQfgX0zLjWq6w27IML8MwNk2zaYpj36It6zUa9u6R3oM7LUvXN+zfZkOKkmsagLEbZwbPrACowkAnT3h54YR/xpVLPkm1z++oySvFG8ey2csyA0PzbZphKctu8XokRENhyB4Zhm7YxULRskw9UTNr3tM8S99/ZduSV/6rv8+qtNTxCbpSBcc3LMLox1KOGTyLr6WbF3Wcni8WfzEwMvaPw8nM4oFUmk2kktBMgxQT6UwWRUVFJBKh5i6Yw7QvmF8dr6v5FE0xv26e37H2lgsuqQycFQl3csaf1dUc0/H/b9v3ZizhPn/x1z1yMPg3hVz+llQ2HwJNg7AQDg4MIOj3oq4qBln2QJR4EC8En8+HqlgUHMeBZVjomo7hw/16Xik8zTC4n7WtNwONjf1PPPywXpFwFQn3oY6bLvpf/nA89h1Jkq9hOZEWPT5E4xGkkmmoxSL8Xi/a2loc2QaeY+EP+mFZNjTNAMdyEEUBHlmEwDdy3V0HLp43b8EFF5x5tr53sPezr/3mqZ+NDQ+YlVquSLgPaBNMXc5r/SQba2j8amNz0zXReBXt+Jym5gaEQyGEggHURqMQCcsIBDi1hAElx/8YJiRJAkVTUAhzWMT1hCMhVJMiiiKsosKaRU1iGfrLn731yy0aYSx9mlKJCoBOvrClKctVHTdSZ3/kIx+pqam6IRKN0qZhIRQNu+CgCTg8BCzhqJM08KCQK4AnbOP3+yDJMliWgUcQoGoqaIZCbX0dBHKe4PWAb2lDTyGNmkjt4tpI1VcZQeJyBGX5KUolKhLuhIdhHqMSoo+kpY8Wc09dESZxb8cpp0gjwyMuOAzDsSyUa40kQURNTRy5bM4tReKJPF4ZDG1BEHjUNMUwlBhBrpDH0MAwhkZG0bp0OZpqG9GcJceOFqg+u3jBP9519xde27rl/h89tF6rtGIFQO9b6KY+42Pd9E2OoCfAkBNtYIJKunjuVdQ5F/3pbdFQuCVAQKFpfpiahgIBiWUYMInHYSQBwVCQXMtC36F+FIlc8xGQiSIPluMhELnmIf5nx/ad6Os5jNrqOFRhBFRtHQIeL5i8SsDUHBrr775KVZUfMixTAVAFQO9f5ImJnyl43Mp/Pg/7DBGIEjU9gbzO/djlPlrRr06nM3TX7i54/F54AwQcsuSyjabrkMnP1XVVsDSLgEaCw1IOQ/n9HigEaFs3b4VEQCQTphroG3ABaPX0Qk9nYM6eh0gwDA+tawaFn/9qw4Ycz1a6RAVA72NktZkDSHYYp2CDOqTBrhaI/nvnLQU9XzzVKBSiRVUDywuQ8gRshHWCBERGPgeTdHbLMpEZyxAwmSgWi2DIe2ki03QXyJabujZI8RKgOantt/b3EONLoWv/PjwrPu2y1YqVp+04bdnSX3f+5Gf24ms/UWnECoDex6zMDLNVDlTcQ4l6gyOaiuQdp8+X3ZdT8soZ2VSaYwh4PAEvFLUAjuFgEZnI5FJI6RaKgTCSqQwBlkXAZME0TBdkqlIgTCWCZWjkMhk3qeAnDDaaGEWRMFc2X0BUlMHTDHZs3WJw6eTY4qs/gWaPdBSrVsnCVQB0MgZHSq/hThrFMtJ5Tft3c0aLhdxsw7Roo6ggNZYEzXIIRoIQLB4LOhYRcDB48ZU3CJURL8OwYMg1OI6GxjPQCBvZJusCK0+YK5fNwjQtF7SmSZBKgOUhrCQKApF3QlTwB9vIyVs4ip4Acsq9Bipp7AqATmoQ9ejklXTeJbIr5T42/2qqoX1hzLQtdz52QVWhESCYTvKASDJKXoCWFUvJsSpe3dmNdFaFn7CHPxRwkwpKLkcAZBCGIQyUFpElnse5H+QwEk1kHkNAkRxLIU3Yq621kY/FIjFbFFnNtl0hyZDPdI51Zqq4QKq0UgVAJ3dLkC46TJihQEZ7niJEZBOpZsiG87gBy7sJgSIBEUUkmuN7Cs60Gp7HvCuvgtDyJp5/8mkCCsO9cSq50o2CkiWeiXT96voaeP0eJEeTsB1GIccQwYdsNgeDAKmRqs3WNtTuc6YrFA3DBZBIpB3nAKjSMhUAfSDC8UJZAp5uAoylIjiHdyhiPZx7RKQj64RNHMkmSCJRbB5IPg/8VVWgZR9mrz4PlqZgtKuLMFAQBi+6Ke7B/gH07twLhUg3hoDGR3yUTvyPSQDo3K8aTKcJmIDaltq+kZHkYUI3ooNjjoCHoWhUpklWAHTSx454MU78ubloUBwhqAEGTWCgAIt0bE4UCN0UXR8i8MSrSBKq4lFU18QRiFeBkjxups3xPbPPW41YYwNEAjKaYzGwfSde2L4PO3p6kSNyrm1OKwSDoJEA0SPLYFgGp559Kp5/7XXbtuzs2X9yqUbQRQsUAQ+RfVYFPDNLGlWq4PiG6xlmWGiKuBFJ+HawKvzEa6H8Db+1+tuQIz03YeBXm79vg+MzhHlsmqbdiaDBoBex6iga6qvRs3cvHr33PjxFSuKNNyAIAsJz2iG2tcEzew6EWA2izU2Y1daKVsJIl6/5NIKxalR5ffD4ZFSHvLjqvDOxcsUSimKYC5/b8swZYNmik0WsYKfCQO9biNz0Veo8YP3337orVlMd+Ypo61ciMcxGw55vcRx7JxK4B11kXIubjj/Zy/P8acTPREWBo5ybnF5SBg4ewgtbdoDYFbDEw3j8flQtWgi29NmWriG2ZCHOCYRxeMtWSG21mH/mGWioa8TG+7+N/FACfk8AnoAP+WQGCNFenqNu//F/PngFOb3gXGPRitNkiqGt7a++omHKyUYVAFXiOIaHGPtp7Q5hnw33P5T+4te+HLcMhVGGs/C0eGXi93UYVCl/7GS/7Oc9kkQAxIRohmWdrFhqcBi9mTygGRAIEFjibQ5lFXQUFHcWtkU8juNvbOJz6tuaINpEmQVYWKkk1N79SCtFwnyAv7YGg6qF3j2HMavKREtn6kJtTs1yQo0v/fP3v/4PnoD0Wcqm6GLh8gMsxz3v8ft+RL7VnkoLVwB0wiXcVPGxK6+glp+9PFxX33SfxdOz80qy2wwjOHIwsVkH/ZrtqGqnhz+tQDeM57yStIIwy2mme5PUcM1927yFmL9UQERJI0AAohFP5CQGipmcO0OB4nhQIu+uexBtqIOiaWD7+6Ac6oFIGMwkQBsu6PjZo5vQPzKKWCyEEZ9lih5vlPgxxtT1cz2+aDxSXcUxPFtrWvaZY0NjnyFfP15p4QqATmhQ09wx8fv84fb2+ZsxUmyyFYYSYtX7tm7Zcv1zjz23f+HKZX2o8TkwBJVK4QcfuSz5j1tf2CJIIpUbzeDAcAJSUy2WtDVA0S14s84jClEYjc3u9BwnW8cH/KAISCgCNOdBO5owEh8MEFayIVTFYBA/xQgyeg/1Ys+ebiI5eXciRLdkHPbni1uJBTJ0g/n63h0DfdaWQ1HZwxqUpbeatl5ds+jiSgNXAHRig6emzsvIkWgBJi3biSKl2SYUTpZ++q0fvJJNjmH/qy/r133tfoIfy2Whj/3vu6hrb/mra3d07mEdZhtNZVGs02EN9mDFWedCYucSRHpg+Ij6I8AQCLM4wHEkoDPdR+A52AJhI+KR8of7sf3NXRjNF8ALEkxnWpCpoqapGt5IEJm08uIDd//LQUUz7drWxVd6vb6rKVWjB5TCN775pc/ffeZZS9ec+eeV9q0A6MSLuCn/+tA99yhnr1r5ktAS/ZimG9RwZtSsaWpYbFpG/yWfuqb5+ztfNR5/5JEdj9y01rz7R+suSo6MXvLSptcgMAKIH8LWfQdBcyLC1bWYe9ZZYHxe8OR9OBNLDeJ/VBU0y7seihEFFAsqul7ejF0vvY69O7tgMhRsxiB8RcN5srW6NopAIATZYBtu+8Y3L9QM8yJJEK8P1dcL+aGEyVrmoUDIa3K8UHnMoQKgEx+6Mf3zQLql31U0lE17VObqvM0uPuPajz880t31eCGbS9sG9ayqGzvw2TNo356ev9PzrFznC0MnbGLqBroOHsTmnd3wyWEMjeYQaW9D7exZ7hQeZyY2I4iwHZ+jatjz3Mt4/YXXISsWBvr7kcwVUN9ch2w+7z7N6iXga43VoLG6GdF4zTlyLDLfVgxven+PkEpnLNI5fjPn7LN+fsqpHcuoI7d6K1EB0PsfN3706i1E6m25/Ov/esDf0vqLaOOCuJEcOTXg4Z7zBkKb16w83+zZ39ciWVgi7BjB0ppG9As2VLWImrq4u+5bUdGR6k2iMLoDTz/y3/DHIhAIeASWxtJTlhNw+HH4xddAJ3LQiLwbIxLRuaHq3ERNZ7NuMsJLmKs+UINFp50OTyxGmEwM60WVVgt5KIkxZDWlemTnzupQdaxWyWZTlZarAOiEh8BOP1BTxM9ILIdsIs0HmmxDCkbkjvMvXpQ7tI31BXy/KqblgUJyqCM0pPowZkDUdYwmE8ims/BH/Fh10UrsfWk/9h/scdc4SKZGIOsUcpIHNM9AVLKQORAQeZBvORW9G3+N3qFhKGoee/Z1QZZkN2sXDUcRn9uOUG0NGIUotOQY7Ug/KeyHvypKy2OjHYV88v8GYpFNgii8VWndCoBOeKRmOAdmjIDCZmiKdmZHk1M4XxV0pehXee4CimWeMvOmhyvYtC1y2D00iKzpPMJtYf+uLpx19qkQgxL2dHVDI0CoiUTQPLsVyz97Ewb37UFqcD8SiSTkMy7GsllzYOTH8OLmV5EmzFLHsFCLKgr5AmqXL0bdrFZwggByIRzo3V30ST4u5vcyNPFOciBAK6P5s2zb6lct+9FK61YAdMLjzbGZKR3n2blrJJF2nsCjCDA0lURB65P9mPNW9oDgkfkdmpfT+bkxZvDgdowkUu7kzkwyj963EliwZB5ef30bDL2IlWetxGmXXops737UtjbgQKGAeHMTqmrjeOv1V7B0Vj3sj1yMnzzxqPtsjwMgZ6V5r88H2eNzFqqHXlSgzm4Udo9m0TGUQHXYb9MQCB9ZgmUY4YG+ge5K634YAbT24ZPq64gzPO6OL3yR5QytTs0XKF1TYbEcrZtmwrLsWbxJ383vGXiicPbiZG3T3Brfy1sx3D9GtB8NiRfBEDZqCHrx6c9/Cgef347TFyxF0OfF4Cu7wcfiWHzW6cgMDaDrqd+iVvAhUhVD6ON/hs0730ROUVEkAHITDhwHRuZJL+CR6Dlk6/MbbY9p09lsOl8V9Od1tSBZtOUjWMt89xvfUT6TWf5uqydISjMpnSdNg627rsJA73M0lwpKHWNGFLR3oE+cV9BnFQTRynI0YQuWb5274sKBRzYwWt9Q/f6x9OlzW5rlMJ/HaS3tGBlIIJnLurOoNQIkzuvF4vZ5aG9twcj+t7DziX7Ur1gMKAV0P7cJYcIs88jfrXQe2WwGO9/sdBciOTQ84i4HXBuLIZVMIX+4D1YwCm8sRulpxQrFo2gQJI+pqrmsmdeUTM6ERb0gUtTxmA93PSn3kLL0pAJRBUAnLDpK4FhS+n3VJKApjw2kl10xkwv3J0YKc5eufFVuaLhOilWB9wcQFzyifcF52Pqf/8UMjBlY4PNJaiaNoCzavnCQSmpZeDwC9u3cj8f9Xpz/Jz7U1BN5NpKCTliEIswiktc5zW1gOc79nKHefdje+QZe3rkdOeJ7KNtyWchZhKSn+xB2Pfsqatta0bhiubNaKZN3HtSjCA5z2XDBzKH34IHubHr4t8cph31Z6bWnIuE+nHE5KZ8mZU3p56k279k0Cev8Umam72qO/znQudW68OpP5iDwLDgeRZO23ho4MFbfPKdq7hWXeqoTw4tCc2ZxxWRquKeYelIMS5fRo7zPMCgcPngYb2ztxK7dXbjo8k8glspgxfJl8DjZtXQOqjqKfGYMA+lR9Pb1IlAXwHJpPpob6jDYn8Bjr78BThKhWzT2HOgGHw2B6dwOva0OuVQWbHcfVFvRuouDm4cOH3pG5Ji0zDHvZuApfz9Vep0xW1cA9N7EODucW9ZYwTKmaJnhCOkA594SQO4ovb+t1NjOextLn7VmspH0tJrYjL+wIDBhjuNYi2ZAszRtSLJuxsJ2c/X5DPEnfmf3hRyN/KBaSKVTBXY4kcaSc1YiGCB+Z2gIje3zEQlHMTdWB08kBHVgFMV0CiqjwfDxUOUIQvEQ4tEImngOrz35FF7ath2iJEHy+tylsvbkMhjYs90+o65K9ShFLpHL0sWYNyGPKJcP93VfaVPMG+vX/WCEFaadZe7U9dYyhp4qNpYx0QZSHvqgSroPDoDWPhwsgcIpgTKArJrirFSpYWYqGXrKwOeA5c4pjmme7LqGNfOlfYMerlGzLVbL58BKLBVsnV1bKCqwdBU+v99dRadQUJq8oeBfCYMp7sxLzsflf3EDeFGGVszDLh3bP5jCaGIEaZGDHK6Bx+cDCCgjBIAK8T+7X30RLzz1FLbt3AueE1BTG0WsNoJAKADbosD7PNaB7l3/FkPbtXlG8AXY1P2ZwqFZks+7JGXgmV8lunFpfPZ0/5xHyoCzoVTvz04YnNaSsr5Ubx2ltltbKhtKg9KJYqVx9uv58ANo7cPNJSZYUmqUVVMAZFOpUpxysOznd1NRgRmA7Cgx8+c5ebtYFPVkXtJNWc0UoA53YWw4YRVyRdt25tqAYXiep6NVEdo0NLCiiB0vPQWOsEHz7CbwPAOKo2BEKGSUJESaA0WJIM7fXSPOvQL5Oo0LWjHPOhcqAZaPtSCzjLuzA0vUo+psfyJQGqckLqPGJLkmEoWU177kq414ve2NzI5dXX33f/nWZySWU6dh/1WlummZxv88VCZ/x2XzzaVXp61XzxBEzcfop+4pUw7rP+wM9OAE0IyzSGdJTvVg3XWdJbC9l9+rXBLeU9bQqXHZRx3LAlC0df/om5t/ufVQf6y3Z2jl3Fl1f5FPpoSu/QM/b1m29PJwTXO7xycinyug8+WtxJ9koKsqGk9bhshgBqwgoJgvQPaICIcD0E0T2VyReCDNBbLpLPDDsJAkHpmRFHa+2Y3E4SF3Mfr5C9oJE4WgFHUofcNPHNi5+5lYbPf/CHpEixMFbvHSub5oJEBn+wbTG3/63zo19Szz20uvd07DAJgAnnG22lBq8/Es3ZoZysXOEuDGgfjIFBm+h0p9atzXrv8wA2jN7yTSuut6pmCqcRlXzg7HyjzjUmLdUYC8rXTNT5caqfy8zjJQOX9bz9DMmpl+8AO33p12lkcYK6o9/rr6Fxc1xy+Mh4OLoqvbLrN9wVmMyFOSQFhC5xBtqAfkMYDIN6a6FrQguwt/WA7r8F4woh8e4nP8YQv5TA7JZA6jY0nkbA1WugBbZ1C9aCEMm0Yg7IPXJ8FDrs0zEry22hHuaN9DOgNtZDNBMgR8T88VuERRDflFz48x9SPdzWXss34alto0TZuvKoHolmlY6MFSvT80gWEwxXnry849biA6OQF0BDQ9R5F2N5cqumOK7Ngtx2BKby91/nUTNDtKjYkJTNhZen9d6XPGO5HTgNf//M++3vMnP/mbO2f42ZRApNqIqtm/vvvr2r8/+ZONUlPbSkWsjg4NpxCSCPsYFAYTaYzmiwjW12PBKfPRNrueSDA/UsmsK+cczhtOZMDQJljie7ISDR8BRly24PE4CQMvEqNZZKp9BCEGxg4PQCeMYvF+8DLxSRTbZOnG6R6R2ixEvGFDUX/xo3sf3kyT72ZPvwdoRxmTTHfMdG2yoeSHOqYA2+Wlkir7zOtLbbB+mgF0fSnJNM50ne82efHBSCKsfXicnierkIfKaP2yUuVsLFH7TConOMXfOkuNub4kT3pKDXX9BAD3lI+gh3O5mQCI+u53vn+JHAhdb9PW1n2qcg8DcFSwTjycoDCStsGHfBhNprBj1yEIQR/aZrUjPm8hYo1VMG0LtinAGw2BI14oz49g164DbpIgUlWHCJF+Sj6PfLaImtZ6WIEMBnYeRLBlDhIEkF09I9DpEDk2BJ18l6wyuicoWs+AZj7BsKzHtWAz20B3PFX97AwAdHCaa6Vm0FbjTFPOUp8uvd47ISO76ShMNw66m2cgFz8UWbjLyirkztIo4qSYfzmhksZTohtLgGspdfjUFI3TMYMGXTODJMJ4xm/V0fJw1DtTDbSPET83p6bh0jFbu2j4UM9/WZZtF20WWZuDHa6G6o0hQXzP3HNW4PTVK+APeiHrReS7unFYo1DdXOeuYGqqJvEzVUgRqeaUlrYGItFEd4eGQ4eGkM2rmD23ETbDYC/HoqG5HgZhtNHDw0irFnyeIFUo2nN4ntvpLFrqrKD9NnaoEo7MdzMQNc2QgaZLf99clv1cPyGBsans+rdPkzBYUwLbu874fVDWhWsuSbvVpGwqG8mWHEXCrS/zJRuPwl4zafieCSPajBrbnqQ4JkJxNv0lv5SKpeva04M9PYdyiZEXRI885CxsoIOxFc5HvlUtOH8Iy5c04ZxzlkEWOQwPjCJ7eBDBTBJhykCgkIHUfxhs32Fkh0cQCXnQ1BgHw9DufDdn9naYsBjPs+6eqbPa6hCN+kCxHNoWtWLOqQuIfOOQISBiZW8deV9iKaIDrSNbMTj/swjTGaYxlQ3aVno9dxr/g2k80HTHNePt+3JrJoBqYgLj3jK/0zGFunjXKe2Tl4GO+J1PlypjVdl7zWWdvvkolf7LEkUvKb1/fZnpP5bomcJnrToaGFsl+vdGKZWAZoSwRs7dhsTdjc6+4a9vvCfM0t8eKqr29u/+xHoREE1GoCAHiD+RUCukrbnKCN01SCRdMUEuxIIhnmUJAUE8HHbnxdHQoBCWemEoDSPgR1NzLShThZXMgbZMiM4GweTzsqk0IrEo2tsbsePNLvT2j4JlBDCSD9l0mngln2zTuTonuy4SX+UsBawZlrMykLt01hSxqTSSXz9Jirq880832q8t8zFTZfo2lH3G+CDZM4kSWVe65saSEjkh95dOZgl3eWnEKdfWb01i8seNfktZh09NAqbL/gAAHZyhtBgHT8dkoHPGbp6y0SLzRJ6xeCuX+914/sw9D5ruliYZneCDKWrOFiSCBJsVUNC0l7YNZ9rFoFWV1yWA4ZHmZZgeL3yRsDtxFP44YRgJVN8+qKIHhqYi1z+E5sIYJK+HyC8KfC6PXlpyt3usrg4hk6nF889tI94phKxiQBI84BnDsOxChNAPQbCVVwljFTXdfXJ1Br5lTYnlN5YA8Czevj83Xn+bpmnr20vXuvModTueOLhlGvZBmUcaTzY9Upbu/qMBUGCSEf+OsvfuKDPvqWnYYlweTFbRd0wh53omaPiJ75ez2qqpslGOjNOJlwhyPKrJCJ8gEst1Gc561YqTj6bASrLNJg8e8nGCmIrMi/cW/fVpbtnfhQz7C438wSqGN2pUtcBt6c7jDGenbQJKSmPA+v2YE/bgDQLM3buLqFIyiNb6wDY0uGth+wf6MHpgGK8mdTTPqgVDPrnGJ2BE58H7IyCOy3kidZC3rJ3Z4dwlY0NDrYWi9hpNz/ielvNvXjqeiZyQvewsA9HtE1ipvKRKnbznKD41WAJFz4QBNDVFBnB1adBdVfrsO/+YADRZ3Es8UKok51ZNcW/h3DIG+Z25P8o175wio5SaRtoFJzn33qn+ARYBEUtkFU86Le1uHU86qUS5L/aYGAmao794o+v1f411cA9mbXEJlxtekqGl//l6oMVapWyZSyuFy5Ky77xstpaJ1tXDtfwsjdrGOnRv2TO6O1X8VSzAnm/IdY2sprnXpavrwA/kofQP2XuyaU2WZdvgwjbNypxAMSydT1uEfx6trY9s68nmLrVte1YoXntuuqhqTQ317CmL52dEjttNvrI2TcZydZmsGp9F0jGJh5mYeLm3xFypKQbB1fj9GQzBac4bB+XGKQbQP4okwi/LKm1ihiw4yWi1Fm9PVMQEKXEsWaDOsmzf9OAmMvKjD980rTEdz285023A2UcK6xSO1hkhcvvnlqY2/8M1l3qVoRu1XGoPm9zTf/hvL3ruo8G2+z5ePeciLnnoYWfOnG2aoHjWXROOlSU0B8Qx+aXH/5IrFh521pyDs6dqNuvMCHKXvqoqDAxC169RCsp5JsXuKjJ+lrYpm0r2PZVMDP5AUa2qSF1NLlIT7radTYhoRAjIP6Vmsn+fTaZmuippT8l/rCl13nVlxp+aUEJlx0znUTYdJTM7Xdt0luT9mhPRMT8oABofZe4p3RMqlwYdEyTC+EzfK8oapXOGAJpsusmdk3inyTJP001UdDoMV8b6lD0hZSeJvM2LEn79UkJ+7O5/s++Ico/d0xL97lfbmnc+8pXv6kIqA9rxJTTzjYGefUo6MQSbYtwnSmnZC38s1jD/o5dFyAdtKRQUHcEgqEDQXTOOtVWYxeLexReesiE3ouiSzxcP0rkUP9b1QKG/69qD/3HviKZrIi9yZjRWMzA23P+Ckk3/RmCYx0zTfomm2cK7bMOe49wnmqeSzJMwUc+J6JgfDAnnyLa1D68ppSUfIT+X39d5cAIwOkujTecMU9UTkwCdM2yQScMx35POhyO6iGHNapoxOwjv9BAHtN2Rc3AAUNp/1OeTFFbmdUXTFfC0i6ofJA4LK1Z0tCuKYnzttq/s2/Clm43+QwPdNM88OxQMXiwFwxDDEUCgIXoljs6kVmQD/ueSwyM98ebW2RRPuaucClBt1tbe4H1BLDl9oRGKBX+qaPmnvva5L/2WNXTbSzyVSAhQ4BmLrwrRPomcoep6947OR7v27HA3T/7La1b9Ia23aro6+yDHycxA7xzl1103blRvKcvhj2d61pek1lL8/mTCYJn065wmEwRMf6/iaB7IDYNmkYWJ3ISSoUwoMAMENIuIia+TCcqqnRVFHew4t12cTbR8njmyL7Byccdir/P7G2Hz5fNb7IJnZEcnl+rbccPaG3O/EYr/0bF6lcdQjAdoq2D173sTpqETHBKWkT00T1FX/fuXbhnNDSR+UshmbYoXiIRjQfOcKVj6s6bAY0VttPP0V3bcet4Lu550kM07SwATMDM0bXE8R0iNtp2tVJyNtuzjt03d8X7ep7Ms/f2+xcnMQJtKo9ZawjhHkgdH5sitQ/nEz6PPxh4Hzvjd6+l09ngS4KEZAig1GYBEVoBElJqzSW9517vtiU3UXZeu7mUoPMJQdCYqe6iwKNrjpmh3m3xWnSZdLGTBWXb+m1fecsNn7v7OVxb7lV56SJVtlQ4h1LJA4DNDVxmMV6Ek7m+4oC+X6x/0Du/eY9csW8aIwSDlDQTOkgTJ2Uj4lWwqrXrrap0pCc4aCnYwEk4s+9cfgl26GDbHuth15s45a2hbJaDYzn51JJwtInlyjHMz1n73HT14AvrHvXh7Thsw+WTgifL8j+R5oLdl252lCtpKfl5flh0b78Adk2TeVuH31ywon/iJKbJxx/Jk5NJJAenkAihi6t8JIMoa7Pnn277/QJGta73va5eenyOsQ5OuyVzxd5+37/qPB+YYFP8om1G5sJpCctT887t/fN9PqWzyZ4dV79y0Sv23whNgHeq5IuLlFxte+brqjjPTRXX0EC/y7QdeeXln1dy5Hc5a2FIsGr/mCzfVK/n8zszAwHDNooWNFEPYhRfhDQVtz/Z+4MmXgHmzAA+BOl2+rb0DHdsyrSOL2znJCeeatvNcxB8Oo1tOUA/pKV37nlK5GW/fg+op6wPnlvWJzlK7/ZF4oHXXrSPACZTk2R3HWLnjlblhhvo7dYwy46gjmTvxxbbcdPW4VG4whr5o0VLowMH9n//8fd8bspz9sk34nY2whtJ2tRiS/IbVCi3bC05LMlbEc+vCQvx8CHGg9DT1k89/75vJVZ/6plBU/opXsl/Qefr5gN+DbPat55L79s6vWrSQ94VDcigU+MzX/unOu778T7dtM4pqI0NkG03Ttuz3ARmFGDWNAMhJaXAQGPp37ON6MccylYHK2Z/V2dzYtk/KTerWl5TK7SU2umOKtl0/Q3XxIUsirLvuTgKih0pyrAm/Pwu6p8wzpWboYU5oUO5Y7sy8YcYTChQL3SOJUWbJstMaR5KZhlyhgLxuuBBzVgZlnL1J60UUquOgjQJyw4kFvzKzkY+xgdHxnMRFqz6X+9YzD3zx1PMuusb0hAPeqmArwyqUymqHB/buezlcU3MupRcZyjSv9MriV21Dfz2fGPpooKXNmR1KSZLghV8mYzAZhBmOIN14B6/YLu7dnfHekQVxcUWdtHa5p5Q0uqXUN8ozo+nSoHjC+sQHJQvXMwONe3LEv68tZaxt6Kazg7a7vBSjeNu0SH2bJMRj6D34FlUVr0FrJIpsLo/uPXthkXP80Sgx+8T0Ux6oY7kqsOqah4e6Hwr4fB5T14evCNUVqhnVhiD+VGOYm+RgJM7pCcrj9SQL6cyXtz725C9D8doaVufaP/7JG/7aH/A/Prav6+ZA66yIQcDa39Nb03YaAY+ffEa+CPIF38mcmk6ZLE0Zhm4fpR1O5pofHzzf0wG0sqzVCQzLNIl/192hXWGFQ0Jb8yJn97gFy08B42xHT0rQ70XAI6OoabDIKF8k8iqfL0A1bLoweOju6mjwbk+8joJeTL5CW7c23vidRzH0ZkpQRmyOoTijSFl0vON8I9i00t6/1RfI0ahGgC9UUbeNxZa0GmP7kramRixDZzTNvqZ7zvy9tG0luTibY017jEg0bTzTpjrrxlHO7B+TAkVVGrACoPclqghiGgihDNAUPUhGdZs2TZsYct1ZsyA/NuYCxx8Ou/7CKZLIQ+AYV8rZzk7DRFppuRSovpeEUMiPYpUf8Ux/PJGyfjiYTdxFCaGPpGiOqoOJbCpDiYGWCyiO5QihyEwiCw8rIB6NhkZs688NzkurQ0OECQWK49hVNmVxNEP3EdDsJ9/1lf/zwHN7WZZKEzCqT226j3JuS9mqTg6qAKgCoPfHAJ1N0cxq0v1etCz7ca6p0YZltbGqsSS9ey/e3LUD0cZGLD7jDJiEdRgi2QzCUls3boSpqFhwxkpolkVYSUKxehY8zU1gfFWQU5sxizfYTH7wtiwrCAbNQStmkBhM00K9J0qzHMyGNgwO9sIXCiLOgcoW0n7IEYx174e/OgrKKHgK+ZGLQsEa0JRdIIQ3zMh0kribPIFyYXbL6aHRVE+8adbSL/7wxzd1WIryyKI/XdZbadQKgN6zIGqowFDUxqJpdiU1Q4+TMZ2lKAUjyaI3EPIsOuNMSAE/LMIyzrK9vOyF5PGgfdky6IlR8D0DUPwSVJYCt+h0+FuaEaIZqDWfgzP/jdrWKcSiEYy8tRuD+4ZgSi2gCOM4yQo5Uo0sYbdd/YdgZwuwZreDFb3IJw+7i897BRG9O5+CsPRS+D1hmZBfM01TzdSR7w1e8kIfVTE02tvg88Yu9sieSwzLuqTSqhUAvZexkfRGzbBhK4RJuJERCCy7L+8V7jNbmm71Eb/DsYy7PJVNs9A0FQzpwaHqapgeH5SBIefJBvcGZk08DlE8st8D58wWkATMO/VUpPq6kS8OIpmj4G9vc2XgeDqNC1ZBEzwgvgeCLwhaVZDPKMiNJhDwV2Es5yQLioCnlB8sSxewDAtFzSE/vJOSRY9vTttp59cJYqVFKwB6T0PF7/JwRBsR36PYlqVS1HOH+/v+VhJFylkOW3UWeCed2+NxNwl2Lfso8UeaZoB1ptFYNvRcDkm1eKSh3Ok2prvSaH9/Chk9Al/LPHIsh/LZNu7sAlEC5RTyn+VcmfbA27AQolIgjJUF7427R1LjX7L0GgjEMKt5JQHmAIKhagfFI0O6UWnRCoDe+6DdR6kt7HceKSC/P/bDf3ty+V98ab2pKZcR7+OnGc6madrSsymTSDmCDYMydYOyVQI1Q6WdjbBojhzDMLaWyaG+vY6qnTdX18SarC3Xs/5ZtTIDiifg4SefJXAkCUBzRN6ZhJlMAshkDhwtuDdVCUEWbdt2tmKw3PQfOVwUvXZTw2KrwZrvHHPQ1ux7zeM3F+7DaXntSgUd17iY+BPn7r6zgMjBggL3tqQjrQigvv3Cfk4pptsZVlxEW5zM8cyIaqFf0/M6cUq8s10dQQTliLtB3WY8OZUKcRrFEhCBom2OcWb/0KaeL9TLIruQoeh2mrIbCVj9FGwPeWWd3e0pyhV1zhollpNUs3TDNHUns8boMi/kaQppyrT2Mra1hQNbYIq2zPDO5t5MkZxZtCkqTa61t311+8HyXNxBVa00cAVAlajEcVQalSqoRCUqAKpEJSoAqkQlPmjx/wUYADlfXJ/keH9jAAAAAElFTkSuQmCC" />
			              <ul>
			                <li class="active"><a href="/painter/spaceIndex" ><span>首页</span></a></li>
								<li><a href="/painter/works"><span>画作</span></a></li>
								<li><a href="/painter/painter"><span>画师</span></a></li>
								<li><a href="/painter/draft"><span>约稿</span></a></li>
								<li><a href="#"><span>活动</span></a></li>
			              </ul>
			              <div class="inputBlock relative">
			                <input class="" type="text" placeholder="请输入关键词..." />
			                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDM2NUNGNzA3Njc4MTFFN0I3MkFGQUM4QTcwNDMwQzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDM2NUNGNzE3Njc4MTFFN0I3MkFGQUM4QTcwNDMwQzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MzY1Q0Y2RTc2NzgxMUU3QjcyQUZBQzhBNzA0MzBDMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MzY1Q0Y2Rjc2NzgxMUU3QjcyQUZBQzhBNzA0MzBDMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psr3r8cAAAGJSURBVHjapNS/SwJhHMfx0wgMNKjNEmkUwaEiImoupCAIpZb6I4KWpiiIlpaGpoZoaIiWln4MDQ0NQYNQ0VJUYBEuRdkPy7zej3wvruse8ewLL+7xfPzwfe58Hp9pmoamQuhEBC+4QQYlo1KpQId2bOHd/Ft3mEPQ5XdlPkeH05hFHU6xK501IIFBNCOLFI4qdTgjXdxiWNOB6mwBJTwh4ZxjDZIy6QoR3XJsJmT+BQLOQD/O8YWOKsIsi7KiKWdgt3yx7iFMacKzNPNz389jTMrj3DC81QP2EUObdVMFRmV8ZnivE7n+CgzJ+LWGwIJcA/bAnIyjNQRG5JqzBx7IeMBjmA/9yNuWXn7LjcjjHiEPbznl9u+wBvPy5UqVYa3IooC4W2ADMhK6Kp91YXHZIarWdFtPCeNYJl5iEjHUy2Ppw7LtFHpDEeO6QKvTJVmKrtR+T6MLjxI6qju+rGpBWg7YMD5wjT1soyjzerCDIMawaXjcv256ZU+rVQ35jf/XoRy8nxj5FmAAOfL2Y6CullwAAAAASUVORK5CYII=" />
			                <!--<img src="" />-->
			              </div>
			            </div>
			      </div>
			      <div class="order_content">
			         <div class="section">
				           <div class="section_left">
					              <div class="header">
						                <div class="subject">
						                  <div class="title">{{order.demand}}</div>
						                  <div v-if=" order.status == 0 " class="state">等待画师同意</div>
						                  <div v-if=" order.status == 1 " class="state">进行中</div>
						                  <div v-if=" order.status == 3 " class="state">申诉中</div>
						                  <div v-if=" order.status == 2 " class="state">完成</div>
						                  <div v-if=" order.status == 5 " class="state">取消中</div>
						                  <div v-if=" order.status == 6 " class="state">企划取消</div>
						                  <div v-if=" order.status == 17 " class="state">交易失败</div>
						                </div>
						                <div class="time">发布于：{{szxj.getLocalTimeP(order.createTime)}}</div>
					              </div>
				              <div class="details">
				                <div class="modify" @click="popFlagFn(3)" v-if=" identityId == 0 && order.status == 1 ">
				                  <img src="/img/painter/modify.png" alt="" />
				                  <span class="word">修改需求</span>
				                </div>
				                <div class="modify_requirements" v-if=" popFlag == 3 ">
				                  <div @click="popFlagFn(1,'追加金额')" >追加金额</div>
				                  <div @click="popFlagFn(4)" >延长截稿日期</div>
				                </div>
				                <ul class="demand">
				                  <li class="subtitle">需求详情</li>
				                  <li class="type">
				                    <div class="column"></div>
				                    <div class="words"><span>风格：</span><span v-for=" obj in  order.paintOrderStyleList" class="words_demand">{{obj.paintOrderStyleName}}</span></div>
				                  </li>
				                  <li class="type">
				                    <div class="column"></div>
				                    <div class="words"><span>类型：</span><span v-for=" obj in  order.paintOrderTypeList" class="words_demand">{{obj.paintOrderTypeName}}</span></div>
				                  </li>
				                  <li class="type">
				                    <div class="column"></div>
				                    <div class="words"><span>截稿日期：</span><span class="words_demand">{{ szxj.getLocalDate(order.deliveryTime) }}</span></div>
				                    <div class="add" v-if=" order.addDeliveryTime " >
				                      <span class="small">追加至</span>
				                      <span class="red">{{szxj.getLocalDate(order.addDeliveryTime)}}</span>
				                    </div>
				                  </li>
				                  <li class="type">
				                    <div class="column"></div>
				                    <div class="words"><span>联系方式(QQ)：</span><span class="words_demand">{{order.qq}}</span></div>
				                  </li>
				                  <li class="type">
				                    <div class="column"></div>
				                    <div class="words"><span>稿酬：</span>
				                      <span v-if=" order.margin > 0 " class="words_demand">{{order.margin}}RMB</span>
				                      <span v-else class="words_demand">{{order.budgetMoneyExt}}RMB</span>
				                    </div>
				                    <div class="add" v-if=" order.appendMoney > 0 ">
				                      <span class="small" >追加至</span>
				                      <span class="red" >{{order.appendMoney + order.margin }}RMB</span>
				                    </div>
				                  </li>
				                  <li class="type block">
				                    <div class="column"></div>
				                    <div class="words"><span>需求补充：</span></div>
				                    <p class="paragraph">{{order.requirePaint}}</p>
				                  </li>
				                  <li class="type block">
				                    <div class="column"></div>
				                    <div class="words"><span>案例：</span></div>
				                    <div class="caselist">
				                      <img v-for="obj in  order.imageCaseList" class="case" :src=" path.ImagePath + 'Controller' + obj " alt="" />
				                    </div>
				                  </li>
				                  <li class="subtitle ">企划流程</li>
				                </ul>
				                <div class="Sketch_Map">
				                  <div class="Line"> </div>
				                  <div class="littleLine" :style="'width:' + width + 'px;'" ></div>
				                  <div class="flag" v-if=" order.margin > 0  " :style="'left:' + left + 'px;'" >
				                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0QwNjlENkU4RDRCMTFFN0E2QjdBNDVEQ0QwRDJDQTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0QwNjlENkY4RDRCMTFFN0E2QjdBNDVEQ0QwRDJDQTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDRDA2OUQ2QzhENEIxMUU3QTZCN0E0NURDRDBEMkNBNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDRDA2OUQ2RDhENEIxMUU3QTZCN0E0NURDRDBEMkNBNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkEQzVEAAAGOSURBVHja7Na7S8NQFMfxRKvtoBYUKlIRQURwEQRx0V1EcLFLwT/AwQfi4Ogkbv4Bbg46qDiI4NJBdJXgAwRRUOvgAykVBx9o/F44gRBCbFrQDPfAp4fS25tfuCk9pm3bRlQq5n4zdvU8RxvF1GZHk+X5LEMbRDtaEYe6k3fc4BK72A8TgOv4h6GGMIA+WARI0icwju6APXulzyCHpTCh1HUIVfSGKUp/kb6CTIgbrZEbUtawjnPk8SFrTKSQRhdBsvQjLHjDOA+Q88V0BY9AVjziFq+yfwLNsndc1lp+x2S40hvyPFRaKRFU3+qlyohQ6TA6jA6jw+gwOkzUwsRCrL3DKS5QkN6INqghrFOGsvoyciSDwtiuRWo4WsYe01jeZ0pzv+3BMObRUGIQtedOUJiEa4w8I0ShxI2PxQamMYIW1xDlzC5PuMYqttj/IShMrQzLB2UevxrOJzGLfjnOL1TjDSe4/20g9x5TpfWJQ/3T1mF0GB0mqmHM/wzpvWhdlEaIRWw7/6J/XT8CDADbGFm7x2iP8wAAAABJRU5ErkJggg==" alt="" />
				                    <span>{{szxj.getLocalTimeFir(typeList.createTime)}}</span>
				                  </div>
				                  <ul class="step_ul">
				                    <li>
				                      <div class="ball" :class=" order.margin > 0  ? 'complete' : '' ">
				                        <div v-if=" order.margin > 0 " ></div>
				                      </div>
				                      <div class="stepName stepName_one">开始约稿</div>
				                    </li>
				                    <li><!--画师已上传草稿-->
				                      <div class=" painter painter_one" :class=" stepFlag >= 1  ? 'painter_complete' : '' " >  
				                        <div v-if=" stepFlag >= 1 "></div>
				                      </div>
				                    </li>
				                    <li><!--企划方确认草稿-->
				                      <div class="ball ball_tow" :class=" stepFlag >= 2  ? 'complete' : '' " >
				                        <div v-if=" stepFlag >= 2 "></div>
				                      </div>
				                      <div class="stepName stepName_tow" :style=" stepFlag >= 2 ? 'left:208px;' : 'left:203px;' ">草稿</div>
				                    </li>
				                    <li><!--画师已上传线稿-->
				                      <div class=" painter painter_tow" :class=" stepFlag >= 3  ? 'painter_complete' : '' " >  
				                        <div v-if=" stepFlag >= 3 "></div>
				                      </div>
				                    </li>
				                    <li><!--企划方确认线稿-->
				                      <div class="ball ball_thr " :class=" stepFlag >= 4 ? 'complete' : '' " >
				                        <div v-if=" stepFlag >= 4 "></div>
				                      </div>
				                      <div class="stepName stepName_thr" :style=" stepFlag >= 4 ? 'left:408px;' : 'left:404px;' ">线稿</div>
				                    </li>
				                    <li><!--画师已上传上色高-->
				                      <div class=" painter painter_thr" :class=" stepFlag >= 5 ? 'painter_complete' : '' " >  
				                        <div v-if=" stepFlag >= 5 "></div>
				                      </div>
				                    </li>
				                    <li><!--企划方确认上色高-->
				                      <div class="ball ball_fou" :class=" stepFlag >= 6 ? 'complete' : '' " >
				                        <div v-if=" stepFlag >= 6 "></div>
				                      </div>
				                      <div class="stepName stepName_fou" :style=" stepFlag >= 6 ? 'left:608px;' : 'left:605px;' ">上色</div>
				                    </li>
				                    <li><!--画师已上传完成稿-->
				                      <div class=" painter painter_fou" :class=" stepFlag >= 7 ? 'painter_complete' : '' " >  
				                        <div v-if=" stepFlag >= 7 "></div>
				                      </div>
				                    </li>
				                    <li><!--企划方确认完成稿-->
				                      <div class="ball ball_fiv" :class=" stepFlag >= 8 ? 'complete' : '' " >
				                        <div v-if=" stepFlag >= 8 "></div>
				                      </div>
				                      <div class="stepName stepName_fiv">收稿</div>
				                    </li>
				                  </ul>
				                </div>
				              </div>
				              
				              <div @click="validationOrNotCanFn(1)" style="width: 45%;margin-right: 20px;display: inline-block;margin-left: 30px;"  v-if=" identityId  == 0  && order.status == 5 && partyList.actionEvent == '画师取消' "  class="button">同意企划取消</div>
				              <div @click="popFlagFn(5,'拒绝画师请求')" style="width: 45%;margin-right: 20px;display: inline-block;"  v-if=" identityId  == 0  && order.status == 5 && partyList.actionEvent == '画师取消' "  class="button">拒绝取消企划</div>
				
				              
				              <div @click="validationOrNotCanFn(1)" style="width: 45%;margin-right: 20px;display: inline-block;margin-left: 30px;"  v-if=" identityId  == 1  && order.status == 5 && partyList.actionEvent == '发起方取消' "  class="button">同意企划取消</div>
				              <div @click="popFlagFn(5,'拒绝企划方请求')" style="width: 45%;margin-right: 20px;display: inline-block;"  v-if=" identityId  == 1  && order.status == 5 && partyList.actionEvent == '发起方取消' "  class="button">拒绝取消企划</div>
				
				              <div @click="painterAcceptedFn(1)" style="width: 45%;margin-right: 20px;display: inline-block;margin-left: 30px;"  v-if=" identityId  == 1  && order.status == 13 "  class="button">确认企划</div>
				              <div @click="painterAcceptedFn(2)" style="width: 45%;margin-right: 20px;display: inline-block;"  v-if=" identityId  == 1  && order.status == 13 "  class="button">拒绝企划</div>
				
				              <div style="background-color: #D2D2D2;" v-if=" identityId  == 0  && order.status == 13 "  class="button">等待画师再次确认</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId  == 0  && order.status == 5 && partyList.actionEvent == '发起方取消' "  class="button">等待画师确认</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId  == 1  && order.status == 5 && partyList.actionEvent == '画师取消' "  class="button">等待企划方确认</div>
				              
				
				              <div @click="rejectOrder(1)" style="width: 45%;margin-right: 20px;display: inline-block;margin-left: 30px;"  v-if=" identityId  == 1  && order.status == 0 "  class="button">同意约稿</div>
				              <div @click="rejectOrder(2)" style="width: 45%;margin-right: 20px;display: inline-block;"  v-if=" identityId  == 1  && order.status == 0 "     class="button">拒绝约稿</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId  == 1  && order.status == 12 "  class="button">等待企划方支付</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId  == 0  && order.status == 0 "  class="button">等待画师同意</div>
				              <div @click="popFlagFn(1,'支付保证金')" v-if=" identityId  == 0 && order.status == 12 "  class="button">支付保证金并开始约稿</div>
				              <div @click="clickFileActiveOneFn"   v-if=" identityId == 1 && length == 0 && order.status == 1 "  class="button">上传草稿</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 0 && length == 0 && order.status == 1 "  class="button">等待画师上传草稿</div>
				              <div @click="seeDrawFn" v-if=" identityId == 0 &&  typeList.actionEvent == '草稿' && order.status == 1 && typeList.status == 0  "  class="button">查看并确认草稿</div>
				              <div style="background-color: #D2D2D2;"  v-if=" identityId == 0 &&  typeList.actionEvent == '草稿' && typeList.status == 1 && order.status == 1 "  class="button">等待画师上传线稿</div>
				              <div style="background-color: #D2D2D2;"  v-if=" identityId == 1 &&  typeList.actionEvent == '草稿' && order.status == 1 &&  typeList.status == 0  "  class="button">等待企划方确认</div>
				              <div @click="clickFileActiveOneFn"   v-if=" identityId == 1 &&  typeList.actionEvent == '草稿' &&  typeList.status == 2 && order.status == 1 "  class="button">上传草稿</div>
				              <div @click="clickFileActiveTowFn"   v-if=" identityId == 1 &&  typeList.actionEvent == '草稿' &&  typeList.status == 1 && order.status == 1 "  class="button">上传线稿</div>
				              <div @click="seeDrawFn" v-if=" identityId == 0 &&  typeList.actionEvent == '线稿' && order.status == 1 && typeList.status == 0 "   class="button">查看并确认线稿</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 0 &&  typeList.actionEvent == '线稿' && typeList.status == 2 && order.status == 1 "  class="button">等待画师上传线稿</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 1 &&  typeList.actionEvent == '线稿' && order.status == 1 &&  typeList.status == 0 "  class="button">等待企划方确认</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 0 &&  typeList.actionEvent == '线稿' && typeList.status == 1 && order.status == 1 "  class="button">等待画师上传上色稿</div>
				
				              <div @click="clickFileActiveThrFn"   v-if=" identityId == 1 &&  typeList.actionEvent == '线稿' && order.status == 1 &&  typeList.status == 1"   class="button">上传上色稿</div>
				              <div @click="clickFileActiveThrFn"   v-if=" identityId == 1 &&  typeList.actionEvent == '上色' && order.status == 1 &&  typeList.status == 2"   class="button">上传上色稿</div>
				              
				              <div @click="clickFileActiveTowFn"   v-if=" identityId == 1 &&  typeList.actionEvent == '线稿' && order.status == 1 &&  typeList.status == 2"   class="button">上传线稿</div>
				              <div @click="seeDrawFn" v-if=" identityId == 0 &&  typeList.actionEvent == '上色' && order.status == 1 && typeList.status == 0 "  class="button">查看并确认上色稿</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 0 &&  typeList.actionEvent == '上色' && typeList.status == 1 && order.status == 1 "  class="button">等待画师上传完成稿</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 0 &&  typeList.actionEvent == '交付' && typeList.status == 2 && order.status == 1 "  class="button">等待画师上传完成稿</div>
				
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 1 &&  typeList.actionEvent == '上色' && order.status == 1 &&  typeList.status == 0 "  class="button">等待企划方确认</div>
				              <div style="background-color: #D2D2D2;" v-if=" identityId == 1 &&  typeList.actionEvent == '交付' && order.status == 1 &&  typeList.status == 0 "  class="button">等待企划方确认</div>
				              
				              <div @click="clickFileActiveFouFn"   v-if=" identityId == 1 &&  typeList.actionEvent == '上色' && order.status == 1 &&  typeList.status == 1 "  class="button">上传完成稿</div>
				              <div @click="endFn" v-if=" identityId == 0 &&  typeList.actionEvent == '交付' && order.status == 1 &&  typeList.status == 0 "  class="button">确认完成稿</div>
				              <div @click="clickFileActiveFouFn"   v-if=" identityId == 1 &&  typeList.actionEvent == '交付' && order.status == 1 &&  typeList.status == 2 "  class="button">上传完成稿</div>
				
				              <input type="file" ref="file" style="display: none;" v-on:change="fileUploadOne" />
				              <input type="file" ref="filetow" style="display: none;" v-on:change="fileUploadTow" />
				              <input type="file" ref="filethr" style="display: none;" v-on:change="fileUploadThr" />
				              <input type="file" ref="filefou" style="display: none;" v-on:change="fileUploadFou" />
				            </div>
				            <div class="section_right">
				              <div class="contractors">
				                <div class="head"><img src="/img/232x232.jpg" alt="" /> </div>
				                <div class="name">{{party.guanZhuAndFenSiAndZuoPinShuData.userName}}</div>
				                <div class="info">
				                  <span class="style">作品：{{party.guanZhuAndFenSiAndZuoPinShuData.bookNum}}</span>
				                  <span>粉丝：{{party.guanZhuAndFenSiAndZuoPinShuData.fansNum}}</span>
				                </div>
				                <div v-if=" attentionNum.attentionNum == 0 " @click="setAttention(1)" class="follow">关注</div>
				                <div v-else @click="setAttention(2)" class="follow" style="background-color: #E4E4E4;color: #8A8A8A;">已关注</div>
				              </div>
				              <div class="plan" v-if=" order.status !== 5 && order.status !== 3 && order.status !== 2 && order.status !== 6 && order.status !== 11 " >
				                <div class="appeal" v-if=" order.status == 16 || order.status == 17 || order.status == 1 || order.status == 3 || order.status == 13 "  @click="popFlagFn(5,'企划申诉')" >
				                  <img src="/img/painter/protect.png" alt="" />
				                  <span>企划申诉</span>
				                </div>
				                <div class="countdown" >结束时间为：{{szxj.getLocalDate(order.deliveryTime)}}</div>
				                 <div class="countdown" >剩余时间为：{{showData(dTime)}}</div>
				                <div class="appeal" v-if=" order.status == 0 || order.status == 1 || order.status == 12 || order.status == 8 || order.status == 13 " @click="popFlagFn(5,'企划取消')" >
				                  <img src="/img/painter/aircraft.png" alt=""/>
				                  <span>企划取消</span>
				                </div>  
				              </div>
				            </div>
			         </div>  
			      </div>
			  </div>
			  <div style="height: 100px;"></div>
		      <myfooter></myfooter>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'myheader':Header,
		'myfooter':Footer
	},
	asyncData:function(context){
			var obj={}; 
			var arg=context.params.id.split("&");
		    obj.orderId=arg[0];
		    obj.identityId=arg[1]; 
		    return obj;
	},
	data : function() {
		return {
			party:{
				guanZhuAndFenSiAndZuoPinShuData:{
					bookNum:"",
				},
			},
		    path:PathList,
		    szxj:SZXJ,
		    orderId:'',
		    order:[],
		    painterOrderFlowList:[],
		    length:'',
		    typeList:[],
		    popFlag:0,
		    ImgFlag:false,
		    stepFlag:'',
		    width:0,
		    left:30,
		    title:'',
		    userId:'',
		    painterUserId:'',
		    id:'',
		    identityId:'',// 0企划方  1画师
		    actionEvent:'',
		    amount:[],
		    chooseFlag:2,
		    isWelfareFlag:0,
		    actualAmount:'',
		    draftImg:'',
		    lineImg:'',
		    colorImg:'',
		    endImg:'',
		    endFlag:false,
		    dayNumber:'',
		    message:'',
		    processList:[],
		    attentionNum:[], 
		    qualityFlag:0,
		    evaluateFlag:0,
		    majorFlag:0,
		    addFlag:0,
		    labelFlag:0,
		    labelName:'',
		    labelList:[],
		    evaluate:'',
		    payStatus:'',
		    open:'',
		    partyList:[],
		    PainterList:[],
		    dTime:0
		}
	},
  	computed:{
  	 
  	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
        	$('#cropper-img').cropper({
			    center:true,
			    aspectRatio:1 / 1,
			      // zoomable: false,
			    viewMode:2,
			    minContainerHeight: 136,
			    minCropBoxWidth:136,
			    preview: ".img-preview",
			    build: function (e) {
			    },
			    built: function (e) {
			    },
			    cropstart: function (e) {
			    },
			    cropmove: function (e) {
			    },
			    cropend: function (e) {
			    },
			    crop: function(e) {
			        $('#dataX').val(Math.round(e.x));
			        $('#dataY').val(Math.round(e.y));
			        $('#dataHeight').val(Math.round(e.height));
			        $('#dataWidth').val(Math.round(e.width));
			        $('#dataRotate').val(Math.round(e.rtate));
			        $('#dataScaleX').val(Math.round(e.scaleX));
			        $('#dataScaleY').val(Math.round(e.scaleY));
		        }
		    });
	    	$('#cropper-img').cropper('setDragMode', 'move');
//		  	this.identityId = SZXJ.getQueryString('identity');
//		    this.orderId = SZXJ.getQueryString('orderId');
		    this.getValueFn();
//          this.getUseFn();
		    this.getAmountFn();
//		    this.yseOrnoFn();
//		    if(this.painterOrderFlowList != ''){
//		          this.yseOrnoFn(this.painterOrderFlowList);
//		          console.log(this.painterOrderFlowList);
//		          this.processListFn(this.painterOrderFlowList);
//		        } 
	    })
	},
	methods: {
		    setMessage(flag,message,Fn) {
			    this.$refs.alert.setMessage(flag,message,Fn);
			},
		    // 图片上传  
		    daojishi:function(time){
		        var This = this;
		        var dataTime = setInterval(function(){
		           if(time<1000){ 
		              This.dTime = 0;
		              clearInterval(dataTime);
		           }
		           time = time-1000;
		           This.dTime = time;
		        },1000)
		    },
		    showData:function(a){
	          var t = parseInt(a/1000);
	//        if(m/60)
	          var s = t%60;
	          var m = parseInt(t/60)%60;
	          var h = parseInt(t/3600)%24;
	          var d = parseInt(t/86400);
	          return d+'天'+h+'小时'+m+'分钟'+s+'秒';
	        },
		    clickFileActiveOneFn: function() {
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
		    clickFileActiveTowFn: function() {
		        const ie = navigator.appName === 'Microsoft Internet Explorer' ? 'true' : 'false';
		        const file = this.$refs.filetow;
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
		    clickFileActiveThrFn: function() {
		        const ie = navigator.appName === 'Microsoft Internet Explorer' ? 'true' : 'false';
		        const file = this.$refs.filethr;
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
		    clickFileActiveFouFn: function() {
		        const ie = navigator.appName === 'Microsoft Internet Explorer' ? 'true' : 'false';
		        const file = this.$refs.filefou;
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
		    fileUploadOne(e) {
		      var This = this;
		      var file = e.target.files[0];
		      var formData = new FormData();
		      formData.append("file", file);
		      $.ajax({
		          type: 'POST',
		          processData: false,  // 告诉jQuery不要去处理发送的数据
		          contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
		          url: PathList.uploadCaogao,
		          data: formData, 
		          beforeSend: function(request) {
		            request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
		          },
		          success: function(data){
		            This.imgUrl = data.data.filePath;
		            This.draftImg = PathList.ImagePath + This.imgUrl;
		            This.setImgUrlFn(data.data.filePath,'草稿');
		          },
		          error: function(data) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
		          }
		      });
		     }, 
		     fileUploadTow(e) {
		      var This = this;
		      var file = e.target.files[0];
		      var formData = new FormData();
		      formData.append("file", file);
		      $.ajax({
		          type: 'POST',
		          processData: false,  // 告诉jQuery不要去处理发送的数据
		          contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
		          url: PathList.uploadXiangao,
		          data: formData, 
		          beforeSend: function(request) {
		            request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
		          },
		          success: function(data){
		            This.imgUrl = data.data.filePath;
		            This.lineImg = PathList.ImagePath + This.imgUrl;
		            This.setImgUrlFn(data.data.filePath,'线稿');
		          },
		          error: function(data) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
		          }
		      });
		     }, 
		     fileUploadThr(e) {
		      var This = this;
		      var file = e.target.files[0];
		      var formData = new FormData();
		      formData.append("file", file);
		      $.ajax({
		          type: 'POST',
		          processData: false,  // 告诉jQuery不要去处理发送的数据
		          contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
		          url: PathList.uploadShangse,
		          data: formData, 
		          beforeSend: function(request) {
		            request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
		          },
		          success: function(data){
		            This.imgUrl = data.data.filePath;
		            This.colorImg = PathList.ImagePath + This.imgUrl;
		            This.setImgUrlFn(data.data.filePath,'上色');
		          },
		          error: function(data) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
		          }
		      });
		     }, 
		     fileUploadFou(e) {
		      var This = this;
		      var file = e.target.files[0];
		      var formData = new FormData();
		      formData.append("file", file);
		      $.ajax({
		          type: 'POST',
		          processData: false,  // 告诉jQuery不要去处理发送的数据
		          contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
		          url: PathList.uploadJiaofu,
		          data: formData, 
		          beforeSend: function(request) {
		            request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
		          },
		          success: function(data){
		            This.imgUrl = data.data.filePath;
		            This.endImg = PathList.ImagePath + This.imgUrl;
		            This.setImgUrlFn(data.data.filePath,'交付');
		          },
		          error: function(data) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
		          }
		      });
		     }, 
		    addTimeFn:function(a){
		      var data={
		        orderId:this.orderId,
		        extendTime:a,
		      }
		      SZXJ.http(this,'post', PathList.orderOvertime,data, (response) => {
		        this.order.addDeliveryTime = a;
		        console.log(this.order.addDeliveryTime);
		        this.popFlag = 0;
		        this.getValueFn();
		      });
		    },
		    cancelFn:function(){
		      if(this.identityId == 0){   //企划方
		        var data = {
		        orderId:this.orderId,
		        message:this.message,
		        }
		        SZXJ.http(this,'get', PathList.cancelContribution,data, (response) => {
		          this.popFlag = 0;
		          this.message='';
		          this.getValueFn();
		        });
		      }else{                       //画师
		        var data = {
		        orderId:this.orderId,
		        message:this.message,
		        }
		        SZXJ.http(this,'get', PathList.cancelContribution2,data, (response) => {
		          this.popFlag = 0;
		          this.message='';
		          this.getValueFn();
		        });
		      } 
		    },
		    appealFn:function(){
		      if( this.identityId == 0){   //企划方
		        var data = {
		          orderId:this.orderId,
		          content:this.message,
		      }
		        if(data.content == ''){
		          var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
		          this.$refs.alert.setMessage(true,'请输入申诉内容',function(){})
//		            Utils.setMessage(true, '请输入申诉内容');
		            return;
		        }else{
		          SZXJ.http(this,'get', PathList.saveAppealOrder,data, (response) => {
		            this.popFlag = 0;
		            this.message='';
		            if(response.data.code == 203){
		              this.$refs.alert.setMessage(true,response.data.msg,function(){})
//		              Utils.setMessage(true, response.data.msg);
		              return;
		            }
		            this.getValueFn();
		          });
		        }
		      }else{
		        var data = {
		        orderId:this.orderId,
		        content:this.message,
		        }
		        if(data.content == ''){
		          var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
		          this.$refs.alert.setMessage(true,'请输入申诉内容',function(){})
//		            Utils.setMessage(true, '请输入申诉内容');
		            return;
		        }else{
		        SZXJ.http(this,'post', PathList.painterApplyForOrderAppeal,data, (response) => {
		          this.popFlag = 0;
		          this.message='';
		          this.getValueFn();
		        });
		       }
		      }
		    },
		    cancelAppealFn:function(){
		      
		    },
		    setImgUrlFn:function(a,b){
		      var data = {
		        orderId:this.orderId,
		        actionEvent:b,
		        imageAddress:a,
		      }
		      SZXJ.http(this,'post', PathList.painterUploaMotion,data, (response) => {
		        this.getValueFn();
		      });
		    },
		    seeDrawFn:function(){
		      if( this.ImgFlag ){
		        this.ImgFlag = false;
		      }else{
		        this.ImgFlag = true;
		      } 
		    },
		    endFn:function(){
		      this.endFlag = true;
		      this.seeDrawFn();
		    },
		    trueOrnoDrawFn:function(a){
		      var data = {
		          status : a,
		          orderId : this.orderId
		      };
		      SZXJ.http(this,'post', PathList.orderConfirm,data, (response) => {
		        this.getValueFn();
		        if( this.endFlag && a == 1 ){
		          this.popFlag = 2;
		        }
		      });
		      this.seeDrawFn();
		    },
		    rejectOrder:function(a){
		      var data={
		        orderId : this.orderId,
		        status : a
		      }
		      SZXJ.http(this,'get', PathList.painterAcceptedOrRejectOrder,data, (response) => {
		        this.getValueFn();
		      }); 
		    },
		    validationOrNotCanFn:function(a){
		      if( this.identityId == 0 ){   //企划方同意或拒绝
		        var data={
		        orderId : this.orderId,
		        status : a,
		        cancelReason :this.message
		        }
		        SZXJ.http(this,'post', PathList.validationOrNotCancelOrder2,data, (response) => {
		            this.$set('message','');
		            this.popFlag = 0;
		            this.getValueFn();
		        }); 
		      }else{                      //画师同意或拒绝
		        var data={
		        orderId : this.orderId,
		        status : a,
		        cancelReason :this.message
		        }
		        SZXJ.http(this,'post', PathList.validationOrNotCancelOrder,data, (response) => {
		            this.$set('message','');
		            this.popFlag = 0;
		            this.getValueFn();
		        }); 
		      } 
		    },
		    chooseFlagFn:function(a){
		      this.chooseFlag = a;
		    },
		    popFlagFn:function(a,b){
		      this.popFlag = a;
		      this.title = b ;
		    },
		    shutPopFn:function(){
		      this.popFlag = 0;
		    },
		    isWelfareFn:function(){
		      if( this.isWelfareFlag == 0 ){
		        this.isWelfareFlag = 1;
		      }else{
		        this.isWelfareFlag= 0;  
		      }
		    },
		    painterAcceptedFn:function(a){
		      if( a == 1 ){
		        SZXJ.http(this,'get', PathList.painterAcceptedOrRejectSolicitContributions,{status:1,orderId:this.orderId}, (response) => {
		            this.getValueFn();
		        });
		      }else{
		        SZXJ.http(this,'get', PathList.painterAcceptedOrRejectSolicitContributions,{status:2,orderId:this.orderId}, (response) => {
		            this.getValueFn();
		        });
		      } 
		    },
		    appendAmount:function(){   
		      // 支付保证金
		      var money = document.getElementById("money");
		      if(this.title == '支付保证金'){
		        var data={
		          orderId:this.orderId,
		          margin:this.actualAmount,
		          payStatus:2,
		          isUseWelfare:this.isWelfareFlag
		        };
		        SZXJ.http(this,'get', PathList.payOrder, data, (response) => {
		            this.order.margin = this.actualAmount;
		            this.order.budgetMoneyExt = this.actualAmount;
		            this.popFlag = 0 ;
		            this.$set('actualAmount','');
		            this.getValueFn();
		            this.getAmountFn(); 
		            money.innerHTML= response.data.data.data;
		            document.forms[0].submit();
		        });
		     }else{
		       var data={     // 追加金额
		          orderId:this.orderId,
		          appendMoney:'',
		          payStatus:2,
		          isUseWelfare:this.isWelfareFlag
		        };
		        SZXJ.http(this,'get', PathList.appendAmount, data, (response) => {
		          if(response,data.code == 205){
		            
		          }else{
		            this.order.appendMoney = this.actualAmount;
		            this.popFlag = 0 ;
		            this.$set('actualAmount','');
		            this.getValueFn();
		            this.getAmountFn();
		          }     
		        });
		     }
		    },
		    setAttention: function(){
		      SZXJ.http(this,'post', PathList.saveOrCancelAttention, {receiveId:this.userId}, (response) => {
		        this.getUseFn();
		      });
		    },
		    getUseFn:function(){
		      var data={
		        userId : this.userId,
		      };
		      SZXJ.http(this,'get', PathList.myQueryUser,data, (response) => {  
		         this.party = response.body;
		      });
		      SZXJ.http(this,'get', PathList.queryAttentionNum,{receiveId:this.userId}, (response) => {   
		          this.attentionNum = response.data;
		      });
		    },
		    getAmountFn:function(){
		      SZXJ.http(this,'get', PathList.amount,{}, (response) => {    
		        this.amount = response.data.amount;
		      });
		    },
		    getValueFn:function(){
		      var data={
		        orderId : this.orderId,
		      };
		      SZXJ.http(this,'get', PathList.queryOneOrder, data, (response) => {
		        this.order = response.data.data;
		        var mtime = new Date();
		        this.daojishi(this.order.deliveryTime-mtime);
		        this.userId = response.data.data.userId;
		        this.painterOrderFlowList = response.data.data.painterOrderFlowList;
		        this.getUseFn();
		        if(response.data.data.painterOrderFlowList != ''){
		          this.yseOrnoFn(response.data.data.painterOrderFlowList);
		          this.processListFn(response.data.data.painterOrderFlowList);
		        } 
		      },(err) =>{
			      	if(err) {
			      		location.href = '/login'
			      	}
		      	});
		    },
		    yseOrnoFn:function(a){
		      var newPartyList = [];
		      for( var i = 0 ; i < a.length ; i++  ){
		        if( a[i].actionEvent === "发起方取消" ){
		          newPartyList.push(a[i]);
		        }else if( a[i].actionEvent === "画师取消" ){
		          newPartyList.push(a[i]);
		        }
		      }
		      var partyLength = newPartyList.length;
		      this.partyList=newPartyList[partyLength - 1];
		    },
		    processListFn:function(a){
		      for( var i = 0 ; i < a.length ; i++  ){
		        if( a[i].actionEvent === "交付" ){
		          this.processList.push(a[i]);
		        }else if( a[i].actionEvent === "上色" ){
		          this.processList.push(a[i]);
		        }else if( a[i].actionEvent === "线稿" ){
		          this.processList.push(a[i]);
		        }else if( a[i].actionEvent === "草稿" ){
		          this.processList.push(a[i]);
		        }
		      }
		      this.length = this.processList.length;
		      this.typeList = this.processList[this.length - 1];
		      this.actionEvent = this.typeList.actionEvent;
		      this.status = this.typeList.status;
		        if( this.actionEvent == '草稿' && this.status == 0){
		          this.stepFlag =1;
		          this.width = 120;
		        }else if( this.actionEvent == '草稿' && this.status == 1 ){
		          this.stepFlag =2;
		          this.width = 200;
		          this.left = 200;
		        }else if( this.actionEvent == '草稿' && this.status == 2 ){
		          this.stepFlag =1;
		          this.width = 120;
		        }else if( this.actionEvent == '线稿' && this.status == 0 ){
		          this.stepFlag =3;
		          this.width = 300;
		          this.left = 200;
		        }else if( this.actionEvent == '线稿' && this.status == 1 ){
		          this.stepFlag =4;
		          this.width = 400;
		          this.left = 400;
		        }else if( this.actionEvent == '线稿' && this.status == 2 ){
		          this.stepFlag =2;
		          this.width = 200;
		          this.left = 200;
		        }else if( this.actionEvent == '上色' && this.status == 0 ){
		          this.stepFlag =5;
		          this.width = 500;
		          this.left = 400;
		        }else if( this.actionEvent == '上色' && this.status == 1 ){
		          this.stepFlag =6;
		          this.width = 600;
		          this.left = 600;
		        }else if( this.actionEvent == '上色' && this.status == 2 ){
		          this.stepFlag =4;
		          this.width = 400;
		          this.left = 400;
		        }else if( this.actionEvent == '交付' && this.status == 0 ){
		          this.stepFlag =7;
		          this.width = 700;
		          this.left = 600;
		        }else if( this.actionEvent == '交付' && this.status == 1 ){
		          this.stepFlag =8;
		          this.width = 800;
		          this.left = 800;
		        }else if( this.actionEvent == '交付' && this.status == 2 ){
		          this.stepFlag =6;
		          this.width = 600;
		          this.left = 600;
		        }
		    },
		    evaluateFn:function(a,b){
		      if( b == '总评价'){
		        this.evaluateFlag = a;
		      }else if( b == '画稿质量' ){
		        this.qualityFlag = a;
		      }else if( b == '专业度' ){
		        this.majorFlag = a;
		      }
		    },
		    addLabelFn:function(a){
		      if( a == 0 ){
		        this.addFlag = 1;
		      }else{
		        this.addFlag = 0;
		      }  
		    },
		    yesLabelFn:function(){
		      this.labelFlag+=1;
		      this.labelList.push(this.labelName);
		      this.$set('labelName','');
		      if( this.labelFlag < 3 ){
		        this.addFlag = 0;
		      }else{
		        this.addFlag = false;
		      }
		    },
		    publicationFn:function(){
		      var data={
		        orderId : this.orderId,
		        totalEvaluateLevel : this.evaluateFlag,
		        qualityEvaluateLevel : this.qualityFlag,
		        majorEvaluateLevel : this.majorFlag,
		        content : this.evaluate,
		        evaluateLabelList : this.labelList
		      };
		      SZXJ.http(this,'post', PathList.evaluateOrder, data, (response) => {
		          this.popFlag = 0;
		      });  
		    },
	},
  	head: function(){
		return {
			title: '约稿详情-QC轻小说',
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
		    	{ rel: 'stylesheet', href: '/painter/css/main_order.css' },
		    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
		    	{ rel: 'stylesheet', href: '/css/cropper.min.css' }
	  		]
	  	}
  	}
}
</script>

<style>
</style>
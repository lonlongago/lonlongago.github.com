<template>
	<div v-show="displayFlag" style="display: none;" id="fans" class="fans">
		<script src="/lib/resize.js"></script>
		<script src="/lib/pullToRefresh.js"></script>
		<div id="pull"></div>
		<div class="content">
			<div class="blackWrap" style="display: none;" v-show="toWrap"  @click="showMenu"></div>
			<div class="cephalosome">
	          <img @click="backFn" class="back" src="http://cdn.qcacg.com/img/app_index/classification_03.png" alt="" />
	          <div class="title">
	            <span @click="getValueFn"  :class=" flag == 0 ? 'shelf' : 'record'" style="border-radius: .04rem 0 0 .04rem;border:1px solid #1CC8ED;">关注</span>
	            <span @click="getValueFnSec"  :class=" flag == 1 ? 'shelf' : 'record'" style="border-radius: 0 .04rem .04rem 0;border:1px solid #1CC8ED;">粉丝</span>
	          </div>
	          <a href="/app/search"><img class="searchSec" src="http://cdn.qcacg.com/img/app_index/classification_05.png" alt="" /></a>
	          <img @click="showMenu" class="catalog" src="http://cdn.qcacg.com/img/app_index/classification_07.png" alt="" />
	          <div class="commonHeadMenu" style="display: none;" v-show="menuList">
	                <a href="/app" class="home">
	                    <img src="http://cdn.qcacg.com/img/app_book/home.png"/>
	                    <p>首页</p>
	                </a>
	                <a href="/app/classFirst" class="list">
	                    <img src="http://cdn.qcacg.com/img/app_book/list.png"/>
	                    <p>分类</p>
	                </a>
	                <a href="/app/rank" class="sort">
	                    <img src="http://cdn.qcacg.com/img/app_book/cup.png"/>
	                    <p>排行榜</p>
	                </a>
	                <a href="/app/personal" class="personal">
	                    <img src="http://cdn.qcacg.com/img/app_book/personal.png"/>
	                    <p>个人中心</p>
	                </a>
	          </div>
	        </div> 
	        <div class="section" v-if="flag == 0"  v-for="sos in info"> 
	           <div class="info">
	             <img class="head" :src="path.imagePath + sos.userHead" alt="" onerror="javascript:this.src='data:image/jpeg;base64,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';" />
	             <span class="name">{{sos.userName}}</span>
	             <div @click="attentionFn(sos.userId)" class="cancel">取消关注</div>
	           </div>  
	        </div>
	        <div class="section" v-if="flag == 1" v-for="sos in infoSec"> 
	           <div class="info">
	             <img class="head" :src="path.imagePath + sos.userHead" alt="" onerror="javascript:this.src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCACIAIgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDjtR16WRnWAfZ4zyQCC5+p7fhWJJdSZZlfYepPf8TUtnYz3shW3XKr9524C/j3P0rXh0iK2iLSL50ueGfoDnHAolOFPTqdVOnVq7aI5+KGW4OYomckj5u3p1rSTRGVlW5nA5GRGMn6ZrU2nzUXbwg3ccc9BUZkO8Z65yazdds6IYSEd9SvJp1hAP8AVbyecyHNWFaONQsaIgyOAAO9VL6Utcoo6EgfrRdErJjoCOB2rFzZ0xpqOyL7TkFlJPHvURuODiqjSghJB0df16GmGTg+lLnL5S085BRh0HBz6U8Tk8Hv1xVFsMmCeD2qPcSMHll4P+NNTHY0BOSSpPzDkfSlFxkMO9Zxcqcjt1Ht3qUkkbsfQihSGkXRMSKel0y8Hp61m78d8d8e1PDccdKpSYcuhq+eDxwf1pnlWszYkgjY9jjBzVAMQRg4p6zHOQeRzT5mS4LqibXdKjtI7S8tCfs1yCpVjnypF+8ue4xgjNFbOnganot/Y/xsBLEO6yLyCPqMiiumhiYqLU3qeZiMLJTvBaHU634Fu9CjZbYxy2kI2h14J9yPXisFrQmNcrlsZ9a9l8SWDX6GCOYC5ljdnZs4PoAO3pXG6ZpUq291dNHlLfCNuyDnoQB3NeVLmTO6jUThqefJbkmRuuWxg+wx/Oq7QkzAADuc/pXotvZQCBw8KEqRuDLggk5NRw6Hp09/+8hPllQSIyQcE84/Ksvb23OhtHlF7G4u7diuAZP0xS6ohURttwNxBP613/inwrp6TI1pNNHD5uFD4JAxxmk1TwSWsXkhvN6hfMGVHpzVrERDl0T7nnlqvnQyRgfMPnUfzAo8ghN2M+grorPQ54JggYMxPBHr2qa50mWInem0HOB6HuKftUWodzkkJwR3B6HriklB+8o9mHqK2bzTW27gvI6gent/OohYug3Yyvf2qlNA4tGQh6/3Rzn27VYsZFBaGXlTyp9BUk0ICs8CvIg67VOB6jPpVeSNyqyJG5K+mOR6da0Urmdi29qWXK81VKmNir8Y6Z9Kmt5pYsbkkMR74zg+tSzeXcrmP76/mfUVelhXKrNxx2p3+12qPcVcBuMVYtF370I6DjPpTvpcL3NPwpMYtahB4WTKkfhRRp8BinSUDLRMGz+NFY1LNjaPpSGJftCI67J1JaQd3GeCR39PaqWowI6yrbsi28R81gDgyEk557Dd+tSWuoPLepa2aQkJDvlcEkxnPQjHB78moLm/spM3Et1b2yGTYHGBvH8WQexPYdTVW7nmRTTKX2UjVnvmXezRhgv+1zzj9Kw5lkspo3nCJ5ynaFYHnJzmuovFCkSQNGYVHKSAgYGcnP8AnFcH4pjks7+CcySSxzKwVWOSpyMAeo561zVY+6dlD3pWIfErmS0YoRkEMD6Gl0nWYZtIheaQIqoFYOcEj6ViXs0ksLrI+xShIVOv4miwg/s+5tyEQJcRh4yed3YjPrmuXlVrnocvu2DiFisbF1ib5W5G5T0I/DirYeWWSd34hkUMx6hCOM/yq5qMAmsxdIC+wfMMc7c8/iOtJozGKQHaJVHzAHo64wQfwoQ09DMlAEhjf5ZVGcHjcPUVGkKFx0Hpu4B9ie31rpNT0aJjEVG+3fmJ84IH93PY4rKu9NntIhOSZ7Qk4lRclPZx2Pv0q46DumUxpizMyRgrKF5ibrjHb2rIk8OyWnmC1UtG2WMTdQT12nsPaumgYtEu9BPAvIIOGT/dbtVlL9FX/Vy3CggYkUBl9y3cVcZtGcos4GFTartuYzG+eA4xuGcED8Kqa3aiylDwNvhdQ8RTk4PIB9x0ru1mkmnkbYEWWVYYjIcogz129znvWf4k0o29lfYSOS9jZJA7DBwDtcD0GCDWkKttyORtHDswY7LhcEH5SOo9jS248t1kVt+04P075FXdSsZYNjMnysoYOORWfCmJ2P8AAcA+xxW3OmtCbNHVWMQJycEMOKKZ4cJntTG2NyHbjPPWis3KzNEdr4y1eeHUZvsUzwrcMYX2cb1A55/CqEGryRXEFvKPNsYpFneMgEk+x/pWX4mm8zUrVVPCEj68daqW8pkkuGY8liPTAA4rByadwpUU4ao7f/hL1N5eT36lLKRCsaDnYcEAn65rl7WOS5Mu0lnhhZ1BycBcEgD6CqyMLiwzIMkp8w9+4rV0sf2Rr9k0nzQqyOCTkPGwxz68GjnbWpSpxgnyrUzpPnCt1U5XPsR1rsLbRpNS8I2CFP8ASIUDRuBwGyQRn0I4pvjPw7baEzTRTIunsu4hzgwg9Oe6+9cFr3xGudFtIbPSovt7ljl3YiJPYAdT3ojCTfKJ1o8qnc9E0mAKqGU/LLkEdSjdwfUVA9iNLv8ADI4sXbIcDIjJ7Z7DPr0rzvQ/ih4hcTG5j0yzhOFw1uzbjjAGc8GvovwlEmoeG7Oa6ezuhKmfOhBKN7HPQjpWiw7Ry1MXFLmOZWzlt4ts0ZltX5BUZA9/pTPIltmMlqUkRgAysQNw9z6130WkRxKFtWeFOwXBX8AelK2g2bkNKpdx3GBz9K0+ryMFj4Lc8M8b30ulzia206RODkRkRqD23HHzD6V5RrfifXr282Weop5GAWWGEBM56ZI5r6g+IngrStR8O3b3kkiRwRmQuxJEa/xNgdcDnFfNfjay0nQNca30u9NzpyoDBKoPzLgcn8a6KGHVnzbiqYpVPgehLpnifVNP04tfxJes06uARhsAAnGOg4616bJd22raNBeWzGR54yJYiMGJguQpHpgHnvXm/ha7svt+mMYpDK10iqzjA2t8rBh6HNeu2WiDT9XuII4gLf7OZoiDkKpyMH1A5AqK1CKjc2oV5X5W9DmJIEXwxvZfMMRMKqOSxycAfhXJLYmKCVG5fO7I9eor1LwfpC3miTfbUTzZZHwnXYMAAfXAridetU03WbqFeIA5VT1xjHFefH3TuhJSvEp6QVtLoSBf3MxALr0Bx3HaipvDh3xPZzj/AFzE5xyh/hopuTbG4l29tvO1O3YjKqST6HisoNsuHQ8K4wOO+K9JtvBmqzXFs90sdnDKMrJKchcjgYHQ98GtaD4W6bBeodWv5biKTOIoh5fPruznvnAq1Rm3cwjjKMFZu55hp0TyKjRoXUjEiL1yODj1PtXQTWF3Lp0cM2m36zWh3QubdvmjPJjPHBHUH8K9T8O+DtN8MpLNbQm9nGWEsrDeB7DGAffvXN3vxSupDcpY6esarKYYnlcli2cH5cEZxzjNdFLBym+XqcVfNIwXPsl3ZxPivT9R1+wsYLiG4eBQsO90IR2JAjZjjnAzx61yPifwRceHrQ32nxRPoyOtuxlkBeSTGWYr2H0r2uDUbvWv7OuL/UI2hindJ7WMAEAqdkhXOT6+lcv8VPBcbXMOrO/n6bIBHeLGSojbokgH6E/SuqNP2TcJbowhW+sqM4vRnkmh3WnyO9vfZaGbCsvUAdBivp74TXou/Aunq2N9uz27EADIUkAkepXBrzXwl8PdNtIZdRgYMZuVSRQyxqD2PrxXpHw4tHs/D5aVCj3U7zbWGCFzheO3AzVSlG1kPEQfJZnZr09qU+vpUaZwP1p+ecd6L3PPaIbyBLq1uLacboZ4jGwPcEEEfka8T0fwtYSGbQtbsojPaOQ29B+9QH5GU45Fe5OoJ5rPuYQzlmQMwG0MRkgVLlKKdjow0+Ru55E2kw3PizTtItoN8VtIt1cybPkijXlVJx1JCjHpXpypBbz3OpSgbliI4AwiAbiAPqKf5A52jaCcnHGeO9c98Rb7+yfB1yU3+ZcslvGF6kE5bH/AQaylNy1l0OqT53aPUxvB80s1jLNOu2ZsylR0GckD8sV5rrcxuJ1nbBDSHzD7k8H+ld58PdSfUtU1NJVRCcMiJ0VMYxnueOtcRHaebdanZTfISsqqT2ZTkV58+56tJcspJ+Q1IDAyyLwVIJPv2NFTafN9otYWf+IbHHoen8xRRc2Z7c3iGWK/eDUbPybWQbUlJ3BjnofQfWqYkh1CS80lpJLSe3IltpBk7QRwQe4zkYp3iFDLo9xEhHnSDbGT69j/AFrMsobyKKHzgksiJ5eQ2CRxySRz0rp529zy6dCDXMtGPvtbfQvA1xc3s4e7jLrK5IyxyQMH6V4qniW1F0JrbzY1ly8sUhB2uScgHuMV7HqVlo39myjxG8b2BG1xdOSOfQZ689qx7v4P+HdQ0u7k8OXQW5l2yRF28xYgvVR359+lepleIp0KvtJ3vt8jxs7wbxVH2KtZ6/PyMTwt4hgstXiu2tfNRV27gQACwwCTjp1r1y5jSRHjaGN4pF2shAKsD2x6V4fobXGmA2ysnmSE+YHQEEYxgj2rvvhxr/lSR6FqcmVYf6FO3A75iY+vp6jipx+Khi6zlBWX5muX5ZPL8JFSd3u12Os0vTLbT7cQ2dusMSnIVOg+lbFupxkjFPS3wTx7VZjTA6Vyxp6mlWrzDkGF9aXaN5YfewAT7Uku/wAs+Vs39t+cU0ebxkIpxxjJ5rbY5upJxzUciBs5702CEpK7vLI5bHDdF9gO1TDqc9aGrgtCr5APA/GvGvjDrK3PiKPTbd8xafH+8I6ea/Qfgv8AOvR/HPi628L6cDxLqU4It7cdWP8Aeb0Uev4V88ieWe6uGuX824llMskh6uzdTWFVLl5T08vpuUvaS2RtfDXUDD4ws1Y7fNZ7VgOmTyp/SrXiNfsXi3UAv/PUuPoea52wc2OrR3i5DW8qTYHoGAYf1rqPiAM+IHmH3ZYVYEdzyD/SuScdD12rVb90Y0SiO5nWM/upj5kZ9D1Iop1kwkxGxwcZBHY57UVlsVLfU7e5+ItszK0mjXLKOhEy7l7Ejt+tRN4+tiSltpV0znoZJFA9skVxOsw/ZmlRiFVgcDPQ9iP50eGnF4gWPzJZsAAxIX9uwrWPN0Rh7OlGPM3+Jo3ktzr+qRvflGdpQqIM7EAbkAfQda6rxBcCLQLp/uebMsYMZKn7w6EH2rF0FZv7Z8q5tnjeNHmJK4BI+XHsc84rS8RxmbR7O37yTBsd8gE8UK99TObUrW2Oft4QL4OBgBNoHt0p92qsVRx8hYqSM5AyMEHsfepYo2KwTFcdj+I/+tTNSyvlE/3sHHfkVso6GnNd2Ow0X4gXehtHa+JUlvbQnal/EuZEGOPMUfe+o/GvStI1bT9YtvtGlXlvdQ9zGwJHsR2P1rwrU2LSvCPveT5qn3DYP6Gsq4EMl9ZzQGWzumQqbi0kMT7weMkdfxrpTa3OCeBjUV4aM+lyTkenemswHX868r+H2t+LL19Qtrq/s9QFqEaE3EJjeRDnOWXuDxyK6Y+Jr+KTZcaIcjqYrlT+OCBTc0cP1Wak472Os3Vw/wAQvH8Phu2WCwi+16nMxjRcExwnBJZ29hzt6mrFxqV7qQ27DZ27KQUU5lb2J6AfTmuF+KUKWemaXbRKEBeWQgdM7QMn1Puajnvsb0cKuZc5xktxPeXMt7fXD3N3c/NJLJ1Y46Adl9h0rLcCK9YtwDjn8eKtBS8NmQPnVwQf+AkkVV1xCybkOWZQy+uQwqWtD1YxstNjcvbQxP5oA2uoYH2YYNW/EExubHSLpv4k2MO/I4/lWqtgL/SYPmwTHkEc9sisO4P2nw4oBz5UmCe/B5H5GuWW1jWMuZK/QzkbyCknI2N+GOhop6IZoyGHDAqR79DRUWNXqes6a1k8X2aWC2lRBta3ulCyp7fN1/H86lg1BrdjBo9o65Ug/L5aRnsTxz9B1q54llgmYJPZjz0YAyMBlfp6jviuU1a6ullZLG7Bh7OEKsD6ZzXclJaI+aVNTfNNP9CaKAreSKfmMUbeY57uSMD645pdTgEkVvuCMIlZ8MSMDbgEHseam0TdLo7SMuxnkYEA5zg4yfU8Vo28UTT7JwNhgdTnknoMVhCNp2Z1Vpv2La0OXltriOxaRRE6RjeyciQDvx61nagqXLwNCwZTliOc/jXQWqnc8cZ2OEDB2yWJ6Y+nHQ16R9istSsLeaayt7gvGGJKAMeOcH1rrlTUdYnJhsbNaT1PD7xyHtrjGWiJQj1BHP8AKs6/hCyIm/CSttVx2yNyn8xXa+I7DTk1a9S0jmFvgKAJDtUjqQCPWtfRPBWmPp+nHVDcTSzv5kcQbCouc4OOv/16HpZnsRxVOnGMmU/hXLI2qznZ8vkFZsdAcjFd5qdkkv76MYb0HepWt7XTofJsoYoIwCQEAHPqfWmi5EiggjHcVDt1PPnVdSp7SCsjNhjAf0I7muK+LVrJJZafOqbo4mdWP90kcc+ldy7ASnHemXUEN3ay21ygkglUqyH0rNG0ZNSUjwjT0JNofQknPpg1XvYeY1I+VZSp+meK9D1DwJFamCaw1CQIrbCkqbhhuM5Fc6vh+7lcm6ntYFNwWA3F3Kg4ztA4PHQmtF72x6VKrTcEr6pm3oLq1mE4UxsUAHoemKwpLGezstStbmEwukpYI+M4IBz1r0zwJpNpZwPdgGe8MhXzZAAEA6YXseetchcj+0dX1iZzvEjOyjrxgYrnqwsmzBV060ox2Oe0WxF7ZgQtKbhxhSygJu6YJ7DjrRW/osJGls6MUVJGVgBk4BzxRXVHDwnFM8ermVenUlGOyZ3+tW9xNfT5V3VRuBA421yOqxEFWRfmJ28dSaKKmOjNqc26foi/4fU/2FBkYbe4I7g7jkVctJEj1WNZCFDxNtDfhkA0UVgv4g6mtFlK6t44NYRY1BiZg0idFIPBBPr7V3ulyLBoqMnCQRlQP93OP5UUV2y6Hk0d7HnU1uZiiNndLIASOeWOP612bRzR38i5doraMRAx8jOOcj1xRRWVToexiJWmo9B0jmWPKtu2/n+NV9/lH5RxRRWXUqHYbvJfjjPU09mVBlmAHv8A0FFFMuxFcwzXFnKsa7FKkh3zkHGRgfhXC2cfnlZ+pdyxPY8miiqpbsKb1Z2FvdjT/C97OoJdGdVA4JY4A/nXMafbG0a+3DDRoiE5JyxAyf0oorOt8FzKLf1ixiWU9zC9xJbyyvatK+IkIBJzgkHFFFFdMI+6tTKrGPO3Y//Z';" />
	             <span class="name">{{sos.userName}}</span>
	             <div v-if="sos.attention" @click="attentionFnSec(sos.userId)" class="cancel">已关注</div>
	             <div v-else  @click="attentionFnSec(sos.userId)" class="cancel">+关注</div>
	           </div>  
	        </div>
	        <appBottom></appBottom>
		</div>
	</div>
</template>

<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from "~/components/vueHttp"
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'appPathList':appPathList
//		'myheader':Header,
//		'myfooter':Footer
	},
	asyncData:function(context){
		var obj={};
	    obj.id = context.params.id;
//		    console.log(context);
//		    console.log(obj.id);
		return obj;
	},
	data : function() {
		return {
			displayFlag:false,
		    path: appPathList,
		    szxj:SZXJ,
		    obj:{
		      status:0,
		      pageNo:1,
		      pageSize:10, 
		    },
		    objSec:{
		      status:1,
		      pageNo:1,
		      pageSize:10, 
		    },
		    info:[],
		    infoSec:[],
		    flag:'',
		    menuList: false,
		    toWrap: false,
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  	if( this.id == 0 ){
	      this.getValueFn();
	    }else{
	      this.getValueFnSec();
	    }
	    this.displayFlag = true;
    	k_touch("fans", "y");
	    setTimeout(function(){
	        document.body.removeChild(document.getElementById("loading"));
	    },300)
	  })
	},
	methods: {
	    showMenu: function() {
	            this.menuList = !this.menuList
	            this.toWrap = !this.toWrap;
	            if(this.menuList){
	                document.body.style.overflow = "hidden";
	            }else{
	                document.body.style.overflow = "auto";
	            };
	        },
	    backFn:function(){
	      history.go(-1);
	    },
	    attentionFn:function(s){
	      SZXJ.http(this,'post', appPathList.saveOrCancelAttention, { receiveId: s }, (response) => {  
	      });
	      this.getValueFn();
	    },
	    attentionFnSec:function(s){
	      SZXJ.http(this,'post', appPathList.saveOrCancelAttention, { receiveId: s }, (response) => {  
	      });
	      this.getValueFnSec();
	    },
	    getValueFn:function(){
	      this.flag = 0;
	      SZXJ.http(this,'get', appPathList.myCareOrCareMe, this.obj, (response) => {
	          this.info = response.data.attention;
	      });
	    },
	    getValueFnSec:function(){
	      this.flag = 1;
	      SZXJ.http(this,'get', appPathList.myCareOrCareMe, this.objSec, (response) => {
	          this.infoSec = response.data.attention;
	      });
	 
	    },
	},
  	head: function(){
  		return {
  			title: '粉丝-QC轻小说',
  	    meta: [
  			    { charset: 'UTF-8' },
  			    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no' },
  			  	{ name: 'format-detection', content: 'telephone=no' },
  			  	{ name: 'apple-touch-fullscreen', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-capable', content: 'yes' },
  			  	{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  			  	{ name: 'keywords', content: 'QC,QCACG,QC轻小说,轻小说,轻文,原创轻小说,轻小说投稿' },
  			  	{ name: 'description', content: 'QC原创轻小说，一个在二次元盛起的魔法圣殿，拥有魔幻与神奇色彩，为二次元提供轻小说投稿与画师约稿相结合的平台。加入我们，接受契约，用轻松奇幻的文字留下你心中的故事。 ' },
  			  	{ name: 'baidu_union_verify', content: '1dbb2d68c26ba734e502097619803d73' }
  			],
  			link: [
  	  		]
  	  }
  	}
}
</script>

<style>
		
		/*@font-face{font-family:sansSerif;src:url('../font/app-font/Microsoft Sans Serif.eot');src:url('../font/app-font/Microsoft Sans Serif.eot?#iefix') format('embedded-opentype'),url('../font/app-font/Microsoft Sans Serif.woff') format('woff'),url('../font/app-font/Microsoft Sans Serif.woff2') format('woff'),url('../font/app-font/Microsoft Sans Serif.ttf') format('truetype'),url('../font/app-font/Microsoft Sans Serif.svg#YourWebFontName') format('svg')}*/
		*{margin:0;padding:0;font-family:sansSerif;list-style:none;text-decoration:none;color:#000;line-height: 1.1;}
		a:visited{color:#000}
		body{background-color:#f4f4f4;padding-bottom:.8rem;}
		.fans .content{margin:0 auto}
		
		.fans .content .cephalosome{position:relative;z-index:10;background-color:#fff;box-shadow:0 .03rem .05rem #ececec;margin-bottom: 3%;}
		.fans .content .cephalosome .title{margin:0 auto;width:1.5rem;height:.8rem;text-align:center}
		.fans .content .cephalosome .title .record{height:.4rem;font-size:.27rem;line-height:.4rem;margin:.2rem 0;box-sizing:border-box;color:#00A1D6;display:block;width:.75rem;float:left;border-radius:.04rem}
		.fans .content .cephalosome .title .shelf{height:.4rem;font-size:.27rem;line-height:.4rem;margin:.2rem 0;box-sizing:border-box;color:#fff;display:block;width:.75rem;float:left;background-color:#1CC8ED;border-radius:.04rem}
		.fans .content .cephalosome .back{position: absolute;left: 7%;height: .8rem;padding: .25rem 0;box-sizing: border-box;}
		.fans .content .cephalosome .searchSec{position: absolute;right: 14.4%;top: 0;height: .8rem;padding: .25rem 0;box-sizing: border-box;}
		.fans .content .cephalosome .catalog{position: absolute;right: 7%;top: 0;height: .8rem;padding: .25rem 0;box-sizing: border-box;}
		 
		
		
		.fans .content .section .info{background-color:#fff;padding:2% 0;overflow:hidden;border-bottom:1px solid rgba(0,0,0,.065)}
		.fans .content .section .info .head{width:.8rem;height:.8rem;border-radius:1rem;margin-left:8%;margin-right:3%;background-color:#00A1D6;vertical-align:middle}
		.fans .content .section .info .name{font-size:.28rem;display:inline-block;vertical-align:middle}
		.fans .content .section .info .cancel{float:right;padding:.25% 2.5%;border-radius:1rem;border:1px #00A1D6 solid;margin-top:3.2%;margin-right:10%;color:#00A1D6;font-size:.24rem}
		.fans .blackWrap{background-color:#000;opacity:.4;width:100%;height:100%;position:fixed;left:0;top:0;z-index:10}
		.fans .commonHeadMenu{text-align:center;padding-top:.15rem;padding-bottom:.2rem;width:100%;background-color:#FFF;position:absolute;top:.6rem;z-index:10;border-top: 1px solid silver;margin-top: .2rem;}
		.fans .commonHeadMenu a{display:inline-block;width: 23%;}
		.fans .commonHeadMenu a img{display:inline-block;width: 0.35rem;height:0.35rem;margin:0 auto}
		.fans .commonHeadMenu a p{margin-top:.08rem;font-size:.22rem;color:#232323}
</style>
<template>
	<div id="app" @keydown="keyDownFn($event)" v-show="bodyFlag" >	
		<alert ref="alert"></alert>
		<!--<myheader></myheader>-->
		<div class="content">
		  	<div id="reader" class="reader" style="min-height:1200px;">
			    <div v-if="loading!==''"  class="loading" :style="'background-color:' + bj_color + ';'" style="position:fixed;width:900px;height:1200px;z-index:99;">
				  	<div style="position:relative;height:100%;">
				    	<div style="position:absolute;left:50%;top:30%;">
					      	<div style="position:relative;left:-50%;top:-50%;">
					        	<img :src="path.ImagePath + '/img/loading.gif'" alt="" style="width:50px;height:50px;"/>       
					      	</div>
				      	    <div style="position:relative;left:-50%;top:-50%;font-size:18px;"> Loading...</div>
				    	</div>
				  	</div>
				</div>
				<div class="inner-reader active" :style=" 'min-height:1200px;background-color:'+bj_color+';color:'+font_color+';'+'font-family:'+font_family+';'">
				  	<div class="book-info">
						<p class="book-nav">
						  	<a :href="path.TemprootPath+'/'" >QC轻小说</a>
						  	<i class="fa fa-angle-right"></i>
						  	<a :href="path.TemprootPath+'/catalog/'+bookcontent.bookId">{{bookcontent.bookName}}</a>
						  	<i class="fa fa-angle-right"></i>
						  	<span>{{bookcontent.contentTitle}}</span>
						</p>
						<h1 class="title">{{bookcontent.contentTitle}}</h1>
						<p class="info-top">
						 	<span class="author">
						   		<span class="t">作者：</span>
						    	<span class="d">{{bookcontent.userName}}</span>
						  	</span>
						 	<span class="count">
								<span class="t">字数：</span>
								<span class="d">{{bookcontent.contentWordCount}}</span>
						  	</span>
						  	<span class="update">
								<span class="t">更新日期：</span>
								<span class="d">{{szxj.getLocalTime(bookcontent.contentUpdate / 1000)}}</span>
						  	</span>
						</p>
			     	</div>
			        <div id="book-content" class="book-content" :style="'font-size:'+font_size+'px;'" ref="bookcontent" v-html="bookcontent.content"></div>
					<div class="book-bottom">
						<p class="next-page" >
						  	<a v-if="nextContent" :href="path.TemprootPath+'/readBook/'+nextContent.contentId+'@'+nextContent.bookId" class="js-link-state">点击进入下一章<i class="fa fa-angle-right"></i></a>
						  	<a v-else @click="setNextEnd" class="js-link-state">点击进入下一章<i class="fa fa-angle-right"></i></a>
			            </p>
						<!--<p class="hint-page">按键盘上的 ←（左）键和 →（右）键可以快速切换章节</p>-->
					</div>
					<div id="book-tool" class="book-tool" :style="'right:'+rightSize+';'">
			            <div class="tool-top">                                                       
			              	<a v-on:click="screenFn"  id="btn-screen-tool" title="全屏" class="fullscreen"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RCMzc4NjkwRUNDMTFFN0FEQUZCOTAyNEIyQkQxMjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RCMzc4NjgwRUNDMTFFN0FEQUZCOTAyNEIyQkQxMjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu7VHwkAAAGMSURBVHja7JrRbcIwEIadiHfYAEYoE1BG4D1S6QZsQLsBGzQPGYANgA3CBmUDOkF6kYzgIUa+nH13FjnJipAi83/xf+bOJGuaxqQcuUk8BgDpGFEnKIrC99YZjGnf76mq6hQFwDPeYRyID6oGiLmUhd5izcG1AqW1EAZkwZIDnnGFsXF4u8supS+Aul3Iiv+wH/9gXJIB6BDfJv9vEgBd4sFedRIW6iteBQBFvAYAknhpALJ4SYAg4qUAgomXAAgqnhug60eqpk7KBbCJIZ4T4EoQfyslzpIArX3mtpxGPXnIkTVclhZcrJw2FMsAxPG1mnqoT9Y26b6f0TtiZ5v3zwfvs59K/Nhr5vKex1bZJt1XbIA8cKI+bpV7DgvlkcQH2+c5AMTEkwEcPSybeBKABvG9AbSI7wWgSTwaQJt4FAD19EAUQKt4LwDN4n3K6YW5nxKrE4/tB7YwxrAiPsfeZ45KFAuwQ7aQS44dKlZDM0GW4cFXYGUc/6ggGvGSAyAbXjUYAAaAtONfgAEAjD2h0QWTxVkAAAAASUVORK5CYII=" class="titwe"/></a>
			            </div>
			            <div class="tool-bottom">
			    	      <a v-on:click="gotoCatalogFn" id="btn-menu-tool" title="目录" class="menu" :href="path.TemprootPath+'/catalog/'+bookcontent.bookId"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTdGQjlBNkEwRUNEMTFFN0FDMzk4ODY3QjIwNTkyN0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTdGQjlBNjkwRUNEMTFFN0FDMzk4ODY3QjIwNTkyN0MiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnBHzbAAAAF+SURBVHja7JjfbcIwEMYD6gDpBDUTlBHSCaDvkUgnICN0hHaCBinvhQmgG8AGsAFMEL6T8mBZZxf1T6zAd5JlcfjQfc4d/jmDpmmSPtsw6blRAAVQQM/tzv6Q53mKaYaRtq5VXddbLRBrx5gmHee7RT4r2zGwzwEktcaUOUEjBO2d5KeYPiNt+gL5FL4SypQAo/iyiFUzC/XAQQk4Kr59RAEHbw/AXjEKp+a0Hqgwxp6n899WenvgJ4Z++FU8NojnAAVQAAVQAAXcrgCXRgWjH63vTwGcFox46Dph5PMVElC5tAd7QtDGSV5odB1p09+RT+krocmF6DyNWDXzq8LpoYLT9gK5Ur55cHohPdJx8jv36ROneQ5QAAVQAAVcFY3Kyyp552lal0DcMw6bo3N4CbV+RGAiQZgXGy41lDAOyBXKD5WRgM60G+ctoVQJutTXld2HBCw94JYo606RBFRBmEN9F1YZLb+5kZkIN7LNn9Io/0YpgAIo4LYFnAUYAFnZevDtPYLoAAAAAElFTkSuQmCC" class="titwe"/>  </a>
			              	<a v-on:click="settingShow" id="btn-setting" title="设置" class="setting"><!--<i class="fa fa-cog"></i>--> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkQ2MEVBQ0EwRUNDMTFFNzlFRTU4NDA0QTc3MEJFOTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkQ2MEVBQzkwRUNDMTFFNzlFRTU4NDA0QTc3MEJFOTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PghCXEYAAANtSURBVHja7FpLSFRRGJ4ZzRJskdHTQqTHokUQQbSwiNCQQqtFJDkZBdG2FkFF0SqigkhqEa3ChpKopE0JFfQQFKmgoKgpGqPsYRIWPXTSpu/Hb2AY7j33zp3juTM0Bz7OcOb3v/93z/lfZwwmEolAPo9QIM9HgYDfozhbBeFwOH1pOXALKEtbHwY2A9dTFyORSM7twGKb9T/AjHw4QqIzaLFe4jsBHJcVAgexKmCiDYFKDfq9EYDiWkw3BPi8SSFarvCtSQr961P017q1K+gmkUFhDaZWYFbK8l7gJPA3Za0CaAOqbVRFgdVAX6oTQ/8ufDyVQvAj0IzvbmdNgMZfAGZafH0aOM63Xg+sAVYq1AnZTkapa8AXYD+wx0L2E7DViYSSAIxfhumeautp0HRgYYb+95w7oTouP4C1IPHAax4Y5nZWKWSqPQaQRYRqxIGEZycG8yeYxGE/+JBkvwJNsKEzqygEBY8wHfaBwCE8u0NXGD0PnDBo/DngrLYwSocuxdThEGV0DAkaG/D2B3Vn4qlAqYG3X5FJyZEJAXHmpQYIzAcatRLA8SnCVGOwf1iHZ5Z78gH8YTMLr9nczmmM15UOCU3nGAV6gafM1n0M5XH4RqtTIjvDcriE8GPIjs8jkgktmdQcCUzOwc7R9mUWmvoCgXG4lehntAmxNZzgs42jrIpHgCE3BBqABcy6c9iFzQVWGQyj0vh0s4MbYEiV0uK115ZSIkC7NBeGCHTJi0TMH9DiA1AkMfiOwWPT7sb4TJ1Y+uL7Box/y6pXexT6CXwzQOAzobWYC/Hao94AAblIOMoCUtsOyL3NToM+sAM4oKUjw5uow3QRmGI4/ksoDcOZL2VzL7SEjlvmUxL7Jb0BSNz1eoR+A+8dZK4Gxm7aMh0SltscZL5bZV/XBMD8BZNXj43IMUAaoCZgN3DFwaA4ZUR2C7ANOGgjK8+sgw3d2d4Lxdij9qSFOrm33Mdtlq6pBdgO3FSoe0OZFtZc0mEdCYz9ctOfZnwjL9a0ZOIkCdmRd8DGiPVvQ3KXGVOoekyZdP2X5ayz9onS+JjWREaFcocvl61dDglvxOa7IYX+hywkG9wab1eNqkhEXYj1svwttggIzxz0v8yFhmaQNbxVXa+9FBkPAq9s9BaxUNM6goX/lSgQ+M8J/BNgANp5FGWRvRVjAAAAAElFTkSuQmCC" class="titwe"/>   </a>   
			              	<a v-on:click="lampFn" id="btn-light" title="夜间模式" class="light" ><!--<i class="fa fa-lightbulb-o"></i>--><span class="light_img"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTU0NjVFODYwRUNDMTFFNzk0M0RGRTY4QTZBOUQ4QTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTU0NjVFODUwRUNDMTFFNzk0M0RGRTY4QTZBOUQ4QTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmbmdK8AAAJtSURBVHja7FnZbcJAEDWI/7gEdxB3gKnA5B8JpwLcAaSCOBVgJP5jKsBUgKkgUEGcCpxZaVYarRLsvXxIjDTCGNidt3O9MaOqqpwhy9gZuAwewER3gcViQd96oCHoHK898lkBmqMe+M39ft8tAGL4FjS48x0fNQa9gm5Ad30IoTXo1x/Gn1A/8PUmAE5Bz+BBT2fzkU4Vgs3ZqUeC0QlodsdTEXrhCe+VoDMIpaJVAILxP3idNfy5ix4IdUGMFY3fEOMvGD6ZxBIlJvqOAPqEdV3rADBm18LJF4pRGBEQHoafdQ9sBAMKzSIQkwRfyib1WPL0mYuXPGEhZjPdEgZrlAiCArLmAVpxEseQ4EFwL4Q2AdBanxtmBdybnkwYyQLgVeKCrjcphdAvrACYkjJoWq4C7Rg0G3VtAbi1ZHRhCwB387MFAL7Qqa0A4JXHhUrhGwYQkrKa2wKQqTacmgbpEw8crPUBZIsn0vZNeWGt2iBVqhDdYCtTMf45/QiZKacnuVUA2PYPJPHeNeyf4yEoh6VqH4hwDuDXZ5nuibJiMwB5/9raQIM0IiAgfASxalguj0IoMuPTLmZiFyvTlNye1RC9nHyfDUSxqvHaVIJ44k3h56yr+zrGm+RCKtT6KhC4TgF0Jg8AXcvEwprHIXogJz1BhZL0wgMBduWghh+xypOaeihgEkCJp5oMOYkZt6lq9FtmaG8bwLzh7Bv0tQq9NDzdtK8AMkfuMXvvQujcMAeCvgLwG+ZAb5P4xal/+LUzWWrHFnLgXoLyf3R6TeYS8uhFND42vZkNMsenNF+gFLmFvfRm4sc8YEB+BRgANCnHCgwwFz8AAAAASUVORK5CYII="/></span></a>
			            </div>
			            <div class="tool-bottom">
					      	<a v-if="previousContent" id="btn-prev-tool" title="上一章" class="prev js-link-state" :href="path.TemprootPath+'/readBook/'+previousContent.contentId + '@' + previousContent.bookId">
					      		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUU1OUE3MUIwRUNDMTFFN0E5RjZDQUQxODZBNkRGRkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUU1OUE3MUEwRUNDMTFFN0E5RjZDQUQxODZBNkRGRkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PguP8UsAAAD8SURBVHja7NlRCoMwEARQLT1moL1BvUnrCVrBe6YJWAjaL92Z7dAN+KGgzDOiu7HPOXfK49SJjwAEIAAB8B3noxdIKe099V62oWzTPM9XtRl4LuHruKg9QjV8e8dHJcA6fH18BhXAJvxq/6cBkPAsACw8AwANjwbAwyMBlPAoAC08AkANbw2gh7cEuIS3AriFPwwopbRreIsZ6KU7sqURmZpDtbZ/qbWUrgirt5AbwvI74IKw/hLTEYhaiIpAVaM0BLIfoCDQHRkcweiJoQjWqgQMwVwXgiDYK3MbRKloH0qAb4ibGuCDGJseYn89H/+JAxCAAATgrwFvAQYAqEVLXFFuz4gAAAAASUVORK5CYII=" class="titwe"/>
					      	</a>
					      	<a v-else id="btn-prev-tool" @click="setPreviousEnd" title="上一章" class="prev js-link-state" href="javascript:;">
					      		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUU1OUE3MUIwRUNDMTFFN0E5RjZDQUQxODZBNkRGRkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUU1OUE3MUEwRUNDMTFFN0E5RjZDQUQxODZBNkRGRkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PguP8UsAAAD8SURBVHja7NlRCoMwEARQLT1moL1BvUnrCVrBe6YJWAjaL92Z7dAN+KGgzDOiu7HPOXfK49SJjwAEIAAB8B3noxdIKe099V62oWzTPM9XtRl4LuHruKg9QjV8e8dHJcA6fH18BhXAJvxq/6cBkPAsACw8AwANjwbAwyMBlPAoAC08AkANbw2gh7cEuIS3AriFPwwopbRreIsZ6KU7sqURmZpDtbZ/qbWUrgirt5AbwvI74IKw/hLTEYhaiIpAVaM0BLIfoCDQHRkcweiJoQjWqgQMwVwXgiDYK3MbRKloH0qAb4ibGuCDGJseYn89H/+JAxCAAATgrwFvAQYAqEVLXFFuz4gAAAAASUVORK5CYII=" class="titwe"/>
					      	</a>
					      	<a v-if="nextContent" id="btn-next-tool" title="下一章" class="next js-link-state" :href="path.TemprootPath+'/readBook/'+nextContent.contentId+'@'+nextContent.bookId">
					      		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUMyM0Y5QkMwRUNDMTFFN0FFOUJDREEzRkRCMEJBNzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUMyM0Y5QkIwRUNDMTFFN0FFOUJDREEzRkRCMEJBNzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlWvo+8AAAEBSURBVHja7NlRCoMwEARQLT1mwNyg7U30BCrknulaLAj2q9mZZXEDwf60zGvUjNjXWjvP49Y5HwEIQAACYDvuLV9OKS1yGGSOMl///EYpxXQFhv34lDl7PIWmw+dsgWgCyPJv//xqidC4iLMlQusuZIbQvI2aILT3AToCsZFREaidmIZAVgkKAt2F4AhGmYMiWG0UhmDWaQiC/TxwQkglnz0Bfo3eE2A5PENsY5VGm70ATuH3U8rFNQAJzwLAwjMA0PBoADw8EkAJjwLQwiMA1PDaAHp4TYBJeC2AWfhmgDTJ0TK8xgo8LMNrAL7dfrII/+ni8Z44AAEIQAAuDXgLMABkl0tcCLqqqAAAAABJRU5ErkJggg==" class="titwe"/>
					      	</a>
					      	<a v-else id="btn-next-tool" @click="setNextEnd" title="下一章" class="next js-link-state" href="javascript:;">
					      		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUMyM0Y5QkMwRUNDMTFFN0FFOUJDREEzRkRCMEJBNzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUMyM0Y5QkIwRUNDMTFFN0FFOUJDREEzRkRCMEJBNzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEIyODg5NUM4MEVFNzExQTFCMUNGMkQwOEE0NUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlWvo+8AAAEBSURBVHja7NlRCoMwEARQLT1mwNyg7U30BCrknulaLAj2q9mZZXEDwf60zGvUjNjXWjvP49Y5HwEIQAACYDvuLV9OKS1yGGSOMl///EYpxXQFhv34lDl7PIWmw+dsgWgCyPJv//xqidC4iLMlQusuZIbQvI2aILT3AToCsZFREaidmIZAVgkKAt2F4AhGmYMiWG0UhmDWaQiC/TxwQkglnz0Bfo3eE2A5PENsY5VGm70ATuH3U8rFNQAJzwLAwjMA0PBoADw8EkAJjwLQwiMA1PDaAHp4TYBJeC2AWfhmgDTJ0TK8xgo8LMNrAL7dfrII/+ni8Z44AAEIQAAuDXgLMABkl0tcCLqqqAAAAABJRU5ErkJggg==" class="titwe"/>
					      		
					      	</a>
			            </div>
					</div>
					<div class="inner-reader nene" style="min-height:930px;">
					  	<div class="loading-read">
					  		<div class="bg"></div>
					  	</div>
					</div>
				</div>	
		    </div>
		</div>
		<div v-show="previousEnd" class="read_alert">
			<img :src="path.ImagePath + '/img/readImg_03.jpg'" />已经到最前一章
		</div>
		<div v-show="nextEnd" class="read_alert">
			<img style="vertical-align:middle;" :src="path.ImagePath + '/img/readImg_03.jpg'" />已经到最后一章
		</div>
		<div v-show="fixed" v-on:click="fixedFn" style="display:none;position:fixed;top:0px;bottom:0px;left:0px;right:0px;z-index:1050;" class="modal modal-setting fade in">
			<div class="modal-dialog">
				<div class="modal-content" v-on:click="settingFn">
				    <div class="modal-header">
						<button data-dismiss="modal" class="close" v-on:click="fixedFn"><i class="fa fa-close"></i></button>
						<h4 class="modal-title"><i class="fa fa-cog"></i>设置</h4>
				    </div>
				  	<div class="modal-body">
						<p id="theme-setting">
						    <label>阅读主题：</label>
						    <a v-on:click="bj_ColorFn('#FFFFFF')" data-index="0" title="白色" :class="bj_color=='#FFFFFF'?'btn-thm btn-thm-a active':'btn-thm btn-thm-a'"><i class="fa fa-check"></i></a>
						    <a v-on:click="bj_ColorFn('#F6F4EC')" data-index="1" title="黄色" :class="bj_color=='#F6F4EC'?'btn-thm btn-thm-b active':'btn-thm btn-thm-b'"><i class="fa fa-check"></i></a>
						    <a v-on:click="bj_ColorFn('#E6F0E6')" data-index="2" title="绿色" :class="bj_color=='#E6F0E6'?'btn-thm btn-thm-c active':'btn-thm btn-thm-c'"><i class="fa fa-check"></i></a>
						    <a v-on:click="bj_ColorFn('#E3F5FA')" data-index="3" title="蓝色" :class="bj_color=='#E3F5FA'?'btn-thm btn-thm-d active':'btn-thm btn-thm-d'"><i class="fa fa-check"></i></a>
						    <a v-on:click="bj_ColorFn('#F5F5F5')" data-index="4" title="灰色" :class="bj_color=='#F5F5F5'?'btn-thm btn-thm-e active':'btn-thm btn-thm-e'"><i class="fa fa-check"></i></a>
						    <a v-on:click="bj_ColorFn('#F5E9EF')" data-index="5" title="粉色" :class="bj_color=='#F5E9EF'?'btn-thm btn-thm-f active':'btn-thm btn-thm-f'"><i class="fa fa-check"></i></a>
						    <a v-on:click="bj_ColorFn('#323536')" data-index="6" title="夜间" :class="bj_color=='#323536'?'btn-thm btn-thm-g active':'btn-thm btn-thm-g'"><i class="fa fa-check"></i></a>
						</p>
						<p id="font-setting">
						    <label>正文字体：</label>
						    <a v-on:click="font_FamilyFn('Arial,Microsoft YaHei,sans-serif')" data-index="0" :class="font_family==='Arial,Microsoft YaHei,sans-serif'?'btn-font active':'btn-font'">雅黑</a>
						    <a v-on:click="font_FamilyFn('NSimSun,STSong,SimSun,serif')" data-index="1" :class="font_family==='NSimSun,STSong,SimSun,serif'?'btn-font active':'btn-font'">宋体</a>
						    <a v-on:click="font_FamilyFn('STKaiti,KaiTi,KaiTi_GB2312,sans-serif')" data-index="2" :class="font_family==='STKaiti,KaiTi,KaiTi_GB2312,sans-serif'?'btn-font active':'btn-font'">楷书</a>
						</p>
						<p id="fsize-setting">
						    <label>字体大小：</label>
							<a v-on:click="smallFn" data-action="minus" class="btn-fsize btn-fsize-a"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAzklEQVRoQ+2UwQ2DMBAElw7SSZLOrgNIB9cZpJOUgPwgElF4jZBttP6iXXwzJw/q/Ayd318eoLZBG7ABSMArBAHiuA1ghLDABiBAHLcBjBAW2AAEiOM2gBHCAhuAAHH8WgYi4iFplHTDaM4p+Eh6Zeay1e8MRMQsqQzR8lky83k0QJns3vLtJb0z8wv510D5MDW+QtPhCjVO/u/1rvUK2UAFAl6hCtB3v7QBG4AEvEIQII7bAEYIC2wAAsRxG8AIYYENQIA4bgMYISzo3sAKJFAWMS8ZPa4AAAAASUVORK5CYII="/></a>
							<span class="num-fsize">{{ font_size }}</span>
							<a v-on:click="largeFn" data-action="plus" class="btn-fsize btn-fsize-b"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABJElEQVRoQ+2Z0Q3CMAxErxPAJsAEsAGMABt4A8oG3gBGgA1gAsomsAEKpBIUWllqLBF0/W3rxHcvcawUyPwpMp8/mECbgyIyBrCN71eqWnm47eaAiOwBzOOkD6q6yC2BI4BpnPRJVWdM4IsCngjRAQtydKBjGyVCRMiiABHqoxLgd5gTES5iizmsA1zEFk46viFCP4VQbAPXAIY9nQ2/h5ayjnMFkKKlDHE2r+3pG0Iico4DJ5i/W4hKVSd19GYCQaWR29BpAl9UNbj7eJoJhBdlQoQGcZxbQoTKVoTSCPSMwqOEUU3WgZ+qA0bXTJ9xDZhkYkPTLhMRIkJGBbiN9hSKlZgIEaGeCvwzQtlfs4b2dBcdWmZ30e1E5kdYtzrABIwK3AEZu9gxwC6iqwAAAABJRU5ErkJggg=="/></a>
						</p>
					</div>
					<div class="modal-footer">
						<a @click="saveFixedFn" id="btn-save-setting" class="btn btn-primary">保存</a>
						<a @click="fixedFn" id="btn-cancel-setting" data-dismiss="modal" class="btn btn-default">取消</a>
					</div>
				</div>
			</div>
		</div>
		<div class="fa-expand"></div>
    </div>
</template>
<script>
import header from '~/components/Header'
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
		'myheader':header,
		'myfooter':Footer
	},
	
	data : function() {
		return {
		  rightSize: '450px',
		  szxj: SZXJ,
		  path: PathList,
		  fixed:false,
		  font_size: 16,
		  font_family: 'Arial,Microsoft YaHei,sans-serif',
		  bj_color: '#F6F4EC',
		  font_color: '#333',
		  temp_format:[16,'Arial,Microsoft YaHei,sans-serif','#F6F4EC','#333'], // 上一次的状态
		  temp_format_two:['#F6F4EC','#333'], // 记录开关灯的上一次的状态
		  lamp: true,
		  screenV: true,
		  bookName:'44',
		  bookcontent: [],
		  update:'455',
		  name:'565',
		  bookTitle:'',
		  works:'',
		  bookId:1,
		  nextContent: '',
		  previousContent: '',
		  previousEnd: false,
		  nextEnd: false,
		  fontNumber:1,
		  loading: '',
		  bodyFlag: false,
		}
	},
	asyncData:function(context){
	  	var arg = context.params.contentId.split("@");
		var data1 = {};
		var obj = {};
		obj.temp_format_two=['#F6F4EC','#333'];
		obj.lamp=true;
		obj.temp_format=[16,'Arial,Microsoft YaHei,sans-serif','#F6F4EC','#333'];
		obj.bj_color = '#F6F4EC';
		obj.font_color = '#333';
		if(context.req.headers.cookie){
			var temp_format;
			if (SZXJ.getCookie(context.req.headers,'tempFormat')) {
				temp_format = JSON.parse(SZXJ.getCookie(context.req.headers,'tempFormat'));
			}
			
			var lamp = SZXJ.getCookie(context.req.headers,'lamp');
		    if(lamp !='') {
	    		lamp = eval(lamp);
	  		}
	        if(temp_format){
		        obj.temp_format = temp_format;
		        obj.font_size = obj.temp_format[0];
		        obj.font_family = obj.temp_format[1];
		        obj.temp_format_two[0] = obj.temp_format[2];
		        obj.temp_format_two[1] = obj.temp_format[3];
	        }
	        if(lamp ===false){
	        	obj.lamp = lamp;
	        }
		}
	    if(obj.lamp===false){
	        if(obj.temp_format1){
	          obj.bj_color = '#323536';
	          obj.font_color = '#777';
	        }else{
	          obj.bj_color = '#323536';
	          obj.font_color = '#777';
	        }
	    }else if(obj.lamp===true){
	        if(obj.temp_format!=[16,'Arial,Microsoft YaHei,sans-serif','#F6F4EC','#333']){
	          obj.bj_color = obj.temp_format[2];
	          obj.font_color = obj.temp_format[3];
	        }
	    }
		data1.contentId= arg[0];
		data1.bookId = arg[1];
		return axios.get(PathList.findContent+"?bookId="+arg[1]+"&contentId="+arg[0]).then(function(res2){
  			obj.nextContent= res2.data.nextContent;
  			obj.previousContent= res2.data.nextContent;
  			if(res2.data.nextContent){
          		obj.nextContent = res2.data.nextContent;
        	}
	        if(res2.data.previousContent){
	          obj.previousContent = res2.data.previousContent;
	        }
			obj.bookcontent= res2.data.content;
			obj.bookName= res2.data.content.bookName;
			obj.bodyFlag = true;
			obj.contentId = arg[0],
		  	obj.bookId = arg[1];
			return obj;
  		}).catch(function (error) {
  			console.log(error)
		});
	},
  mounted: function () { // ready -->
    this.$nextTick(function () {
      var This = this;
      this.resizeFn();
      this.flagFn(1);
      window.onresize = function() {
          This.resizeFn();
      }
    })
	},
	methods: {
		flagFn: function(a) {          
            if (this.bodyFlag){     
                this.loading = '';
            }else {
                var This = this;
	            if ( a == 1 ){
	                This.loading = ".";
	                setTimeout(function(){
	                    This.flagFn(2);
	                },100)
	            }else if (a == 2){
	                This.loading = "..";
	                setTimeout(function(){
	                    This.flagFn(3);
	                },100)
	            }else if (a == 3){   
	                This.loading = "...";  
	                setTimeout(function(){
	                    This.flagFn(1);
	                },100)  
	            }          
            }
        },
        bodyFalgFn:function (){
        },
        resizeFn: function() {
            var width = document.body.clientWidth;
            	this.rightSize=((width - 900) / 2 - 65) + 'px';
            if  (width < 1040) {
             	this.rightSize=((width - 900) / 2 + 15) + 'px';
            }
            if (width < 900) {
                this.rightSize=25 + 'px';
            }
        },
      	setNextEnd: function() {
            this.nextEnd = true;
            var This = this;
            setTimeout(function(){
                This.nextEnd = false;
            }, 2000)
        },
        setPreviousEnd: function() {
            this.previousEnd = true;
            var This = this;
            setTimeout(function(){
                This.previousEnd = false;
            }, 2000)
        },
        keyDownFn: function(e) {
            if(e.keyCode == 37) {
	            if (this.previousContent && this.previousContent.contentId) {
	                location.href = this.path.TemprootPath + '/readBook/' + this.previousContent.contentId + '@'+ this.previousContent.bookId;
	            } else {
	                this.previousEnd = true;
	                var This = this;
	                setTimeout(function(){
	                    This.previousEnd = false;
	                }, 2000)
	            }
            }
            if(e.keyCode == 39) {
	            if (this.nextContent && this.nextContent.contentId) {
	                location.href = this.path.TemprootPath + '/readBook/' + this.nextContent.contentId + '@'+ this.nextContent.bookId;
	            } else {
	                this.nextEnd = true;
	                var This = this;
	                setTimeout(function(){
	                    This.nextEnd = false;
	                }, 2000)
	            }
            }
        },
        getValueFn: function() {
	        var _data = {};
	        _data.rankList = 0;
	        _data.contentId = this.contentId;
	        _data.bookId = this.bookId;
	        SZXJ.http(this,'get', PathList.findContent, _data, (response) => {     //章节详情接口
	            if(response.data.nextContent){
	            	this.nextContent = response.data.nextContent;
	            }
	            if(response.data.previousContent){
	            	this.previousContent = response.data.previousContent;
	            }
	            this.bookcontent = response.data.content;
	            this.bookName = response.data.content.bookName;
	            this.$refs.bookcontent.innerHTML = this.bookcontent.content;
	            this.bodyFlag = true;
	        });
        },
        settingShow: function() {
            this.fixed = true;
        },
        fixedFn: function() {
            this.fixed = false;
            this.font_size = this.temp_format[0];
            this.font_family = this.temp_format[1];
            this.bj_color = this.temp_format[2];
            this.font_color = this.temp_format[3];
        },
        saveFixedFn : function() {
            this.fixed = false;
            this.temp_format[0] = this.font_size;
            this.temp_format[1] = this.font_family;
            this.temp_format[2] = this.bj_color;
            this.temp_format[3] = this.font_color;
//          localStorage.setItem("tempFormat",JSON.stringify(this.temp_format));
//          document.cookie="tempFormat="+JSON.stringify(this.temp_format);
            SZXJ.setCookie("tempFormat",JSON.stringify(this.temp_format),1);
            this.lamp = true;
        },
        settingFn: function(e) {
            e.stopPropagation();
        },
        gotoCatalogFn : function(){
//          window.location.href = '../catalog.html';
        },
        bj_ColorFn: function(color) {
            this.bj_color = color;
            if (color === '#323536') {
                this.font_color = '#777';
            }
        },
        font_FamilyFn: function(family,a) {
            this.font_family = family;
        },
        lampFn: function(bj_color){
            if (this.lamp){
                this.temp_format_two[0] = this.temp_format[2];
                this.temp_format_two[1] = this.temp_format[3];
                this.bj_color = '#323536';
                this.font_color = '#777';
                this.temp_format[2] = this.bj_color;
                this.temp_format[3] = this.font_color;
                this.lamp = false;
            } else {
                this.temp_format[2] = this.temp_format_two[0];
                this.temp_format[3] = this.temp_format_two[1];
                this.bj_color = this.temp_format[2];
                this.font_color = this.temp_format[3];
                this.lamp = true;
            }
//          localStorage.setItem('lamp', this.lamp.toString());
//          if(this.lamp===false){
//            document.cookie="lamp="+this.lamp.toString();
              SZXJ.setCookie("lamp",this.lamp.toString(),1)
//          }
            
        },
        smallFn :function(){
            this.font_size = this.font_size - 2;
            if (this.font_size < 12) {
                this.font_size = 12;
            }
        },
        largeFn: function() {
            this.font_size = this.font_size + 2;
            if (this.font_size > 48) {
                this.font_size = 48;
            }
        },
        screenFn: function() {
            if(this.screenV) {
                this.screenV = false;
                var el = document.documentElement,
                rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
                wscript;
                if(typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                    return;
                }
                if(typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if(wscript) {
                        wscript.SendKeys("{F11}");
                    }
                }
            } else {
                this.screenV = true;
                var el = document,
                cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
                wscript;
                if (typeof cfs != "undefined" && cfs) {
                    cfs.call(el);
                    return;
                }
                if (typeof window.ActiveXObject != "undefined") {
                    wscript = new ActiveXObject("WScript.Shell");
                    if (wscript != null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            }
        }         
	},
  	head: function(){
		return {
			title: '阅读页-QC轻小说',
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
		    	{ rel: 'stylesheet', href: '/css/jquery-ui.min.css' },
		    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
		    	{ rel: 'stylesheet', href: '/css/read_book.css' }
	  		],
	  		script:[
		  	    {src:"/lib/browserRedirect.js"}
		  	]
	  	}
  	}
}
</script>
<style scoped>

</style>
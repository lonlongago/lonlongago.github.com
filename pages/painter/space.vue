<template>
	<div style="background-color: #F1F1F1">
		<alert ref="alert"></alert>
		<script src="/lib/jquery.min.js" ></script>
		<myheader></myheader>
		<div id="space_Index">
			<div class="space_head">
				<div class="space_bg">
					<div class="space_info">
						<a class="space_menu_anthor" href="#">{{UserInfo.userName}}</a>
						<a class="space_menu_atten" @click="attentionFn(0)" v-if=" whole.alreadyGuanZhuData == null || whole.alreadyGuanZhuData.attentionNum ==  0 ">关注</a>
						<a class="space_menu_atten" @click="attentionFn(1)" v-else style="background-color: #D8D8D8;color:#5F5F5F;">已关注</a>
						<div @click="draftFn(1)" class="space_menu_draft" v-if=" isSolicitContributions == 1 " >
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NUY2RDMwRjVFRERFNjExOTNEMEUwRkEwMjRFNTFDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NEZGQkEzMTgwQjQxMUU3QTNBMkVGMDExRDI2Q0E4RSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NEZGQkEzMDgwQjQxMUU3QTNBMkVGMDExRDI2Q0E4RSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdCNTlCNkZGMzg3RkU3MTFCQzY5RDAzNjUxRUI1RERBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1RjZEMzBGNUVEREU2MTE5M0QwRTBGQTAyNEU1MUM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gNwT5AAAAo1JREFUeNpiPB7X3KnNK+HDzMjI+ff//+8MZAKgfg6g/h+3vr7eyfg7b8HH/wz//7AyMgsC5RgZKAB//v/7CDSAiYmJgZGVkYGR8cqn5/Pe//52lhzDPv7+cfH655cLGMCuYmRm+v3/7ycWRiZBVR5R31PvHm258+X1KlIMfPD13YZzHx5vUeIW9gKaww807wsTUByEGdiZWMScxdTyD76+e3jPyxstxBi4/9Xt9oOvb++3EVbKBumHCjMyISsC2iSQqGDed/XDiycL7p8owhVx//7//73i0dnyyx+ePoqVN+tmZWIWQJZn/JE77xXQFlF0jWqb610kOPjZtjpkTeBl5VCDiX/58/Ou1/6puc9/fPx127dxD7q+n//+vGZi+I/pklufXq399/cfo4uEhrTh1rbsx1/fgzU/+/7xkP6WlowQWUNlkPz1jy9WYmgGmseCLvb259fz7rsnztjklJWgKygd7SWlPcd2R09nha7bls4ru66utEsNMxNRSA2Q1d9lv7On+6RXpaIYB68Zive/58x9zcHMKgJ2+t8/b1TX1UStcUwPNRNRTIUpuvnx5QbXXf3TdrsVZqnziwfAxK9/fL7OfdfEGTeDmhdxMrNKgMR+/P39BmToK6ChoqAMUHduY5azpKaOg6R6HroPfv/7+x4YIYLo4pffP125/cmVI8U6rt3MjEwcQENfM/7MnfeOjYlF8ODzm9OBwfEPaGA2qYn/8rsnqz78+v7eVkI1HWQ5E9B23jc/vlzgZmHnIcdAENAVkgmT4OSTff/z61UmYBnC+Clr1gOgs1m5WNikGCgEwLz/9dffPx9ZDjy7sc5OUt3346/vd/7+//eHXAPBeZ6RkfnCm0d7AQIMAKveHehwPbwGAAAAAElFTkSuQmCC" alt=""/>
							<span >约稿</span>
						</div>
						<div @click="draftFn()" class="space_menu_draft_copy" v-else >
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPCAYAAAALWoRrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NUY2RDMwRjVFRERFNjExOTNEMEUwRkEwMjRFNTFDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0MjFCM0FBNDg5NkUxMUU3QjVFOTgxNzBCOTAzQTYzQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MjFCM0FBMzg5NkUxMUU3QjVFOTgxNzBCOTAzQTYzQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdCNTlCNkZGMzg3RkU3MTFCQzY5RDAzNjUxRUI1RERBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1RjZEMzBGNUVEREU2MTE5M0QwRTBGQTAyNEU1MUM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/Q1ZXgAAAnBJREFUeNpizMvN7RQUEvJhZGTk/P///3cGMgFQPwdQ/4+PHz7sZBERFc0Aiv1hYmISBMkxUAD+/fv3UVhEJIUJaAMryLB3797N+/nz51lyDPv169fFD+/fL4BymZmApn8CuZKfn9/31cuXW4DOX0WKgZ8/fdrw+tWrLbx8fF5Ac/iB5n1hAoozgY1nZhaTlpHJf/r06eHHjx61EGPg0ydP2oHq90tKSWWD9MOClwlZEdAmAU0trb63b98+uX71ahGuiAOK/75182b5mzdvHqlraHSD9KGYgyUWWQ0MDWecOnni0ppVq4KB4XULWf737993geL+x44eOatvYDAdqJ4N3QwmbC55//792n9//zHKyslJL124KPvz5897QOJfvnw5tHjBggwVVVVlkPy7t29XYtPPgi7w/fv382tXrpoREByUAExu0YqKinNWLF3WaWZhtuX0yVNXffz8wiQkJVNVVFR2rVy+rDsqNk6Ri4vLDMWlwPCBp82/f/++WTR/frm3v18YyECQmLiEREpwWGj2iWPHrwWFhmaDDASJA2PbLTAkNBPo8po/f/68QApvRsaGhoZXLCwsoqAMcOTQoSw5eXkdIM7DSNh//75nYmYWRBd//fr1yvt37x4xNTfvBuUqoAWvQYkfHASPHj2aDTRMH5uBYC9hMRAEREVFwxWVlGyByWshNKJZgGqZeb9/+3aBlZWVB2hgNjk5SlRMLIyLm1v2x48fV4HJi5MFmGSesrCyiklKSsZSku+FhIS8gLnpK9D771gePniwDuhCX2C+v/P/378/4MBGTrewCEBjo8sD/c0M9Drzyxcv9gIEGAC2VwxuKqeRqwAAAABJRU5ErkJggg==" alt="" />
							<span>约稿</span>
						</div>
					</div>
				</div>
				<div class="space_menu">
					<div class="space_menu_nav">
						<img class="space_menu_pic" v-bind:src="path.ImagePath + 'Controller' + UserInfo.userHead" alt="" onerror="javascript:this.src='data:image/jpeg;base64,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';"  />
						<ul class="space_menu_lists">
							<li class="active">
								<a :href=" '/painter/space/' + this.id">全部</a>
							</li>
							<li>
								<a :href=" '/painter/books/' + this.id ">书籍</a>
							</li>
							<li>
								<a :href=" '/painter/details/' + this.id ">画稿</a>
							</li>
							<li>
								<a :href=" '/painter/spacefileshows/' + this.id ">档案</a>
							</li>
							<li>
								<a :href=" '/painter/commentshows/' + this.id ">留言</a>
								<div class="com_wrap">
									<span class="space_menu_num">{{commentN.commentNum}}</span>
								</div>
								<img class="space_menu_news" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAARCAYAAAD+H91rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NUY2RDMwRjVFRERFNjExOTNEMEUwRkEwMjRFNTFDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMzQ3QTdGMThENTUxMUU3QjYzQjlBQjU2MTA0NTgzNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMzQ3QTdGMDhENTUxMUU3QjYzQjlBQjU2MTA0NTgzNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdCNTlCNkZGMzg3RkU3MTFCQzY5RDAzNjUxRUI1RERBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1RjZEMzBGNUVEREU2MTE5M0QwRTBGQTAyNEU1MUM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+oiMyrAAAALpJREFUeNpi/P//PwMyOHToEB+QimBiwAT6QNyETUIICMSxSfwBGY9Ngp+ZmZmBBclSOSBlAsQhwsLCDIwHDx5kBXI0gDgPaHaKqKgoyBKwDiMgnqWkpKQnLi4ONw9kRwYQy4uIiKBYBJL4DqUxJPqBeO+TJ08Yvn//DpdgBLkZ6CItINsbiBNVVFQ0QQ5ghIUVUJINSNkDcTRQMp4RSyA68PHx7cfqcxYWFqxB8g4IXmKTuAjE9QABBgCzRjZPv2k1zgAAAABJRU5ErkJggg==" alt=""/>
							</li>
						</ul>
						<ul class="space_menu_fans">
							<li>
								<a class="num" href="#">{{info.attentionNum}}</a>
								<a class="news" href="#">关注</a>
							</li>
							<li>
								<a class="num" href="#">{{info.bookNum}}</a>
								<a class="news" href="#">作品</a>
							</li>
							<li>
							<a class="num" href="#">{{info.fansNum}}</a>
								<a class="news" href="#">粉丝</a>
							</li>
						</ul>
					</div>
				</div>
			
			</div>	
			<!--全部-->
			<div class="space_shows">
				<div class="space_shows_lt">
					<div class="space_lt_con">
						<div class="space_shows_title">
							<a class="books" href="#">书籍</a>
							<div class="hr"></div>
							<div class="books_count">
								<p>共<span class="books_num">{{bookNumData.bookNum}}</span>篇作品</p>
							</div>
						</div>
						<ul class="space_listbooks">
							<li v-for="book in bookData">
								<div class="space_books_pic">
									<a style="display: block;width: 100%;height: 100%;" :href="'/catalog/' + book.bookId">
										<img :src="path.ImageBookPath + book.bookCoverImage" onerror="javascript:this.src='/img/z-imgBj.jpg';" />
									</a>
								</div>
								<div class="space_books_con">
									<p class="title">{{book.bookName}}</p>
									<div class="content">{{book.bookIntroduction}}</div>
								</div>
							</li>
						</ul>
						<div class="space_draft_title">
							<a class="books" href="#">画稿</a>
							<div class="hr"></div>
							<div class="books_count">
							<p>共<span class="books_num">{{paintNumData.paintNum}}</span>篇作品</p>
							</div>
						</div>
						<ul class="space_listdraft">
							<li v-for="draft in paintData">
			              	<div class="ImgNumber"> 
			              		<span>{{draft.pictureAmount}}p</span>
			              	</div>
			              	<div class="titleName">
			              		<span>{{draft.albumName}}</span>
			              	</div>
			              	<div class="titleInfo">
			              		<img class="imgHead" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NUY2RDMwRjVFRERFNjExOTNEMEUwRkEwMjRFNTFDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQkMzRDJBODdDMjkxMUU3OUYzRkM3MEYzMUIzRUY2QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQkMzRDJBNzdDMjkxMUU3OUYzRkM3MEYzMUIzRUY2QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVDNjgwMTg5OTA2QkU3MTE5MUNDQ0EwMkNEMzJBREVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1RjZEMzBGNUVEREU2MTE5M0QwRTBGQTAyNEU1MUM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PtxSGAAAANpJREFUeNpiPHv2rAcDA0MOEEsD8R8g/s+AGzACMQsQPwXiSSDGdgbSgQEQezMxUAAGh+a/QFwExBFQ9mEgDgbiM0D8C4hDgLgMOUCRNf82MjLqB+KVQPYPIN4CZK8D0ruA+AuQvRaIu6ExAgl6YFQhR80GIH4FxGlA/BiIQQbFALEEEE8HYikg9seleYiENiiF2UNDWQgaqqAAUQFiZSR1B0ABCrWMDYjfAHEv4///mF4+d+5cAZDqB+J/QBwIDOVNuGzGBmSg8WkB1HiaVD+D4tYGn0YQAAgwAFHsOtaWKOebAAAAAElFTkSuQmCC" alt=""/>
			              		<span class="read_num">({{draft.commentNum}})</span>
			              		<span class="good">
			              			<img v-if="draft.laudNum > 0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzJFMzYwOTM3NkM1MTFFN0JFRDhBRTc3Qjk2QUI5NEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzJFMzYwOTQ3NkM1MTFFN0JFRDhBRTc3Qjk2QUI5NEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MkUzNjA5MTc2QzUxMUU3QkVEOEFFNzdCOTZBQjk0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MkUzNjA5Mjc2QzUxMUU3QkVEOEFFNzdCOTZBQjk0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuuJUFkAAAIlSURBVHja7JrdbYMwEMeTqn0O3YBOUDJBGYFuEKS8l0yQbJDmPRJ0gmaDthvABmQD8twHeiddKoSwsbEdbImTLCcBfP/fGX9nXtf1zGW7mzluE8DYdj/kod/1OoBsAekCKVfU8F/Ww/EoXdZcpBGDYA+yN0gROWxbCekE6UMAyG+U5Xdcz69lAVCpDADit5AlkDzBoKDzDUE1DZ/fQ1pJBHgH6QAglTQARf2LEfE+qwgio+8Y7VQiCO0aeWXVRieAovimxZSniuVgQJ66aoLViD81iNchvPn6YUCXvd0oRB/f0dDCHjMgbb3jwNbibn/PBQDCkNG12WIeaIx4NRA5MPhyAQIHAHwewMIBgGcewKMDAB4PoHQAoOABVA4AVDyAbwcAch7AyQGAjAlAM77CYvHn9qKnayrxbjHATnQ6jW3hxcLo+6KL+p2F0U+EdyWAFGvgYJF4XB+fpLZV4IHEkgZ9ZkWfC0C2oq2TsQx9R7xFPReAuqwxp9hJ315R784ctYd4BPEx+M76bhLaWqSCbglxEBHPHAdYRovq1LB47HFWojdLbe7eoCakxEsDGIaQFj8IwBDEZoh46TZgqE3Eog1WWw1orAkl8coAjQXGUnLEvhB4pupc1xETjpahIMSF7s10ONZ5RnaFOAuIz3U51X3Ih8ICxiy2oGu5TocmTikrinLREo+/lbqdmTpmvULgod8PfTay5zSf/mowAUwAbtufAAMA3kG1v2dRABsAAAAASUVORK5CYII=" alt=""/>
				              		<img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTIyQUVCMDg4OTU0MTFFNzk5M0JFM0E1MDg3Q0IyRjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTIyQUVCMDk4OTU0MTFFNzk5M0JFM0E1MDg3Q0IyRjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MjA4OTVGRTg5NTQxMUU3OTkzQkUzQTUwODdDQjJGNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MjA4OTVGRjg5NTQxMUU3OTkzQkUzQTUwODdDQjJGNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PriUp6oAAAJASURBVHja1JntkYIwEIYl3n+9DrgKlNH/RwnYAVRwWIF2oFagVnB0oAXoqB1oB1AAeu96iaOIGj6EsDMMqMzm2c1mdxO10+lUq4Josi9uNps2jGpomhYYhrHNMmgaXdoTZc3j8fgDhRYUtmNe2ePyGGPzV4NBl0668Gjh0qO/Y4wtxhC69tKg6/V6gJuLqyljLQby6vV6PzoIN3aERzuBw4cAnkCX/xCUFIdhuHjgwVdCivudTmdGH1arFc3EVNbYqIdheO/acC0nyGtx+H2aUY8Pz34Jz36IbwH5mwNkHoBCzo7D3aAPjMekDUhTuZQExxHbBRQyUDiFjs7QiE0TK3OhcrLH4uoxQFoVKEwWTX1bdUrEqs6olFXAoy0G2s8KgDYZr9mqy46m3q8AqE9Tv6wA6BbllHmqU4JxxniHslOY80D9riihY4VBhzdtHoo/xeq3at5Ef6tfNyUUB0MFa7x74RMPiAPy6EQhyHm32/XuQEngZleRhXXAVsS9WfkxqcCGNUGJngzAYEU3d3eglApgTWmtHwqQG7f9ZnEv83h1SuB0xC5WCpTH66xg2MkjSKkjHb65mhawwu1URzpFwcpASoO+C1YW8mmMFhCzfVnIRB7N2bPOs4WTC2gOsIkhU4OS0GFsGIZLJOiGZDwGlMzTQGYCTQJLkKh2ZpaTapYFlJdbk5qId0Jm9uiVZ+lkmcpu626b+99gZN6Sa3nlmhhYgjSjXVDpoAIWMTs+nxXFtGqZQKvyPxOrVUT+BBgAPK4UZRd8KzwAAAAASUVORK5CYII=" />
				              		<i>({{ draft.laudAmount }})</i>
			              		</span>
			              	</div>
			              	<div class="wrap_pic">
			              		<a style="width: 100%;height: 100%;display: block;" :href=" '/painter/worksDetails/' + draft.albumId ">
			              			<img style="width: 100%;height: 100%;" :src="draft.coverPicturePath + '&imageView2/1/w/218/h/237/interlace/1/q/100|imageslim' " onerror="javascript:this.src='/img/z-imgBj.jpg';" />
			              		</a>
			              	</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="space_shows_rt">
					<div class="rt_top">
						<div class="rt_bind">
							<img class="sina" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzVGNkQzMEY1RURERTYxMTkzRDBFMEZBMDI0RTUxQzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEZFQzdGRDg3Q0NEMTFFN0I4NzI5MzlDNkY0QjkyRjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEZFQzdGRDc3Q0NEMTFFN0I4NzI5MzlDNkY0QjkyRjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQzY4MDE4OTkwNkJFNzExOTFDQ0NBMDJDRDMyQURFQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NUY2RDMwRjVFRERFNjExOTNEMEUwRkEwMjRFNTFDNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/AABEIABAAFQMBIgACEQEDEQH/xABfAAACAwEAAAAAAAAAAAAAAAAAAwEEBQYBAQAAAAAAAAAAAAAAAAAAAAAQAAIBBAEEAgMAAAAAAAAAAAECAwAREgQTITEUBUGBsTIVEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqva+5bWk8XTTm2j+wsWC/Q7mqrey8mGHS34GGzK4F3RljBvZSRkpPQ1MsL6onjkzjaWYyNPGcTLEQbIJCCFIbuDSQ00/rW0Fvt7Ej3Ui7LCtwbGRqB41tjF9TGThCLKNfJrZkODDyd8fmitLxJv5nh8p5uLDk697fiig//9k=" alt=""/>
							<span v-if="weiBoData.isSinaBinding != 0" class="bind" :title="weiBoData.sinaBlogName">{{weiBoData.sinaBlogName}}</span>
							<span v-else class="bind" :title="weiBoData.sinaBlogName">未绑定</span>
						</div>
						<div class="rt_brief">
							<img class="brief_pic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NUY2RDMwRjVFRERFNjExOTNEMEUwRkEwMjRFNTFDNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMjk1QkRFQTdDRDExMUU3QkVCQjg1ODNCMTkxRTg1RiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMjk1QkRFOTdDRDExMUU3QkVCQjg1ODNCMTkxRTg1RiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVDNjgwMTg5OTA2QkU3MTE5MUNDQ0EwMkNEMzJBREVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1RjZEMzBGNUVEREU2MTE5M0QwRTBGQTAyNEU1MUM0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zFHL6QAAAUxJREFUeNqU008oBFEcwPG3mlX+3exBIgdFuVBKW6SwDg6c7EE5UNqyBzm4DCkH5eTARYkcNi4rpZSDtLlvW1uUHFDi5Li2rV3j++qnpmnMPK8+zc7vt+/X7817L+I4jtLDtm1lMEZxigLSeP1N1Cnz0YAc8qjHCw7R9t9CWTxjGpOYRwJFrJoWGsEUIhiSWAZdOMOuaaErXEhXenm3GJDchH63DIocoAVJVHGCfdzgET0YDOuoDyn5HlWJ3WMMS4hL7iusUE62OuOTW8aDHAcVtLQttKLXJ7eIcXSEnaMYNvU5xacn14QjbOMtrFC/fJM9n9w1SthwB62Ajj5kgnssYFjvkndC0NLePbE1HGNHroky6agRT/K7G+doxwwu/SZY3Po5nlHUJFaT66DbL8tS7rCCyl9brDtaR7PrT99SQO9IJ2blEAaOHwEGAAjxRBXubz+XAAAAAElFTkSuQmCC" alt="" />
							<div v-if="UserInfo.information != ''" class="brief">{{UserInfo.information}}</div>
							<div v-else class="brief">这个作者好任性，并没有签名</div>
						</div>
					</div>
					<div class="rt_bottom">
						<div class="bottom_title">
							<p class="edit_title">公告</p>
							<p class="editcon" v-if="show == 1" @click="setEdit">确定</p>
							<p class="editcon" v-else>点击下方编辑</p>
						</div>
						<textarea  v-if="show == 1" class="edit" v-model="gongGaoData.notice"></textarea>
						<div  @dblclick="showEdit(1)" class="editNot" v-else>
							{{gongGaoData.notice}}
						</div>
					</div>
				</div>
			</div>
			<!--邀请函-->
		    <div v-if="mackFlag" class="Invitation">
		      <div class="background_black"></div>
		      <div class="Invitation_mack">
		        <div class="Invitation_block">
		          <img @click="mackFn" class="shut" src="/img/painter/shut.png" alt="" />
		          <ul class="Invitation_ul">
		            <li class="whatever">
		              <div class="title">企划方</div>
		              <div class="name">{{status.userName}}</div>
		            </li>
		            <li class="whatever" >
		              <div class="title">画师</div>
		              <div class="name">{{UserInfo.userName}}</div>
		            </li>
		            <li class="whatever">
		              <div class="title">标题</div>
		              <input class="caption" type="text" placeholder="请简单描述您的需求" v-model="objSec.requirePaint" />
		            </li>
		            <li class="whatever">
		              <div class="title top">需求补充</div>
		              <textarea class="demand" type="text" placeholder="补充您的需求" v-model="objSec.demand" ></textarea>
		            </li>
		            <li class="whatever">
		              <div class="title top margin">类型</div>
		              <ul class="choose">
		                <li v-if="className == '' " class="addLabel">添加标签</li>
		                <li v-else class="addLabel selected">{{className}}</li>
		                <li class="recommendedlabels"><span>——</span>&nbsp;&nbsp;<span>推荐标签</span>&nbsp;&nbsp;<span>——</span></li>
		                <li class="listLabel">
		                  <div v-for="obj in classTypeList" class="label" @click="setClassWorksFn(obj.typeName,obj.pId)" >{{obj.typeName}}</div>
		                </li>
		              </ul>
		            </li>
		            <li class="whatever">
		              <div class="title top margin">画风</div>
		              <ul class="choose">
		                <li v-if="styleName == '' " class="addLabel">添加标签</li>
		                <li v-else class="addLabel selected">{{styleName}}</li>
		                <li class="recommendedlabels"><span>——</span>&nbsp;&nbsp;<span>推荐标签</span>&nbsp;&nbsp;<span>——</span></li>
		                <li class="listLabel">
		                  <div v-for="obj in styleTypeList" class="label" @click="setStyleWorksFn(obj.typeName,obj.pId)" >{{obj.typeName}}</div>
		                </li>
		              </ul>
		            </li>
		            <li class="whatever">
						<div class="title">订单金额</div>
						<!--<input type='text' onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" />  只能输入数字-->  
						<input class="caption short" type="text" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-99999999-]+/,'');}).call(this)" onblur="this.v();" v-model="amountFir" />
						<div class="transition">~</div>
						<input class="caption short" type="text" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-99999999-]+/,'');}).call(this)" onblur="this.v();" v-model="amountSec" />
					</li>
					<li class="whatever">
						<div class="title">联系方式(QQ)</div>
						<input class="caption short" type="text" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-99999999-]+/,'');}).call(this)" onblur="this.v();" oninput="if(value.length&gt;11)value=value.slice(0,11)" min="111111" v-model="objSec.qq" maxlength="11"  />
					</li>
		            <li class="whatever">
		              <div class="title">交稿时间</div>
		              <input class="caption short" type="text" @click="showDate" index="0" readonly="readonly" v-model="objSec.deliveryTime" placeholder="例：2017-1-1"  /> 
		              <date1 :type="Datetype" :show="showA" :value="objSec.deliveryTime"
								        	@update:Datetype="val => Datetype = val"
								        	@update:show="val => showA = val"
								        	@update:value="val => objSec.deliveryTime = val"
								        	 :x="x" :y="y" :begin="begin" :end="end" :range="range"></date1> 
		              <!--<date-time :type.sync="Datetype" :show.sync="showA" :value.sync="objSec.deliveryTime" :x="x" :y="y" :begin="begin" :end="end" :range="range"></date-time>-->
		            </li>
		            <li class="whatever">
		              <div class="title top">案例</div>
		              <img class="exhibition" v-if="displayImg" :src=" displayImg " />
		              <div class="upload"  @click="clickFileActiveFn">点击上传</div>
		            </li>
		          </ul>
		          <div class="bottom" >
		            <div class="true" @click="submitMackFn">确认</div>
		            <div class="true cancel" @click="mackFn" >取消</div>
		          </div>
		        </div>
		      </div>
		    </div>
		    <input type="file" ref="file" style="display: none;" v-on:change="fileUpload" />
		</div>
		<div style="height: 100px;"></div>
		<myfooter></myfooter>	
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
import dateTime from '~/components/date'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
		'alert': Alert,
		'myheader':Header,
		'myfooter':Footer,
		'date1': dateTime
	},
	asyncData:function(context){
		var obj={};
		    obj.id = context.params.id;
			return obj;
	},
	data : function() {
		return {
			// 时间控件
		    showA: false,
		    showB: false,
		    Datetype: 'date', // date datetime datetime24
		    begin: '',
		    end: '',
		    x: 0,
		    y: 0,
		    range: false,
		    // 时间控件结束
		  	// 书籍分页 Start
		  		RequestObj: {
		    	  status: 0,
		    	  pageNum: 1,
		    	  pageSize: 10,
		    	},
		    	page: [],
		    	obj: {
		        p: 1, // 页码
		        n: 10,
		        pageCount: 0,
		      },
		  	// 书籍分页 END
		  	info:'',
		  	szxj:SZXJ,
		  	path:PathList,
		  	UserInfo:'',
		  	commentN:'',
		    bookData:[],
		    paintData:[],
		    weiBoData:'',
		    bookNumData:'',
		    paintNumData:'',
		    gongGaoData:'',
		    BookList:[],
		    bookNumData:'',
		    paintList:[],
		    paintNum:'',
		    id:'',
		    show:0,
		    canCompileData: '',
		    path:PathList,
		    commentListData:{},
		    spaceList:[],
		    all:[],
		    whole:[],
		    Commentcontent:'',
		    Replycontent:'',
		    replyFlag:false,
		    commentId:'',
		    isSolicitContributions:'',
		    mackFlag:false,   // 约稿函
		    loginFlag:false,
		    displayImg:'',
		    objSec:{
		      painterUserId:'',
		      requirePaint:'',
		      demand:'',
		      paintOrderStyleIds:'',
		      paintOrderTypeIds:'',
		      budgetMoneyExt:'',
		      qq:'',
		      deliveryTime:'',
		      imageCaseList:[],
		    },
		    className:'',
		    classType:'',
		    styleName:'',
		    styleType:'',
		    classTypeList:[],
		    styleTypeList:[],
		    status:[],
		    amountFir:'',
		    amountSec:'',
		}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
//		    var href = window.location.href;
//		  	this.id = SZXJ.getQueryString('id');
//		  	this.$set('total', SZXJ.getQueryString('page') ? SZXJ.getQueryString('page') : '1');  //此段报错
		    this.getValueFn();
//		    console.log(this.mackFlag);
	  })
	},
	methods: {
			showEdit:function(change){
				if (!this.canCompileData){
					return;
				}
				this.show=change;
			},
			setEdit:function(){
				// 调用编辑公告的AJAX
				SZXJ.http(this, 'get', PathList.saveNotice,{ notice: this.gongGaoData.notice }, (response) => {
					this.getValueFn();
				});
				this.show= 0;
			},
			addSpaceCommentFn:function(){
			  var data ={
			    userId:this.RequestObj.userId,
			    content : this.Commentcontent,
			  }
			  SZXJ.http(this, 'post', PathList.saveSpaceComment,data, (response) => {
		        this.getValueFn();
		        this.Commentcontent='';
		      });
			},
			addSpaceReplyFn:function(a){
		      var data ={
		        commentId : this.commentId,
		        content : this.Replycontent,
		      }
		      SZXJ.http(this, 'post', PathList.saveSpaceReply,data, (response) => {
			        this.getValueFn();
			        this.Replycontent='';
			        this.replyFlag = false;
			      });
		    },
			addReplyFn:function(a){
			   this.commentId = a;
			   if(this.replyFlag){
			     this.replyFlag = false;
			   }else{
			     this.replyFlag = true;
			   } 
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
		    fileUpload(e) {
		      var This = this;
		      var file = e.target.files[0];
		      var formData = new FormData();
		      formData.append("file", file);
		      $.ajax({
			          type: 'POST',
			          processData: false,  // 告诉jQuery不要去处理发送的数据
			          contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
			          url: PathList.caseFileUpload,
			          data: formData, 
			          beforeSend: function(request) {
			            request.setRequestHeader("JSESSIONID", localStorage.getItem('JSESSIONID'));
			          },
			          success: function(data){
			            This.imgUrl = data.data.filePath;
			            This.displayImg = PathList.ImagePath + This.imgUrl;
			            This.objSec.imageCaseList.push(This.imgUrl);
			          },
			          error: function(data) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
			          }
			      });
			    }, 
			draftFn:function(a){
			 if( this.loginFlag == false){
			 	this.$refs.alert.setMessage(true,"您还未登录",function(){
			 		location.href='/login';
			 	})
			 	return;
			 };
			  if( this.status.userId == this.id ){
			    if( a == 1 ){
				      SZXJ.http(this, 'get', PathList.updateCanContribution,{status:0}, (response) => {
				        this.isSolicitContributions = 0;
		          		});
		         	  SZXJ.http(this,'get', PathList.queryCanContribution, {userId:this.id}, (response) => {  
		         		 });
			    }else{
				      SZXJ.http(this, 'get', PathList.updateCanContribution,{status:1}, (response) => {
				        this.isSolicitContributions = 1;
				          });
			          SZXJ.http(this,'get', PathList.queryCanContribution, {userId:this.id}, (response) => { 
			          });
			    }
			  }else{
			    if( this.isSolicitContributions == 1 ){
			      this.mackFn();
			    }else{
			      return;
			    }
			  } 
			},
			mackFn:function(){
		      if( this.loginFlag && this.mackFlag ){
		        this.mackFlag = false;
		      }else if(this.loginFlag && !this.mackFlag && this.userId !== this.status.userId){
		        this.mackFlag = true;
		      } 
		    },
		    setClassWorksFn:function(a,b){
		      this.className = a;
		      this.classType = b;
		    },
		    setStyleWorksFn:function(a,b){
		      this.styleName = a;
		      this.styleType = b;
		    },
			submitMackFn: function() {
				this.mackFlag = false;
		        this.objSec.mtime = new Date();
		        this.objSec.myear=this.objSec.mtime.getFullYear();
		        this.objSec.mmon=this.objSec.mtime.getMonth()+1;
		        this.objSec.mdat=this.objSec.mtime.getDate();
		        this.objSec.year=this.objSec.deliveryTime.split("-")[0];
		        this.objSec.mon=this.objSec.deliveryTime.split("-")[1];
		        this.objSec.dat=this.objSec.deliveryTime.split("-")[2];
//		        console.log(this.objSec.year);
//		        console.log(this.objSec.myear);
//		        console.log(this.objSec.mmon);
//		        console.log(this.objSec.mdat);
////		        console.log(this.objSec.mtime.getFullYear());
////		        console.log(this.objSec.mtime.getMonth()+1);
////		        console.log(this.objSec.mtime.getDate());
//		        console.log(this.objSec.mon);
//		        console.log(this.objSec.dat);
//		        console.log(this.objSec.mtime);
				this.objSec.painterUserId = this.userId;
				this.objSec.paintOrderStyleIds = this.styleType;
				this.objSec.paintOrderTypeIds = this.classType;
				this.objSec.budgetMoneyExt = this.amountFir + '-' + this.amountSec;
				this.objSec.budgetMoneyAc=Number(this.amountFir);
				this.objSec.budgetMoneyEd=Number(this.amountSec);
				if(this.objSec.requirePaint == ''){
//					var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
					this.$refs.alert.setMessage(true,'亲，请输入标题',function(){});
//					Utils.setMessage(true, '请正确填写内容');
					return;
				}else if(this.objSec.demand == ''){
					this.$refs.alert.setMessage(true,'亲，请完善您的需求',function(){});
					return;
				}else if(this.objSec.paintOrderTypeIds == ''){
					this.$refs.alert.setMessage(true,'亲，请选择类型',function(){});
					return;
				}else if(this.objSec.paintOrderStyleIds == ''){
					this.$refs.alert.setMessage(true,'亲，请选择画风',function(){});
					return;
				}else if(this.objSec.budgetMoneyExt == '' || this.objSec.budgetMoneyAc == '' || this.objSec.budgetMoneyEd == '' || this.objSec.budgetMoneyAc <= 0 || this.objSec.budgetMoneyEd <= 0 || this.objSec.budgetMoneyEd <= this.objSec.budgetMoneyAc){
					this.$refs.alert.setMessage(true,'亲，订单金额输入有误哦',function(){});
					return;
				}else if(this.objSec.qq == ''|| this.objSec.qq<=0 || this.objSec.qq.length<6){
					this.$refs.alert.setMessage(true,'亲，QQ号输入有误',function(){});
					return;
				}else if(this.objSec.deliveryTime == ''){
					this.$refs.alert.setMessage(true,'亲，时间不能为空',function(){});
					return;
				}else if(this.objSec.year < this.objSec.myear){
					this.$refs.alert.setMessage(true,'亲，年份恒久远，何必强求',function(){});
					return;
				}else if(this.objSec.year == this.objSec.myear && this.objSec.mon < this.objSec.mmon){
					this.$refs.alert.setMessage(true,'亲，岁月如流水，时间不可倒流哦',function(){});
					return;
				}else if(this.objSec.year == this.objSec.myear && this.objSec.mon == this.objSec.mmon && this.objSec.dat < this.objSec.mdat){
					this.$refs.alert.setMessage(true,'亲，有多少日子能够重来～～',function(){});
					return;
				}else if(this.objSec.year == this.objSec.myear && this.objSec.mon == this.objSec.mmon && this.objSec.dat == this.objSec.mdat){
					this.$refs.alert.setMessage(true,'亲，为了给您展示更好的画作，请留给作家至少一天的时间去完成哟～～o～～',function(){});
					return;
				}else if(this.objSec.imageCaseList == ''){
					this.$refs.alert.setMessage(true,'亲，图片有误',function(){});
					return;
				}else {
					SZXJ.http(this, 'post', PathList.solicitContribution, this.objSec, (response) => {
//						var Utils = this.$refs.vueAlert ? this.$refs.vueAlert : this.$parent.$refs.vueAlert;
						this.$refs.alert.setMessage(false,'申请成功',function(){});
//						Utils.setMessage(false, '申请成功');
						return;
					},(err)=>{
						if(err) {
				      		this.$refs.alert.setMessage(true,'亲，输入有误，请仔细检查一遍',function(){});
				      		return;
				      	}
					});
				}
			},
		    attentionFn:function(a){
		      if(a == 0){
		        SZXJ.http(this,'post', PathList.saveOrCancelAttention, {receiveId:this.id}, (response) => {
		          this.whole.alreadyGuanZhuData.attentionNum = 1;
		        },(err)=>{
		        	this.$refs.alert.setMessage(true, err.body.msg,function(){
			      		location.href='/login';
			      	});
		        });
		      }else{
		        SZXJ.http(this,'post', PathList.saveOrCancelAttention, {receiveId:this.id}, (response) => {
		          this.whole.alreadyGuanZhuData.attentionNum = 0;
		        },(err)=>{
		        	this.$refs.alert.setMessage(true, err.body.msg,function(){
			      		
			      	});
		        });
		      }
		    },
		    showDate(e) {
					e.stopPropagation();
					const that = this;
					that.showA = false;
					that.showB = false;
					if(e.target.getAttribute('index') === '0') {
						that.showA = true;
					} else if(e.target.getAttribute('index') === '1') {
						that.showB = true;
					}
					that.x = e.target.offsetLeft;
					that.y = e.target.offsetTop + e.target.offsetHeight + 8;
					const bindHide = (_event) => {
						_event.stopPropagation();
						if(e.target.getAttribute('index') === '0') {
							that.showA = false;
						} else if(e.target.getAttribute('index') === '1') {
							that.showB = false;
						}
						document.removeEventListener('click', bindHide, false);
					};
					setTimeout(() => {
						document.addEventListener('click', bindHide, false);
					}, 500);
					return false;
				},
		    getValueFn:function(){
		      SZXJ.http(this,'get', PathList.typeList, { typeType: 1 }, (response) => {
		        this.classTypeList= response.data.data;
		      });
		      SZXJ.http(this,'get', PathList.typeList, { typeType: 2 }, (response) => { 
		        this.styleTypeList=response.data.data;
		      });
		      SZXJ.http(this,'get', PathList.getStatus, {}, (response) => {
		        this.status= response.data.status;
		        this.loginFlag = response.data.loginFlag;
		      });
		      SZXJ.http(this,'get', PathList.queryCanContribution, {userId:this.id}, (response) => {
		        this.isSolicitContributions = response.data.isSolicitContributions;
		      });
		      SZXJ.http(this,'get',PathList.queryPart,{userId:this.id }, (response) => {
		    			this.whole = response.data;
				      	this.info = response.data.guanZhuAndFenSiAndZuoPinShuData;
				      	this.UserInfo = response.data.simpleUserInfoData;
				      	this.commentN = response.data.commentNumData;
				        this.bookData = response.data.bookData;
				        this.paintData = response.data.paintData;
				        this.weiBoData = response.data.weiBoData;
				        this.bookNumData = response.data.bookNumData;
				        this.paintNumData = response.data.paintNumData;
				        this.gongGaoData = response.data.gongGaoData;
						this.userId = response.data.guanZhuAndFenSiAndZuoPinShuData.userId;
				        this.canCompileData = response.data.canCompileData.canCompile;
				    });
		    },
	},
  	head: function(){
		return {
			title: '个人空间首页-QC轻小说',
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
		    	{ rel: 'stylesheet', href: '/painter/css/main_space.css' },
		    	{ rel: 'stylesheet', href: '/css/headerOrFooter.css' },
		    	{ rel: 'stylesheet', href: '/css/Date.css' },
		    	{ rel: 'stylesheet', href: '/css/cropper.min.css' },
				{rel: 'stylesheet',href: '/css/font-awesome.min.css'}
	  		]
	  	}
  	}
}
</script>
<style scoped>
	input::-webkit-outer-spin-button,  
	input::-webkit-inner-spin-button{  
	    -webkit-appearance: none !important;  
	    margin: 0;  
	}  
</style>
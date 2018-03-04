//document.addEventListener('touchmove', function(e) { // 防止和点击冲突
//  e.preventDefault();
//}, false);
var flag = true;
var removeFlag = true;
var _start = 0,
    _end = 0,
    way = 'y';
var timeInterval;
//第一步：下拉过程 
function slideDownStep1(dist) { // dist 下滑的距离，用以拉长背景模拟拉伸效果 
	
	 
 		var lck = Math.abs( ( dist + 200 ) / 50 );
 		var pull = document.getElementById("pull");
		var el = document.getElementById("slideDown");
		var pullWord = document.getElementById("pullWord");
		if( Math.abs(dist) > 100 ){
			if(el){
				el.style.display = "block";
				el.style.height = lck + "rem";
				el.style.width = "100%";
			} else {
				el = document.createElement('div');
				el.id = "slideDown";
				el.style.backgroundColor= "#fafafa";
				el.innerHTML = '<div class="pulldown" style="text-align:center;position:absolute;width:100%;bottom:.30rem" ><div id="bollLeft" style="height:12px;width:12px;top:2px;display:inline-block;position:absolute;border-radius:10rem;background-color:#F4B8C2;left:30%;"></div><div id="bollRight" style="height:12px;width:12px;top:2px;display:inline-block;position:absolute;border-radius:10rem;background-color:#0E9AC8;right:70%;"></div><div id="pullWord" style="font-size:14px;color:#777;line-height:16px">下拉刷新</div>	</div>';
				//pull.appendChild(el); 
				document.body.insertBefore(el,document.body.childNodes[0]);
				el.style.height = lck + "rem";
				el.style.width = "100% ";
				el.style.position = "relative";
				el.style.display = "block";
				var bollLeft = document.getElementById("bollLeft");
				var bollRight = document.getElementById("bollRight");
				var bollLeftOffsetLeft = bollLeft.offsetLeft;
				var bollRightOffsetLeft = bollRight.offsetLeft;
				var flagNumber = bollLeftOffsetLeft - bollRightOffsetLeft;
				var flag = bollLeftOffsetLeft - bollRightOffsetLeft;
				var i = 0;
				timeInterval = setInterval(function(){
				  // 默认flag = 8
					if (flag > 0) {
				    i++;
				    bollLeft.style.left = (bollLeftOffsetLeft + i) + 'px';
				    bollRight.style.left = (bollRightOffsetLeft - i) + 'px';
				    flag--;
				  } else {
				    i--;
				    bollLeft.style.left = (bollLeftOffsetLeft + i) + 'px';
            bollRight.style.left = (bollRightOffsetLeft - i) + 'px';
            var num1 = flag + flagNumber;
            var num2 = - (flagNumber / 2);
            if (num1 <= num2) {
              flag = flagNumber;
              i = 0;
              bollLeft.style.backgroundColor = "#0E9AC8";
              bollRight.style.backgroundColor = "#F4B8C2";
            }
            flag--;
				  }
				},30);
			}
			if(lck < 1){
			  if(pullWord){
			    pullWord.innerHTML = "下拉刷新";
			  }
      }else{
        if(pullWord){
          pullWord.innerHTML = "松开刷新";
        }
      }
		};
  return el;
}
//第二步：下拉，然后松开， 
function slideDownStep2() {
       var el = document.getElementById("slideDown");
       Int = setInterval(function(){
       	  var ht = parseInt(el.style.height);
          var speed = ht / 100; 
          if( ht > 0.7 ){
          	el.style.height = ht - speed +"rem";
          }else{
          	clearInterval(Int);
          }
        },50);
    //刷新数据 
    //location.reload(); 
    
}
//第三步：刷新完成，回归之前状态 
function slideDownStep3() {
    flag = true;
}

//下滑刷新调用 
function touchStart(event) {
    //var touch = event.touches[0]; //这种获取也可以，但已不推荐使用 
    if(!flag) {
        return false;
    }
    var touch = event.targetTouches[0];
    if(way == "x") {
        _start = touch.pageX;
    } else {
        _start = touch.pageY;	
    }
}

function touchMove(event) {
    if(!flag) {
        return false;
    }
    var touch = event.targetTouches[0];
    // 不能向上滚超出-100的位置
    _end = (_start - touch.pageY) < -300 ? -300 : (_start - touch.pageY);
    // 下滑才执行操作
    if(_end < 0) { // 控制方向的，负数就是向上滚动的，正的就是向下滚动
      var srcollTop  = document.documentElement.scrollTop || document.body.scrollTop;   //滚动条的高度 
      var srcollH  = document.body.scrollHeight;
    	srcollTop = srcollTop + _end;
    	// console.log("↑"+srcollTop);
    	// console.log(srcollH);
    	window.scrollTo(0, srcollTop);
    	if (srcollTop < 0 && _end < -200 ) {
    		slideDownStep1(_end);
    		removeFlag = true;
    	}
    } 
    else{
      var srcollTop  = document.documentElement.scrollTop || document.body.scrollTop;   //滚动条的高度 
      var srcollH  = document.body.scrollHeight;
    	srcollTop = srcollTop + _end;
    	// console.log("↓"+srcollTop);
    	// console.log(srcollH);
    	window.scrollTo(0, srcollTop);
    }
    

}

function touchEnd(event) {
	  if(flag) {
        flag = false;
    } else {
        return false;
    }
    var srcollTop  = document.documentElement.scrollTop || document.body.scrollTop;   //滚动条的高度 
    var srcollH  = document.body.scrollHeight;
    if(_end > 0) {
        console.log("向下滑动");
        if (srcollTop > 10) {
          k_touchRemote();
        }
        slideDownStep3();
    } else if(_end == 0) {
      
    	slideDownStep3();
    	
    } else {
      
     
      srcollTop = srcollTop + _end;
      console.log("右滑或下滑" + _end);
        //刷新成功则 
        //模拟刷新成功进入第三步 
        if (srcollTop < 0 && _end < -250) {
          var pullWord = document.getElementById("pullWord");
          pullWord.innerHTML = "正在刷新";
          slideDownStep2();
        	setTimeout(function() {
        		 location.reload();
            }, 2000);
        } else {
//      	if (timeInterval) {
//      		clearInterval(timeInterval);
//      		timeInterval = null;
//      	}
          k_touchRemote();
        	if(slideDownStep1()){
        		var bbs = slideDownStep1();
        	  bbs.style.display = "none";
        		slideDownStep3();
        	} else {
        	  slideDownStep3();
        	}
        }
    }
}

//contentId表示对其进行事件绑定，way==>x表示水平方向的操作，y表示竖直方向的操作 
var elementId;
function k_touch(contentId) {
	elementId = contentId;
	_content = document.getElementById(contentId);
	_content.addEventListener("touchstart", touchStart);
	_content.addEventListener("touchmove", touchMove);
	_content.addEventListener("touchend", touchEnd);
	removeFlag = true;
}


function k_touchRemote() {
  _content = document.getElementById(elementId);
  if(removeFlag){
    _content.removeEventListener("touchstart", touchStart);
    _content.removeEventListener("touchmove", touchMove);
    _content.removeEventListener("touchend", touchEnd);
//  var srcollTop  = document.documentElement.scrollTop || document.body.scrollTop;   //滚动条的高度 
//  window.scrollTo(0, srcollTop);
    removeFlag = false;
  }
}

var first = null;
document.addEventListener('plusready', function(){
	var first = null;
	var id = document.body.id;
	plus.key.addEventListener('backbutton', function() {
      //首次按键，提示‘再按一次退出应用’ 
			if( id == "indexApp" ){
				if (!first) {
          first = new Date().getTime();
          prompt("再按一次退出应用");
          setTimeout(function() {
              first = null;
          }, 1000);
      } else {
          if (new Date().getTime() - first < 1000) {
              plus.runtime.quit();
              //plus.webview.currentWebview().close();
          }
      }
			}else{
				window.history.back();
			}
  }, false);
});

window.onscroll = function () {
	// alert(document.documentElement.scrollTop || document.body.scrollTop)
	var srcollTop  = document.documentElement.scrollTop || document.body.scrollTop;   //滚动条的高度 
	if (srcollTop < 30 && !removeFlag) {
		k_touch(elementId);
	}
}


// 提示弹窗
var popAppInt;  
function prompt(message){
    var mes = message;
    _content = document.getElementById(elementId);
    var popSet;
    if( document.getElementById("popApp") ){
      return;
    }else{
      var prompt = document.createElement('div');
      prompt.id = "prompt";
      prompt.style.width="100%";
      prompt.style.position="fixed";
      prompt.style.bottom="15%";
      prompt.style.minHeight = "0.5rem";
      prompt.style.textAlign="center";
      prompt.innerHTML = '<div id="popApp" style="max-width: 60%;padding: 1% 2%;background:rgba(0,0,0,0.4);color:white;font-size:0.32rem;text-align:center;opacity:0;border-radius:0.03rem;display:inline-block;marigin:0 auto;" ></div>';
      _content.appendChild(prompt);
      var popApp = document.getElementById("popApp");
      var opacity = parseInt(popApp.style.opacity);
      popApp.innerHTML= mes;
      popAppInt = setInterval(function(){
         opacity += 0.1;
         popApp.style.opacity = opacity;
       if( opacity > 1 ){
           clearInterval(popAppInt);
           popSet = setInterval(function(){
              opacity -= 0.06;
              popApp.style.opacity = opacity;   
              if( opacity < 0 ) {
                popApp.style.opacity = 0;
                _content.removeChild(prompt);
                clearInterval(popSet);
              }
            },100);
        } 
      },100);
    }
}


// 页面加载未完成
function dispalyFlagFn(){
  var loading = document.createElement('div');
  loading.id = "loading";
  loading.innerHTML = '<div style="position: fixed;width: 100%;height: 100%;z-index: 99999999;background-color:#fafafa;text-align: center;"><img style="margin-top:30%;width:3.5rem;" src="../img/app_index/loding.png"/><p style="font-size:14px;color:#777;">正在加载中...</p> </div>'
  document.body.insertBefore(loading,document.body.childNodes[0]);
}
dispalyFlagFn();

<template>
	<div id="page" class="page" >
	 	<ul>
	 		<li class="btn" @click="setPage((pageNum - 1) >= 1 ? (pageNum - 1) : 1)"><a>上一页</a></li>
	 		
	 		<li v-for="(objTemp,index) in page"
	 			@click="setPage(objTemp)"
	 			:class="objTemp == pageNum ? 'active':''" 
	 			v-if="((index + 1)<= 5 && pageNum< 3 || ((index + 1) > pageNum - 3 &&  index< pageNum)) || ( ((index + 1)<= pageNum + 2 &&　(index + 1) > pageNum) || (pageNum > pageCount - 3 && (index + 6) > pageCount) )">
	 			<a>{{ objTemp }}</a>
	 		</li>
	 		
	 		<li class="btn" @click="setPage((pageNum + 1) <= pageCount ? (pageNum + 1) : pageCount)"><a>下一页</a></li>
	 		
	 		<li class="goto">
	 			<input type="text" v-model="pageNumValue" style="text-align: center;"/>
	 			<span>{{ pageNum }}/{{ pageCount }}</span>
	 			<a class="btn" @click="setPage(pageNumValue)">转页</a>
	 		</li>
	 	</ul>
	</div>
</template>

<script>
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import axios from 'axios'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	components:{
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {
			pageNum: 1, // 当前页
			pageNumValue:'',
    	  	pageSize: 10, // 每页显示条数
    	  	pageCount: 1, // 总页数
	    	page: [], // 循环页码数
	    	fn: 0,
	    }
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  		this.setPageCount();
	  		this.setPage();
	  })
	},
	methods: {
		setPageCount: function(v) { // 计算总页数与显示页码数
	        this.pageCount =  v;
	        this.page = [];
	        for (var i = 0; i < this.pageCount; i++) {
	            this.page.push(i+1);
	        } 
	    },
		setPage: function(v) {
	        if (!v || v > this.pageCount || v <= 0 || v.toString().search(/[^0-9]/g) !== -1 ) {
	            return;
	        }
	       	this.pageNum = parseInt(v, 10);
	        if (this.fn && typeof this.fn == 'function') {
	        	this.fn();
	        }
       	},
		setFn: function(fn) {
			this.fn = fn;
		},
	}
}
</script>

<style scoped="scoped">
	
*{margin:0;padding:0;list-style:none;outline: none;color:#000;text-decoration:none;box-sizing: border-box;font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;}
a:visited{color:#000}
input {-webkit-user-select:text!important}
i{font-style: normal;}
.none {display: none;}
.showB {display: block;}
.showL {display: inline-block;}
.pl{float: left;}
.pr{float: right;}
.btn{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}
.btn:hover{outline:0;cursor:pointer}
.btn:focus{outline:0;cursor:pointer}
.btn:active{-webkit-box-shadow:inset 0 0 5px rgba(0,0,0,.7);box-shadow:inset 0 0 5px rgba(0,0,0,.7)}
.relative {position: relative;}
.clear:after{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}

.page {
  margin-top: 30px;
  min-height: 1px;
  margin-bottom: 30px;
}
.page *{
	box-sizing: border-box;
	line-height: 1;
	font-size: 14px;
}
.page ul {
  margin: 0 auto;
  width: 540px;
  height: 26px;
}

.page ul li {
  float: left;
  border: solid 1px #c7c7c7;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: none !important; 
}

.page ul li.active {
  background-color: #00a1d6;
  color: #FFFFFF;
  transition: all 0.35s ease;
  -webkit-transition: all 0.35s ease;
}
.page ul li.active a {
	color: #FFFFFF;
}
.page ul li:hover {
  background-color: #00a1d6;
  color: #FFFFFF;
  transition: all 0.35s ease;
  -webkit-transition: all 0.35s ease;
}

.page ul li.goto {
  border: 0px;
  position: relative;
  cursor: default;
  width: 65px;
  height: 26px;
  padding: 0;
  margin: 0;
}
.page ul li.goto:hover {
  border: 0px;
  position: relative;
  cursor: default;
  width: 65px;
  height: 26px;
  padding: 0;
  margin: 0;
  color: black;
}
.page ul li.goto input:hover {
  height: 26px;
  width: 65px;
  border-radius: 4px 0px 0px 4px;
  border: 1px solid #c7c7c7;
  font-size: 14px;

}

.page ul li.goto input {
  height: 26px;
  width: 65px;
  border-radius: 4px 0px 0px 4px;
  border: 1px solid #c7c7c7;

  font-size: 14px;
}

.page ul li.goto span {
  position: absolute;
  display: block;
  top: 5px;
  right: -85px;
  cursor: default;
}

.page ul li.goto a {
  top: 0px;
  right: -49px;
  display: block;
  position: absolute;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid #c7c7c7;
  height: 26px;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
}
	
	
</style>